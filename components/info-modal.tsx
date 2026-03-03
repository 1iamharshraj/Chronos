'use client';

import { X } from 'lucide-react';
import { Button } from './ui/button';

interface InfoModalProps {
  onClose: () => void;
}

export default function InfoModal({ onClose }: InfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">About Chronos</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            <span className="text-foreground font-semibold">Chronos</span> is a premium clock display application featuring:
          </p>

          <ul className="space-y-2 pl-4">
            <li>• <span className="text-foreground">Precision Timekeeping</span> - Accurate to the second</li>
            <li>• <span className="text-foreground">Location Aware</span> - Displays your current location</li>
            <li>• <span className="text-foreground">Fullscreen Mode</span> - Perfect for displays and kiosks</li>
            <li>• <span className="text-foreground">Customizable Display</span> - Adjust time format and visibility</li>
            <li>• <span className="text-foreground">Dark Theme</span> - Easy on the eyes, 24/7</li>
          </ul>

          <div className="pt-4 border-t border-border text-xs">
            <p className="text-muted-foreground mb-2">
              Built with precision and care for the modern world.
            </p>
            <p className="text-muted-foreground">
              v1.0 • {new Date().getFullYear()}
            </p>
          </div>
        </div>

        <Button
          variant="default"
          onClick={onClose}
          className="w-full mt-6"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
