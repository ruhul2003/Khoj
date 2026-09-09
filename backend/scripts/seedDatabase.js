const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Electronics', 'Mobile Phones', 'Vehicles', 'Furniture', 'Fashion', 'Gaming', 'Books & Hobbies', 'Home Appliances']
  },
  condition: { 
    type: String, 
    required: true,
    enum: ['Brand New', 'Used - Like New', 'Used - Good', 'Used - Fair']
  },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  description: { type: String, required: true },
  images: [{ type: String }],
  location: { type: String, required: true, default: 'Dhaka' },
  sellerId: { type: String, required: true },
  sellerName: { type: String, default: 'Seller' },
  sellerRating: { type: Number, default: 4.9 },
  sellerAvatar: { type: String, default: '' },
  sellerPhone: { type: String, default: '+880 1712-345678' },
  status: { type: String, enum: ['Available', 'Pending', 'Sold'], default: 'Available' },
  isFeatured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');

const sampleProducts = [
  // ==================== ELECTRONICS (10) ====================
  {
    title: "Apple MacBook Pro 16\" M3 Max (36GB RAM, 1TB SSD) - Space Black",
    category: "Electronics",
    condition: "Used - Like New",
    price: 3100,
    originalPrice: 3499,
    description: "Flawless Space Black MacBook Pro 16-inch with M3 Max 16-Core CPU & 40-Core GPU. Battery cycle count under 15, 100% battery capacity. Includes 140W USB-C adapter, MagSafe cable, and original box.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 2, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: true,
    views: 480
  },
  {
    title: "Dell XPS 15 9530 3.5K OLED Touch (Intel i9-13900H, 32GB, RTX 4070)",
    category: "Electronics",
    condition: "Used - Like New",
    price: 2150,
    originalPrice: 2699,
    description: "Stunning 3.5K OLED touchscreen Dell XPS 15. Powered by 13th Gen i9 with Nvidia RTX 4070. CNC machined aluminum with carbon fiber palm rest. Used for 2 months for video editing.",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Banani, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 310
  },
  {
    title: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones (Black)",
    category: "Electronics",
    condition: "Brand New",
    price: 340,
    originalPrice: 399,
    description: "Factory sealed brand new Sony XM5 headphones. Industry-leading Active Noise Cancellation with 8 microphones, 30-hour battery life, and crystal-clear hands-free calling.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: true,
    views: 620
  },
  {
    title: "LG C3 55\" 4K Smart OLED TV (120Hz, HDMI 2.1, Dolby Vision & Atmos)",
    category: "Electronics",
    condition: "Used - Good",
    price: 1150,
    originalPrice: 1599,
    description: "Incredible OLED picture quality with self-lit pixels. 120Hz native refresh rate with G-Sync and FreeSync support for modern gaming consoles and PCs. Clean screen, no burn-in.",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 290
  },
  {
    title: "Canon EOS R6 Mark II Mirrorless Camera + RF 24-105mm F4 L IS USM Lens",
    category: "Electronics",
    condition: "Used - Like New",
    price: 2350,
    originalPrice: 2899,
    description: "Shutter count under 3,500. Full-frame 24.2 MP sensor capable of 40 fps continuous shooting and 4K 60p uncropped video. Includes 2 LP-E6NH batteries, charger, and SanDisk 128GB Extreme Pro SD card.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mohakhali, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 410
  },
  {
    title: "Apple iPad Pro 12.9\" M2 Wi-Fi + Cellular (256GB, Space Gray)",
    category: "Electronics",
    condition: "Used - Like New",
    price: 920,
    originalPrice: 1299,
    description: "Liquid Retina XDR display with Mini-LED backlighting. Comes bundled with Apple Pencil (2nd Gen) and ESR Magnetic Smart Case. Screen protector pre-applied since day one.",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Bashundhara R/A, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 380
  },
  {
    title: "ASUS ROG Zephyrus G16 (2024) QHD+ 240Hz OLED (Core Ultra 9, RTX 4080)",
    category: "Electronics",
    condition: "Brand New",
    price: 2650,
    originalPrice: 2999,
    description: "Ultra-slim premium gaming laptop with 16-inch ROG Nebula OLED display. Intel Core Ultra 9 185H, 32GB LPDDR5X RAM, 1TB NVMe Gen4 SSD, and RTX 4080 12GB graphics.",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur 10, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 510
  },
  {
    title: "Bose QuietComfort Ultra Wireless Earbuds with Spatial Audio",
    category: "Electronics",
    condition: "Used - Like New",
    price: 240,
    originalPrice: 299,
    description: "World-class noise cancellation with Bose Immersive Audio. Barely used for 2 weeks. Complete with all silicone ear-tip sizes, charging case, USB cable, and retail packaging.",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Lalmatia, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 195
  },
  {
    title: "Logitech MX Master 3S Wireless Performance Mouse - Pale Grey",
    category: "Electronics",
    condition: "Brand New",
    price: 85,
    originalPrice: 105,
    description: "8K DPI track-anywhere optical sensor with quiet click switches and MagSpeed electromagnetic scrolling wheel. Dual Bluetooth + Logi Bolt USB connectivity.",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 260
  },
  {
    title: "Keychron Q1 Pro QMK/VIA Wireless Custom Mechanical Keyboard (Gateron Pro Red)",
    category: "Electronics",
    condition: "Used - Good",
    price: 155,
    originalPrice: 199,
    description: "Full CNC aluminum body, double-gasket design with hot-swappable PCB, south-facing RGB, and Bluetooth 5.1 connection for up to 3 devices simultaneously.",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 1, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 340
  },

  // ==================== MOBILE PHONES (10) ====================
  {
    title: "iPhone 15 Pro Max 256GB - Natural Titanium (Physical SIM + eSIM)",
    category: "Mobile Phones",
    condition: "Used - Like New",
    price: 1180,
    originalPrice: 1399,
    description: "Pristine condition Natural Titanium iPhone 15 Pro Max. Battery health 98%. Grade A condition with zero scratch or dent. Comes with original braided USB-C cable and box.",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 2, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: true,
    views: 740
  },
  {
    title: "Samsung Galaxy S24 Ultra 5G (12GB RAM, 512GB) - Titanium Gray",
    category: "Mobile Phones",
    condition: "Brand New",
    price: 1120,
    originalPrice: 1350,
    description: "Factory sealed official Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3 for Galaxy, built-in S-Pen, 200MP Quad Telephoto camera, and 7 years of Android OS updates.",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: true,
    views: 690
  },
  {
    title: "Google Pixel 8 Pro 128GB - Obsidian Black (Unlocked)",
    category: "Mobile Phones",
    condition: "Used - Like New",
    price: 680,
    originalPrice: 999,
    description: "Powered by Tensor G3 chip with pro camera controls, Magic Eraser, Best Take AI photo tools, and 120Hz Super Actua Display. Used for 3 months, pristine condition.",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 450
  },
  {
    title: "OnePlus 12 5G (16GB RAM, 512GB Storage) - Silky Black",
    category: "Mobile Phones",
    condition: "Brand New",
    price: 740,
    originalPrice: 899,
    description: "Flagship performance featuring 4th Gen Hasselblad Camera System, 5400mAh battery with 100W SUPERVOOC fast charger included in box. Snapdragon 8 Gen 3 processor.",
    images: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Banani, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 390
  },
  {
    title: "Xiaomi 14 Ultra 5G (16GB RAM, 512GB) - White Vegan Leather",
    category: "Mobile Phones",
    condition: "Used - Like New",
    price: 950,
    originalPrice: 1250,
    description: "Ultimate photography phone created with Leica Quad 50MP Camera system with variable aperture f/1.63-f/4.0. Includes original photography grip kit accessory.",
    images: [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Bashundhara R/A, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 310
  },
  {
    title: "iPhone 14 Pro 128GB - Deep Purple (Battery Health 91%)",
    category: "Mobile Phones",
    condition: "Used - Good",
    price: 720,
    originalPrice: 999,
    description: "Dynamic Island flagship iPhone in striking Deep Purple. Always-On display, 48MP main camera sensor. Completely functional with minor hairline frame wear.",
    images: [
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1663499482536-4d0c1bae4ce2?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur 11, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 490
  },
  {
    title: "Samsung Galaxy Z Fold 5 5G - Phantom Black 512GB",
    category: "Mobile Phones",
    condition: "Used - Like New",
    price: 1050,
    originalPrice: 1799,
    description: "Seamless 7.6-inch main AMOLED screen fold display with flex hinge. 12GB RAM, multi-window multitasking powerhouse. Comes with original S Pen Fold Edition case.",
    images: [
      "https://images.unsplash.com/photo-1584006682522-dc17d6c0d963?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 1, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 560
  },
  {
    title: "Nothing Phone (2) 256GB - Dark Grey Glyph Interface",
    category: "Mobile Phones",
    condition: "Used - Good",
    price: 430,
    originalPrice: 649,
    description: "Unique transparent back with custom Glyph lighting notifications, 6.7\" LTPO OLED 120Hz screen, Snapdragon 8+ Gen 1, and dual 50MP cameras.",
    images: [
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1570891836654-d4961a7b6929?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mohakhali, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 280
  },
  {
    title: "Vivo X100 Pro 5G ZEISS Optics (16GB RAM, 512GB) - Asteroid Black",
    category: "Mobile Phones",
    condition: "Brand New",
    price: 890,
    originalPrice: 1050,
    description: "1-inch Sony IMX989 ZEISS APO Telephoto camera sensor with V3 imaging chip. MediaTek Dimensity 9300 processor, 100W FlashCharge with 5400mAh battery.",
    images: [
      "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Chittagong Sadar, Chittagong",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 230
  },
  {
    title: "Realme GT 5 Pro 512GB - Orange Vegan Leather Edition",
    category: "Mobile Phones",
    condition: "Used - Like New",
    price: 520,
    originalPrice: 680,
    description: "Flagship performer with Snapdragon 8 Gen 3, Sony LYT-808 main camera, 50MP periscope telephoto lens, 4500 nits peak brightness 144Hz AMOLED panel.",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Sylhet Sadar, Sylhet",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 210
  },

  // ==================== VEHICLES (10) ====================
  {
    title: "Honda Civic 1.5 Turbo 2022 (Pearl White, Sunroof, Mint Condition)",
    category: "Vehicles",
    condition: "Used - Good",
    price: 19500,
    originalPrice: 24500,
    description: "Driven 22,000 km only. First owner, complete service record at official Honda Bangladesh dealership. Leather seats, sunroof, lane watch camera, push start button.",
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur DOHS, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: true,
    views: 980
  },
  {
    title: "Toyota Premio F EX Package 2019 (Wine Red, Sunroof, Octane Driven)",
    category: "Vehicles",
    condition: "Used - Like New",
    price: 22000,
    originalPrice: 26000,
    description: "Push start, beige interior, power seats, original Japanese alloy rims, wooden steering wheel finish. Driven 34,000 km in Dhaka city. All papers updated till 2027.",
    images: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara Sector 7, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: true,
    views: 850
  },
  {
    title: "Yamaha R15 V4 Racing Blue 2023 (Dual-Channel ABS, Quickshifter)",
    category: "Vehicles",
    condition: "Used - Like New",
    price: 3600,
    originalPrice: 4200,
    description: "Driven 6,200 km only. Traction control system, upside-down front forks, Y-Connect Bluetooth dashboard. Fully showroom original paint with zero accidents.",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi 27, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 610
  },
  {
    title: "Royal Enfield Hunter 350 Dapper Grey (2023, Official Import)",
    category: "Vehicles",
    condition: "Used - Like New",
    price: 3800,
    originalPrice: 4400,
    description: "Agile 349cc air-cooled J-series engine. Driven 3,100 km. Fitted with genuine Royal Enfield engine guard, sump guard, and touring seat. Smooth engine note.",
    images: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan DOHS, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 540
  },
  {
    title: "Vespa VXL 150 Premium Scooter (Rosso Red, Alloy Wheels)",
    category: "Vehicles",
    condition: "Used - Good",
    price: 1850,
    originalPrice: 2400,
    description: "Iconic Italian design 150cc fuel-injected engine with ABS. Driven 9,500 km. Features LED headlight, front disc brake, and comfortable pillion backrest.",
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1525160354320-d8e92641c563?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Banani DOHS, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 320
  },
  {
    title: "Nissan X-Trail Hybrid 2018 4WD (Pearl Black, 5 Seater, Leather Interior)",
    category: "Vehicles",
    condition: "Used - Good",
    price: 24500,
    originalPrice: 29000,
    description: "Emergency brake assist, 360-degree camera, panoramic sunroof, power tailgate, heated front seats. Superb fuel economy with Nissan 2.0L Intelligent Dual Clutch Hybrid system.",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Baridhara DOHS, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 710
  },
  {
    title: "Toyota Land Cruiser Prado TX-L 2017 (Pearl White, Sunroof, Leather)",
    category: "Vehicles",
    condition: "Used - Good",
    price: 58000,
    originalPrice: 68000,
    description: "Executive 7-seater SUV with 2.7L Octane engine. Modellista body kit, 3D surround sound audio, ventilated seats, air suspension. Tax token and fitness updated.",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541348263662-e082662d82da?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 2, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 920
  },
  {
    title: "Suzuki Gixxer SF 250 Dual-Channel ABS 2022 (Matte Black Edition)",
    category: "Vehicles",
    condition: "Used - Good",
    price: 2750,
    originalPrice: 3200,
    description: "Quarter-liter 249cc oil-cooled SOCS engine producing 26.5 PS power. Driven 11,200 km. Smooth acceleration with crisp gearshifts. Clean chassis, original paint.",
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur 1, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 430
  },
  {
    title: "Hyundai Tucson 1.6 Turbo 2021 (Panoramic Sunroof, AWD, Silver)",
    category: "Vehicles",
    condition: "Used - Like New",
    price: 29500,
    originalPrice: 35000,
    description: "Driven 18,500 km. Futuristic parametric hidden lights design, 10.25-inch digital cluster, Bose sound system, wireless phone charger, hands-free smart power tailgate.",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi 6, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 640
  },
  {
    title: "Honda Vezel Z Sensing Hybrid 2020 (Crystal Black Pearl, Sunroof)",
    category: "Vehicles",
    condition: "Used - Good",
    price: 21800,
    originalPrice: 25500,
    description: "Honda Sensing safety suite (adaptive cruise control, lane keep assist), half-leather heated seats, roof rails, paddle shifters. Driven 29,000 km in Bangladesh.",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara Sector 11, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 480
  },

  // ==================== FURNITURE (10) ====================
  {
    title: "Ergonomic Mesh Office Chair with Adjustable Lumbar Support & 3D Armrests",
    category: "Furniture",
    condition: "Used - Like New",
    price: 130,
    originalPrice: 210,
    description: "High-back breathable mesh ergonomic chair. Syncro-tilt mechanism with 3 position tilt lock, heavy-duty nylon base with smooth rolling casters. Used for 3 weeks.",
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Banani, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: true,
    views: 390
  },
  {
    title: "Solid Teak Wood 6-Seater Dining Table Set with Cushioned Chairs",
    category: "Furniture",
    condition: "Used - Good",
    price: 340,
    originalPrice: 620,
    description: "Authentic Burmese teak wood dining set. Tempered glass top included to protect the natural wood grain. Includes 6 comfortable chairs upholstered in stain-resistant fabric.",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Lalmatia, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: true,
    views: 420
  },
  {
    title: "Modern L-Shaped Sectional Sofa (Velvet Charcoal Grey, 5 Seater)",
    category: "Furniture",
    condition: "Used - Like New",
    price: 450,
    originalPrice: 850,
    description: "Luxurious water-repellent velvet fabric with high-density foam cushions. Reversible chaise setup. Stainless steel leg accents. Clean and sanitized.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 1, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 510
  },
  {
    title: "King Size Solid Mahogany Wood Bed Frame with Under-Bed Storage Drawers",
    category: "Furniture",
    condition: "Used - Good",
    price: 380,
    originalPrice: 700,
    description: "Sturdy king-size bed (6.5ft x 6ft) handcrafted from seasoned mahogany wood. Features 4 spacious pull-out hydraulic storage drawers. Mattress not included.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi 32, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 310
  },
  {
    title: "Minimalist Oak Wood Bookshelf & Display Unit (5 Tier Rack)",
    category: "Furniture",
    condition: "Brand New",
    price: 110,
    originalPrice: 160,
    description: "Open ladder style 5-shelf bookshelf made of engineered natural oak wood with powder-coated steel frame. Perfect for books, plants, and home decor items.",
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara Sector 4, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 240
  },
  {
    title: "Luxury Marble Top Oval Coffee Table with Brushed Gold Steel Legs",
    category: "Furniture",
    condition: "Used - Like New",
    price: 190,
    originalPrice: 320,
    description: "Genuine white Italian Carrara marble slab top with gold geometric metal base frame. Elegant center table addition for modern living room interiors.",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Baridhara DOHS, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 280
  },
  {
    title: "Wooden Study Desk with Cable Management & Side Drawer Unit",
    category: "Furniture",
    condition: "Used - Good",
    price: 95,
    originalPrice: 180,
    description: "Spacious computer writing workstation (48\" x 24\"). Built-in grommet hole for monitor cables and smooth gliding lockable side drawer.",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527038939684-765162dc5c97?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur 2, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 190
  },
  {
    title: "4-Door Wooden Wardrobe Closet with Full-Length Mirror (Walnut Finish)",
    category: "Furniture",
    condition: "Used - Good",
    price: 290,
    originalPrice: 550,
    description: "Large 4-door bedroom almirah with hanging rod, multiple storage shelves, internal security lock box, and center mirror panel.",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mohammadpur, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 350
  },
  {
    title: "Modern Floating TV Cabinet Unit with LED Backlight (Wall Mounted)",
    category: "Furniture",
    condition: "Brand New",
    price: 140,
    originalPrice: 220,
    description: "60-inch wall mounted entertainment console center with wireless remote LED lighting. Concealed cable routing and 2 drop-down storage cubbies.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Bashundhara R/A, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 270
  },
  {
    title: "Outdoor All-Weather Rattan Balcony Bistro Set (2 Chairs + Glass Tea Table)",
    category: "Furniture",
    condition: "Used - Like New",
    price: 115,
    originalPrice: 190,
    description: "Handwoven synthetic resin wicker patio set resistant to UV rays and rain. Tempered glass top coffee table and comfortable water-washable seat cushions.",
    images: [
      "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 2, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 220
  },

  // ==================== FASHION (10) ====================
  {
    title: "Nike Air Jordan 1 Retro High OG 'Chicago' (Size US 10 / EU 44)",
    category: "Fashion",
    condition: "Brand New",
    price: 250,
    originalPrice: 310,
    description: "Authentic unworn deadstock Air Jordan 1 OG Chicago colorway. Purchased from Nike SNKRS app. Includes original red Nike box, extra black/white laces, and order invoice.",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Bashundhara R/A, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: true,
    views: 520
  },
  {
    title: "Premium Handcrafted Lambskin Genuine Leather Biker Jacket (Dark Brown, Size M)",
    category: "Fashion",
    condition: "Used - Like New",
    price: 160,
    originalPrice: 280,
    description: "Soft genuine lambskin leather motorcycle jacket with YKK heavy-duty zippers and quilted inner polyester lining. Worn twice for a photo shoot.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Banani, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: true,
    views: 410
  },
  {
    title: "Designer Pure Silk Saree with Heavy Zari Embroidered Border - Royal Blue",
    category: "Fashion",
    condition: "Brand New",
    price: 180,
    originalPrice: 260,
    description: "Exclusive pure Kanjivaram silk saree with intricate golden zari work weaving across body and pallu. Unstitched matching silk blouse piece included.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 340
  },
  {
    title: "Ray-Ban Original Wayfarer Classic Polarized Sunglasses (RB2140 Black)",
    category: "Fashion",
    condition: "Used - Like New",
    price: 110,
    originalPrice: 175,
    description: "Iconic square frame sunglasses with green G-15 polarized crystal glass lenses providing 100% UV protection. Includes original leather case and cleaning cloth.",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 1, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 290
  },
  {
    title: "Men's Traditional Heavy Embroidered Designer Panjabi Set (Navy Blue, Size L)",
    category: "Fashion",
    condition: "Brand New",
    price: 75,
    originalPrice: 110,
    description: "Premium cotton-viscose blend long Panjabi with fine thread embroidery on collar and placket. Comes with white cotton pyjama trousers.",
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1621570074981-ee6a0145c8b5?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 230
  },
  {
    title: "Adidas Ultraboost Light Running Shoes (Core Black / Cloud White, US 9.5)",
    category: "Fashion",
    condition: "Used - Good",
    price: 115,
    originalPrice: 190,
    description: "30% lighter BOOST material midsole with PRIMEKNIT textile upper and Continental Rubber outsole. Excellent grip and cushion for daily running or walking.",
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Lalmatia, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 310
  },
  {
    title: "Fossil Grant Chronograph Dark Brown Leather Men's Watch (FS4735)",
    category: "Fashion",
    condition: "Used - Like New",
    price: 95,
    originalPrice: 155,
    description: "Classic cream dial with Roman numerals, 44mm stainless steel case, stop-watch chronograph subdials, and interchangeable 22mm genuine leather strap.",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mohakhali, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 270
  },
  {
    title: "Women's Designer Leather Handbag & Crossbody Tote - Beige Nude",
    category: "Fashion",
    condition: "Used - Like New",
    price: 135,
    originalPrice: 240,
    description: "Structured saffiano faux-leather tote with gold hardware trim, detachable shoulder strap, multiple inner zip pockets, and protective metal feet.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 380
  },
  {
    title: "Levi's 501 Original Fit Men's Denim Jeans (Dark Indigo Wash, W32 L32)",
    category: "Fashion",
    condition: "Brand New",
    price: 65,
    originalPrice: 90,
    description: "100% non-stretch cotton denim iconic straight leg fit with button fly and signature leather patch on back waistband. Tags still attached.",
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur 10, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 205
  },
  {
    title: "The North Face ThermoBall Eco Winter Puffer Jacket (Black, Men's L)",
    category: "Fashion",
    condition: "Used - Good",
    price: 125,
    originalPrice: 220,
    description: "Lightweight 100% recycled synthetic insulation jacket that keeps warm even when wet. Packs completely into its own chest pocket. DWR water repellent finish.",
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Sylhet Sadar, Sylhet",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 260
  },

  // ==================== GAMING (10) ====================
  {
    title: "Sony PlayStation 5 Disc Edition + 2 DualSense Controllers (White & Midnight Black)",
    category: "Gaming",
    condition: "Used - Good",
    price: 440,
    originalPrice: 599,
    description: "PS5 disc version in great working condition. Includes 2 original DualSense controllers, HDMI 2.1 cable, power cord, base stand, and 2 game discs (Spider-Man 2 & God of War Ragnarok).",
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
    views: 680
  },
  {
    title: "Xbox Series X 1TB Console + Wireless Controller (Black)",
    category: "Gaming",
    condition: "Used - Like New",
    price: 420,
    originalPrice: 549,
    description: "True 4K gaming powerhouse with 12 teraflops GPU processing power and 1TB Custom NVMe SSD. Quick Resume feature lets seamlessly jump between multiple games.",
    images: [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 2, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: true,
    views: 590
  },
  {
    title: "Nintendo Switch OLED Model - Neon Red & Neon Blue (64GB Storage)",
    category: "Gaming",
    condition: "Used - Like New",
    price: 290,
    originalPrice: 389,
    description: "Vibrant 7-inch OLED screen with wide adjustable stand, enhanced audio speakers, and wired LAN port dock. Includes carrying case and Zelda Tears of the Kingdom game.",
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 510
  },
  {
    title: "Meta Quest 3 128GB Breakthrough Mixed Reality VR Headset",
    category: "Gaming",
    condition: "Used - Like New",
    price: 430,
    originalPrice: 529,
    description: "Next-gen standalone VR headset with full-color passthrough mixed reality, Snapdragon XR2 Gen 2 performance, 4K+ Infinite Display resolution, and Touch Plus controllers.",
    images: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Banani, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 470
  },
  {
    title: "ASUS ROG Swift PG279QM 27\" 1440p 240Hz Fast IPS Gaming Monitor",
    category: "Gaming",
    condition: "Used - Good",
    price: 520,
    originalPrice: 799,
    description: "Esports 1440p 240Hz monitor with NVIDIA G-SYNC processor and Reflex Latency Analyzer. 1ms GTG response time, DisplayHDR 400 certified, aura sync RGB backlighting.",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Bashundhara R/A, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 390
  },
  {
    title: "Valve Steam Deck OLED 512GB Handheld Gaming PC Console",
    category: "Gaming",
    condition: "Used - Like New",
    price: 580,
    originalPrice: 699,
    description: "7.4-inch 90Hz HDR OLED display with 6nm AMD APU chip, Wi-Fi 6E, 50Wh battery, premium carrying case, and 45W USB-C power supply. Runs PC games natively on SteamOS.",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Lalmatia, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 430
  },
  {
    title: "Secretlab TITAN Evo 2022 Gaming Chair (Stealth PU Leather, Size L)",
    category: "Gaming",
    condition: "Used - Good",
    price: 330,
    originalPrice: 549,
    description: "Ergonomic 4-way L-ADAPT lumbar support system, magnetic memory foam head pillow, 4D armrests, full 165-degree recline. Heavy-duty ADC12 aluminum wheelbase.",
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur 11, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 310
  },
  {
    title: "SteelSeries Arctis Nova Pro Wireless Multi-System Gaming Headset",
    category: "Gaming",
    condition: "Used - Like New",
    price: 260,
    originalPrice: 349,
    description: "Active Noise Cancellation with dual-battery hot swap system, OLED wireless base station hub, 360-degree spatial audio, and dual wireless (2.4GHz + Bluetooth).",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mohakhali, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 240
  },
  {
    title: "Razer DeathAdder V3 Pro Wireless Ultra-Lightweight Gaming Mouse (White)",
    category: "Gaming",
    condition: "Brand New",
    price: 115,
    originalPrice: 149,
    description: "63g ultra-lightweight ergonomic mouse with Focus Pro 30K Optical Sensor, Gen-3 Optical Switches (90M click life), and 90-hour battery life.",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 180
  },
  {
    title: "Elgato Stream Deck MK.2 Studio Controller (15 Customizable LCD Keys)",
    category: "Gaming",
    condition: "Used - Like New",
    price: 110,
    originalPrice: 149,
    description: "Control apps, launch social posts, adjust audio, toggle mic mute, switch scenes in OBS/Twitch with one touch of tactile LCD keys with custom icons.",
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 220
  },

  // ==================== BOOKS & HOBBIES (10) ====================
  {
    title: "Harry Potter Hardcover Deluxe Special Edition Boxed Set (Complete 1-7)",
    category: "Books & Hobbies",
    condition: "Used - Like New",
    price: 140,
    originalPrice: 220,
    description: "Beautiful dragon-embossed clothbound hardcover box set of all 7 J.K. Rowling novels. Unmarked crisp pages, dust jackets in mint collector condition.",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: true,
    views: 490
  },
  {
    title: "Fender Player Stratocaster Electric Guitar (Buttercream Finish, Maple Fretboard)",
    category: "Books & Hobbies",
    condition: "Used - Like New",
    price: 620,
    originalPrice: 799,
    description: "Authentic Mexican Fender Stratocaster with 3 Player Series Single-Coil pickups, 5-way switch, 2-point sync tremolo bridge. Perfect fret action and intonation.",
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 1, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: true,
    views: 560
  },
  {
    title: "Yamaha P-125 88-Key Weighted Action Digital Piano + Stand & Sustain Pedal",
    category: "Books & Hobbies",
    condition: "Used - Good",
    price: 520,
    originalPrice: 749,
    description: "Graded Hammer Standard (GHS) weighted key touch with Pure CF Sound Engine reproducing authentic Yamaha CFIIIS concert grand piano tones. Includes L-125 wooden stand.",
    images: [
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Banani, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 410
  },
  {
    title: "Yamaha F310 Acoustic Guitar (Natural Gloss Finish + Padded Gig Bag)",
    category: "Books & Hobbies",
    condition: "Used - Good",
    price: 110,
    originalPrice: 165,
    description: "Spruce top with rosewood fingerboard and bridge. Excellent warm acoustic resonance, narrow body design comfortable for beginners and intermediate players.",
    images: [
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 320
  },
  {
    title: "J.R.R. Tolkien The Lord of the Rings & The Hobbit Illustrated Leatherette Set",
    category: "Books & Hobbies",
    condition: "Brand New",
    price: 85,
    originalPrice: 120,
    description: "4-volume faux leather pocket gift box set featuring full-color maps of Middle-earth, foil stamping on spine, and gilded page edges.",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Lalmatia, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 260
  },
  {
    title: "Celestron PowerSeeker 127EQ Equatorial Reflector Telescope for Astronomy",
    category: "Books & Hobbies",
    condition: "Used - Good",
    price: 175,
    originalPrice: 269,
    description: "127mm aperture Newtonian reflector telescope with 3x Barlow lens, 2 eyepieces (20mm & 4mm), and German equatorial mount with slow-motion control cables for celestial tracking.",
    images: [
      "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mohakhali, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 380
  },
  {
    title: "Winsor & Newton Artist Acrylic & Oil Painting Studio Kit with Beechwood Easel",
    category: "Books & Hobbies",
    condition: "Brand New",
    price: 90,
    originalPrice: 140,
    description: "Complete professional art studio set including 24 tubes of heavy body paints, 12 synthetic hogshead brushes, stretched cotton canvases, mixing palette, and collapsible tripod easel.",
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Bashundhara R/A, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 210
  },
  {
    title: "Dungeons & Dragons 5th Edition Core Rulebooks Gift Set (Hardcover + Dungeon Master Screen)",
    category: "Books & Hobbies",
    condition: "Used - Like New",
    price: 115,
    originalPrice: 170,
    description: "Includes Player's Handbook, Dungeon Master's Guide, and Monster Manual with special foil covers in an exclusive slipcase box set.",
    images: [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur 1, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 290
  },
  {
    title: "DJI Mini 3 Pro Drone Fly More Combo (4K HDR Video, 34-min Flight)",
    category: "Books & Hobbies",
    condition: "Used - Like New",
    price: 720,
    originalPrice: 910,
    description: "Under 249g lightweight foldable drone. True vertical shooting for TikTok/Reels, tri-directional obstacle sensing, RC remote controller with built-in HD screen, 3 intelligent batteries, and shoulder bag.",
    images: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 2, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 630
  },
  {
    title: "Board Game Collector Bundle: Catan + Ticket to Ride + Carcassonne",
    category: "Books & Hobbies",
    condition: "Used - Good",
    price: 70,
    originalPrice: 130,
    description: "Top 3 strategy family tabletop games complete with all wooden resource tokens, cards, hex tiles, and original rulebooks.",
    images: [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 175
  },

  // ==================== HOME APPLIANCES (10) ====================
  {
    title: "Dyson V15 Detect Extra Cordless Vacuum Cleaner (Laser Dust Sensor)",
    category: "Home Appliances",
    condition: "Used - Like New",
    price: 580,
    originalPrice: 749,
    description: "Intelligent cordless vacuum with laser illumination revealing invisible dust on hard floors. Piezo sensor automatically optimizes suction power up to 60 minutes run time.",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 1, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: true,
    views: 450
  },
  {
    title: "Samsung 450L Twin Cooling Plus Inverter Refrigerator (Stainless Steel)",
    category: "Home Appliances",
    condition: "Used - Good",
    price: 490,
    originalPrice: 780,
    description: "Energy efficient Digital Inverter Compressor with 5 conversion modes. Twin Cooling Plus keeps food fresh up to 2x longer. Frost-free with external LED display.",
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Uttara Sector 3, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: true,
    views: 520
  },
  {
    title: "Whirlpool 8kg 5-Star Inverter Front Load Fully Automatic Washing Machine",
    category: "Home Appliances",
    condition: "Used - Good",
    price: 310,
    originalPrice: 480,
    description: "6th Sense SoftMove technology with 1400 RPM spin speed and 99.9% Steam Care stain removal. Quiet inverter motor operation with energy star rating.",
    images: [
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 390
  },
  {
    title: "Philips Airfryer XXL Avance Collection (7.3L Capacity, Fat Removal Tech)",
    category: "Home Appliances",
    condition: "Used - Like New",
    price: 165,
    originalPrice: 260,
    description: "Rapid Air technology with 90% less fat cooking. Large capacity cooks a whole chicken or 1.4kg of fries. Dishwasher-safe removable parts.",
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Banani, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 360
  },
  {
    title: "Nespresso Vertuo Plus Coffee & Espresso Machine by Breville (Matte Black)",
    category: "Home Appliances",
    condition: "Used - Like New",
    price: 120,
    originalPrice: 189,
    description: "Centrifusion technology reads pod barcodes to brew 5 cup sizes from Espresso to Alto. Heats up in 20 seconds. Includes 14 sample Nespresso Vertuo pods.",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Baridhara DOHS, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 290
  },
  {
    title: "Gree 1.5 Ton Inverter Split Air Conditioner (5-Star Power Saver, R32)",
    category: "Home Appliances",
    condition: "Used - Good",
    price: 360,
    originalPrice: 580,
    description: "Cold Plasma air purification filter with 100% copper condenser coil. Rapid cooling within 60 seconds. Used for 1 summer season, pristine working order.",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Mirpur 12, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 480
  },
  {
    title: "Panasonic 27L Convection Microwave Oven with Grill (Stainless Steel)",
    category: "Home Appliances",
    condition: "Used - Good",
    price: 95,
    originalPrice: 160,
    description: "Zero oil cooking presets, auto-defrost menu, dual heating elements for baking cakes, pizzas, and grilling kebabs. Clean interior cavity.",
    images: [
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Lalmatia, Dhaka",
    sellerId: "user_demo_3",
    sellerName: "Nusrat Jahan",
    sellerRating: 4.8,
    sellerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1911-223344",
    status: "Available",
    isFeatured: false,
    views: 240
  },
  {
    title: "Xiaomi Smart Air Purifier 4 Pro (True HEPA Filter, OLED Display, Wi-Fi)",
    category: "Home Appliances",
    condition: "Brand New",
    price: 150,
    originalPrice: 210,
    description: "Filters 99.97% of 0.3μm airborne particles, pet dander, and odors. Covers up to 60m² area with Mi Home app integration and Google Assistant control.",
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Bashundhara R/A, Dhaka",
    sellerId: "user_demo_4",
    sellerName: "Arif Chowdhury",
    sellerRating: 4.7,
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1622-556677",
    status: "Available",
    isFeatured: false,
    views: 310
  },
  {
    title: "Instant Pot Duo Plus 9-in-1 Multi-Use Electric Pressure Cooker (6 Quart)",
    category: "Home Appliances",
    condition: "Used - Like New",
    price: 85,
    originalPrice: 130,
    description: "Replaces 9 appliances: Pressure Cooker, Slow Cooker, Rice Cooker, Yogurt Maker, Steamer, Saute Pan, Sterilizer, Food Warmer, and Sous Vide.",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Gulshan 2, Dhaka",
    sellerId: "user_demo_1",
    sellerName: "Tanvir Rahman",
    sellerRating: 4.9,
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1711-223344",
    status: "Available",
    isFeatured: false,
    views: 220
  },
  {
    title: "Roborock S8 Robot Vacuum Cleaner & Sonic Mopping System with Obstacle Avoidance",
    category: "Home Appliances",
    condition: "Used - Like New",
    price: 540,
    originalPrice: 749,
    description: "6000Pa DuoRoller Riser brush suction power with VibraRise sonic scrubbing mop (3000 times/min). 3D structured light obstacle recognition and LiDAR navigation.",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1000&q=80"
    ],
    location: "Dhanmondi, Dhaka",
    sellerId: "user_demo_2",
    sellerName: "Sabbir Hossain",
    sellerRating: 5.0,
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerPhone: "+880 1812-345678",
    status: "Available",
    isFeatured: false,
    views: 410
  }
];

async function seedDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('ERROR: MONGODB_URI is not set in backend/.env!');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB Atlas!');

    console.log('Clearing existing products collection...');
    await Product.deleteMany({});

    console.log(`Inserting ${sampleProducts.length} items (10 per category across 8 categories)...`);
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ SUCCESS! Successfully inserted ${inserted.length} products into database collection!`);

    const categories = ['Electronics', 'Mobile Phones', 'Vehicles', 'Furniture', 'Fashion', 'Gaming', 'Books & Hobbies', 'Home Appliances'];
    console.log('\n--- Collection Breakdown ---');
    for (const cat of categories) {
      const count = await Product.countDocuments({ category: cat });
      console.log(`- ${cat}: ${count} products`);
    }

    await mongoose.disconnect();
    console.log('\nDatabase connection closed. Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed MongoDB:', err);
    process.exit(1);
  }
}

seedDatabase();
