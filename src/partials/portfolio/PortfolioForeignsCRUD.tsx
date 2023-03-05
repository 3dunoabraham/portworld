import { useMemo } from "react"
import JSONCrud from "../../items/organisms/JSONCrud"

export default function Component ({configObjRef, q__queriedObj, queriedObj}) {
    const DEFAULT_VAL = {}
    const configObjVal = useMemo(()=>{
        // console.log("configObjRef", configObjRef, !configObjRef)
        if(!configObjRef) return DEFAULT_VAL
        return configObjRef
    },[configObjRef])


    const keyName = ""
    let hardCodedJson = {
        global: { id:1, label: "global", title: "Settings", plural: "Settings", isApiful: false,  },
        hitch_type: { id:2, label: "hitch_type", title: "Hitch Type", plural: "hitch_types", isApiful: false,  },
        color: { id:3, label: "color", title: "Color", plural: "colors", isApiful: false,  },
        sales_status: { id:4, label: "sales_status", title: "Sales Status", plural: "sales_statuses", isApiful: true,  },
    }
    let defaultHardcoded1 = { id:-1, label: "unknown", title: "None", plural: "nones", isApiful: false, baseUrl: '/api/crud',
        apiUrl: "",
    }
    let hardCoded1 = Object.keys(hardCodedJson).reduce((acc, key) => {
        acc[key] = {
            ...hardCodedJson[key],
            baseUrl: '/api/crud',
            apiUrl: `https://ims.jinaron.com/api/v1/units/opt/${hardCodedJson[key].plural}/`,
        };
        return acc;
    }, {});
    const hardCodedMemo:any = useMemo(()=>{
        return keyName in hardCoded1 ? hardCoded1 : {...hardCoded1,...{[keyName]:[]}}
    },[keyName])
    const deleteUnit = ()=> {

    }

    return (
    <div className="flex-col gap-3  flex-align-stretch">
        {/* {Object.keys(configObjVal).map((aConfig, index) => {
            return (
                <div key={index} onClick={()=>{  }}>
                    <div className="flex">
                        {configObjVal[aConfig].title}
                        :
                        {configObjVal[aConfig].isRequestForced ? "✓" : "x"}
                    </div>
                </div>
            )
        })} */}
        
        {/* <hr /> */}
        <div className="tx-lg tx-bold-3">Table Row/Col Config</div>
        <div className="flex-col flex-align-stretch  gap-3">
            <JSONCrud keyConfig={hardCodedMemo} {...{ keyName: "inventory_page_table-config", q__queriedObj, queriedObj, deleteUnit}}/>
        </div>
        {/* <hr />
        <h2 className="">export config</h2>
        <div className="flex-wrap  gap-3">
            <JSONCrud keyConfig={hardCodedMemo} {...{ keyName: "inventory_page_export-config", q__queriedObj, queriedObj, deleteUnit}}/>
        </div> */}
        {/* {JSON.stringify(configObjRef)} */}
    </div>
    )
}