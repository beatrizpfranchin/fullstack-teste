import { useEffect, useState } from 'react';
import RootLayout from '@/pages/layout';
import { Task } from '@/models/task';
import TaskItemComponent from '@/components/task-item';
import { apiUrl, getUserTasks, isUserLoggedIn } from '@/utils/apiWrapper';

export default function TaskListPage() {
  const [user, setUser] = useState<any>();
  const [userTasks, setTasks] = useState<any>([]);

  useEffect(() => {
    getUser();
    getTasks();
  }, []);

  async function getUser() {
    const response = await isUserLoggedIn();
    if (response.ok){
      const userProfile = await response.json();
      console.log('userProfile',userProfile);
      setUser(userProfile);
    }
  }

  async function getTasks() {
    const response = await getUserTasks(user?.userId);
    if (response.ok) {
      const tasks = await response.json();
      console.log('tasks',tasks);
      setTasks(tasks);
    }
  }

  return (
    <RootLayout>
      <div className='flex flex-col'>
        {userTasks.map((task: Task) => (
          <TaskItemComponent 
            key = { userTasks.indexOf(task) } 
            props = { task }/>
          ))}
      </div>
    </RootLayout>
  );
}
