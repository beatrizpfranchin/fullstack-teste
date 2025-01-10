import { TaskStatus } from "@/models/task";
import styles from '@/styles/Home.module.css';


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