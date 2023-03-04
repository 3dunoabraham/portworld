"use client";

import { useEffect, useMemo, useState } from "react";
import { useMap } from "usehooks-ts";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import { DEFAULT_ALERT_MAPARRAY } from "@/scripts/constants";
import { AppContext } from "@/scripts/contexts/AppContext";
import Providers from "@/src/items/atoms/Providers";
import AlertContainer from "@/src/items/molecules/AlertContainer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
    const router = useRouter()
    const { query } = useRouter()
    const queryClient = new QueryClient()
    const [filters,s__filters] = useState({})
    const [alertMap,alertMap__do] = useMap<string,any>(DEFAULT_ALERT_MAPARRAY)
    const alertNotification = (category="neutral", msg="")=>{
		alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)
        setTimeout(()=>{alertMap__do.set(category, msg)},100)
    }
	let appValue = useMemo(()=>{
		return {
            THEME: {
                primaryColor: "#3E5F58",
                textColorLight: "#ffffff"
            },
            online: query.offline == undefined,
            query,
            filters,s__filters,unfilter:(key)=>{
                let newObj = {...filters}
                delete newObj[key]
                s__filters(newObj)
            },
            alertReset:()=>{alertMap__do.setAll(DEFAULT_ALERT_MAPARRAY)},
			alert:(category, msg)=>{alertNotification(category, msg)}
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
	},[alertMap, filters, query])
    

    // useEffect(()=>{
    //     // let sales_status = app.query.stts
    //     console.log("query layout",  router, query)
    //     // app.s__filters({})
    // },[query])
    
    return (
    <Providers>
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={appValue}>
                {!appValue.online &&
                    <div className=" pos-fix z-1001 w-100 _ddr " style={{height:"2px"}}>
                    </div >
                }
                {children}
                <div >
                    <AlertContainer {...{
                        s__msg: (val)=>(alertMap__do.set("neutral", val)), msg:alertMap.get("neutral")}} 
                    />
                    <AlertContainer {...{
                        s__msg: (val)=>(alertMap__do.set("success", val)), msg:alertMap.get("success")}}
                        badgeClass="ims-badge-success"
                    />
                    <AlertContainer {...{
                        s__msg: (val)=>(alertMap__do.set("warn", val)), msg:alertMap.get("warn")}}
                        badgeClass="ims-badge-secondary" 
                    />
                    <AlertContainer {...{
                        s__msg: (val)=>(alertMap__do.set("error", val)), msg:alertMap.get("error")}}
                        badgeClass="ims-badge-error" 
                    />
                </div>
            </AppContext.Provider>
        </QueryClientProvider>
    </Providers>
    )
}
