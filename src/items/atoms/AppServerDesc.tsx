import { getServerSession } from "next-auth/next";
import UserInformation from "@/src/items/atoms/user-information";


export default async function AppServerDesc() {
    const session = await getServerSession();
    // console.log("Hello from server");
    return (<>
        <div>
            <div>This is the application description component (server component).</div>
            <UserInformation data={session.user} />
        </div>
    </>);
}