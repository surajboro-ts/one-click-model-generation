# Muze charts

Liveboard prototype showcasing **Muze dual column** and **Muze trellis** charts inside the standard Radiant liveboard scaffold (view + edit modes, sticky header, SpotterViz panel).

## Prerequisites — packagecloud auth (one-time)

This prototype depends on `@viz/muze` and `@viz/datamodel`, which live on a private packagecloud registry (`packagecloud.io/modeanalytics`). Without auth, `npm install` fails with `401 Unauthorized`.

Get a packagecloud token from your team admin, then add these two lines to `~/.npmrc` (create the file if it doesn't exist):

```
//packagecloud.io/modeanalytics/npm/:_authToken=YOUR_TOKEN
@viz:registry=https://packagecloud.io/modeanalytics/npm/npm/
```

The token stays on your machine — it's never committed to the repo. After saving, run `npm install` again.

## What's inside

- 4 KPI tiles (Total revenue, Active customers, Orders, NPS)
- **MuzeDualColumnChart** — Revenue by segment (New business vs Renewals) across Q1–Q4
- **MuzeTrellisChart** — Revenue by region (Americas / EMEA / APAC) and quarter, colored by product
- **MuzeChartTile** — Local wrapper that renders title + Muze chart and responds to tile resize via `ResizeObserver`

## Architecture

- Inherits the grid + drag/resize/select system from `_liveboard-template`
- Two new local tile types: `'muze-dual'` and `'muze-trellis'` rendered inline (bypassing AnswerTile)
- Muze charts mount their own canvas inside the tile's content area
