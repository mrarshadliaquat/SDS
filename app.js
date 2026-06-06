const configuredBasePath = window.AVERON_BASE_PATH || "";
const routeBasePath = (() => {
  const clean = (value) => {
    const path = String(value || "").replace(/\/+$/, "");
    return path === "/" ? "" : path;
  };

  if (configuredBasePath) return clean(configuredBasePath);

  const baseElement = document.querySelector("base[href]");
  if (baseElement) {
    try {
      const basePath = new URL(baseElement.getAttribute("href"), window.location.origin).pathname;
      return clean(basePath);
    } catch {
      return "";
    }
  }

  const appScript = document.querySelector('script[src$="app.js"]');
  if (appScript) {
    try {
      const scriptPath = new URL(appScript.getAttribute("src"), window.location.href).pathname;
      return clean(scriptPath.replace(/\/app\.js$/i, ""));
    } catch {
      return "";
    }
  }

  return "";
})();

function appPathname() {
  let pathname = window.location.pathname || "/";
  if (routeBasePath && pathname === routeBasePath) return "/";
  if (routeBasePath && pathname.startsWith(`${routeBasePath}/`)) {
    pathname = pathname.slice(routeBasePath.length);
  }
  return pathname || "/";
}

function routePath(path) {
  const value = String(path || "/");
  if (/^(?:https?:|mailto:|tel:|#)/i.test(value)) return value;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return routeBasePath ? `${routeBasePath}${normalized}` : normalized;
}

function pushRouteState(stateValue, path) {
  history.pushState(stateValue, "", routePath(path));
}

const categories = [
  {
    name: "Automotive",
    icon: "automotive",
    offer: "Up to 40% Off",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Baby & Kids",
    icon: "baby",
    offer: "Up to 45% Off",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Beauty & Personal Care",
    icon: "beauty",
    offer: "Up to 60% Off",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Books & Stationery",
    icon: "books",
    offer: "Up to 40% Off",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Clothing & Fashion",
    icon: "clothing",
    offer: "Up to 70% Off",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Computers & Gaming",
    icon: "computer",
    offer: "Up to 55% Off",
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "DIY & Tools",
    icon: "tools",
    offer: "Up to 35% Off",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Electronics",
    icon: "electronics",
    offer: "Up to 60% Off",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Footwear",
    icon: "footwear",
    offer: "Up to 50% Off",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Groceries & Pets",
    icon: "groceries",
    offer: "Up to 30% Off",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Health & Wellness",
    icon: "health",
    offer: "Up to 45% Off",
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Home & Kitchen",
    icon: "home",
    offer: "Up to 50% Off",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Industrial Supplies",
    icon: "box",
    offer: "Up to 30% Off",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Jewellery & Watches",
    icon: "watch",
    offer: "Up to 55% Off",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Kitchen Appliances",
    icon: "kitchen",
    offer: "Up to 50% Off",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Luggage & Travel",
    icon: "travel",
    offer: "Up to 45% Off",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Mobiles & Tablets",
    icon: "mobile",
    offer: "Up to 40% Off",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "New Arrivals",
    icon: "spark",
    offer: "Fresh Picks",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Office & Stationery",
    icon: "books",
    offer: "Up to 40% Off",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Perfumes & Fragrances",
    icon: "beauty",
    offer: "Up to 50% Off",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Quick Commerce",
    icon: "quick",
    offer: "Fast Delivery",
    image: "https://images.unsplash.com/photo-1595246140520-d5a4c4a2f8cf?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Ready to Wear",
    icon: "clothing",
    offer: "Up to 65% Off",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Sports & Outdoors",
    icon: "sports",
    offer: "Up to 60% Off",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Toys & Games",
    icon: "toys",
    offer: "Up to 50% Off",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Used & Refurbished",
    icon: "refresh",
    offer: "Certified Deals",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Vouchers & Services",
    icon: "voucher",
    offer: "Exclusive Offers",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Women Fashion",
    icon: "clothing",
    offer: "Up to 70% Off",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Xpress Delivery",
    icon: "quick",
    offer: "Same Day Picks",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Yard & Garden",
    icon: "garden",
    offer: "Up to 35% Off",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Zonal Deals",
    icon: "pin",
    offer: "Local Offers",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&q=80"
  }
];

const sideCategoryNames = [
  "Clothing & Fashion",
  "Electronics",
  "Beauty & Personal Care",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Books & Stationery",
  "Toys & Games",
  "Automotive",
  "Health & Wellness",
  "Groceries & Pets"
];

const iconPaths = {
  automotive: '<path d="M5 13l2-5h10l2 5" /><path d="M6 13h12v5H6z" /><circle cx="8" cy="18" r="1.5" /><circle cx="16" cy="18" r="1.5" />',
  baby: '<circle cx="12" cy="8" r="3" /><path d="M8 16c1.2-2 2.4-3 4-3s2.8 1 4 3" /><path d="M7 19h10" />',
  beauty: '<path d="M10 4h4v5h-4z" /><path d="M8 9h8v11H8z" /><path d="M10 13h4" />',
  books: '<path d="M7 5h8a2 2 0 0 1 2 2v12H9a2 2 0 0 0-2 2z" /><path d="M7 5v16" /><path d="M10 9h4" />',
  box: '<path d="M5 8l7-4 7 4-7 4z" /><path d="M5 8v8l7 4 7-4V8" /><path d="M12 12v8" />',
  clothing: '<path d="M9 5l3 2 3-2 4 4-2 3-1-1v8H8v-8l-1 1-2-3z" />',
  computer: '<rect x="5" y="5" width="14" height="10" rx="1.5" /><path d="M9 20h6" /><path d="M12 15v5" />',
  electronics: '<rect x="8" y="4" width="8" height="16" rx="2" /><path d="M11 17h2" /><path d="M10 7h4" />',
  footwear: '<path d="M5 16c3 .3 5-.5 7-3l2 2h4c1.3 0 2 1 2 2v1H5z" /><path d="M12 13l-2-5" />',
  garden: '<path d="M12 20V9" /><path d="M12 12c-3 0-5-2-5-5 3 0 5 2 5 5z" /><path d="M12 14c3 0 5-2 5-5-3 0-5 2-5 5z" />',
  groceries: '<path d="M6 9h12l-1 11H7z" /><path d="M9 9a3 3 0 0 1 6 0" /><path d="M9 14h6" />',
  health: '<path d="M12 21s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.7-7 10-7 10z" /><path d="M12 9v6" /><path d="M9 12h6" />',
  home: '<path d="M4 11l8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-6h4v6" />',
  kitchen: '<path d="M7 4v16" /><path d="M11 4v16" /><path d="M17 4v16" /><path d="M5 8h4" /><path d="M15 8h4" />',
  mobile: '<rect x="8" y="3" width="8" height="18" rx="2" /><path d="M11 18h2" />',
  pin: '<path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11z" /><circle cx="12" cy="10" r="2" />',
  quick: '<path d="M4 12h9" /><path d="M4 7h12" /><path d="M4 17h8" /><path d="M16 12l4 4-4 4" />',
  refresh: '<path d="M19 8a7 7 0 0 0-12-2l-2 2" /><path d="M5 4v4h4" /><path d="M5 16a7 7 0 0 0 12 2l2-2" /><path d="M19 20v-4h-4" />',
  spark: '<path d="M12 3l1.8 5 5.2 1.8-5.2 1.8L12 17l-1.8-5.4L5 9.8 10.2 8z" /><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />',
  sports: '<circle cx="12" cy="12" r="8" /><path d="M4.5 11.5c4 0 8-2 11-5" /><path d="M8 19c1-4 4-8 11-9" />',
  tools: '<path d="M14 6l4 4" /><path d="M4 20l8-8" /><path d="M15 5l4-1-1 4L8 18l-3 1 1-3z" />',
  toys: '<path d="M8 9h8v6H8z" /><path d="M10 9V6h4v3" /><circle cx="8" cy="17" r="2" /><circle cx="16" cy="17" r="2" />',
  travel: '<rect x="7" y="7" width="10" height="13" rx="2" /><path d="M10 7V5h4v2" /><path d="M10 11h4" />',
  voucher: '<path d="M5 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" /><path d="M12 8v8" />',
  watch: '<circle cx="12" cy="12" r="4" /><path d="M9 4h6l-1 4H10z" /><path d="M10 16h4l1 4H9z" />'
};

function categoryIcon(icon) {
  return `<svg class="cat-icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[icon] || iconPaths.box}</svg>`;
}

const megaCategoryItems = [
  { key: "automotive", name: "Automotive", icon: "automotive", category: "Automotive" },
  { key: "appliances", name: "Appliances", icon: "kitchen", category: "Kitchen Appliances" },
  { key: "women", name: "Women's Clothing", icon: "clothing", category: "Women Fashion" },
  { key: "men", name: "Men's Clothing", icon: "clothing", category: "Clothing & Fashion" },
  { key: "toys", name: "Toys & Games", icon: "toys", category: "Toys & Games" },
  { key: "furniture", name: "Furniture", icon: "home", category: "Home & Kitchen" },
  { key: "beauty", name: "Beauty & Health", icon: "beauty", category: "Beauty & Personal Care" },
  { key: "shoes", name: "Shoes", icon: "footwear", category: "Footwear" },
  { key: "hair", name: "Hair Extensions & Wigs", icon: "beauty", category: "Beauty & Personal Care" },
  { key: "pets", name: "Pet Supplies", icon: "groceries", category: "Groceries & Pets" },
  { key: "electronics", name: "Electronics", icon: "electronics", category: "Electronics" },
  { key: "phones", name: "Cell Phones & Accessories", icon: "mobile", category: "Mobiles & Tablets" },
  { key: "jewelry", name: "Jewelry & Accessories", icon: "watch", category: "Jewellery & Watches" }
];

const megaRecommended = [
  {
    name: "T-Shirts & Tank Tops",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=160&q=80"
  },
  {
    name: "Casual & Cargo Pants",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=160&q=80"
  },
  {
    name: "Polo Shirts",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=160&q=80"
  },
  {
    name: "Casual Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=160&q=80"
  },
  {
    name: "Sweatpants & Joggers",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=160&q=80"
  },
  {
    name: "Shirts",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=160&q=80"
  },
  {
    name: "Suits & Separates",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?auto=format&fit=crop&w=160&q=80"
  },
  {
    name: "Underwear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=160&q=80"
  },
  {
    name: "Jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=160&q=80"
  },
  {
    name: "Hoodies & Sweatshirts",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=160&q=80"
  }
];

const megaSubcategoryColumns = [
  {
    title: "Pants & Jeans",
    links: ["Jeans", "Casual & Cargo Pants", "Sweatpants & Joggers", "Active & Performance Pants"]
  },
  {
    title: "Underwear, Socks & Loungewear",
    links: ["Socks", "Underwear", "Shapewear", "Pajamas & Robes", "Thermal Underwear"]
  },
  {
    title: "Shorts",
    links: ["Denim Shorts", "Casual & Cargo Shorts", "Athletic Shorts", "Chino Shorts"]
  },
  {
    title: "Tops",
    links: ["Polo Shirts", "Shirts", "Hoodies & Sweatshirts", "T-Shirts & Tank Tops"]
  },
  {
    title: "Suits & Tailoring",
    links: ["Suits & Separates", "Blazers", "Dress Pants", "Formal Shirts"]
  },
  {
    title: "Coats & Jackets",
    links: ["Down Coats & Parkas", "Wool & Trench Coats", "Leather & Fur Coats", "Jackets & Light Coats"]
  },
  {
    title: "Other Apparel",
    links: ["Denim Tops", "Swimwear", "Traditional & Cultural Wear", "Overalls & Jumpsuits", "Matching Sets"]
  },
  {
    title: "Sweaters & Vests",
    links: ["Vests", "Sweaters", "Cardigans", "Knitwear"]
  }
];

const megaContentByKey = {
  men: {
    category: "Clothing & Fashion",
    recommended: megaRecommended,
    columns: megaSubcategoryColumns
  },
  women: {
    category: "Women Fashion",
    recommended: [
      { name: "Dresses", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=160&q=80" },
      { name: "Women's Tops", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=160&q=80" },
      { name: "Handbags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=160&q=80" },
      { name: "Heels", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=160&q=80" },
      { name: "Jewelry Sets", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=160&q=80" },
      { name: "Beauty Picks", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Women's Clothing", links: ["Dresses", "Tops", "Kurtis", "Abayas", "Trousers"] },
      { title: "Bags & Shoes", links: ["Handbags", "Clutches", "Heels", "Flats", "Sneakers"] },
      { title: "Accessories", links: ["Jewelry Sets", "Scarves", "Sunglasses", "Watches"] },
      { title: "Beauty", links: ["Makeup", "Skincare", "Perfumes", "Hair Care"] }
    ]
  },
  electronics: {
    category: "Electronics",
    recommended: [
      { name: "Smart Watches", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=160&q=80" },
      { name: "Wireless Earbuds", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=160&q=80" },
      { name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=160&q=80" },
      { name: "Gaming Consoles", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=160&q=80" },
      { name: "Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=160&q=80" },
      { name: "Bluetooth Speakers", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Mobiles & Tablets", links: ["Smartphones", "Tablets", "Phone Cases", "Power Banks", "Chargers"] },
      { title: "Computers", links: ["Laptops", "Monitors", "Keyboards", "Mouse", "Storage Drives"] },
      { title: "Audio", links: ["Earbuds", "Headphones", "Speakers", "Microphones"] },
      { title: "Gaming", links: ["Consoles", "Controllers", "Games", "Gaming Chairs"] },
      { title: "Cameras", links: ["DSLR Cameras", "Action Cameras", "Camera Lenses", "Tripods"] }
    ]
  },
  phones: {
    category: "Mobiles & Tablets",
    recommended: [
      { name: "Smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=160&q=80" },
      { name: "Tablets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=160&q=80" },
      { name: "Phone Cases", image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=160&q=80" },
      { name: "Chargers", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=160&q=80" },
      { name: "Power Banks", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=160&q=80" },
      { name: "Screen Protectors", image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Phones", links: ["Android Phones", "iPhones", "Feature Phones", "Used Phones"] },
      { title: "Accessories", links: ["Cases", "Chargers", "Cables", "Stands", "Screen Protectors"] },
      { title: "Wearables", links: ["Smart Watches", "Fitness Bands", "Smart Rings"] }
    ]
  },
  automotive: {
    category: "Automotive",
    recommended: [
      { name: "Car Care", image: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=160&q=80" },
      { name: "Car Accessories", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=160&q=80" },
      { name: "Motor Oil", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=160&q=80" },
      { name: "Bike Parts", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=160&q=80" },
      { name: "Car Tools", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=160&q=80" },
      { name: "Tyres", image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Car Accessories", links: ["Seat Covers", "Car Mats", "Phone Holders", "Dash Cameras"] },
      { title: "Maintenance", links: ["Engine Oil", "Car Wash", "Polish", "Repair Tools"] },
      { title: "Motorbike", links: ["Helmets", "Bike Gloves", "Bike Lights", "Spare Parts"] }
    ]
  },
  appliances: {
    category: "Kitchen Appliances",
    recommended: [
      { name: "Air Fryers", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=160&q=80" },
      { name: "Blenders", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=160&q=80" },
      { name: "Coffee Makers", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=160&q=80" },
      { name: "Electric Kettles", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=160&q=80" },
      { name: "Vacuum Cleaners", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=160&q=80" },
      { name: "Irons", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Kitchen Appliances", links: ["Air Fryers", "Blenders", "Microwaves", "Coffee Makers"] },
      { title: "Home Appliances", links: ["Vacuum Cleaners", "Irons", "Fans", "Water Dispensers"] },
      { title: "Large Appliances", links: ["Refrigerators", "Washing Machines", "Air Conditioners"] }
    ]
  },
  toys: {
    category: "Toys & Games",
    recommended: [
      { name: "Building Blocks", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=160&q=80" },
      { name: "Plush Toys", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=160&q=80" },
      { name: "Board Games", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=160&q=80" },
      { name: "Remote Control", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=160&q=80" },
      { name: "Learning Toys", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=160&q=80" },
      { name: "Outdoor Games", image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Kids Toys", links: ["Blocks", "Dolls", "Action Figures", "Remote Cars"] },
      { title: "Games", links: ["Board Games", "Puzzles", "Card Games", "Learning Games"] },
      { title: "Outdoor", links: ["Bicycles", "Sports Toys", "Water Toys", "Ride-ons"] }
    ]
  },
  furniture: {
    category: "Home & Kitchen",
    recommended: [
      { name: "Sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=160&q=80" },
      { name: "Chairs", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=160&q=80" },
      { name: "Tables", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=160&q=80" },
      { name: "Beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=160&q=80" },
      { name: "Storage", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=160&q=80" },
      { name: "Lighting", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Living Room", links: ["Sofas", "TV Units", "Coffee Tables", "Shelves"] },
      { title: "Bedroom", links: ["Beds", "Wardrobes", "Side Tables", "Mattresses"] },
      { title: "Decor", links: ["Lighting", "Rugs", "Wall Art", "Cushions"] }
    ]
  },
  beauty: {
    category: "Beauty & Personal Care",
    recommended: [
      { name: "Skincare", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=160&q=80" },
      { name: "Makeup", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=160&q=80" },
      { name: "Perfumes", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=160&q=80" },
      { name: "Hair Care", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=160&q=80" },
      { name: "Wellness", image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=160&q=80" },
      { name: "Grooming", image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Beauty", links: ["Makeup", "Skincare", "Perfumes", "Nail Care"] },
      { title: "Personal Care", links: ["Bath & Body", "Hair Care", "Oral Care", "Grooming"] },
      { title: "Health", links: ["Vitamins", "Fitness", "Wellness Devices"] }
    ]
  },
  shoes: {
    category: "Footwear",
    recommended: [
      { name: "Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=160&q=80" },
      { name: "Sandals", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=160&q=80" },
      { name: "Boots", image: "https://images.unsplash.com/photo-1542838686-7421f2b84c73?auto=format&fit=crop&w=160&q=80" },
      { name: "Loafers", image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=160&q=80" },
      { name: "Heels", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=160&q=80" },
      { name: "Sports Shoes", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Men Shoes", links: ["Sneakers", "Loafers", "Formal Shoes", "Boots"] },
      { title: "Women Shoes", links: ["Heels", "Flats", "Sandals", "Sneakers"] },
      { title: "Sports", links: ["Running Shoes", "Training Shoes", "Football Shoes"] }
    ]
  },
  hair: {
    category: "Beauty & Personal Care",
    recommended: [
      { name: "Hair Extensions", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=160&q=80" },
      { name: "Wigs", image: "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?auto=format&fit=crop&w=160&q=80" },
      { name: "Hair Dryers", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=160&q=80" },
      { name: "Hair Oils", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Extensions", links: ["Clip-in Extensions", "Tape Extensions", "Hair Bundles"] },
      { title: "Hair Tools", links: ["Dryers", "Straighteners", "Curlers", "Brushes"] },
      { title: "Hair Care", links: ["Shampoo", "Conditioner", "Hair Oil", "Styling"] }
    ]
  },
  pets: {
    category: "Groceries & Pets",
    recommended: [
      { name: "Pet Food", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=160&q=80" },
      { name: "Cat Supplies", image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=160&q=80" },
      { name: "Dog Beds", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=160&q=80" },
      { name: "Pet Toys", image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Dogs", links: ["Dog Food", "Dog Beds", "Leashes", "Grooming"] },
      { title: "Cats", links: ["Cat Food", "Cat Litter", "Scratchers", "Cat Toys"] },
      { title: "Small Pets", links: ["Bird Supplies", "Fish Supplies", "Pet Carriers"] }
    ]
  },
  jewelry: {
    category: "Jewellery & Watches",
    recommended: [
      { name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=160&q=80" },
      { name: "Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=160&q=80" },
      { name: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=160&q=80" },
      { name: "Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=160&q=80" },
      { name: "Bracelets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=160&q=80" }
    ],
    columns: [
      { title: "Jewelry", links: ["Rings", "Necklaces", "Earrings", "Bracelets"] },
      { title: "Watches", links: ["Men Watches", "Women Watches", "Smart Watches"] },
      { title: "Accessories", links: ["Sunglasses", "Belts", "Wallets"] }
    ]
  }
};

function getMegaContent(key) {
  const item = megaCategoryItems.find((entry) => entry.key === key) || megaCategoryItems[0];
  return (
    megaContentByKey[key] || {
      category: item.category,
      recommended: categories
        .filter((category) => category.name === item.category || category.icon === item.icon)
        .concat(categories)
        .slice(0, 6)
        .map((category) => ({ name: category.name, image: category.image })),
      columns: [
        { title: item.name, links: ["New Arrivals", "Best Sellers", "Top Rated", "Flash Sale"] },
        { title: "Shop More", links: ["Averon Picks", "Official Stores", "Vouchers", "Free Delivery"] }
      ]
    }
  );
}

function megaContentMarkup(key) {
  const item = megaCategoryItems.find((entry) => entry.key === key) || megaCategoryItems[0];
  const content = getMegaContent(key);
  const itemLabel = localizedText(item.name);
  return `
    <section class="mega-recommended" aria-label="${escapeHtml(itemLabel)} ${escapeHtml(t("recommended"))}">
      <h3>${escapeHtml(itemLabel)} ${escapeHtml(t("recommended"))}</h3>
      <div class="mega-recommended-grid">
        ${content.recommended
          .map(
            (entry) => `
              <button type="button" data-category="${escapeHtml(content.category)}">
                <img src="${entry.image}" alt="${escapeHtml(localizedText(entry.name))}" loading="lazy" />
                <span>${escapeHtml(localizedText(entry.name))}</span>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
    <div class="mega-columns">
      ${content.columns
        .map(
          (group) => `
            <section>
              <h3>${escapeHtml(localizedText(group.title))}</h3>
              ${group.links
                .map((link) => `<button type="button" data-category="${escapeHtml(content.category)}">${escapeHtml(localizedText(link))}</button>`)
                .join("")}
            </section>
          `
        )
        .join("")}
    </div>
  `;
}

const sideCategoryMegaKeys = {
  "Clothing & Fashion": "men",
  Electronics: "electronics",
  "Beauty & Personal Care": "beauty",
  "Home & Kitchen": "furniture",
  "Sports & Outdoors": "shoes",
  "Books & Stationery": "appliances",
  "Toys & Games": "toys",
  Automotive: "automotive",
  "Health & Wellness": "beauty",
  "Groceries & Pets": "pets",
  "Baby & Kids": "toys",
  "Computers & Gaming": "electronics",
  "DIY & Tools": "automotive",
  Footwear: "shoes",
  "Industrial Supplies": "automotive",
  "Jewellery & Watches": "jewelry",
  "Kitchen Appliances": "appliances",
  "Luggage & Travel": "automotive",
  "Mobiles & Tablets": "phones",
  "Office & Stationery": "appliances",
  "Perfumes & Fragrances": "beauty",
  "Ready to Wear": "women",
  "Women Fashion": "women"
};

function sideCategoryMegaItems() {
  return sideCategoryNames
    .map((name) => {
      const category = categories.find((entry) => entry.name === name);
      if (!category) return null;
      return {
        ...category,
        key: sideCategoryMegaKeys[name] || "men"
      };
    })
    .filter(Boolean);
}

function getSideMegaKeyForCategory(categoryName) {
  return sideCategoryMegaKeys[categoryName] || "men";
}

function sideCategoryContentMarkup(categoryName) {
  const key = getSideMegaKeyForCategory(categoryName);
  const category = categories.find((entry) => entry.name === categoryName);
  const hasMappedContent = Boolean(sideCategoryMegaKeys[categoryName] && megaContentByKey[key]);
  const content = hasMappedContent
    ? getMegaContent(key)
    : {
        recommended: [category, ...categories.filter((entry) => entry.name !== categoryName)].slice(0, 6).map((entry) => ({
          name: entry.name,
          image: entry.image
        })),
        columns: [
          { title: categoryName, links: ["New Arrivals", "Best Sellers", "Top Rated", category?.offer || "Special Offers"] },
          { title: "Shop More", links: ["Averon Picks", "Official Stores", "Vouchers", "Free Delivery"] }
        ]
      };

  const categoryLabel = localizedText(categoryName);
  return `
    <section class="mega-recommended" aria-label="${escapeHtml(categoryLabel)} ${escapeHtml(t("recommended"))}">
      <h3>${escapeHtml(categoryLabel)} ${escapeHtml(t("recommended"))}</h3>
      <div class="mega-recommended-grid">
        ${content.recommended
          .map(
            (entry) => `
              <button type="button" data-category="${escapeHtml(categoryName)}">
                <img src="${entry.image}" alt="${escapeHtml(localizedText(entry.name))}" loading="lazy" />
                <span>${escapeHtml(localizedText(entry.name))}</span>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
    <div class="mega-columns">
      ${content.columns
        .map(
          (group) => `
            <section>
              <h3>${escapeHtml(localizedText(group.title))}</h3>
              ${group.links
                .map((link) => `<button type="button" data-category="${escapeHtml(categoryName)}">${escapeHtml(localizedText(link))}</button>`)
                .join("")}
            </section>
          `
        )
        .join("")}
    </div>
  `;
}

function allCategoriesContentMarkup() {
  return `
    <section class="side-all-categories" aria-label="${escapeHtml(t("allCategories"))}">
      <div class="side-all-categories-head">
        <h3>${escapeHtml(t("allCategoriesTitle"))}</h3>
        <button type="button" data-category="All">${escapeHtml(t("browseFeatured"))}</button>
      </div>
      <div class="side-all-category-grid">
        ${categories
          .map(
            (category) => `
              <button type="button" data-category="${escapeHtml(category.name)}">
                <span class="side-all-category-media">
                  <img src="${category.image}" alt="${escapeHtml(localizedText(category.name))}" loading="lazy" />
                  <span class="side-all-category-icon">${categoryIcon(category.icon)}</span>
                </span>
                <span class="side-all-category-copy">
                  <strong>${escapeHtml(localizedText(category.name))}</strong>
                  <small>${escapeHtml(localizedText(category.offer))}</small>
                </span>
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

const flashProducts = [
  {
    id: "f1",
    title: "Apple Watch Series 8",
    category: "Electronics",
    price: 4999,
    oldPrice: 7999,
    rating: 4.8,
    reviews: 120,
    discount: "-35%",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f2",
    title: "Wireless Earbuds",
    category: "Electronics",
    price: 2499,
    oldPrice: 4999,
    rating: 4.6,
    reviews: 88,
    discount: "-50%",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f3",
    title: "Laptop Backpack",
    category: "Clothing & Fashion",
    price: 1799,
    oldPrice: 2999,
    rating: 4.7,
    reviews: 76,
    discount: "-40%",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f4",
    title: "Nike Air Max",
    category: "Sports & Outdoors",
    price: 6999,
    oldPrice: 9999,
    rating: 4.5,
    reviews: 60,
    discount: "-30%",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f5",
    title: "Men Casual Shirt",
    category: "Clothing & Fashion",
    price: 2399,
    oldPrice: 3999,
    rating: 4.4,
    reviews: 60,
    discount: "-20%",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f6",
    title: "Women Handbag",
    category: "Clothing & Fashion",
    price: 3299,
    oldPrice: 4999,
    rating: 4.6,
    reviews: 60,
    discount: "-25%",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f7",
    title: "Active Noise Cancelling Headphones",
    category: "Electronics",
    price: 8999,
    oldPrice: 14999,
    rating: 4.8,
    reviews: 214,
    discount: "-40%",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f8",
    title: "RGB Gaming Headset",
    category: "Electronics",
    price: 5499,
    oldPrice: 8499,
    rating: 4.7,
    reviews: 165,
    discount: "-35%",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f9",
    title: "Studio Monitor Headphones",
    category: "Electronics",
    price: 6999,
    oldPrice: 9999,
    rating: 4.6,
    reviews: 102,
    discount: "-30%",
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f10",
    title: "Bluetooth Neckband Headphones",
    category: "Electronics",
    price: 1899,
    oldPrice: 3499,
    rating: 4.4,
    reviews: 94,
    discount: "-46%",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f11",
    title: "Kids Safe Volume Headphones",
    category: "Electronics",
    price: 2199,
    oldPrice: 3999,
    rating: 4.5,
    reviews: 58,
    discount: "-45%",
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f12",
    title: "Android Smartphone 128GB",
    category: "Electronics",
    price: 34999,
    oldPrice: 42999,
    rating: 4.6,
    reviews: 230,
    discount: "-19%",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f13",
    title: "Men Running Shoes",
    category: "Sports & Outdoors",
    price: 4299,
    oldPrice: 6999,
    rating: 4.5,
    reviews: 143,
    discount: "-39%",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f14",
    title: "Digital Air Fryer 5L",
    category: "Home & Kitchen",
    price: 11999,
    oldPrice: 16999,
    rating: 4.7,
    reviews: 81,
    discount: "-29%",
    image: "assets/products/digital-air-fryer-5l.png"
  },
  {
    id: "f15",
    title: "Makeup Brush Set",
    category: "Beauty & Personal Care",
    price: 1499,
    oldPrice: 2699,
    rating: 4.5,
    reviews: 188,
    discount: "-44%",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f16",
    title: "Grocery Essentials Basket",
    category: "Groceries & Pets",
    price: 2999,
    oldPrice: 3699,
    rating: 4.4,
    reviews: 73,
    discount: "-19%",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f17",
    title: "Office Notebook Pack",
    category: "Books & Stationery",
    price: 899,
    oldPrice: 1499,
    rating: 4.3,
    reviews: 52,
    discount: "-40%",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f18",
    title: "Sports Training Ball",
    category: "Sports & Outdoors",
    price: 1299,
    oldPrice: 2199,
    rating: 4.6,
    reviews: 96,
    discount: "-41%",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f19",
    title: "Professional Football",
    category: "Sports & Outdoors",
    price: 2199,
    oldPrice: 3499,
    rating: 4.7,
    reviews: 132,
    discount: "-37%",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f20",
    title: "Indoor Basketball",
    category: "Sports & Outdoors",
    price: 2499,
    oldPrice: 3999,
    rating: 4.6,
    reviews: 118,
    discount: "-38%",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "f21",
    title: "Tennis Ball Pack",
    category: "Sports & Outdoors",
    price: 999,
    oldPrice: 1599,
    rating: 4.4,
    reviews: 74,
    discount: "-38%",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=500&q=80"
  }
];

const bestProducts = [
  {
    id: "b1",
    title: "iPhone 15 Pro Max",
    category: "Electronics",
    price: 269999,
    oldPrice: 289999,
    rating: 4.8,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80",
    badge: "Bestseller"
  },
  {
    id: "b2",
    title: "Dior Sauvage Perfume",
    category: "Beauty & Personal Care",
    price: 24999,
    oldPrice: 31999,
    rating: 4.6,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "b3",
    title: "Fossil Men's Watch",
    category: "Clothing & Fashion",
    price: 18999,
    oldPrice: 22999,
    rating: 4.7,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    badge: "Bestseller"
  },
  {
    id: "b4",
    title: "Premium Handbag",
    category: "Clothing & Fashion",
    price: 8999,
    oldPrice: 12999,
    rating: 4.5,
    reviews: 60,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "b5",
    title: "Sony PlayStation 5",
    category: "Toys & Games",
    price: 159999,
    oldPrice: 174999,
    rating: 4.9,
    reviews: 90,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "b6",
    title: "HP Pavilion Laptop",
    category: "Electronics",
    price: 149999,
    oldPrice: 165999,
    rating: 4.6,
    reviews: 70,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "b7",
    title: "Sony Wireless Headphones",
    category: "Electronics",
    price: 34999,
    oldPrice: 42999,
    rating: 4.9,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80",
    badge: "Bestseller"
  },
  {
    id: "b8",
    title: "JBL Bass Bluetooth Headphones",
    category: "Electronics",
    price: 12999,
    oldPrice: 16999,
    rating: 4.7,
    reviews: 204,
    image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=500&q=80",
    badge: "Top brand"
  },
  {
    id: "b9",
    title: "MacBook Air M3",
    category: "Electronics",
    price: 329999,
    oldPrice: 359999,
    rating: 4.9,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
    badge: "Official store"
  },
  {
    id: "b10",
    title: "Samsung Galaxy A55",
    category: "Electronics",
    price: 119999,
    oldPrice: 134999,
    rating: 4.7,
    reviews: 155,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80",
    badge: "New"
  },
  {
    id: "b11",
    title: "Adidas Running Shoes",
    category: "Sports & Outdoors",
    price: 14999,
    oldPrice: 18999,
    rating: 4.8,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
    badge: "Bestseller"
  },
  {
    id: "b12",
    title: "Kitchen Blender Pro",
    category: "Home & Kitchen",
    price: 8999,
    oldPrice: 11999,
    rating: 4.6,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "b13",
    title: "Skincare Glow Bundle",
    category: "Beauty & Personal Care",
    price: 6999,
    oldPrice: 9999,
    rating: 4.7,
    reviews: 122,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=500&q=80",
    badge: "Original"
  },
  {
    id: "b14",
    title: "Ergonomic Office Chair",
    category: "Home & Kitchen",
    price: 22999,
    oldPrice: 28999,
    rating: 4.6,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "b15",
    title: "Baby Learning Toys Set",
    category: "Toys & Games",
    price: 3499,
    oldPrice: 4999,
    rating: 4.5,
    reviews: 77,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "b16",
    title: "Car Dash Camera",
    category: "Automotive",
    price: 9999,
    oldPrice: 13999,
    rating: 4.4,
    reviews: 61,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "b17",
    title: "Gold Plated Earrings",
    category: "Jewellery & Watches",
    price: 2599,
    oldPrice: 3999,
    rating: 4.5,
    reviews: 49,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "b18",
    title: "Leather Travel Bag",
    category: "Luggage & Travel",
    price: 12999,
    oldPrice: 17999,
    rating: 4.6,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
  }
];

const brands = [
  { name: "Apple", domain: "apple.com", logo: "https://cdn.simpleicons.org/apple/111111" },
  { name: "Samsung", domain: "samsung.com", logo: "https://cdn.simpleicons.org/samsung/1428A0" },
  { name: "Nike", domain: "nike.com", logo: "https://cdn.simpleicons.org/nike/111111" },
  { name: "Adidas", domain: "adidas.com", logo: "https://cdn.simpleicons.org/adidas/111111" },
  { name: "Sony", domain: "sony.com", logo: "https://cdn.simpleicons.org/sony/111111" },
  { name: "Dell", domain: "dell.com", logo: "https://cdn.simpleicons.org/dell/0672CB" },
  { name: "HP", domain: "hp.com", logo: "https://cdn.simpleicons.org/hp/0096D6" },
  { name: "Unilever", domain: "unilever.com", logo: "https://cdn.simpleicons.org/unilever/1F36C7" },
  { name: "P&G", domain: "pg.com", logo: "https://www.google.com/s2/favicons?sz=128&domain=pg.com" },
  { name: "Philips", domain: "philips.com", logo: "https://www.google.com/s2/favicons?sz=128&domain=philips.com" },
  { name: "Lenovo", domain: "lenovo.com", logo: "https://cdn.simpleicons.org/lenovo/E2231A" },
  { name: "Xiaomi", domain: "mi.com", logo: "https://cdn.simpleicons.org/xiaomi/FF6900" }
];
const allProducts = [...flashProducts, ...bestProducts];
const listingPages = {
  "official-stores": {
    eyebrow: "Averon Assured",
    title: "Official Store Picks",
    meta: "Verified marketplace products from trusted sellers.",
    path: "/official-stores",
    getProducts: () => allProducts.filter((product) => product.rating >= 4.6)
  },
  "todays-deals": {
    eyebrow: "Today's Deals",
    title: "Today's Deal Picks",
    meta: "Fresh offers and limited-time marketplace deals.",
    path: "/deals/todays-deals",
    getProducts: () => [...flashProducts, ...bestProducts.slice(0, 6)]
  },
  "flash-deals": {
    eyebrow: "Flash Sale",
    title: "Flash Sale",
    meta: "Hot discounts with limited-time prices.",
    path: "/deals/flash-deals",
    getProducts: () => flashProducts
  },
  "ending-soon": {
    eyebrow: "Ending Soon",
    title: "Ending Soon Deals",
    meta: "Limited-time prices available before the countdown closes.",
    path: "/deals/ending-soon",
    getProducts: () =>
      [...flashProducts].sort((a, b) => (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice)
  },
  "best-sellers": {
    eyebrow: "Best Sellers",
    title: "Best Selling Products",
    meta: "Popular products customers are buying now.",
    path: "/products/best-sellers",
    getProducts: () => bestProducts
  },
  "new-arrivals": {
    eyebrow: "New Arrivals",
    title: "New Arrivals",
    meta: "Latest products added to the Averon marketplace.",
    path: "/products/new-arrivals",
    getProducts: () => [...flashProducts.slice(-8).reverse(), ...bestProducts.slice(-8).reverse()]
  }
};
const categorySearchAliases = {
  "Baby & Kids": ["Toys & Games", "Clothing & Fashion"],
  "Books & Stationery": ["Electronics"],
  "Computers & Gaming": ["Electronics", "Toys & Games"],
  "DIY & Tools": ["Automotive", "Home & Kitchen"],
  Footwear: ["Sports & Outdoors", "Clothing & Fashion"],
  "Health & Wellness": ["Beauty & Personal Care"],
  "Home & Kitchen": ["Home & Kitchen"],
  "Industrial Supplies": ["Automotive"],
  "Jewellery & Watches": ["Clothing & Fashion"],
  "Kitchen Appliances": ["Home & Kitchen", "Electronics"],
  "Luggage & Travel": ["Clothing & Fashion"],
  "Mobiles & Tablets": ["Electronics"],
  "Office & Stationery": ["Electronics"],
  "Perfumes & Fragrances": ["Beauty & Personal Care"],
  "Quick Commerce": ["Groceries & Pets", "Beauty & Personal Care"],
  "Ready to Wear": ["Clothing & Fashion"],
  "Used & Refurbished": ["Electronics"],
  "Vouchers & Services": ["Electronics", "Clothing & Fashion", "Beauty & Personal Care"],
  "Women Fashion": ["Clothing & Fashion"],
  "Xpress Delivery": ["Electronics", "Clothing & Fashion", "Beauty & Personal Care"],
  "Yard & Garden": ["Home & Kitchen"],
  "Zonal Deals": ["Electronics", "Clothing & Fashion", "Beauty & Personal Care"]
};
const searchSynonyms = {
  headphone: ["headphone", "headphones", "headset", "earphones", "earbuds", "audio", "bluetooth", "wireless"],
  headphones: ["headphone", "headphones", "headset", "earphones", "earbuds", "audio", "bluetooth", "wireless"],
  headset: ["headphone", "headphones", "headset", "gaming headset", "earphones", "audio"],
  earbuds: ["earbuds", "earphones", "headphone", "headphones", "wireless earbuds"],
  phone: ["phone", "mobile", "smartphone", "android", "iphone", "galaxy"],
  mobile: ["phone", "mobile", "smartphone", "android", "iphone", "galaxy"],
  laptop: ["laptop", "macbook", "hp pavilion"],
  shoes: ["shoes", "shoe", "sneakers", "running shoes"],
  sneaker: ["shoes", "sneakers", "running shoes"],
  bag: ["bag", "backpack", "handbag", "travel bag"],
  backpack: ["bag", "backpack", "laptop backpack", "travel"],
  perfume: ["perfume", "fragrance", "scent", "beauty"],
  fragrance: ["perfume", "fragrance", "scent", "beauty"],
  makeup: ["makeup", "beauty", "brush", "skincare"],
  skincare: ["skincare", "beauty", "serum", "moisturizer"],
  kitchen: ["kitchen", "air fryer", "blender", "appliance", "home"],
  grocery: ["grocery", "groceries", "pantry", "snacks", "quick commerce"],
  groceries: ["grocery", "groceries", "pantry", "snacks", "quick commerce"],
  watch: ["watch", "smartwatch", "smart watch", "watches"],
  gaming: ["gaming", "playstation", "console", "games", "gaming headset"],
  chair: ["chair", "office chair", "furniture", "ergonomic"],
  car: ["car", "automotive", "dash camera", "vehicle"],
  ball: ["ball", "sports ball", "basketball", "football", "training ball"],
  basketball: ["ball", "basketball", "sports ball", "training ball"],
  football: ["ball", "football", "sports ball", "training ball"]
};
const productDetails = {
  f1: {
    description: "High quality smart watch with fitness tracking, smooth touch display and daily health alerts.",
    sold: 4,
    note: "Extra 10% off with coins",
    tag: "Hot deal"
  },
  f2: {
    description: "Wireless earbuds with deep bass, compact charging case and clear calling support.",
    sold: 12,
    note: "Best price in similar deals",
    tag: "Free delivery",
    variants: [
      {
        color: "A6-Standard Case",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80",
        price: 2499,
        oldPrice: 4999
      },
      {
        color: "A6-Lanyard",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80",
        price: 2599,
        oldPrice: 4999
      },
      {
        color: "A6-Black Anti-lost",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80",
        price: 2699,
        oldPrice: 5199
      }
    ]
  },
  f3: {
    description: "Durable laptop backpack with padded compartment, side pockets and travel-friendly storage.",
    sold: 80,
    note: "Save more on bundle orders",
    tag: "Top rated"
  },
  f4: {
    description: "Nike inspired Air Max sneaker with cushioned sole, breathable build and everyday comfort.",
    sold: 18,
    note: "Best price in sneaker deals",
    tag: "Limited stock"
  },
  f5: {
    description: "Soft casual shirt with neat stitching, breathable fabric and clean office-ready look.",
    sold: 718,
    note: "Top selling in men's fashion",
    tag: "Sale"
  },
  f6: {
    description: "Elegant women's handbag with premium texture, secure zip pocket and daily carry space.",
    sold: 2,
    note: "Extra voucher available",
    tag: "New"
  },
  f7: {
    description: "Over-ear wireless headphones with active noise cancelling, deep bass, soft cushions and long battery life.",
    sold: 245,
    note: "Best for travel, calls and music",
    tag: "Hot deal"
  },
  f8: {
    description: "Gaming headset with RGB lights, boom microphone, surround sound and comfortable ear pads.",
    sold: 190,
    note: "Great for PC, console and online gaming",
    tag: "Gamer pick"
  },
  f9: {
    description: "Studio monitor headphones for editing, recording, podcasts and balanced sound listening.",
    sold: 112,
    note: "Clear audio for music creators",
    tag: "Studio"
  },
  f10: {
    description: "Bluetooth neckband headphones with magnetic earbuds, quick charge and sweat resistant design.",
    sold: 155,
    note: "Daily headphone deal for commute",
    tag: "Free delivery"
  },
  f11: {
    description: "Kids headphones with safe volume limit, soft headband and lightweight school-friendly build.",
    sold: 76,
    note: "Safe listening for study and travel",
    tag: "Kids"
  },
  f12: {
    description: "Android smartphone with 128GB storage, sharp display, fast charging and reliable camera.",
    sold: 260,
    note: "Popular mobile phone under budget",
    tag: "New phone"
  },
  f13: {
    description: "Men running shoes with cushioned sole, breathable mesh upper and lightweight sports comfort.",
    sold: 172,
    note: "Top selling sports shoes",
    tag: "Sale"
  },
  f14: {
    description: "Digital air fryer for crispy snacks, oil-free cooking, kitchen meals and easy cleanup.",
    sold: 93,
    note: "Home kitchen appliance deal",
    tag: "Kitchen"
  },
  f15: {
    description: "Makeup brush set for foundation, blush, eyeshadow and daily beauty styling.",
    sold: 205,
    note: "Beauty essentials bundle",
    tag: "Beauty"
  },
  f16: {
    description: "Grocery essentials basket with pantry staples, snacks and home supplies for quick delivery.",
    sold: 89,
    note: "Quick commerce grocery deal",
    tag: "Grocery"
  },
  f17: {
    description: "Office notebook pack for school, stationery, notes, study and work planning.",
    sold: 64,
    note: "Stationery bundle offer",
    tag: "Office"
  },
  f18: {
    description: "Durable sports training ball for indoor practice, outdoor games, football drills and basketball-style fitness sessions.",
    sold: 112,
    note: "Sports ball deal",
    tag: "Sports"
  },
  f19: {
    description: "Professional football with textured grip, outdoor durability and match-ready control.",
    sold: 147,
    note: "Football match ball",
    tag: "Sports"
  },
  f20: {
    description: "Indoor basketball with steady bounce, soft grip and reliable court performance.",
    sold: 121,
    note: "Basketball court pick",
    tag: "Sports"
  },
  f21: {
    description: "Tennis ball pack for practice sessions, training drills and weekend matches.",
    sold: 86,
    note: "Tennis training pack",
    tag: "Sports"
  },
  b1: {
    description: "Apple iPhone 15 Pro Max with premium titanium design, powerful camera and all-day performance.",
    sold: 120,
    note: "Averon verified original product",
    tag: "Bestseller"
  },
  b2: {
    description: "Long-lasting Dior Sauvage fragrance with fresh, bold and premium evening notes.",
    sold: 88,
    note: "Gift-ready packing available",
    tag: "Original"
  },
  b3: {
    description: "Fossil men's watch with classic dial, durable strap and premium formal finish.",
    sold: 76,
    note: "Top selling in watches",
    tag: "Bestseller"
  },
  b4: {
    description: "Premium handbag with structured shape, elegant handle and versatile everyday styling.",
    sold: 60,
    note: "Extra 5% off with Averon Wallet",
    tag: "Trending"
  },
  b5: {
    description: "Sony PlayStation 5 console bundle for next-gen gaming, fast loading and immersive play.",
    sold: 90,
    note: "Secure payment protected",
    tag: "Top brand"
  },
  b6: {
    description: "HP Pavilion laptop for work, study and entertainment with fast performance and sleek design.",
    sold: 70,
    note: "Installment plan available",
    tag: "Official store",
    variants: [
      {
        color: "Midnight Black",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
      },
      {
        color: "Silver",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
      },
      {
        color: "Natural Silver",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
      },
      {
        color: "Slate Gray",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
      },
      {
        color: "Pearl White",
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  b7: {
    description: "Sony wireless headphones with premium noise cancelling, rich bass and comfortable over-ear fit.",
    sold: 310,
    note: "Top rated headphone for music lovers",
    tag: "Bestseller"
  },
  b8: {
    description: "JBL Bluetooth headphones with punchy bass, foldable design and hands-free calling.",
    sold: 204,
    note: "Bass headphone deal",
    tag: "Top brand"
  },
  b9: {
    description: "MacBook Air M3 laptop for office, creative work, study and long battery performance.",
    sold: 96,
    note: "Official store laptop",
    tag: "Official store"
  },
  b10: {
    description: "Samsung Galaxy mobile phone with AMOLED display, 5G speed and smooth camera experience.",
    sold: 155,
    note: "Popular Android phone",
    tag: "New"
  },
  b11: {
    description: "Adidas running shoes with responsive cushioning, sports comfort and durable outsole.",
    sold: 187,
    note: "Best selling running shoes",
    tag: "Bestseller"
  },
  b12: {
    description: "Kitchen blender for smoothies, sauces, shakes and daily home cooking prep.",
    sold: 88,
    note: "Useful kitchen appliance",
    tag: "Home"
  },
  b13: {
    description: "Skincare glow bundle with cleanser, serum and moisturizer for daily beauty routine.",
    sold: 122,
    note: "Original beauty products",
    tag: "Original"
  },
  b14: {
    description: "Ergonomic office chair with lumbar support, adjustable height and comfortable work seating.",
    sold: 67,
    note: "Home office essential",
    tag: "Comfort"
  },
  b15: {
    description: "Baby learning toys set with colorful shapes, safe materials and educational play pieces.",
    sold: 77,
    note: "Kids learning toys",
    tag: "Kids"
  },
  b16: {
    description: "Car dash camera with wide angle recording, night vision and easy automotive setup.",
    sold: 61,
    note: "Automotive safety accessory",
    tag: "Car"
  },
  b17: {
    description: "Gold plated earrings with elegant shine, lightweight fit and gift-ready finish.",
    sold: 49,
    note: "Jewellery gift pick",
    tag: "Jewelry"
  },
  b18: {
    description: "Leather travel bag with large storage, durable handles and weekend luggage design.",
    sold: 84,
    note: "Travel and luggage deal",
    tag: "Travel"
  }
};

const productColorPalettes = {
  Electronics: ["Midnight Black", "Silver", "Ocean Blue", "Pearl White", "Crimson Red"],
  "Clothing & Fashion": ["Classic Black", "Navy Blue", "Heather Grey", "Cream White", "Tan Brown"],
  "Sports & Outdoors": ["Sport Black", "Cloud White", "Royal Blue", "Energy Red", "Graphite"],
  "Home & Kitchen": ["Steel Silver", "Matte Black", "Ivory White", "Warm Beige", "Sage Green"],
  "Beauty & Personal Care": ["Rose Pink", "Champagne Gold", "Nude Beige", "Berry", "Clear"],
  "Groceries & Pets": ["Family Pack", "Fresh Pack", "Value Pack", "Organic", "Bulk Box"],
  "Books & Stationery": ["Blue", "Black", "Red", "Green", "Assorted"],
  "Toys & Games": ["Multicolor", "Blue", "Pink", "Yellow", "Green"],
  Automotive: ["Carbon Black", "Chrome", "Red", "Grey", "Blue"],
  "Jewellery & Watches": ["Gold", "Silver", "Rose Gold", "Black", "Pearl"],
  "Luggage & Travel": ["Black", "Brown", "Navy", "Grey", "Tan"]
};

const productSpecificColorPalettes = {
  f14: ["Ivory White", "Matte Black", "Graphite", "Steel Silver", "Cream White"],
  b12: ["Steel Silver", "Matte Black", "Ivory White", "Graphite", "Champagne Gold"],
  b14: ["Classic Black", "Heather Grey", "Warm Beige", "Sage Green", "Navy Blue"]
};

const productSizeOptions = {
  Electronics: ["Standard", "Pro", "Max"],
  "Clothing & Fashion": ["S", "M", "L", "XL"],
  "Sports & Outdoors": ["40", "41", "42", "43", "44"],
  "Home & Kitchen": ["1 pc", "2 pcs", "Family"],
  "Beauty & Personal Care": ["Mini", "Standard", "Bundle"],
  "Groceries & Pets": ["500g", "1kg", "2kg"],
  "Books & Stationery": ["A5", "A4", "Pack"],
  "Toys & Games": ["Small", "Medium", "Large"],
  Automotive: ["Universal", "Car", "SUV"],
  "Jewellery & Watches": ["One Size", "Adjustable", "Gift Set"],
  "Luggage & Travel": ["Cabin", "Medium", "Large"]
};

const heroSlides = [
  {
    eyebrow: "Mega",
    title: "Summer Sale Is Live!",
    lines: ["Up to 70% OFF on top brands", "Free delivery on orders above PKR 2,000"],
    action: "Shop Now",
    target: "#flashDeals",
    theme: "summer",
    products: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=450&q=80"
    ]
  },
  {
    eyebrow: "Tech",
    title: "Gadgets Week",
    lines: ["Smart watches, earbuds and laptops on deal", "Save big on official electronics"],
    action: "Explore Tech",
    category: "Electronics",
    theme: "tech",
    products: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=450&q=80"
    ]
  },
  {
    eyebrow: "Fashion",
    title: "New Season Fits",
    lines: ["Men's and women's fashion up to 65% off", "Fresh styles with Averon buyer protection"],
    action: "Shop Fashion",
    category: "Clothing & Fashion",
    theme: "fashion",
    products: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=450&q=80"
    ]
  },
  {
    eyebrow: "Home",
    title: "Home Essentials",
    lines: ["Upgrade kitchen, furniture and appliances", "Best quality, best prices, fast delivery"],
    action: "Shop Home",
    category: "Home & Kitchen",
    theme: "home",
    products: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=450&q=80"
    ]
  },
  {
    eyebrow: "Beauty",
    title: "Glow Deals",
    lines: ["Skincare, perfumes and grooming picks", "Original products from trusted sellers"],
    action: "Shop Beauty",
    category: "Beauty & Personal Care",
    theme: "beauty",
    products: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=450&q=80"
    ]
  },
  {
    eyebrow: "Sports",
    title: "Active Gear Sale",
    lines: ["Shoes, fitness gear and outdoor essentials", "Extra vouchers on selected sports picks"],
    action: "Shop Sports",
    category: "Sports & Outdoors",
    theme: "sports",
    products: [
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=450&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=450&q=80"
    ]
  }
];

const state = {
  category: "All",
  query: "",
  cart: loadCart(),
  heroIndex: 0,
  sideCategoryName: "Clothing & Fashion",
  sideCategoriesExpanded: false,
  categoryPopupName: "Clothing & Fashion",
  categoryPopupOpen: false,
  navCategoryName: "Clothing & Fashion",
  productReturnTarget: null,
  localeCode: "EN",
  localeKey: "other",
  currencyCode: "PKR",
  countryCode: "PK",
  resultsView: { type: "search" },
  flashIndex: 0,
  timerSeconds: 5 * 60 * 60 + 23 * 60 + 59
};

const byId = (id) => document.getElementById(id);
const fallbackCurrencyRates = {
  PKR: 1,
  AED: 0.0132,
  USD: 0.0036,
  SAR: 0.0135,
  EUR: 0.00335,
  GBP: 0.00282,
  QAR: 0.0131,
  KWD: 0.0011,
  BHD: 0.00135,
  OMR: 0.00138,
  INR: 0.3,
  BDT: 0.432,
  NPR: 0.48,
  LKR: 1.08,
  CNY: 0.026,
  JPY: 0.56,
  KRW: 5.15,
  SGD: 0.00485,
  MYR: 0.016,
  IDR: 58,
  THB: 0.13,
  VND: 93,
  TRY: 0.14,
  CAD: 0.00495,
  AUD: 0.0055,
  NZD: 0.006,
  CHF: 0.0029,
  SEK: 0.037,
  NOK: 0.038,
  DKK: 0.025,
  PLN: 0.014,
  ZAR: 0.066,
  EGP: 0.18,
  NGN: 5.6,
  KES: 0.47,
  MAD: 0.036,
  BRL: 0.02,
  MXN: 0.071
};
const currencyLocales = {
  PKR: "en-PK",
  AED: "en-AE",
  USD: "en-US",
  SAR: "en-SA",
  EUR: "en-DE",
  GBP: "en-GB",
  INR: "en-IN",
  CAD: "en-CA",
  AUD: "en-AU"
};
const zeroDecimalCurrencies = new Set(["PKR", "JPY", "KRW", "IDR", "VND"]);
const featuredCurrencyCodes = ["PKR", "AED", "USD", "SAR", "EUR", "GBP", "INR", "CAD", "AUD"];
const supportedCurrencyCodes =
  typeof Intl.supportedValuesOf === "function"
    ? Intl.supportedValuesOf("currency").filter((code) => /^[A-Z]{3}$/.test(code))
    : Object.keys(fallbackCurrencyRates);
const currencyCodes = [...new Set([...featuredCurrencyCodes, ...supportedCurrencyCodes])];
const localeDisplayTags = {
  EN: "en",
  UR: "ur",
  AR: "ar",
  ZH: "zh-Hans",
  ES: "es",
  DE: "de",
  FR: "fr",
  TR: "tr",
  HI: "hi",
  PT: "pt",
  IT: "it",
  RU: "ru",
  JA: "ja",
  KO: "ko",
  BN: "bn",
  ID: "id",
  MS: "ms",
  FA: "fa",
  HE: "he",
  NL: "nl",
  PL: "pl",
  SV: "sv",
  TH: "th",
  VI: "vi"
};
const englishCurrencyNameOverrides = {
  AED: "UAE Dirham",
  USD: "US Dollar",
  SAR: "Saudi Riyal",
  GBP: "British Pound",
  INR: "Indian Rupee",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar"
};
const currencyByRegion = {
  AE: "AED",
  PK: "PKR",
  US: "USD",
  GB: "GBP",
  SA: "SAR",
  QA: "QAR",
  KW: "KWD",
  BH: "BHD",
  OM: "OMR",
  IN: "INR",
  BD: "BDT",
  NP: "NPR",
  LK: "LKR",
  CN: "CNY",
  JP: "JPY",
  KR: "KRW",
  SG: "SGD",
  MY: "MYR",
  ID: "IDR",
  TH: "THB",
  VN: "VND",
  TR: "TRY",
  CA: "CAD",
  AU: "AUD",
  NZ: "NZD",
  CH: "CHF",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  PL: "PLN",
  ZA: "ZAR",
  EG: "EGP",
  NG: "NGN",
  KE: "KES",
  MA: "MAD",
  BR: "BRL",
  MX: "MXN",
  DE: "EUR",
  FR: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  PT: "EUR",
  AT: "EUR",
  BE: "EUR",
  IE: "EUR"
};
const currencyByTimeZone = {
  "Asia/Dubai": "AED",
  "Asia/Karachi": "PKR",
  "Asia/Riyadh": "SAR",
  "Asia/Qatar": "QAR",
  "Asia/Kuwait": "KWD",
  "Asia/Bahrain": "BHD",
  "Asia/Muscat": "OMR",
  "Asia/Kolkata": "INR",
  "Asia/Dhaka": "BDT",
  "Asia/Kathmandu": "NPR",
  "Asia/Colombo": "LKR",
  "Asia/Shanghai": "CNY",
  "Asia/Tokyo": "JPY",
  "Asia/Seoul": "KRW",
  "Asia/Singapore": "SGD",
  "Asia/Kuala_Lumpur": "MYR",
  "Asia/Jakarta": "IDR",
  "Asia/Bangkok": "THB",
  "Asia/Ho_Chi_Minh": "VND",
  "Europe/Istanbul": "TRY",
  "Europe/London": "GBP",
  "Europe/Berlin": "EUR",
  "Europe/Paris": "EUR",
  "Europe/Rome": "EUR",
  "Europe/Madrid": "EUR",
  "Europe/Amsterdam": "EUR",
  "Europe/Zurich": "CHF",
  "America/New_York": "USD",
  "America/Chicago": "USD",
  "America/Denver": "USD",
  "America/Los_Angeles": "USD",
  "America/Toronto": "CAD",
  "Australia/Sydney": "AUD",
  "Pacific/Auckland": "NZD"
};
const countryCodes = `
  AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ
  CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR
  GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO
  JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR
  MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO
  RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV
  TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW
`
  .trim()
  .split(/\s+/);
const countryCurrencies = {
  AED: "AE",
  AFN: "AF",
  ALL: "AL",
  AMD: "AM",
  AOA: "AO",
  ARS: "AR",
  AUD: "AU CC CX HM KI NF NR TV",
  AWG: "AW",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  BTN: "BT",
  BWP: "BW",
  BYN: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  CHF: "CH LI",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK FO GL",
  DOP: "DO",
  DZD: "DZ EH",
  EGP: "EG",
  ERN: "ER",
  ETB: "ET",
  EUR: "AD AT AX BE BL CY DE EE ES FI FR GF GP GR HR IE IT LT LU LV MC ME MF MQ MT NL PM PT RE SI SK SM TF VA YT",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB GG GS IM IO JE",
  GEL: "GE",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL PS",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRU: "MR",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  NGN: "NG",
  NIO: "NI",
  NOK: "BV NO SJ",
  NPR: "NP",
  NZD: "CK NU NZ PN TK",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SHP: "SH",
  SLE: "SL",
  SOS: "SO",
  SRD: "SR",
  SSP: "SS",
  STN: "ST",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "AQ AS BQ EC FM GU MH MP PR PW SV TC TL UM US VG VI",
  UYU: "UY",
  UZS: "UZ",
  VES: "VE",
  VND: "VN",
  VUV: "VU",
  WST: "WS",
  XAF: "CF CG CM GA GQ TD",
  XCD: "AG AI DM GD KN LC MS VC",
  XOF: "BF BJ CI GW ML NE SN TG",
  XPF: "NC PF WF",
  YER: "YE",
  ZAR: "LS SZ ZA",
  ZMW: "ZM",
  ZWL: "ZW"
};
Object.entries(countryCurrencies).forEach(([currency, regions]) => {
  regions.split(" ").forEach((region) => {
    currencyByRegion[region] = currency;
  });
});
const countryByTimeZone = {
  "Asia/Karachi": "PK",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Asia/Qatar": "QA",
  "Asia/Kuwait": "KW",
  "Asia/Bahrain": "BH",
  "Asia/Muscat": "OM",
  "Asia/Kolkata": "IN",
  "Asia/Dhaka": "BD",
  "Asia/Kathmandu": "NP",
  "Asia/Colombo": "LK",
  "Asia/Shanghai": "CN",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Singapore": "SG",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Jakarta": "ID",
  "Asia/Bangkok": "TH",
  "Asia/Ho_Chi_Minh": "VN",
  "Europe/Istanbul": "TR",
  "Europe/London": "GB",
  "Europe/Berlin": "DE",
  "Europe/Paris": "FR",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "Europe/Amsterdam": "NL",
  "Europe/Zurich": "CH",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Toronto": "CA",
  "Australia/Sydney": "AU",
  "Pacific/Auckland": "NZ"
};

function loadStoredCurrencyRates() {
  try {
    return JSON.parse(localStorage.getItem("averon-currency-rates") || "{}");
  } catch (error) {
    return {};
  }
}

let currencyRates = { ...fallbackCurrencyRates, ...loadStoredCurrencyRates() };

function currencyDisplayName(code) {
  if (state.localeCode === "EN" && englishCurrencyNameOverrides[code]) {
    return englishCurrencyNameOverrides[code];
  }
  if (typeof Intl.DisplayNames !== "function") {
    return code;
  }
  try {
    return new Intl.DisplayNames([localeDisplayTags[state.localeCode] || "en"], { type: "currency" }).of(code) || code;
  } catch (error) {
    return code;
  }
}

function currencyDisplayLabel(code) {
  return `${code} - ${currencyDisplayName(code)}`;
}

function countryDisplayName(code, locale = localeDisplayTags[state.localeCode] || "en") {
  if (typeof Intl.DisplayNames !== "function") {
    return code;
  }
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) || code;
  } catch (error) {
    return code;
  }
}

function countryDisplayLabel(code) {
  return countryDisplayName(code);
}

function currencyConfig(code) {
  const normalizedCode = currencyCodes.includes(code) ? code : "PKR";
  return {
    rate: Number(currencyRates[normalizedCode]) || fallbackCurrencyRates[normalizedCode] || 1,
    locale: currencyLocales[normalizedCode] || "en",
    currency: normalizedCode,
    digits: zeroDecimalCurrencies.has(normalizedCode) ? 0 : 2
  };
}

function formatCurrency(value, code = state.currencyCode) {
  const config = currencyConfig(code);
  const amount = Number(value || 0) * config.rate;
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: config.digits,
    maximumFractionDigits: config.digits
  }).format(amount);
}
let toastTimer;
let heroTimer;
let discoveryTimer;
let brandAutoTimer;
let flashSaleTimer;
const promoSliderTimers = new WeakMap();

const uiCopy = {
  EN: {
    freeDelivery: "Free Delivery on orders above PKR 2,000",
    returns: "7 Days Easy Returns",
    securePayments: "Secure Payments",
    dealsDiscounts: "Best Deals & Discounts",
    sell: "Sell on Averon",
    track: "Track Order",
    support: "Help & Support",
    allCategories: "All Categories",
    searchLabel: "Search products",
    searchPlaceholder: "Search for products, brands and more...",
    searchIn: "Search in {category}...",
    searchButton: "Search",
    preferences: "Preferences",
    languageTitle: "Language",
    changeLanguage: "Change language",
    chooseOtherLanguage: "Choose other language",
    selectLanguage: "Select language",
    searchLanguage: "Search language",
    currency: "Currency",
    searchCurrency: "Search currency",
    shoppingRegion: "Shopping region",
    regionName: "Averon Pakistan",
    changeCountry: "Change country/region",
    searchCountry: "Search country or region",
    noCountryFound: "No country or region found.",
    countrySwitched: "Shopping region changed to {country}. Currency: {currency}",
    wishlist: "Wishlist",
    cart: "Cart",
    hiAli: "Hi, Ali",
    myAccount: "My Account",
    official: "Averon Assured",
    todaysDeals: "Today's Deals",
    flashDeals: "Flash Sale",
    bestSellers: "Best Sellers",
    newArrivals: "New Arrivals",
    topBrands: "Top Brands",
    prime: "Averon Prime",
    vouchers: "Vouchers",
    viewAllCategories: "View All Categories",
    vipAccess: "VIP Access",
    primeDesc: "Free delivery, early deals, priority support and members-only vouchers in one pass.",
    freeDeliveryShort: "Free Delivery",
    earlyDeals: "Early Deals",
    primeVouchers: "Prime Vouchers",
    joinPrime: "Join Prime ->",
    bestSellingProducts: "Best Selling Products",
    viewAll: "View All",
    shopMore: "Shop More",
    customerReviews: "Customer Reviews",
    seeCustomerReviews: "See customer reviews",
    globalRatings: "{count} global ratings",
    outOfFive: "{rating} out of 5",
    ratingBreakdown: "Rating breakdown",
    moreExplore: "More To Explore",
    checkout: "Checkout",
    yourCart: "Your cart",
    fullName: "Full name",
    deliveryCity: "Delivery city",
    address: "Address",
    total: "Total",
    placeOrder: "Place order",
    emptyCart: "Your cart is empty.",
    color: "Color",
    size: "Size",
    each: "each",
    remove: "Remove",
    noProducts: "No products found. Try another category or search term.",
    searchResults: "Search Results",
    results: "Results",
    searchMeta: "Products matching your search.",
    languageSwitched: "Language switched to {code}",
    currencySwitched: "Currency switched to {code}",
    cartAdded: "{title} ({color}) added to cart",
    namePlaceholder: "Ayesha Khan",
    addressPlaceholder: "House, street, area",
    cashOnDelivery: "Cash on Delivery",
    walletPayment: "Wallet",
    cardPayment: "Card",
    noCurrencyFound: "No currency found."
  },
  UR: {
    freeDelivery: "PKR 2,000 se upar free delivery",
    returns: "7 din easy returns",
    securePayments: "Secure payments",
    dealsDiscounts: "Best deals aur discounts",
    sell: "Averon par sell karein",
    track: "Order track karein",
    support: "Help aur support",
    allCategories: "Saari categories",
    searchLabel: "Products search karein",
    searchPlaceholder: "Products, brands aur zyada search karein...",
    searchIn: "{category} me search karein...",
    searchButton: "Search",
    preferences: "Preferences",
    languageTitle: "Language",
    changeLanguage: "Language change karein",
    chooseOtherLanguage: "Other language choose karein",
    selectLanguage: "Language select karein",
    currency: "Currency",
    shoppingRegion: "Shopping region",
    regionName: "Averon Pakistan",
    changeCountry: "Country/region change karein",
    searchCountry: "Country ya region search karein",
    noCountryFound: "Country ya region nahi mila.",
    countrySwitched: "Shopping region {country} ho gaya. Currency: {currency}",
    wishlist: "Wishlist",
    cart: "Cart",
    hiAli: "Hi, Ali",
    myAccount: "My Account",
    official: "Averon Assured",
    todaysDeals: "Aaj ki deals",
    flashDeals: "Flash sale",
    bestSellers: "Best sellers",
    newArrivals: "New arrivals",
    topBrands: "Top brands",
    prime: "Averon Prime",
    vouchers: "Vouchers",
    viewAllCategories: "Saari categories dekhein",
    vipAccess: "VIP Access",
    primeDesc: "Free delivery, early deals, priority support aur members-only vouchers ek pass me.",
    freeDeliveryShort: "Free Delivery",
    earlyDeals: "Early Deals",
    primeVouchers: "Prime Vouchers",
    joinPrime: "Join Prime ->",
    bestSellingProducts: "Best selling products",
    viewAll: "View All",
    shopMore: "Shop More",
    customerReviews: "Customer reviews",
    seeCustomerReviews: "Customer reviews dekhein",
    globalRatings: "{count} global ratings",
    outOfFive: "{rating} out of 5",
    ratingBreakdown: "Rating breakdown",
    moreExplore: "More to explore",
    checkout: "Checkout",
    yourCart: "Aapka cart",
    fullName: "Full name",
    deliveryCity: "Delivery city",
    address: "Address",
    total: "Total",
    placeOrder: "Order place karein",
    emptyCart: "Aapka cart empty hai.",
    color: "Color",
    size: "Size",
    each: "each",
    remove: "Remove",
    noProducts: "Koi product nahi mila. Doosri category ya search try karein.",
    searchResults: "Search results",
    results: "Results",
    searchMeta: "Aapki search ke mutabiq products.",
    languageSwitched: "Language {code} par change ho gayi",
    currencySwitched: "Currency {code} par change ho gayi",
    cartAdded: "{title} ({color}) cart me add ho gaya",
    namePlaceholder: "Ayesha Khan",
    addressPlaceholder: "House, street, area"
  },
  TR: {
    searchPlaceholder: "Urun, marka ve daha fazlasini ara...",
    searchButton: "Ara",
    changeLanguage: "Dili degistir",
    chooseOtherLanguage: "Diger dili sec",
    selectLanguage: "Dil sec",
    currency: "Para birimi",
    wishlist: "Favoriler",
    cart: "Sepet",
    todaysDeals: "Bugunun firsatlari",
    flashDeals: "Flash firsatlar",
    bestSellers: "Cok satanlar",
    newArrivals: "Yeni gelenler",
    topBrands: "En iyi markalar",
    viewAllCategories: "Tum kategoriler",
    bestSellingProducts: "Cok satan urunler",
    viewAll: "Tumunu gor",
    checkout: "Odeme",
    yourCart: "Sepetiniz",
    fullName: "Ad soyad",
    deliveryCity: "Teslimat sehri",
    address: "Adres",
    total: "Toplam",
    placeOrder: "Siparis ver",
    emptyCart: "Sepetiniz bos.",
    noProducts: "Urun bulunamadi. Baska arama deneyin.",
    languageSwitched: "Dil {code} olarak degisti"
  },
  FR: {
    searchPlaceholder: "Rechercher produits, marques et plus...",
    searchButton: "Rechercher",
    changeLanguage: "Changer la langue",
    chooseOtherLanguage: "Choisir une autre langue",
    selectLanguage: "Choisir une langue",
    currency: "Devise",
    wishlist: "Favoris",
    cart: "Panier",
    todaysDeals: "Offres du jour",
    flashDeals: "Ventes flash",
    bestSellers: "Meilleures ventes",
    newArrivals: "Nouveautes",
    topBrands: "Grandes marques",
    viewAllCategories: "Toutes les categories",
    bestSellingProducts: "Produits les plus vendus",
    viewAll: "Voir tout",
    checkout: "Paiement",
    yourCart: "Votre panier",
    fullName: "Nom complet",
    deliveryCity: "Ville de livraison",
    address: "Adresse",
    total: "Total",
    placeOrder: "Passer commande",
    emptyCart: "Votre panier est vide.",
    noProducts: "Aucun produit trouve. Essayez une autre recherche.",
    languageSwitched: "Langue changee en {code}"
  },
  ES: {
    searchPlaceholder: "Buscar productos, marcas y mas...",
    searchButton: "Buscar",
    changeLanguage: "Cambiar idioma",
    chooseOtherLanguage: "Elegir otro idioma",
    selectLanguage: "Seleccionar idioma",
    currency: "Moneda",
    wishlist: "Favoritos",
    cart: "Carrito",
    todaysDeals: "Ofertas de hoy",
    flashDeals: "Ofertas flash",
    bestSellers: "Mas vendidos",
    newArrivals: "Novedades",
    viewAll: "Ver todo",
    checkout: "Checkout",
    yourCart: "Tu carrito",
    placeOrder: "Realizar pedido",
    emptyCart: "Tu carrito esta vacio.",
    languageSwitched: "Idioma cambiado a {code}"
  },
  DE: {
    searchPlaceholder: "Produkte, Marken und mehr suchen...",
    searchButton: "Suchen",
    changeLanguage: "Sprache andern",
    chooseOtherLanguage: "Andere Sprache wahlen",
    selectLanguage: "Sprache wahlen",
    currency: "Wahrung",
    wishlist: "Wunschliste",
    cart: "Warenkorb",
    todaysDeals: "Angebote heute",
    flashDeals: "Blitzangebote",
    bestSellers: "Bestseller",
    newArrivals: "Neuheiten",
    viewAll: "Alle ansehen",
    checkout: "Kasse",
    yourCart: "Ihr Warenkorb",
    placeOrder: "Bestellen",
    emptyCart: "Ihr Warenkorb ist leer.",
    languageSwitched: "Sprache auf {code} geandert"
  },
  HI: {
    searchPlaceholder: "Products, brands aur zyada search karein...",
    searchButton: "Search",
    changeLanguage: "Language badlein",
    chooseOtherLanguage: "Other language choose karein",
    selectLanguage: "Language select karein",
    currency: "Currency",
    wishlist: "Wishlist",
    cart: "Cart",
    todaysDeals: "Aaj ki deals",
    flashDeals: "Flash sale",
    bestSellers: "Best sellers",
    newArrivals: "New arrivals",
    viewAll: "View All",
    checkout: "Checkout",
    yourCart: "Aapka cart",
    placeOrder: "Order place karein",
    emptyCart: "Aapka cart empty hai.",
    languageSwitched: "Language {code} par change ho gayi"
  },
  PT: {
    searchPlaceholder: "Pesquisar produtos, marcas e mais...",
    searchButton: "Pesquisar",
    changeLanguage: "Alterar idioma",
    chooseOtherLanguage: "Escolher outro idioma",
    selectLanguage: "Selecionar idioma",
    currency: "Moeda",
    wishlist: "Favoritos",
    cart: "Carrinho",
    todaysDeals: "Ofertas de hoje",
    flashDeals: "Ofertas flash",
    bestSellers: "Mais vendidos",
    newArrivals: "Novidades",
    viewAll: "Ver tudo",
    checkout: "Checkout",
    yourCart: "Seu carrinho",
    placeOrder: "Fazer pedido",
    emptyCart: "Seu carrinho esta vazio.",
    languageSwitched: "Idioma alterado para {code}"
  },
  AR: {
    searchPlaceholder: "Search products, brands and more...",
    searchButton: "Search",
    changeLanguage: "Change language",
    chooseOtherLanguage: "Choose other language",
    selectLanguage: "Select language",
    currency: "Currency",
    wishlist: "Wishlist",
    cart: "Cart",
    todaysDeals: "Today's Deals",
    flashDeals: "Flash Sale",
    bestSellers: "Best Sellers",
    newArrivals: "New Arrivals",
    viewAll: "View All",
    checkout: "Checkout",
    yourCart: "Your cart",
    placeOrder: "Place order",
    emptyCart: "Your cart is empty.",
    languageSwitched: "Language switched to {code}"
  },
  ZH: {
    searchPlaceholder: "Search products, brands and more...",
    searchButton: "Search",
    changeLanguage: "Change language",
    chooseOtherLanguage: "Choose other language",
    selectLanguage: "Select language",
    currency: "Currency",
    wishlist: "Wishlist",
    cart: "Cart",
    todaysDeals: "Today's Deals",
    flashDeals: "Flash Sale",
    bestSellers: "Best Sellers",
    newArrivals: "New Arrivals",
    viewAll: "View All",
    checkout: "Checkout",
    yourCart: "Your cart",
    placeOrder: "Place order",
    emptyCart: "Your cart is empty.",
    languageSwitched: "Language switched to {code}"
  }
};

const localeFallbacks = {
  IT: "ES",
  RU: "DE",
  JA: "ZH",
  KO: "ZH",
  BN: "HI",
  ID: "PT",
  MS: "PT",
  FA: "UR",
  HE: "AR",
  NL: "DE",
  PL: "DE",
  SV: "DE",
  TH: "EN",
  VI: "PT"
};

uiCopy.FA = {
  freeDelivery: "ارسال رایگان برای سفارش‌های بالای PKR 2,000",
  returns: "بازگشت آسان تا ۷ روز",
  securePayments: "پرداخت امن",
  dealsDiscounts: "بهترین تخفیف‌ها و پیشنهادها",
  sell: "فروش در Averon",
  track: "پیگیری سفارش",
  support: "راهنما و پشتیبانی",
  allCategories: "همه دسته‌ها",
  searchLabel: "جستجوی محصولات",
  searchPlaceholder: "جستجوی محصولات، برندها و بیشتر...",
  searchIn: "جستجو در {category}...",
  searchButton: "جستجو",
  preferences: "تنظیمات",
  selectLanguage: "انتخاب زبان",
  currency: "ارز",
  shoppingRegion: "منطقه خرید",
  regionName: "Averon پاکستان",
  changeCountry: "تغییر کشور/منطقه",
  wishlist: "فهرست علاقه‌مندی",
  cart: "سبد خرید",
  hiAli: "سلام، علی",
  myAccount: "حساب من",
  official: "Averon Assured",
  todaysDeals: "پیشنهادهای امروز",
  flashDeals: "پیشنهادهای فوری",
  bestSellers: "پرفروش‌ها",
  newArrivals: "تازه‌ها",
  topBrands: "برندهای برتر",
  prime: "Averon Prime",
  vouchers: "کوپن‌ها",
  viewAllCategories: "مشاهده همه دسته‌ها",
  vipAccess: "دسترسی VIP",
  primeDesc: "ارسال رایگان، پیشنهادهای زودهنگام، پشتیبانی ویژه و کوپن‌های اعضا در یک پاس.",
  freeDeliveryShort: "ارسال رایگان",
  earlyDeals: "پیشنهادهای زودهنگام",
  primeVouchers: "کوپن‌های پرایم",
  joinPrime: "عضویت در پرایم ->",
  bestSellingProducts: "محصولات پرفروش",
  viewAll: "مشاهده همه",
  moreExplore: "بیشتر برای کاوش",
  checkout: "تسویه حساب",
  yourCart: "سبد خرید شما",
  fullName: "نام کامل",
  deliveryCity: "شهر تحویل",
  address: "آدرس",
  total: "مجموع",
  placeOrder: "ثبت سفارش",
  emptyCart: "سبد خرید شما خالی است.",
  color: "رنگ",
  size: "اندازه",
  each: "هر عدد",
  remove: "حذف",
  noProducts: "محصولی پیدا نشد. دسته یا جستجوی دیگری را امتحان کنید.",
  searchResults: "نتایج جستجو",
  results: "نتایج",
  searchMeta: "محصولات مطابق جستجوی شما.",
  languageSwitched: "زبان به {code} تغییر کرد",
  currencySwitched: "ارز به {code} تغییر کرد",
  cartAdded: "{title} ({color}) به سبد خرید اضافه شد",
  namePlaceholder: "Ayesha Khan",
  addressPlaceholder: "خانه، خیابان، منطقه"
};

const extendedUiCopy = {
  EN: {
    footerIntro: "Averon is your one-stop online marketplace for everything you need. Best quality, best prices, best experience.",
    customerService: "Customer Service",
    helpCenter: "Help Center",
    trackOrder: "Track Order",
    returnsRefunds: "Returns & Refunds",
    shippingInfo: "Shipping Info",
    contactUs: "Contact Us",
    aboutAveron: "About Averon",
    aboutUs: "About Us",
    careers: "Careers",
    averonPrime: "Averon Prime",
    pressMedia: "Press & Media",
    averonBlog: "Averon Blog",
    makeMoney: "Make Money with Us",
    sellOnAveron: "Sell on Averon",
    becomeAffiliate: "Become an Affiliate",
    advertiseProducts: "Advertise Your Products",
    averonVendors: "Averon Vendors",
    paymentMethods: "Payment Methods",
    downloadApp: "Download App",
    footerRights: "© 2026 Averon. All Rights Reserved.",
    footerPolicies: "Terms & Conditions | Privacy Policy | Refund Policy | Sitemap",
    backToStore: "Back to store",
    averonVerified: "Averon verified",
    sold: "sold",
    productDescription: "{title} with trusted quality and Averon buyer protection.",
    delivery: "Delivery",
    freeDeliveryAvailable: "Free delivery available",
    deliveryInfo: "Estimated delivery by {date}. Cash on delivery, wallet and card supported.",
    quantity: "Quantity",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    bestValue: "Best value"
  },
  UR: {
    footerIntro: "Averon aapka one-stop online marketplace hai. Best quality, best prices, best experience.",
    customerService: "Customer madad",
    helpCenter: "Madad center",
    trackOrder: "Order track karein",
    returnsRefunds: "Returns aur refunds",
    shippingInfo: "Shipping maloomat",
    contactUs: "Rabita karein",
    aboutAveron: "Averon ke bare me",
    aboutUs: "Hamare bare me",
    careers: "Jobs aur careers",
    averonPrime: "Averon Prime",
    pressMedia: "Press aur media",
    averonBlog: "Averon blog",
    makeMoney: "Averon ke sath kamai",
    sellOnAveron: "Averon par sell karein",
    becomeAffiliate: "Affiliate banein",
    advertiseProducts: "Apne products advertise karein",
    averonVendors: "Averon vendors",
    paymentMethods: "Payment methods",
    downloadApp: "App download karein",
    footerRights: "© 2026 Averon. Saare rights reserved.",
    footerPolicies: "Terms & Conditions | Privacy Policy | Refund Policy | Sitemap",
    backToStore: "Store par wapas",
    averonVerified: "Averon verified",
    sold: "sold",
    productDescription: "{title} verified quality, secure payment aur Averon buyer protection ke sath available hai.",
    delivery: "Delivery details",
    freeDeliveryAvailable: "Free delivery available",
    deliveryInfo: "{date} tak estimated delivery. Cash on delivery, wallet aur card supported hain.",
    quantity: "Miqdar",
    addToCart: "Cart me add karein",
    buyNow: "Abhi khareedein",
    bestValue: "Best value"
  },
  TR: {
    footerIntro: "Averon, ihtiyaciniz olan her sey icin tek online pazaryerinizdir.",
    customerService: "Musteri Hizmeti",
    helpCenter: "Yardim Merkezi",
    trackOrder: "Siparis Takibi",
    returnsRefunds: "Iade ve Geri Odeme",
    shippingInfo: "Kargo Bilgisi",
    contactUs: "Bize Ulasin",
    aboutAveron: "Averon Hakkinda",
    aboutUs: "Hakkimizda",
    careers: "Kariyer",
    averonPrime: "Averon Prime",
    pressMedia: "Basin ve Medya",
    averonBlog: "Averon Blog",
    makeMoney: "Bizimle Kazanin",
    sellOnAveron: "Averon'da Satis Yap",
    becomeAffiliate: "Ortak Ol",
    advertiseProducts: "Urunlerini Tanit",
    averonVendors: "Averon Saticilari",
    paymentMethods: "Odeme Yontemleri",
    downloadApp: "Uygulamayi Indir",
    footerRights: "© 2026 Averon. Tum haklari saklidir.",
    footerPolicies: "Sartlar | Gizlilik | Iade Politikasi | Site Haritasi",
    backToStore: "Magazaya don",
    averonVerified: "Averon onayli",
    sold: "satildi",
    productDescription: "{title}, guvenilir kalite ve Averon alici korumasi ile sunulur.",
    delivery: "Teslimat",
    freeDeliveryAvailable: "Ucretsiz teslimat mevcut",
    deliveryInfo: "{date} tarihine kadar tahmini teslimat. Kapida odeme, cuzdan ve kart desteklenir.",
    quantity: "Adet",
    addToCart: "Sepete Ekle",
    buyNow: "Hemen Al",
    bestValue: "En iyi deger"
  },
  FR: {
    footerIntro: "Averon est votre marketplace en ligne pour tout ce dont vous avez besoin.",
    customerService: "Service client",
    helpCenter: "Centre d'aide",
    trackOrder: "Suivre la commande",
    returnsRefunds: "Retours et remboursements",
    shippingInfo: "Infos livraison",
    contactUs: "Contactez-nous",
    aboutAveron: "A propos d'Averon",
    aboutUs: "A propos",
    careers: "Carrieres",
    averonPrime: "Averon Prime",
    pressMedia: "Presse et medias",
    averonBlog: "Blog Averon",
    makeMoney: "Gagner avec nous",
    sellOnAveron: "Vendre sur Averon",
    becomeAffiliate: "Devenir affilie",
    advertiseProducts: "Promouvoir vos produits",
    averonVendors: "Vendeurs Averon",
    paymentMethods: "Moyens de paiement",
    downloadApp: "Telecharger l'app",
    footerRights: "© 2026 Averon. Tous droits reserves.",
    footerPolicies: "Conditions | Confidentialite | Remboursement | Plan du site",
    backToStore: "Retour a la boutique",
    averonVerified: "Verifie par Averon",
    sold: "vendus",
    productDescription: "{title} avec qualite verifiee et protection acheteur Averon.",
    delivery: "Livraison",
    freeDeliveryAvailable: "Livraison gratuite disponible",
    deliveryInfo: "Livraison estimee avant le {date}. Paiement a la livraison, wallet et carte acceptes.",
    quantity: "Quantite",
    addToCart: "Ajouter au panier",
    buyNow: "Acheter",
    bestValue: "Meilleure valeur"
  },
  ES: {
    footerIntro: "Averon es tu marketplace online para todo lo que necesitas.",
    customerService: "Atencion al cliente",
    helpCenter: "Centro de ayuda",
    trackOrder: "Rastrear pedido",
    returnsRefunds: "Devoluciones y reembolsos",
    shippingInfo: "Info de envio",
    contactUs: "Contactanos",
    aboutAveron: "Acerca de Averon",
    aboutUs: "Acerca de nosotros",
    careers: "Carreras",
    averonPrime: "Averon Prime",
    pressMedia: "Prensa y medios",
    averonBlog: "Blog de Averon",
    makeMoney: "Gana con nosotros",
    sellOnAveron: "Vender en Averon",
    becomeAffiliate: "Ser afiliado",
    advertiseProducts: "Anuncia tus productos",
    averonVendors: "Vendedores Averon",
    paymentMethods: "Metodos de pago",
    downloadApp: "Descargar app",
    footerRights: "© 2026 Averon. Todos los derechos reservados.",
    footerPolicies: "Terminos | Privacidad | Reembolso | Mapa del sitio",
    backToStore: "Volver a la tienda",
    averonVerified: "Verificado por Averon",
    sold: "vendidos",
    productDescription: "{title} con calidad verificada y proteccion de comprador Averon.",
    delivery: "Entrega",
    freeDeliveryAvailable: "Entrega gratis disponible",
    deliveryInfo: "Entrega estimada para {date}. Pago contra entrega, wallet y tarjeta disponibles.",
    quantity: "Cantidad",
    addToCart: "Agregar al carrito",
    buyNow: "Comprar ahora",
    bestValue: "Mejor valor"
  },
  DE: {
    footerIntro: "Averon ist Ihr Online-Marktplatz fur alles, was Sie brauchen.",
    customerService: "Kundenservice",
    helpCenter: "Hilfezentrum",
    trackOrder: "Bestellung verfolgen",
    returnsRefunds: "Ruckgaben und Erstattungen",
    shippingInfo: "Versandinfo",
    contactUs: "Kontakt",
    aboutAveron: "Uber Averon",
    aboutUs: "Uber uns",
    careers: "Karriere",
    averonPrime: "Averon Prime",
    pressMedia: "Presse und Medien",
    averonBlog: "Averon Blog",
    makeMoney: "Mit uns verdienen",
    sellOnAveron: "Auf Averon verkaufen",
    becomeAffiliate: "Affiliate werden",
    advertiseProducts: "Produkte bewerben",
    averonVendors: "Averon Anbieter",
    paymentMethods: "Zahlungsmethoden",
    downloadApp: "App herunterladen",
    footerRights: "© 2026 Averon. Alle Rechte vorbehalten.",
    footerPolicies: "Bedingungen | Datenschutz | Ruckgabe | Sitemap",
    backToStore: "Zuruck zum Shop",
    averonVerified: "Averon verifiziert",
    sold: "verkauft",
    productDescription: "{title} mit geprufter Qualitat und Averon Kaufschutz.",
    delivery: "Lieferung",
    freeDeliveryAvailable: "Kostenlose Lieferung verfugbar",
    deliveryInfo: "Voraussichtliche Lieferung bis {date}. Nachnahme, Wallet und Karte werden unterstutzt.",
    quantity: "Menge",
    addToCart: "In den Warenkorb",
    buyNow: "Jetzt kaufen",
    bestValue: "Bester Wert"
  },
  HI: {
    footerIntro: "Averon aapka one-stop online marketplace hai.",
    customerService: "Customer madad",
    helpCenter: "Madad center",
    trackOrder: "Order track karein",
    returnsRefunds: "Returns aur refunds",
    shippingInfo: "Shipping maloomat",
    contactUs: "Rabita karein",
    aboutAveron: "Averon ke bare me",
    aboutUs: "Hamare bare me",
    careers: "Jobs aur careers",
    averonPrime: "Averon Prime",
    pressMedia: "Press aur media",
    averonBlog: "Averon blog",
    makeMoney: "Averon ke sath kamai",
    sellOnAveron: "Averon par sell karein",
    becomeAffiliate: "Affiliate banein",
    advertiseProducts: "Apne products advertise karein",
    averonVendors: "Averon vendors",
    paymentMethods: "Payment methods",
    downloadApp: "App download karein",
    footerRights: "© 2026 Averon. Saare rights reserved.",
    footerPolicies: "Terms & Conditions | Privacy Policy | Refund Policy | Sitemap",
    backToStore: "Store par wapas",
    averonVerified: "Averon verified",
    sold: "sold",
    productDescription: "{title} verified quality aur Averon buyer protection ke sath available hai.",
    delivery: "Delivery details",
    freeDeliveryAvailable: "Free delivery available",
    deliveryInfo: "{date} tak estimated delivery. COD, wallet aur card supported hain.",
    quantity: "Miqdar",
    addToCart: "Cart me add karein",
    buyNow: "Abhi khareedein",
    bestValue: "Best value"
  },
  PT: {
    footerIntro: "Averon e o seu marketplace online para tudo que voce precisa.",
    customerService: "Atendimento ao cliente",
    helpCenter: "Central de ajuda",
    trackOrder: "Rastrear pedido",
    returnsRefunds: "Devolucoes e reembolsos",
    shippingInfo: "Info de envio",
    contactUs: "Fale conosco",
    aboutAveron: "Sobre Averon",
    aboutUs: "Sobre nos",
    careers: "Carreiras",
    averonPrime: "Averon Prime",
    pressMedia: "Imprensa e midia",
    averonBlog: "Blog Averon",
    makeMoney: "Ganhe conosco",
    sellOnAveron: "Vender na Averon",
    becomeAffiliate: "Torne-se afiliado",
    advertiseProducts: "Anuncie seus produtos",
    averonVendors: "Vendedores Averon",
    paymentMethods: "Metodos de pagamento",
    downloadApp: "Baixar app",
    footerRights: "© 2026 Averon. Todos os direitos reservados.",
    footerPolicies: "Termos | Privacidade | Reembolso | Mapa do site",
    backToStore: "Voltar para a loja",
    averonVerified: "Verificado pela Averon",
    sold: "vendidos",
    productDescription: "{title} com qualidade verificada e protecao ao comprador Averon.",
    delivery: "Entrega",
    freeDeliveryAvailable: "Entrega gratis disponivel",
    deliveryInfo: "Entrega estimada ate {date}. COD, wallet e cartao suportados.",
    quantity: "Quantidade",
    addToCart: "Adicionar ao carrinho",
    buyNow: "Comprar agora",
    bestValue: "Melhor valor"
  },
  AR: {
    footerIntro: "Averon هو سوقك الالكتروني لكل ما تحتاجه.",
    customerService: "خدمة العملاء",
    helpCenter: "مركز المساعدة",
    trackOrder: "تتبع الطلب",
    returnsRefunds: "الارجاع والاسترداد",
    shippingInfo: "معلومات الشحن",
    contactUs: "اتصل بنا",
    aboutAveron: "عن Averon",
    aboutUs: "من نحن",
    careers: "الوظائف",
    averonPrime: "Averon Prime",
    pressMedia: "الصحافة والاعلام",
    averonBlog: "مدونة Averon",
    makeMoney: "اكسب معنا",
    sellOnAveron: "بع على Averon",
    becomeAffiliate: "كن شريكا",
    advertiseProducts: "اعلن عن منتجاتك",
    averonVendors: "بائعو Averon",
    paymentMethods: "طرق الدفع",
    downloadApp: "تحميل التطبيق",
    footerRights: "© 2026 Averon. جميع الحقوق محفوظة.",
    footerPolicies: "الشروط | الخصوصية | الاسترداد | خريطة الموقع",
    backToStore: "العودة للمتجر",
    averonVerified: "موثق من Averon",
    sold: "مباع",
    productDescription: "{title} بجودة موثوقة وحماية مشتري Averon.",
    delivery: "التوصيل",
    freeDeliveryAvailable: "توصيل مجاني متاح",
    deliveryInfo: "التوصيل المتوقع بحلول {date}. الدفع عند الاستلام والمحفظة والبطاقة مدعومة.",
    quantity: "الكمية",
    addToCart: "اضف الى السلة",
    buyNow: "اشتر الان",
    bestValue: "افضل قيمة"
  },
  ZH: {
    footerIntro: "Averon 是满足日常购物需求的一站式在线市场。",
    customerService: "客户服务",
    helpCenter: "帮助中心",
    trackOrder: "订单追踪",
    returnsRefunds: "退货与退款",
    shippingInfo: "配送信息",
    contactUs: "联系我们",
    aboutAveron: "关于 Averon",
    aboutUs: "关于我们",
    careers: "招聘",
    averonPrime: "Averon Prime",
    pressMedia: "新闻媒体",
    averonBlog: "Averon 博客",
    makeMoney: "与我们合作",
    sellOnAveron: "在 Averon 销售",
    becomeAffiliate: "成为联盟伙伴",
    advertiseProducts: "推广你的产品",
    averonVendors: "Averon 商家",
    paymentMethods: "支付方式",
    downloadApp: "下载应用",
    footerRights: "© 2026 Averon. 保留所有权利。",
    footerPolicies: "条款 | 隐私 | 退款政策 | 网站地图",
    backToStore: "返回店铺",
    averonVerified: "Averon 认证",
    sold: "已售",
    productDescription: "{title} 提供可靠品质和 Averon 买家保障。",
    delivery: "配送",
    freeDeliveryAvailable: "可享免费配送",
    deliveryInfo: "预计 {date} 前送达。支持货到付款、钱包和银行卡。",
    quantity: "数量",
    addToCart: "加入购物车",
    buyNow: "立即购买",
    bestValue: "超值"
  }
};

Object.entries(extendedUiCopy).forEach(([code, copy]) => {
  uiCopy[code] = { ...(uiCopy[code] || {}), ...copy };
});

Object.assign(uiCopy.EN, {
  browserLanguage: "Browser language",
  recommended: "Recommended",
  allCategoriesTitle: "All Categories",
  browseFeatured: "Browse featured selections",
  itemsAvailable: "{count} items available. Click any product to view details.",
  listingItemsAvailable: "{meta} {count} items available.",
  searchFound: "{count} items found on Averon. Click any product to view details.",
  saveAmount: "Save {amount}",
  topSellingOnAveron: "Top selling on Averon",
  decreaseQuantity: "Decrease quantity",
  increaseQuantity: "Increase quantity",
  promoBeautyBadge: "Beauty picks",
  promoBeautyTitle: "Beauty Glow Deals",
  promoBeautyText: "Skincare, makeup and fragrances for daily routines.",
  promoOriginal: "Original",
  promoGiftReady: "Gift ready",
  shopBeauty: "Shop Beauty",
  promoWeekendBadge: "Weekend sale",
  promoSportsTitle: "Sports Weekend",
  promoSportsText: "Running shoes, outdoor gear and active essentials.",
  promoRunning: "Running",
  promoOutdoor: "Outdoor",
  shopSports: "Shop Sports",
  promoFastDelivery: "Fast delivery",
  promoGroceryTitle: "Quick Grocery",
  promoGroceryText: "Pantry staples, snacks and pet supplies delivered fast.",
  promoFreshPicks: "Fresh picks",
  promoPetCare: "Pet care",
  shopGrocery: "Shop Grocery",
  promoCarCare: "Car care",
  promoAutoTitle: "Auto Accessories",
  promoAutoText: "Dash cameras, tools and car care picks on deal.",
  promoSafety: "Safety",
  promoTools: "Tools",
  shopAuto: "Shop Auto",
  officialPartners: "Official Partners",
  brandSectionText: "Original stores and verified marketplace brands",
  serviceOriginal: "100% Original",
  serviceOriginalText: "Sourced from trusted brands",
  serviceDeliveryText: "On orders above PKR 2,000",
  serviceReturnsText: "Hassle free return policy",
  servicePaymentText: "100% secure payments",
  serviceSupport: "24/7 Customer Support",
  serviceSupportText: "We are here to help you",
  newsletterBadge: "Official updates",
  newsletterTitle: "Averon Deals",
  newsletterText: "Members-only vouchers and new arrivals.",
  emailAddress: "Email address",
  subscribe: "Subscribe",
  limitedDeals: "Limited Deals",
  limitedTime: "Limited Time",
  endingSoon: "Ending Soon",
  offerClosesIn: "Offer closes in",
  saveToday: "Save {amount} today",
  verifiedDeal: "Averon verified deal",
  viewDeal: "View Deal",
  viewEndingDeals: "View all ending soon deals",
  browseCategories: "Browse Categories",
  browseCategoriesText: "Shop across every department",
  exploreDeals: "Explore Deals",
  welcomeRewards: "Welcome Rewards"
});

Object.assign(uiCopy.UR, {
  limitedDeals: "Limited Deals",
  limitedTime: "Mehdood Waqt",
  endingSoon: "Khatam hone wali deal",
  offerClosesIn: "Baqi waqt",
  saveToday: "Aaj {amount} bachayein",
  verifiedDeal: "Averon verified deal",
  viewDeal: "Deal dekhein",
  viewEndingDeals: "Khatam hoti deals dekhein",
  browseCategories: "Categories Dekhein",
  browseCategoriesText: "Har department se shopping karein",
  exploreDeals: "Deals dekhein",
  welcomeRewards: "Welcome Rewards",
  freeDelivery: "PKR 2,000 سے زائد آرڈر پر مفت ڈیلیوری",
  returns: "7 دن کی آسان واپسی",
  securePayments: "محفوظ ادائیگی",
  dealsDiscounts: "بہترین سودے اور چھوٹ",
  sell: "ایورون پر فروخت کریں",
  track: "آرڈر ٹریک کریں",
  support: "مدد اور تعاون",
  allCategories: "تمام زمرے",
  searchLabel: "مصنوعات تلاش کریں",
  searchPlaceholder: "مصنوعات، برانڈز اور مزید تلاش کریں...",
  searchIn: "{category} میں تلاش کریں...",
  searchButton: "تلاش کریں",
  preferences: "ترجیحات",
  languageTitle: "زبان",
  changeLanguage: "زبان تبدیل کریں",
  chooseOtherLanguage: "دوسری زبان منتخب کریں",
  selectLanguage: "زبان منتخب کریں",
  currency: "کرنسی",
  shoppingRegion: "خریداری کا علاقہ",
  regionName: "ایورون پاکستان",
  changeCountry: "ملک/علاقہ تبدیل کریں",
  wishlist: "خواہش کی فہرست",
  cart: "ٹوکری",
  hiAli: "ہیلو، علی",
  myAccount: "میرا اکاؤنٹ",
  official: "ایورون تصدیق شدہ",
  todaysDeals: "آج کے سودے",
  flashDeals: "فلیش ڈیلز",
  bestSellers: "سب سے زیادہ فروخت",
  newArrivals: "نئی آمد",
  topBrands: "اعلیٰ برانڈز",
  prime: "ایورون پرائم",
  vouchers: "واؤچرز",
  viewAllCategories: "تمام زمرے دیکھیں",
  vipAccess: "VIP رسائی",
  primeDesc: "ایک پاس میں مفت ڈیلیوری، ابتدائی ڈیلز، ترجیحی سپورٹ اور خصوصی واؤچرز۔",
  freeDeliveryShort: "مفت ڈیلیوری",
  earlyDeals: "ابتدائی ڈیلز",
  primeVouchers: "پرائم واؤچرز",
  joinPrime: "پرائم جوائن کریں ←",
  bestSellingProducts: "سب سے زیادہ فروخت ہونے والی مصنوعات",
  viewAll: "سب دیکھیں",
  moreExplore: "مزید دریافت کریں",
  checkout: "چیک آؤٹ",
  yourCart: "آپ کی ٹوکری",
  fullName: "پورا نام",
  deliveryCity: "ڈیلیوری شہر",
  address: "پتہ",
  total: "کل رقم",
  placeOrder: "آرڈر دیں",
  emptyCart: "آپ کی ٹوکری خالی ہے۔",
  color: "رنگ",
  size: "سائز",
  each: "فی عدد",
  remove: "ہٹائیں",
  noProducts: "کوئی پروڈکٹ نہیں ملی۔ کوئی دوسرا زمرہ یا تلاش آزمائیں۔",
  searchResults: "تلاش کے نتائج",
  results: "نتائج",
  searchMeta: "آپ کی تلاش سے ملتی جلتی مصنوعات۔",
  languageSwitched: "زبان {code} میں تبدیل ہو گئی",
  currencySwitched: "کرنسی {code} میں تبدیل ہو گئی",
  cartAdded: "{title} ({color}) ٹوکری میں شامل ہو گیا",
  namePlaceholder: "عائشہ خان",
  addressPlaceholder: "گھر، گلی، علاقہ",
  footerIntro: "ایورون آپ کی ضرورت کی ہر چیز کے لیے ایک مکمل آن لائن مارکیٹ پلیس ہے۔ بہترین معیار، بہترین قیمتیں، بہترین تجربہ۔",
  customerService: "کسٹمر سروس",
  helpCenter: "مدد مرکز",
  trackOrder: "آرڈر ٹریک کریں",
  returnsRefunds: "واپسی اور ریفنڈ",
  shippingInfo: "شپنگ معلومات",
  contactUs: "ہم سے رابطہ کریں",
  aboutAveron: "ایورون کے بارے میں",
  aboutUs: "ہمارے بارے میں",
  careers: "کیریئرز",
  averonPrime: "ایورون پرائم",
  pressMedia: "پریس اور میڈیا",
  averonBlog: "ایورون بلاگ",
  makeMoney: "ہمارے ساتھ کمائیں",
  sellOnAveron: "ایورون پر فروخت کریں",
  becomeAffiliate: "افیلیٹ بنیں",
  advertiseProducts: "اپنی مصنوعات کی تشہیر کریں",
  averonVendors: "ایورون وینڈرز",
  paymentMethods: "ادائیگی کے طریقے",
  downloadApp: "ایپ ڈاؤن لوڈ کریں",
  footerRights: "© 2026 ایورون۔ جملہ حقوق محفوظ ہیں۔",
  footerPolicies: "شرائط و ضوابط | رازداری پالیسی | ریفنڈ پالیسی | سائٹ میپ",
  backToStore: "اسٹور پر واپس جائیں",
  averonVerified: "ایورون تصدیق شدہ",
  sold: "فروخت",
  productDescription: "{title} تصدیق شدہ معیار، محفوظ ادائیگی اور ایورون خریدار تحفظ کے ساتھ دستیاب ہے۔",
  delivery: "ڈیلیوری",
  freeDeliveryAvailable: "مفت ڈیلیوری دستیاب ہے",
  deliveryInfo: "{date} تک متوقع ڈیلیوری۔ کیش آن ڈیلیوری، والٹ اور کارڈ سپورٹ دستیاب ہے۔",
  quantity: "مقدار",
  addToCart: "ٹوکری میں شامل کریں",
  buyNow: "ابھی خریدیں",
  bestValue: "بہترین قیمت",
  browserLanguage: "براؤزر کی زبان",
  recommended: "تجویز کردہ",
  allCategoriesTitle: "تمام زمرے",
  browseFeatured: "نمایاں انتخاب دیکھیں",
  itemsAvailable: "{count} آئٹمز دستیاب ہیں۔ کسی بھی پروڈکٹ پر کلک کر کے تفصیل دیکھیں۔",
  listingItemsAvailable: "{meta} {count} آئٹمز دستیاب ہیں۔",
  searchFound: "{count} آئٹمز ایورون پر ملے۔ کسی بھی پروڈکٹ پر کلک کر کے تفصیل دیکھیں۔",
  saveAmount: "{amount} بچائیں",
  topSellingOnAveron: "ایورون پر مقبول فروخت",
  decreaseQuantity: "مقدار کم کریں",
  increaseQuantity: "مقدار بڑھائیں",
  promoBeautyBadge: "بیوٹی انتخاب",
  promoBeautyTitle: "بیوٹی گلو ڈیلز",
  promoBeautyText: "روزمرہ روٹین کے لیے اسکن کیئر، میک اپ اور خوشبوئیں۔",
  promoOriginal: "اصل",
  promoGiftReady: "تحفے کے لیے تیار",
  shopBeauty: "بیوٹی خریدیں",
  promoWeekendBadge: "ویک اینڈ سیل",
  promoSportsTitle: "اسپورٹس ویک اینڈ",
  promoSportsText: "رننگ شوز، آؤٹ ڈور گیئر اور ایکٹو ضروریات۔",
  promoRunning: "رننگ",
  promoOutdoor: "آؤٹ ڈور",
  shopSports: "اسپورٹس خریدیں",
  promoFastDelivery: "تیز ڈیلیوری",
  promoGroceryTitle: "فوری گروسری",
  promoGroceryText: "پینٹری آئٹمز، اسنیکس اور پالتو سامان تیزی سے ڈیلیور۔",
  promoFreshPicks: "تازہ انتخاب",
  promoPetCare: "پالتو نگہداشت",
  shopGrocery: "گروسری خریدیں",
  promoCarCare: "کار کیئر",
  promoAutoTitle: "آٹو اسیسریز",
  promoAutoText: "ڈیش کیمرے، اوزار اور کار کیئر آئٹمز ڈیل پر۔",
  promoSafety: "حفاظت",
  promoTools: "اوزار",
  shopAuto: "آٹو خریدیں",
  officialPartners: "آفیشل پارٹنرز",
  brandSectionText: "اصل اسٹورز اور تصدیق شدہ مارکیٹ پلیس برانڈز",
  serviceOriginal: "100% اصل",
  serviceOriginalText: "قابل اعتماد برانڈز سے حاصل کردہ",
  serviceDeliveryText: "PKR 2,000 سے زائد آرڈرز پر",
  serviceReturnsText: "آسان اور بے فکر واپسی پالیسی",
  servicePaymentText: "100% محفوظ ادائیگیاں",
  serviceSupport: "24/7 کسٹمر سپورٹ",
  serviceSupportText: "ہم آپ کی مدد کے لیے حاضر ہیں",
  newsletterBadge: "آفیشل اپ ڈیٹس",
  newsletterTitle: "ایورون ڈیلز",
  newsletterText: "صرف ممبرز کے واؤچرز اور نئی آمد۔",
  emailAddress: "ای میل ایڈریس",
  subscribe: "سبسکرائب کریں"
});

const localizedPhrases = {
  UR: {
    "All": "تمام",
    "All Categories": "تمام زمرے",
    "Browse featured selections": "نمایاں انتخاب دیکھیں",
    "Recommended": "تجویز کردہ",
    "Automotive": "آٹوموٹو",
    "Baby & Kids": "بچے اور کڈز",
    "Beauty & Personal Care": "خوبصورتی اور ذاتی نگہداشت",
    "Books & Stationery": "کتابیں اور اسٹیشنری",
    "Clothing & Fashion": "لباس اور فیشن",
    "Computers & Gaming": "کمپیوٹرز اور گیمنگ",
    "DIY & Tools": "اوزار اور DIY",
    "Electronics": "الیکٹرانکس",
    "Footwear": "جوتے",
    "Groceries & Pets": "گروسری اور پالتو جانور",
    "Health & Wellness": "صحت اور تندرستی",
    "Home & Kitchen": "گھر اور باورچی خانہ",
    "Industrial Supplies": "صنعتی سامان",
    "Jewellery & Watches": "جیولری اور گھڑیاں",
    "Kitchen Appliances": "کچن اپلائنسز",
    "Luggage & Travel": "لگیج اور سفر",
    "Mobiles & Tablets": "موبائلز اور ٹیبلٹس",
    "New Arrivals": "نئی آمد",
    "Office & Stationery": "آفس اور اسٹیشنری",
    "Perfumes & Fragrances": "پرفیومز اور خوشبوئیں",
    "Quick Commerce": "فوری کامرس",
    "Ready to Wear": "ریڈی ٹو ویئر",
    "Sports & Outdoors": "کھیل اور آؤٹ ڈور",
    "Toys & Games": "کھلونے اور گیمز",
    "Used & Refurbished": "استعمال شدہ اور ریفربشڈ",
    "Vouchers & Services": "واؤچرز اور سروسز",
    "Women Fashion": "خواتین فیشن",
    "Xpress Delivery": "ایکسپریس ڈیلیوری",
    "Yard & Garden": "لان اور باغ",
    "Zonal Deals": "علاقائی ڈیلز",
    "Appliances": "اپلائنسز",
    "Women's Clothing": "خواتین کا لباس",
    "Men's Clothing": "مردوں کا لباس",
    "Furniture": "فرنیچر",
    "Beauty & Health": "خوبصورتی اور صحت",
    "Shoes": "جوتے",
    "Hair Extensions & Wigs": "ہیئر ایکسٹینشنز اور وگز",
    "Pet Supplies": "پالتو جانوروں کا سامان",
    "Cell Phones & Accessories": "موبائل فونز اور اسیسریز",
    "Jewelry & Accessories": "جیولری اور اسیسریز",
    "Up to 30% Off": "30% تک رعایت",
    "Up to 35% Off": "35% تک رعایت",
    "Up to 40% Off": "40% تک رعایت",
    "Up to 45% Off": "45% تک رعایت",
    "Up to 50% Off": "50% تک رعایت",
    "Up to 55% Off": "55% تک رعایت",
    "Up to 60% Off": "60% تک رعایت",
    "Up to 65% Off": "65% تک رعایت",
    "Up to 70% Off": "70% تک رعایت",
    "Fresh Picks": "تازہ انتخاب",
    "Fast Delivery": "تیز ڈیلیوری",
    "Certified Deals": "تصدیق شدہ ڈیلز",
    "Exclusive Offers": "خصوصی آفرز",
    "Same Day Picks": "اسی دن کا انتخاب",
    "Local Offers": "مقامی آفرز",
    "Mega": "میگا",
    "Tech": "ٹیک",
    "Fashion": "فیشن",
    "Home": "گھر",
    "Beauty": "بیوٹی",
    "Sports": "اسپورٹس",
    "Summer Sale Is Live!": "سمر سیل شروع ہو گئی!",
    "Gadgets Week": "گیجٹس ویک",
    "New Season Fits": "نئے سیزن کے ملبوسات",
    "Home Essentials": "گھر کی ضروریات",
    "Glow Deals": "گلو ڈیلز",
    "Active Gear Sale": "ایکٹو گیئر سیل",
    "Up to 70% OFF on top brands": "اعلیٰ برانڈز پر 70% تک رعایت",
    "Free delivery on orders above PKR 2,000": "PKR 2,000 سے زائد آرڈر پر مفت ڈیلیوری",
    "Smart watches, earbuds and laptops on deal": "اسمارٹ واچز، ایئربڈز اور لیپ ٹاپس ڈیل پر",
    "Save big on official electronics": "آفیشل الیکٹرانکس پر بڑی بچت",
    "Men's and women's fashion up to 65% off": "مرد و خواتین فیشن پر 65% تک رعایت",
    "Fresh styles with Averon buyer protection": "ایورون خریدار تحفظ کے ساتھ نئے اسٹائلز",
    "Upgrade kitchen, furniture and appliances": "کچن، فرنیچر اور اپلائنسز اپ گریڈ کریں",
    "Best quality, best prices, fast delivery": "بہترین معیار، بہترین قیمتیں، تیز ڈیلیوری",
    "Skincare, perfumes and grooming picks": "اسکن کیئر، پرفیومز اور گرومنگ انتخاب",
    "Original products from trusted sellers": "قابل اعتماد سیلرز کی اصل مصنوعات",
    "Shoes, fitness gear and outdoor essentials": "جوتے، فٹنس گیئر اور آؤٹ ڈور ضروریات",
    "Extra vouchers on selected sports picks": "منتخب اسپورٹس آئٹمز پر اضافی واؤچرز",
    "Shop Now": "ابھی خریدیں",
    "Explore Tech": "ٹیک دیکھیں",
    "Shop Fashion": "فیشن خریدیں",
    "Shop Home": "گھر کی خریداری کریں",
    "Shop Beauty": "بیوٹی خریدیں",
    "Shop Sports": "اسپورٹس خریدیں",
    "Official Store Picks": "آفیشل اسٹور انتخاب",
    "Today's Deal Picks": "آج کی منتخب ڈیلز",
    "Flash Sale": "فلیش سیل",
    "Best Selling Products": "سب سے زیادہ فروخت ہونے والی مصنوعات",
    "Averon Assured": "ایورون تصدیق شدہ",
    "Today's Deals": "آج کے سودے",
    "Best Sellers": "سب سے زیادہ فروخت",
    "Verified marketplace products from trusted sellers.": "قابل اعتماد سیلرز کی تصدیق شدہ مارکیٹ پلیس مصنوعات۔",
    "Fresh offers and limited-time marketplace deals.": "تازہ آفرز اور محدود وقت کی مارکیٹ پلیس ڈیلز۔",
    "Hot discounts with limited-time prices.": "محدود وقت کی قیمتوں کے ساتھ زبردست رعایتیں۔",
    "Popular products customers are buying now.": "وہ مقبول مصنوعات جو صارفین ابھی خرید رہے ہیں۔",
    "Latest products added to the Averon marketplace.": "ایورون مارکیٹ پلیس میں شامل تازہ ترین مصنوعات۔",
    "T-Shirts & Tank Tops": "ٹی شرٹس اور ٹینک ٹاپس",
    "Casual & Cargo Pants": "کیژول اور کارگو پینٹس",
    "Polo Shirts": "پولو شرٹس",
    "Casual Shorts": "کیژول شارٹس",
    "Sweatpants & Joggers": "سوئٹ پینٹس اور جوگرز",
    "Shirts": "شرٹس",
    "Suits & Separates": "سوٹس اور سیپریٹس",
    "Underwear": "انڈر ویئر",
    "Jeans": "جینز",
    "Hoodies & Sweatshirts": "ہوڈیز اور سویٹ شرٹس",
    "Pants & Jeans": "پینٹس اور جینز",
    "Underwear, Socks & Loungewear": "انڈر ویئر، جرابیں اور لاؤنج ویئر",
    "Shorts": "شارٹس",
    "Tops": "ٹاپس",
    "Suits & Tailoring": "سوٹس اور ٹیلرنگ",
    "Coats & Jackets": "کوٹس اور جیکٹس",
    "Other Apparel": "دیگر ملبوسات",
    "Sweaters & Vests": "سویٹرز اور ویسٹس",
    "Dresses": "ڈریسز",
    "Women's Tops": "خواتین ٹاپس",
    "Handbags": "ہینڈ بیگز",
    "Heels": "ہیلز",
    "Jewelry Sets": "جیولری سیٹس",
    "Beauty Picks": "بیوٹی انتخاب",
    "Smart Watches": "اسمارٹ واچز",
    "Wireless Earbuds": "وائرلیس ایئربڈز",
    "Laptops": "لیپ ٹاپس",
    "Gaming Consoles": "گیمنگ کنسولز",
    "Cameras": "کیمرے",
    "Bluetooth Speakers": "بلوٹوتھ اسپیکرز",
    "Mobiles & Tablets": "موبائلز اور ٹیبلٹس",
    "Computers": "کمپیوٹرز",
    "Audio": "آڈیو",
    "Gaming": "گیمنگ",
    "Smartphones": "اسمارٹ فونز",
    "Tablets": "ٹیبلٹس",
    "Phone Cases": "فون کیسز",
    "Chargers": "چارجرز",
    "Power Banks": "پاور بینکس",
    "Screen Protectors": "اسکرین پروٹیکٹرز",
    "Car Care": "کار کیئر",
    "Car Accessories": "کار اسیسریز",
    "Motor Oil": "موٹر آئل",
    "Bike Parts": "بائیک پارٹس",
    "Car Tools": "کار ٹولز",
    "Tyres": "ٹائرز",
    "Air Fryers": "ایئر فرائرز",
    "Blenders": "بلینڈرز",
    "Coffee Makers": "کافی میکرز",
    "Electric Kettles": "الیکٹرک کیٹلز",
    "Vacuum Cleaners": "ویکیوم کلینرز",
    "Irons": "استری",
    "Building Blocks": "بلڈنگ بلاکس",
    "Plush Toys": "پلش کھلونے",
    "Board Games": "بورڈ گیمز",
    "Remote Control": "ریموٹ کنٹرول",
    "Learning Toys": "تعلیمی کھلونے",
    "Outdoor Games": "آؤٹ ڈور گیمز",
    "Sofas": "صوفے",
    "Chairs": "کرسیاں",
    "Tables": "میزیں",
    "Beds": "بستر",
    "Storage": "اسٹوریج",
    "Lighting": "لائٹنگ",
    "Skincare": "اسکن کیئر",
    "Makeup": "میک اپ",
    "Perfumes": "پرفیومز",
    "Hair Care": "ہیئر کیئر",
    "Wellness": "ویلنیس",
    "Grooming": "گرومنگ",
    "Sneakers": "اسنیکرز",
    "Sandals": "سینڈلز",
    "Boots": "بوٹس",
    "Loafers": "لوفرز",
    "Sports Shoes": "اسپورٹس شوز",
    "Hair Extensions": "ہیئر ایکسٹینشنز",
    "Wigs": "وگز",
    "Hair Dryers": "ہیئر ڈرائرز",
    "Hair Oils": "ہیئر آئلز",
    "Pet Food": "پالتو خوراک",
    "Cat Supplies": "بلیوں کا سامان",
    "Dog Beds": "کتوں کے بستر",
    "Pet Toys": "پالتو کھلونے",
    "Watches": "گھڑیاں",
    "Rings": "انگوٹھیاں",
    "Necklaces": "ہار",
    "Earrings": "بالیاں",
    "Bracelets": "بریسلیٹس",
    "Averon Picks": "ایورون انتخاب",
    "Official Stores": "آفیشل اسٹورز",
    "Top Rated": "اعلیٰ ریٹنگ",
    "Special Offers": "خصوصی آفرز",
    "Apple Watch Series 8": "ایپل واچ سیریز 8",
    "Wireless Earbuds": "وائرلیس ایئربڈز",
    "Laptop Backpack": "لیپ ٹاپ بیگ",
    "Nike Air Max": "نائکی ایئر میکس",
    "Men Casual Shirt": "مردانہ کیژول شرٹ",
    "Women Handbag": "خواتین ہینڈ بیگ",
    "Active Noise Cancelling Headphones": "ایکٹو نوائس کینسلنگ ہیڈفونز",
    "RGB Gaming Headset": "RGB گیمنگ ہیڈسیٹ",
    "Studio Monitor Headphones": "اسٹوڈیو مانیٹر ہیڈفونز",
    "Bluetooth Neckband Headphones": "بلوٹوتھ نیک بینڈ ہیڈفونز",
    "Kids Safe Volume Headphones": "بچوں کے محفوظ والیوم ہیڈفونز",
    "Android Smartphone 128GB": "اینڈرائیڈ اسمارٹ فون 128GB",
    "Men Running Shoes": "مردانہ رننگ شوز",
    "Digital Air Fryer 5L": "ڈیجیٹل ایئر فرائر 5L",
    "Makeup Brush Set": "میک اپ برش سیٹ",
    "Grocery Essentials Basket": "گروسری ضروریات باسکٹ",
    "Office Notebook Pack": "آفس نوٹ بک پیک",
    "Sports Training Ball": "اسپورٹس ٹریننگ بال",
    "Professional Football": "پروفیشنل فٹبال",
    "Indoor Basketball": "انڈور باسکٹ بال",
    "Tennis Ball Pack": "ٹینس بال پیک",
    "iPhone 15 Pro Max": "آئی فون 15 پرو میکس",
    "Dior Sauvage Perfume": "ڈیور سوواج پرفیوم",
    "Fossil Men's Watch": "فوسل مردانہ گھڑی",
    "Premium Handbag": "پریمیم ہینڈ بیگ",
    "Sony PlayStation 5": "سونی پلے اسٹیشن 5",
    "HP Pavilion Laptop": "HP پویلین لیپ ٹاپ",
    "Sony Wireless Headphones": "سونی وائرلیس ہیڈفونز",
    "JBL Bass Bluetooth Headphones": "JBL بیس بلوٹوتھ ہیڈفونز",
    "MacBook Air M3": "میک بک ایئر M3",
    "Samsung Galaxy A55": "سام سنگ گلیکسی A55",
    "Adidas Running Shoes": "ایڈیڈاس رننگ شوز",
    "Kitchen Blender Pro": "کچن بلینڈر پرو",
    "Skincare Glow Bundle": "اسکن کیئر گلو بنڈل",
    "Ergonomic Office Chair": "ایرگونومک آفس چیئر",
    "Baby Learning Toys Set": "بچوں کا لرننگ ٹوائز سیٹ",
    "Car Dash Camera": "کار ڈیش کیمرہ",
    "Gold Plated Earrings": "گولڈ پلیٹڈ بالیاں",
    "Leather Travel Bag": "لیدر ٹریول بیگ",
    "Bestseller": "سب سے زیادہ فروخت",
    "Top brand": "اعلیٰ برانڈ",
    "Official store": "آفیشل اسٹور",
    "Original": "اصل",
    "New": "نیا",
    "Top selling on Averon": "ایورون پر مقبول فروخت",
    "Black": "سیاہ",
    "White": "سفید",
    "Blue": "نیلا",
    "Grey": "سرمئی",
    "Silver": "سلور",
    "Midnight Black": "مڈنائٹ بلیک",
    "Ocean Blue": "اوشن بلیو",
    "Pearl White": "پرل وائٹ",
    "Crimson Red": "کرمسن ریڈ",
    "Standard": "اسٹینڈرڈ",
    "Bundle": "بنڈل",
    "One Size": "ایک سائز",
    "Adjustable": "ایڈجسٹ ایبل",
    "Gift Set": "گفٹ سیٹ",
    "Small": "چھوٹا",
    "Medium": "درمیانہ",
    "Large": "بڑا"
  }
};

const sharedPhraseKeys = {
  categories: [
    "All", "All Categories", "Automotive", "Baby & Kids", "Beauty & Personal Care", "Books & Stationery",
    "Clothing & Fashion", "Computers & Gaming", "DIY & Tools", "Electronics", "Footwear", "Groceries & Pets",
    "Health & Wellness", "Home & Kitchen", "Industrial Supplies", "Jewellery & Watches", "Kitchen Appliances",
    "Luggage & Travel", "Mobiles & Tablets", "New Arrivals", "Office & Stationery", "Perfumes & Fragrances",
    "Quick Commerce", "Ready to Wear", "Sports & Outdoors", "Toys & Games", "Women Fashion", "Appliances",
    "Women's Clothing", "Men's Clothing", "Furniture", "Beauty & Health", "Shoes", "Pet Supplies"
  ],
  hero: [
    "Mega", "Tech", "Fashion", "Home", "Beauty", "Sports", "Summer Sale Is Live!", "Gadgets Week",
    "New Season Fits", "Home Essentials", "Glow Deals", "Active Gear Sale", "Shop Now", "Explore Tech",
    "Shop Fashion", "Shop Home", "Shop Beauty", "Shop Sports"
  ],
  products: [
    "Apple Watch Series 8", "Wireless Earbuds", "Laptop Backpack", "Nike Air Max", "Men Casual Shirt",
    "Women Handbag", "Active Noise Cancelling Headphones", "RGB Gaming Headset", "Studio Monitor Headphones",
    "Bluetooth Neckband Headphones", "Kids Safe Volume Headphones", "Android Smartphone 128GB", "Men Running Shoes",
    "Digital Air Fryer 5L", "Makeup Brush Set", "Grocery Essentials Basket", "Office Notebook Pack",
    "Sports Training Ball", "Professional Football", "Indoor Basketball", "Tennis Ball Pack", "iPhone 15 Pro Max",
    "Dior Sauvage Perfume", "Fossil Men's Watch", "Premium Handbag", "Sony PlayStation 5", "HP Pavilion Laptop",
    "Sony Wireless Headphones", "JBL Bass Bluetooth Headphones", "MacBook Air M3", "Samsung Galaxy A55",
    "Adidas Running Shoes", "Kitchen Blender Pro", "Skincare Glow Bundle", "Ergonomic Office Chair",
    "Baby Learning Toys Set", "Car Dash Camera", "Gold Plated Earrings", "Leather Travel Bag"
  ]
};

const compactPhraseTranslations = {
  TR: {
    "All": "Tumu", "All Categories": "Tum Kategoriler", "Automotive": "Otomotiv", "Baby & Kids": "Bebek ve Cocuk",
    "Beauty & Personal Care": "Guzellik ve Kisisel Bakim", "Books & Stationery": "Kitap ve Kirtasiye",
    "Clothing & Fashion": "Giyim ve Moda", "Computers & Gaming": "Bilgisayar ve Oyun", "DIY & Tools": "Aletler",
    "Electronics": "Elektronik", "Footwear": "Ayakkabi", "Groceries & Pets": "Market ve Evcil Hayvanlar",
    "Health & Wellness": "Saglik ve Wellness", "Home & Kitchen": "Ev ve Mutfak", "Industrial Supplies": "Endustriyel Urunler",
    "Jewellery & Watches": "Taki ve Saat", "Kitchen Appliances": "Mutfak Aletleri", "Luggage & Travel": "Valiz ve Seyahat",
    "Mobiles & Tablets": "Telefon ve Tablet", "New Arrivals": "Yeni Gelenler", "Office & Stationery": "Ofis ve Kirtasiye",
    "Perfumes & Fragrances": "Parfumler", "Quick Commerce": "Hizli Teslimat", "Ready to Wear": "Hazir Giyim",
    "Sports & Outdoors": "Spor ve Outdoor", "Toys & Games": "Oyuncak ve Oyun", "Women Fashion": "Kadin Modasi",
    "Appliances": "Ev Aletleri", "Women's Clothing": "Kadin Giyim", "Men's Clothing": "Erkek Giyim", "Furniture": "Mobilya",
    "Beauty & Health": "Guzellik ve Saglik", "Shoes": "Ayakkabilar", "Pet Supplies": "Evcil Hayvan Urunleri",
    "Summer Sale Is Live!": "Yaz Indirimi Basladi!", "Gadgets Week": "Teknoloji Haftasi", "New Season Fits": "Yeni Sezon Stilleri",
    "Home Essentials": "Ev Ihtiyaclari", "Glow Deals": "Guzellik Firsatlari", "Active Gear Sale": "Spor Ekipman Indirimi",
    "Shop Now": "Simdi Al", "Explore Tech": "Teknolojiyi Kesfet", "Shop Fashion": "Moda Alisverisi", "Shop Home": "Ev Urunleri Al",
    "Shop Beauty": "Guzellik Al", "Shop Sports": "Spor Al"
  },
  ES: {
    "All": "Todo", "All Categories": "Todas las categorias", "Automotive": "Automotriz", "Baby & Kids": "Bebe y ninos",
    "Beauty & Personal Care": "Belleza y cuidado personal", "Books & Stationery": "Libros y papeleria",
    "Clothing & Fashion": "Ropa y moda", "Computers & Gaming": "Computadoras y gaming", "DIY & Tools": "Herramientas",
    "Electronics": "Electronica", "Footwear": "Calzado", "Groceries & Pets": "Supermercado y mascotas",
    "Health & Wellness": "Salud y bienestar", "Home & Kitchen": "Hogar y cocina", "Jewellery & Watches": "Joyeria y relojes",
    "Kitchen Appliances": "Electrodomesticos", "Mobiles & Tablets": "Moviles y tablets", "New Arrivals": "Novedades",
    "Sports & Outdoors": "Deportes y exterior", "Toys & Games": "Juguetes y juegos", "Women Fashion": "Moda mujer",
    "Men's Clothing": "Ropa hombre", "Women's Clothing": "Ropa mujer", "Furniture": "Muebles", "Shoes": "Zapatos",
    "Summer Sale Is Live!": "La venta de verano esta activa!", "Gadgets Week": "Semana de gadgets", "New Season Fits": "Estilos de nueva temporada",
    "Home Essentials": "Esenciales del hogar", "Glow Deals": "Ofertas de belleza", "Active Gear Sale": "Oferta de equipo activo",
    "Shop Now": "Comprar ahora", "Explore Tech": "Explorar tecnologia", "Shop Fashion": "Comprar moda", "Shop Home": "Comprar hogar",
    "Shop Beauty": "Comprar belleza", "Shop Sports": "Comprar deportes"
  },
  FR: {
    "All": "Tout", "All Categories": "Toutes les categories", "Automotive": "Auto", "Baby & Kids": "Bebe et enfants",
    "Beauty & Personal Care": "Beaute et soins", "Books & Stationery": "Livres et papeterie", "Clothing & Fashion": "Vetements et mode",
    "Computers & Gaming": "Ordinateurs et gaming", "DIY & Tools": "Outils", "Electronics": "Electronique", "Footwear": "Chaussures",
    "Groceries & Pets": "Epicerie et animaux", "Health & Wellness": "Sante et bien-etre", "Home & Kitchen": "Maison et cuisine",
    "Jewellery & Watches": "Bijoux et montres", "Kitchen Appliances": "Appareils de cuisine", "Mobiles & Tablets": "Mobiles et tablettes",
    "New Arrivals": "Nouveautes", "Sports & Outdoors": "Sports et plein air", "Toys & Games": "Jouets et jeux",
    "Women Fashion": "Mode femme", "Men's Clothing": "Vetements homme", "Women's Clothing": "Vetements femme", "Furniture": "Meubles",
    "Shoes": "Chaussures", "Summer Sale Is Live!": "La vente d'ete est en direct!", "Gadgets Week": "Semaine gadgets",
    "New Season Fits": "Looks nouvelle saison", "Home Essentials": "Essentiels maison", "Glow Deals": "Offres beaute",
    "Active Gear Sale": "Promo equipement actif", "Shop Now": "Acheter", "Explore Tech": "Explorer la tech",
    "Shop Fashion": "Acheter mode", "Shop Home": "Acheter maison", "Shop Beauty": "Acheter beaute", "Shop Sports": "Acheter sport"
  },
  DE: {
    "All": "Alle", "All Categories": "Alle Kategorien", "Automotive": "Auto", "Baby & Kids": "Baby und Kinder",
    "Beauty & Personal Care": "Beauty und Pflege", "Books & Stationery": "Bucher und Schreibwaren", "Clothing & Fashion": "Kleidung und Mode",
    "Computers & Gaming": "Computer und Gaming", "DIY & Tools": "Werkzeuge", "Electronics": "Elektronik", "Footwear": "Schuhe",
    "Groceries & Pets": "Lebensmittel und Haustiere", "Health & Wellness": "Gesundheit", "Home & Kitchen": "Haus und Kuche",
    "Jewellery & Watches": "Schmuck und Uhren", "Kitchen Appliances": "Kuchengerate", "Mobiles & Tablets": "Handys und Tablets",
    "New Arrivals": "Neuheiten", "Sports & Outdoors": "Sport und Outdoor", "Toys & Games": "Spielzeug und Spiele",
    "Women Fashion": "Damenmode", "Men's Clothing": "Herrenmode", "Women's Clothing": "Damenkleidung", "Furniture": "Mobel",
    "Shoes": "Schuhe", "Summer Sale Is Live!": "Sommer Sale ist live!", "Gadgets Week": "Gadget Woche",
    "New Season Fits": "Neue Saison Looks", "Home Essentials": "Haushaltsbedarf", "Glow Deals": "Beauty Deals",
    "Active Gear Sale": "Sportausrustung Sale", "Shop Now": "Jetzt kaufen", "Explore Tech": "Tech entdecken",
    "Shop Fashion": "Mode kaufen", "Shop Home": "Haus kaufen", "Shop Beauty": "Beauty kaufen", "Shop Sports": "Sport kaufen"
  },
  PT: {
    "All": "Tudo", "All Categories": "Todas as categorias", "Automotive": "Automotivo", "Baby & Kids": "Bebe e criancas",
    "Beauty & Personal Care": "Beleza e cuidados", "Books & Stationery": "Livros e papelaria", "Clothing & Fashion": "Roupas e moda",
    "Computers & Gaming": "Computadores e games", "DIY & Tools": "Ferramentas", "Electronics": "Eletronicos", "Footwear": "Calcados",
    "Groceries & Pets": "Mercado e pets", "Health & Wellness": "Saude e bem-estar", "Home & Kitchen": "Casa e cozinha",
    "Jewellery & Watches": "Joias e relogios", "Kitchen Appliances": "Eletrodomesticos", "Mobiles & Tablets": "Celulares e tablets",
    "New Arrivals": "Novidades", "Sports & Outdoors": "Esportes e outdoor", "Toys & Games": "Brinquedos e jogos",
    "Women Fashion": "Moda feminina", "Men's Clothing": "Roupa masculina", "Women's Clothing": "Roupa feminina", "Furniture": "Moveis",
    "Shoes": "Sapatos", "Summer Sale Is Live!": "Promocao de verao no ar!", "Gadgets Week": "Semana de gadgets",
    "New Season Fits": "Looks da nova temporada", "Home Essentials": "Essenciais para casa", "Glow Deals": "Ofertas de beleza",
    "Active Gear Sale": "Oferta de itens esportivos", "Shop Now": "Comprar agora", "Explore Tech": "Explorar tecnologia",
    "Shop Fashion": "Comprar moda", "Shop Home": "Comprar casa", "Shop Beauty": "Comprar beleza", "Shop Sports": "Comprar esportes"
  },
  HI: {
    "All": "सब", "All Categories": "सभी श्रेणियां", "Automotive": "ऑटोमोटिव", "Baby & Kids": "बेबी और किड्स",
    "Beauty & Personal Care": "ब्यूटी और पर्सनल केयर", "Books & Stationery": "किताबें और स्टेशनरी", "Clothing & Fashion": "कपड़े और फैशन",
    "Computers & Gaming": "कंप्यूटर और गेमिंग", "DIY & Tools": "टूल्स", "Electronics": "इलेक्ट्रॉनिक्स", "Footwear": "फुटवियर",
    "Groceries & Pets": "ग्रोसरी और पेट्स", "Health & Wellness": "हेल्थ और वेलनेस", "Home & Kitchen": "होम और किचन",
    "Jewellery & Watches": "ज्वेलरी और वॉचेस", "Kitchen Appliances": "किचन अप्लायंसेज", "Mobiles & Tablets": "मोबाइल और टैबलेट",
    "New Arrivals": "नए प्रोडक्ट", "Sports & Outdoors": "स्पोर्ट्स और आउटडोर", "Toys & Games": "टॉयज और गेम्स",
    "Women Fashion": "वुमन फैशन", "Men's Clothing": "मेन्स क्लोदिंग", "Women's Clothing": "वुमन्स क्लोदिंग", "Furniture": "फर्नीचर",
    "Shoes": "शूज़", "Summer Sale Is Live!": "समर सेल शुरू है!", "Gadgets Week": "गैजेट्स वीक",
    "New Season Fits": "नए सीजन के स्टाइल", "Home Essentials": "होम एसेंशियल्स", "Glow Deals": "ग्लो डील्स",
    "Active Gear Sale": "एक्टिव गियर सेल", "Shop Now": "अभी खरीदें", "Explore Tech": "टेक देखें",
    "Shop Fashion": "फैशन खरीदें", "Shop Home": "होम खरीदें", "Shop Beauty": "ब्यूटी खरीदें", "Shop Sports": "स्पोर्ट्स खरीदें"
  },
  AR: {
    "All": "الكل", "All Categories": "كل الفئات", "Automotive": "السيارات", "Baby & Kids": "الرضع والاطفال",
    "Beauty & Personal Care": "الجمال والعناية", "Books & Stationery": "الكتب والقرطاسية", "Clothing & Fashion": "الملابس والموضة",
    "Computers & Gaming": "الكمبيوتر والالعاب", "DIY & Tools": "الادوات", "Electronics": "الالكترونيات", "Footwear": "الاحذية",
    "Groceries & Pets": "البقالة والحيوانات", "Health & Wellness": "الصحة", "Home & Kitchen": "المنزل والمطبخ",
    "Jewellery & Watches": "المجوهرات والساعات", "Kitchen Appliances": "اجهزة المطبخ", "Mobiles & Tablets": "الجوالات والتابلت",
    "New Arrivals": "وصل حديثا", "Sports & Outdoors": "الرياضة والخارج", "Toys & Games": "الالعاب", "Women Fashion": "موضة النساء",
    "Men's Clothing": "ملابس الرجال", "Women's Clothing": "ملابس النساء", "Furniture": "الاثاث", "Shoes": "الاحذية",
    "Summer Sale Is Live!": "تخفيضات الصيف بدأت!", "Gadgets Week": "اسبوع الاجهزة", "New Season Fits": "ستايلات الموسم الجديد",
    "Home Essentials": "اساسيات المنزل", "Glow Deals": "عروض الجمال", "Active Gear Sale": "عروض المعدات الرياضية",
    "Shop Now": "تسوق الان", "Explore Tech": "استكشف التقنية", "Shop Fashion": "تسوق الموضة", "Shop Home": "تسوق المنزل",
    "Shop Beauty": "تسوق الجمال", "Shop Sports": "تسوق الرياضة"
  },
  ZH: {
    "All": "全部", "All Categories": "所有分类", "Automotive": "汽车用品", "Baby & Kids": "母婴儿童",
    "Beauty & Personal Care": "美妆个护", "Books & Stationery": "图书文具", "Clothing & Fashion": "服饰时尚",
    "Computers & Gaming": "电脑游戏", "DIY & Tools": "工具", "Electronics": "电子产品", "Footwear": "鞋履",
    "Groceries & Pets": "食品宠物", "Health & Wellness": "健康护理", "Home & Kitchen": "家居厨房",
    "Jewellery & Watches": "珠宝手表", "Kitchen Appliances": "厨房电器", "Mobiles & Tablets": "手机平板",
    "New Arrivals": "新品", "Sports & Outdoors": "运动户外", "Toys & Games": "玩具游戏", "Women Fashion": "女装时尚",
    "Men's Clothing": "男装", "Women's Clothing": "女装", "Furniture": "家具", "Shoes": "鞋子",
    "Summer Sale Is Live!": "夏季大促开始!", "Gadgets Week": "数码周", "New Season Fits": "新季穿搭",
    "Home Essentials": "家居必备", "Glow Deals": "美妆优惠", "Active Gear Sale": "运动装备优惠",
    "Shop Now": "立即购买", "Explore Tech": "探索科技", "Shop Fashion": "购买时尚", "Shop Home": "购买家居",
    "Shop Beauty": "购买美妆", "Shop Sports": "购买运动"
  }
};

Object.entries(compactPhraseTranslations).forEach(([code, copy]) => {
  localizedPhrases[code] = { ...(localizedPhrases[code] || {}), ...copy };
});

localizedPhrases.FA = {
  ...(localizedPhrases.UR || {}),
  "All": "همه",
  "All Categories": "همه دسته‌ها",
  "Recommended": "پیشنهادی",
  "Automotive": "خودرو",
  "Baby & Kids": "کودک و نوجوان",
  "Beauty & Personal Care": "زیبایی و مراقبت شخصی",
  "Books & Stationery": "کتاب و لوازم‌التحریر",
  "Clothing & Fashion": "پوشاک و مد",
  "Computers & Gaming": "کامپیوتر و بازی",
  "DIY & Tools": "ابزار",
  "Electronics": "الکترونیک",
  "Footwear": "کفش",
  "Groceries & Pets": "مواد غذایی و حیوانات",
  "Health & Wellness": "سلامت و تندرستی",
  "Home & Kitchen": "خانه و آشپزخانه",
  "Jewellery & Watches": "زیورآلات و ساعت",
  "Kitchen Appliances": "لوازم آشپزخانه",
  "Mobiles & Tablets": "موبایل و تبلت",
  "New Arrivals": "تازه‌ها",
  "Sports & Outdoors": "ورزش و فضای باز",
  "Toys & Games": "اسباب‌بازی و بازی",
  "Women Fashion": "مد زنانه",
  "Men's Clothing": "پوشاک مردانه",
  "Women's Clothing": "پوشاک زنانه",
  "Furniture": "مبلمان",
  "Shoes": "کفش‌ها",
  "Summer Sale Is Live!": "حراج تابستانی شروع شد!",
  "Gadgets Week": "هفته گجت‌ها",
  "New Season Fits": "استایل‌های فصل جدید",
  "Home Essentials": "ضروریات خانه",
  "Glow Deals": "پیشنهادهای زیبایی",
  "Active Gear Sale": "حراج تجهیزات ورزشی",
  "Shop Now": "اکنون خرید کنید",
  "Explore Tech": "تکنولوژی را ببینید",
  "Shop Fashion": "خرید مد",
  "Shop Home": "خرید خانه",
  "Shop Beauty": "خرید زیبایی",
  "Shop Sports": "خرید ورزشی"
};

Object.assign(localizedPhrases.TR, { "Apple Watch Series 8": "Apple Watch Seri 8" });
Object.assign(localizedPhrases.ES, { "Apple Watch Series 8": "Apple Watch Serie 8" });
Object.assign(localizedPhrases.FR, { "Apple Watch Series 8": "Apple Watch Serie 8" });
Object.assign(localizedPhrases.DE, { "Apple Watch Series 8": "Apple Watch Serie 8" });
Object.assign(localizedPhrases.PT, { "Apple Watch Series 8": "Apple Watch Serie 8" });
Object.assign(localizedPhrases.HI, { "Apple Watch Series 8": "ऐप्पल वॉच सीरीज़ 8" });
Object.assign(localizedPhrases.AR, { "Apple Watch Series 8": "ساعة ابل Series 8" });
Object.assign(localizedPhrases.ZH, { "Apple Watch Series 8": "Apple Watch 系列 8" });

const termPhraseTranslations = {
  TR: {
    "Wireless Earbuds": "Kablosuz Kulaklik", "Laptop Backpack": "Laptop Sirt Cantasi", "Men Casual Shirt": "Erkek Casual Gomlek",
    "Women Handbag": "Kadin El Cantasi", "Headphones": "Kulaklik", "Headset": "Kulaklik Seti", "Running Shoes": "Kosucu Ayakkabisi",
    "Air Fryer": "Hava Fritozu", "Makeup Brush Set": "Makyaj Firca Seti", "Grocery Essentials Basket": "Market Temel Sepeti",
    "Office Notebook Pack": "Ofis Defter Paketi", "Sports Training Ball": "Spor Antrenman Topu", "Professional Football": "Profesyonel Futbol Topu",
    "Indoor Basketball": "Salon Basketbol Topu", "Tennis Ball Pack": "Tenis Topu Paketi", "Perfume": "Parfum", "Men's Watch": "Erkek Saati",
    "Premium Handbag": "Premium El Cantasi", "Laptop": "Laptop", "Wireless": "Kablosuz", "Bluetooth": "Bluetooth", "Digital": "Dijital"
  },
  ES: {
    "Wireless Earbuds": "Audifonos inalambricos", "Laptop Backpack": "Mochila para laptop", "Men Casual Shirt": "Camisa casual hombre",
    "Women Handbag": "Bolso de mujer", "Headphones": "Audifonos", "Headset": "Auriculares gamer", "Running Shoes": "Zapatillas running",
    "Air Fryer": "Freidora de aire", "Makeup Brush Set": "Set de brochas", "Grocery Essentials Basket": "Cesta de supermercado",
    "Office Notebook Pack": "Pack de cuadernos", "Sports Training Ball": "Balon de entrenamiento", "Professional Football": "Balon profesional",
    "Indoor Basketball": "Baloncesto indoor", "Tennis Ball Pack": "Pack pelotas de tenis", "Perfume": "Perfume", "Men's Watch": "Reloj hombre",
    "Premium Handbag": "Bolso premium", "Laptop": "Laptop", "Wireless": "Inalambrico", "Bluetooth": "Bluetooth", "Digital": "Digital"
  },
  FR: {
    "Wireless Earbuds": "Ecouteurs sans fil", "Laptop Backpack": "Sac a dos ordinateur", "Men Casual Shirt": "Chemise homme casual",
    "Women Handbag": "Sac a main femme", "Headphones": "Casque audio", "Headset": "Casque gaming", "Running Shoes": "Chaussures running",
    "Air Fryer": "Friteuse a air", "Makeup Brush Set": "Set de pinceaux maquillage", "Grocery Essentials Basket": "Panier epicerie",
    "Office Notebook Pack": "Pack carnets bureau", "Sports Training Ball": "Ballon d'entrainement", "Professional Football": "Ballon pro",
    "Indoor Basketball": "Basket indoor", "Tennis Ball Pack": "Pack balles de tennis", "Perfume": "Parfum", "Men's Watch": "Montre homme",
    "Premium Handbag": "Sac premium", "Laptop": "Ordinateur portable", "Wireless": "Sans fil", "Bluetooth": "Bluetooth", "Digital": "Numerique"
  },
  DE: {
    "Wireless Earbuds": "Kabellose Ohrhorer", "Laptop Backpack": "Laptop Rucksack", "Men Casual Shirt": "Herren Freizeithemd",
    "Women Handbag": "Damen Handtasche", "Headphones": "Kopfhorer", "Headset": "Gaming Headset", "Running Shoes": "Laufschuhe",
    "Air Fryer": "Heissluftfritteuse", "Makeup Brush Set": "Make-up Pinsel Set", "Grocery Essentials Basket": "Lebensmittelkorb",
    "Office Notebook Pack": "Notizbuch Pack", "Sports Training Ball": "Trainingsball", "Professional Football": "Profi Fussball",
    "Indoor Basketball": "Indoor Basketball", "Tennis Ball Pack": "Tennisball Pack", "Perfume": "Parfum", "Men's Watch": "Herrenuhr",
    "Premium Handbag": "Premium Handtasche", "Laptop": "Laptop", "Wireless": "Kabellos", "Bluetooth": "Bluetooth", "Digital": "Digital"
  },
  PT: {
    "Wireless Earbuds": "Fones sem fio", "Laptop Backpack": "Mochila para laptop", "Men Casual Shirt": "Camisa casual masculina",
    "Women Handbag": "Bolsa feminina", "Headphones": "Fones", "Headset": "Headset gamer", "Running Shoes": "Tenis de corrida",
    "Air Fryer": "Air Fryer", "Makeup Brush Set": "Kit de pinceis", "Grocery Essentials Basket": "Cesta de mercado",
    "Office Notebook Pack": "Pacote de cadernos", "Sports Training Ball": "Bola de treino", "Professional Football": "Bola profissional",
    "Indoor Basketball": "Basquete indoor", "Tennis Ball Pack": "Pacote bolas de tenis", "Perfume": "Perfume", "Men's Watch": "Relogio masculino",
    "Premium Handbag": "Bolsa premium", "Laptop": "Laptop", "Wireless": "Sem fio", "Bluetooth": "Bluetooth", "Digital": "Digital"
  },
  HI: {
    "Wireless Earbuds": "वायरलेस ईयरबड्स", "Laptop Backpack": "लैपटॉप बैकपैक", "Men Casual Shirt": "पुरुष कैजुअल शर्ट",
    "Women Handbag": "महिला हैंडबैग", "Headphones": "हेडफोन", "Headset": "हेडसेट", "Running Shoes": "रनिंग शूज़",
    "Air Fryer": "एयर फ्रायर", "Makeup Brush Set": "मेकअप ब्रश सेट", "Grocery Essentials Basket": "ग्रोसरी बास्केट",
    "Office Notebook Pack": "ऑफिस नोटबुक पैक", "Sports Training Ball": "स्पोर्ट्स ट्रेनिंग बॉल", "Professional Football": "प्रोफेशनल फुटबॉल",
    "Indoor Basketball": "इंडोर बास्केटबॉल", "Tennis Ball Pack": "टेनिस बॉल पैक", "Perfume": "परफ्यूम", "Men's Watch": "पुरुष घड़ी",
    "Premium Handbag": "प्रीमियम हैंडबैग", "Laptop": "लैपटॉप", "Wireless": "वायरलेस", "Bluetooth": "ब्लूटूथ", "Digital": "डिजिटल"
  },
  AR: {
    "Wireless Earbuds": "سماعات لاسلكية", "Laptop Backpack": "حقيبة لابتوب", "Men Casual Shirt": "قميص رجالي كاجوال",
    "Women Handbag": "حقيبة نسائية", "Headphones": "سماعات", "Headset": "سماعة العاب", "Running Shoes": "احذية جري",
    "Air Fryer": "قلاية هوائية", "Makeup Brush Set": "طقم فرش مكياج", "Grocery Essentials Basket": "سلة بقالة",
    "Office Notebook Pack": "دفاتر مكتبية", "Sports Training Ball": "كرة تدريب", "Professional Football": "كرة قدم احترافية",
    "Indoor Basketball": "كرة سلة داخلية", "Tennis Ball Pack": "كرات تنس", "Perfume": "عطر", "Men's Watch": "ساعة رجالية",
    "Premium Handbag": "حقيبة فاخرة", "Laptop": "لابتوب", "Wireless": "لاسلكي", "Bluetooth": "بلوتوث", "Digital": "رقمي"
  },
  ZH: {
    "Wireless Earbuds": "无线耳机", "Laptop Backpack": "笔记本背包", "Men Casual Shirt": "男士休闲衬衫",
    "Women Handbag": "女士手提包", "Headphones": "耳机", "Headset": "游戏耳机", "Running Shoes": "跑鞋",
    "Air Fryer": "空气炸锅", "Makeup Brush Set": "化妆刷套装", "Grocery Essentials Basket": "食品篮",
    "Office Notebook Pack": "办公笔记本套装", "Sports Training Ball": "训练球", "Professional Football": "专业足球",
    "Indoor Basketball": "室内篮球", "Tennis Ball Pack": "网球套装", "Perfume": "香水", "Men's Watch": "男士手表",
    "Premium Handbag": "高级手提包", "Laptop": "笔记本电脑", "Wireless": "无线", "Bluetooth": "蓝牙", "Digital": "数码"
  }
};

function translateByTerms(text, code) {
  const dictionary = termPhraseTranslations[code] || termPhraseTranslations[localeFallbacks[code]];
  if (!dictionary) return text;
  return Object.entries(dictionary)
    .sort((a, b) => b[0].length - a[0].length)
    .reduce((translated, [source, target]) => translated.replaceAll(source, target), text);
}

const bundledLocalePacks = window.averonGeneratedLocales || {};
const localeUiCorrections = {
  HI: {
    moreExplore: "और देखें"
  }
};
const localePhraseCorrections = {
  UR: {
    "Explore Tech": "ٹیکنالوجی دیکھیں",
    "Chrome": "کروم"
  },
  ZH: {
    "Chrome": "镀铬色"
  },
  DE: {
    "Heather Grey": "Meliertes Grau",
    "Chrome": "Chrom"
  },
  TR: {
    "Chrome": "Krom"
  },
  PT: {
    "Chrome": "Cromado",
    "Tan Brown": "Castanho-claro"
  },
  IT: {
    "Chrome": "Cromato"
  },
  BN: {
    "Chrome": "ক্রোম"
  },
  ID: {
    "Heather Grey": "Abu-abu Melange",
    "Tan Brown": "Cokelat Muda"
  },
  MS: {
    "Heather Grey": "Kelabu Melange",
    "Tan Brown": "Coklat Muda",
    "Cloud White": "Putih Awan",
    "Warm Beige": "Beige Hangat",
    "Chrome": "Krom",
    "Tan": "Coklat Muda"
  },
  FA: {
    "Cloud White": "سفید ابری",
    "Chrome": "کروم"
  },
  HE: {
    "Tan Brown": "חום בהיר",
    "Sport Black": "שחור ספורטיבי",
    "Chrome": "כרום"
  },
  NL: {
    "Chrome": "Chroom"
  },
  PL: {
    "Chrome": "Chrom"
  },
  SV: {
    "Shop Beauty": "Shoppa skönhet",
    "Midnight Black": "Midnattssvart",
    "Silver": "Silverfärgad",
    "Ocean Blue": "Havsblå",
    "Crimson Red": "Karmosinröd",
    "Heather Grey": "Melangegrå",
    "Royal Blue": "Kungsblå",
    "Sage Green": "Salviagrön",
    "Carbon Black": "Kolsvart",
    "Chrome": "Krom",
    "Tan": "Ljusbrun",
    "Tan Brown": "Ljusbrun"
  },
  VI: {
    "Chrome": "Crom",
    "Tan Brown": "Nâu nhạt"
  }
};

function localizedText(value) {
  const text = String(value ?? "");
  const fallbackCode = localeFallbacks[state.localeCode];
  return (
    localePhraseCorrections[state.localeCode]?.[text] ||
    bundledLocalePacks[state.localeCode]?.phrases?.[text] ||
    localizedPhrases[state.localeCode]?.[text] ||
    localizedPhrases[fallbackCode]?.[text] ||
    translateByTerms(text, state.localeCode)
  );
}

function localizedProductTitle(product) {
  return localizedText(product.title);
}

function t(key, replacements = {}) {
  const fallbackCode = localeFallbacks[state.localeCode];
  const selectedCopy =
    state.localeCode === "EN" || state.localeCode === "UR"
      ? uiCopy[state.localeCode]?.[key]
      : "";
  const fallbackCopy = uiCopy[fallbackCode]?.[key];
  const value =
    localeUiCorrections[state.localeCode]?.[key] ||
    selectedCopy ||
    bundledLocalePacks[state.localeCode]?.ui?.[key] ||
    fallbackCopy ||
    uiCopy.EN[key] ||
    key;
  return Object.entries(replacements).reduce(
    (text, [name, replacement]) => text.replaceAll(`{${name}}`, replacement),
    value
  );
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = value;
  }
}

function setTextAll(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function setLabelText(label, value) {
  if (!label) return;
  const textNode = [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) {
    textNode.textContent = `${value} `;
  }
}

function setButtonTextNode(button, value) {
  if (!button) return;
  const textNode = [...button.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) {
    textNode.textContent = ` ${value}`;
  }
}

function applyLocaleTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  setText(".top-promise span:nth-child(1)", t("freeDelivery"));
  setText(".top-promise span:nth-child(2)", t("returns"));
  setText(".top-promise span:nth-child(3)", t("securePayments"));
  setText(".top-promise span:nth-child(4)", t("dealsDiscounts"));
  setText(".top-links a:nth-child(1)", t("sell"));
  setText(".top-links a:nth-child(2)", t("track"));
  setText(".top-links a:nth-child(3)", t("support"));
  setText("#categorySelect option[value='All']", t("allCategories"));
  setText(".search-box .sr-only", t("searchLabel"));
  setText(".search-box button[type='submit'] .desktop-search-label", t("searchButton"));
  updateSearchPlaceholder();

  setText(".locale-panel__header strong", t("preferences"));
  const languageLabel = byId("languagePickerLabel");
  const languageValue = byId("otherLanguageSelect");
  if (languageLabel && !languageValue?.value) {
    languageLabel.textContent = t("selectLanguage");
  }
  const languageSearch = byId("languageSearchInput");
  if (languageSearch) {
    languageSearch.placeholder = t("searchLanguage");
  }
  const currencySearch = byId("currencySearchInput");
  if (currencySearch) {
    currencySearch.placeholder = t("searchCurrency");
  }
  const countrySearch = byId("countrySearchInput");
  if (countrySearch) {
    countrySearch.placeholder = t("searchCountry");
  }
  updateCountryDisplay();
  setText(".locale-region-link", t("changeCountry"));

  setButtonTextNode(document.querySelector('.header-actions > button[data-toast*="Wishlist"]'), t("wishlist"));
  setText("#cartButton > span:not(.action-icon)", t("cart"));
  const accountText = document.querySelector(".header-actions > button:last-child > span:last-child");
  if (accountText) {
    accountText.innerHTML = `${escapeHtml(t("hiAli"))}<br /><small>${escapeHtml(t("myAccount"))}</small>`;
  }

  setText('.nav-bar__inner a[data-listing-page="todays-deals"]', t("todaysDeals"));
  setText('.nav-bar__inner a[data-listing-page="flash-deals"]', t("flashDeals"));
  setText('.nav-bar__inner a[data-listing-page="best-sellers"]', t("bestSellers"));
  setText('.nav-bar__inner a[data-listing-page="new-arrivals"]', t("newArrivals"));
  setText('.nav-bar__inner a[href="#brandStrip"]', t("topBrands"));
  setText('.nav-bar__inner a[href="#newsletter"]', t("vouchers"));

  setText("[data-view-all-label]", t("viewAllCategories"));
  setText("#flashDeals h2", t("flashDeals"));
  setText("#bestSellers h2", t("bestSellingProducts"));
  setText('#flashDeals [data-open-listing="flash-deals"]', t("viewAll"));
  setTextAll("[data-view-all-products]", t("viewAll"));
  setText(".promo-slider-head h2", t("moreExplore"));
  setText(".search-results-head > span", t("searchResults"));
  setText("#searchResultsTitle", t("results"));
  setText("#searchResultsMeta", t("searchMeta"));

  setText(".cart-head span", t("checkout"));
  setText(".cart-head h2", t("yourCart"));
  const checkoutLabels = document.querySelectorAll("#checkoutForm > label");
  setLabelText(checkoutLabels[0], t("fullName"));
  setLabelText(checkoutLabels[1], t("deliveryCity"));
  setLabelText(checkoutLabels[2], t("address"));
  const nameInput = document.querySelector('#checkoutForm input[name="name"]');
  if (nameInput) nameInput.placeholder = t("namePlaceholder");
  const addressInput = document.querySelector('#checkoutForm textarea[name="address"]');
  if (addressInput) addressInput.placeholder = t("addressPlaceholder");
  const paymentLabels = document.querySelectorAll(".payment-options label");
  setLabelText(paymentLabels[0], t("cashOnDelivery"));
  setLabelText(paymentLabels[1], t("walletPayment"));
  setLabelText(paymentLabels[2], t("cardPayment"));
  setText(".cart-total span", t("total"));
  setText("#checkoutForm button[type='submit']", t("placeOrder"));
  document.querySelectorAll("[data-promo-slider]").forEach(renderPromoSlider);
}

function loadCart() {
  const saved = localStorage.getItem("averon-cart");
  return saved ? JSON.parse(saved) : [];
}

function saveCart() {
  localStorage.setItem("averon-cart", JSON.stringify(state.cart));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function discountPercent(price, oldPrice) {
  const original = Number(oldPrice) || 0;
  const sale = Number(price) || 0;
  if (!original || original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
}

function discountBadge(price, oldPrice, preferred = "") {
  return preferred || (discountPercent(price, oldPrice) ? `-${discountPercent(price, oldPrice)}%` : "");
}

function reviewCount(product) {
  const details = productDetails[product.id] || {};
  return Math.max(1, Number(details.reviewCount || details.sold || product.reviews || 0));
}

function compactCount(value) {
  const count = Number(value) || 0;
  return count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K` : String(count);
}

function ratingDistribution(product) {
  const details = productDetails[product.id] || {};
  if (Array.isArray(details.ratingBreakdown) && details.ratingBreakdown.length === 5) {
    return details.ratingBreakdown.map((value) => Math.max(0, Math.min(100, Number(value) || 0)));
  }
  const rating = Math.max(1, Math.min(5, Number(product.rating) || 4.5));
  const five = Math.max(54, Math.min(88, Math.round(rating * 20 - 13)));
  const three = rating >= 4.5 ? 5 : 7;
  const two = rating >= 4.2 ? 1 : 3;
  const one = rating >= 4.3 ? 4 : 6;
  const four = Math.max(0, 100 - five - three - two - one);
  return [five, four, three, two, one];
}

function starRatingMarkup(rating) {
  const percent = Math.max(0, Math.min(100, (Number(rating) || 0) * 20));
  return `
    <span class="star-meter" aria-hidden="true">
      <span class="star-meter__base">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
      <span class="star-meter__fill" style="width:${percent}%">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
    </span>
  `;
}

function ratingSummaryMarkup(product) {
  const count = reviewCount(product);
  const distribution = ratingDistribution(product);
  const productTitle = localizedProductTitle(product);
  return `
    <div class="rating-popover" role="dialog" aria-label="${escapeHtml(t("ratingBreakdown"))}">
      <button class="rating-popover__close" type="button" data-close-rating aria-label="Close rating summary">&times;</button>
      <div class="rating-popover__score">
        ${starRatingMarkup(product.rating)}
        <strong>${escapeHtml(t("outOfFive", { rating: product.rating }))}</strong>
      </div>
      <p>${escapeHtml(t("globalRatings", { count: count.toLocaleString() }))}</p>
      <div class="rating-bars">
        ${distribution
          .map(
            (percent, index) => `
              <div class="rating-bar">
                <span>${5 - index} star</span>
                <i><b style="width:${percent}%"></b></i>
                <strong>${percent}%</strong>
              </div>
            `
          )
          .join("")}
      </div>
      <button class="rating-popover__reviews" type="button" data-open-reviews="${escapeHtml(product.id)}" aria-label="${escapeHtml(t("seeCustomerReviews"))} for ${escapeHtml(productTitle)}">
        ${escapeHtml(t("seeCustomerReviews"))} &rsaquo;
      </button>
    </div>
  `;
}

function ratingTriggerMarkup(product, compact = false) {
  const count = reviewCount(product);
  return `
    <div class="rating-menu-wrap">
      <button class="rating-trigger" type="button" data-rating-toggle="${escapeHtml(product.id)}" aria-expanded="false">
        <strong>${product.rating}</strong>
        ${starRatingMarkup(product.rating)}
        <span class="rating-trigger__chevron" aria-hidden="true"></span>
        <span>${compact ? `(${compactCount(count)})` : `(${compactCount(count)})`}</span>
      </button>
      ${ratingSummaryMarkup(product)}
    </div>
  `;
}

function closeRatingSummaries(exceptWrap = null) {
  document.querySelectorAll(".rating-menu-wrap.is-open").forEach((wrap) => {
    if (wrap === exceptWrap) return;
    wrap.classList.remove("is-open");
    wrap.querySelector(".rating-popover")?.classList.remove("is-visible");
    wrap.closest(".deal-card")?.classList.remove("has-rating-open");
    wrap.querySelector("[data-rating-toggle]")?.setAttribute("aria-expanded", "false");
  });
}

function productReviewSamples(product) {
  const details = productDetails[product.id] || {};
  if (Array.isArray(details.customerReviews) && details.customerReviews.length) return details.customerReviews;
  const productTitle = localizedProductTitle(product);
  return [
    {
      name: "Ayesha Khan",
      rating: Math.min(5, Math.round(product.rating)),
      title: "Verified purchase",
      body: `${productTitle} arrived safely, packing was neat and the product quality matched the listing.`
    },
    {
      name: "Hamza Ali",
      rating: Math.max(4, Math.floor(product.rating)),
      title: "Good value",
      body: "Price, delivery and seller response were all reliable. I would buy again from this store."
    },
    {
      name: "Sara Ahmed",
      rating: 5,
      title: "Fast delivery",
      body: "The order reached earlier than expected and the product details were accurate."
    }
  ];
}

function reviewPageUrl(product) {
  return `/reviews/${product.id}/${slugify(product.title)}`;
}

function reviewsProductIdFromLocation() {
  const match = appPathname().match(/^\/reviews\/([a-z0-9]+)(?:[/-]|$)/i);
  return match?.[1] || "";
}

function installAdminRecord(record) {
  const product = record?.product;
  if (!product?.id || allProducts.some((entry) => entry.id === product.id)) return;
  flashProducts.unshift(product);
  allProducts.unshift(product);
  productDetails[product.id] = record.details || {};
}

async function loadAdminCatalogue() {
  try {
    const response = await fetch("/api/storefront/products", { headers: { Accept: "application/json" } });
    if (!response.ok) return;
    const payload = await response.json();
    (payload.products || []).forEach(installAdminRecord);
    renderCategories();
    renderProducts();
    if (!byId("searchResults")?.hidden) renderSearchResults();
    const directProductId = productIdFromLocation();
    if (directProductId && allProducts.some((product) => product.id === directProductId)) {
      renderProductPage(directProductId, null, { pushUrl: false, source: "url" });
    }
  } catch {
    // The built-in catalogue remains usable if the management API is temporarily unavailable.
  }
}

function setSideAllCategoriesOpen(open) {
  state.categoryPopupOpen = open;
  state.sideCategoriesExpanded = false;
  const categoryPanel = byId("categoryPanel");
  if (categoryPanel) {
    categoryPanel.classList.remove("is-expanded");
  }
  const viewAllButton = document.querySelector("[data-side-toggle-categories]");
  if (viewAllButton) {
    viewAllButton.setAttribute("aria-expanded", String(open));
    const label = viewAllButton.querySelector("[data-view-all-label]");
    if (label) {
      label.textContent = t("viewAllCategories");
    }
  }
}

function categoryPopupItems() {
  return categories.map((category) => ({
    ...category,
    key: sideCategoryMegaKeys[category.name] || getSideMegaKeyForCategory(category.name)
  }));
}

function renderCategoryPopup() {
  const activeName = state.categoryPopupName || state.sideCategoryName || "Clothing & Fashion";
  const rail = byId("categoryPopupRail");
  const content = byId("categoryPopupContent");

  if (rail) {
    rail.innerHTML = categoryPopupItems()
      .map(
        (category) => `
          <button class="${activeName === category.name ? "is-active" : ""}" type="button" data-popup-category-name="${escapeHtml(category.name)}" aria-selected="${activeName === category.name}">
            ${categoryIcon(category.icon)}
            <span>${escapeHtml(localizedText(category.name))}</span>
          </button>
        `
      )
      .join("");
  }

  if (content) {
    content.innerHTML = sideCategoryContentMarkup(activeName);
  }
}

function setCategoryPopupActive(categoryName) {
  state.categoryPopupName = categoryName;
  document.querySelectorAll("#categoryPopupRail [data-popup-category-name]").forEach((button) => {
    const isActive = button.dataset.popupCategoryName === categoryName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  const content = byId("categoryPopupContent");
  if (content) {
    content.innerHTML = sideCategoryContentMarkup(categoryName);
  }
}

function openCategoryPopup(categoryName = state.sideCategoryName || state.categoryPopupName || "Clothing & Fashion") {
  state.categoryPopupName = categoryName;
  const popup = byId("categoryPopup");
  const overlay = byId("categoryPopupOverlay");
  if (!popup || !overlay) return;
  renderCategoryPopup();
  overlay.hidden = false;
  popup.hidden = false;
  popup.setAttribute("aria-hidden", "false");
  setSideCategoryPanelOpen(false);
  setSideAllCategoriesOpen(true);
  document.body.classList.add("category-popup-open");
  window.requestAnimationFrame(() => {
    overlay.classList.add("is-open");
    popup.classList.add("is-open");
  });
}

function closeCategoryPopup() {
  const popup = byId("categoryPopup");
  const overlay = byId("categoryPopupOverlay");
  if (!popup || !overlay) return;
  popup.classList.remove("is-open");
  overlay.classList.remove("is-open");
  popup.setAttribute("aria-hidden", "true");
  setSideAllCategoriesOpen(false);
  document.body.classList.remove("category-popup-open");
  window.setTimeout(() => {
    popup.hidden = true;
    overlay.hidden = true;
  }, 160);
}

function renderHero() {
  const track = byId("heroSlideTrack");
  const dots = byId("heroDots");
  if (!track || !dots) return;

  track.innerHTML = heroSlides
    .map(
      (slide, index) => `
        <article class="hero-slide ${index === state.heroIndex ? "is-active" : ""}" data-theme="${slide.theme}">
          <div class="hero-copy">
            <p>${escapeHtml(localizedText(slide.eyebrow))}</p>
            <h1>${escapeHtml(localizedText(slide.title))}</h1>
            ${slide.lines.map((line) => `<span>${escapeHtml(localizedText(line))}</span>`).join("")}
            <button type="button" ${slide.category ? `data-category="${escapeHtml(slide.category)}"` : `data-scroll="${slide.target || "#flashDeals"}"`}>
              ${escapeHtml(localizedText(slide.action))} &rarr;
            </button>
          </div>
          <div class="hero-products" aria-hidden="true">
            ${slide.products
              .map((image, imageIndex) => `<img class="hero-product hero-product-${imageIndex + 1}" src="${image}" alt="" loading="${index === 0 ? "eager" : "lazy"}" />`)
              .join("")}
          </div>
        </article>
      `
    )
    .join("");

  dots.innerHTML = heroSlides
    .map(
      (slide, index) => `
        <button class="${index === state.heroIndex ? "active" : ""}" type="button" data-hero-dot="${index}" aria-label="Show ${escapeHtml(localizedText(slide.title))}"></button>
      `
    )
    .join("");
}

function setHeroSlide(index) {
  state.heroIndex = (index + heroSlides.length) % heroSlides.length;
  document.querySelectorAll(".hero-slide").forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === state.heroIndex);
  });
  document.querySelectorAll("[data-hero-dot]").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === state.heroIndex);
  });
}

function nextHeroSlide() {
  setHeroSlide(state.heroIndex + 1);
}

function startHeroAuto() {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(nextHeroSlide, 4200);
}

function setDiscoverySlide(index) {
  const slides = Array.from(document.querySelectorAll("[data-discovery-slide]"));
  if (!slides.length) return;
  const nextIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === nextIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.querySelectorAll("button, a").forEach((control) => {
      if (isActive) {
        control.removeAttribute("tabindex");
      } else {
        control.setAttribute("tabindex", "-1");
      }
    });
  });
  document.querySelectorAll("[data-discovery-dot]").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === nextIndex);
  });
  byId("categorySpotlight").dataset.discoveryIndex = String(nextIndex);
}

function discountedSpotlightProducts() {
  const seenCategories = new Set();
  return [...flashProducts]
    .sort((a, b) => (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice)
    .filter((product) => {
      if (seenCategories.has(product.category)) return false;
      seenCategories.add(product.category);
      return true;
    })
    .slice(0, 3);
}

function renderDealSpotlight() {
  const slides = byId("dealSpotlightSlides");
  const dots = byId("dealSpotlightDots");
  if (!slides || !dots) return;
  const products = discountedSpotlightProducts();
  slides.innerHTML = products
    .map(
      (product, index) => `
        <article class="spotlight-slide${index === 0 ? " is-active" : ""}" data-discovery-slide data-product-id="${product.id}">
          <div class="spotlight-media">
            <span class="spotlight-discount">${escapeHtml(product.discount)}</span>
            <img src="${product.image}" alt="${escapeHtml(localizedProductTitle(product))}" loading="lazy" />
          </div>
          <div class="spotlight-copy">
            <small>${escapeHtml(localizedText(product.category))}</small>
            <h3>${escapeHtml(localizedProductTitle(product))}</h3>
            <div class="spotlight-price">
              <strong>${formatCurrency(product.price)}</strong>
              <del>${formatCurrency(product.oldPrice)}</del>
            </div>
            <p>${escapeHtml(t("saveToday", { amount: formatCurrency(product.oldPrice - product.price) }))}</p>
            <span class="spotlight-trust">${escapeHtml(t("verifiedDeal"))}</span>
            <button type="button" data-spotlight-product="${product.id}">${escapeHtml(t("viewDeal"))}</button>
          </div>
        </article>
      `
    )
    .join("");
  dots.innerHTML = products
    .map(
      (product, index) =>
        `<button class="${index === 0 ? "is-active" : ""}" type="button" data-discovery-dot="${index}" aria-label="Show ${escapeHtml(localizedProductTitle(product))} deal"></button>`
    )
    .join("");
  setDiscoverySlide(Number(byId("categorySpotlight").dataset.discoveryIndex || 0));
}

function startDiscoveryAuto() {
  window.clearInterval(discoveryTimer);
  if (!byId("categorySpotlight") || window.matchMedia("(max-width: 900px)").matches) return;
  discoveryTimer = window.setInterval(() => {
    const index = Number(byId("categorySpotlight").dataset.discoveryIndex || 0);
    setDiscoverySlide(index + 1);
  }, 5200);
}

function updateCategoryRailControls() {
  const rail = byId("circleCategories");
  const previous = document.querySelector("[data-category-rail-prev]");
  const next = document.querySelector("[data-category-rail-next]");
  if (!rail || !previous || !next) return;
  previous.disabled = rail.scrollLeft <= 2;
  next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
}

function moveCategoryRail(direction) {
  const rail = byId("circleCategories");
  if (!rail) return;
  rail.scrollBy({
    left: direction * Math.max(rail.clientWidth * 0.8, 360),
    behavior: "smooth"
  });
  window.setTimeout(updateCategoryRailControls, 260);
}

function initHeroSwipe(slider) {
  if (!slider || slider.dataset.swipeReady === "true") return;

  let pointerId = null;
  let startX = 0;
  let startY = 0;

  slider.dataset.swipeReady = "true";
  slider.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
  });
  slider.addEventListener("pointerup", (event) => {
    if (event.pointerId !== pointerId) return;
    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;
    pointerId = null;
    if (
      window.matchMedia("(max-width: 900px)").matches &&
      Math.abs(distanceX) >= 38 &&
      Math.abs(distanceX) > Math.abs(distanceY) * 1.15
    ) {
      setHeroSlide(state.heroIndex + (distanceX < 0 ? 1 : -1));
      startHeroAuto();
    }
  });
  slider.addEventListener("pointercancel", () => {
    pointerId = null;
  });
}

function promoPerPage() {
  return window.matchMedia("(max-width: 620px)").matches ? 1 : 2;
}

function renderPromoSlider(slider) {
  const track = slider.querySelector(".promo-slider-track");
  const cards = Array.from(slider.querySelectorAll(".promo-card"));
  const dots = slider.querySelector(".promo-slider-dots");
  if (!track || !cards.length || !dots) return;

  const perPage = promoPerPage();
  const maxIndex = Math.max(0, cards.length - perPage);
  const index = Math.min(Number(slider.dataset.promoIndex || 0), maxIndex);
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  const step = cards[0].getBoundingClientRect().width + gap;

  slider.dataset.promoIndex = String(index);
  track.style.transform = `translateX(${-index * step}px)`;
  dots.innerHTML = Array.from({ length: maxIndex + 1 })
    .map(
      (_, dotIndex) => `
        <button class="${dotIndex === index ? "is-active" : ""}" type="button" data-promo-dot="${dotIndex}" aria-label="Show promo slide ${dotIndex + 1}"></button>
      `
    )
    .join("");
}

function movePromoSlider(slider, direction) {
  const cards = slider.querySelectorAll(".promo-card");
  const maxIndex = Math.max(0, cards.length - promoPerPage());
  const currentIndex = Number(slider.dataset.promoIndex || 0);
  const nextIndex = currentIndex + direction;
  slider.dataset.promoIndex = String(nextIndex > maxIndex ? 0 : nextIndex < 0 ? maxIndex : nextIndex);
  renderPromoSlider(slider);
}

function startPromoSliderAuto(slider) {
  window.clearInterval(promoSliderTimers.get(slider));
  const timer = window.setInterval(() => movePromoSlider(slider, 1), 4400);
  promoSliderTimers.set(slider, timer);
}

function initPromoSliderSwipe(slider) {
  const windowElement = slider.querySelector(".promo-slider-window");
  if (!windowElement || windowElement.dataset.swipeReady === "true") return;

  let pointerId = null;
  let startX = 0;
  let startY = 0;

  windowElement.dataset.swipeReady = "true";
  windowElement.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
  });
  windowElement.addEventListener("pointerup", (event) => {
    if (event.pointerId !== pointerId) return;
    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;
    pointerId = null;
    if (
      window.matchMedia("(max-width: 900px)").matches &&
      Math.abs(distanceX) >= 38 &&
      Math.abs(distanceX) > Math.abs(distanceY) * 1.15
    ) {
      movePromoSlider(slider, distanceX < 0 ? 1 : -1);
      startPromoSliderAuto(slider);
    }
  });
  windowElement.addEventListener("pointercancel", () => {
    pointerId = null;
  });
}

function initPromoSliders() {
  document.querySelectorAll("[data-promo-slider]").forEach((slider) => {
    slider.dataset.promoIndex = slider.dataset.promoIndex || "0";
    renderPromoSlider(slider);
    initPromoSliderSwipe(slider);
    startPromoSliderAuto(slider);
  });
}

function categorySearchTargets(categoryName) {
  if (categoryName === "All") return [];
  return [...new Set([categoryName, ...(categorySearchAliases[categoryName] || [])])];
}

function updateSearchPlaceholder() {
  const input = byId("searchInput");
  if (!input) return;
  input.placeholder =
    state.category === "All"
      ? t("searchPlaceholder")
      : t("searchIn", { category: localizedText(state.category) });
}

function searchTermsForQuery(query) {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
  const terms = [query, ...tokens];
  tokens.forEach((token) => {
    if (searchSynonyms[token]) {
      terms.push(...searchSynonyms[token]);
    }
  });
  return [...new Set(terms.map((term) => term.trim()).filter(Boolean))];
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatQueryLabel(value) {
  return String(value)
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function productUrl(product, source = "product") {
  const spm = `averon.${source}`.replace(/[^a-z0-9_.-]+/gi, "-").toLowerCase();
  return `/item/${product.id}/${slugify(product.title)}?spm=${encodeURIComponent(spm)}`;
}

function productIdFromLocation() {
  const itemParam = new URLSearchParams(window.location.search).get("item");
  if (itemParam && allProducts.some((product) => product.id === itemParam)) {
    return itemParam;
  }

  const match = appPathname().match(/\/(?:item|product\/detail)\/([a-z0-9]+)(?:[/-]|$)/i);
  return match?.[1] || "";
}

function listingPageFromLocation() {
  return Object.entries(listingPages).find(([, page]) => page.path === appPathname())?.[0] || "";
}

function searchListingFromLocation() {
  const match = appPathname().match(/^\/search\/([^/]+)\/([^/]+)$/i);
  if (!match) return null;

  const key = match[2];
  if (!listingPages[key]) return null;

  return {
    key,
    query: decodeURIComponent(match[1]).replace(/-/g, " ").trim()
  };
}

function searchQueryFromLocation() {
  const listingRoute = searchListingFromLocation();
  if (listingRoute) return listingRoute.query;

  const searchParam = new URLSearchParams(window.location.search).get("search");
  if (searchParam !== null) return searchParam;

  const match = appPathname().match(/^\/search\/([^/]+)$/i);
  if (!match) return null;
  return decodeURIComponent(match[1]).replace(/-/g, " ").trim();
}

function productSearchText(product) {
  const details = productDetails[product.id];
  const categoryTerms = [product.category, ...Object.entries(categorySearchAliases)
    .filter(([, targets]) => targets.includes(product.category))
    .map(([name]) => name)];

  const localizedTerms = [localizedProductTitle(product), ...categoryTerms.map(localizedText), localizedProductDescription(product, details || {})];
  return `${product.title} ${categoryTerms.join(" ")} ${details?.description || ""} ${details?.note || ""} ${details?.tag || ""} ${localizedTerms.join(" ")}`.toLowerCase();
}

function productMatchesSearchQuery(product, query) {
  const cleanQuery = query.trim().toLowerCase();
  return !cleanQuery || searchTermsForQuery(cleanQuery).some((term) => productSearchText(product).includes(term));
}

function productMatches(product) {
  const categoryTargets = categorySearchTargets(state.category);
  const matchesCategory = state.category === "All" || categoryTargets.includes(product.category);
  return matchesCategory && productMatchesSearchQuery(product, state.query);
}

function searchSuggestionProducts(query) {
  const cleaned = String(query || "").trim().toLowerCase();
  if (!cleaned) return [];
  const categoryTargets = categorySearchTargets(state.category);
  return allProducts
    .filter((product) => state.category === "All" || categoryTargets.includes(product.category))
    .filter((product) => productMatchesSearchQuery(product, cleaned))
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aStarts = aTitle.startsWith(cleaned) ? 0 : 1;
      const bStarts = bTitle.startsWith(cleaned) ? 0 : 1;
      return aStarts - bStarts || aTitle.localeCompare(bTitle);
    })
    .slice(0, 10);
}

function closeSearchSuggestions() {
  const suggestions = byId("searchSuggestions");
  const input = byId("searchInput");
  if (suggestions) suggestions.hidden = true;
  if (input) input.setAttribute("aria-expanded", "false");
}

function renderSearchSuggestions(query = byId("searchInput")?.value || "") {
  const suggestions = byId("searchSuggestions");
  const input = byId("searchInput");
  if (!suggestions || !input) return;
  const products = searchSuggestionProducts(query);
  if (!String(query).trim() || !products.length) {
    closeSearchSuggestions();
    return;
  }
  suggestions.innerHTML = products
    .map(
      (product) =>
        `<button type="button" role="option" data-search-suggestion="${escapeHtml(product.title)}">${escapeHtml(localizedProductTitle(product))}</button>`
    )
    .join("");
  suggestions.hidden = false;
  input.setAttribute("aria-expanded", "true");
}

function submitStoreSearch(query) {
  state.query = String(query || "").trim();
  state.category = byId("categorySelect").value || "All";
  state.resultsView = { type: "search" };
  closeSearchSuggestions();
  renderProducts();
  if (document.body.classList.contains("product-view-open")) {
    closeProductPage({ restore: false, updateUrl: false });
  }
  closeReviewsPage();
  const searchPath = state.query ? `/search/${slugify(state.query)}` : "/";
  pushRouteState(null, searchPath);
  setSearchResultsOpen(Boolean(state.query));
  if (state.query) {
    byId("searchResults").scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    openHomePage();
  }
}

function productsForListing(key, query = "") {
  const listing = listingPages[key];
  if (!listing) return [];

  const cleanQuery = query.trim();
  if (!cleanQuery) return listing.getProducts();

  const matches = allProducts.filter((product) => productMatchesSearchQuery(product, cleanQuery));
  const sortedMatches = [...matches];

  if (key === "best-sellers") {
    return sortedMatches.sort((a, b) => (b.reviews + b.rating * 20) - (a.reviews + a.rating * 20));
  }

  if (key === "new-arrivals") {
    return sortedMatches.reverse();
  }

  if (key === "official-stores") {
    const assured = sortedMatches.filter((product) => product.rating >= 4.5);
    return assured.length >= 2 ? assured : sortedMatches;
  }

  return sortedMatches.sort((a, b) => {
    const aSaving = (a.oldPrice || a.price) - a.price;
    const bSaving = (b.oldPrice || b.price) - b.price;
    return bSaving - aSaving;
  });
}

function uniqueImages(images) {
  return [...new Set(images.filter(Boolean))];
}

function productGalleryImages(product) {
  const variantImages = productDetails[product.id]?.variants?.map((variant) => variant.image) || [];
  if (variantImages.length) {
    return uniqueImages(variantImages).slice(0, 6);
  }
  return [product.image];
}

function productColors(product) {
  const variantColors = productDetails[product.id]?.variants?.map((variant) => variant.color) || [];
  if (variantColors.length) return variantColors;
  if (productSpecificColorPalettes[product.id]) return productSpecificColorPalettes[product.id];
  return productColorPalettes[product.category] || ["Black", "White", "Blue", "Grey"];
}

function productSizes(product) {
  return productDetails[product.id]?.sizes?.length
    ? productDetails[product.id].sizes
    : productSizeOptions[product.category] || ["Standard", "Bundle"];
}

function hasCustomProductVariants(product) {
  return Boolean(productDetails[product.id]?.variants?.length);
}

function colorVariantTone(color) {
  const normalizedColor = String(color || "").toLowerCase();
  if (/(black|carbon|charcoal)/.test(normalizedColor)) return "charcoal";
  if (/(grey|gray|graphite|slate)/.test(normalizedColor)) return "graphite";
  if (/(white|ivory|pearl|clear)/.test(normalizedColor)) return "bright";
  if (/(silver|chrome|steel)/.test(normalizedColor)) return "silver";
  if (/(blue|navy|ocean|royal)/.test(normalizedColor)) return "cool";
  if (/(red|pink|rose|berry|crimson)/.test(normalizedColor)) return "rose";
  if (/(green|sage)/.test(normalizedColor)) return "sage";
  if (/(beige|brown|tan|champagne|gold)/.test(normalizedColor)) return "warm";
  return "base";
}

function productVariantTone(product, color) {
  return hasCustomProductVariants(product) ? "" : colorVariantTone(color);
}

function productVariants(product) {
  const customVariants = productDetails[product.id]?.variants;
  if (customVariants?.length) {
    return customVariants.map((variant, index) => ({
      color: variant.color,
      image: variant.image,
      tone: "",
      price: variant.price || product.price + (index % 2 ? 500 : 0),
      oldPrice: variant.oldPrice || product.oldPrice + (index % 2 ? 700 : 0)
    }));
  }

  return productColors(product).slice(0, 5).map((color, index) => ({
    color,
    image: product.image,
    tone: productVariantTone(product, color),
    price: product.price + (index % 2 ? 500 : 0),
    oldPrice: product.oldPrice + (index % 2 ? 700 : 0)
  }));
}

function productAdditionalOptions(product) {
  return (productDetails[product.id]?.variantOptions || []).filter(
    (option) => !["color", "size"].includes(String(option.name || "").toLowerCase()) && Array.isArray(option.values) && option.values.length
  );
}

function localizedProductDescription(product, details) {
  if (state.localeCode === "EN") {
    return details.description || t("productDescription", { title: product.title });
  }
  return t("productDescription", { title: localizedProductTitle(product) });
}

function renderProductPage(productId, originElement = null, options = {}) {
  const { pushUrl = true, source = "product", preserveScroll = false } = options;
  const product = allProducts.find((entry) => entry.id === productId);
  const page = byId("productPage");
  if (!product || !page) return;
  closeSearchSuggestions();
  closeReviewsPage();

  const fallbackOrigin = document.querySelector(`[data-product-id="${CSS.escape(productId)}"]`);
  const returnOrigin = originElement || fallbackOrigin;
  const originSection = returnOrigin?.closest?.(".section-block");
  if (source !== "locale") {
    state.productReturnTarget = {
      productId,
      sectionId: originSection?.id || "",
      scrollY: window.scrollY
    };
  }

  const details = productDetails[product.id] || {};
  const productTitle = localizedProductTitle(product);
  const gallery = productGalleryImages(product);
  const variants = productVariants(product);
  const initialPrice = variants[0]?.price || product.price;
  const initialOldPrice = variants[0]?.oldPrice || product.oldPrice;
  const initialTone = variants[0]?.tone || "";
  const galleryTone = hasCustomProductVariants(product) ? "" : initialTone;
  const sizes = productSizes(product);
  const additionalOptions = productAdditionalOptions(product);
  const dateLocale = state.localeCode === "EN" ? "en-PK" : localeDisplayTags[state.localeCode] || "en-PK";
  const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(dateLocale, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  page.dataset.productId = product.id;
  page.innerHTML = `
    <button class="product-back" type="button" data-close-product>&larr; ${escapeHtml(t("backToStore"))}</button>
    <article class="product-detail">
      <section class="product-gallery" aria-label="${escapeHtml(productTitle)} images">
        <div class="product-main-image" data-product-zoom>
          <img src="${gallery[0] || product.image}" alt="${escapeHtml(productTitle)}" data-main-product-image data-variant-tone="${escapeHtml(initialTone)}" />
        </div>
        ${
          gallery.length > 1
            ? `<div class="product-thumbnails">
                ${gallery
                  .map(
                    (image, index) => `
                      <button class="${index === 0 ? "is-active" : ""}" type="button" data-detail-image="${image}" data-detail-tone="${escapeHtml(galleryTone)}" aria-label="View image ${index + 1}">
                        <img src="${image}" alt="${escapeHtml(productTitle)} view ${index + 1}" data-variant-tone="${escapeHtml(galleryTone)}" loading="lazy" />
                      </button>
                    `
                  )
                  .join("")}
              </div>`
            : ""
        }
      </section>

      <section class="product-info">
        <span class="product-breadcrumb">${escapeHtml(localizedText(product.category))} / ${escapeHtml(t("averonVerified"))}</span>
        <h1>${escapeHtml(productTitle)}</h1>
        <div class="product-rating-row">
          ${ratingTriggerMarkup(product)}
          <span>${details.sold || product.reviews} ${escapeHtml(t("sold"))}</span>
        </div>
        <div class="product-price-box">
          <strong data-detail-price>${formatCurrency(initialPrice)}</strong>
          <del data-detail-old-price>${formatCurrency(initialOldPrice)}</del>
          <span data-detail-discount>${escapeHtml(discountBadge(initialPrice, initialOldPrice, product.discount) || details.tag || t("bestValue"))}</span>
          <span class="detail-saving" data-detail-saving>${escapeHtml(t("saveAmount", { amount: formatCurrency(initialOldPrice - initialPrice) }))}</span>
        </div>
        <p class="product-long-desc">${escapeHtml(localizedProductDescription(product, details))}</p>

        <div class="detail-panel delivery-panel">
          <h2>${escapeHtml(t("delivery"))}</h2>
          <div>
            <strong>${escapeHtml(t("freeDeliveryAvailable"))}</strong>
            <span>${escapeHtml(t("deliveryInfo", { date: deliveryDate }))}</span>
          </div>
        </div>

        <div class="detail-panel">
          <h2>${escapeHtml(t("color"))}: <span data-selected-color>${escapeHtml(localizedText(variants[0]?.color || "Standard"))}</span></h2>
          <div class="variant-grid">
            ${variants
              .map(
                (variant, index) => `
                  <button class="${index === 0 ? "is-active" : ""}" type="button" data-product-variant data-image="${variant.image}" data-tone="${escapeHtml(variant.tone || "")}" data-color="${escapeHtml(variant.color)}" data-price="${formatCurrency(variant.price)}" data-old-price="${formatCurrency(variant.oldPrice)}" data-discount="${escapeHtml(discountBadge(variant.price, variant.oldPrice, index === 0 ? product.discount : ""))}" data-saving="${escapeHtml(t("saveAmount", { amount: formatCurrency(variant.oldPrice - variant.price) }))}" data-price-value="${variant.price}" data-old-price-value="${variant.oldPrice}">
                    <img src="${variant.image}" alt="${escapeHtml(localizedText(variant.color))}" data-variant-tone="${escapeHtml(variant.tone || "")}" loading="lazy" />
                    <strong>${escapeHtml(localizedText(variant.color))}</strong>
                    <span>${formatCurrency(variant.price)}</span>
                    <del>${formatCurrency(variant.oldPrice)}</del>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>

        <div class="detail-panel">
          <h2>${escapeHtml(t("size"))}</h2>
          <div class="size-options">
            ${sizes
              .map((size, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-product-size data-size-value="${escapeHtml(size)}">${escapeHtml(localizedText(size))}</button>`)
              .join("")}
          </div>
        </div>

        ${additionalOptions.length ? `
          <div class="product-extra-options">
            ${additionalOptions.map((option) => `
              <div class="detail-panel">
                <h2>${escapeHtml(localizedText(option.name))}</h2>
                <div class="size-options">
                  ${option.values.map((value, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-product-option>${escapeHtml(localizedText(value))}</button>`).join("")}
                </div>
              </div>`).join("")}
          </div>` : ""}

        <div class="detail-panel product-purchase">
          <div>
            <h2>${escapeHtml(t("quantity"))}</h2>
            <div class="product-qty">
              <button type="button" data-detail-qty-decrease>-</button>
              <input id="productQuantity" type="number" min="1" max="10" value="1" readonly />
              <button type="button" data-detail-qty-increase>+</button>
            </div>
          </div>
          <div class="product-actions">
            <button type="button" data-detail-add="${product.id}">${escapeHtml(t("addToCart"))}</button>
            <button class="buy-now" type="button" data-detail-buy="${product.id}">${escapeHtml(t("buyNow"))}</button>
          </div>
        </div>
        <div class="detail-panel product-review-panel">
          <h2>Review this product</h2>
          <p>Share your experience. Reviews appear in the Averon moderation dashboard.</p>
          <form class="product-review-form" data-customer-review-form data-product-id="${escapeHtml(product.id)}" data-product-title="${escapeHtml(product.title)}" data-product-image="${escapeHtml(product.image)}">
            <div class="review-fields">
              <label>
                Your name
                <input name="customerName" type="text" minlength="2" maxlength="100" required placeholder="Customer name" />
              </label>
              <label>
                Rating
                <select name="rating" required>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Very poor</option>
                </select>
              </label>
            </div>
            <label>
              Your review
              <textarea name="review" minlength="8" maxlength="500" required rows="3" placeholder="Tell us about the product and delivery"></textarea>
            </label>
            <button type="submit">Submit review</button>
            <p class="review-feedback" data-review-feedback hidden></p>
          </form>
        </div>
      </section>
    </article>
  `;

  page.hidden = false;
  document.body.classList.add("product-view-open");
  document.title = `${productTitle} | Averon`;
  if (pushUrl) {
    pushRouteState({ productId: product.id }, productUrl(product, source));
  }
  if (!preserveScroll) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function closeProductPage(options = {}) {
  const { restore = true, updateUrl = true } = options;
  const page = byId("productPage");
  if (page) {
    page.hidden = true;
    page.innerHTML = "";
    delete page.dataset.productId;
  }
  document.body.classList.remove("product-view-open");
  document.title = "Averon | Multi-Vendor Ecommerce";

  if (updateUrl && /^\/(?:item|product\/detail)\//.test(appPathname())) {
    pushRouteState(null, "/");
  }

  if (!restore || !state.productReturnTarget) return;

  const { productId, sectionId, scrollY } = state.productReturnTarget;
  window.setTimeout(() => {
    const productCard = document.querySelector(`[data-product-id="${CSS.escape(productId)}"]`);
    const fallbackSection = sectionId ? byId(sectionId) : null;
    const target = productCard || fallbackSection;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: productCard ? "center" : "start" });
      target.classList.add("is-return-highlight");
      window.setTimeout(() => target.classList.remove("is-return-highlight"), 1300);
      if (productCard) {
        productCard.focus({ preventScroll: true });
      }
    } else {
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
    state.productReturnTarget = null;
  }, 80);
}

function setNewsletterOpen(open) {
  const newsletter = byId("newsletter");
  if (!newsletter) return;
  newsletter.classList.toggle("is-collapsed", !open);
  newsletter.setAttribute("aria-expanded", String(open));
  if (open) {
    window.setTimeout(() => byId("emailInput")?.focus(), 120);
  }
}

const supportThreadStorageKey = "averon_support_thread";
const supportNameStorageKey = "averon_support_name";
let customerSupportAttachment = null;

function supportAttachmentMarkup(attachment) {
  if (!attachment || !attachment.dataUrl || !attachment.name) return "";
  const linkText = escapeHtml(attachment.name);
  if (String(attachment.type || "").startsWith("image/")) {
    return `<a class="customer-support__attachment" href="${escapeHtml(attachment.dataUrl)}" download="${linkText}"><img src="${escapeHtml(attachment.dataUrl)}" alt="" /><span>${linkText}</span></a>`;
  }
  return `<a class="customer-support__attachment" href="${escapeHtml(attachment.dataUrl)}" download="${linkText}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l4 4v16H6zM14 2v6h5"/></svg><span>${linkText}</span></a>`;
}

function readSupportAttachment(file) {
  const allowed = ["image/png", "image/jpeg", "image/webp", "application/pdf", "text/plain"];
  if (!file || !allowed.includes(file.type) || file.size > 1024 * 1024) {
    throw new Error("PNG, JPG, WEBP, PDF ya TXT file 1 MB tak attach karein.");
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, dataUrl: reader.result });
    reader.onerror = () => reject(new Error("Attachment read nahi ho saki."));
    reader.readAsDataURL(file);
  });
}

function clearSupportAttachment() {
  customerSupportAttachment = null;
  const form = byId("customerSupportForm");
  if (form?.elements.attachment) form.elements.attachment.value = "";
  const preview = form?.querySelector("[data-support-file-preview]");
  if (preview) {
    preview.textContent = "";
    preview.hidden = true;
  }
}

function supportThreadId() {
  let id = localStorage.getItem(supportThreadStorageKey);
  if (!id) {
    const randomPart = window.crypto?.randomUUID?.().replaceAll("-", "") || `${Date.now()}${Math.random().toString(36).slice(2)}`;
    id = `support_${randomPart}`;
    localStorage.setItem(supportThreadStorageKey, id);
  }
  return id;
}

function newSupportConversation() {
  localStorage.removeItem(supportThreadStorageKey);
  clearSupportAttachment();
  const messagesBox = document.querySelector("[data-support-messages]");
  if (messagesBox) {
    messagesBox.innerHTML = '<p class="customer-support__empty">New conversation started. Send your message below.</p>';
  }
  supportThreadId();
}

function setCustomerSupportOpen(open) {
  const support = byId("customerSupport");
  if (!support) return;
  support.classList.toggle("is-collapsed", !open);
  support.setAttribute("aria-expanded", String(open));
  if (open) {
    const nameInput = byId("customerSupportForm")?.elements.customerName;
    if (nameInput && !nameInput.value) nameInput.value = localStorage.getItem(supportNameStorageKey) || "";
    refreshCustomerSupport();
  }
}

async function refreshCustomerSupport() {
  const messagesBox = document.querySelector("[data-support-messages]");
  if (!messagesBox) return;
  try {
    const response = await fetch(`/api/storefront/messages/${encodeURIComponent(supportThreadId())}`, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) return;
    const payload = await response.json();
    const messages = Array.isArray(payload.messages) ? payload.messages : [];
    messagesBox.innerHTML = messages.length
      ? messages.map((message) => `
        <article class="${message.sender === "customer" ? "is-customer" : ""}">
          <b>${message.sender === "customer" ? "You" : "Averon Support"}</b>
          <p>${escapeHtml(message.detail)}</p>
          ${supportAttachmentMarkup(message.attachment)}
        </article>`).join("")
      : '<p class="customer-support__empty">Start a conversation with Averon Support.</p>';
    messagesBox.scrollTop = messagesBox.scrollHeight;
  } catch {
    // Keep the panel available while a temporary connection recovers.
  }
}

function applySearchFromLocation() {
  const searchParam = searchQueryFromLocation();
  if (searchParam === null) return;
  state.query = searchParam;
  const input = byId("searchInput");
  if (input) {
    input.value = searchParam;
  }
}

function syncRouteFromLocation() {
  applySearchFromLocation();
  renderProducts();

  const reviewsProductId = reviewsProductIdFromLocation();
  if (reviewsProductId) {
    openProductReviews(reviewsProductId, { pushUrl: false });
    return;
  }

  const productId = productIdFromLocation();
  if (productId) {
    setSearchResultsOpen(false);
    renderProductPage(productId, null, { pushUrl: false, source: "url" });
    return;
  }

  if (document.body.classList.contains("product-view-open")) {
    closeProductPage({ restore: false, updateUrl: false });
  }
  closeReviewsPage();

  const searchListing = searchListingFromLocation();
  if (searchListing) {
    openListingPage(searchListing.key, { pushUrl: false, query: searchListing.query });
    return;
  }

  const listingKey = listingPageFromLocation();
  if (listingKey) {
    openListingPage(listingKey, { pushUrl: false, query: "" });
    return;
  }

  state.resultsView = { type: "search" };
  setSearchResultsOpen(appPathname().startsWith("/search/") || new URLSearchParams(window.location.search).has("search"));
}

function openHomePage() {
  if (document.body.classList.contains("product-view-open")) {
    closeProductPage({ restore: false, updateUrl: false });
  }
  closeReviewsPage();
  closeCategoryPopup();
  setSideCategoryPanelOpen(false);
  setNavCategoryMenuOpen(false);
  setNewsletterOpen(false);
  closeSearchSuggestions();
  clearSearchQuery();
  state.category = "All";
  state.resultsView = { type: "search" };
  byId("categorySelect").value = "All";
  renderCategories();
  renderProducts();
  setSearchResultsOpen(false);
  document.title = "Averon | Multi-Vendor Ecommerce";
  pushRouteState(null, "/");
  window.scrollTo({ top: 0, behavior: window.matchMedia("(max-width: 900px)").matches ? "auto" : "smooth" });
}

function productCard(product, compact = false) {
  const details = productDetails[product.id] || {};
  const saveAmount = Math.max(0, (product.oldPrice || 0) - product.price);
  const badge = product.discount || details.tag || product.badge;
  const productTitle = localizedProductTitle(product);
  return `
    <article class="deal-card product-listing-card" role="button" tabindex="0" data-product-id="${product.id}" aria-label="Open ${escapeHtml(productTitle)} details">
      <div class="deal-media">
        ${badge ? `<span class="${product.discount ? "discount" : "seller-badge"}">${escapeHtml(product.discount ? badge : localizedText(badge))}</span>` : ""}
        <img src="${product.image}" alt="${escapeHtml(productTitle)}" loading="lazy" />
        <button class="quick-cart" type="button" data-add="${product.id}" aria-label="Add ${escapeHtml(productTitle)} to cart">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6h15l-2 8H8L6 6Z" />
            <path d="M6 6 5 3H2" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M12 10v4" />
            <path d="M10 12h4" />
          </svg>
        </button>
      </div>
      <div class="deal-body">
        <h3 data-product-title-text>${escapeHtml(productTitle)}</h3>
        <p class="product-desc">${escapeHtml(localizedProductDescription(product, details))}</p>
        <div class="price-line">
          <strong>${formatCurrency(product.price)}</strong>
          ${compact ? "" : `<del>${formatCurrency(product.oldPrice)}</del>`}
        </div>
        <div class="rating-line">
          ${ratingTriggerMarkup(product, compact)}
          <span class="rating-sold">${details.sold || product.reviews} ${escapeHtml(t("sold"))}</span>
        </div>
        <div class="product-detail-list">
          ${saveAmount && !compact ? `<span class="product-detail is-save">${escapeHtml(t("saveAmount", { amount: formatCurrency(saveAmount) }))}</span>` : ""}
          <span class="product-detail">${escapeHtml(localizedText(details.note || t("topSellingOnAveron")))}</span>
        </div>
      </div>
    </article>
  `;
}

function renderCategories() {
  byId("categorySelect").innerHTML = [
    `<option value="All">${escapeHtml(t("allCategories"))}</option>`,
    ...categories.map((category) => `<option value="${category.name}">${escapeHtml(localizedText(category.name))}</option>`)
  ].join("");
  byId("categorySelect").value = state.category;
  updateSearchPlaceholder();

  const activeSideName = state.sideCategoryName || "Clothing & Fashion";
  setSideAllCategoriesOpen(state.categoryPopupOpen);

  byId("sideCategories").innerHTML = sideCategoryMegaItems()
    .map(
      (category) => `
        <button class="${activeSideName === category.name ? "is-active" : ""}" type="button" data-side-category-name="${category.name}" aria-selected="${activeSideName === category.name}">
          <span class="category-label">${categoryIcon(category.icon)}<span>${escapeHtml(localizedText(category.name))}</span></span>
          <span class="category-arrow">&rsaquo;</span>
        </button>
      `
    )
    .join("");

  const sideCategoryFlyout = byId("sideCategoryFlyout");
  if (sideCategoryFlyout) {
    sideCategoryFlyout.innerHTML = sideCategoryContentMarkup(activeSideName);
  }

  const navCategoryDropdown = byId("navCategoryDropdown");
  if (navCategoryDropdown) {
    const activeNavName = state.navCategoryName || "Clothing & Fashion";
    navCategoryDropdown.innerHTML = `
      <div class="mega-category-rail" role="listbox" aria-label="Category departments">
        ${categoryPopupItems()
          .map(
            (category) => `
              <button class="${activeNavName === category.name ? "is-active" : ""}" type="button" data-nav-category-name="${escapeHtml(category.name)}" aria-selected="${activeNavName === category.name}">
                ${categoryIcon(category.icon)}
                <span>${escapeHtml(localizedText(category.name))}</span>
              </button>
            `
          )
          .join("")}
      </div>
      <div class="mega-category-content" data-mega-content>${sideCategoryContentMarkup(activeNavName)}</div>
    `;
  }

  const imageRailCategories = [
    ...sideCategoryNames.map((name) => categories.find((category) => category.name === name)).filter(Boolean),
    ...categories.filter((category) => !sideCategoryNames.includes(category.name))
  ];
  byId("circleCategories").innerHTML = imageRailCategories
    .map(
      (category) => `
        <button class="circle-category" type="button" data-category="${category.name}">
          <img src="${category.image}" alt="${escapeHtml(localizedText(category.name))}" loading="lazy" />
          <span>${escapeHtml(localizedText(category.name)).replace(" &amp; ", " &amp;<br />")}</span>
        </button>
      `
    )
    .join("");
  window.requestAnimationFrame(updateCategoryRailControls);

  const categoryCards = byId("categoryCards");
  if (categoryCards) {
    categoryCards.innerHTML = categories
      .map(
        (category) => `
          <button class="category-tile" type="button" data-category="${category.name}">
            <img src="${category.image}" alt="${escapeHtml(localizedText(category.name))}" loading="lazy" />
            <span>
              <strong>${escapeHtml(localizedText(category.name))}</strong>
              <span>${escapeHtml(localizedText(category.offer))}</span>
            </span>
          </button>
        `
      )
      .join("");
  }
}

function flashSaleVisibleCount() {
  return 3;
}

function updateFlashSalePosition() {
  const track = byId("flashGrid");
  const cards = Array.from(track?.querySelectorAll(".deal-card") || []);
  if (!track || !cards.length) return;
  const maxIndex = Math.max(0, cards.length - flashSaleVisibleCount());
  state.flashIndex = Math.max(0, Math.min(state.flashIndex, maxIndex));
  const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
  const step = cards[0].getBoundingClientRect().width + gap;
  track.style.transform = `translateX(${-state.flashIndex * step}px)`;
}

function moveFlashSale(direction = 1) {
  const track = byId("flashGrid");
  const cards = track?.querySelectorAll(".deal-card") || [];
  const maxIndex = Math.max(0, cards.length - flashSaleVisibleCount());
  if (!track || !cards.length || maxIndex <= 0) return;
  state.flashIndex = state.flashIndex + direction > maxIndex ? 0 : state.flashIndex + direction < 0 ? maxIndex : state.flashIndex + direction;
  updateFlashSalePosition();
}

function startFlashSaleAuto() {
  window.clearInterval(flashSaleTimer);
  flashSaleTimer = window.setInterval(() => moveFlashSale(1), 2600);
}

function renderFlashSale(products) {
  const track = byId("flashGrid");
  if (!track) return;
  window.clearInterval(flashSaleTimer);
  state.flashIndex = 0;
  track.style.transform = "";
  track.innerHTML = products.length ? products.map((product) => productCard(product, true)).join("") : emptyState();
  window.requestAnimationFrame(() => {
    updateFlashSalePosition();
    startFlashSaleAuto();
  });
}

function renderProducts() {
  const flash = flashProducts.filter(productMatches);
  const best = bestProducts.filter(productMatches);

  renderFlashSale(flash);
  byId("bestGrid").innerHTML = best.length ? best.map((product) => productCard(product)).join("") : emptyState();
  renderDealSpotlight();
}

function renderSearchResults() {
  const page = byId("searchResults");
  const grid = byId("searchResultsGrid");
  if (!page || !grid) return;

  const listing = state.resultsView?.type === "listing" ? listingPages[state.resultsView.key] : null;
  const query = listing ? (state.resultsView.query || "").trim() : state.query.trim();
  const queryLabel = formatQueryLabel(query);
  const products = listing ? productsForListing(state.resultsView.key, query) : allProducts.filter(productMatches);
  const title = listing
    ? query
      ? `${queryLabel} ${localizedText(listing.title)}`
      : localizedText(listing.title)
    : query
      ? `${t("results")} "${queryLabel}"`
      : t("searchResults");
  const eyebrow = listing ? localizedText(listing.eyebrow) : t("searchResults");
  const meta = listing
    ? query
      ? t("itemsAvailable", { count: products.length })
      : t("listingItemsAvailable", { meta: localizedText(listing.meta), count: products.length })
    : t("searchFound", { count: products.length });

  page.querySelector(".search-results-head > span").textContent = eyebrow;
  byId("searchResultsTitle").textContent = title;
  byId("searchResultsMeta").textContent = meta;
  grid.innerHTML = products.length ? products.map((product) => productCard(product)).join("") : emptyState();
}

function renderReviewsPage(product) {
  const page = byId("reviewsPage");
  if (!page || !product) return;
  const details = productDetails[product.id] || {};
  const productTitle = localizedProductTitle(product);
  const count = reviewCount(product);
  const distribution = ratingDistribution(product);
  const samples = productReviewSamples(product);
  page.innerHTML = `
    <button class="product-back" type="button" data-close-reviews>&larr; ${escapeHtml(t("backToStore"))}</button>
    <article class="reviews-layout">
      <section class="reviews-summary-card">
        <img src="${product.image}" alt="${escapeHtml(productTitle)}" loading="lazy" />
        <div>
          <span>${escapeHtml(localizedText(product.category))} / ${escapeHtml(t("averonVerified"))}</span>
          <h1>${escapeHtml(productTitle)}</h1>
          <div class="reviews-score-line">
            ${starRatingMarkup(product.rating)}
            <strong>${escapeHtml(t("outOfFive", { rating: product.rating }))}</strong>
          </div>
          <p>${escapeHtml(t("globalRatings", { count: count.toLocaleString() }))}</p>
        </div>
      </section>
      <section class="reviews-breakdown-card">
        <h2>${escapeHtml(t("ratingBreakdown"))}</h2>
        <div class="rating-bars rating-bars--page">
          ${distribution
            .map(
              (percent, index) => `
                <div class="rating-bar">
                  <span>${5 - index} star</span>
                  <i><b style="width:${percent}%"></b></i>
                  <strong>${percent}%</strong>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
      <section class="customer-review-list">
        <div class="reviews-list-head">
          <span>${escapeHtml(t("customerReviews"))}</span>
          <h2>${escapeHtml(productTitle)}</h2>
          <p>${escapeHtml(details.description || localizedProductDescription(product, details))}</p>
        </div>
        ${samples
          .map(
            (review) => `
              <article class="customer-review">
                <div class="customer-review__avatar">${escapeHtml(String(review.name || "A").trim().charAt(0).toUpperCase() || "A")}</div>
                <div>
                  <header>
                    <strong>${escapeHtml(review.name)}</strong>
                    ${starRatingMarkup(review.rating || product.rating)}
                  </header>
                  <h3>${escapeHtml(review.title || "Verified review")}</h3>
                  <p>${escapeHtml(review.body || review.review || "")}</p>
                </div>
              </article>
            `
          )
          .join("")}
      </section>
    </article>
  `;
}

function setReviewsPageOpen(open, product = null) {
  const page = byId("reviewsPage");
  if (!page) return;
  page.hidden = !open;
  document.body.classList.toggle("reviews-view-open", open);
  if (open && product) {
    renderReviewsPage(product);
  }
}

function openProductReviews(productId, options = {}) {
  const { pushUrl = true } = options;
  const product = allProducts.find((entry) => entry.id === productId);
  if (!product) return;
  closeSearchSuggestions();
  closeCategoryPopup();
  setSideCategoryPanelOpen(false);
  setNavCategoryMenuOpen(false);
  if (document.body.classList.contains("product-view-open")) {
    closeProductPage({ restore: false, updateUrl: false });
  }
  setSearchResultsOpen(false);
  setReviewsPageOpen(true, product);
  document.title = `${t("customerReviews")} | ${localizedProductTitle(product)} | Averon`;
  if (pushUrl) {
    pushRouteState({ reviewsProductId: product.id }, reviewPageUrl(product));
  }
  byId("reviewsPage")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeReviewsPage(options = {}) {
  const { updateUrl = false } = options;
  setReviewsPageOpen(false);
  if (updateUrl && /^\/reviews\//.test(appPathname())) {
    pushRouteState(null, "/");
  }
}

function setSearchResultsOpen(open) {
  const page = byId("searchResults");
  if (!page) return;
  page.hidden = !open;
  document.body.classList.toggle("search-view-open", open);
  if (open) {
    renderSearchResults();
  }
}

function openListingPage(key, options = {}) {
  const { pushUrl = true, query } = options;
  const listing = listingPages[key];
  if (!listing) return;
  closeSearchSuggestions();
  const activeQuery = (query === undefined ? state.query : query).trim();

  if (document.body.classList.contains("product-view-open")) {
    closeProductPage({ restore: false, updateUrl: false });
  }
  closeReviewsPage();
  closeCategoryPopup();
  setSideCategoryPanelOpen(false);
  setNavCategoryMenuOpen(false);
  state.query = activeQuery;
  const searchInput = byId("searchInput");
  if (searchInput) {
    searchInput.value = activeQuery;
  }
  state.category = "All";
  state.resultsView = { type: "listing", key, query: activeQuery };
  byId("categorySelect").value = "All";
  renderCategories();
  renderProducts();
  setSearchResultsOpen(true);
  document.title = `${activeQuery ? `${formatQueryLabel(activeQuery)} ` : ""}${listing.title} | Averon`;
  if (pushUrl) {
    pushRouteState(null, activeQuery ? `/search/${slugify(activeQuery)}/${key}` : listing.path);
  }
  byId("searchResults").scrollIntoView({ behavior: "smooth", block: "start" });
}

function brandLogoCard(brand) {
  return `
    <article class="brand-logo">
      <img src="${brand.logo}" alt="${escapeHtml(brand.name)} logo" loading="lazy" onerror="this.remove()" />
      <strong>${escapeHtml(brand.name)}</strong>
      <span>${escapeHtml(brand.domain)}</span>
    </article>
  `;
}

function renderBrands() {
  const track = [...brands, ...brands].map(brandLogoCard).join("");
  byId("brandLogos").innerHTML = `<div class="brand-track" aria-hidden="true">${track}</div>`;
}

function stopBrandAuto() {
  window.clearInterval(brandAutoTimer);
}

function advanceBrandRail() {
  const rail = byId("brandLogos");
  const track = rail?.querySelector(".brand-track");
  const card = track?.querySelector(".brand-logo");
  if (!rail || !track || !card || !window.matchMedia("(max-width: 900px)").matches) return;

  const step = card.getBoundingClientRect().width + (Number.parseFloat(getComputedStyle(track).columnGap) || 0);
  const resetAt = track.scrollWidth / 2 - step;
  if (rail.scrollLeft >= resetAt) {
    rail.scrollTo({ left: 0, behavior: "auto" });
  } else {
    rail.scrollBy({ left: step, behavior: "smooth" });
  }
}

function startBrandAuto() {
  stopBrandAuto();
  if (!window.matchMedia("(max-width: 900px)").matches) return;
  brandAutoTimer = window.setInterval(advanceBrandRail, 3000);
}

function initBrandSwipe() {
  const rail = byId("brandLogos");
  if (!rail || rail.dataset.swipeReady === "true") return;

  let pointerId = null;
  let dragStart = 0;
  let scrollStart = 0;

  rail.dataset.swipeReady = "true";
  rail.addEventListener("pointerdown", (event) => {
    stopBrandAuto();
    if (event.pointerType !== "mouse" || !window.matchMedia("(max-width: 900px)").matches) return;
    pointerId = event.pointerId;
    dragStart = event.clientX;
    scrollStart = rail.scrollLeft;
    rail.classList.add("is-dragging");
    rail.setPointerCapture?.(pointerId);
  });
  rail.addEventListener("pointermove", (event) => {
    if (event.pointerId === pointerId) {
      rail.scrollLeft = scrollStart + dragStart - event.clientX;
    }
  });
  const finishSwipe = (event) => {
    if (event?.pointerId === pointerId) {
      rail.releasePointerCapture?.(pointerId);
      pointerId = null;
      rail.classList.remove("is-dragging");
    }
    startBrandAuto();
  };
  rail.addEventListener("pointerup", finishSwipe);
  rail.addEventListener("pointercancel", finishSwipe);
  rail.addEventListener("touchend", startBrandAuto, { passive: true });
  startBrandAuto();
}

function emptyState() {
  return `<div class="empty-state">${escapeHtml(t("noProducts"))}</div>`;
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  byId("cartCount").textContent = count;
  if (byId("mobileCartCount")) byId("mobileCartCount").textContent = count;
  byId("cartTotal").textContent = formatCurrency(cartTotal() + (count ? 220 : 0));

  if (!state.cart.length) {
    byId("cartItems").innerHTML = `<div class="empty-state">${escapeHtml(t("emptyCart"))}</div>`;
    return;
  }

  byId("cartItems").innerHTML = state.cart
    .map((item) => {
      const product = allProducts.find((entry) => entry.id === item.productId);
      if (!product) return "";
      const variant = cartVariantFromItem(product, item);
      const lineKey = cartLineKey(product.id, variant);
      const productTitle = localizedProductTitle(product);
      return `
        <article class="cart-item">
          <img src="${variant.image}" alt="${escapeHtml(productTitle)} ${escapeHtml(localizedText(variant.color))}" data-variant-tone="${escapeHtml(variant.tone || "")}" />
          <div>
            <h3>${escapeHtml(productTitle)}</h3>
            <span class="cart-variant-meta">${escapeHtml(t("color"))}: ${escapeHtml(localizedText(variant.color))}${variant.size ? ` &bull; ${escapeHtml(t("size"))}: ${escapeHtml(localizedText(variant.size))}` : ""}</span>
            <p>${formatCurrency(variant.price * item.qty)} <span>${formatCurrency(variant.price)} ${escapeHtml(t("each"))}</span></p>
            <div class="qty-row">
              <button type="button" data-decrease="${lineKey}" aria-label="${escapeHtml(t("decreaseQuantity"))}">-</button>
              <span>${item.qty}</span>
              <button type="button" data-increase="${lineKey}" aria-label="${escapeHtml(t("increaseQuantity"))}">+</button>
              <button class="remove-item" type="button" data-remove="${lineKey}">${escapeHtml(t("remove"))}</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function cartTotal() {
  return state.cart.reduce((sum, item) => {
    const product = allProducts.find((entry) => entry.id === item.productId);
    return product ? sum + cartVariantFromItem(product, item).price * item.qty : sum;
  }, 0);
}

function parseCurrency(value) {
  return Number(String(value || "").replace(/[^0-9.]/g, "")) || 0;
}

function cartLineKey(productId, variant = {}) {
  return [
    productId,
    slugify(variant.color || "standard"),
    slugify(variant.size || "standard"),
    Number(variant.price || 0)
  ].join("__");
}

function defaultCartVariant(product) {
  const variant = productVariants(product)[0] || {};
  return {
    color: variant.color || "Standard",
    size: "Standard",
    image: variant.image || product.image,
    tone: variant.tone || "",
    price: Number(variant.price || product.price),
    oldPrice: Number(variant.oldPrice || product.oldPrice)
  };
}

function cartVariantFromItem(product, item) {
  const fallback = defaultCartVariant(product);
  const color = item.color || fallback.color;
  const customVariants = hasCustomProductVariants(product);
  return {
    color,
    size: item.size || fallback.size,
    image: customVariants ? item.image || fallback.image : product.image,
    tone: customVariants ? "" : item.tone || productVariantTone(product, color),
    price: Number(item.price || fallback.price || product.price),
    oldPrice: Number(item.oldPrice || fallback.oldPrice || product.oldPrice)
  };
}

function activePurchaseVariant(productId) {
  const product = allProducts.find((entry) => entry.id === productId);
  if (!product) return {};
  const page = byId("productPage");
  const activeVariant = page?.querySelector("[data-product-variant].is-active");
  const activeSize = page?.querySelector("[data-product-size].is-active");
  const fallback = defaultCartVariant(product);
  return {
    color: activeVariant?.dataset.color || fallback.color,
    size: activeSize?.dataset.sizeValue || activeSize?.textContent?.trim() || fallback.size,
    image: activeVariant?.dataset.image || fallback.image,
    tone: activeVariant?.dataset.tone || fallback.tone,
    price: Number(activeVariant?.dataset.priceValue) || parseCurrency(activeVariant?.dataset.price) || fallback.price,
    oldPrice: Number(activeVariant?.dataset.oldPriceValue) || parseCurrency(activeVariant?.dataset.oldPrice) || fallback.oldPrice
  };
}

function addToCart(productId, qty = 1, options = {}) {
  const product = allProducts.find((entry) => entry.id === productId);
  if (!product) return;
  const amount = Math.max(1, Number(qty) || 1);
  const variant = { ...defaultCartVariant(product), ...options };
  const lineKey = cartLineKey(productId, variant);
  const item = state.cart.find((entry) => cartLineKey(entry.productId, cartVariantFromItem(product, entry)) === lineKey);
  if (item) {
    item.qty += amount;
  } else {
    state.cart.push({ productId, qty: amount, key: lineKey, ...variant });
  }
  saveCart();
  renderCart();
  showToast(t("cartAdded", { title: localizedProductTitle(product), color: localizedText(variant.color) }));
}

function changeQuantity(lineKey, delta) {
  const item = state.cart.find((entry) => {
    const product = allProducts.find((productEntry) => productEntry.id === entry.productId);
    return product ? cartLineKey(entry.productId, cartVariantFromItem(product, entry)) === lineKey : false;
  });
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) {
    state.cart = state.cart.filter((entry) => {
      const product = allProducts.find((productEntry) => productEntry.id === entry.productId);
      return product ? cartLineKey(entry.productId, cartVariantFromItem(product, entry)) !== lineKey : true;
    });
  }
  saveCart();
  renderCart();
}

function setCategory(categoryName, options = {}) {
  const { scroll = true } = options;
  state.category = categoryName;
  if (categoryName !== "All") {
    state.sideCategoryName = categoryName;
  }
  byId("categorySelect").value = categoryName;
  renderCategories();
  renderProducts();
  renderSearchSuggestions();
  if (state.query.trim()) {
    state.resultsView = { type: "search" };
    setSearchResultsOpen(true);
    renderSearchResults();
    pushRouteState(null, `/search/${slugify(state.query)}`);
    if (scroll) {
      byId("searchResults").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }
  if (scroll) {
    document.querySelector("#flashDeals").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function clearSearchQuery() {
  state.query = "";
  const input = byId("searchInput");
  if (input) {
    input.value = "";
  }
  closeSearchSuggestions();
}

function openCart() {
  byId("cartOverlay").hidden = false;
  byId("cartDrawer").hidden = false;
  document.documentElement.scrollLeft = 0;
  document.body.scrollLeft = 0;
  byId("cartDrawer").classList.add("is-open");
  byId("cartDrawer").setAttribute("aria-hidden", "false");
}

function closeCart() {
  byId("cartDrawer").classList.remove("is-open");
  byId("cartDrawer").setAttribute("aria-hidden", "true");
  document.documentElement.scrollLeft = 0;
  document.body.scrollLeft = 0;
  window.setTimeout(() => {
    byId("cartDrawer").hidden = true;
    byId("cartOverlay").hidden = true;
  }, 180);
}

function checkoutOrderItems() {
  return state.cart
    .map((item) => {
      const product = allProducts.find((entry) => entry.id === item.productId);
      if (!product) return null;
      const variant = cartVariantFromItem(product, item);
      return {
        productId: product.id,
        title: product.title,
        color: variant.color,
        size: variant.size,
        image: variant.image,
        quantity: item.qty,
        unitPrice: variant.price
      };
    })
    .filter(Boolean);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  byId("toast").textContent = message;
  byId("toast").classList.add("is-visible");
  toastTimer = window.setTimeout(() => byId("toast").classList.remove("is-visible"), 2400);
}

function setLocalePanelOpen(open) {
  const panel = byId("localePanel");
  const button = byId("localeButton");
  if (!panel || !button) return;
  panel.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
  if (!open) {
    setLanguagePickerOpen(false);
    setCurrencyPickerOpen(false);
    setCountryPickerOpen(false);
  }
}

const languageOptions = [
  { code: "EN", name: "English", nativeName: "English" },
  { code: "UR", name: "Urdu", nativeName: "اردو" },
  { code: "AR", name: "Arabic", nativeName: "العربية" },
  { code: "ZH", name: "Chinese", nativeName: "中文" },
  { code: "ES", name: "Spanish", nativeName: "Espanol" },
  { code: "DE", name: "German", nativeName: "Deutsch" },
  { code: "FR", name: "French", nativeName: "Francais" },
  { code: "TR", name: "Turkish", nativeName: "Turkce" },
  { code: "HI", name: "Hindi", nativeName: "हिन्दी" },
  { code: "PT", name: "Portuguese", nativeName: "Portugues" },
  { code: "IT", name: "Italian", nativeName: "Italiano" },
  { code: "RU", name: "Russian", nativeName: "Русский" },
  { code: "JA", name: "Japanese", nativeName: "日本語" },
  { code: "KO", name: "Korean", nativeName: "한국어" },
  { code: "BN", name: "Bengali", nativeName: "বাংলা" },
  { code: "ID", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  { code: "MS", name: "Malay", nativeName: "Bahasa Melayu" },
  { code: "FA", name: "Persian", nativeName: "فارسی" },
  { code: "HE", name: "Hebrew", nativeName: "עברית" },
  { code: "NL", name: "Dutch", nativeName: "Nederlands" },
  { code: "PL", name: "Polish", nativeName: "Polski" },
  { code: "SV", name: "Swedish", nativeName: "Svenska" },
  { code: "TH", name: "Thai", nativeName: "ไทย" },
  { code: "VI", name: "Vietnamese", nativeName: "Tiếng Việt" }
];

const rtlLocales = new Set(["AR", "UR", "FA", "HE"]);

function normalizeLanguageCode(value) {
  return String(value || "en").split(/[-_]/)[0].toUpperCase();
}

function languageDisplayLabel(code) {
  const language = languageOptions.find((option) => option.code === normalizeLanguageCode(code));
  return language ? `${language.nativeName} - ${language.code}` : normalizeLanguageCode(code);
}

function setLanguagePickerOpen(open) {
  const menu = byId("languagePickerMenu");
  const button = byId("languagePickerButton");
  if (!menu || !button) return;
  menu.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
  if (open) {
    const input = byId("languageSearchInput");
    if (input) {
      input.value = "";
      renderLanguageSearchOptions();
      window.requestAnimationFrame(() => input.focus());
    }
  }
}

function renderLanguageSearchOptions(filter = "") {
  const list = byId("languageOptionList");
  if (!list) return;
  const query = String(filter || "").trim().toLowerCase();
  const visibleLanguages = languageOptions.filter((language) => {
    const haystack = `${language.code} ${language.name} ${language.nativeName} ${languageDisplayLabel(language.code)}`.toLowerCase();
    return !query || haystack.includes(query);
  });
  list.innerHTML = visibleLanguages.length
    ? visibleLanguages
        .map(
          (language) => `
            <button class="language-option ${state.localeCode === language.code ? "is-active" : ""}" type="button" data-language-code="${escapeHtml(language.code)}" role="option" aria-selected="${state.localeCode === language.code}">
              <strong>${escapeHtml(language.nativeName)} - ${escapeHtml(language.code)}</strong>
              <span>${escapeHtml(language.nativeName)}</span>
            </button>
          `
        )
        .join("")
    : `<div class="language-option language-option--empty">${escapeHtml(t("noProducts"))}</div>`;
}

function languageCodeFromSearch(value) {
  const query = String(value || "").trim().toLowerCase();
  if (!query) return "";
  const directCode = normalizeLanguageCode(query);
  const exact = languageOptions.find((language) => {
    const label = languageDisplayLabel(language.code).toLowerCase();
    return (
      language.code.toLowerCase() === query ||
      label === query ||
      language.name.toLowerCase() === query ||
      language.nativeName.toLowerCase() === query
    );
  });
  if (exact) return exact.code;
  const partial = languageOptions.find((language) => {
    const haystack = `${language.code} ${language.name} ${language.nativeName} ${languageDisplayLabel(language.code)}`.toLowerCase();
    return haystack.includes(query) || language.code === directCode;
  });
  return partial?.code || "";
}

function setCurrencyPickerOpen(open) {
  const menu = byId("currencyPickerMenu");
  const button = byId("currencyPickerButton");
  if (!menu || !button) return;
  menu.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
  if (open) {
    const input = byId("currencySearchInput");
    if (input) {
      input.value = "";
      renderCurrencySearchOptions();
      window.requestAnimationFrame(() => input.focus());
    }
  }
}

function renderCurrencySearchOptions(filter = "") {
  const list = byId("currencyOptionList");
  if (!list) return;
  const query = String(filter || "").trim().toLowerCase();
  const visibleCurrencies = currencyCodes.filter((code) => {
    const haystack = `${code} ${currencyDisplayName(code)} ${currencyDisplayLabel(code)}`.toLowerCase();
    return !query || haystack.includes(query);
  });
  list.innerHTML = visibleCurrencies.length
    ? visibleCurrencies
        .map(
          (code) => `
            <button class="language-option currency-option ${state.currencyCode === code ? "is-active" : ""}" type="button" data-currency-option="${escapeHtml(code)}" role="option" aria-selected="${state.currencyCode === code}">
              <strong>${escapeHtml(code)}</strong>
              <span>${escapeHtml(currencyDisplayName(code))}</span>
            </button>
          `
        )
        .join("")
    : `<div class="language-option language-option--empty">${escapeHtml(t("noCurrencyFound"))}</div>`;
}

function currencyCodeFromSearch(value) {
  const query = String(value || "").trim().toLowerCase();
  if (!query) return "";
  const exact = currencyCodes.find((code) => {
    return code.toLowerCase() === query || currencyDisplayName(code).toLowerCase() === query || currencyDisplayLabel(code).toLowerCase() === query;
  });
  if (exact) return exact;
  return currencyCodes.find((code) => `${code} ${currencyDisplayName(code)}`.toLowerCase().includes(query)) || "";
}

function setCountryPickerOpen(open) {
  const menu = byId("countryPickerMenu");
  const button = byId("countryPickerButton");
  if (!menu || !button) return;
  menu.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
  if (open) {
    const input = byId("countrySearchInput");
    if (input) {
      input.value = "";
      renderCountrySearchOptions();
      window.requestAnimationFrame(() => input.focus());
    }
  }
}

function updateCountryDisplay() {
  const label = byId("shoppingRegionLabel");
  const name = byId("shoppingRegionName");
  const value = byId("countryValue");
  if (label) {
    label.textContent = t("shoppingRegion");
  }
  if (name) {
    name.textContent = countryDisplayLabel(state.countryCode);
  }
  if (value) {
    value.value = state.countryCode;
  }
}

function renderCountrySearchOptions(filter = "") {
  const list = byId("countryOptionList");
  if (!list) return;
  const query = String(filter || "").trim().toLowerCase();
  const visibleCountries = countryCodes.filter((code) => {
    const englishName = countryDisplayName(code, "en");
    const localizedName = countryDisplayName(code);
    const currency = currencyByRegion[code] || "";
    return !query || `${code} ${englishName} ${localizedName} ${currency}`.toLowerCase().includes(query);
  });
  list.innerHTML = visibleCountries.length
    ? visibleCountries
        .map((code) => {
          const currency = currencyByRegion[code] || "";
          return `
            <button class="language-option country-option ${state.countryCode === code ? "is-active" : ""}" type="button" data-country-option="${escapeHtml(code)}" role="option" aria-selected="${state.countryCode === code}">
              <strong>${escapeHtml(countryDisplayName(code))}</strong>
              <span>${escapeHtml(currency ? currencyDisplayLabel(currency) : code)}</span>
            </button>
          `;
        })
        .join("")
    : `<div class="language-option language-option--empty">${escapeHtml(t("noCountryFound"))}</div>`;
}

function countryCodeFromSearch(value) {
  const query = String(value || "").trim().toLowerCase();
  if (!query) return "";
  const exact = countryCodes.find((code) => {
    return code.toLowerCase() === query || countryDisplayName(code, "en").toLowerCase() === query || countryDisplayName(code).toLowerCase() === query;
  });
  if (exact) return exact;
  return (
    countryCodes.find((code) => {
      const currency = currencyByRegion[code] || "";
      return `${code} ${countryDisplayName(code, "en")} ${countryDisplayName(code)} ${currency}`.toLowerCase().includes(query);
    }) || ""
  );
}

function currencyForVisitorRegion(timeZone, locales = []) {
  if (currencyByTimeZone[timeZone]) {
    return currencyByTimeZone[timeZone];
  }
  for (const locale of locales) {
    let region = "";
    try {
      region = typeof Intl.Locale === "function" ? new Intl.Locale(locale).region || "" : "";
    } catch (error) {
      region = "";
    }
    if (!region) {
      region = locale.match(/[-_]([A-Za-z]{2})\b/)?.[1]?.toUpperCase() || "";
    }
    if (currencyByRegion[region]) {
      return currencyByRegion[region];
    }
  }
  return "PKR";
}

function detectVisitorCountry() {
  let timeZone = "";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch (error) {
    timeZone = "";
  }
  if (countryByTimeZone[timeZone]) {
    return countryByTimeZone[timeZone];
  }
  const locales = [...(navigator.languages || []), navigator.language].filter(Boolean);
  for (const locale of locales) {
    let region = "";
    try {
      region = typeof Intl.Locale === "function" ? new Intl.Locale(locale).region || "" : "";
    } catch (error) {
      region = "";
    }
    if (!region) {
      region = locale.match(/[-_]([A-Za-z]{2})\b/)?.[1]?.toUpperCase() || "";
    }
    if (countryCodes.includes(region)) {
      return region;
    }
  }
  return "PK";
}

function detectVisitorCurrency() {
  let timeZone = "";
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch (error) {
    timeZone = "";
  }
  return currencyForVisitorRegion(timeZone, [...(navigator.languages || []), navigator.language].filter(Boolean));
}

async function loadCurrencyExchangeRates() {
  try {
    const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/pkr.min.json", {
      cache: "force-cache"
    });
    if (!response.ok) return;
    const data = await response.json();
    const rates = data.pkr || {};
    const loadedRates = {};
    currencyCodes.forEach((code) => {
      const rate = Number(rates[code.toLowerCase()]);
      if (Number.isFinite(rate) && rate > 0) {
        loadedRates[code] = rate;
      }
    });
    currencyRates = { ...currencyRates, ...loadedRates, PKR: 1 };
    localStorage.setItem("averon-currency-rates", JSON.stringify(loadedRates));
    renderCurrencySearchOptions(byId("currencySearchInput")?.value || "");
    selectCurrency(state.currencyCode, { silent: true, skipSave: true });
  } catch (error) {
    // Keep the built-in regional rates available if the live currency feed is offline.
  }
}

function selectLocale(code, key = "other", options = {}) {
  const normalizedCode = normalizeLanguageCode(code);
  state.localeCode = normalizedCode;
  state.localeKey = key;
  document.documentElement.lang = normalizedCode.toLowerCase();
  document.documentElement.dir = rtlLocales.has(normalizedCode) ? "rtl" : "ltr";
  document.body.classList.toggle("is-rtl", rtlLocales.has(normalizedCode));
  if (!options.skipSave) {
    localStorage.setItem("averon-language", normalizedCode);
    if (options.manual) {
      localStorage.setItem("averon-language-source", "manual");
    }
  }
  document.querySelectorAll("[data-locale-option]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.localeOption === key);
  });
  document.querySelectorAll("[data-locale-code]").forEach((label) => {
    label.textContent = normalizedCode;
  });
  const languageValue = byId("otherLanguageSelect");
  const languageLabel = byId("languagePickerLabel");
  if (languageValue) {
    languageValue.value = options.keepLanguagePlaceholder ? "" : normalizedCode;
  }
  if (languageLabel) {
    languageLabel.textContent = options.keepLanguagePlaceholder ? t("selectLanguage") : languageDisplayLabel(normalizedCode);
  }
  renderLanguageSearchOptions(byId("languageSearchInput")?.value || "");
  renderCategories();
  renderHero();
  renderProducts();
  applyLocaleTranslations();
  const currencyLabel = byId("currencyPickerLabel");
  if (currencyLabel) {
    currencyLabel.textContent = currencyDisplayLabel(state.currencyCode);
  }
  renderCurrencySearchOptions(byId("currencySearchInput")?.value || "");
  if (!byId("searchResults")?.hidden) {
    renderSearchResults();
  }
  if (state.categoryPopupOpen) {
    renderCategoryPopup();
  }
  renderCart();
  const openProductId = byId("productPage")?.dataset.productId;
  if (document.body.classList.contains("product-view-open") && openProductId) {
    renderProductPage(openProductId, null, { pushUrl: false, source: "locale", preserveScroll: true });
  }
  if (!options.silent) {
    showToast(t("languageSwitched", { code: normalizedCode }));
  }
}

function selectCurrency(code, options = {}) {
  const normalizedCode = currencyCodes.includes(String(code || "").toUpperCase()) ? String(code).toUpperCase() : "PKR";
  state.currencyCode = normalizedCode;
  if (!options.skipSave) {
    localStorage.setItem("averon-currency", normalizedCode);
    if (options.manual) {
      localStorage.setItem("averon-currency-source", "manual");
    }
  }
  document.querySelectorAll("[data-currency-option]").forEach((button) => {
    const isActive = button.dataset.currencyOption === normalizedCode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  document.querySelectorAll("[data-currency-code]").forEach((label) => {
    label.textContent = normalizedCode;
  });
  const stripCurrencyButton = document.querySelector(".top-links button");
  if (stripCurrencyButton) {
    stripCurrencyButton.textContent = normalizedCode;
    stripCurrencyButton.dataset.toast = t("currencySwitched", { code: normalizedCode });
  }
  const currencyValue = byId("currencyValue");
  const currencyLabel = byId("currencyPickerLabel");
  if (currencyValue) {
    currencyValue.value = normalizedCode;
  }
  if (currencyLabel) {
    currencyLabel.textContent = currencyDisplayLabel(normalizedCode);
  }
  renderCurrencySearchOptions(byId("currencySearchInput")?.value || "");
  renderProducts();
  if (!byId("searchResults")?.hidden) {
    renderSearchResults();
  }
  renderCart();
  const openProductId = byId("productPage")?.dataset.productId;
  if (document.body.classList.contains("product-view-open") && openProductId) {
    renderProductPage(openProductId, null, { pushUrl: false, source: "currency", preserveScroll: true });
  }
  if (!options.silent) {
    showToast(t("currencySwitched", { code: normalizedCode }));
  }
}

function selectCountry(code, options = {}) {
  const normalizedCode = countryCodes.includes(String(code || "").toUpperCase()) ? String(code).toUpperCase() : "PK";
  state.countryCode = normalizedCode;
  if (!options.skipSave) {
    localStorage.setItem("averon-country", normalizedCode);
  }
  updateCountryDisplay();
  renderCountrySearchOptions(byId("countrySearchInput")?.value || "");
  const currency = currencyByRegion[normalizedCode];
  if (currency && options.syncCurrency !== false) {
    selectCurrency(currency, { manual: true, silent: true });
  }
  if (!options.silent) {
    showToast(t("countrySwitched", { country: countryDisplayName(normalizedCode), currency: currency || state.currencyCode }));
  }
}

function initLocalePreference() {
  const savedLanguage = localStorage.getItem("averon-language");
  const hasManualLanguage = localStorage.getItem("averon-language-source") === "manual";
  if (savedLanguage && (hasManualLanguage || savedLanguage !== "EN")) {
    selectLocale(savedLanguage, "other", { silent: true });
    return;
  }
  selectLocale("EN", "default", { silent: true, keepLanguagePlaceholder: true, skipSave: true });
}

function initCountryPreference() {
  const savedCountry = localStorage.getItem("averon-country");
  selectCountry(savedCountry || detectVisitorCountry(), { silent: true, skipSave: true, syncCurrency: false });
}

function initCurrencyPreference() {
  const savedCurrency = localStorage.getItem("averon-currency");
  const hasManualCurrency = localStorage.getItem("averon-currency-source") === "manual";
  const regionalCurrency = currencyByRegion[state.countryCode] || detectVisitorCurrency();
  selectCurrency(savedCurrency && hasManualCurrency ? savedCurrency : regionalCurrency, { silent: true, skipSave: true });
}

function updateTimer() {
  state.timerSeconds = Math.max(0, state.timerSeconds - 1);
  const hours = Math.floor(state.timerSeconds / 3600);
  const minutes = Math.floor((state.timerSeconds % 3600) / 60);
  const seconds = state.timerSeconds % 60;
  const values = {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0")
  };
  byId("hours").textContent = values.hours;
  byId("minutes").textContent = values.minutes;
  byId("seconds").textContent = values.seconds;
  document.querySelectorAll("[data-spotlight-hours]").forEach((element) => {
    element.textContent = values.hours;
  });
  document.querySelectorAll("[data-spotlight-minutes]").forEach((element) => {
    element.textContent = values.minutes;
  });
  document.querySelectorAll("[data-spotlight-seconds]").forEach((element) => {
    element.textContent = values.seconds;
  });
}

function setMegaActive(key) {
  document.querySelectorAll("#navCategoryDropdown [data-mega-key]").forEach((button) => {
    const isActive = button.dataset.megaKey === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  const content = document.querySelector("[data-mega-content]");
  if (content) {
    content.innerHTML = megaContentMarkup(key);
  }
}

function setNavCategoryActive(categoryName) {
  state.navCategoryName = categoryName;
  document.querySelectorAll("#navCategoryDropdown [data-nav-category-name]").forEach((button) => {
    const isActive = button.dataset.navCategoryName === categoryName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  const content = document.querySelector("#navCategoryDropdown [data-mega-content]");
  if (content) {
    content.innerHTML = sideCategoryContentMarkup(categoryName);
  }
}

function setSideCategoryActive(categoryName) {
  state.sideCategoryName = categoryName;
  setSideAllCategoriesOpen(false);
  document.querySelectorAll("#sideCategories [data-side-category-name]").forEach((button) => {
    const isActive = button.dataset.sideCategoryName === categoryName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  const content = document.querySelector("[data-side-mega-content]");
  if (content) {
    content.innerHTML = sideCategoryContentMarkup(categoryName);
  }
}

function setNavCategoryMenuOpen(open) {
  const menu = document.querySelector(".nav-category-menu");
  const button = document.querySelector(".shop-button");
  if (!menu || !button) return;
  menu.classList.toggle("is-open", open);
  button.setAttribute("aria-expanded", String(open));
}

function setSideCategoryPanelOpen(open) {
  const panel = byId("categoryPanel");
  if (!panel) return;
  panel.classList.toggle("is-open", open);
}

const navCategoryMenu = document.querySelector(".nav-category-menu");
if (navCategoryMenu) {
  navCategoryMenu.addEventListener("pointerenter", () => setNavCategoryMenuOpen(true));
  navCategoryMenu.addEventListener("pointerleave", () => setNavCategoryMenuOpen(false));
  navCategoryMenu.addEventListener("mouseenter", () => setNavCategoryMenuOpen(true));
  navCategoryMenu.addEventListener("mouseleave", () => setNavCategoryMenuOpen(false));
  navCategoryMenu.addEventListener("focusin", () => setNavCategoryMenuOpen(true));
  navCategoryMenu.addEventListener("focusout", (event) => {
    if (!navCategoryMenu.contains(event.relatedTarget)) {
      setNavCategoryMenuOpen(false);
    }
  });
}

const sideCategoryPanel = byId("categoryPanel");
if (sideCategoryPanel) {
  sideCategoryPanel.addEventListener("pointerenter", () => setSideCategoryPanelOpen(true));
  sideCategoryPanel.addEventListener("pointerleave", () => setSideCategoryPanelOpen(false));
  sideCategoryPanel.addEventListener("mouseenter", () => setSideCategoryPanelOpen(true));
  sideCategoryPanel.addEventListener("mouseleave", () => setSideCategoryPanelOpen(false));
  sideCategoryPanel.addEventListener("focusin", () => setSideCategoryPanelOpen(true));
  sideCategoryPanel.addEventListener("focusout", (event) => {
    if (!sideCategoryPanel.contains(event.relatedTarget)) {
      setSideCategoryPanelOpen(false);
    }
  });
}

document.addEventListener("mouseover", (event) => {
  const popupItem = event.target.closest("[data-popup-category-name]");
  if (popupItem) {
    setCategoryPopupActive(popupItem.dataset.popupCategoryName);
    return;
  }

  const sideItem = event.target.closest("[data-side-category-name]");
  if (sideItem) {
    setSideCategoryActive(sideItem.dataset.sideCategoryName);
    setSideCategoryPanelOpen(true);
    return;
  }

  const navCategoryItem = event.target.closest("[data-nav-category-name]");
  if (navCategoryItem) {
    setNavCategoryActive(navCategoryItem.dataset.navCategoryName);
    setNavCategoryMenuOpen(true);
    return;
  }

  const item = event.target.closest("[data-mega-key]");
  if (item) {
    setMegaActive(item.dataset.megaKey);
  }
});

document.addEventListener("focusin", (event) => {
  const popupItem = event.target.closest("[data-popup-category-name]");
  if (popupItem) {
    setCategoryPopupActive(popupItem.dataset.popupCategoryName);
    return;
  }

  const sideItem = event.target.closest("[data-side-category-name]");
  if (sideItem) {
    setSideCategoryActive(sideItem.dataset.sideCategoryName);
    setSideCategoryPanelOpen(true);
    return;
  }

  const navCategoryItem = event.target.closest("[data-nav-category-name]");
  if (navCategoryItem) {
    setNavCategoryActive(navCategoryItem.dataset.navCategoryName);
    setNavCategoryMenuOpen(true);
    return;
  }

  const item = event.target.closest("[data-mega-key]");
  if (item) {
    setMegaActive(item.dataset.megaKey);
  }
});

document.addEventListener(
  "click",
  (event) => {
    const reviewButton = event.target.closest?.("[data-open-reviews]");
    if (!reviewButton) return;
    event.preventDefault();
    event.stopPropagation();
    openProductReviews(reviewButton.dataset.openReviews);
  },
  true
);

document.addEventListener("click", (event) => {
  if (!event.target.closest("#searchForm")) {
    closeSearchSuggestions();
  }
  if (!event.target.closest("#localeSwitcher")) {
    setLocalePanelOpen(false);
  } else {
    if (!event.target.closest("[data-language-picker]")) {
      setLanguagePickerOpen(false);
    }
    if (!event.target.closest("[data-currency-picker]")) {
      setCurrencyPickerOpen(false);
    }
    if (!event.target.closest("[data-country-picker]")) {
      setCountryPickerOpen(false);
    }
  }
  if (!event.target.closest(".rating-menu-wrap")) {
    closeRatingSummaries();
  }

  const productCardElement = event.target.closest(".product-listing-card[data-product-id]");
  if (productCardElement && !event.target.closest("button")) {
    const selection = window.getSelection?.();
    const selectedRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
    const hasCardTextSelection =
      selection &&
      !selection.isCollapsed &&
      selection.toString().trim() &&
      selectedRange &&
      productCardElement.contains(selectedRange.commonAncestorContainer);
    if (event.target.closest("[data-product-title-text]") || hasCardTextSelection) {
      return;
    }
    renderProductPage(productCardElement.dataset.productId, productCardElement, { source: "card" });
    return;
  }

  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.ratingToggle) {
    event.stopPropagation();
    const wrap = button.closest(".rating-menu-wrap");
    const willOpen = !wrap?.classList.contains("is-open");
    closeRatingSummaries(wrap);
    wrap?.classList.toggle("is-open", willOpen);
    wrap?.querySelector(".rating-popover")?.classList.toggle("is-visible", willOpen);
    wrap?.closest(".deal-card")?.classList.toggle("has-rating-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
    return;
  }
  if (button.dataset.closeRating !== undefined) {
    event.stopPropagation();
    closeRatingSummaries();
    return;
  }
  if (button.dataset.openReviews) {
    event.stopPropagation();
    openProductReviews(button.dataset.openReviews);
    return;
  }
  if (button.dataset.closeReviews !== undefined) {
    event.stopPropagation();
    closeReviewsPage({ updateUrl: true });
    openHomePage();
    return;
  }
  if (button.dataset.searchSuggestion) {
    byId("searchInput").value = button.dataset.searchSuggestion;
    submitStoreSearch(button.dataset.searchSuggestion);
    return;
  }
  if (button.dataset.localeToggle !== undefined) {
    event.stopPropagation();
    const panel = byId("localePanel");
    setLocalePanelOpen(panel?.hidden !== false);
    return;
  }
  if (button.dataset.languageToggle !== undefined) {
    event.stopPropagation();
    const menu = byId("languagePickerMenu");
    setLanguagePickerOpen(menu?.hidden !== false);
    return;
  }
  if (button.dataset.currencyToggle !== undefined) {
    event.stopPropagation();
    const menu = byId("currencyPickerMenu");
    setCurrencyPickerOpen(menu?.hidden !== false);
    return;
  }
  if (button.dataset.countryToggle !== undefined) {
    event.stopPropagation();
    const menu = byId("countryPickerMenu");
    setCountryPickerOpen(menu?.hidden !== false);
    return;
  }
  if (button.dataset.languageCode) {
    selectLocale(button.dataset.languageCode, "other", { manual: true });
    setLanguagePickerOpen(false);
    return;
  }
  if (button.dataset.localeOption) {
    selectLocale(button.dataset.localeValue || button.dataset.localeOption, button.dataset.localeOption, { manual: true });
    return;
  }
  if (button.dataset.currencyOption) {
    selectCurrency(button.dataset.currencyOption, { manual: true });
    setCurrencyPickerOpen(false);
    return;
  }
  if (button.dataset.countryOption) {
    selectCountry(button.dataset.countryOption);
    setCountryPickerOpen(false);
    return;
  }
  if (button.dataset.closeProduct !== undefined) {
    closeProductPage();
    return;
  }
  if (button.dataset.detailImage !== undefined) {
    const page = button.closest("#productPage");
    const mainImage = page?.querySelector("[data-main-product-image]");
    if (mainImage) {
      mainImage.src = button.dataset.detailImage;
      mainImage.dataset.variantTone = button.dataset.detailTone || "";
      mainImage.style.transform = "";
      mainImage.style.transformOrigin = "center";
    }
    button.closest(".product-thumbnails")?.querySelectorAll("[data-detail-image]").forEach((thumbnail) => {
      thumbnail.classList.toggle("is-active", thumbnail === button);
    });
    return;
  }
  if (button.dataset.productVariant !== undefined) {
    const page = button.closest("#productPage");
    const mainImage = page?.querySelector("[data-main-product-image]");
    const selectedColor = page?.querySelector("[data-selected-color]");
    const detailPrice = page?.querySelector("[data-detail-price]");
    const detailOldPrice = page?.querySelector("[data-detail-old-price]");
    const detailDiscount = page?.querySelector("[data-detail-discount]");
    const detailSaving = page?.querySelector("[data-detail-saving]");
    if (mainImage && button.dataset.image) {
      mainImage.src = button.dataset.image;
      mainImage.dataset.variantTone = button.dataset.tone || "";
      mainImage.style.transform = "";
      mainImage.style.transformOrigin = "center";
    }
    if (selectedColor) selectedColor.textContent = localizedText(button.dataset.color || "Standard");
    if (detailPrice && button.dataset.price) detailPrice.textContent = button.dataset.price;
    if (detailOldPrice && button.dataset.oldPrice) detailOldPrice.textContent = button.dataset.oldPrice;
    if (detailDiscount && button.dataset.discount) detailDiscount.textContent = button.dataset.discount;
    if (detailSaving && button.dataset.saving) detailSaving.textContent = button.dataset.saving;
    button.closest(".variant-grid")?.querySelectorAll("[data-product-variant]").forEach((variant) => {
      variant.classList.toggle("is-active", variant === button);
    });
    page?.querySelectorAll("[data-detail-image]").forEach((thumbnail) => {
      thumbnail.classList.toggle(
        "is-active",
        thumbnail.dataset.detailImage === button.dataset.image && (thumbnail.dataset.detailTone || "") === (button.dataset.tone || "")
      );
    });
    return;
  }
  if (button.dataset.productSize !== undefined) {
    button.closest(".size-options")?.querySelectorAll("[data-product-size]").forEach((sizeButton) => {
      sizeButton.classList.toggle("is-active", sizeButton === button);
    });
    return;
  }
  if (button.dataset.productOption !== undefined) {
    button.closest(".size-options")?.querySelectorAll("[data-product-option]").forEach((optionButton) => {
      optionButton.classList.toggle("is-active", optionButton === button);
    });
    return;
  }
  if (button.dataset.detailQtyDecrease !== undefined || button.dataset.detailQtyIncrease !== undefined) {
    const quantityInput = button.closest(".product-purchase")?.querySelector("#productQuantity");
    if (quantityInput) {
      const current = Number(quantityInput.value) || 1;
      const next = current + (button.dataset.detailQtyIncrease !== undefined ? 1 : -1);
      quantityInput.value = String(Math.max(1, Math.min(10, next)));
    }
    return;
  }
  if (button.dataset.detailAdd) {
    const quantity = Number(button.closest(".product-purchase")?.querySelector("#productQuantity")?.value) || 1;
    addToCart(button.dataset.detailAdd, quantity, activePurchaseVariant(button.dataset.detailAdd));
    return;
  }
  if (button.dataset.detailBuy) {
    const quantity = Number(button.closest(".product-purchase")?.querySelector("#productQuantity")?.value) || 1;
    addToCart(button.dataset.detailBuy, quantity, activePurchaseVariant(button.dataset.detailBuy));
    openCart();
    return;
  }
  if (button.dataset.heroDot) {
    setHeroSlide(Number(button.dataset.heroDot));
    startHeroAuto();
    return;
  }
  if (button.dataset.heroPrev !== undefined) {
    setHeroSlide(state.heroIndex - 1);
    startHeroAuto();
    return;
  }
  if (button.dataset.heroNext !== undefined) {
    setHeroSlide(state.heroIndex + 1);
    startHeroAuto();
    return;
  }
  if (button.dataset.discoveryDot !== undefined) {
    setDiscoverySlide(Number(button.dataset.discoveryDot));
    window.clearInterval(discoveryTimer);
    return;
  }
  if (button.dataset.discoveryPrev !== undefined || button.dataset.discoveryNext !== undefined) {
    const current = Number(byId("categorySpotlight")?.dataset.discoveryIndex || 0);
    setDiscoverySlide(current + (button.dataset.discoveryNext !== undefined ? 1 : -1));
    window.clearInterval(discoveryTimer);
    return;
  }
  if (button.dataset.spotlightProduct) {
    renderProductPage(button.dataset.spotlightProduct, button.closest("[data-product-id]"), { source: "card" });
    return;
  }
  if (button.dataset.openListing) {
    openListingPage(button.dataset.openListing);
    return;
  }
  if (button.dataset.categoryRailPrev !== undefined || button.dataset.categoryRailNext !== undefined) {
    moveCategoryRail(button.dataset.categoryRailNext !== undefined ? 1 : -1);
    return;
  }
  if (button.dataset.megaKey) {
    setMegaActive(button.dataset.megaKey);
    setNavCategoryMenuOpen(true);
    return;
  }
  if (button.dataset.navCategoryName) {
    setNavCategoryActive(button.dataset.navCategoryName);
    setNavCategoryMenuOpen(true);
    return;
  }
  if (button.dataset.popupCategoryName) {
    setCategoryPopupActive(button.dataset.popupCategoryName);
    return;
  }
  if (button.dataset.sideCategoryName) {
    setSideCategoryActive(button.dataset.sideCategoryName);
    setSideCategoryPanelOpen(true);
    return;
  }
  if (button.dataset.sideToggleCategories !== undefined) {
    openCategoryPopup(state.sideCategoryName || "Clothing & Fashion");
    return;
  }
  if (button.dataset.promoPrev !== undefined || button.dataset.promoNext !== undefined) {
    const slider = button.closest("[data-promo-slider]");
    if (slider) {
      movePromoSlider(slider, button.dataset.promoNext !== undefined ? 1 : -1);
      startPromoSliderAuto(slider);
    }
    return;
  }
  if (button.dataset.promoDot !== undefined) {
    const slider = button.closest("[data-promo-slider]");
    if (slider) {
      slider.dataset.promoIndex = button.dataset.promoDot;
      renderPromoSlider(slider);
      startPromoSliderAuto(slider);
    }
    return;
  }
  if (button.dataset.scroll) {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (button.dataset.toast) {
    showToast(button.dataset.toast);
  }
  if (button.dataset.viewAllProducts !== undefined) {
    setSideCategoryPanelOpen(false);
    setNavCategoryMenuOpen(false);
    closeCategoryPopup();
    clearSearchQuery();
    setCategory("All", { scroll: false });
    button.closest(".section-block")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (button.dataset.category) {
    setSideCategoryPanelOpen(false);
    setNavCategoryMenuOpen(false);
    closeCategoryPopup();
    setCategory(button.dataset.category);
  }
  if (button.dataset.add) {
    addToCart(button.dataset.add);
  }
  if (button.dataset.increase) {
    changeQuantity(button.dataset.increase, 1);
  }
  if (button.dataset.decrease) {
    changeQuantity(button.dataset.decrease, -1);
  }
  if (button.dataset.remove) {
    state.cart = state.cart.filter((item) => {
      const product = allProducts.find((entry) => entry.id === item.productId);
      return product ? cartLineKey(item.productId, cartVariantFromItem(product, item)) !== button.dataset.remove : true;
    });
    saveCart();
    renderCart();
  }
});

byId("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  submitStoreSearch(byId("searchInput").value);
});

byId("searchInput").addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProducts();
  renderSearchSuggestions(event.target.value);
});

byId("searchInput").addEventListener("focus", () => {
  renderSearchSuggestions();
});

byId("categorySelect").addEventListener("change", (event) => {
  setCategory(event.target.value, { scroll: false });
});

function commitLanguageSearch(value) {
  const code = languageCodeFromSearch(value);
  if (!code) return false;
  selectLocale(code, "other", { manual: true });
  setLanguagePickerOpen(false);
  return true;
}

byId("languageSearchInput")?.addEventListener("input", (event) => {
  renderLanguageSearchOptions(event.target.value);
});

byId("languageSearchInput")?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const firstCode = byId("languageOptionList")?.querySelector("[data-language-code]")?.dataset.languageCode;
  if (commitLanguageSearch(firstCode || event.currentTarget.value)) {
    event.preventDefault();
  }
});

function commitCurrencySearch(value) {
  const code = currencyCodeFromSearch(value);
  if (!code) return false;
  selectCurrency(code, { manual: true });
  setCurrencyPickerOpen(false);
  return true;
}

byId("currencySearchInput")?.addEventListener("input", (event) => {
  renderCurrencySearchOptions(event.target.value);
});

byId("currencySearchInput")?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const firstCode = byId("currencyOptionList")?.querySelector("[data-currency-option]")?.dataset.currencyOption;
  if (commitCurrencySearch(firstCode || event.currentTarget.value)) {
    event.preventDefault();
  }
});

function commitCountrySearch(value) {
  const code = countryCodeFromSearch(value);
  if (!code) return false;
  selectCountry(code);
  setCountryPickerOpen(false);
  return true;
}

byId("countrySearchInput")?.addEventListener("input", (event) => {
  renderCountrySearchOptions(event.target.value);
});

byId("countrySearchInput")?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const firstCode = byId("countryOptionList")?.querySelector("[data-country-option]")?.dataset.countryOption;
  if (commitCountrySearch(firstCode || event.currentTarget.value)) {
    event.preventDefault();
  }
});

document.querySelectorAll('.logo[href="#home"]').forEach((logo) => {
  logo.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openHomePage();
  });
});

document.querySelector("[data-mobile-home]")?.addEventListener("click", (event) => {
  event.preventDefault();
  openHomePage();
});

document.querySelectorAll(".nav-bar__inner a, .mobile-header-tabs a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.dataset.mobileHomeTab !== undefined) {
      event.preventDefault();
      event.stopPropagation();
      openHomePage();
      return;
    }
    const listingKey = link.dataset.listingPage;
    if (listingKey) {
      event.preventDefault();
      event.stopPropagation();
      openListingPage(listingKey, link.dataset.mobileQuery ? { query: link.dataset.mobileQuery } : {});
      return;
    }

    if (!link.getAttribute("href")?.startsWith("#")) return;

    event.preventDefault();
    event.stopPropagation();

    const targetId = link.getAttribute("href");
    if (!targetId) return;

    if (document.body.classList.contains("product-view-open")) {
      closeProductPage({ restore: false, updateUrl: false });
    }
    closeCategoryPopup();
    setSideCategoryPanelOpen(false);
    setNavCategoryMenuOpen(false);
    setSearchResultsOpen(false);
    clearSearchQuery();
    state.category = "All";
    byId("categorySelect").value = "All";
    renderCategories();
    renderProducts();
    document.title = "Averon | Multi-Vendor Ecommerce";

    if (targetId === "#newsletter") {
      setNewsletterOpen(true);
      pushRouteState(null, "/#newsletter");
      return;
    }

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      pushRouteState(null, `/${targetId}`);
    }
  });
});

byId("cartButton").addEventListener("click", openCart);
byId("mobileCartButton")?.addEventListener("click", openCart);
byId("closeCart").addEventListener("click", closeCart);
byId("cartOverlay").addEventListener("click", closeCart);
byId("closeCategoryPopup").addEventListener("click", closeCategoryPopup);
byId("categoryPopupOverlay").addEventListener("click", closeCategoryPopup);

byId("newsletter")?.addEventListener("click", (event) => {
  if (event.target.closest("[data-newsletter-close]")) {
    event.stopPropagation();
    setNewsletterOpen(false);
    return;
  }
  if (event.currentTarget.classList.contains("is-collapsed")) {
    setNewsletterOpen(true);
  }
});

byId("customerSupport")?.addEventListener("click", (event) => {
  if (event.target.closest("[data-support-open]")) {
    setCustomerSupportOpen(true);
  }
  if (event.target.closest("[data-support-close]")) {
    setCustomerSupportOpen(false);
  }
  if (event.target.closest("[data-support-new]")) {
    newSupportConversation();
    byId("customerSupportForm")?.elements.message?.focus();
  }
});

byId("customerSupportForm")?.elements.attachment?.addEventListener("change", async (event) => {
  const preview = event.currentTarget.form.querySelector("[data-support-file-preview]");
  try {
    customerSupportAttachment = await readSupportAttachment(event.currentTarget.files[0]);
    preview.textContent = customerSupportAttachment.name;
    preview.hidden = false;
  } catch (error) {
    clearSupportAttachment();
    showToast(error.message);
  }
});

document.addEventListener("click", (event) => {
  const newsletter = byId("newsletter");
  if (newsletter && !newsletter.classList.contains("is-collapsed") && !newsletter.contains(event.target)) {
    setNewsletterOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  const keyboardProductCard = event.target.closest?.(".product-listing-card[data-product-id]");
  if ((event.key === "Enter" || event.key === " ") && keyboardProductCard && !event.target.closest?.("button")) {
    event.preventDefault();
    renderProductPage(keyboardProductCard.dataset.productId, keyboardProductCard, { source: "card" });
    return;
  }

  const newsletter = byId("newsletter");
  if ((event.key === "Enter" || event.key === " ") && event.target === newsletter && newsletter?.classList.contains("is-collapsed")) {
    event.preventDefault();
    setNewsletterOpen(true);
    return;
  }

  if (event.key === "Escape" && document.body.classList.contains("product-view-open")) {
    closeProductPage();
    return;
  }

  if (event.key === "Escape" && !byId("newsletter")?.classList.contains("is-collapsed")) {
    setNewsletterOpen(false);
    return;
  }

  if (event.key === "Escape" && byId("localePanel")?.hidden === false) {
    setLocalePanelOpen(false);
    return;
  }

  if (event.key === "Escape" && state.categoryPopupOpen) {
    closeCategoryPopup();
  }
});

document.addEventListener("mousemove", (event) => {
  const zoomArea = event.target.closest("[data-product-zoom]");
  if (!zoomArea) return;

  const image = zoomArea.querySelector("img");
  if (!image) return;

  const rect = zoomArea.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  image.style.transformOrigin = `${x}% ${y}%`;
  image.style.transform = "scale(1.85)";
});

document.addEventListener("mouseout", (event) => {
  const zoomArea = event.target.closest("[data-product-zoom]");
  if (!zoomArea || zoomArea.contains(event.relatedTarget)) return;

  const image = zoomArea.querySelector("img");
  if (!image) return;

  image.style.transformOrigin = "center";
  image.style.transform = "";
});

window.addEventListener("resize", () => {
  document.querySelectorAll("[data-promo-slider]").forEach(renderPromoSlider);
  updateFlashSalePosition();
  startDiscoveryAuto();
  startBrandAuto();
  updateCategoryRailControls();
});

window.addEventListener("popstate", syncRouteFromLocation);

const heroSlider = byId("heroSlider");
if (heroSlider) {
  initHeroSwipe(heroSlider);
  heroSlider.addEventListener("mouseleave", startHeroAuto);
  heroSlider.addEventListener("focusout", startHeroAuto);
}

const categorySpotlight = byId("categorySpotlight");
if (categorySpotlight) {
  categorySpotlight.addEventListener("mouseenter", () => window.clearInterval(discoveryTimer));
  categorySpotlight.addEventListener("focusin", () => window.clearInterval(discoveryTimer));
  categorySpotlight.addEventListener("mouseleave", startDiscoveryAuto);
  categorySpotlight.addEventListener("focusout", startDiscoveryAuto);
}

byId("circleCategories")?.addEventListener("scroll", updateCategoryRailControls, { passive: true });

byId("checkoutForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.cart.length) {
    showToast(t("emptyCart"));
    return;
  }
  const form = event.currentTarget;
  const submitButton = form.querySelector("button[type='submit']");
  const formValues = Object.fromEntries(new FormData(form));
  submitButton.disabled = true;
  try {
    const response = await fetch("/api/storefront/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        customer: { name: formValues.name, city: formValues.city, address: formValues.address },
        paymentMethod: formValues.payment,
        items: checkoutOrderItems()
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Order could not be placed.");
    state.cart = [];
    saveCart();
    renderCart();
    closeCart();
    showToast(`Order placed successfully. Ref: ${payload.orderId}`);
    if (String(formValues.name || "").trim()) {
      localStorage.setItem(supportNameStorageKey, String(formValues.name).trim());
    }
    form.reset();
  } catch (error) {
    showToast(error.message || "Order could not be placed.");
  } finally {
    submitButton.disabled = false;
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-customer-review-form]");
  if (!form) return;
  event.preventDefault();
  const button = form.querySelector("button[type='submit']");
  const feedback = form.querySelector("[data-review-feedback]");
  const fields = Object.fromEntries(new FormData(form));
  button.disabled = true;
  feedback.hidden = true;
  try {
    const response = await fetch("/api/storefront/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        productId: form.dataset.productId,
        productTitle: form.dataset.productTitle,
        productImage: form.dataset.productImage,
        customerName: fields.customerName,
        rating: Number(fields.rating),
        review: fields.review
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Review could not be submitted.");
    form.reset();
    feedback.textContent = payload.message;
    feedback.classList.remove("is-error");
    feedback.hidden = false;
    showToast(payload.message);
  } catch (error) {
    feedback.textContent = error.message || "Review could not be submitted.";
    feedback.classList.add("is-error");
    feedback.hidden = false;
  } finally {
    button.disabled = false;
  }
});

byId("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Newsletter subscription saved");
  event.currentTarget.reset();
  setNewsletterOpen(false);
});

byId("customerSupportForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector("button[type='submit']");
  const values = Object.fromEntries(new FormData(form));
  if (values.customerName.trim()) {
    localStorage.setItem(supportNameStorageKey, values.customerName.trim());
  }
  button.disabled = true;
  try {
    const response = await fetch("/api/storefront/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        threadId: supportThreadId(),
        customerName: values.customerName,
        message: values.message,
        attachment: customerSupportAttachment
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Message could not be sent.");
    form.elements.message.value = "";
    clearSupportAttachment();
    await refreshCustomerSupport();
    showToast("Message sent to Averon Support");
  } catch (error) {
    showToast(error.message || "Message could not be sent.");
  } finally {
    button.disabled = false;
  }
});

renderLanguageSearchOptions();
renderCurrencySearchOptions();
initCountryPreference();
renderCountrySearchOptions();
initCurrencyPreference();
loadAdminCatalogue();
loadCurrencyExchangeRates();
applySearchFromLocation();
renderCategories();
renderHero();
setDiscoverySlide(0);
renderProducts();
renderBrands();
initBrandSwipe();
renderCart();
initPromoSliders();
syncRouteFromLocation();
initLocalePreference();
window.setInterval(() => {
  if (!byId("customerSupport")?.classList.contains("is-collapsed")) refreshCustomerSupport();
}, 3000);
window.setInterval(updateTimer, 1000);
startHeroAuto();
startDiscoveryAuto();
