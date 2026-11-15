# Ismailpur Live24 mobile apps

Native iPhone/iPad and Android source built with Expo SDK 58, React Native, and Expo Router. This package contains source code and release assets, not signed `.ipa` or `.aab` files. It has not been uploaded to either app store.

## Included

- Home, Watch, Saved, Gallery, and More tabs with accessible controls.
- A verified match replay and links to the public YouTube channel/live page. Videos play in YouTube or the external browser; no live status or fixtures are fabricated.
- Search and a saved replay list stored locally with loading, retry, validation, and serialized writes.
- Bundled poster and player artwork with native system sharing.
- Native email/phone actions and in-app privacy information.
- Original app icon, splash artwork, Android adaptive foreground, and Play feature graphic.
- Draft descriptions, reviewer instructions, privacy facts, and build/submission instructions in `release/`.

## Run and verify

Use a current Node.js LTS version supported by Expo SDK 58.

```sh
npm ci
npm run start
npm run lint
npm run typecheck
npx expo-doctor
```

Run a development build to test native modules on physical iOS and Android devices. The browser preview verifies interface/state behavior but cannot verify native sharing, signed binaries, or store acceptance.

## Produce store builds

The user requested **new listings** in their existing Apple Developer and Google Play Console accounts. Both platform identifiers are currently `com.ismailpurlive24.app`; confirm their availability before the first registration/build. No Expo project/account owner has been assigned yet.

Sign into an Expo account controlled by the publisher, link the project, and configure signing in the official prompts:

```sh
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest build:configure
npm run build:stores
```

The production profile requests an iOS store build and an Android App Bundle. Preview profiles are for testing and are not production submission artifacts. Do not commit signing keys, API credentials, or tokens. Keep a secure backup of the Android upload key.

## Submit tested builds

Configure the publisher's Apple and Google submission credentials securely with Expo Services. Set the actual numeric Apple App Store Connect app ID in `eas.json` under `submit.production.ios.ascAppId`. Create the Google Play app record and authorize the Google service account for that app. Select the exact tested build when submitting; see `release/release-handoff.md` for official links.

```sh
npx eas-cli@latest submit --platform ios --profile production
npx eas-cli@latest submit --platform android --profile production
```

Android submissions are configured for a draft release on the internal testing track. iOS uploads go to App Store Connect/TestFlight. Neither upload automatically completes public store review or publication.

Before store review, provide actual native screenshots, publisher/review-contact details, public support and privacy-policy URLs, current age/content ratings, and accurate store privacy disclosures. The existing website is private and is unsuitable as a public support/privacy destination in its present state. Bundled artwork and the single curated replay are starter content; review the available content and usefulness before submission. Store approval is not guaranteed.

## Content updates

Add only verified, licensed match entries in `src/content.ts`. The app does not scrape YouTube or download videos. Assets are bundled for offline viewing; changes require a new build. Saved items are replay links, not offline videos. This release has no in-app advertising, payments, user accounts, analytics SDK, or push notifications.

## Validation status

See `release/validation.md` for checks and explicit limits. No developer account passwords or keys are included in this package.
