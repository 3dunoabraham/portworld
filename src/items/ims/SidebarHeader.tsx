import Link from "next/link";
import { useRouter } from "next/router";


export default function Component({}) {
    const router = useRouter();
    const handleClick = async (newUrl) => {
      // Wait for route change before do anything
      await router.push(newUrl);
      // Reload after routing
      router.reload();
    } 
    
    return (<>
    <div className='flex px-4'>
        <button onClick={()=>{handleClick("/")}} className=' tx-lgx nodeco py-4' >
            <div className='Q_xs_lg px-2'>DUNO</div>
            <div className='Q_lg_x'>Portfolio</div>
        </button>
    </div>
    </>)
}