import { useContext, useMemo, useState } from "react"
import { useIsClient, useLocalStorage } from "usehooks-ts"


import { AppContext } from "@/scripts/contexts/AppContext"
import ItemsTable from "@/src/items/molecules/ItemsTable"
import ItemsTablePagination from "@/src/items/molecules/ItemsTablePagination"
import ExportItemsCSV from "@/src/items/molecules/ExportItemsCSV"
import InputItemsPPage from "@/src/items/inputs/InputItemsPP"

export default function Component({filteredUnits, exportConfig, tableConfigObj, deleteUnit}) {
    const app = useContext(AppContext)
    const isClient = useIsClient()
    const [LS_itemsPerPage, s__LS_itemsPerPage] = useLocalStorage('itemsPerPage', 25)
    const [itemsPerPage,s__itemsPerPage] = useState<number>(LS_itemsPerPage)
    const [currentPage,s__currentPage] = useState(0)
    const itemsOffsetStart = useMemo(()=>(currentPage * itemsPerPage),[currentPage, itemsPerPage])
    const [selectedId,s__selectedId] = useState(-1)
    const lastPage = useMemo(()=>{
        if (filteredUnits.length < itemsPerPage) return 0
        return parseInt(`${Math.ceil((filteredUnits.length / itemsPerPage) - 1)}`) 
    } ,[filteredUnits, itemsPerPage])
    const paginatedUnits = useMemo(()=>{
        let thePaginatedUnits = filteredUnits.slice(itemsOffsetStart,itemsOffsetStart+itemsPerPage)
        return thePaginatedUnits // .sort(sortIDDesc)
    },[filteredUnits,itemsOffsetStart,itemsPerPage])

    return (<>
        <ItemsTable
            displayConfigObj={tableConfigObj}
            {...{s__selectedId,selectedId}}
            theArray={paginatedUnits} deleteUnit={deleteUnit}
        />
        <ItemsTablePagination {...{currentPage,s__currentPage, lastPage}} />
        {isClient && <>
            <InputItemsPPage up__Value={s__itemsPerPage} />
            <div className="flex flex-justify-end mt-2 ">
                <ExportItemsCSV itemsArray={filteredUnits} columnLookup={exportConfig.columns}
                    filename={exportConfig.filename} 
                />
            </div>
        </>}
    </>)
}