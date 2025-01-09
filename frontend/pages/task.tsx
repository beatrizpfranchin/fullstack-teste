import Form from 'next/form';
import RootLayout from '../components/root-layout';

export default function TaskPage() {
  return (
    <RootLayout>
      <div>Editar Tarefa</div>
      <Form action='updateTask'>
        <div>
          <p>Nome:</p>
          <input name='taskName' />
          <p>Descrição:</p>
          <input name='taskDescription' />
          <p>Status:</p>
          <select name='taskStatus' >
            <option>Pendente</option>
            <option>Em Progresso</option>
            <option>Completa</option>
          </select>
          <button type='button'>Cancelar</button>
          <button type='submit'>Salvar</button>
        </div>
      </Form>
    </RootLayout>
  );
}