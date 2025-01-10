import Form from 'next/form';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import RootLayout from '@/pages/layout';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { logIn, signUp } from '@/utils/apiWrapper';

export default function RegisterPage() {
  const router = useRouter()
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget);
    const response = await signUp(formData);
    
    if (response.ok) {
      const loginResponse = await logIn(formData)
      if (loginResponse.ok) {
        router.push('/task-list')
      }
    }
  }
  
  return (
    <RootLayout>
      <div className={styles.loginForm}>
      <div className={styles.taskListHeader}>Cadastro de Usuário</div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formItem}>
            <label htmlFor='email'>E-mail:</label>
            <input name='email' />
          </div>
          <div className={styles.formItem}>
            <label htmlFor='password'>Senha:</label>
            <input type='password' name='password' />
          </div>
          <div className={styles.formItem}> 
            <button type='submit'>Cadastrar</button>
          </div>
          <div className={styles.formItem}>
              <Link href="/login">Já tem uma conta? Faça LogIn</Link>
              {/* <Link>Esqueceu a senha?</Link> */}
            </div>
        </form>
      </div>
    </RootLayout>
  );
}