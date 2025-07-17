import RemoveIcon from '../../assets/remove.svg';
import styles from './Note.module.css';
import { TopBar } from '../top-bar/TopBar';
import { useLoaderData, Form, useSubmit, redirect } from 'react-router-dom';

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

export function deleteNote({ params }) {
  return fetch(`http://localhost:3000/notes/${params.noteId}`, {
    method: 'DELETE',
  }).then(() => {
    return redirect(`/notes/${params.folderId}`);
  });
}

const Note = () => {
  const note = useLoaderData();
  const submit = useSubmit();

  return (
    <div className={styles.container}>
      <Form method='DELETE' action='delete'>
        <TopBar>
          <button className={styles.button}>
            <img className={styles.image} src={RemoveIcon} />
          </button>
        </TopBar>
      </Form>
      <Form
        method='PATCH'
        onChange={(event) => {
          submit(event.currentTarget);
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
