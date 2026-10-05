# X4 Utilities for Android

This branch packages the existing Angular application as a native Android app using Capacitor.

## Easiest build from an Android tablet: GitHub Actions

You do not need Android Studio on the tablet.

1. Open this repository on GitHub.
2. Switch to the `android` branch.
3. Open **Actions**.
4. Choose **Android debug APK**.
5. Tap **Run workflow** and select the `android` branch.
6. When it finishes, open the workflow run.
7. Download the **x4-utilities-debug-apk** artifact.
8. Extract the ZIP and install `app-debug.apk`.

Android may ask you to allow installs from your browser or file manager.

## Local build

Recommended toolchain:

- Node.js 18
- npm
- JDK 17
- Android SDK 34

Commands:

```bash
npm install
npm run build:android
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

APK output:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

For later web-code changes, you normally only need:

```bash
npm run android:sync
```

## What differs from the website

- The web application is bundled inside the APK.
- Saved station layouts remain in local WebView storage.
- The Android build does not load Google Analytics.
- Construction plans can be selected directly from an XML file instead of only being pasted.
- The normal website production configuration remains unchanged.

## Technical notes

The upstream project currently uses Angular 15 and TypeScript 4.9. This branch pins Capacitor 6.2.2 to avoid mixing that older Angular toolchain with the requirements of current Capacitor releases.

A future modernization can upgrade Angular, DevExtreme and Capacitor together.
