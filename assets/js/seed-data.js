/**
 * Health Shark - Initial Seed Menu Data
 * Category IDs:
 *  - snacks: "Snacks & Special Bites"
 *  - burgers: "Burgers & Sandwiches"
 *  - noodles: "Noodles & Pasta"
 *  - meals: "Pre-Order Meals & Combos"
 *  - desserts: "Baked Goods & Desserts"
 *  - ingredients: "Raw & Specialty Ingredients"
 */

const SEED_CATEGORIES = [
  {
    id: "snacks",
    name: "Snacks & Special Bites",
    subtitle: "Spring rolls, Samosa, Momos & Meatbox",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80",
    icon: "fa-cookie-bite"
  },
  {
    id: "burgers",
    name: "Burgers & Sandwiches",
    subtitle: "Mini burgers, Fried chicken & Club sandwiches",
    badge: "Juicy & Fresh",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=700&q=80",
    icon: "fa-burger"
  },
  {
    id: "noodles",
    name: "Noodles & Pasta",
    subtitle: "Egg noodles, Ramen bowl & Pasta meatbox",
    badge: "Wok Tossed",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80",
    icon: "fa-bowl-rice"
  },
  {
    id: "meals",
    name: "Pre-Order Meals & Combos",
    subtitle: "Chicken Biriani, Beef Khichuri & Duck Meat",
    badge: "Pre-Order",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80",
    icon: "fa-drumstick-bite"
  },
  {
    id: "desserts",
    name: "Baked Goods & Desserts",
    subtitle: "Fudgy Brownies, Kunafa, Pudding & Firni",
    badge: "Guilt-Free Sweet",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    icon: "fa-cake-candles"
  },
  {
    id: "ingredients",
    name: "Raw & Specialty Ingredients",
    subtitle: "Date powder (Khejur gura) & Fresh spice pastes",
    badge: "Pure & Natural",
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=700&q=80",
    icon: "fa-seedling"
  }
];

