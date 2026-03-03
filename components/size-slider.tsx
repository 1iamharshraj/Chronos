'use client';

import { Volume2 } from 'lucide-react';

interface SizeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function SizeSlider({ value, onChange }: SizeSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const getPercentage = () => {
    return ((value - 1) / 9) * 100;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Volume2 className="h-5 w-5 text-foreground" />
        <span className="text-foreground font-medium">Font Size</span>
      </div>
      
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={handleChange}
          className="flex-1 h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-foreground"
          style={{
            background: `linear-gradient(to right, var(--foreground) 0%, var(--foreground) ${getPercentage()}%, var(--secondary) ${getPercentage()}%, var(--secondary) 100%)`
          }}
        />
        <span className="text-sm text-muted-foreground w-8 text-center font-mono">
          {value}/10
        </span>
      </div>
    </div>
  );
}
