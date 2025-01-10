import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title> CRUDe Task Manager </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
          CRUDe Task Manager
      </h1>
      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        Por Beatriz Polita Franchin

        <Link className={styles.logout} href='/logout'> Sair </Link>
      </footer>
    </div>
  );
}
