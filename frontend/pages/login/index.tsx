import Link from 'next/link';
import RootLayout from '@/pages/layout';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import { apiUrl, logIn } from '@/utils/apiWrapper';
import styles from '@/styles/Home.module.css';

//Página de login

export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    //Função para enviar as informações do form e realizar o login
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget);
    const response = await logIn(formData);
    
    if (response.ok) {
      router.push('/task-list');
      //Se o login tiver sucesso o usuário é redirecionado para a página com a lista de tarefas
    }
  }

  return (
    <RootLayout>
      <div className={styles.loginForm}>
        <div className={styles.taskListHeader}>Login</div>
        <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
            <label htmlFor='username'>E-mail:</label>
            <input name='username' />
            </div>
            <div className={styles.formItem}>
            <label htmlFor='password'>Senha:</label>
            <input type='password' name='password' />
            </div>
            <div className={styles.formItem}> 
              <button type='submit'>Entrar</button>
            </div>
            <div className={styles.formItem}>
              <Link href="/register">Cadastre-se</Link>
            </div>
        </form>
      </div>
    </RootLayout>
  );
}