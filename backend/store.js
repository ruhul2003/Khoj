// Memory store fallback for smooth local testing and immediate preview

const seedProducts = [
  {
    _id: "prod_1",
    title: "Apple MacBook Pro 14\" M2 Pro (16GB RAM, 512GB SSD)",
    category: "Electronics",
    condition: "Used - Like New",
    price: 1450,
    originalPrice: 1999,
    description: "Mint condition Space Gray MacBook Pro. Barely used for 4 months, battery health 99%. Comes with original 67W USB-C charger, box, and invoice. Perfect for developers, video editors, and designers.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1712-345678",
    status: "Available",
    isFeatured: true,
    views: 342,
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  },
  {
    _id: "prod_2",
    title: "Samsung Galaxy S24 Ultra 5G - 256GB Titanium Gray",
    category: "Mobile Phones",
    condition: "Brand New",
    price: 1080,
    originalPrice: 1299,
    description: "Factory sealed brand new Samsung Galaxy S24 Ultra. Official regional warranty included. Built-in S-Pen, 200MP camera system, and Galaxy AI features enabled out of the box.",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1819-987654",
    status: "Available",
    isFeatured: true,
    views: 520,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    _id: "prod_3",
    title: "Sony PlayStation 5 Disc Edition + 2 DualSense Controllers",
    category: "Gaming",
    condition: "Used - Good",
    price: 430,
    originalPrice: 599,
    description: "PlayStation 5 disc version in great working condition. Includes 2 original DualSense controllers (White & Midnight Black), HDMI 2.1 cable, stand, and 2 game discs (Spider-Man 2 & God of War Ragnarok).",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: true,
    views: 610,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    _id: "prod_4",
    title: "Ergonomic Mesh Office Chair with Adjustable Lumbar Support",
    category: "Furniture",
    condition: "Used - Like New",
    price: 120,
    originalPrice: 220,
    description: "Premium breathable high-back mesh chair. 3D adjustable armrests, multi-tilt lock, smooth rolling casters. Perfect for home office desk setup. Used for less than a month.",
    images: [
      "https://images.unsplash.com/photo-1580481072645-022f9a6d1294?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Banani, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1712-345678",
    status: "Available",
    isFeatured: false,
    views: 180,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    _id: "prod_5",
    title: "Honda Civic 1.5 Turbo 2021 (Pearl White, Mint Condition)",
    category: "Vehicles",
    condition: "Used - Good",
    price: 18500,
    originalPrice: 24000,
    description: "Driven 28,000 km only. First owner, full service history at official Honda dealership. Leather interior, sunroof, push-start, lane watch camera. Zero accidents, clean title.",
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: true,
    views: 940,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    _id: "prod_6",
    title: "Nike Air Jordan 1 Retro High OG 'Chicago' (Size US 10)",
    category: "Fashion",
    condition: "Brand New",
    price: 240,
    originalPrice: 280,
    description: "Authentic unworn deadstock Air Jordan 1 OG Chicago colorway. Purchased from SNKRS. Includes original red box, extra laces, and digital purchase receipt.",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Bashundhara R/A, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1819-987654",
    status: "Available",
    isFeatured: false,
    views: 290,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    _id: "prod_7",
    title: "Canon EOS R6 Mark II Mirrorless Camera + 24-105mm F4 Lens",
    category: "Electronics",
    condition: "Used - Like New",
    price: 2150,
    originalPrice: 2799,
    description: "Shutter count under 4,200! Pristine full-frame mirrorless body with RF 24-105mm L IS USM lens. Includes 2 LP-E6NH original batteries, Sandisk Extreme 128GB SD card, and Canon strap.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mohakhali, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 410,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  },
  {
    _id: "prod_8",
    title: "Minimalist Solid Oak Wood Dining Table + 4 Linen Chairs",
    category: "Furniture",
    condition: "Used - Fair",
    price: 280,
    originalPrice: 650,
    description: "Sturdy Scandinavian style dining set. Table top has minor surface scratches from normal use, easily refinished. Chairs are clean and very comfortable.",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Lalmatia, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1712-345678",
    status: "Available",
    isFeatured: false,
    views: 215,
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString()
  }
];

const memoryUsers = [
  {
    _id: "user_demo_1",
    name: "Tanvir Rahman",
    email: "tanvir@example.com",
    password: "password123",
    location: "Gulshan, Dhaka",
    phone: "+880 1711-223344",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    reviewCount: 18,
    verifiedSeller: true
  },
  {
    _id: "user_demo_2",
    name: "Sabbir Hossain",
    email: "sabbir@example.com",
    password: "password123",
    location: "Dhanmondi, Dhaka",
    phone: "+880 1812-345678",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5.0,
    reviewCount: 24,
    verifiedSeller: true
  }
];

let products = [...seedProducts];
let users = [...memoryUsers];
let orders = [];
let offers = [
  {
    _id: "off_1",
    productId: "prod_1",
    productTitle: "Apple MacBook Pro 14\" M2 Pro (16GB RAM, 512GB SSD)",
    productPrice: 1450,
    productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
    buyerId: "user_demo_2",
    buyerName: "Sabbir Hossain",
    sellerId: "user_demo_1",
    offeredPrice: 1350,
    message: "Can pay cash today. Let me know if 1350 works!",
    status: "Pending",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];
let messages = [
  {
    _id: "msg_1",
    productId: "prod_1",
    productTitle: "Apple MacBook Pro 14\" M2 Pro",
    senderId: "user_demo_2",
    senderName: "Sabbir Hossain",
    receiverId: "user_demo_1",
    text: "Hi Tanvir, is the MacBook Pro still available for inspection?",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    _id: "msg_2",
    productId: "prod_1",
    productTitle: "Apple MacBook Pro 14\" M2 Pro",
    senderId: "user_demo_1",
    senderName: "Tanvir Rahman",
    receiverId: "user_demo_2",
    text: "Hello Sabbir! Yes it is. You can drop by Gulshan Pink City area today.",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  }
];

module.exports = {
  products,
  users,
  orders,
  offers,
  messages,
  seedProducts
};
