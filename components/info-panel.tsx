'use client';

import { useEffect, useState } from 'react';

interface InfoPanelProps {
  showDate: boolean;
  showLocation: boolean;
}

export default function InfoPanel({ showDate, showLocation }: InfoPanelProps) {
  const [date, setDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [locationAvailable, setLocationAvailable] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateDate = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setDate(dateStr);
    };

    updateDate();
  }, []);

  useEffect(() => {
    if (!showLocation) {
      setLocationAvailable(false);
      return;
    }

    const getLocation = async () => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await response.json();

                const city = data.address?.city || data.address?.town || data.address?.village;
                const country = data.address?.country;

                if (city && country) {
                  setLocation(`${city}, ${country}`);
                  setLocationAvailable(true);
                } else if (country) {
                  setLocation(country);
                  setLocationAvailable(true);
                } else if (latitude && longitude) {
                  setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                  setLocationAvailable(true);
                }
              } catch {
                if (latitude && longitude) {
                  setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                  setLocationAvailable(true);
                }
              }
            },
            () => {
              setLocationAvailable(false);
            }
          );
        }
      } catch {
        setLocationAvailable(false);
      }
    };

    getLocation();
  }, [showLocation]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center gap-4 text-base md:text-lg lg:text-xl">
      {showDate && (
        <div className="text-white/70 tracking-wide font-light">
          {date}
        </div>
      )}
      {showLocation && locationAvailable && (
        <div className="text-white/70 tracking-wide font-light flex items-center gap-2">
          <span className="text-white/40">📍</span> {location}
        </div>
      )}
    </div>
  );
}
