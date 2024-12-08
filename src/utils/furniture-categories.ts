export interface FurnitureCategory {
  room: string;
  items: string[];
}

export const furnitureCategories: FurnitureCategory[] = [
  {
    room: "Bedroom",
    items: [
      "Bed",
      "Bed Frame",
      "Bench",
      "Chest of Drawers",
      "Dresser",
      "Mattress",
      "Mirror",
      "Nightstand",
      "Vanity",
      "Wardrobe"
    ]
  },
  {
    room: "Dining Room",
    items: [
      "Buffet",
      "China Cabinet",
      "Dining Chairs",
      "Dining Table",
      "Server",
      "Wine Rack"
    ]
  },
  {
    room: "Living Room",
    items: [
      "Armchair",
      "Bookshelf",
      "Coffee Table",
      "Console Table",
      "Entertainment Center",
      "Loveseat",
      "Ottoman",
      "Recliner",
      "Side Table",
      "Sofa",
      "TV Stand"
    ]
  },
  {
    room: "Home Office",
    items: [
      "Bookcase",
      "Computer Desk",
      "Credenza",
      "Filing Cabinet",
      "Office Chair",
      "Writing Desk"
    ]
  },
  {
    room: "Outdoor",
    items: [
      "Deck Storage",
      "Garden Bench",
      "Outdoor Chairs",
      "Outdoor Sofa",
      "Patio Table"
    ]
  }
].map(category => ({
  ...category,
  items: category.items.sort()
}));