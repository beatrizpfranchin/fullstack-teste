import Form from 'next/form';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import RootLayout from '../components/root-layout';

export default function LoginPage() {
  return (
    <RootLayout>
      <Form action='login'>
        <div>
          <p>Usuário:</p>
          <input name='loginEmail' />
          <p>Senha:</p>
          <input name='loginPassword' />
          <button type='submit'>Entrar</button>
          <div>
            <Link href="/register">Cadastre-se</Link>
            {/* <Link>Esqueceu a senha?</Link> */}
          </div>
        </div>
      </Form>
    </RootLayout>
  );
}