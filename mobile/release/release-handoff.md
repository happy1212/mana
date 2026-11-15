# Ismailpur Live24 — release handoff

Prepared November 15, 2026. The user has Apple Developer and Google Play Console accounts. This document prepares the release; it does not record an upload, signed build, approval, or public store availability.

## Confirm the destination

Use the user's existing developer accounts and an Expo account/project controlled by the user. The user selected new store listings for both platforms. Do not overwrite an existing app. `com.ismailpurlive24.app` is provisional, not a verified registered identifier. Apple also needs the correct team and numeric App Store Connect app ID (`ascAppId`); this is different from the bundle ID.

## Build with EAS

Run these commands from the finished mobile project on an authenticated, trusted computer. Complete sign-in and two-factor prompts directly in Expo/Apple's interfaces. Do not send passwords, one-time codes, signing keys, `.p8` files, or service-account JSON through chat or commit them to source control.

```sh
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build:configure
npx eas-cli@latest credentials --platform ios
npx eas-cli@latest credentials --platform android
npx eas-cli@latest build --platform ios --profile production
npx eas-cli@latest build --platform android --profile production
```

Reuse a project that is already linked; do not run initialization to create a duplicate. Configure a store-distribution production profile. EAS cloud builds can produce the signed iOS `.ipa` and Android `.aab`; an Expo Go session, source ZIP, iOS simulator build, or Android test `.apk` is not the production artifact for these submissions. Use existing signing credentials for an update. For a new app, EAS can manage signing credentials after owner authentication. Keep a secure backup of the Android upload key. See [Expo build setup](https://docs.expo.dev/build/setup/) and [credential security](https://docs.expo.dev/app-signing/security/).

Before upload, test on real iOS and Android devices: external YouTube links, save/remove favourites across restart, artwork sharing, offline handling, accessibility text sizes, and contact links. Finalize identifiers, build numbers, screenshots, support/privacy URLs, and the matching store disclosures. Review installed native dependencies and generated permissions rather than relying only on the app's planned feature list.

## Upload to the existing accounts

Configure iOS submission through EAS Credentials using an App Store Connect API key. Configure Android submission with a Google service account authorized only for the required app and release tasks, assigned securely through EAS Credentials or the Expo dashboard. Signing credentials and upload authorization serve different purposes. Follow the official credential setup prompts; keep credential files outside the project and chat.

Select the exact tested build when submitting:

```sh
npx eas-cli@latest submit --platform ios --profile production
npx eas-cli@latest submit --platform android --profile production
```

For iOS, set the real `ascAppId`. An upload reaches App Store Connect/TestFlight; it does not by itself publish the app. Complete metadata and submit the selected build for App Review. See [Expo iOS submission](https://docs.expo.dev/submit/ios/).

For Android, use the internal testing track first. A draft release can be requested with `releaseStatus: "draft"` in the Android submission profile. Current Expo guidance supports a first EAS submission after the Play Console app record and service-account setup exist. Alternatively, upload the first `.aab` manually in Play Console, then use EAS for later submissions. Follow the actual console/API response if extra first-release setup is required. See [Expo Android submission](https://docs.expo.dev/submit/android/) and [manual first release](https://docs.expo.dev/submit/android-manual/).

Personal Google Play accounts created after November 13, 2023 must meet the applicable closed-test requirement—currently at least 12 continuously opted-in testers for 14 days—before applying for production access. Existing accounts are not automatically exempt; confirm the account creation date/type and console status. See [Google's testing requirements](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en).

## Review and release

Use the companion listing drafts after verifying them against the completed app. Native saved favourites and the artwork share flow give reviewers specific functionality to assess. Apple guideline 4.2 still requires adequate usefulness beyond a repackaged website, and neither the architecture nor these features guarantees approval. See [Apple's minimum-functionality guideline](https://developer.apple.com/app-store/review/guidelines/#minimum-functionality).

Complete both stores' current app-content, age-rating, privacy, and review requirements. Use screenshots from the native release and disclose that videos open on YouTube. Record the signed artifact/build IDs and final submission status. Report “published” only after the store confirms public availability.
