const Group = ({ name, onClick }) => {
  return (
    <button onClick={onClick} className="w-40 p-4 bg-gray-200 rounded shadow-xl h-max hover:cursor-pointer">
      <h2 className="mb-2 text-lg font-semibold">{name}</h2>
    </button>
  );
}

export default Group;
