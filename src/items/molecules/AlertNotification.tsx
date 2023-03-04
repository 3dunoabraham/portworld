import { useState } from "react"
import { useTimeout } from "usehooks-ts"


export const AlertNotification = ({
    onHide=()=>{}, delay=4000, badgeClass="ims-badge-faded", alertMsg="",s__msg,
})=>{
    const [visible, setVisible] = useState(true)

    const hide = ()=>{
        s__msg("")
        setVisible(false)
        onHide()
    }

    useTimeout(hide, delay)
    
    if (alertMsg == "") return
    return (
        <div className={
                `${visible ? "appear-once-4 " : ""} appear-hiding pos-fixed top-0 left-50p mt-3 z-999 translate-x--50`
            }
        >
            <div className={` ${badgeClass} px-3 py-2`}>
                {alertMsg}
            </div>
        </div>
    )
}