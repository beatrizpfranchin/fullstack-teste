import styles from '@/styles/Home.module.css';

//Componente para mostrar os campos de data referentes a tarefa
//Recebe uma string para a label referente ao nome do campo 
//E a data que será mostrada abaixo

export default function DateDisplayComponent(
    {label, date}: {label: string, date: Date})
{
    date = date ? new Date(date) : null;
    return (
        <div className={styles.dateDisplay}>
            <div className={styles.label}>
                {label}
            </div>
            <div className={styles.date}>
                {date ? date.toLocaleDateString('pt-br') : '-'}
            </div>
        </div>
    );
}