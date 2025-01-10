import { apiUrl } from "@/utils/fetchApi";
import { useEffect } from "react";

export default function LogoutPage(){
    useEffect(() => {
        const response = await fetch(`${apiUrl}auth/logout`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include'
        });
    })
    
}