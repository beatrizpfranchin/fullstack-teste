import { useEffect, useState } from 'react';
import RootLayout from '@/pages/layout';
import { Task } from '@/models/task';
import TaskItemComponent from '@/components/task-item';
import { apiGet, apiUrl } from '@/utils/fetchApi';

export default function TaskListPage() {
  const [user, setUser] = useState<any>({id: 1});
  const [userTasks, setTasks] = useState<any>([]);

  useEffect(() => {
    getUser();
    getTasks();
  }, []);

  async function getUser() {
    const profileResponse = await fetch(`${apiUrl}auth/profile`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include'
          });
    if (await profileResponse){
      setUser(profileResponse.json());
    }
  }

  async function getTasks() {
    const response = await fetch(`${apiUrl}task/user/${user?.id}`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      credentials: 'include'
    });
    if (await response) {
      const tasks = await response.json();
      console.log(tasks);
      setTasks(tasks);
    }
  }

  return (
    <RootLayout>
      <div className='flex flex-col'>
        {userTasks.map((task: Task) => (
          <TaskItemComponent key={userTasks.indexOf(task)} props = {task}/>
          ))}
      </div>
    </RootLayout>
  );
}
