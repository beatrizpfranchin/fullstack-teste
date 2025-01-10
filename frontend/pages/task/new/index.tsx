
import RootLayout from '@/pages/layout';
import { FormEvent, useEffect, useState } from 'react';
import { redirectIfNoAccess } from '@/utils/routes';
import { useRouter } from 'next/router';
import { newTask } from '@/utils/apiWrapper';
import styles from '@/styles/Home.module.css';

export default function NewTaskPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    redirectIfNoAccess(router, (user) => {
      setUser(user)
    })
  },[])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
   
      const formData = new FormData(event.currentTarget);
      const task = {
        ...Object.fromEntries(formData),
        authorId: user?.userId
      }
      const response = await newTask(task);
      
      if (response.ok) {
        console.log(response)
        router.push('/task-list');
      }
  }

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    router.back();
  }

  return (
    <RootLayout>
      <div className={styles.taskEdit}>
        <div className={styles.taskListHeader}>Nova Tarefa</div>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className={styles.formItem}>
            <label htmlFor='title'>Nome:</label>
            <input name='title'/>
          </div>
          <div className={styles.formItem}>
            <label htmlFor='description'>Descrição:</label>
            <input name='description'/>
          </div>
          <div className={styles.formItem}>
            <button type='reset'>Cancelar</button>
            <button type='submit'>Salvar</button>
          </div>
        </form>
      </div>
    </RootLayout>
  );
}