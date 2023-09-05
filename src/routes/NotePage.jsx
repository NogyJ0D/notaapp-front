import { useEffect, useState } from 'react';
import Note from '../components/Note.jsx';
import NoteEditor from '../components/NoteEditor.jsx';
import { useUserStore } from '../store/userStore.js'
import { useNavigate, useParams } from 'react-router-dom'
import { get, post, put } from '../api/index.js'

const NotePage = () => {
  const { groupId } = useParams();
  const user = useUserStore(state => state);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const notePlaceholder = {"id": -1, "title": "", "text": ""};
  const [selectedNote, setSelectedNote] = useState(notePlaceholder);

  useEffect(() => {
    if (user.id === null) {
      navigate('/login');
    } else {
      loadUserNotes();
      setSelectedNote(notePlaceholder)
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
    console.log('data')
    console.log(data)
    
    data.user = { "id": parseInt(user.id) }
    data.group = { "id": parseInt(groupId) }

    if (data.id === -1) {
      const response = await post('/notes', data)
    } else {
      const response = await put('/notes/' + data.id)
    }    

    await loadUserNotes()
    setSelectedNote(notePlaceholder);
  };

  const handleDeleteNote = () => {
    const filteredNotes = notes.filter((note) => note.id !== selectedNote.id);
    setNotes(filteredNotes);
    setSelectedNote(notePlaceholder);
  };

  const handleCancel = () => {
    setSelectedNote(notePlaceholder);
  }

  return (
    <div className='flex flex-col justify-between w-full place-self-start'>
      <NoteEditor
        note={selectedNote}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
        onCancel={handleCancel}
      />
      
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