import { nestRecipes } from '../src/index'
import { API_Recipes_Entry_Next } from '../src/api'

describe('recipe-nesting', () => {
  const input: Array<API_Recipes_Entry_Next> = [
    {
      type: 'Refinement',
      output_item_id: 19712,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 19725, type: 'Item', count: 3 }],
      id: 2,
      chat_link: '[&CQIAAAA=]',
      output_item_count_range: '1-10',
      achievement_id: 12,
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 19112,
      output_item_count: 5,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 19725, type: 'Item', count: 3 }],
      id: 2,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 19685,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Armorsmith', 'Artificer', 'Weaponsmith', 'Scribe', 'Huntsman', 'Jeweler'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 19701, type: 'Item', count: 2 }],
      id: 21,
      chat_link: '[&CRUAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 12988,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 19712, type: 'Item', count: 2 },
        { id: 19685, type: 'Item', count: 3 },
        { id: 1, type: 'Currency', count: 1_00_00 },
        { id: 19685, type: 'Currency', count: 1 },
      ],
      id: 39,
      chat_link: '[&CScAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 19710,
      output_item_count: 1,
      min_rating: 0,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 19723, type: 'Item', count: 3 }],
      id: 3,
      chat_link: '[&CQMAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 19679,
      output_item_count: 5,
      min_rating: 0,
      disciplines: ['Armorsmith', 'Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 19697, type: 'Item', count: 10 },
        { id: 19704, type: 'Item', count: 1 },
      ],
      id: 16,
      chat_link: '[&CRAAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 12990,
      output_item_count: 1,
      min_rating: 50,
      disciplines: ['Artificer', 'Weaponsmith', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 19710, type: 'Item', count: 2 },
        { id: 19679, type: 'Item', count: 3 },
      ],
      id: 30,
      chat_link: '[&CR4AAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 19742,
      output_item_count: 1,
      min_rating: 150,
      disciplines: ['Leatherworker', 'Armorsmith', 'Tailor', 'Scribe'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 19741, type: 'Item', count: 2 }],
      id: 7,
      chat_link: '[&CQcAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Insignia',
      output_item_id: 19814,
      output_item_count: 1,
      min_rating: 175,
      disciplines: ['Leatherworker', 'Armorsmith', 'Tailor'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 24284, type: 'Item', count: 3 },
        { id: 19742, type: 'Item', count: 1 },
        { id: 24285, type: 'Item', count: 3 },
        { id: 24286, type: 'Item', count: 3 },
      ],
      id: 69,
      chat_link: '[&CUUAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Fake',
      output_item_id: 1234,
      output_item_count: 1,
      min_rating: 175,
      disciplines: ['Leatherworker', 'Armorsmith', 'Tailor'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 1337, type: 'Item', count: 1 },
        { id: 696, type: 'GuildUpgrade', count: 7 },
        { id: 1234567, type: 'GuildUpgrade', count: 7 },
      ],
      id: 69,
      chat_link: '[&CUUAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'GuildDecoration',
      output_item_id: 77749,
      output_item_count: 1,
      min_rating: 250,
      disciplines: ['Scribe'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 19679, type: 'Item', count: 3 }],
      output_upgrade_id: 696,
      id: 11756,
      chat_link: '[&CewtAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Fake too',
      output_item_id: 4567,
      output_item_count: 1,
      disciplines: [],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 9999998, type: 'GuildUpgrade', count: 7 },
        { id: 9999999, type: 'GuildUpgrade', count: 7 },
      ],
      id: 69,
      chat_link: '[&CUUAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 88771,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 88771, type: 'Item', count: 3 },
        { id: 88770, type: 'Item', count: 2 },
      ],
      id: 2,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 88772,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 88770, type: 'Item', count: 2 },
        { id: 88773, type: 'Item', count: 2 },
      ],
      id: 2,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 88773,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 88774, type: 'Item', count: 2 },
        { id: 9001, type: 'GuildUpgrade', count: 1 },
      ],
      id: 2,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 88774,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 88772, type: 'Item', count: 2 }],
      id: 2,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'GuildDecoration',
      output_item_id: 88775,
      output_item_count: 1,
      min_rating: 250,
      disciplines: ['Scribe'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 88772, type: 'Item', count: 2 },
        { id: 9001, type: 'GuildUpgrade', count: 1 },
      ],
      output_upgrade_id: 9001,
      id: 900011,
      chat_link: '[&CewtAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 99990,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [
        { id: 99994, type: 'Item', count: 1 },
        { id: 99991, type: 'Item', count: 2 },
        { id: 99992, type: 'Item', count: 2 },
        { id: 99993, type: 'Item', count: 2 },
      ],
      id: 1293083123,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 99991,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 99994, type: 'Item', count: 2 }],
      id: 987654645,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 99992,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 99994, type: 'Item', count: 2 }],
      id: 767567,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 99993,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 99994, type: 'Item', count: 2 }],
      id: 2344356,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'Refinement',
      output_item_id: 99994,
      output_item_count: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{ id: 99995, type: 'Item', count: 2 }],
      id: 12421412312,
      chat_link: '[&CQIAAAA=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
    {
      type: 'CraftingMaterial',
      output_item_id: 12235,
      output_item_count: 25,
      disciplines: ['Double Click'],
      flags: [],
      ingredients: [{ id: 12776, type: 'Item', count: 1 }],
      id: -1626,
      chat_link: '[&FAAAKE=]',
      multipleRecipeCount: 1,
      daily_purchase_cap: 0,
      weekly_purchase_cap: 0,
    },
  ]

  const output = nestRecipes(input)

  it('can build a one-layer recipe', () => {
    expect(output.find((x) => x.id === 19712)).toMatchSnapshot()
  })

  it('can build a one-layer recipe with output > 1', () => {
    expect(output.find((x) => x.id === 19112)).toMatchSnapshot()
  })

  it('can build a two-layer recipe', () => {
    expect(output.find((x) => x.id === 12988)).toMatchSnapshot()
  })

  it('can build a two-layer recipe with output > 1', () => {
    expect(output.find((x) => x.id === 12990)).toMatchSnapshot()
    expect(output.find((x) => x.id === 19679)).toMatchSnapshot()
  })

  it('orders the components correctly', () => {
    expect(output.find((x) => x.id === 19814)).toMatchSnapshot()
  })

  it('can include guild item ingredients', () => {
    expect(output.find((x) => x.id === 1234)).toMatchSnapshot()
  })

  it('can include guild item decorations', () => {
    const input: Array<API_Recipes_Entry_Next> = [
      {
        type: 'Refinement',
        output_item_id: 1001,
        output_item_count: 1,
        min_rating: 400,
        disciplines: ['Scribe'],
        flags: ['AutoLearned'],
        ingredients: [{ id: 1002, type: 'Item', count: 2 }],
        id: 2,
        chat_link: '[&CQIAAAA=]',
        multipleRecipeCount: 1,
        daily_purchase_cap: 0,
        weekly_purchase_cap: 0,
      },
      {
        type: 'Refinement',
        output_item_id: 1002,
        output_item_count: 1,
        min_rating: 400,
        disciplines: ['Scribe'],
        flags: ['AutoLearned'],
        ingredients: [
          { id: 2, type: 'Item', count: 2 },
          { id: 42, type: 'GuildUpgrade', count: 1 },
        ],
        id: 1,
        chat_link: '[&CQIAAAA=]',
        multipleRecipeCount: 1,
        daily_purchase_cap: 0,
        weekly_purchase_cap: 0,
      },
    ]
    const decorations = { 42: 1337 }

    const output = nestRecipes(input, decorations)
    expect(output).toMatchSnapshot()
  })

  it('doesnt thrown an error for self-referencing recipes', () => {
    expect(output.find((x) => x.id === 88771)).toMatchSnapshot()
  })

  it('doesnt thrown an error for recursive recipes', () => {
    expect(output.find((x) => x.id === 88772)).toMatchSnapshot()
  })

  it('works for recipes with same sub-components', () => {
    expect(output.find((x) => x.id === 99990)).toMatchSnapshot()
  })

  it('ignores recipes with only guild upgrades', () => {
    expect(output.find((x) => x.id === 4567)).toEqual(undefined)
  })

  it('excludes components for Condensed Ley-Line Essence items if they are components of each other', () => {
    const input: Array<API_Recipes_Entry_Next> = [
      {
        type: 'Recipe',
        output_item_id: 91137,
        output_item_count: 1,
        min_rating: 400,
        disciplines: ['Mystic Forge'],
        flags: [],
        ingredients: [
          {
            id: 24272,
            type: 'Item',
            count: 1,
          },
          {
            id: 24464,
            type: 'Item',
            count: 1,
          },
          {
            id: 24326,
            type: 'Item',
            count: 1,
          },
          {
            id: 91224,
            type: 'Item',
            count: 2,
          },
        ],
        id: 1,
        chat_link: '[&CQIAAAA=]',
        multipleRecipeCount: 3,
        daily_purchase_cap: 0,
        weekly_purchase_cap: 0,
      },
      {
        type: 'Recipe',
        output_item_id: 91171,
        output_item_count: 1,
        min_rating: 400,
        disciplines: ['Mystic Forge'],
        flags: [],
        ingredients: [
          {
            id: 24272,
            type: 'Item',
            count: 1,
          },
          {
            id: 24534,
            type: 'Item',
            count: 1,
          },
          {
            id: 24326,
            type: 'Item',
            count: 1,
          },
          {
            id: 91224,
            type: 'Item',
            count: 2,
          },
        ],
        id: 2,
        chat_link: '[&CQIAAAA=]',
        multipleRecipeCount: 3,
        daily_purchase_cap: 0,
        weekly_purchase_cap: 0,
      },
      {
        type: 'Recipe',
        output_item_id: 91222,
        output_item_count: 1,
        min_rating: 400,
        disciplines: ['Mystic Forge'],
        flags: [],
        ingredients: [
          {
            id: 24272,
            type: 'Item',
            count: 1,
          },
          {
            id: 24464,
            type: 'Item',
            count: 1,
          },
          {
            id: 24326,
            type: 'Item',
            count: 1,
          },
          {
            id: 91224,
            type: 'Item',
            count: 2,
          },
        ],
        id: 3,
        chat_link: '[&CQIAAAA=]',
        multipleRecipeCount: 3,
        daily_purchase_cap: 0,
        weekly_purchase_cap: 0,
      },
      {
        type: 'Recipe',
        output_item_id: 91224,
        output_item_count: 1,
        min_rating: 400,
        disciplines: ['Mystic Forge'],
        flags: [],
        ingredients: [
          {
            id: 24272,
            type: 'Item',
            count: 1,
          },
          {
            id: 24465,
            type: 'Item',
            count: 1,
          },
          {
            id: 91137,
            type: 'Item',
            count: 1,
          },
          {
            id: 91224,
            type: 'Item',
            count: 2,
          },
        ],
        id: 4,
        chat_link: '[&CQIAAAA=]',
        multipleRecipeCount: 3,
        daily_purchase_cap: 0,
        weekly_purchase_cap: 0,
      },
    ]

    const output = nestRecipes(input)
    expect(output).toMatchSnapshot()
  })
})
