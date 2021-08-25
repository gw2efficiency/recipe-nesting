/* eslint-env node, mocha */
import {expect} from 'chai'
import module from '../src/index.js'

describe('recipe-nesting', () => {
  let input = [
    {
      type: 'Refinement',
      output_item_id: 19712,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 19725, count: 3}],
      id: 2,
      chat_link: '[&CQIAAAA=]',
      output_item_count_range: '1-10',
      achievement_id: 12
    },
    {
      type: 'Refinement',
      output_item_id: 19112,
      output_item_count: 5,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 19725, count: 3}],
      id: 2,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 19685,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Armorsmith', 'Artificer', 'Weaponsmith', 'Scribe', 'Huntsman', 'Jeweler'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 19701, count: 2}],
      id: 21,
      chat_link: '[&CRUAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 12988,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 1000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 19712, count: 2}, {item_id: 19685, count: 3}],
      id: 39,
      chat_link: '[&CScAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 19710,
      output_item_count: 1,
      min_rating: 0,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 19723, count: 3}],
      id: 3,
      chat_link: '[&CQMAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 19679,
      output_item_count: 5,
      min_rating: 0,
      time_to_craft_ms: 1000,
      disciplines: ['Armorsmith', 'Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 19697, count: 10}, {item_id: 19704, count: 1}],
      id: 16,
      chat_link: '[&CRAAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 12990,
      output_item_count: 1,
      min_rating: 50,
      time_to_craft_ms: 1000,
      disciplines: ['Artificer', 'Weaponsmith', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 19710, count: 2}, {item_id: 19679, count: 3}],
      id: 30,
      chat_link: '[&CR4AAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 19742,
      output_item_count: 1,
      min_rating: 150,
      time_to_craft_ms: 2000,
      disciplines: ['Leatherworker', 'Armorsmith', 'Tailor', 'Scribe'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 19741, count: 2}],
      id: 7,
      chat_link: '[&CQcAAAA=]'
    },
    {
      type: 'Insignia',
      output_item_id: 19814,
      output_item_count: 1,
      min_rating: 175,
      time_to_craft_ms: 1000,
      disciplines: ['Leatherworker', 'Armorsmith', 'Tailor'],
      flags: ['AutoLearned'],
      ingredients: [
        {item_id: 24284, count: 3},
        {item_id: 19742, count: 1},
        {item_id: 24285, count: 3},
        {item_id: 24286, count: 3}
      ],
      id: 69,
      chat_link: '[&CUUAAAA=]'
    },
    {
      type: 'Fake',
      output_item_id: 1234,
      output_item_count: 1,
      min_rating: 175,
      time_to_craft_ms: 1000,
      disciplines: ['Leatherworker', 'Armorsmith', 'Tailor'],
      flags: ['AutoLearned'],
      ingredients: [
        {item_id: 1337, count: 1}
      ],
      guild_ingredients: [
        {upgrade_id: 696, count: 7},
        {upgrade_id: 1234567, count: 7}
      ],
      id: 69,
      chat_link: '[&CUUAAAA=]'
    },
    {
      type: 'GuildDecoration',
      output_item_id: 77749,
      output_item_count: 1,
      min_rating: 250,
      time_to_craft_ms: 1000,
      disciplines: ['Scribe'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 19679, count: 3}],
      output_upgrade_id: 696,
      id: 11756,
      chat_link: '[&CewtAAA=]'
    },
    {
      type: 'Fake too',
      output_item_id: 4567,
      output_item_count: 1,
      time_to_craft_ms: 1000,
      flags: ['AutoLearned'],
      ingredients: [],
      guild_ingredients: [
        {upgrade_id: 9999998, count: 7},
        {upgrade_id: 9999999, count: 7}
      ],
      id: 69,
      chat_link: '[&CUUAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 88771,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 88771, count: 3}, {item_id: 88770, count: 2}],
      id: 2,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 88772,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 88770, count: 2}, {item_id: 88773, count: 2}],
      id: 2,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 88773,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 88774, count: 2}],
      guild_ingredients: [{upgrade_id: 9001, count: 1}],
      id: 2,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 88774,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 88772, count: 2}],
      id: 2,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'GuildDecoration',
      output_item_id: 88775,
      output_item_count: 1,
      min_rating: 250,
      time_to_craft_ms: 1000,
      disciplines: ['Scribe'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 88772, count: 2}],
      guild_ingredients: [{upgrade_id: 9001, count: 1}],
      output_upgrade_id: 9001,
      id: 900011,
      chat_link: '[&CewtAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 99990,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [
        {item_id: 99994, count: 1},
        {item_id: 99991, count: 2},
        {item_id: 99992, count: 2},
        {item_id: 99993, count: 2}
      ],
      id: 1293083123,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 99991,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 99994, count: 2}],
      id: 987654645,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 99992,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 99994, count: 2}],
      id: 767567,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 99993,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 99994, count: 2}],
      id: 2344356,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'Refinement',
      output_item_id: 99994,
      output_item_count: 1,
      min_rating: 400,
      time_to_craft_ms: 2000,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      flags: ['AutoLearned'],
      ingredients: [{item_id: 99995, count: 2}],
      id: 12421412312,
      chat_link: '[&CQIAAAA=]'
    },
    {
      type: 'CraftingMaterial',
      output_item_id: 12235,
      output_item_count: 25,
      disciplines: ['Double Click'],
      ingredients: [{item_id: 12776, count: 1}],
      id: -1626
    }
  ]

  let output = module(input)

  it('can build a one-layer recipe', () => {
    let expected = {
      id: 19712,
      quantity: 1,
      output: 1,
      output_range: '1-10',
      achievement_id: 12,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      components: [
        {id: 19725, quantity: 3}
      ],
      recipe_id: 2
    }

    expect(output.find(x => x.id === 19712)).to.deep.equal(expected)
  })

  it('can build a one-layer recipe with output > 1', () => {
    let expected = {
      id: 19112,
      quantity: 1,
      output: 5,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      components: [
        {id: 19725, quantity: 3}
      ],
      recipe_id: 2
    }

    expect(output.find(x => x.id === 19112)).to.deep.equal(expected)
  })

  it('can build a two-layer recipe', () => {
    let expected = {
      id: 12988,
      quantity: 1,
      output: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      components: [
        {
          id: 19712,
          quantity: 2,
          output: 1,
          output_range: '1-10',
          achievement_id: 12,
          min_rating: 400,
          disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
          components: [
            {id: 19725, quantity: 3}
          ],
          recipe_id: 2
        },
        {
          id: 19685,
          quantity: 3,
          output: 1,
          min_rating: 400,
          disciplines: ['Armorsmith', 'Artificer', 'Weaponsmith', 'Scribe', 'Huntsman', 'Jeweler'],
          components: [
            {id: 19701, quantity: 2}
          ],
          recipe_id: 21
        }
      ],
      recipe_id: 39
    }

    expect(output.find(x => x.id === 12988)).to.deep.equal(expected)
  })

  it('can build a two-layer recipe with output > 1', () => {
    let expectedLeaf = {
      id: 12990,
      quantity: 1,
      output: 1,
      min_rating: 50,
      disciplines: ['Artificer', 'Weaponsmith', 'Huntsman'],
      components: [
        {
          id: 19710,
          quantity: 2,
          output: 1,
          min_rating: 0,
          disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
          components: [{id: 19723, quantity: 3}],
          recipe_id: 3
        },
        {
          id: 19679,
          quantity: 3,
          output: 5,
          min_rating: 0,
          disciplines: ['Armorsmith', 'Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
          components: [
            {id: 19697, quantity: 10},
            {id: 19704, quantity: 1}
          ],
          recipe_id: 16
        }
      ],
      recipe_id: 30
    }
    let expectedRoot = {
      id: 19679,
      quantity: 1,
      output: 5,
      min_rating: 0,
      disciplines: ['Armorsmith', 'Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      components: [
        {id: 19697, quantity: 10},
        {id: 19704, quantity: 1}
      ],
      recipe_id: 16
    }

    expect(output.find(x => x.id === 12990)).to.deep.equal(expectedLeaf)
    expect(output.find(x => x.id === 19679)).to.deep.equal(expectedRoot)
  })

  it('orders the components correctly', () => {
    let expected = {
      id: 19814,
      quantity: 1,
      output: 1,
      min_rating: 175,
      disciplines: ['Leatherworker', 'Armorsmith', 'Tailor'],
      components: [
        {
          id: 24284,
          quantity: 3
        },
        {
          id: 19742,
          quantity: 1,
          output: 1,
          min_rating: 150,
          disciplines: ['Leatherworker', 'Armorsmith', 'Tailor', 'Scribe'],
          components: [{id: 19741, quantity: 2}],
          recipe_id: 7
        },
        {
          id: 24285,
          quantity: 3
        },
        {
          id: 24286,
          quantity: 3
        }
      ],
      recipe_id: 69
    }

    expect(output.find(x => x.id === 19814)).to.deep.equal(expected)
  })

  it('can include guild item ingredients', () => {
    let expected = {
      id: 1234,
      quantity: 1,
      output: 1,
      min_rating: 175,
      disciplines: ['Leatherworker', 'Armorsmith', 'Tailor'],
      components: [
        {
          id: 1337,
          quantity: 1
        },
        {
          id: 77749,
          output: 1,
          quantity: 7,
          upgrade_id: 696,
          min_rating: 250,
          disciplines: ['Scribe'],
          components: [
            {
              id: 19679,
              output: 5,
              quantity: 3,
              min_rating: 0,
              disciplines: ['Armorsmith', 'Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
              components: [
                {
                  id: 19697,
                  quantity: 10
                },
                {
                  id: 19704,
                  quantity: 1
                }
              ],
              recipe_id: 16
            }
          ],
          recipe_id: 11756
        }
      ],
      recipe_id: 69
    }

    expect(output.find(x => x.id === 1234)).to.deep.equal(expected)
  })

  it('can include guild item decorations', () => {
    let input = [
      {
        type: 'Refinement',
        output_item_id: 1001,
        output_item_count: 1,
        min_rating: 400,
        time_to_craft_ms: 2000,
        disciplines: ['Scribe'],
        flags: ['AutoLearned'],
        ingredients: [{item_id: 1002, count: 2}],
        id: 2,
        chat_link: '[&CQIAAAA=]'
      },
      {
        type: 'Refinement',
        output_item_id: 1002,
        output_item_count: 1,
        min_rating: 400,
        time_to_craft_ms: 2000,
        disciplines: ['Scribe'],
        flags: ['AutoLearned'],
        ingredients: [{item_id: 2, count: 2}],
        guild_ingredients: [{upgrade_id: 42, count: 1}],
        id: 1,
        chat_link: '[&CQIAAAA=]'
      }
    ]
    let decorations = {42: 1337}
    let output = module(input, decorations)

    let expected = [
      {
        id: 1001,
        output: 1,
        min_rating: 400,
        disciplines: ['Scribe'],
        quantity: 1,
        components: [
          {
            id: 1002,
            output: 1,
            components: [
              {id: 2, quantity: 2},
              {id: 1337, quantity: 1}
            ],
            min_rating: 400,
            disciplines: ['Scribe'],
            quantity: 2,
            recipe_id: 1
          }
        ],
        recipe_id: 2
      },
      {
        id: 1002,
        output: 1,
        min_rating: 400,
        disciplines: ['Scribe'],
        quantity: 1,
        components: [
          {id: 2, quantity: 2},
          {id: 1337, quantity: 1}
        ],
        recipe_id: 1
      }
    ]

    expect(output).to.deep.equal(expected)
  })

  it('filters components', () => {
    let expected = {
      id: 4567,
      quantity: 1,
      output: 1,
      min_rating: null,
      disciplines: [],
      recipe_id: 69
    }

    expect(output.find(x => x.id === 4567)).to.deep.equal(expected)
  })

  it('doesnt thrown an error for self-referencing recipes', () => {
    let expected = {
      id: 88771,
      quantity: 1,
      output: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      components: [
        {
          id: 88771,
          quantity: 3
        },
        {
          id: 88770,
          quantity: 2
        }
      ],
      recipe_id: 2
    }

    expect(output.find(x => x.id === 88771)).to.deep.equal(expected)
  })

  it('doesnt thrown an error for recursive recipes', () => {
    let expected = {
      id: 88772,
      output: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      quantity: 1,
      components: [
        {id: 88770, quantity: 2},
        {
          id: 88773,
          output: 1,
          min_rating: 400,
          disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
          quantity: 2,
          components: [
            {
              id: 88774,
              output: 1,
              min_rating: 400,
              disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
              quantity: 2,
              components: [{
                id: 88772,
                output: 1,
                components: [
                  {id: 88770, quantity: 2},
                  {id: 88773, quantity: 2}
                ],
                min_rating: 400,
                disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
                quantity: 2,
                recipe_id: 2
              }],
              recipe_id: 2
            },
            {
              id: 88775,
              output: 1,
              min_rating: 250,
              disciplines: ['Scribe'],
              upgrade_id: 9001,
              quantity: 1,
              components: [
                {
                  id: 88772,
                  output: 1,
                  min_rating: 400,
                  disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
                  quantity: 2,
                  components: [
                    {id: 88770, quantity: 2},
                    {id: 88773, quantity: 2}
                  ],
                  recipe_id: 2
                },
                {
                  id: 88775,
                  disciplines: ['Scribe'],
                  min_rating: 250,
                  output: 1,
                  quantity: 1,
                  upgrade_id: 9001,
                  components: [
                    {id: 88772, quantity: 2},
                    {id: 9001, guild: true, quantity: 1}
                  ],
                  recipe_id: 900011
                }
              ],
              recipe_id: 900011
            }
          ],
          recipe_id: 2
        }
      ],
      recipe_id: 2
    }

    expect(output.find(x => x.id === 88772)).to.deep.equal(expected)
  })

  it('works for recipes with same sub-components', () => {
    let expected = {
      id: 99990,
      output: 1,
      min_rating: 400,
      disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
      quantity: 1,
      components: [
        {
          id: 99994,
          output: 1,
          min_rating: 400,
          disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
          quantity: 1,
          components: [{id: 99995, quantity: 2}],
          recipe_id: 12421412312
        },
        {
          id: 99991,
          output: 1,
          min_rating: 400,
          disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
          quantity: 2,
          components: [
            {
              id: 99994,
              output: 1,
              min_rating: 400,
              disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
              quantity: 2,
              components: [{id: 99995, quantity: 2}],
              recipe_id: 12421412312
            }
          ],
          recipe_id: 987654645
        },
        {
          id: 99992,
          output: 1,
          min_rating: 400,
          disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
          quantity: 2,
          components: [
            {
              id: 99994,
              output: 1,
              min_rating: 400,
              disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
              quantity: 2,
              components: [{id: 99995, quantity: 2}],
              recipe_id: 12421412312
            }
          ],
          recipe_id: 767567
        },
        {
          id: 99993,
          output: 1,
          min_rating: 400,
          disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
          quantity: 2,
          components: [
            {
              id: 99994,
              output: 1,
              min_rating: 400,
              disciplines: ['Artificer', 'Weaponsmith', 'Scribe', 'Huntsman'],
              quantity: 2,
              components: [{id: 99995, quantity: 2}],
              recipe_id: 12421412312
            }
          ],
          recipe_id: 2344356
        }
      ],
      recipe_id: 1293083123
    }

    expect(output.find(x => x.id === 99990)).to.deep.equal(expected)
  })

  it('ignores recipes for vendor items', () => {
    expect(output.find(x => x.id === 12235)).to.equal(undefined)
  })
})
