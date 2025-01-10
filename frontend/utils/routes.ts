import { NextRouter } from "next/router";
import { isUserLoggedIn } from "./apiWrapper";

export async function redirectIfNoAccess(router: NextRouter, callback?: CallableFunction) {
    const response = await isUserLoggedIn();
    if (response.ok){
        const userProfile = await response.json();
        console.log('userProfile',userProfile);
        if (callback) callback(userProfile);
    } else {
        router.push('/login');
    }
}