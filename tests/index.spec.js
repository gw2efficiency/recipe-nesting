/* eslint-env node, mocha */
const expect = require('chai').expect
const module = require('../src/index.js')

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
    }
  ]

  let output = module(input)

  it('can build a one-layer recipe', () => {
    let expected = {
      id: 19712,
      quantity: 1,
      output: 1,
      components: [
        {id: 19725, quantity: 3}
      ]
    }

    expect(output.find(x => x.id === 19712)).to.deep.equal(expected)
  })

  it('can build a two-layer recipe', () => {
    let expected = {
      id: 12988,
      quantity: 1,
      output: 1,
      components: [
        {
          id: 19712,
          quantity: 2,
          output: 1,
          components: [
            {id: 19725, quantity: 6}
          ]
        },
        {
          id: 19685,
          quantity: 3,
          output: 1,
          components: [
            {id: 19701, quantity: 6}
          ]
        }
      ]
    }

    expect(output.find(x => x.id === 12988)).to.deep.equal(expected)
  })

  it('can build a two-layer recipe with output > 1', () => {
    let expectedLeaf = {
      id: 12990,
      quantity: 1,
      output: 1,
      components: [
        {
          id: 19710,
          quantity: 2,
          output: 1,
          components: [{id: 19723, quantity: 6}]
        },
        {
          id: 19679,
          quantity: 3,
          output: 5,
          components: [{id: 19697, quantity: 30}, {id: 19704, quantity: 3}]
        }
      ]
    }

    let expectedRoot = {
      id: 19679,
      quantity: 5,
      output: 5,
      components: [
        {id: 19697, quantity: 10},
        {id: 19704, quantity: 1}
      ]
    }

    expect(output.find(x => x.id === 12990)).to.deep.equal(expectedLeaf)
    expect(output.find(x => x.id === 19679)).to.deep.equal(expectedRoot)
  })

  it('orders the components correctly', () => {
    let expected = {
      id: 19814,
      quantity: 1,
      output: 1,
      components: [
        {
          id: 24284,
          quantity: 3
        },
        {
          id: 24285,
          quantity: 3
        },
        {
          id: 24286,
          quantity: 3
        },
        {
          id: 19742,
          quantity: 1,
          output: 1,
          components: [{id: 19741, quantity: 2}]
        }
      ]
    }

    expect(output.find(x => x.id === 19814)).to.deep.equal(expected)
  })
})
