import { useEffect, useState } from 'react';
import Note from '../components/Note.jsx';
import NoteEditor from '../components/NoteEditor.jsx';
import { useUserStore } from '../store/userStore.js'
import { useNavigate, useParams } from 'react-router-dom'
import { get, put } from '../api/index.js'

const NotePage = () => {
  const { groupId } = useParams();
  const user = useUserStore(state => state);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    if (user.id === null) {
      navigate('/login');
    } else {
      loadUserNotes();
      setSelectedNote({"id": -1, "title": "", "text": ""})
    }
  }, [])
  
  const loadUserNotes = async () => {
    const response = await get('/notes/user_id/' + user.id + '/group_id/' + groupId)
    setNotes(response)
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    window.scrollTo(0, 0);
  };

  const handleSaveNote = async (data) => {
    const response = await put('/notes/' + data.id)

    // const updatedNotes = notes.map((note) => {
    //   if (note.id === selectedNote.id) {
    //     return { ...note, ...data };
    //   }
    //   return note;
    // });

    await loadUserNotes()
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
      <div className='flex flex-row flex-wrap gap-10 p-6'>
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