export const apiUrl = "http://localhost:3001/";

export const cookieOptions = {
    expires: new Date(Date.now() + 3600000),
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true
}
 
export async function apiPostForm(path: string, formData: FormData, options?: {},) {
    const response = await fetch(apiUrl + path, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...options 
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    });

    const parsedResponse = await response.json();

    if (response.ok) {
        return parsedResponse;
    } else {
        // Handle errors
    }
}

export async function apiPost(path: string, data: {}, options?: {}) {
    const response = await fetch(apiUrl + path, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...options 
        },
        body: JSON.stringify(data),
    });

    
    if (response.ok) {
        return await response.json();
    } else {
        // Handle errors
    }
}

export async function apiGet(path: string, options?: {}) {
    const response = await fetch(apiUrl + path, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            ...options,
        },
    }); 

    if (response.ok) {
        return await response.json();
    } else {
        // Handle errors
    }
}