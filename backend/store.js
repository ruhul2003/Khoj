// Memory store fallback for smooth local testing and immediate preview

const seedProducts = [
  // ==================== ELECTRONICS (10) ====================
  {
    _id: "prod_elec_1",
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
    views: 480,
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  },
  {
    _id: "prod_elec_2",
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
    views: 310,
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
  },
  {
    _id: "prod_elec_3",
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
    views: 620,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    _id: "prod_elec_4",
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
    views: 290,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    _id: "prod_elec_5",
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
    views: 410,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  },
  {
    _id: "prod_elec_6",
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
    views: 380,
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString()
  },
  {
    _id: "prod_elec_7",
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
    views: 510,
    createdAt: new Date(Date.now() - 3600000 * 15).toISOString()
  },
  {
    _id: "prod_elec_8",
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
    views: 195,
    createdAt: new Date(Date.now() - 3600000 * 80).toISOString()
  },
  {
    _id: "prod_elec_9",
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
    views: 260,
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString()
  },
  {
    _id: "prod_elec_10",
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
    views: 340,
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString()
  },

  // ==================== MOBILE PHONES (10) ====================
  {
    _id: "prod_mob_1",
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
    views: 740,
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString()
  },
  {
    _id: "prod_mob_2",
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
    views: 690,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    _id: "prod_mob_3",
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
    views: 450,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    _id: "prod_mob_4",
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
    views: 390,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    _id: "prod_mob_5",
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
    views: 310,
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString()
  },
  {
    _id: "prod_mob_6",
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
    views: 490,
    createdAt: new Date(Date.now() - 3600000 * 50).toISOString()
  },
  {
    _id: "prod_mob_7",
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
    views: 560,
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString()
  },
  {
    _id: "prod_mob_8",
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
    views: 280,
    createdAt: new Date(Date.now() - 3600000 * 65).toISOString()
  },
  {
    _id: "prod_mob_9",
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
    views: 230,
    createdAt: new Date(Date.now() - 3600000 * 42).toISOString()
  },
  {
    _id: "prod_mob_10",
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
    views: 210,
    createdAt: new Date(Date.now() - 3600000 * 33).toISOString()
  },

  // ==================== GAMING (10) ====================
  {
    _id: "prod_game_1",
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
    views: 680,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    _id: "prod_game_2",
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
    views: 590,
    createdAt: new Date(Date.now() - 3600000 * 16).toISOString()
  },
  {
    _id: "prod_game_3",
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
    views: 510,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    _id: "prod_game_4",
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
    views: 470,
    createdAt: new Date(Date.now() - 3600000 * 35).toISOString()
  },
  {
    _id: "prod_game_5",
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
    views: 390,
    createdAt: new Date(Date.now() - 3600000 * 55).toISOString()
  },

  // ==================== VEHICLES (10) ====================
  {
    _id: "prod_veh_1",
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
    views: 980,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    _id: "prod_veh_2",
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
    views: 850,
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    _id: "prod_veh_3",
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
    views: 610,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },

  // ==================== FURNITURE (10) ====================
  {
    _id: "prod_furn_1",
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
    views: 390,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    _id: "prod_furn_2",
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
    views: 420,
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString()
  },

  // ==================== FASHION (10) ====================
  {
    _id: "prod_fash_1",
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
    views: 520,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    _id: "prod_fash_2",
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
    views: 410,
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString()
  },

  // ==================== BOOKS & HOBBIES (10) ====================
  {
    _id: "prod_book_1",
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
    views: 490,
    createdAt: new Date(Date.now() - 3600000 * 25).toISOString()
  },
  {
    _id: "prod_book_2",
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
    views: 560,
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString()
  },

  // ==================== HOME APPLIANCES (10) ====================
  {
    _id: "prod_home_1",
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
    views: 450,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    _id: "prod_home_2",
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
    views: 520,
    createdAt: new Date(Date.now() - 3600000 * 15).toISOString()
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
let offers = [];
let messages = [];

module.exports = {
  products,
  users,
  orders,
  offers,
  messages,
  seedProducts
};
