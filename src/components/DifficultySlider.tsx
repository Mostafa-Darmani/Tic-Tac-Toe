import { Slider } from "@/components/ui/slider";

type DifficultySliderProps = {
  value: number;
  onChange: (val: number) => void;
};

export default function DifficultySlider({ value, onChange }: DifficultySliderProps) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Slider
        min={1}
        max={3}
        step={0.01} // حرکت روان
        value={[value]}
        onValueChange={(val) => onChange(val[0])} // اینجا گرد نکن
        onValueCommit={(val) => onChange(Math.round(val[0]))} // فقط آخر کار گرد کن
        className="w-5/6"
      />

      {/* مارکرها */}
      <div className="flex justify-between w-5/6 text-sm text-secondary-foreground">
        <span className={Math.round(value) === 1 ? "font-bold text-primary-foreground" : ""}>Easy</span>
        <span className={Math.round(value) === 2 ? "font-bold text-primary-foreground" : ""}>Normal</span>
        <span className={Math.round(value) === 3 ? "font-bold text-primary-foreground" : ""}>Hard</span>
      </div>
    </div>
  );
}
