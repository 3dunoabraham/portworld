import { useMemo, useRef, useState } from "react"
import { useIsClient, useLocalStorage } from "usehooks-ts"

import JSONCrudForm from "./JSONCrudForm"
import ItemsTable from "@/src/items/molecules/ItemsTable"
import _localJson from '@/localSettings.json'
import MetadataCrudForm from "./MetadataCrudForm"

export default function Component ({keyName , queriedObj, keyConfig, q__queriedObj, deleteUnit }) {
    const $jsonCrudForm:any = useRef()
    const DEFAULT_DB = {[keyName]:[]}
    const [LS_crud, s__LS_crud] = useLocalStorage('settings', JSON.stringify(DEFAULT_DB) )
    const localJson:any = _localJson
    const theJsonArray = JSON.parse(LS_crud)[keyName]
    const [selectedItemIndex, s__selectedItemIndex] = useState(-1)
    const isClient = useIsClient()
    const tableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Key",fieldName:"key"},
        },
    }
    const compactTableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Key",fieldName:"key"},
            col2:{title:"V",fieldName:"colVal",widget:"keys"},
        },
    }
    const nestedTableConfigObj = {
        key:{title:"id",name:"id",isInvisible: false,},
        rest:{
            col1:{title:"Key",fieldName:"key"},
            col2:{title:"Title",fieldName:"title"},
        },
    }
    const updateSelectedColName = (colName) => {
        // console.log("colName", colName)
        $jsonCrudForm.current.s__form({...$jsonCrudForm.current.form,...{colName: colName}})
    }
    const updateSelectedArray = (id) => {
        let foundItemArray = localJson[keyName].findIndex((x,i) => {return x.id == id})
        // console.log("foundItemArray", foundItemArray)
        s__selectedItemIndex(foundItemArray)
        $jsonCrudForm.current.s__form({...$jsonCrudForm.current.form,...{id: id}})
        
    }
    let defaultHardcoded1 = { id:-1, key: "unknown", title: "None", plural: "nones", isApiful: false, baseUrl: '/api/settings',
        apiUrl: "",
    }
    // const hardCodedMemo:any = useMemo(()=>{
    //     return keyName in keyConfig ? keyConfig : {...keyConfig,...{[keyName]:[]}}
    // },[keyName])



    return (<>
    {/* <div className="flex-col flex-1 w-100 flex-align-stretch">
        <div className="flex flex-align-end">
            <h2 className=" tx-bold-5 flex-1 ">
                JSON CRUD  
            </h2>                        
            <div className=" tx-bold-3 opaci-50 tx-end tx-sm w-max-250px flex-col flex-align-end">
                <div className=" tx-bold-6 opaci-75 tx-sm"> {keyConfig[keyName].baseUrl}</div>
            </div>
        </div>
        <hr className="my-2"/>
        {!(keyName in queriedObj) && <div className='tx-xl opaci-10'> KEY NOT FOUND </div> }
        {keyName in queriedObj &&
                <ItemsTable  displayConfigObj={tableConfigObj} boolConfig={["isErasable"]} 
                theArray={queriedObj[keyName]} urlBase="/user/" deleteUnit={deleteUnit} 
            /> 
        }                    
    </div> */}
    {isClient && <>


    
            <div className="flex flex-1 gap-2">
                {/* <hr className="my-2"/> */}
                <div className="flex-col flex-align-stretch ">

                    <div className="flex-col  gap-4 flex-align-start my-2 ">

                            <JSONCrudForm {...{ theUrl:keyName in keyConfig ? keyConfig[keyName].baseUrl : "/api/settings/", q__queriedObj, 
                                masterKeyName: keyName, backup: theJsonArray, queriedArray: localJson[keyName]
                            }} ref={$jsonCrudForm} />
                    </div>
                    {theJsonArray && theJsonArray.length > 0 && <div className=" opaci-50 tx-end"> *Backup from Local Storage </div> }
                </div>


                
        
                {/* <div className="flex flex-align-end gap-2">
                    <h2 className=" tx-bold-5 flex-1 "> JSON</h2>
                    <div className=" tx-bold-3 opaci-50 tx-sm w-max-300px"> Hardcoded JSON file inside project files</div>
                </div> */}
                {/* <hr className="my-2"/> */}
                {/* {keyName in localJson ? "y" : "n"} */}

                {isClient && keyName in localJson &&
                    <div className="flex-col flex-align-stretch w-min-250px flex-1">
                        <ItemsTable  displayConfigObj={compactTableConfigObj} boolConfig={["isCompact","isSelectable"]} updateSelectedArray={updateSelectedArray}
                            theArray={localJson[keyName]} urlBase="/user/"  deleteUnit={(id)=>{alert("delete from json: "+id)}} 
                        />
                    </div>
                }
            </div>

                


            <div className="flex flex-1 gap-2">
                <div className="flex-col flex-align-stretch ">

                    <div className="flex  gap-4 flex-align-start my-2 ">

                            <MetadataCrudForm {...{ theUrl:keyName in keyConfig ? keyConfig[keyName].baseUrl : "/api/settings/", q__queriedObj, 
                                masterKeyName: keyName, backup: theJsonArray, queriedArray: localJson[keyName]
                            }} ref={$jsonCrudForm} />
                    </div>
                    {theJsonArray && theJsonArray.length > 0 && <div className=" opaci-50 tx-end"> *Backup from Local Storage </div> }
                </div>





                    {/* asd */}

                    {/* |{!!localJson[keyName][selectedItemIndex].colValue ? "y" : "n"}| */}


                <div className="flex-col flex-align-stretch w-min-250px flex-1 ">
                    {keyName in localJson && selectedItemIndex > -1 && <>
                        {/* <hr className="my-2"/> */}
                        <div className="tx-lg tx-bold-5 mb-1 mt-6">Item: {localJson[keyName][selectedItemIndex].key}</div>
                        {/* <div className="tx- tx-bold-3 mb-1">JSON: {JSON.stringify(localJson[keyName][selectedItemIndex])}</div> */}
                        {/* <hr className="my-2"/> */}
                        {/* |{!!localJson[keyName][selectedItemIndex].colVal ? "y" : "n"}| */}
                        {/* {JSON.parse(localJson[keyName][selectedItemIndex].colVal)} */}
                        <hr className="my-2"/>
                        
                        
                        {!localJson[keyName][selectedItemIndex].colVal && 
                            <div className="flex opaci-25 mb-8">
                                No nested value
                            </div>
                        }
                        {!!localJson[keyName][selectedItemIndex].colVal && 
                            <ItemsTable  displayConfigObj={nestedTableConfigObj} boolConfig={["isCompact"]} updateSelectedArray={updateSelectedArray}
                                theArray={ Object.keys(JSON.parse(localJson[keyName][selectedItemIndex].colVal)).map((x,i)=>({id:i,key:x,title:JSON.parse(localJson[keyName][selectedItemIndex].colVal)[x]})) } 
                                    urlBase="/user/"  deleteUnit={(id)=>{alert("delete from json: "+id)}} 
                            />
                        }
                        {/* <hr className="my-2"/> */}
                        {!!localJson[keyName][selectedItemIndex].colVal &&
                            <div className="flex gap-1 ma-2">
                                {Object.keys(JSON.parse(localJson[keyName][selectedItemIndex].colVal)).map((anItem, index) => {
                                    return (
                                        <div className="px-2 py-1 bg-b-20 bord-r-8 opaci-chov--50" key={index}
                                            onClick={()=>{updateSelectedColName(anItem)}}
                                        >
                                            {anItem}
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </>}
                </div>
            </div>



            {/* <hr className="my-2"/>
            {keyName in queriedObj && queriedObj[keyName].map((x, index)=>
                (<div key={index}>
                    {JSON.stringify(x)}
                </div>)
            )} */}
    </>}
    
    </>)
}

