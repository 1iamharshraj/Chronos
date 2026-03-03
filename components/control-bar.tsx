'use client';

import {
  Settings,
  Maximize2,
  Share2,
  Copy,
  Info,
} from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ControlBarProps {
  onSettingsClick: () => void;
  onFullscreenClick: () => void;
  isFullscreen: boolean;
}

export default function ControlBar({
  onSettingsClick,
  onFullscreenClick,
  isFullscreen,
}: ControlBarProps) {
  const handleCopyTime = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    navigator.clipboard.writeText(timeStr);
    toast.success('Time copied to clipboard');
  };

  const handleShare = () => {
    const now = new Date();
    const timeStr = now.toLocaleString();
    const text = `Current time: ${timeStr}`;

    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Shared text copied to clipboard');
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex gap-2 glass rounded-full p-2 transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopyTime}
          title="Copy current time"
          className="rounded-full text-foreground hover:bg-secondary"
        >
          <Copy className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleShare}
          title="Share time"
          className="rounded-full text-foreground hover:bg-secondary"
        >
          <Share2 className="h-4 w-4" />
        </Button>

        <div className="w-px bg-border" />

        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          title="Settings (S)"
          className="rounded-full text-foreground hover:bg-secondary"
        >
          <Settings className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onFullscreenClick}
          title={isFullscreen ? 'Exit fullscreen (F)' : 'Enter fullscreen (F)'}
          className="rounded-full text-foreground hover:bg-secondary"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
