import { ReactElement, useContext, useMemo } from 'react'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/organisms/Layout'
import SidebarContainer from '@/src/items/ims/SidebarContainer'
import SessionSidebar from "@/src/items/ims/SessionSidebar";
import { BreadCrumbs } from '../items/atoms/BreadCrumbs'
import { useQueryPlus } from '@/scripts/helpers/useHooksHelper'
import { API_UNITS, LOCAL_URL } from '@/scripts/constants/api'
import { _parseDecimals } from '@/scripts/helpers/mathHelper'
import ImsCard from '@/src/partials/index/ImsCard'
import LoadingPill from '../items/atoms/LoadingPill'
import FailedRequest from '../items/atoms/FailedRequest'
import { AppContext } from '@/scripts/contexts/AppContext'
import { useRouter } from 'next/router'
import { OFFLINE_UNITS_ARRAY } from '@/scripts/constants/inventory';

const Page: NextPageWithLayout = ({online,asd}:PageProps) => {
    const router = useRouter()
    const app = useContext(AppContext)

    const [q__unitsArray, unitsArray] = useQueryPlus({ queryKey: ['unitData'], refetchOnWindowFocus: false, retry: 1,
        queryFn: async () =>{
            if (!app.online) { return OFFLINE_UNITS_ARRAY }
            let theUrl = "https://duno.vercel.app/projects.json"
            let theRequest = await fetch(theUrl);
            let theJsonResult = await theRequest.json()
            return theJsonResult
        }
    },[])

    const inventoryItems = useMemo(()=>{
        let rdm = parseInt(`${Math.random()*1000 * unitsArray.length}`).toLocaleString("en-US")

       
        const _inventoryItems = [
            { companyName: "Company A", unitsArray, totalValue: rdm },
            // { companyName: "Company B", unitsArray: [4, 5, 6], totalValue: "20,000" },
        ];
        return _inventoryItems
    },[unitsArray])
    const cats = useMemo(()=>{
        return getUniqueCategories(unitsArray)
    },[unitsArray])

    function getUniqueCategories(data) {
        let categories = [];
      
        data.forEach(function(item) {
          if(!categories.includes(item.category)) {
            categories.push(item.category);
          }
        });
      
        return categories.sort(function (a, b) {
            return a.length[0] - b.length[0];
        }).reverse();
    }
    const companyTitles = {
        art: "Art",
        code: "Code",
        game: "Games",
    }

    return (
    <div className='flex-center w-100 h-min-100vh'>
        <div className="h-min-100vh w-100  flex-col flex-justify-start flex-align-stretch">
            <div className="px-8 ">
                <BreadCrumbs pages={[]} current="Dashboard" />
                
                <div className="flex-center mb-8">
                    <h1 className="pt-4 tx-bold-5 flex-1 ">
                        Abraham Duno's Portfolio
                    </h1>
                </div>
            </div>
            {q__unitsArray.isLoading &&
                <div className=' flex-col mt-150'>
                    <LoadingPill title={"Fetching units..."} />
                </div> 
            }
            {q__unitsArray.isError &&
                <div className=' flex-col mt-150'>
                    <FailedRequest preview={LOCAL_URL+"/?offline"} />
                </div> 
            }
            {/* {JSON.stringify(cats)} */}
            <div className='flex-wrap flex-justify-start gap-4' >
                {cats.map((aCat, index) => {

                    const catArray = unitsArray.filter((aUnit,index)=> {return aUnit.category == aCat})
                    return (
                        <div className="flex" key={index}>
                                {/* {aCat} */}
                                {/* |{catArray.length}| */}
                                {/* |{JSON.stringify(unitsArray[0])} */}
                                {unitsArray.length > 0 && inventoryItems.map((item, index) => (
                                    <ImsCard
                                        url={"/portfolio/"+aCat}
                                        key={index}
                                        title=" Projects"
                                        subtitle=" Projects"
                                        companyName={companyTitles[aCat]}
                                        unitsArray={catArray}
                                        // totalValue={item.totalValue}

                                    />
                                    ))
                                }
                        </div>
                    )
                })}
            
            </div>

            <div className='flex-center  flex-1'>
            </div>
        </div>
    </div>
    )
}

type PageProps = {
    online: boolean;
    asd: any;
};

Page.getLayout = function getLayout(page: ReactElement) {
    return (
    <Layout>
        <Head><title>IMS</title></Head>
        <SidebarContainer sidebar={<SessionSidebar/>}>{page}</SidebarContainer>
    </Layout>
    )
}

export default Page

export const getServerSideProps: GetServerSideProps<PageProps, ParsedUrlQuery> = async (context) => {
    const { offline } = context.query;
    const online = typeof offline === 'undefined';
    const asd =  process.env.GITHUB_ID
  
    return {
      props: {
        online,asd,
      },
    };
  };