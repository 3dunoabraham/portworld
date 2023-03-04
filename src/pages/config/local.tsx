import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useIsClient, useMediaQuery } from 'usehooks-ts'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/organisms/Layout'
import SidebarContainer from '@/src/items/ims/SidebarContainer'
import SessionSidebar from "@/src/items/ims/SessionSidebar";
import { BreadCrumbs } from '@/src/items/atoms/BreadCrumbs'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import ItemsTable from '@/src/items/molecules/ItemsTable'
import { AppContext } from '@/scripts/contexts/AppContext'
import _localJson from '@/localJson.json'
import { fetchShopifyProducts } from '@/scripts/helpers/fetchHelper'
import InputItemsPPage from '@/src/items/inputs/InputItemsPP'
import BoxContainer from '@/src/items/3d/BoxContainer'
import { OFFLINE_UNITS_ARRAY } from '@/scripts/constants/inventory'
import { API_UNITS } from '@/scripts/constants/api'
import FeetInchesLabel from '@/src/items/atoms/FeetInchesLabel'
import Link from 'next/link'

const Page: NextPageWithLayout & any = ({ data, nextauthenv }) => {
    const app = useContext(AppContext)
    const inv = useContext(InventoryContext)
    const $boxContainer:any = useRef()

    // const $jsonCrudForm:any = useRef()
    const [selectedItemIndex, s__selectedItemIndex] = useState(-1)
    const updateSelectedArray = (id) => {
        // console.log("asdasdqweqwe",id)
        let foundItemArray = unitsArray.findIndex((x,i) => {return x.uid == id})
        // console.log("foundItemArray", foundItemArray)
        s__selectedItemIndex(foundItemArray)
        let theUnit = unitsArray[foundItemArray]
        // console.log("new size", theUnit.size)
        $boxContainer.current.resize(theUnit.size)
        // $jsonCrudForm.current.s__form({...$jsonCrudForm.current.form,...{id: id}})
        
    }
    const matches = useMediaQuery('(min-width: 1437px)')
    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitsArray'], refetchOnWindowFocus: false, retry: 1,
        queryFn: async () =>{
            if (!app.online) { return OFFLINE_UNITS_ARRAY }
            let theUrl = API_UNITS
            let theRequest = await fetch(theUrl);
            let theJsonResult = await theRequest.json()
            console.log("theJsonResult",theJsonResult)

            let filteredUnits = theJsonResult.Units.filter((aUnit,index) => {
                if (!aUnit.size) { return false }
                if (!aUnit.size.width && !aUnit.size.length && !aUnit.size.height ) { return false }
                if (!aUnit.size.width.feet && !aUnit.size.length.feet && !aUnit.size.height.feet ) { return false }
                return true
            })

            return filteredUnits
        }
    },[])
    
    const keyName = "hitch_type"
    const baseUrls = {[keyName]:'/api/crud'}
    const [q__queriedObj, queriedObj] = useQueryPlus({ queryKey: ['unitData'], retry: 1,
        refetchOnWindowFocus: false,
        queryFn: async () =>{
            const theList = await fetch(baseUrls[keyName])
            if (!theList) throw new Error()
            return (await theList.json())
        }
    },{[keyName]:[]})
    const shopConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Title",fieldName:"title"},
            col2:{title:"Label",fieldName:"label"},
        },
    }
    const isClient = useIsClient()
    useEffect(()=>{
        console.log("data.products", data.products)
        if (q__queriedObj.isLoading || q__queriedObj.isError) return
        inv.s__unitsArray(Object.keys(queriedObj).map((x,i)=>({id:i,label:x})))
    },[q__queriedObj.isLoading]) 

    const matchestableConfigObj = {
        key:{title:"UID",name:"uid"},
        rest:{
            vin:{title:"VIN",fieldName:"vin"},
            status:{title:"Status",fieldName:"sales_status",widget:"badge"},
            location:{title:"Location",fieldName:"location"},
            dealer:{title:"Dealer",fieldName:"dealer"},
        },
    }
    
    const tableConfigObj = {
        key:{title:"UID",name:"uid"},
        rest:{
            // vin:{title:"VIN",fieldName:"vin"},
            status:{title:"Status",fieldName:"sales_status",widget:"badge"},
            // location:{title:"Location",fieldName:"location"},
            // dealer:{title:"Dealer",fieldName:"dealer"},
        },
    }
    
    return (
    <div className='flex-col  w-100 h-min-100vh flex-align-stretch '>
        <div className=" w-100 px-8 Q_xs_sm_px-2 mb-100">
            <BreadCrumbs pages={[["/config/local","Local Config"]]} />



            <div className="flex-row flex-align-stretch flex-row Q_xs_lg_flex-col gap-3">
                
                <div className="flex-1 h-max-700px pos-rel    flex" id="root">
                    <BoxContainer ref={$boxContainer} />
                    {selectedItemIndex >= 0 &&
                        <div className="pos-abs flex div top-0 right-0 flex pa-1 box-shadow-i-1-bl bord-r-8">
                            <div className="flex-col pa-1 ">
                                {/* index:{selectedItemIndex} */}
                                <Link target={"_blank"} href={`/unit/${unitsArray[selectedItemIndex][matchestableConfigObj.key.name]}`}
                                    className="tx-ls-1 opaci-75"
                                >
                                    #{unitsArray[selectedItemIndex][matchestableConfigObj.key.name]}
                                </Link>
                                {/* <div className="opaci-50 tx-ls-2  tx-sm ">
                                    <div className='flex-col pa-1 ma-1 bord-r-8 bg-b-20 box-shadow-5 bord-r-8'>
                                        <div className=' tx-ls-2   tx-sm flex '> */}
                                        <div className="flex-col pa-1 ma-1 bord-r-8 bg-b-10 box-shadow-3 bord-r-8">

                                            <FeetInchesLabel size={unitsArray[selectedItemIndex].size} />
                                        </div>
                                    {/* </div> */}
                                {/* </div> */}
                            </div>
                        </div>
                    }
                </div>

            

                <div className="flex-col flex-align-stretch flex-1">
                    {/* <div className="flex-center"> <h1 className="pt-6 tx-bold-5 flex-1 "> Inventory</h1> </div> */}
                    
                    {/* {isClient &&
                        <div>

                            {`The view port is ${matches ? 'at least' : 'less than'} 1437px pixels wide`}

                        </div>
                    } */}
                    {unitsArray.length > 0 && isClient && <>
                            {/* <hr className="my-2"/> */}
                            <ItemsTable  displayConfigObj={matches ? tableConfigObj : matchestableConfigObj } 
                                theArray={unitsArray} urlBase="/user/"  deleteUnit={(id)=>{alert("delete from json: "+id)}}  
                                updateSelectedArray={updateSelectedArray} boolConfig={["isSelectable"]}
                            />
                    </>}
                    
                    <div className="mt-8 flex-center Q_xs_lg_flex-col w-100 gap-4 flex-align-start ">
                        <div className="flex-col flex-1 w-100 flex-align-stretch">
                            <div className="flex flex-align-end">
                                <div className=" tx-bold-5 flex-1 "> Third Party Authenticated Server Side Request </div>
                            </div>
                            <hr className="my-2"/>
                            <ItemsTable  displayConfigObj={shopConfigObj} boolConfig={[""]} 
                                theArray={data.products} urlBase="/user/"  deleteUnit={(id)=>{alert("delete from json: "+id)}} 
                            />
                        </div>
                    </div>
                    {isClient && <> <InputItemsPPage /> </>}
                </div>

            </div>
            <div className="flex-center ">
                <div className="pt-6 tx-bold-5 opaci-25 flex-1 "> NEXTAUTH_URL: {nextauthenv}</div>
            </div>

        </div>

        <div className='flex-1'>
        </div>
    </div>
    )
}
Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <InventoryProvider>
                <Head><title>Config | IMS</title></Head>
                <SidebarContainer sidebar={<SessionSidebar/>}>{page}</SidebarContainer>
            </InventoryProvider>
        </Layout>
    )
}
export default Page
export const getServerSideProps = async (context) => {
    const nextauthenv =  process.env.NEXTAUTH_URL
    let spaRes:any = {datas:{products:[]}}
    try { spaRes = await fetchShopifyProducts()
    } catch (e) { console.log("failed server side request") }
    return { props: { data: spaRes.datas, nextauthenv, }, };
};