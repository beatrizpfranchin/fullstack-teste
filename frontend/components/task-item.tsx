import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Task } from '../models/task';
import DateDisplayComponent from './date-display';
import StatusLabelComponent from './status-label';
import { NextRouter } from 'next/router';
import Link from 'next/link';

export default function TaskItemComponent(
    { props, router }:
    { props : Task, router: NextRouter }
) {

  function editTask() {
    router.push(`/task/${props.id}`);
  }

  return (
      <div  className={styles.taskListItem}>
        <div className={styles.itemInfo}>
          <div className={styles.itemTitle}>{props.title}</div>
          <div className={styles.itemDesc}>{props.description}</div>
        </div>
        <div className={styles.taskStatus}>
          <StatusLabelComponent status ={ props.status }/>
        </div>
        <DateDisplayComponent label='Criada em' date={props.dateCreated}/>
        <DateDisplayComponent label='Completa em' date={props.dateCompleted}/>
        <Link className={styles.edit} href={`/task/?id=${props.id}`}>Editar</Link>
      </div>  
  );
}