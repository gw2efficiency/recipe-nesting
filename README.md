# recipe-nesting

[![Build Status](https://img.shields.io/travis/gw2efficiency/recipe-nesting.svg?style=flat-square)](https://travis-ci.org/gw2efficiency/recipe-nesting)
[![Coverage Status](https://img.shields.io/codecov/c/github/gw2efficiency/recipe-nesting/master.svg?style=flat-square)](https://codecov.io/github/gw2efficiency/recipe-nesting)

> Nest an array of recipes into a tree

**:bomb: NOTE: This module is still heavily in development and the API might change completely. Please don't use it yet.**

## Install

```
npm install https://github.com/gw2efficiency/recipe-nesting
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works).

(Note: Babel gets pulled in as a dependency, because the module is written in ES7 and 
gets compiled into ES5 during the installation. The Babel code is **not** included in the module, 
don't be shocked at the dependency tree. :wink:)

## Usage

```js
const nesting = require('recipe-nesting')

// Expects a list of recipes in the API format
// -> https://github.com/arenanet/api-cdi/blob/master/v2/recipes.js
// This needs to include at least the recipe you want to transform
// and all sub-recipes including guild upgrade recipes
// (since we want to build a full tree).
// It is easiest to just pass in all existing recipes. ;)
let recipes = [
  {
    "type": "Refinement",
    "output_item_id": 19713,
    "output_item_count": 1,
    "min_rating": 75,
    "time_to_craft_ms": 2000,
    "disciplines": ["Artificer", "Weaponsmith", "Scribe", "Huntsman"],
    "flags": ["AutoLearned"],
    "ingredients": [{
      "item_id": 19726,
      "count": 2
    }],
    "id": 1,
    "chat_link": "[&CQEAAAA=]"
  },
  // ...
]

let nestedRecipes = nesting(recipes)
// The output is an array consisting of the following:
nestedRecipes = [
  {
    "id": 13243,
    "quantity": 5,
    "output": 1,
    "components": [
      {
        "id": 19712,
        "quantity": 10,
        "output": 1,
        "components": [
          {
            "id": 19725,
            "quantity": 30
          },
          // ...
        ]
      },
      // ...
    ]
  }
  // ...
]
```

## Tests

```
npm test
```

## Licence

MIT
