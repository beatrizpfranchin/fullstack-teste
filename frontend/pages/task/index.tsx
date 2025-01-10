import RootLayout from '@/pages/layout';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Task, TaskStatus } from '@/models/task';
import { redirectIfNoAccess } from '@/utils/routes';
import { useRouter } from 'next/router';
import { deleteTaskById, getTaskById, updateTask } from '@/utils/apiWrapper';
import styles from '@/styles/Home.module.css';
import ModalComponent from '@/components/modal';

export default function TaskPage() {
  const searchParams = useSearchParams();
  
  const [taskInfo, setTaskInfo] = useState<Task>(null);
  const [showModal, setShowModal] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    redirectIfNoAccess(router, (user) => {
      loadTaskInfo(user);
    })
  },[])

  async function loadTaskInfo(user?) {
    const taskId = await searchParams.get('id');
    // if (+taskId < 1) router.back();
    const response = await getTaskById(+taskId);
    console.log(response);
    if (response.ok) {
      const task = await response.json();
      if (user?.userId == task.authorId){
        console.log(task);
        setTaskInfo(task);
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
   
      const formData = new FormData(event.currentTarget);
      const newStatus = formData.get('status').valueOf() as TaskStatus;
      var newCompleteDate = taskInfo.dateCompleted;
      if (newStatus == TaskStatus.COMPLETE && taskInfo.status != TaskStatus.COMPLETE) {
        newCompleteDate = new Date(Date.now());
      } else if (newStatus != TaskStatus.COMPLETE && taskInfo.status == TaskStatus.COMPLETE) {
        newCompleteDate = null;
      }
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
      }
  }

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    router.back();
  }
  
  async function deleteTask() {
    const response = await deleteTaskById(taskInfo.id)
    closeModal();
    router.back();
  }

  async function openModal()  {
    setShowModal(true)
  }

  async function closeModal() {
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