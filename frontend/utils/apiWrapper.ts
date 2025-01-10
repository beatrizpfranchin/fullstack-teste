export const apiUrl = "http://localhost:3001/";

export const cookieOptions = {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true
}

export async function isUserLoggedIn() {
    const response = await fetch(`${apiUrl}auth/profile`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function logIn(formData: FormData){
    const response = await fetch(`${apiUrl}auth/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function logOut() {
    const response = await fetch(`${apiUrl}auth/logout`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}

export async function getUserTasks( userId: number ) {
    const response = await fetch(`${apiUrl}task/user/${userId}`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'include'
    });
    return response;
}
