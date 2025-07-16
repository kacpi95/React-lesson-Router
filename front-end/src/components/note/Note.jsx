import RemoveIcon from '../../assets/remove.svg';
import styles from './Note.module.css';
import { TopBar } from '../top-bar/TopBar';
import { useLoaderData, Form } from 'react-router-dom';

const NoteEditor = ({ children }) => (
  <div className={styles['note-editor']}>{children}</div>
);

export async function updateNote({ request, params }) {
  const data = await request.formData();
  const title = data.get('title');
  const body = data.get('body');
  return fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
}

const Note = () => {
  const note = useLoaderData();
  return (
    <div className={styles.container}>
      <TopBar>
        <button className={styles.button}>
          <img className={styles.image} src={RemoveIcon} />
        </button>
      </TopBar>
      <Form
        method='PATCH'
        onChange={() => {
          console.log('Zmiana formularza');
        }}
      >
        <NoteEditor key={note.id}>
          <input type='text' name='title' defaultValue={note.title} />
          <textarea name='body' defaultValue={note.body} />
        </NoteEditor>
      </Form>
    </div>
  );
};

export { Note };
