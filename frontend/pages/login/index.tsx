import Link from 'next/link';
import RootLayout from '@/pages/layout';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { apiUrl } from '@/utils/fetchApi';



export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`${apiUrl}auth/login`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
      mode: 'cors',
      credentials: 'include'
    });
    
    if (await response) {
      router.push('/task-list');
    }
  }

  return (
    <RootLayout>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>E-mail:</label>
          <input name='username' />
          <label htmlFor='password'>Senha:</label>
          <input name='password' />
          <button type='submit'>Entrar</button>
          <div>
            <Link href="/register">Cadastre-se</Link>
            {/* <Link>Esqueceu a senha?</Link> */}
          </div>
        </div>
      </form>
    </RootLayout>
  );
}