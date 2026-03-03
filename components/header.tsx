'use client';

import { Clock } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onInfoClick: () => void;
}

export default function Header({ onInfoClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-border/50 bg-card/50 backdrop-blur-md">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white to-white/80 flex items-center justify-center">
            <Clock className="h-5 w-5 text-black" />
          </div>
          <div className="hidden sm:flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-foreground">Chronos</h1>
            <p className="text-xs text-muted-foreground">Precision Timekeeping</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onInfoClick}
          className="text-muted-foreground hover:text-foreground"
        >
          About
        </Button>
      </div>
    </header>
  );
}
