import { useEffect, useState } from 'react';
import Note from '../components/Note.jsx';
import NoteEditor from '../components/NoteEditor.jsx';
import { useUserStore } from '../store/userStore.js'
import { useNavigate } from 'react-router-dom'

const NotePage = () => {
  const user = useUserStore(state => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === null) {
      navigate('/login');
    } else {
      console.log('Logged');
    }
  }, [])
  
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbb.' },
    { id: 2, title: 'Note 2', text: 'Praesent in dolor auctor, gravida sem nec, gravida tellus.' },
    { id: 3, title: 'Note 3', text: 'Vestibulum nec metus et lectus lacinia rhoncus.' },
    { id: 4, title: 'Note 4', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 5, title: 'Note 4', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 6, title: 'Note 4', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 7, title: 'Note 4', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 8, title: 'Note 4', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 9, title: 'Note 4', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 10, title: 'Note 4', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 11, title: 'Note 4', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 12, title: 'Note 5', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 13, title: 'Note 5', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 14, title: 'Note 5', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 15, title: 'Note 5', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 16, title: 'Note 5', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 17, title: 'Note 5', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 18, title: 'Note 5', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' },
    { id: 19, title: 'Note 5', text: 'Suspendisse ac nunc quis elit interdum scelerisque.' }
  ]);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    window.scrollTo(0, 0);
  };

  const handleSaveNote = (data) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === selectedNote.id) {
        return { ...note, ...data };
      }
      return note;
    });
    setNotes(updatedNotes);
    setSelectedNote(null);
  };

  const handleDeleteNote = () => {
    const filteredNotes = notes.filter((note) => note.id !== selectedNote.id);
    setNotes(filteredNotes);
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setSelectedNote(null);
  }

  return (
    <div className='flex flex-col justify-between w-full place-self-start'>
      {selectedNote && (
        <NoteEditor
          note={selectedNote}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
          onCancel={handleCancel}
        />
      )}
      <div className='flex flex-row flex-wrap gap-10 p-6 bg-red-300'>
        {notes.map((note) => (
          <Note
            key={note.id}
            title={note.title}
            text={note.text}
            onClick={() => handleNoteClick(note)}
          />
        ))}
      </div>
    </div>
  );
};

export default NotePage;