const SEED_MENU_ITEMS = [
  {
    id: "spring-rolls",
    name: "Crispy Spring Rolls",
    category: "snacks",
    categoryName: "Snacks & Special Bites",
    price: 120,
    priceDisplay: "৳ 120",
    unit: "box",
    rating: 4.9,
    reviewsCount: 38,
    badge: "Best Seller",
    isPopular: true,
    description: "Crispy golden rolls packed with seasoned shredded chicken and fresh farm vegetables. Rolled by hand with light, flaky wrapper and fried in fresh oil.",
    features: [
      "100% Fresh Farm Chicken & Vegetables",
      "No Artificial Preservatives or MSG",
      "Special Homemade Mint-Coriander Dip",
      "Crispy, non-greasy perfection"
    ],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "chicken-samosa",
    name: "Handcrafted Chicken Samosa",
    category: "snacks",
    categoryName: "Snacks & Special Bites",
    price: 100,
    priceDisplay: "৳ 100",
    unit: "pc",
    rating: 4.8,
    reviewsCount: 52,
    badge: "Customer Favorite",
    isPopular: true,
    description: "Authentic triangular pastry pockets stuffed with minced chicken, fragrant roasted spices, fresh onions, and green chilies. Fried to crunchy perfection.",
    features: [
      "Premium minced halal chicken",
      "Zero trans-fat & no artificial coloring",
      "Fresh homemade pastry dough",
      "Served hot with tangy tamarind dip"
    ],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "chicken-nuggets",
    name: "Golden Chicken Nuggets",
    category: "snacks",
    categoryName: "Snacks & Special Bites",
    price: 150,
    priceDisplay: "৳ 150",
    unit: "box",
    rating: 4.9,
    reviewsCount: 29,
    badge: "Kids Favorite",
    isPopular: true,
    description: "Tender breast meat chicken coated in a light golden crumb breading. Mildly seasoned with garlic and black pepper, perfect for kids and adults alike.",
    features: [
      "100% pure chicken breast meat (No fillers)",
      "Zero artificial binders or preservatives",
      "Crispy exterior with juicy, tender core",
      "Great source of clean protein"
    ],
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "chicken-momos",
    name: "Steamed Chicken Momos",
    category: "snacks",
    categoryName: "Snacks & Special Bites",
    price: 140,
    priceDisplay: "৳ 140",
    unit: "plate",
    rating: 4.9,
    reviewsCount: 64,
    badge: "Signature Dish",
    isPopular: true,
    description: "Soft, juicy and healthy dumplings stuffed with seasoned minced chicken, ginger, and aromatic herbs. Steamed fresh to lock in nutrients and flavor.",
    features: [
      "Steamed healthy cooking (Low calorie)",
      "Minced fresh chicken & aromatics",
      "Special spicy homemade tomato-sesame sauce",
      "Nutritionist approved healthy snack"
    ],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "chicken-donuts",
    name: "Savory Chicken Donuts",
    category: "snacks",
    categoryName: "Snacks & Special Bites",
    price: 160,
    priceDisplay: "৳ 160",
    unit: "pc",
    rating: 4.8,
    reviewsCount: 22,
    badge: "Unique Recipe",
    isPopular: false,
    description: "A fun and scrumptious twist! Ring-shaped seasoned chicken patties crusted in crisp panko crumbs, crispy outside and mouth-meltingly soft inside.",
    features: [
      "Wholesome minced chicken with potato & herbs",
      "No food coloring or synthetic flavors",
      "Kid-friendly and great for teatime",
      "Served with homemade garlic mayo"
    ],
    image: "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "meatbox-special",
    name: "Health Shark Loaded Meatbox",
    category: "snacks",
    categoryName: "Snacks & Special Bites",
    price: 220,
    priceDisplay: "৳ 220",
    unit: "box",
    rating: 4.9,
    reviewsCount: 75,
    badge: "Best Seller",
    isPopular: true,
    description: "A hearty box packed with seasoned grilled chicken chunks, potato wedges, chicken sausage bites, and drizzled with our signature herb sauce.",
    features: [
      "Generous portion of protein-rich chicken",
      "Freshly prepared potato wedges",
      "Low-fat homemade signature sauce",
      "Nutritious and extremely satisfying"
    ],
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "pasta-meatbox",
    name: "Cheesy Pasta Meatbox",
    category: "noodles",
    categoryName: "Noodles & Pasta",
    price: 180,
    priceDisplay: "৳ 180",
    unit: "box",
    rating: 4.8,
    reviewsCount: 41,
    badge: "Top Rated",
    isPopular: false,
    description: "Al dente macaroni pasta tossed with tender chicken bites, mushrooms, and a rich, creamy homemade white sauce lightly baked with mozzarella.",
    features: [
      "Real dairy cheese and cream sauce",
      "Loaded with tender sautéed chicken",
      "No artificial thickeners or MSG",
      "Served warm and bubbling"
    ],
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mini-burger",
    name: "Classic Mini Chicken Burger",
    category: "burgers",
    categoryName: "Burgers & Sandwiches",
    price: 160,
    priceDisplay: "৳ 160",
    unit: "pc",
    rating: 4.7,
    reviewsCount: 31,
    badge: "Snack Favorite",
    isPopular: false,
    description: "Soft freshly baked mini bun with a juicy homemade chicken patty, fresh crunchy lettuce, sliced cucumber, and tangy homemade sauce.",
    features: [
      "Freshly baked soft buns without chemical dough conditioners",
      "100% natural chicken patty seasoned with mild herbs",
      "Crisp, sanitised garden greens",
      "Perfect portion for light hunger"
    ],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "fried-chicken-burger",
    name: "Crispy Fried Chicken Burger",
    category: "burgers",
    categoryName: "Burgers & Sandwiches",
    price: 200,
    priceDisplay: "৳ 200",
    unit: "pc",
    rating: 4.9,
    reviewsCount: 58,
    badge: "Must Try",
    isPopular: true,
    description: "Thick, succulent chicken fillet seasoned in buttermilk & spices, coated for maximum crunch, topped with homemade slaw and secret sauce.",
    features: [
      "Whole chicken breast fillet (never processed)",
      "Crisp coleslaw tossed in light dressing",
      "Fluffy sesame brioche bun",
      "Zero artificial enhancers"
    ],
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "club-sandwich",
    name: "Nutritious Club Sandwich",
    category: "burgers",
    categoryName: "Burgers & Sandwiches",
    price: 190,
    priceDisplay: "৳ 190",
    unit: "pc",
    rating: 4.8,
    reviewsCount: 36,
    badge: "Healthy Choice",
    isPopular: true,
    description: "Triple-decker whole wheat sandwich layered with shredded boiled chicken breast, fresh boiled egg slices, cucumber, tomatoes, and light honey-mustard spread.",
    features: [
      "High fiber bread & lean protein",
      "Nutrient-dense with farm egg and veggies",
      "Low calorie homemade dressing",
      "Ideal for quick breakfast or healthy lunch"
    ],
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "egg-noodles",
    name: "Wok-Tossed Egg Noodles",
    category: "noodles",
    categoryName: "Noodles & Pasta",
    price: 180,
    priceDisplay: "৳ 180",
    unit: "plate",
    rating: 4.7,
    reviewsCount: 28,
    badge: "Homestyle",
    isPopular: false,
    description: "Classic yellow noodles stir-fried with farm fresh eggs, julienned carrots, bell peppers, cabbage, and light soya garlic glaze.",
    features: [
      "Light stir-fry in pure vegetable oil",
      "Packed with crunchy vegetables and egg protein",
      "No chemical flavoring cubes or testing salt (No MSG)",
      "Balanced savory comfort meal"
    ],
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "chicken-chowmein",
    name: "Special Chicken Chowmein",
    category: "noodles",
    categoryName: "Noodles & Pasta",
    price: 250,
    priceDisplay: "৳ 250",
    unit: "plate",
    rating: 4.9,
    reviewsCount: 44,
    badge: "Chef Special",
    isPopular: true,
    description: "Generous platter of savory stir-fried noodles with marinated chicken strips, mushrooms, spring onions, and our secret herb-infused dark wok sauce.",
    features: [
      "Generous chicken chunks and seasonal greens",
      "Wok-tossed fresh upon order",
      "Natural homemade sauce blend",
      "Substantial full meal portion"
    ],
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "healthy-ramen",
    name: "Nutritious Chicken Ramen Bowl",
    category: "noodles",
    categoryName: "Noodles & Pasta",
    price: 280,
    priceDisplay: "৳ 280",
    unit: "bowl",
    rating: 4.8,
    reviewsCount: 21,
    badge: "Immunity Booster",
    isPopular: false,
    description: "A nourishing slow-simmered chicken bone broth bowl served with noodles, tender chicken slices, seasoned soft-boiled egg, greens, and toasted sesame.",
    features: [
      "Slow-cooked collagen-rich chicken bone broth",
      "Natural immunity booster designed by nutritionist",
      "Rich in essential minerals and vitamins",
      "Warm, comforting and rejuvenating"
    ],
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "chicken-biriani",
    name: "Pre-Order: Special Chicken Biriani",
    category: "meals",
    categoryName: "Pre-Order Meals & Combos",
    price: 280,
    priceDisplay: "৳ 280",
    unit: "plate",
    rating: 5.0,
    reviewsCount: 88,
    badge: "Pre-Order Special",
    isPopular: true,
    description: "Aromatic Kalijira rice cooked in pure ghee with succulent chicken quarters, caramelized fried onions (beresta), and delicate whole spices. Zero artificial scent.",
    features: [
      "Cooked in pure farm ghee & premium Kalijira rice",
      "No artificial kewra essence or artificial food coloring",
      "Pre-order guarantees peak freshness and slow-cooked dum aroma",
      "Includes fresh cucumber salad and boiled egg"
    ],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "beef-biriani",
    name: "Pre-Order: Traditional Beef Biriani",
    category: "meals",
    categoryName: "Pre-Order Meals & Combos",
    price: 350,
    priceDisplay: "৳ 350",
    unit: "plate",
    rating: 4.9,
    reviewsCount: 63,
    badge: "Pre-Order Special",
    isPopular: true,
    description: "Tender chunks of slow-braised beef cooked with fragrant basmati rice, saffron-infused milk, and traditional spices. Rich, royal and authentic.",
    features: [
      "Choice cuts of fresh tender beef",
      "Slow-cooked in authentic Dum technique",
      "Rich flavor with natural spices only",
      "Pre-order minimum 3-4 hours prior"
    ],
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "beef-khichuri",
    name: "Pre-Order: Shahi Beef Bhuna Khichuri",
    category: "meals",
    categoryName: "Pre-Order Meals & Combos",
    price: 320,
    priceDisplay: "৳ 320",
    unit: "plate",
    rating: 4.9,
    reviewsCount: 47,
    badge: "Traditional Flavor",
    isPopular: false,
    description: "Comfort food at its finest. Fragrant aromatic rice and moong lentil bhuna cooked with pure ghee, mustard oil, and melt-in-mouth beef pieces.",
    features: [
      "Roasted Moong Dal & aromatic Chinigura rice",
      "Cooked with pure mustard oil & cow ghee",
      "Accompanied by homemade olive pickle & salad",
      "Wholesome, protein-packed Bangladeshi meal"
    ],
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "duck-meat-bhuna",
    name: "Pre-Order: Special Duck Meat Bhuna (Haash)",
    category: "meals",
    categoryName: "Pre-Order Meals & Combos",
    price: 450,
    priceDisplay: "৳ 450",
    unit: "kg",
    rating: 5.0,
    reviewsCount: 39,
    badge: "Winter Special",
    isPopular: false,
    description: "Traditional village-style rich duck curry slow-cooked with fresh garlic cloves, roasted cumin, and black pepper. Unmatched depth of flavor.",
    features: [
      "Carefully cleaned and roasted tender duck",
      "Authentic thick bhuna gravy",
      "Prepared with hand-pounded country spices",
      "Pre-order required (custom portions available)"
    ],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mutton-korma",
    name: "Pre-Order: Shahi Mutton Korma",
    category: "meals",
    categoryName: "Pre-Order Meals & Combos",
    price: 480,
    priceDisplay: "৳ 480",
    unit: "kg",
    rating: 4.9,
    reviewsCount: 34,
    badge: "Royal Delicacy",
    isPopular: false,
    description: "Mouth-melting mutton pieces simmered gently in a mildly spiced cashew nut, yogurt, and cardamom gravy with pure cow ghee.",
    features: [
      "Tender goat mutton cuts",
      "Nut-based rich gravy without commercial paste",
      "Mildly spiced, easy on the stomach",
      "Royal party & family gathering favorite"
    ],
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "fudgy-brownies",
    name: "Fudgy Chocolate Brownies",
    category: "desserts",
    categoryName: "Baked Goods & Desserts",
    price: 180,
    priceDisplay: "৳ 180",
    unit: "box",
    rating: 4.9,
    reviewsCount: 92,
    badge: "Best Seller",
    isPopular: true,
    description: "Ultra rich, dense and gooey brownies baked with real dark chocolate and butter. Crisp crackly crust on top with a decadent fudge center.",
    features: [
      "Real Belgian dark cocoa & butter",
      "Reduced sugar balance for guilt-free indulgence",
      "No artificial flavorings or bakery shortening",
      "Warm in microwave for 15 seconds for molten delight"
    ],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "arabian-kunafa",
    name: "Creamy Arabian Kunafa",
    category: "desserts",
    categoryName: "Baked Goods & Desserts",
    price: 240,
    priceDisplay: "৳ 240",
    unit: "piece",
    rating: 4.9,
    reviewsCount: 51,
    badge: "Middle Eastern Special",
    isPopular: true,
    description: "Crispy shredded filo pastry filled with rich homemade ashta cream, soaked in mild fragrant sugar syrup and garnished with crushed pistachios.",
    features: [
      "Fresh homemade clotted milk cream (Ashta)",
      "Light rose & orange blossom infused syrup",
      "Generously sprinkled with Iranian pistachios",
      "Authentic Arabic dessert experience"
    ],
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "caramel-pudding",
    name: "Homemade Caramel Custard Pudding",
    category: "desserts",
    categoryName: "Baked Goods & Desserts",
    price: 150,
    priceDisplay: "৳ 150",
    unit: "box",
    rating: 4.8,
    reviewsCount: 43,
    badge: "Classic Delight",
    isPopular: false,
    description: "Silky, melt-in-the-mouth custard pudding prepared with fresh milk, farm eggs, and crowned with a golden amber caramel sauce.",
    features: [
      "Fresh farm cow milk & organic eggs",
      "Naturally sweetened golden caramel",
      "No gelatin or artificial setting agents",
      "Served chilled"
    ],
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mahalabia",
    name: "Fragrant Mahalabia Milk Pudding",
    category: "desserts",
    categoryName: "Baked Goods & Desserts",
    price: 140,
    priceDisplay: "৳ 140",
    unit: "cup",
    rating: 4.8,
    reviewsCount: 27,
    badge: "Nutritionist Pick",
    isPopular: false,
    description: "A delicate Mediterranean milk pudding infused with cardamom and rose water, topped with slivered almonds and dried rose petals.",
    features: [
      "Gentle on digestion and light in calories",
      "Infused with natural floral water and cardamom",
      "Nutrient-rich almond garnish",
      "Wholesome after-meal treat"
    ],
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "shahi-firni",
    name: "Traditional Shahi Firni",
    category: "desserts",
    categoryName: "Baked Goods & Desserts",
    price: 130,
    priceDisplay: "৳ 130",
    unit: "pot",
    rating: 4.9,
    reviewsCount: 38,
    badge: "Festive Favorite",
    isPopular: false,
    description: "Slow-simmered ground Chinigura rice in thickened milk, scented with green cardamom, saffron strands, and garnished with nuts.",
    features: [
      "Prepared in traditional clay pots for authentic aroma",
      "Pure full-cream milk slow reduced",
      "No artificial essence or synthetic thickener",
      "Classic Bangladeshi heritage dessert"
    ],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "oatmeal-cookies",
    name: "Healthy Oatmeal Raisin Cookies",
    category: "desserts",
    categoryName: "Baked Goods & Desserts",
    price: 160,
    priceDisplay: "৳ 160",
    unit: "pack",
    rating: 4.7,
    reviewsCount: 25,
    badge: "Healthy Snack",
    isPopular: false,
    description: "Chewy, wholesome cookies baked with whole rolled oats, cinnamon, pure butter, and plump sweet raisins. High in fiber and energy.",
    features: [
      "100% whole rolled oats & fiber",
      "Sweetened naturally with raisins & minimal cane sugar",
      "Great accompaniment with tea or coffee",
      "Ideal healthy snack for work & school"
    ],
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "date-powder",
    name: "Premium Pure Date Powder (Khejur Gura)",
    category: "ingredients",
    categoryName: "Raw & Specialty Ingredients",
    price: 350,
    priceDisplay: "৳ 350",
    unit: "kg",
    rating: 5.0,
    reviewsCount: 110,
    badge: "Superfood",
    isPopular: true,
    description: "100% natural sweetener made solely by dehydrating and finely grinding premium dates. An exceptional, unrefined replacement for white sugar.",
    features: [
      "100% pure dates, zero added sugar or starch",
      "Rich in iron, potassium, and dietary fiber",
      "Safe and highly recommended for babies, kids & diabetics",
      "Use in milk, porridge, baking, desserts, and smoothies"
    ],
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "ginger-garlic-paste",
    name: "Pure Fresh Ginger-Garlic Paste (300g)",
    category: "ingredients",
    categoryName: "Raw & Specialty Ingredients",
    price: 180,
    priceDisplay: "৳ 180",
    unit: "kg",
    rating: 4.9,
    reviewsCount: 65,
    badge: "Kitchen Essential",
    isPopular: false,
    description: "Freshly ground local deshi ginger and garlic blended with a hint of pure cold-pressed mustard oil. Completely chemical and vinegar-free.",
    features: [
      "Made fresh every week with deshi roots",
      "No added water dilution, starch, or chemical bleach",
      "Preserved naturally with pure mustard oil",
      "Saves cooking prep time with genuine fresh aroma"
    ],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "mustard-chili-paste",
    name: "Fresh Deshi Mustard & Chili Paste (250g)",
    category: "ingredients",
    categoryName: "Raw & Specialty Ingredients",
    price: 160,
    priceDisplay: "৳ 160",
    unit: "pack",
    rating: 4.8,
    reviewsCount: 32,
    badge: "Traditional Blend",
    isPopular: false,
    description: "Pungent, sharp and authentic yellow & black mustard seeds hand-ground with green chilies. Ideal for fish curries, bhartas, and marinades.",
    features: [
      "Traditional stone-ground texture",
      "Sharp authentic pungency (jhaajh)",
      "Zero artificial preservatives or food acid",
      "Hygienically bottled and sealed"
    ],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

// Helper to get all categories
function getSeedCategories() {
  return SEED_CATEGORIES;
}

// Helper to get all items
function getSeedItems() {
  return SEED_MENU_ITEMS;
}

// Export for module or browser globals
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SEED_CATEGORIES, SEED_MENU_ITEMS, getSeedCategories, getSeedItems };
}

