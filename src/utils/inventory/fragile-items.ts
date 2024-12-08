// List of items that should always be marked as fragile
export const fragileCategoryItems = [
  // Electronics
  'TV',
  'Television',
  'Computer Monitor',
  'Laptop',
  'Tablet',
  'Desktop Computer',
  'Gaming Console',
  'Stereo System',
  'Speakers',
  'Projector',

  // Glass/Mirrors
  'Mirror',
  'Glass Table',
  'China Cabinet',
  'Display Case',
  'Picture Frame',
  'Artwork',

  // Kitchen
  'Wine Glasses',
  'China',
  'Crystal',
  'Dishes',
  'Glassware',
  'Microwave',

  // Decorative
  'Vase',
  'Chandelier',
  'Lamp',
  'Antiques',
  'Sculptures',

  // Musical
  'Piano',
  'Guitar',
  'Musical Instruments',

  // Misc
  'Fish Tank',
  'Aquarium',
  'Record Player',
  'Vinyl Records'
];

export function isFragileItem(itemName: string): boolean {
  return fragileCategoryItems.some(fragileItem => 
    itemName.toLowerCase().includes(fragileItem.toLowerCase())
  );
}