declare module 'gw2e-recipe-calculation' {
  interface VendorItem {
    type: string
    quantity: number
    cost: number
    npcs: Array<{ name: string; position: string }>
  }

  export const staticItems: {
    vendorItems: Record<string, VendorItem>
  }
}
