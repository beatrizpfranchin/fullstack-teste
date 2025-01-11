import { Task } from "@/models/task";

//Biblioteca de funções relacionadas a chamadas para a API REST

export const apiUrl = "http://localhost:3001/";

export async function isUserLoggedIn() {
    //Checa se há um usuário logado
    const response = await fetch(`${apiUrl}auth/profile`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function logIn(formData: FormData){
    //Faz o login
    const response = await fetch(`${apiUrl}auth/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function signUp(formData: FormData){
    //Cadastra um novo usuário
    const response = await fetch(`${apiUrl}user`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function logOut() {
    //Faz o logout
    const response = await fetch(`${apiUrl}auth/logout`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function getUserTasks( userId: number ) {
    //Obtém as as tarefas de um usuário
    const response = await fetch(`${apiUrl}task/user/${userId}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function getTaskById( taskId: number) {
    //Obtém tarefa por meio do ID
    const response = await fetch(`${apiUrl}task/${taskId}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function updateTask( taskId, task: Task) {
    //Atualiza uma tarefa
    const response = await fetch(`${apiUrl}task/${taskId}`,{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function newTask(task: {}){
    //Cria uma nova tarefa
    const response = await fetch(`${apiUrl}task`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function deleteTaskById(id: number){
    //Deleta uma tarefa
    const response = await fetch(`${apiUrl}task/${id}`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}