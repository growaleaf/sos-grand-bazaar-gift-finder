# Story of Seasons: Grand Bazaar - Gift Finder

A static page that looks up Favourite / Loves / Likes gifts for the 12 marriage candidates in Story of Seasons: Grand Bazaar.

## Use

Open `index.html`. Two modes:

- **Search by item** - type an item name, see which candidates have it as Favourite, Loves, or Likes, or which category (likes/dislikes) it matches.
- **Browse by candidate** - pick a candidate from the dropdown, see their full gift lists.

## Scope

Covers the 12 marriage candidates only. Does not cover non-romanceable villagers.

## Data

Parsed from a single source:

PCGamer: Story of Seasons: Grand Bazaar gift guide for romanceable characters
https://www.pcgamer.com/games/sim/story-of-seasons-gift-guide-for-romanceable-characters
Fetched 2026-11-22.

Each candidate's table on the source page lists Favourite (one item), Loves (multiple items), Likes (multiple items), and a general gift-info cell giving a Likes category and a Dislikes category. There is no per-item Dislikes list in the source, only the category-level dislike, so this tool does not show per-item dislikes.

Data may predate game patches.

## Files

- `index.html` - the page
- `data.js` - parsed candidate data plus source attribution
- `test.js` - known-answer tests (`node test.js`)
- `.nojekyll` - static-hosting marker

## Tests

```
node test.js
```
