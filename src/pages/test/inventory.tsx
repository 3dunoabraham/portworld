import { ReactElement, useContext, useEffect } from 'react'
import Head from 'next/head'


import type { NextPageWithLayout } from '@/src/pages/_app'
import Layout from '@/src/items/organisms/Layout'
import SidebarContainer from '@/src/items/ims/SidebarContainer'
import InventoryPage from '@/src/partials/inventory/InventoryPage';
import FilterSidebar from "@/src/items/ims/FilterSidebar";
import { InventoryContext, InventoryProvider } from '@/scripts/contexts/InventoryContext'
import Link from 'next/link'
import { BreadCrumbs } from '@/src/items/atoms/BreadCrumbs'
import { OFFLINE_UNITS_ARRAY } from '@/scripts/constants/inventory'

const Page: NextPageWithLayout = () => {
    const inv = useContext(InventoryContext)
    useEffect(()=>{
        inv.s__unitsArray(OFFLINE_UNITS_ARRAY)
    },[])

    return (
    <div className='flex-center w-100 h-min-100vh'>
        <div className="h-min-100vh w-100 px-8 Q_xs_sm_px-2">
            <BreadCrumbs pages={[["/inventory","Inventory"]]} />
            
            <div className="flex-center">
                <h1 className="pt-6 tx-bold-5 flex-1 "> Inventory</h1>
                <Link  href="/unit/add" className="ims-button-primary clickble">+ New Unit</Link>
            </div>
            <hr className="my-2"/>

            <InventoryPage unitsArray={OFFLINE_UNITS_ARRAY} />
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