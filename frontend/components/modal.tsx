import styles from '@/styles/Home.module.css';

//Componente que mostra uma janela modal com uma mensagem e opções de confirmar ou cancelar
//Recebe a mensagem a ser mostrada, uma função para ser executada se clicar no botão confirmar,
//E uma função para executar se clicar no botão cancelar
//Além de quaisquer elementos que forem colocados entre as tags html

export default function ModalComponent(
    { children, message, onAgree, onCancel }:
    { children?: React.ReactNode, message: string, 
        onAgree: CallableFunction, onCancel: CallableFunction})
    {

    async function onCancelClick() {
        onCancel();
    }

    async function onAgreeClick() {
        onAgree();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        {message}
                    </div>
                    <div className={styles.formItem}>
                        <button onClick={onCancelClick}>Cancelar</button>
                        <button onClick={onAgreeClick}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
