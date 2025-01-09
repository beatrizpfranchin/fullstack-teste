import { useEffect, useState } from 'react';
import RootLayout from '../components/root-layout';
import TaskItemComponent from '../components/task-item';
import { Task } from '../models/task';

export default function TaskListPage() {
  const [userTasks, setTasks] = useState<any>([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const response = await fetch('http://localhost:3001/task');
    const tasks = await response.json();
    setTasks(tasks);
  }

  return (
    <RootLayout>
      <div className='flex flex-col'>
        {userTasks.map((task: Task) => (
          <TaskItemComponent props = {task}/>
          ))}
      </div>
    </RootLayout>
  );
}
