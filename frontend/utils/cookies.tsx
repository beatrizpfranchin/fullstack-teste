import { cookies } from 'next/headers';

export default async function Cookies() {
    const allCookies = (await cookies()).getAll();
    return (
        <div>{allCookies.toString()}</div>
    );
}