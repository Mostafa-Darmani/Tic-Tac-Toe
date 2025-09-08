interface CellProps {
  value?: string | null;
  onClick?: () => void; // ✅ این رو اضافه کن
}

export default function Cell({ value, onClick }: CellProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-background w-24 h-24
        flex items-center justify-center 
        text-7xl font-bold
        transition-all duration-200
        text-white
        cursor-pointer
      `}
    >
      {value}
    </div>
  );
}
