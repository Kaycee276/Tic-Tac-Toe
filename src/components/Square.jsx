export default function Square({ value, onClick }) {
  return (
    <button
      className={`w-24 h-24 flex items-center justify-center text-4xl font-bold bg-black border-4 border-orange-900 
      ${value === "X" ? "text-orange-500" : "text-blue-500"} 
      hover:bg-orange-300 rounded-2xl transition-colors duration-200`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
