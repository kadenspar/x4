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

## Android update/signing identity

Android only permits an APK to update an installed app when both of these remain compatible:

- the package/application ID; and
- the signing certificate.

The X4 Utilities package ID is locked to:

```text
com.x4utilities.companion
```

The GitHub Actions build now explicitly signs the APK with the repository's preserved Android signing key. The workflow also verifies the completed APK before uploading it:

- the package ID must still be `com.x4utilities.companion`;
- the APK certificate must match the restored signing key; and
- the APK `versionCode` is set from the monotonically increasing GitHub workflow run number.

If the preserved signing key cannot be restored, the workflow **fails instead of generating a new key**. This is intentional: silently generating another key would create an APK that Android refuses to install over the existing app.

### One-time migration from older APKs

Older CI builds did not explicitly bind Gradle to the preserved key, so different workflow runs could produce APKs with different signing certificates. If your currently installed copy came from one of those older builds, Android may require **one final uninstall and reinstall** when moving to the protected signing build.

After installing a protected build, future APKs produced by this workflow are checked to remain on the same package/signing identity.

Do not mix locally generated debug APKs with the GitHub Actions APK unless the local build is configured to use the same signing key. A different local debug keystore is a different Android signing identity even if the package name is identical.

Each Actions artifact also includes `build-identity.txt`, which records the package ID, version, Git commit and signing-certificate SHA-256 fingerprint for that APK.

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

> **Important:** the basic local commands above use the local machine's Android debug signing identity. A locally built APK should not be used as an update for the GitHub Actions build unless Gradle is explicitly configured with the same signing keystore.

## What differs from the website

- The web application is bundled inside the APK.
- Saved station layouts remain in local WebView storage.
- The Android build does not load Google Analytics.
- Construction plans can be selected directly from an XML file instead of only being pasted.
- The normal website production configuration remains unchanged.

## Technical notes

The upstream project currently uses Angular 15 and TypeScript 4.9. This branch pins Capacitor 6.2.2 to avoid mixing that older Angular toolchain with the requirements of current Capacitor releases.

A future modernization can upgrade Angular, DevExtreme and Capacitor together.
