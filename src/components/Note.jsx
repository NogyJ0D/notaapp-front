const Note = ({ title, text, onClick }) => {
  const truncatedText = text.length > 100 ? text.substring(0, 100) + '...' : text;

  return (
    <button onClick={onClick} className="w-40 p-4 bg-gray-200 rounded shadow-xl h-max hover:cursor-pointer">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <p className='break-all'>{truncatedText}</p>
    </button>
  );
}

export default Note;
