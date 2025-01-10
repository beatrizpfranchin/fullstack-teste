import { useRouter } from 'next/router';
import RootLayout from './layout';
import { useEffect } from 'react';
import { redirectIfNoAccess } from '@/utils/routes';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    redirectIfNoAccess(router, () => router.push('/task-list'));
  }, []);

  return (
    <RootLayout></RootLayout>
  );
}
