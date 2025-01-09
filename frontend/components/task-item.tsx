import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Task } from '../models/task';

export default function TaskItemComponent(
    { props }:
    { props : Task}
) {
  return (
      <div  className='flex justify-center items-center'>
        <div>{props.title ? props.title : "Titulo"}</div>
        <div>{props.description ? props.description : "Descrição"}</div>
        <div>{props.status ? props.status : "Status"}</div>
        <div>{props.dateCreated ? props.dateCreated.toString() : "Criada em"}</div>
        <div>{props.dateCompleted ? props.dateCompleted.toString() : "Completa em"}</div>
      </div>  
  );
}