import { useEffect } from "react"
import { AlertNotification } from "@/src/items/molecules/AlertNotification"

export default function Component({
    msg,
    delay = 4000,
    s__msg,
    badgeClass="ims-badge-faded",
}) {
    useEffect(()=>{
        if (msg == "") return
        
    },[msg])
    const onHide = ()=>{
        s__msg("")
    }

    if (msg != "") {
        return <AlertNotification s__msg={s__msg} delay={delay} onHide={onHide} alertMsg={msg} badgeClass={badgeClass} />
    }
}