import AppClientDesc from "@/src/items/atoms/AppClientDesc";
import LoginBtn from "@/src/items/atoms/LoginBtn";
import SidebarHeader from "@/src/items/ims/SidebarHeader";
import Link from "next/link";
import Image from "next/image";
import { BsFillArchiveFill, BsGear, BsInfoCircle, BsPerson, BsStack } from "react-icons/bs";
import { useRouter } from "next/router";
import { InventoryContext } from "@/scripts/contexts/InventoryContext";
import { useContext, useEffect, useMemo } from "react";

export default function Component({}) {
    const router = useRouter();
    const handleClick = async (newUrl,...args) => {
      await router.push(newUrl);
    } 
    const inv = useContext(InventoryContext)
    
    return (<>
        <div className="flex-col  Q_sm_x invisible ">
            <div className='flex px-3 px- w-100'>
                
                <button onClick={()=>{handleClick("/")}} className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white px-1 pt-1 bord-r-10 scale-90'>
                        <Image src='/icons/logo.svg' alt='next' width='28' height='28'/>
                    </div>
                    <div className='Q_lg_x pl-1'>
                        <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
                    </div>
                </button>
            </div>
            <div className='flex-1'>
                <Link href="/agreements" className="flex-center py-3 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_lg_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsStack /></div>
                    <div className="flex-1 pl-3 Q_lg_x w-min-220px">Agreements</div>
                </Link>
                <Link href="/users" className="flex-center py-3 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_lg_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsPerson /></div>
                    <div className="flex-1 pl-3 Q_lg_x w-min-220px">Users</div>
                </Link>
            </div>
        </div>

        <div className="h-100vh flex-col pos-fix top-0  left-0 Q_sm_x ">
            <div className='flex px-3 px- w-100'>
                <button onClick={()=>{handleClick("/")}} className='tx-white  tx-lgx nodeco py-4 flex-center '>
                    <div className='bg-white px-1 pt-1 bord-r-10 scale-90'>
                        <Image src='/icons/logo.svg' alt='next' width='28' height='28'/>
                    </div>
                    <div className='Q_lg_x pl-1'>
                        <Image src='/icons/Vector.png' alt='next' width='129' height='19'/>
                    </div>
                </button>
            </div>
            <div className='flex-1'>
                <Link href="/agreements" className="flex-center py-3 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_lg_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsStack /></div>
                    <div className="flex-1 pl-3 Q_lg_x w-min-220px">Agreements</div>
                </Link>
                <Link href="/users" className="flex-center py-3 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_lg_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsPerson /></div>
                    <div className="flex-1 pl-3 Q_lg_x w-min-220px">Users</div>
                </Link>
                <hr className="w-100 opaci-10 my-3" style={{borderColor: "white"}} />
                {!!inv && inv.unitsArray.map((anUnit, index)=>{
                    if (router.query.key == anUnit.label) { return (
                        <div key={index} className="flex-center py-1 clickble  px-2 bg-w-50   " >
                            <div className=" pr-3  Q_lg_x"></div>
                            <div className="px-1 tx-center tx-lg opaci-hov--50"><BsFillArchiveFill /></div>
                            <div className="flex-1 pl-3 Q_lg_x w-min-220px">{anUnit.label.replace("_"," ").toUpperCase()}</div>
                        </div>
                    )}
                    return (
                    <Link key={index}  className="flex-center py-1 clickble  px-2 bg-w-hov-10  " href={`/config/${anUnit.label}`} /* onClick={()=>{router.reload()}} */ >
                        <div className=" pr-3  Q_lg_x"></div>
                        <div className="px-1 tx-center tx-lg opaci-hov--50"><BsFillArchiveFill /></div>
                        <div className="flex-1 pl-3 Q_lg_x w-min-220px">{anUnit.label.replace("_"," ").toUpperCase()}</div>
                    </Link>
                    )
                })}
            </div>
            <div className=''>
                <Link href="/config/local" className="flex-center py-2 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_lg_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsInfoCircle /></div>
                    <div className="flex-1 pl-1 Q_lg_x w-min-220px">Support</div>
                </Link>
                <Link href="/config/global" className="flex-center py-2 clickble  px-2 bg-w-hov-10  ">
                    <div className=" pr-3  Q_lg_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><BsGear /></div>
                    <div className="flex-1 pl-1 Q_lg_x w-min-220px">Settings</div>
                </Link>
            </div>
            <hr className="w-90 opaci-50 mt-3" style={{borderColor: "white"}} />
            <div className='pa-3 w-100'><LoginBtn><AppClientDesc /></LoginBtn></div>
        </div>


    </>)
}