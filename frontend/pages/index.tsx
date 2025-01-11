import { useRouter } from 'next/router';
import RootLayout from './layout';
import { useEffect } from 'react';
import { redirectIfNoAccess } from '@/utils/routes';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    //Checa se existe um usuário autenticado que pode acessar a lista de tarefas,
    //Senão redireciona para a página de login
    redirectIfNoAccess(router, () => router.push('/task-list'));
  }, []);

  return (
    <RootLayout></RootLayout>
  );
}
