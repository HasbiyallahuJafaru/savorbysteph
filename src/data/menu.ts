// Placeholder menu. TODO(owner): confirm dishes, portion sizes and prices.

export type CategoryId = "rice" | "soups" | "grills" | "small-chops" | "sides" | "drinks" | "trays";

export type MenuOption = { label: string; price: number };

export type MenuItem = {
  slug: string;
  name: string;
  category: CategoryId;
  short: string;
  description: string;
  image: string;
  options: MenuOption[];
  spice: 0 | 1 | 2 | 3;
  tags: string[];
  signature?: boolean;
  pairsWith?: string[];
};

export const categories: { id: CategoryId; name: string; blurb: string; image: string }[] = [
  { id: "rice", name: "Rice dishes", blurb: "Smoky party jollof, fried rice and ofada.", image: "/images/dishes/jollof-rice.webp" },
  { id: "soups", name: "Soups & swallow", blurb: "Egusi, efo riro, okra, afang and pepper soups.", image: "/images/dishes/egusi-soup.webp" },
  { id: "grills", name: "Grills & proteins", blurb: "Suya, asun and peppered chicken.", image: "/images/dishes/suya.webp" },
  { id: "small-chops", name: "Small chops", blurb: "Puff puff, meat pies and chin chin.", image: "/images/dishes/puff-puff.webp" },
  { id: "sides", name: "Sides", blurb: "Dodo, moi moi and pounded yam.", image: "/images/dishes/dodo.webp" },
  { id: "drinks", name: "Drinks", blurb: "Chilled zobo made from hibiscus.", image: "/images/dishes/zobo.webp" },
  { id: "trays", name: "Party trays", blurb: "Feed the whole party. 72 hours notice.", image: "/images/dishes/party-tray.webp" },
];

