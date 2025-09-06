interface CellProps {
  value?: string | null;
}

export default function Cell({ value }: CellProps) {
  return (
    <div
      className={`
        bg-white border-2 border-gray-400 rounded-lg 
        flex items-center justify-center 
        text-4xl font-bold
        transition-all duration-200
        ${value === "X" ? "text-blue-600" : value === "O" ? "text-red-600" : "text-gray-800"}
        hover:scale-105 hover:bg-gray-100
      `}
    >
      {value}
    </div>
  );
}
