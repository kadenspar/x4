import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.x4utilities.companion',
  appName: 'X4 Utilities',
  webDir: 'dist/x4-new',
  android: {
    allowMixedContent: false,
    backgroundColor: '#111111'
  }
};

export default config;
