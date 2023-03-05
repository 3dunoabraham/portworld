import { useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";


import { AppContext } from "@/scripts/contexts/AppContext";
import ItemsTableContainer from '@/src/items/organisms/ItemsTableContainer'
import { DEFAULT_UNIT_FOREIGNS, fetchDelete, fetchUnitForeigns, parsedFetchedUnit } from "@/scripts/helpers/fetchHelper";
import { sortIDDesc } from "@/scripts/helpers/type/arrayHelper";
import { SidebarFilterToolbar } from "@/src/items/ims/SidebarFilterToolbar";
import { API_UNITS } from "@/scripts/constants/api";
import LOCAL_SETTINGS_JSON from '@/localSettings.json'

export default function Component({ unitsArray=[], fetchConfig={} }) {

    
    const app = useContext(AppContext)
    const q_foreigns = useQuery({queryKey: ['foreignsData'], queryFn: async () => await fetchUnitForeigns(),})
    const q__foreigns = useMemo(()=>
        (q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading) ? DEFAULT_UNIT_FOREIGNS : q_foreigns.data
    ,[q_foreigns])

    // json foreigns


    const pq__units = useMemo(()=>{
        if (unitsArray.length == 0) return []
        let newUnitsArray= unitsArray.map((aUnit, index)=> {
            let theNewUnit = parsedFetchedUnit(aUnit, q__foreigns.orgsArray, q__foreigns.customersArray) 
            return theNewUnit
        })
        let filteredUnitsArray = newUnitsArray.filter((theUnit, index) => {
            if (app.filters.sales_status && theUnit.sales_status != app.filters.sales_status.id) { return false }
            if (app.filters.dealer && theUnit.dealer != app.filters.dealer.label) { return false }
            return true
        })
        return filteredUnitsArray.sort(sortIDDesc)
    },[unitsArray, q__foreigns, app.filters])
    const exportInventoryConfig = {
        filename: "inventory.csv",
        columns: {
            id: "ID",
            vin: "VIN",
            inventory_statuses: "Status",
            location: "Location",
            dealer: "Dealer"
        }
    }
    const TABLE_SETTINGS_JSON:any = LOCAL_SETTINGS_JSON["inventory_page_table-config"]
    const defaultSettingsJson:any = {}
    Object.keys(TABLE_SETTINGS_JSON).map((aPro)=>{
        defaultSettingsJson[TABLE_SETTINGS_JSON[aPro].key] = JSON.parse(TABLE_SETTINGS_JSON[aPro].colVal)
    })
    const localSettings = useMemo(()=>{
        let theRestKeys = Object.keys(defaultSettingsJson.rest)
        let theRest:any = {}
        theRestKeys.map((restKey, index) => {
            theRest[restKey] = JSON.parse(defaultSettingsJson.rest[restKey])
            
        })
        return {
            key: defaultSettingsJson.key,
            rest: theRest
        }
    },[LOCAL_SETTINGS_JSON])
    // const tableConfigObj = {
    //     key:{title:"UID",name:"uid"},
    //     rest:{
    //         vin:{"title":"VIN","fieldName":"vin"},
    //         status:{"title":"Status","fieldName":"sales_status","widget":"badge"},
    //         location:{"title":"Location","fieldName":"location"},
    //         dealer:{"title":"Dealer","fieldName":"dealer"},
    //     },
    // }

    const deleteUnit = async (id)=>{
        let fetchDeleteRes:any = await fetchDelete(API_UNITS, {uids:[id]})
        if (fetchDeleteRes && fetchDeleteRes.status >= 200 && fetchDeleteRes.status < 300)
        {
            app.alert("success","Deleted")
            window.location.reload()
        }
    }

    return (
    <>
        <SidebarFilterToolbar configObj={app.filters} />
        {pq__units.length == 0 && 
            <div className='tx-xl opaci-10 tx-ls-5 pt-100 pb-8 tx-center w-100 tx-center'>No Units Found</div>
        }
        {pq__units.length > 0 &&
            <div className="mt-4 mb-150 " >
                <ItemsTableContainer filteredUnits={pq__units} exportConfig={exportInventoryConfig} 
                    tableConfigObj={localSettings} deleteUnit={deleteUnit}
                />
            </div>
        }
        {JSON.stringify(localSettings)}
        <hr/>

        
        {/* {pq__units.length > 0 &&
            <div className="mt-4 mb-150 " >
                <ItemsTableContainer filteredUnits={pq__units} exportConfig={inventoryConfig} 
                    tableConfigObj={tableConfigObj} deleteUnit={deleteUnit}
                />
            </div>
        } */}
    </>
    )
}