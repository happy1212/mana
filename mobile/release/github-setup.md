# Build the mobile apps from GitHub

The **Build iOS and Android releases** workflow runs source checks on pushes to `codex/ismailpurlive24-mobile`. A separate, manual run can create signed iOS and Android production artifacts after those checks pass. It waits for the cloud builds to finish. It does not submit either app to a store.

## Connect the intended project

1. In `happy1212/mana`, keep mobile source under `mobile/` and put the workflow at repository root `.github/workflows/mobile-release.yml`. Preserve the existing Azure workflow. This checkout stores the workflow as a template; when copying source to `mobile/`, place the template at the repository-root path. Its commands run in `mobile/` and its npm cache uses `mobile/package-lock.json`.
2. Sign in to the Expo account that should own this app. Link the intended project using `npx eas-cli@latest init`, confirm the iOS bundle identifier and Android package name, and commit the returned `expo.extra.eas.projectId` in `app.json`. Use the actual returned ID.
3. Complete a successful interactive production build for both platforms with `npx eas-cli@latest build --platform all --profile production`. This sets up the Android signing key and Apple distribution credentials in Expo. Keep signing credentials out of GitHub source. CI freezes credentials and fails if they need repair; repair them in an authenticated session.
4. Create an Expo [access token](https://expo.dev/settings/access-tokens), limiting access to the relevant Expo account and a role sufficient to build this project. Add it as the repository `EXPO_TOKEN` secret under **Settings → Secrets and variables → Actions**. Enter it directly in GitHub; do not paste it into chat or commit it. The actual `extra.eas.projectId` returned by Expo and committed in `app.json` is authoritative; no separate GitHub project-ID variable is needed.

## Run a build

Pushes to the selected source branch run `npm ci`, lint, and TypeScript checks only; they do not access the Expo token or create cloud builds. GitHub’s **Run workflow** control appears once the workflow exists on the repository’s default branch.

Open **Actions → Build iOS and Android releases → Run workflow** and select the source branch to build. The build job requires passing source checks, the configured Expo project ID, and `EXPO_TOKEN`. GitHub’s token has only `contents: read`; checkout does not retain Git credentials. Third-party actions are pinned to verified commits of the official action versions.

Open the returned Expo build links to inspect the resulting `.ipa` and `.aab`. A failed or timed-out run is not proof of a completed build. Cancelling the GitHub run may leave a cloud build running; check Expo before starting another.

## Submit tested builds separately

Test the native apps and finish the store listings and privacy declarations first. Choose the exact completed build IDs for the intended project and platform:

```sh
npx eas-cli@latest submit --platform ios --profile production --id EXACT_IOS_BUILD_ID
npx eas-cli@latest submit --platform android --profile production --id EXACT_ANDROID_BUILD_ID
```

These separate commands need the corresponding store connection in Expo. Google’s current submit profile uses an **internal draft** release. Submission does not guarantee store approval or public availability. No submission workflow is enabled here.

References: [Expo CI setup](https://docs.expo.dev/build/building-on-ci/), [official Expo GitHub Action](https://github.com/expo/expo-github-action), [Expo access tokens](https://docs.expo.dev/accounts/programmatic-access/), [EAS CLI flags](https://docs.expo.dev/eas/cli/).
