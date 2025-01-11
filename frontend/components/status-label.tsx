import { TaskStatus } from "@/models/task";
import styles from '@/styles/Home.module.css';

//Componente para mostrar o status da tarefa com cores associadas
//Recebe o status e modifica o texto e a classe CSS de acordo com o valor

export default function StatusLabelComponent (
    {status} : {status: TaskStatus}
){
    console.log(status);
    return (
        <div className={
            status == TaskStatus.PENDING ? styles.pending :
            status == TaskStatus.IN_PROGRESS ? styles.inProgress :
            styles.complete } >
            {
                status == TaskStatus.PENDING ? 'Pendente' :
                status == TaskStatus.IN_PROGRESS ? 'Em Progresso' :
                'Completa'
            }
        </div>
    );
}