// TODO Extract to shared type library
export interface API_Recipes_Entry {
  type: string
  output_item_id: number
  output_upgrade_id?: number
  output_item_count_range?: string
  achievement_id?: number
  merchant?: { name: string; locations: Array<string> }
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

export interface API_Recipes_Entry_Next extends API_Recipes_Entry {
  multipleRecipeCount: number
  daily_purchase_cap?: number
  weekly_purchase_cap?: number
}
