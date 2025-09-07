interface CellProps {
  value?: string | null;
  onClick?: () => void; // ✅ این رو اضافه کن
}

export default function Cell({ value, onClick }: CellProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[#a01c83] w-24 h-24
        flex items-center justify-center 
        text-4xl font-bold
        transition-all duration-200
        ${value === "X" ? "text-blue-600" : value === "O" ? "text-red-600" : "text-gray-800"}
        hover:scale-105 cursor-pointer
      `}
    >
      {value}
    </div>
  );
}
