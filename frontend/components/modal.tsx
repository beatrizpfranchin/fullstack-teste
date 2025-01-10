import styles from '@/styles/Home.module.css';

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