export const menu: MenuItem[] = [
  {
    slug: "jollof-rice",
    name: "Party Jollof Rice",
    category: "rice",
    short: "Smoky tomato jollof with fried chicken.",
    description:
      "Long grain rice slow cooked in a pepper and tomato base until it picks up that smoky party flavor. Served with fried chicken and a boiled egg.",
    image: "/images/dishes/jollof-rice.webp",
    options: [
      { label: "Regular plate", price: 18 },
      { label: "Large plate", price: 24 },
    ],
    spice: 1,
    tags: ["Best seller", "Gluten free"],
    signature: true,
    pairsWith: ["dodo", "moi-moi", "peppered-chicken"],
  },
  {
    slug: "fried-rice",
    name: "Nigerian Fried Rice",
    category: "rice",
    short: "Curry fried rice with vegetables and chicken.",
    description:
      "Fragrant curry and thyme fried rice tossed with sweet corn, carrots, green peas and liver. Served with chicken.",
    image: "/images/dishes/fried-rice.webp",
    options: [
      { label: "Regular plate", price: 18 },
      { label: "Large plate", price: 24 },
    ],
    spice: 0,
    tags: ["Mild"],
    pairsWith: ["dodo", "jollof-rice"],
  },
  {
    slug: "ofada-rice",
    name: "Ofada Rice & Ayamase",
    category: "rice",
    short: "Local rice with green pepper stew.",
    description:
      "Unpolished ofada rice with ayamase, the green bell pepper and locust bean stew with assorted meat and boiled egg.",
    image: "/images/dishes/ofada-rice.webp",
    options: [
      { label: "Regular plate", price: 22 },
      { label: "Large plate", price: 28 },
    ],
    spice: 3,
    tags: ["Spicy"],
    signature: true,
    pairsWith: ["dodo"],
  },
  {
    slug: "egusi-soup",
    name: "Egusi Soup",
    category: "soups",
    short: "Ground melon seed soup with assorted meat.",
    description:
      "Rich egusi cooked in palm oil with leafy greens, stockfish, beef, shaki and ponmo. Order with pounded yam for the full experience.",
    image: "/images/dishes/egusi-soup.webp",
    options: [
      { label: "1 quart", price: 24 },
      { label: "Half gallon", price: 44 },
    ],
    spice: 2,
    tags: ["Best seller"],
    signature: true,
    pairsWith: ["pounded-yam"],
  },
  {
    slug: "efo-riro",
    name: "Efo Riro",
    category: "soups",
    short: "Yoruba spinach stew with assorted meat.",
    description:
      "Spinach cooked down in a red pepper base with locust beans, smoked fish and assorted meat. Deep, savory and very green.",
    image: "/images/dishes/efo-riro.webp",
    options: [
      { label: "1 quart", price: 22 },
      { label: "Half gallon", price: 40 },
    ],
    spice: 2,
    tags: ["Leafy"],
    pairsWith: ["pounded-yam"],
  },
  {
    slug: "okra-soup",
    name: "Okra Soup",
    category: "soups",
    short: "Fresh chopped okra with seafood and meat.",
    description: "Fresh okra with palm oil, crayfish, spinach, beef and fish. A light, stretchy “draw” soup that is full of flavor.",
    image: "/images/dishes/okra-soup.webp",
    options: [
      { label: "1 quart", price: 22 },
      { label: "Half gallon", price: 40 },
    ],
    spice: 2,
    tags: [],
    pairsWith: ["pounded-yam"],
  },
  {
    slug: "ogbono-soup",
    name: "Ogbono Soup",
    category: "soups",
    short: "Wild mango seed soup with assorted meat.",
    description: "Silky ogbono soup thickened with ground wild mango seed, cooked with beef, shaki and stockfish.",
    image: "/images/dishes/ogbono-soup.webp",
    options: [
      { label: "1 quart", price: 22 },
      { label: "Half gallon", price: 40 },
    ],
    spice: 2,
    tags: [],
    pairsWith: ["pounded-yam"],
  },
  {
    slug: "banga-soup",
    name: "Banga Soup",
    category: "soups",
    short: "Delta palm fruit soup with fresh fish.",
    description: "Palm fruit soup from the Niger Delta, flavored with banga spices and bitter leaf, cooked with fresh fish.",
    image: "/images/dishes/banga-soup.webp",
    options: [
      { label: "1 quart", price: 26 },
      { label: "Half gallon", price: 48 },
    ],
    spice: 2,
    tags: [],
    pairsWith: ["pounded-yam"],
  },
  {
    slug: "afang-soup",
    name: "Afang Soup",
    category: "soups",
    short: "Efik afang and waterleaf soup.",
    description: "A Calabar classic packed with shredded afang leaves, waterleaf, periwinkle, beef and stockfish.",
    image: "/images/dishes/afang-soup.webp",
    options: [
      { label: "1 quart", price: 26 },
      { label: "Half gallon", price: 48 },
    ],
    spice: 2,
    tags: ["Leafy"],
    pairsWith: ["pounded-yam"],
  },
  {
    slug: "goat-pepper-soup",
    name: "Goat Meat Pepper Soup",
    category: "soups",
    short: "Hot, peppery broth with tender goat.",
    description: "A clear, fiery broth with goat meat, uda, calabash nutmeg and scent leaf. The one you want on a cold evening.",
    image: "/images/dishes/goat-pepper-soup.webp",
    options: [
      { label: "Bowl", price: 20 },
      { label: "1 quart", price: 30 },
    ],
    spice: 3,
    tags: ["Spicy"],
    signature: true,
  },
  {
    slug: "catfish-pepper-soup",
    name: "Catfish Pepper Soup",
    category: "soups",
    short: "Point and kill style catfish broth.",
    description: "Fresh catfish in a hot, aromatic pepper soup broth with scent leaf and traditional pepper soup spices.",
    image: "/images/dishes/catfish-pepper-soup.webp",
    options: [
      { label: "Bowl", price: 24 },
      { label: "1 quart", price: 34 },
    ],
    spice: 3,
    tags: ["Spicy"],
  },
  {
    slug: "pounded-yam",
    name: "Pounded Yam",
    category: "sides",
    short: "Smooth swallow for any soup.",
    description: "Soft, stretchy pounded yam wrapped and ready to pair with egusi, efo riro, okra or afang.",
    image: "/images/dishes/pounded-yam.webp",
    options: [
      { label: "2 wraps", price: 6 },
      { label: "5 wraps", price: 14 },
    ],
    spice: 0,
    tags: ["Swallow"],
    pairsWith: ["egusi-soup", "efo-riro"],
  },
  {
    slug: "suya",
    name: "Beef Suya",
    category: "grills",
    short: "Grilled spiced beef with onions.",
    description: "Thin beef skewers rubbed with yaji spice and grilled, served with sliced onions, tomatoes and extra suya pepper.",
    image: "/images/dishes/suya.webp",
    options: [
      { label: "Half pound", price: 16 },
      { label: "One pound", price: 28 },
    ],
    spice: 2,
    tags: ["Best seller"],
    signature: true,
  },
  {
    slug: "asun",
    name: "Asun",
    category: "grills",
    short: "Peppered smoked goat meat.",
    description: "Smoky grilled goat meat tossed in a hot pepper and onion sauce. A party favorite.",
    image: "/images/dishes/asun.webp",
    options: [
      { label: "Small tray", price: 18 },
      { label: "Large tray", price: 32 },
    ],
    spice: 3,
    tags: ["Spicy"],
  },
  {
    slug: "peppered-chicken",
    name: "Peppered Chicken & Dodo",
    category: "grills",
    short: "Fried chicken in pepper sauce with plantain.",
    description: "Seasoned chicken fried until crisp, tossed in pepper sauce and served with sweet fried plantain.",
    image: "/images/dishes/peppered-chicken.webp",
    options: [
      { label: "4 pieces", price: 17 },
      { label: "8 pieces", price: 30 },
    ],
    spice: 2,
    tags: [],
  },
  {
    slug: "puff-puff",
    name: "Puff Puff",
    category: "small-chops",
    short: "Soft, sweet fried dough balls.",
    description: "Golden, fluffy puff puff dusted with sugar. Great for parties or a sweet treat after your soup.",
    image: "/images/dishes/puff-puff.webp",
    options: [
      { label: "12 pieces", price: 10 },
      { label: "30 pieces", price: 22 },
    ],
    spice: 0,
    tags: ["Vegetarian"],
    signature: true,
  },
  {
    slug: "meat-pie",
    name: "Nigerian Meat Pie",
    category: "small-chops",
    short: "Buttery pastry with minced beef filling.",
    description: "Short, buttery pastry filled with seasoned minced beef, potatoes and carrots. Baked fresh.",
    image: "/images/dishes/meat-pie.webp",
    options: [
      { label: "4 pies", price: 12 },
      { label: "10 pies", price: 28 },
    ],
    spice: 0,
    tags: [],
  },
  {
    slug: "chin-chin",
    name: "Chin Chin",
    category: "small-chops",
    short: "Crunchy fried snack with nutmeg.",
    description: "Crunchy, lightly sweet fried dough bites flavored with nutmeg. Packed in a resealable bag.",
    image: "/images/dishes/chin-chin.webp",
    options: [
      { label: "Small bag", price: 9 },
      { label: "Large bag", price: 16 },
    ],
    spice: 0,
    tags: ["Vegetarian"],
  },
  {
    slug: "dodo",
    name: "Dodo",
    category: "sides",
    short: "Sweet fried ripe plantain.",
    description: "Ripe plantain sliced and fried until caramelized at the edges. The side that goes with everything.",
    image: "/images/dishes/dodo.webp",
    options: [{ label: "Side", price: 6 }],
    spice: 0,
    tags: ["Vegan"],
  },
  {
    slug: "moi-moi",
    name: "Moi Moi",
    category: "sides",
    short: "Steamed bean pudding.",
    description: "Steamed black eyed bean pudding with peppers, egg and fish. Soft, savory and filling.",
    image: "/images/dishes/moi-moi.webp",
    options: [
      { label: "1 wrap", price: 7 },
      { label: "4 wraps", price: 24 },
    ],
    spice: 1,
    tags: ["Gluten free"],
  },
  {
    slug: "zobo",
    name: "Zobo",
    category: "drinks",
    short: "Chilled hibiscus drink with ginger.",
    description: "Hibiscus steeped with ginger, cloves and pineapple, then chilled. Naturally tart and refreshing.",
    image: "/images/dishes/zobo.webp",
    options: [
      { label: "16 oz bottle", price: 7 },
      { label: "Half gallon", price: 18 },
    ],
    spice: 0,
    tags: ["Vegan"],
  },
  {
    slug: "party-jollof-tray",
    name: "Jollof & Fried Rice Party Tray",
    category: "trays",
    short: "Half jollof, half fried rice with chicken.",
    description:
      "A full party tray of jollof and fried rice with chicken. Order at least 72 hours ahead for birthdays, church events and office lunches.",
    image: "/images/dishes/party-tray.webp",
    options: [
      { label: "Serves 10 to 12", price: 140 },
      { label: "Serves 20 to 25", price: 260 },
    ],
    spice: 1,
    tags: ["Catering"],
  },
];

export const getItem = (slug: string) => menu.find((m) => m.slug === slug);
export const itemsIn = (category: CategoryId) => menu.filter((m) => m.category === category);
export const signatureItems = menu.filter((m) => m.signature);
export const fromPrice = (item: MenuItem) => Math.min(...item.options.map((o) => o.price));
export const formatPrice = (n: number) => `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`;
