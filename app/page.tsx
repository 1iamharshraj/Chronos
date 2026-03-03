'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import ClockDisplay from '@/components/clock-display';
import InfoPanel from '@/components/info-panel';
import ControlBar from '@/components/control-bar';
import SettingsPanel from '@/components/settings-panel';
import InfoModal from '@/components/info-modal';

export default function Home() {
  const [is24Hour, setIs24Hour] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [fontSize, setFontSize] = useState<number>(8);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('clockSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setIs24Hour(settings.is24Hour ?? true);
        setShowDate(settings.showDate ?? true);
        setShowLocation(settings.showLocation ?? true);
        setFontSize(settings.fontSize ?? 8);
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      is24Hour,
      showDate,
      showLocation,
      fontSize,
    };
    localStorage.setItem('clockSettings', JSON.stringify(settings));
  }, [is24Hour, showDate, showLocation, fontSize]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        handleFullscreen();
      }
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        setShowSettings(true);
      }
      if (e.key === 'Escape') {
        setShowSettings(false);
        setShowInfo(false);
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error attempting to enable fullscreen:', err);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Main content */}
      <div className="h-screen flex flex-col items-center justify-center px-4 pb-24">
        <div className="w-full max-w-4xl space-y-12">
          {/* Clock Display */}
          <ClockDisplay is24Hour={is24Hour} fontSize={fontSize} />

          {/* Date and Location Info */}
          <InfoPanel showDate={showDate} showLocation={showLocation} />
        </div>
      </div>

      {/* Control Bar */}
      <ControlBar
        onSettingsClick={() => setShowSettings(true)}
        onFullscreenClick={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          is24Hour={is24Hour}
          setIs24Hour={setIs24Hour}
          showDate={showDate}
          setShowDate={setShowDate}
          showLocation={showLocation}
          setShowLocation={setShowLocation}
          fontSize={fontSize}
          setFontSize={setFontSize}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Info Modal */}
      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}

      {/* Toast notifications */}
      <Toaster theme="dark" />
    </main>
  );
}
