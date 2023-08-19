import { useState } from 'react';
import { useForm } from 'react-hook-form';

const NoteEditor = ({ note, onSave, onDelete, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isEditing, setIsEditing] = useState(!note); // Determina si se está editando o creando una nueva nota

  const onSubmit = (data) => {
    onSave(data);
    setIsEditing(false);
  }

  const handleDelete = () => {
    onDelete();
    setIsEditing(false);
  }

  const handleCancel = () => {
    onCancel();
  }

  if (!isEditing && !note) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 px-6 py-4 bg-slate-300">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 text-xl">Title</label>
          <input
            type="text"
            id="title"
            className="w-full p-2 rounded"
            defaultValue={note ? note.title : ''}
            {...register('title')}
          />
        </div>
        <div>
          <label htmlFor="text" className="block mb-2 text-xl">Text</label>
          <textarea
            id="text"
            className={`w-full p-2 rounded ${errors.text ? 'border-red-500' : ''}`}
            {...register('text', { required: true })}
            defaultValue={note ? note.text : ''}
          />
          {errors.text && <p className="text-red-500">Required field</p>}
        </div>
        <div className="flex justify-end gap-5">
          <button type='button' onClick={handleCancel} className="px-4 py-2 text-white rounded bg-neutral-500">Cancel</button>
          <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
            {note ? 'Update' : 'Create'}
          </button>
          {note && (
            <button type="button" onClick={handleDelete} className="px-4 py-2 text-white bg-red-500 rounded">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
