import RootLayout from '@/pages/layout';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Task, TaskStatus } from '@/models/task';
import { redirectIfNoAccess } from '@/utils/routes';
import { useRouter } from 'next/router';
import { deleteTaskById, getTaskById, updateTask } from '@/utils/apiWrapper';
import styles from '@/styles/Home.module.css';
import ModalComponent from '@/components/modal';

//Página para a edição de uma tarefa existente

export default function TaskPage() {
  const searchParams = useSearchParams();
  
  const [taskInfo, setTaskInfo] = useState<Task>(null);
  const [showModal, setShowModal] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    //Checa se existe um usuário autenticado que pode acessar essa página, 
    //Senão redireciona para a página de login
    redirectIfNoAccess(router, (user) => {
      loadTaskInfo(user);
    })
  },[])

  async function loadTaskInfo(user?) {
    const taskId = await searchParams.get('id');
    //Obtém o ID da tarefa que foi passado por meio da URL
    const response = await getTaskById(+taskId);
    console.log(response);
    if (response.ok) {
      const task = await response.json();
      if (user?.userId == task.authorId){
        //O usuário só pode acessar a tarefa se ele for o autor
        console.log(task);
        setTaskInfo(task);
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      //Função para enviar os dados do formulário para atualizar uma tarefa
      event.preventDefault()
   
      const formData = new FormData(event.currentTarget);
      const newStatus = formData.get('status').valueOf() as TaskStatus;
      var newCompleteDate = taskInfo.dateCompleted;
      if (newStatus == TaskStatus.COMPLETE && taskInfo.status != TaskStatus.COMPLETE) {
        newCompleteDate = new Date(Date.now());
      } else if (newStatus != TaskStatus.COMPLETE && taskInfo.status == TaskStatus.COMPLETE) {
        newCompleteDate = null;
      } 
      //Caso o usuário altere o status de incompleto para completo ou vice versa, 
      //A data de compleição da tarefa também é atualizada para refletir a mudança
      
      const newTask : Task = {
        ...taskInfo,
        title: formData.get('title').toString(),
        description: formData.get('description').toString(),
        status: newStatus,
        dateCompleted: newCompleteDate
      }
      console.log(newTask)
      const response = await updateTask(taskInfo.id, newTask);
      
      if (response.ok) {
        console.log(response)
        router.push('/task-list');
        //Se a tarefa é atualizada com sucesso, volta para a página da lista de tarefas
      }
  }

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    //Retorna para a página anterior se o usuário clicar em Cancelar.
    router.back();
  }
  
  async function deleteTask() {
    //Deleta a tarefa depois que o usuário confirma pelo modal.
    const response = await deleteTaskById(taskInfo.id)
    if (response.ok) {
      //Se a tarefa é deletada com sucesso, fecha o modal e volta para a lista de tarefas
      closeModal();
      router.back();
    }
  }

  async function openModal()  {
    //Abre o modal
    setShowModal(true)
  }

  async function closeModal() {
    //Fecha o modal
    setShowModal(false)
  }

  return (
    <RootLayout>
      <div className={styles.taskEdit}>
        <div className={styles.taskListHeader}>
          Editar Tarefa
          <button className={styles.deleteTask} onClick={openModal}> Deletar </button>
        </div>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className={styles.formItem}>
            <label htmlFor='title'>Nome:</label>
            <input name='title' defaultValue={taskInfo?.title}/>
          </div>
          <div className={styles.formItem}>
            <label htmlFor='description'>Descrição:</label>
            <input name='description' defaultValue={taskInfo?.description}/>
          </div>
          <div className={styles.formItem}>
            <label htmlFor='status'>Status:</label>
            <select name='status' defaultValue={taskInfo?.status} >
              <option value={TaskStatus.PENDING}>Pendente</option>
              <option value={TaskStatus.IN_PROGRESS}>Em Progresso</option>
              <option value={TaskStatus.COMPLETE}>Completa</option>
            </select>
          </div>
          <div className={styles.formItem}>
            <button type='reset'>Cancelar</button>
            <button type='submit'>Salvar</button>
          </div>
        </form>
      </div>
      {showModal &&
        <ModalComponent 
          message='Tem certeza que deseja deletar essa tarefa?'
          onCancel={closeModal}
          onAgree={deleteTask}></ModalComponent>
      }
    </RootLayout>
  );
}