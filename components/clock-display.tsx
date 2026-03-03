'use client';

import { useEffect, useState } from 'react';

interface ClockDisplayProps {
  is24Hour: boolean;
  fontSize: number;
}

export default function ClockDisplay({ is24Hour, fontSize }: ClockDisplayProps) {
  const [time, setTime] = useState<string>('00:00:00');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      let displayHours = parseInt(hours);
      let period = '';

      if (!is24Hour) {
        period = displayHours >= 12 ? 'PM' : 'AM';
        displayHours = displayHours % 12 || 12;
      }

      const formattedHours = String(displayHours).padStart(2, '0');
      const displayTime = `${formattedHours}:${minutes}:${seconds}`;

      setTime(displayTime);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [is24Hour]);

  if (!mounted) return null;

  // Calculate font size based on 1-10 scale
  const baseFontSize = 40 + (fontSize - 1) * 30;

  return (
    <div className="flex flex-col items-center justify-center gap-6 drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
      <div style={{
        fontSize: `${baseFontSize}px`,
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        <span>{time}</span>
      </div>
    </div>
  );
}
