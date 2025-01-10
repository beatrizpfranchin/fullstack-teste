import Form from 'next/form';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import RootLayout from '@/pages/layout';

export default function RegisterPage() {
  return (
    <RootLayout>
      <Form action='register'>
        <div>
          <p>Nome (opcional):</p>
          <input name='registerName' />
          <p>E-mail:</p>
          <input name='registerEmail' />
          <p>Senha:</p>
          <input name='registerPassword' />
          <p>Repita sua senha:</p>
          <input name='registerPasswordRepeat' />
          <button type='submit'>Cadastrar</button>
        </div>
      </Form>
    </RootLayout>
  );
}