export interface Recipe {
  type: string
  output_item_id: number
  output_upgrade_id?: number
  output_item_count_range?: string
  achievement_id?: number
  output_item_count: number
  min_rating?: number
  disciplines: Array<string>
  flags: Array<string>
  ingredients: Array<{
    type: 'Item' | 'GuildUpgrade' | 'Currency'
    id: number
    count: number
  }>
  id: number
  chat_link: string
}

export type DecorationsToItemsMap = Record<number, number>
