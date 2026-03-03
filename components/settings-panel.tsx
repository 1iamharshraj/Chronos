'use client';

import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import SizeSlider from './size-slider';

interface SettingsPanelProps {
  is24Hour: boolean;
  setIs24Hour: (value: boolean) => void;
  showDate: boolean;
  setShowDate: (value: boolean) => void;
  showLocation: boolean;
  setShowLocation: (value: boolean) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  onClose: () => void;
}

export default function SettingsPanel({
  is24Hour,
  setIs24Hour,
  showDate,
  setShowDate,
  showLocation,
  setShowLocation,
  fontSize,
  setFontSize,
  onClose,
}: SettingsPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Display Settings</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Time Format */}
          <div className="flex items-center justify-between">
            <Label htmlFor="24hour" className="text-foreground cursor-pointer">
              24-Hour Format
            </Label>
            <Switch
              id="24hour"
              checked={is24Hour}
              onCheckedChange={setIs24Hour}
            />
          </div>

          {/* Date Display */}
          <div className="flex items-center justify-between">
            <Label htmlFor="show-date" className="text-foreground cursor-pointer">
              Show Date
            </Label>
            <Switch
              id="show-date"
              checked={showDate}
              onCheckedChange={setShowDate}
            />
          </div>

          {/* Location Display */}
          <div className="flex items-center justify-between">
            <Label htmlFor="show-location" className="text-foreground cursor-pointer">
              Show Location
            </Label>
            <Switch
              id="show-location"
              checked={showLocation}
              onCheckedChange={setShowLocation}
            />
          </div>

          {/* Font Size Slider */}
          <SizeSlider value={fontSize} onChange={setFontSize} />

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Instructions */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">Keyboard Shortcuts:</p>
            <ul className="space-y-1">
              <li>• <kbd className="px-2 py-0.5 bg-secondary rounded text-foreground">F</kbd> - Fullscreen</li>
              <li>• <kbd className="px-2 py-0.5 bg-secondary rounded text-foreground">S</kbd> - Settings</li>
              <li>• <kbd className="px-2 py-0.5 bg-secondary rounded text-foreground">ESC</kbd> - Close</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
