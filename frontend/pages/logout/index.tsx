import { logOut } from "@/utils/apiWrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogoutPage(){
    const router = useRouter();
    
    useEffect(() => {
        logOutAndReset();
    },[])
    
    async function logOutAndReset(){
        await logOut();
        router.push('/login');
    }
}