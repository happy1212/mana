# Privacy facts to confirm before release

Working facts for the planned Ismailpur Live24 native app, not a finished legal privacy policy or completed store declaration. Confirm against the final source, dependency list, production configuration, and observed network traffic.

| Area | Intended behavior | Confirm before declaring |
| --- | --- | --- |
| App identity | No app account or sign-in. | No account/auth SDK or hidden registration flow is included. |
| Favourites | Replay identifiers/favourites remain in local AsyncStorage. No developer backend or cross-device sync is planned. | Exact values stored, removal/reset controls, and whether operating-system device backups may include them. Do not promise that data can never leave the device through OS backup. |
| Included artwork | Bundled posters/wallpapers may be copied to app-local cache and shared through the system share sheet at the user's request. | Share targets receive the selected file/content. Verify that photo-library reading, contacts, camera, microphone, and broad storage access are not requested unnecessarily. |
| Videos and live coverage | Actions open public YouTube pages outside the app. | YouTube/Google and the browser can process activity under their own terms and privacy policies. Their service can show ads or require sign-in independently of this app. Do not describe the complete viewing journey as “ad-free” or promise no third-party data collection. |
| Remote images | Prefer bundled artwork. | If thumbnails load from YouTube/ytimg or any other host inside the app, that host receives network requests. Include the final behavior in the disclosure assessment. |
| App services | No in-app ads, analytics, payments, push notifications, or developer-operated user-data server are planned. | Audit dependencies and runtime settings for advertising identifiers, diagnostics/crash SDKs, updates, logging, and other network services before selecting store privacy answers. EAS build/submission credentials are release-operator information, not automatically app-user data. |
| Support | Email/call buttons open external apps. | A user who contacts support voluntarily sends their message/contact details to the team. Confirm who handles those messages, retention, and the correct privacy contact. |

Possible wording to adapt into a reviewed public policy:

> Ismailpur Live24 stores your saved replay favourites on your device. The app does not require an app account. When you choose a video or live broadcast, it opens on YouTube, where Google's privacy policy and YouTube's terms apply. When you use Share, the selected artwork is passed to the app or destination you choose. If you contact us for support, we receive the information you send.

Only use this paragraph after confirming the final implementation. It does not cover all required policy subjects or establish the publisher's legal identity.

Supply the app operator's legal/public name, a working privacy contact, and a publicly accessible privacy-policy page. Make the policy reachable from the app. Complete Apple's App Privacy and Google's Data safety responses from verified behavior, including relevant SDKs/third parties; do not automatically select “no data collected” solely because favourites are local. No store answers have been submitted.

Sources: [Apple App Privacy details](https://developer.apple.com/app-store/app-privacy-details/), [Google Data safety guidance](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en), [Google privacy policy](https://policies.google.com/privacy), [YouTube terms](https://www.youtube.com/t/terms).
