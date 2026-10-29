import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) {
    return null;
  }

  if (showReconnected) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-emerald-600 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-lg border border-emerald-400/40 animate-bounce">
        <Wifi className="w-4 h-4" />
        <span>Back online! Reconnected to GMU Portal.</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2.5 rounded-lg shadow-xl border border-amber-300">
      <WifiOff className="w-4 h-4 animate-pulse text-slate-950" />
      <span>Offline Mode — Cached data and offline capabilities active.</span>
    </div>
  );
};
