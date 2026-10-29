import React, { useState } from 'react';
import { Download, Smartphone, CheckCircle, HelpCircle, Box } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { AndroidAppModal } from './AndroidAppModal';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'prominent' | 'card';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'navbar', className = '' }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowModal(true);
    }
  };

  if (isInstalled) {
    if (variant === 'card') {
      return (
        <>
          <div className={`p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-emerald-300 text-sm ${className}`}>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Campus Sphere Android App</p>
                <p className="text-xs text-emerald-300/80">Running as a native standalone application.</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs text-sky-400 hover:text-sky-300 underline font-medium"
            >
              App Info
            </button>
          </div>
          <AndroidAppModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
      );
    }
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/40 transition-colors ${className}`}
          title="Campus Sphere Android App Details"
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Android App</span>
        </button>
        <AndroidAppModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  return (
    <>
      {variant === 'navbar' && (
        <button
          onClick={() => setShowModal(true)}
          className={`relative group flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-sky-500/20 active:scale-95 ${className}`}
          title="Android App Options & Download"
        >
          <Smartphone className="w-3.5 h-3.5 animate-pulse" />
          <span>Android App</span>
          <span className="px-1.5 py-0.5 bg-black/25 rounded text-[10px] text-white font-mono uppercase">
            APK
          </span>
        </button>
      )}

      {variant === 'prominent' && (
        <button
          onClick={() => setShowModal(true)}
          className={`flex items-center justify-center space-x-3 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-sky-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-600/30 hover:shadow-sky-500/50 active:scale-98 border border-white/20 ${className}`}
        >
          <Smartphone className="w-5 h-5 text-emerald-200 animate-bounce" />
          <div className="text-left">
            <div className="text-xs text-cyan-200 uppercase tracking-wider font-bold">Android Application Ready</div>
            <div className="text-sm font-bold text-white">Download APK / Install on Phone</div>
          </div>
          <Download className="w-4 h-4 ml-1 text-white/80" />
        </button>
      )}

      {variant === 'card' && (
        <div className={`p-4 bg-slate-900/90 border border-sky-500/30 rounded-xl space-y-3 ${className}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Campus Sphere Android App</h4>
                <p className="text-xs text-slate-400">Native Java project & direct phone install</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-slate-400 hover:text-white p-1"
              title="Android Options & Project Download"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleInstallClick}
              className="py-2.5 px-3 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md transition-all active:scale-98"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isInstallable ? 'Install Now' : 'Install on Phone'}</span>
            </button>

            <a
              href="/CampusSphear-Android-Project.zip"
              download="CampusSphear-Android-Project.zip"
              className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all active:scale-98"
            >
              <Box className="w-3.5 h-3.5 text-emerald-400" />
              <span>Android (.ZIP)</span>
            </a>
          </div>
        </div>
      )}

      {/* Full Android Modal */}
      <AndroidAppModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
