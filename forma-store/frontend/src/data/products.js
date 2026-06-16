const PRODUCTS = [
  { id: 1,  name: "Architect's Lamp",      category: "Lighting",    price: 189, rating: 4.8, reviews: 124, badge: "Bestseller", desc: "Die-cast aluminium arm, matte black finish. Warm 2700K LED built in.", img: "💡", color: "#1a1a1a" },
  { id: 2,  name: "Ceramic Pour-Over Set", category: "Kitchen",     price: 64,  rating: 4.6, reviews: 87,  badge: "New",        desc: "Handthrown stoneware dripper, server & two mugs. Dishwasher-safe.", img: "☕", color: "#e8d5b0" },
  { id: 3,  name: "Merino Blanket",        category: "Home",        price: 128, rating: 4.9, reviews: 203, badge: null,         desc: "100% extra-fine merino, pre-washed for immediate softness. 150×200 cm.", img: "🧸", color: "#c4a882" },
  { id: 4,  name: "Oak Serving Board",     category: "Kitchen",     price: 49,  rating: 4.7, reviews: 56,  badge: null,         desc: "Solid white oak, food-safe oil finish. Juice groove on reverse.", img: "🪵", color: "#b8924a" },
  { id: 5,  name: "Modular Shelf System",  category: "Furniture",   price: 349, rating: 4.5, reviews: 38,  badge: "Popular",    desc: "Powder-coated steel uprights + solid pine shelves. Adjustable spacing.", img: "📦", color: "#6b7280" },
  { id: 6,  name: "Linen Throw Pillow",    category: "Home",        price: 38,  rating: 4.4, reviews: 91,  badge: null,         desc: "Stonewashed linen, hidden zip. Insert included. Dry-clean only.", img: "🛋️", color: "#d4c4a8" },
  { id: 7,  name: "Brushed Brass Hooks",   category: "Accessories", price: 24,  rating: 4.7, reviews: 147, badge: "Sale",       desc: "Set of 4 solid brass hooks, brushed satin. 4 kg per hook.", img: "🪝", color: "#d4a853" },
  { id: 8,  name: "Glass Carafe 1L",       category: "Kitchen",     price: 42,  rating: 4.8, reviews: 72,  badge: null,         desc: "Borosilicate glass, beech wood stopper. Goes from fridge to table.", img: "🫙", color: "#a8c4d4" },
  { id: 9,  name: "Wool Desk Mat",         category: "Accessories", price: 68,  rating: 4.6, reviews: 63,  badge: "New",        desc: "Pressed 100% wool felt, anti-slip silicone base. 60×30 cm.", img: "🟫", color: "#8b7355" },
  { id: 10, name: "Porcelain Tray Set",    category: "Home",        price: 55,  rating: 4.5, reviews: 44,  badge: null,         desc: "Three nesting trays, matte glaze. Oven and dishwasher safe.", img: "⬜", color: "#f0ebe0" },
  { id: 11, name: "Copper Watering Can",   category: "Garden",      price: 72,  rating: 4.9, reviews: 29,  badge: "Limited",    desc: "Spun copper, long indoor spout. Develops natural patina over time.", img: "🪣", color: "#b87333" },
  { id: 12, name: "Leather Journal",       category: "Accessories", price: 46,  rating: 4.7, reviews: 88,  badge: null,         desc: "Full-grain vegetable-tanned cover, 192 acid-free pages. Lay-flat binding.", img: "📒", color: "#8b5e3c" },
];

export const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

export default PRODUCTS;
