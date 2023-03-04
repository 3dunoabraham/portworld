import { AppContext } from '@/scripts/contexts/AppContext';
import { fetchDelete, fetchPost, fetchPut } from '@/scripts/helpers/fetchHelper';
import { forwardRef, useContext, useImperativeHandle, useState,  } from 'react'

const Component = forwardRef(({masterKeyName, theUrl, q__queriedObj, queriedArray, backup = []/* createItem, updateItem, form, handleChange */}:any, ref)=>{
    const app = useContext(AppContext)
    
    const DEFAULT_ITEM = {key:"",id:"", colName:"", colValue:""}
    const [form, s__form] = useState(DEFAULT_ITEM)
    const createItem = (e)=>{
        addNewItem(form.key)
        s__form(DEFAULT_ITEM)
        q__queriedObj.refetch()
        e.preventDefault()
    }
    const updateItem = async (e)=>{
        await updateData(form.id, form.key)
        s__form(DEFAULT_ITEM)
        q__queriedObj.refetch()
    }
    async function updateData(id,key,val="") {
        const response = await fetchPut(theUrl, {
            keyName:masterKeyName,
            id: parseInt(id),
            key: key,
            colVal: val,
            // name: 'Updated Item',
            // description: 'This item has been updated'
        })
        if (response) {
            const updatedItem = await response.json();
            console.log(updatedItem);
        }
        q__queriedObj.refetch()
    }
    const handleChange = (e,subProp)=>{
        s__form({...form,...{[subProp]:e.currentTarget.value}})
    }
    const deleteUnit = async ()=>{
        let id = form.id
        await deleteItem(id)
        q__queriedObj.refetch()
    }

    async function addNewItem(key) {
        console.log("theUrl, {keyName:masterKeyName,key: key,}")
        console.log(theUrl, {keyName:masterKeyName,key: key,})
        const response = fetchPost(theUrl, {keyName:masterKeyName,key: key,})
        if (!response) { return app.alert("error", "Error") }
        app.alert("success", "Item successfully added to JSON file")
    }
    async function deleteItem(id) {
        const response = await fetchDelete(theUrl, {keyName:masterKeyName,id: parseInt(id),})
        if (!response) { throw new Error('Failed to delete item'); }
    }
    
    async function deleteAll() {
        const response = await fetchDelete(theUrl,{keyName:masterKeyName,})
        // if (!response) { throw new Error('Failed to delete all items'); }
    }
    async function importFromBackup() {
        if (backup == undefined) return app.alert("error", "Backup Undefined")
        for (let index = 0; index < backup.length; index++) {
            const item = backup[index];
            // console.log("item to backup", item)
            await addNewItem(item.key)
        }
        // for (let item of backup) {
        //   await addNewItem(item.key)
        // }
    }
    async function addNewCol(key) {
        const response = fetchPost(theUrl, {keyName:masterKeyName,key: key,})
        if (!response) { return app.alert("error", "Error") }
        app.alert("success", "Item successfully added to JSON file")
    }
      
    async function createCol(e) {
        // console.log("form.colName", form.colName)
        // console.log("form.colValue", form.colValue)
        // console.log("form.id", form.id)
        // console.log("queriedArray", queriedArray)
        let theSelectedItem = queriedArray.filter((x,index)=>{ return x.id == form.id })
        if (theSelectedItem.length == 0) { return }
        // let { id, key, ...selectedItem } = theSelectedItem[0]
        // if (!theSelectedItem[0].colVal) { return }
        console.log("theSelectedItem 0", theSelectedItem[0])
        let selectedItem = !theSelectedItem[0].colVal ? "{}" : theSelectedItem[0].colVal
        console.log("selectedItem", selectedItem)
        let oldColVal = JSON.parse(selectedItem)
        console.log("oldColVal", oldColVal)


        // console.log("queriedArray", queriedArray)

    //     addNewCol(form.colName)
        
    // }
        // await updateData(form.id, selectedItem.key, JSON.stringify({}))
        await updateData(form.id, theSelectedItem[0].key, JSON.stringify( {...oldColVal,...{[form.colName]: form.colValue}} ))

        // updateColValue(form.id, {[form.colName],})
        e.preventDefault()
    }
    async function updateColValue(id,colValue) {

        const response = await fetchPut(theUrl, {
            keyName:masterKeyName,
            id: parseInt(id),
            value: colValue,
            // name: 'Updated Item',
            // description: 'This item has been updated'
        })
        if (response) {
            const updatedItem = await response.json();
            console.log(updatedItem);
        }
        q__queriedObj.refetch()
    }
    
    useImperativeHandle(ref, ()=>({
        form, s__form,
    }));
    
    return (<>
    <div className="flex-col gap-2 ims-border-faded bord-r-8 px-2 py-2">
        <div className="flex-col flex-align-stretch  gap-1">
            <button onClick={createItem} className="ims-button-primary clickble">Add Key</button>
            <form onSubmit={createItem}>
                <input placeholder='Key Name' className='w-150px ims-button-faded' value={form.key} onChange={(e)=>handleChange(e,"key")}  />
            </form> 
        </div>
    </div>
    {/* <div className="flex-col gap-2 ims-border-faded bord-r-8 px-2 py-2">
        {!!queriedArray &&
            <div className="flex-col flex-align-stretch gap-1">
                <button onClick={updateItem} className="ims-button-primary clickble ">Update</button>
                <form onSubmit={updateItem} className="flex-center gap-1">
                    ID: <input placeholder='ID' className='ims-button-faded w-80px' value={form.id} onChange={(e)=>handleChange(e,"id")}  />
                </form> 
                <button onClick={()=>{deleteUnit()}} className="ims-button-primary clickble opaci-75  ">Delete</button>
            </div>
        }
    </div>
    <div className="flex-col gap-2 ims-border-faded bord-r-8 px-2 py-2">
        <button onClick={createCol} className="ims-button-primary  nowrap clickble w-100 ">Update metadata</button>
        <form onSubmit={createCol} className="flex-col gap-1 w-150px flex-align-stretch">
            <input placeholder='Column Name' className='ims-button-faded ' value={form.colName} onChange={(e)=>handleChange(e,"colName")}  />
            <input placeholder='Value' className='ims-button-faded ' value={form.colValue} onChange={(e)=>handleChange(e,"colValue")}  />
        </form> 
    </div> */}
    {/* <div className="flex-col gap-1  ">
        <div className="flex-center gap-1  ">
            <button onClick={createCol} className="ims-button-primary nowrap clickble  ">Add col</button>
            <button onClick={createCol} className="ims-button-primary nowrap clickble  ">Update col</button>
        </div>
    </div>  */}
    <div className="flex-col gap-1 ims-border-faded bord-r-8 px-2 py-2">
        {!!queriedArray &&
            <button onClick={()=>{deleteAll()}} className="ims-button-primary clickble opaci-75  ">Clear All</button>
        }
        {backup.length > 0 &&
           <button onClick={()=>{importFromBackup()}} className="ims-button-primary  clickble   " style={{filter:"hue-rotate(180deg)"}}>Backup</button>
        }
    </div>
    </>);
});
Component.displayName = 'JSONCrudForm'

export default Component