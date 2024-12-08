export const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const commonItems = {
  'Living Room': [
    'Sofa', 'Coffee Table', 'TV Stand', 'Armchair', 'Bookshelf'
  ],
  'Bedroom': [
    'Bed', 'Dresser', 'Nightstand', 'Desk', 'Chair'
  ],
  'Kitchen': [
    'Table', 'Chairs', 'Microwave', 'Refrigerator', 'Cabinet'
  ],
  'Bathroom': [
    'Cabinet', 'Mirror', 'Shelves'
  ],
  'Office': [
    'Desk', 'Office Chair', 'Filing Cabinet', 'Bookshelf', 'Lamp'
  ]
};