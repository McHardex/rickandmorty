# Issue #4 — Codebase design scan

Source: [McHardex/rickandmorty#4](https://github.com/McHardex/rickandmorty/issues/4)

> Scan this repository for design issues. Find up to 10 issues, then prioritize the top 3 that must be fixed. Make sure existing flows don't break.

## Up to 10 design issues found

1. Failed character page loads rethrow from `useEffect`, so the loader can stay open and `ErrorBoundary` cannot catch the async failure.
2. Pagination `hideNextButton` / `hidePrevButton` use `!!info.next` / `!!info.prev`, which hides an arrow when the neighbor page **exists**.
3. Character enrichment fans out one location request and one episode request per character (N+1 API design).
4. Empty location / episode URLs still call axios and can fail the whole page load.
5. Top and bottom pagination bars duplicate the same props object inline (easy to drift).
6. In-flight page requests are not cancelled or ignored, so a slow response can overwrite a newer page.
7. `throw new Error(error)` can wrap non-`Error` rejection values poorly.
8. Character card media is a fixed `300px` square (weak small-viewport fit).
9. Nested default MUI `Card`s sit on dark character panels (busy hierarchy).
10. Dead / unused styles (`App.css` unused; leftover Character classes).

## Top 3 prioritized for this change

| Priority | Issue | Why first |
| --- | --- | --- |
| 1 | Resilient page load (#1, #4, #6, #7) | Broken load leaves the app unusable; empty URLs and races compound it. |
| 2 | Pagination arrow polarity + shared props (#2, #5) | Users cannot navigate correctly when neighbors exist. |
| 3 | Batch / dedupe location + episode fetches (#3) | Corrects the enrichment design without changing the browse UI. |

Issues 8–10 remain deferred so existing character / location / chapters UI flows stay intact.

## Acceptance criteria (must hold)

### 1. Resilient page load

- On fetch failure: stop the loader, clear characters, show short copy `Unable to load characters.`, keep pagination visible when not loading.
- Ignore stale responses after page change / unmount (`isCurrentRequest` cleanup).
- Empty location or episode URLs must not call axios.
- Unknown / empty location links still render a location object with empty `type`, `dimension`, and `residents`.

### 2. Pagination arrows

- Hide next only when `info.next` is `null`.
- Hide prev only when `info.prev` is `null`.
- Top and bottom `RMPagination` share one props object.

### 3. Batched detail fetches

- Locations and episodes load via multi-id collection URLs (`/resource/1,2,3`).
- Single-id responses (object) and multi-id responses (array) both work.
- Preserve `ModifiedCharacterDetail` shape and each character's original episode URL order.
- Leave single-resource `getEpisode` and `getLocation` helpers unchanged.

### Existing flows that must not break

- App top bar branding
- Loader message `The Rick And Morty Show`
- Character details, location collapse, chapters featured collapse
