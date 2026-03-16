# Subtítulos

A lightweight, mobile-first subtitle companion app for language learners. Built to run alongside Netflix (or any streaming service) on your phone while you watch on TV.

Originally built for learning Spanish through Narcos — but works with any show and any language pair supported by OpenSubtitles.

---

## What It Does

- **Auto-fetches subtitles** for any TV show or movie via the OpenSubtitles API — just type the show name, season, and episode
- **Syncs in real time** with your episode using a start button and elapsed timer
- **Displays your target language subtitles** as the primary text, with your native language hidden by default
- **Tap any line** to reveal its native language translation on demand
- **Nudge sync** forward or backward (±1s, ±2s, ±5s) if timing drifts
- **Manual .srt upload** as a fallback if the API isn't available
- Works entirely in the browser — no installation, no backend, no account required (beyond an OpenSubtitles API key)

---

## Why It Exists

Most subtitle immersion tools (LingoPie, Migaku, Language Reactor) require you to watch content inside their platform. This app takes a different approach; you watch wherever you normally watch, and use your phone as a passive reference that scrolls alongside the episode.

The design philosophy:
- **Target language front and center** — yournative language is available but requires a deliberate tap, so you're not defaulting to it
- **Low friction** — open a URL, paste a key, type a show name, hit start. No subscriptions, no workarounds.
- **Low anxiety** — designed for learners reactivating dormant language skills, not beginners grinding vocabulary

---

## Setup

### 1. Get an OpenSubtitles API Key
- Create a free account at [opensubtitles.com](https://opensubtitles.com)
- Go to **My Profile → API Consumer** to generate your key
- Free accounts get **10 subtitle downloads per day** (5 episodes — one Spanish + one English per episode), resetting at midnight UTC

### 2. Host the App (GitHub Pages recommended)
- Add `index.html` to a GitHub repository
- Go to **Settings → Pages** and set the source to your main branch
- GitHub will give you a live URL like `https://yourusername.github.io/subtitulos`
- Bookmark this on your phone

### 3. Watch
1. Open the app on your phone
2. Paste your OpenSubtitles API key
3. Type the show title, season, and episode number → hit **Search**
4. Select your preferred Spanish and English subtitle tracks (sorted by download count — the top result is usually best)
5. Hit **Download Selected Subtitles**
6. Press **Start Episode** the moment your episode begins playing
7. The app scrolls in sync — tap any line to peek at English

---

## Subtitle Strategy

> [!NOTE]
> The below applies to Spanish specifically but can be extended to other languages

For learners reactivating intermediate Spanish, the recommended approach:

| Phase | Audio | Subtitles |
|-------|-------|-----------|
| Starting out | Spanish | English (safety net, low anxiety) |
| Building confidence | Spanish | Spanish (this app's sweet spot) |
| Testing yourself | Spanish | None |

The app is optimized for the middle phase — Spanish subtitles visible, English only on tap.

---

## Dialect Notes

Different Spanish-speaking shows vary significantly in how accessible they are for learners:

| Show | Dialect | Difficulty |
|------|---------|------------|
| Narcos (original) | Colombian | ⭐ Clearest for learners |
| The Night Manager S2 | Colombian | ⭐ Clear, natural dialogue |
| Narcos: Mexico | Mexican | ⭐⭐ More slang, softer consonants |
| Money Heist | Castilian (Spain) | ⭐⭐⭐ Fast, dense slang — harder |

**Recommended starting point:** Narcos (original, Colombian Spanish). Colombian Spanish — particularly the Bogotá highland variety — is widely considered the most clearly enunciated and learner-friendly Spanish dialect.

---

## Rate Limits

OpenSubtitles free accounts allow **10 downloads per 24 hours**, resetting at midnight UTC. Since each episode requires 2 downloads (Spanish + English), that's 5 episodes per day.

If you hit the limit, the app will tell you clearly and prompt you to use manual `.srt` upload instead. You can download `.srt` files manually from [opensubtitles.com](https://opensubtitles.com) and upload them directly.

---

## Technical Notes

- Single `.html` file — no dependencies, no build step, no framework
- Uses the [OpenSubtitles REST API v1](https://opensubtitles.stoplight.io/docs/opensubtitles-api)
- Subtitle matching pairs Spanish and English cues by timestamp overlap
- Timer runs on `requestAnimationFrame` for smooth sync
- API key is never stored — entered fresh each session

---

## Contributing

Pull requests welcome. Some directions worth exploring:

- Persist API key in `localStorage` with user opt-in
- IMDB/TMDB ID search for more precise title matching
- Dialect filter (e.g. prefer Latin American over Castilian Spanish results)
- Remaining download quota display
- Offline mode / PWA support for phone home screen installation

---

## License

GNU General Public License v3.0