import React, { useState } from 'react';
import { 
  Smartphone, Download, FileCode, CheckCircle2, Copy, Check, 
  ExternalLink, Layers, Terminal, Sparkles, X, ShieldCheck, Box
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AndroidAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidAppModal: React.FC<AndroidAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isAndroid } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'install' | 'project' | 'code' | 'cloud'>('install');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const javaCode = `package com.gmu.campusphear;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Campus Sphere - GMU Native Android Portal
        // Hardware accelerated WebView with native bridge
    }
}`;

  const manifestCode = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.gmu.campusphear">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Campus Sphere"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme.NoActionBarLaunch">

        <activity
            android:name=".MainActivity"
            android:label="Campus Sphere"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

    <uses-permission android:name="android.permission.INTERNET" />
</manifest>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-sky-950/60 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-sky-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/20">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white font-serif">Campus Sphere Android App</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  Java Native Project Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Package: <span className="font-mono text-sky-400">com.gmu.campusphear</span> • GM University Portal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/50 text-xs font-semibold gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('install')}
            className={`py-3 border-b-2 flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeTab === 'install'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Direct Phone Install (APK/WebAPK)</span>
          </button>

          <button
            onClick={() => setActiveTab('project')}
            className={`py-3 border-b-2 flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeTab === 'project'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>Download Android Studio Project (.ZIP)</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 border-b-2 flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Java & Manifest Code</span>
          </button>

          <button
            onClick={() => setActiveTab('cloud')}
            className={`py-3 border-b-2 flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeTab === 'cloud'
                ? 'border-fuchsia-500 text-fuchsia-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Cloud APK Builder</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-300">

          {/* TAB 1: Instant Phone Install */}
          {activeTab === 'install' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 to-blue-950/40 border border-sky-500/30 flex items-start space-x-3.5">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Real Android App Architecture</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    The entire GMU engineering portal is packaged as an Android application. When installed, it runs full-screen with native hardware acceleration, instant local caching, and the official GMU crest launcher icon.
                  </p>
                </div>
              </div>

              {isInstalled ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center space-x-3 text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white text-sm">App Already Installed on This Device!</p>
                    <p className="text-xs text-emerald-300/80">Campus Sphere is running as an Android standalone application.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={install}
                    disabled={!isInstallable}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg ${
                      isInstallable
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/25 active:scale-98 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>{isInstallable ? 'Install Android App on this Phone Now' : 'Tap Chrome Menu (⋮) > Install App'}</span>
                  </button>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Step-by-Step for any Android device:
                    </h5>
                    <ol className="text-xs space-y-2 text-slate-300 list-decimal list-inside leading-relaxed">
                      <li>Open this portal link in <strong className="text-white">Google Chrome</strong> on your Android phone.</li>
                      <li>Tap the <strong className="text-white">3 vertical dots (⋮)</strong> at top right corner.</li>
                      <li>Select <strong className="text-emerald-400">"Install app"</strong> or <strong className="text-emerald-400">"Add to Home screen"</strong>.</li>
                      <li>Tap <strong className="text-white">"Install"</strong> — Android places the app directly on your home screen & app drawer!</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Download Full Android Studio Project ZIP */}
          {activeTab === 'project' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start space-x-3.5">
                <Box className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Download Native Android Studio Project</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    We generated the full native Android project with Java source code (<code className="text-emerald-300">MainActivity.java</code>), Gradle wrapper, <code className="text-emerald-300">AndroidManifest.xml</code>, app icons, and assets bundled.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">CampusSphear-Android-Project.zip</span>
                  <span className="text-emerald-400 font-bold">~0.85 MB • Ready</span>
                </div>

                <a
                  href="/CampusSphear-Android-Project.zip"
                  download="CampusSphear-Android-Project.zip"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-600/30 active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete Android Studio Project (.ZIP)</span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <h5 className="font-bold text-white uppercase tracking-wider">How to Build the APK in Android Studio:</h5>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed">
                  <li>Unzip the downloaded file on your computer.</li>
                  <li>Open <strong className="text-white">Android Studio</strong> and click <strong className="text-white">Open</strong>.</li>
                  <li>Select the extracted <code className="text-sky-300">android/</code> directory.</li>
                  <li>Go to menu: <strong className="text-white">Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.</li>
                  <li>Your installable <code className="text-emerald-300">app-debug.apk</code> is ready! Send it to your phone and tap to install!</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 3: Java & Manifest Source Code */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    android/app/src/main/java/com/gmu/campusphear/MainActivity.java
                  </span>
                  <button
                    onClick={() => copyToClipboard(javaCode, 'java')}
                    className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                  >
                    {copiedCode === 'java' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'java' ? 'Copied' : 'Copy Java'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto">
                  {javaCode}
                </pre>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400">
                    android/app/src/main/AndroidManifest.xml
                  </span>
                  <button
                    onClick={() => copyToClipboard(manifestCode, 'manifest')}
                    className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                  >
                    {copiedCode === 'manifest' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'manifest' ? 'Copied' : 'Copy XML'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-sky-300 overflow-x-auto max-h-48">
                  {manifestCode}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: Cloud APK Builder & GitHub Actions */}
          {activeTab === 'cloud' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-start space-x-3.5">
                <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Automated Cloud APK Generation</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Don't have Android Studio installed on your computer? You can use automated cloud tools to compile this project into a signed Android APK file for free!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white flex items-center space-x-1.5">
                    <Terminal className="w-4 h-4 text-sky-400" />
                    <span>1. GitHub Actions (Automated)</span>
                  </h5>
                  <p className="text-slate-400">
                    We included <code className="text-sky-300">.github/workflows/build-apk.yml</code>. Whenever you push to GitHub, it automatically spins up an Ubuntu VM with Android SDK, runs Gradle, and outputs the installable <code className="text-emerald-300">app-debug.apk</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h5 className="font-bold text-white flex items-center space-x-1.5">
                    <ExternalLink className="w-4 h-4 text-emerald-400" />
                    <span>2. Microsoft PWABuilder</span>
                  </h5>
                  <p className="text-slate-400">
                    Visit <strong className="text-white">pwabuilder.com</strong>, paste your app URL, and click <strong className="text-white">Package for Android</strong>. It generates a signed APK / AAB package ready for Android devices and Google Play in under 60 seconds!
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono">Capacitor Android Runtime v7.0</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
