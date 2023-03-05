import { ReactElement, useContext, useState } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/organisms/Layout'
import SidebarContainer from '@/src/items/ims/SidebarContainer'
import PortfolioPage from '@/src/partials/portfolio/PortfolioPage';
import FilterSidebar from "@/src/items/ims/FilterSidebar";
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import Link from 'next/link'
import { BreadCrumbs } from '@/src/items/atoms/BreadCrumbs'
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper'
import { API_UNITS } from '@/scripts/constants/api'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { LoadingInventory } from '@/src/partials/inventory/LoadingInventory'
import Dropdown from '@/src/items/molecules/Dropdown'
import InventoryForeignsCRUD from '../partials/inventory/InventoryForeignsCRUD'
import PortfolioForeignsCRUD from '../partials/portfolio/PortfolioForeignsCRUD'

const Page: NextPageWithLayout = () => {
    const inv = useContext(InventoryContext)
    const [isQuickAdd, s__isQuickAdd] = useState(false)
    const [isConfigEdit, s__isConfigEdit] = useState(false)
    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitData'], 
        queryFn: async () =>{
            const theList = await fetchJsonArray(API_UNITS, "Units")
            inv.s__unitsArray(theList)
            return theList
        }
    },[])

    
    // const [q__queriedObj, queriedObj] = useQueryPlus({ queryKey: ['foreignData'], retry: 1,
    //     refetchOnWindowFocus: false,
    //     queryFn: async () =>{
    //         const theList = await fetch(hardCodedMemo[keyName].baseUrl)
    //         if (!theList) throw new Error()
    //         return await theList.json()
    //     }
    // },{[keyName]:[]})


    const FETCH_CONFIG = {
        sales_status: 
        {
            key: "sales_status",
            title: "Sales Status",
            label: "Sales Status",
            plural: "sales_statuses",
            apiUrl: "",
            nestedProp: "",
            isRequestForced: false,
        },
        dealer: 
        {
            key: "dealer",
            title: "Dealers",
            label: "Dealers",
            plural: "dealers",
            apiUrl: "",
            nestedProp: "",
            isRequestForced: true,
        },
    }

    return (
    <div className='flex-center w-100 h-min-100vh'>
        <div className="h-min-100vh w-100 px-8 Q_xs_sm_px-2">
            <BreadCrumbs pages={[["/inventory","Inventory"]]} />
            
            <div className="flex-center">
                <h1 className="pt-6 tx-bold-5 flex-1 "> Projects</h1>
                
                <Dropdown buttonTitle={". . ."}>
                    <div className="flex-col flex-align-stretch gap-1">
                        <Link  href="/unit/add" className="ims-button-primary clickble nowrap">+ New Unit</Link>
                        <button className="ims-button-primary clickble nowrap opaci-75 mt-2"
                            onClick={()=>{s__isQuickAdd(!isQuickAdd)}}
                        >
                            New Quick Unit
                        </button>
                        <button className="ims-button-faded clickble nowrap   "
                            onClick={()=>{s__isConfigEdit(!isConfigEdit)}}
                        >
                            Config
                        </button>
                        {/* <div className="flex">asdq</div> */}
                    </div>
                </Dropdown>
            </div>

            <hr className="my-2"/>

            <div className='flex'>
                {isQuickAdd && <>
                    <div className='w-100 py-2'>
                        add
                    </div>
                </> }
                {isConfigEdit &&
                    <div className='w-100 py-2'>
                        <PortfolioForeignsCRUD {...{q__queriedObj:{refetch:()=>{}}, queriedObj:{}}} configObjRef={FETCH_CONFIG} />
                    </div>
                }
            </div>
            {q__unitsArray.isLoading && <LoadingInventory /> }
            {unitsArray.length > 0 && <PortfolioPage fetchConfig={FETCH_CONFIG} unitsArray={unitsArray} />}
        </div>
    </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>Inventory | IMS</title></Head>
        <InventoryProvider>
            <SidebarContainer sidebar={<FilterSidebar/>}>
                {page}
            </SidebarContainer>
        </InventoryProvider>
    </Layout>
    )
}

export default Page