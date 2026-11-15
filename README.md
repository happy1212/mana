# Ismailpur Live24 mobile apps

The native iPhone/iPad and Android application source is in [`mobile/`](mobile/). It includes the app artwork, Expo configuration, store-listing drafts, and release instructions.

This is source code, not a signed `.ipa` or `.aab`. No store upload or public app release has been completed.

- [Run the app and prepare a release](mobile/README.md)
- [GitHub cloud-build setup](mobile/release/github-setup.md)
- [Store submission guide](mobile/release/release-handoff.md)
- [Store listing drafts](mobile/release/store-listing-drafts.md)
- [Validation and remaining checks](mobile/release/validation.md)

The mobile build workflow checks source changes and supports manually requested Expo cloud builds once the Expo project, authentication, and signing credentials are configured. A build is separate from an App Store Connect or Google Play submission.
