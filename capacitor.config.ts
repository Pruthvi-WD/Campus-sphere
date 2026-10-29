import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gmu.campusphear',
  appName: 'Campus Sphere',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
