import { useEffect, useState } from 'react';
import RootLayout from '@/pages/layout';
import { Task } from '@/models/task';
import TaskItemComponent from '@/components/task-item';
import { getUserTasks, isUserLoggedIn } from '@/utils/apiWrapper';
import styles from '@/styles/Home.module.css';
import { redirectIfNoAccess } from '@/utils/routes';
import { useRouter } from 'next/router';

export default function TaskListPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>();
  const [userTasks, setTasks] = useState<any>([]);

  useEffect(() => {
    redirectIfNoAccess(router,(user) => {
      setUser(user);
      getTasks(user?.userId);
    });
  }, []);

  async function getTasks(userId: number) {
    const response = await getUserTasks(userId);
    if (response.ok) {
      const tasks = await response.json();
      console.log('tasks',tasks);
      setTasks(tasks);
    }
  }

  async function newTask() {
    router.push('/task/new')
  }

  return (
    <RootLayout>
      <div className={styles.taskList}>
        <div className={styles.taskListHeader}> 
          Tarefas de { user?.username }
          <button className={styles.addTask} onClick={newTask}> + </button>
        </div>
        <div className={styles.taskListItemsContainer}>
          {userTasks.map((task: Task) => (
            <TaskItemComponent 
              key = { userTasks.indexOf(task) } 
              props = { task }
              router = { router }/>
            ))}
        </div>
      </div>
    </RootLayout>
  );
}
