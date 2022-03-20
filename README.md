<!-- Title -->
<h1 align="center">
  recipe-nesting
</h1>

<!-- Description -->
<h4 align="center">
  Nest an array of crafting recipes into a tree.
</h4>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/@gw2efficiency/recipe-nesting">
    <img
      src="https://img.shields.io/npm/v/@gw2efficiency/recipe-nesting?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://github.com/gw2efficiency/recipe-nesting/actions?query=branch%3Amaster+workflow%3A%22Continuous+Integration%22">
    <img
      src="https://img.shields.io/github/workflow/status/gw2efficiency/recipe-nesting/Continuous%20Integration?style=flat-square"
      alt="Build Status"
    />
  </a>

  <a href="https://codecov.io/github/gw2efficiency/recipe-nesting">
    <img
      src="https://img.shields.io/codecov/c/github/gw2efficiency/recipe-nesting/master?style=flat-square"
      alt="Code Coverage"
    />
  </a>
</p>

<!-- Issues -->
<p align="center">
  <i>
    This is part of <a href="https://gw2efficiency.com">gw2efficiency</a>. Please report all issues in <a href="https://github.com/gw2efficiency/issues/issues">the central repository</a>.
  </i>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

<br>

## Installation

```bash
yarn add @gw2efficiency/recipe-nesting
```

If you want to calculate the price of the tree generated from this, take a look at
[`@gw2efficiency/recipe-calculation`](https://github.com/gw2efficiency/recipe-calculation).

## Usage

```ts
import { nestRecipes } from '@gw2efficiency/recipe-nesting'

// Expects a list of crafting recipes in the API format. This needs to include at least
// the recipe you want to transform and all sub-recipes including guild upgrade recipes.
const recipes = [
  {
    type: 'Refinement',
    output_item_id: 19713,
    output_item_count: 1,
    min_rating: 75,
    time_to_craft_ms: 2000,
    disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
    flags: ['AutoLearned'],
    ingredients: [
      {
        item_id: 19726,
        count: 2,
      },
    ],
    id: 1,
    chat_link: '[&CQEAAAA=]',
  },
  // ...
]

// This is a (optional) map of guild upgrade ids to item ids. This should only be used
// for type == Decoration, and resolves all the basic decorations needed for Scribing.
const decorationsToItemsMap = {
  42: 1337,
  // ...
}

const nestedRecipes = nestRecipes(recipes, decorationsToItemsMap)
// -> [
//   {
//     "id": 13243,
//     "quantity": 5,
//     "output": 1,
//     "components": [
//       {
//         "id": 19712,
//         "quantity": 2,
//         "output": 1,
//         "components": [
//           {
//             "id": 19725,
//             "quantity": 3
//           },
//           // ...
//         ]
//       },
//       // ...
//     ]
//   }
//   // ...
// ]
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4" width="75px;" alt=""/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/gw2efficiency/recipe-nesting/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/gw2efficiency/recipe-nesting/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/gw2efficiency/recipe-nesting/commits?author=queicherius" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT
