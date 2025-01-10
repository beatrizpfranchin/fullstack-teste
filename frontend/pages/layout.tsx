import Head from 'next/head';
import styles from '../styles/Home.module.css';

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
      <main>
        {children}
      </main>

      <footer>
      </footer>
    </div>
  );
}
