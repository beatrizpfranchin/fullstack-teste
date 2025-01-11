
import RootLayout from '@/pages/layout';
import { FormEvent, useEffect, useState } from 'react';
import { redirectIfNoAccess } from '@/utils/routes';
import { useRouter } from 'next/router';
import { newTask } from '@/utils/apiWrapper';
import styles from '@/styles/Home.module.css';

//Página para a criação de uma nova tarefa

export default function NewTaskPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    //Checa se existe um usuário autenticado que pode acessar essa página, 
    //Senão redireciona para a página de login
    redirectIfNoAccess(router, (user) => {
      setUser(user)
    })
  },[])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      //Função para enviar os dados do formulário e criar uma nova tarefa
      event.preventDefault()
   
      const formData = new FormData(event.currentTarget);
      const task = {
        ...Object.fromEntries(formData),
        authorId: user?.userId
      }
      const response = await newTask(task);
      
      if (response.ok) {
        router.push('/task-list');
        //Se a tarefa for criada com sucesso o usuário é redirecionado para a página com a lista de tarefas
      }
  }

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    //Volta para a página anterior quando o usuário clica no botão cancelar
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