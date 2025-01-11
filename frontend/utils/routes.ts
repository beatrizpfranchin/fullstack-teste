import { NextRouter } from "next/router";
import { isUserLoggedIn } from "./apiWrapper";

export async function redirectIfNoAccess(router: NextRouter, callback?: CallableFunction) {
    //Função para checar se há um usuário autenticado que pode acessar uma página
    const response = await isUserLoggedIn();
    if (response.ok){
        const userProfile = await response.json();
        console.log('userProfile',userProfile);
        if (callback) callback(userProfile);
        //Se houver um usuário retorna as informações deste
    } else {
        router.push('/login');
        //Se não houver um usuário retorna para a página de login
    }
}