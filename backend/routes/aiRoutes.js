const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getIsConnected } = require('../config/db');
const { products } = require('../store');

// Helper to get products from DB or fallback memory store
async function getCatalogProducts() {
  try {
    if (getIsConnected()) {
      const dbProducts = await Product.find({ status: 'Available' }).lean().limit(100);
      if (dbProducts && dbProducts.length > 0) {
        return dbProducts;
      }
    }
  } catch (err) {
    console.warn('AI router catalog fetch fallback:', err.message);
  }
  return products || [];
}

// Built-in intelligent Khoj assistant response generator
function generateMarketplaceResponse(query, catalog) {
  const q = (query || '').toLowerCase().trim();

  // 1. GREETINGS & INTRO
  if (/^(hi|hello|hey|salam|assalamu|greetings|hola|good\s*(morning|afternoon|evening))/i.test(q)) {
    return {
      reply: `👋 **Hello! Welcome to Khoj AI Assistant.**\n\nI am your 24/7 personal shopping & marketplace guide for **Khoj**. I can help you with:\n\n• 🔍 **Finding verified products** (Phones, Laptops, Furniture, Bikes, etc.)\n• 🛡️ **Safe Handover Hubs** & escrow protection\n• 🏷️ **Selling items** & tips to price competitively\n• 🤝 **Negotiations & Making Offers**\n• ⚖️ **Comparing devices & specs**\n\nWhat are you looking for today?`,
      suggestedPrompts: [
        "Find me laptops under $2000",
        "Show latest mobile phones",
        "How do Safe Handover Hubs work?",
        "Tips to sell my item quickly"
      ],
      recommendedProducts: catalog.slice(0, 3),
      action: { label: "Browse All Products", url: "/browse" }
    };
  }

  // 2. SAFE HANDOVER / ESCROW / SAFETY
  if (/safe|handover|escrow|scam|security|fraud|meet\s*up|inspection|safe\s*hub/i.test(q)) {
    return {
      reply: `🛡️ **Khoj Safe Handover & Buyer Protection**\n\nKhoj ensures 100% scam-free peer-to-peer trading through our **Safe Handover Hubs**:\n\n1. **Verified Exchange Hubs:** Meet in partner hubs equipped with 24/7 CCTV surveillance and security staff in prime locations (Gulshan 2, Dhanmondi 27, Banani 11, Uttara Sector 7, and Mirpur 10).\n2. **Free Testing Desks:** Every hub provides power sockets, Wi-Fi, and inspection checklists to test laptops, smartphones, and gadgets before paying.\n3. **Protected Escrow:** You can pay into the Khoj Escrow Vault. The seller only receives the payout once you physically inspect and release the verification OTP.\n\nNever send money in advance without using Khoj Escrow!`,
      suggestedPrompts: [
        "Where are the Safe Hubs located?",
        "How to use the inspection checklist?",
        "Show verified electronics"
      ],
      recommendedProducts: [],
      action: { label: "Explore Safe Handover Hubs", url: "/#safe-hubs" }
    };
  }

  // 3. SELLING ITEMS / HOW TO POST AD
  if (/sell|list|post\s*ad|upload|create\s*listing|become\s*seller|vendor/i.test(q)) {
    return {
      reply: `📦 **How to Sell on Khoj in 3 Simple Steps**\n\nSelling your pre-owned or brand new items is completely free:\n\n1. **Click '+ Post Ad'** in the top navigation bar.\n2. **Add Clear Photos & Details:** Upload real, well-lit photos. Select condition (*Brand New*, *Used - Like New*, *Used - Good*).\n3. **Set Fair Pricing:** Check similar items to price competitively. You can enable *Negotiable* or allow buyers to submit counter-offers via **Make an Offer**.\n\n💡 *Pro-Tip:* Sellers with prompt chat replies and clear descriptions sell 3x faster!`,
      suggestedPrompts: [
        "What categories can I sell?",
        "How do I receive payments?",
        "View my seller profile"
      ],
      recommendedProducts: [],
      action: { label: "Post an Ad Now", url: "/post-ad" }
    };
  }

  // 4. NEGOTIATING / MAKE AN OFFER
  if (/bargain|negotiat|offer|discount|price\s*cut|cheap|cheaper/i.test(q) && !/show|find|search/i.test(q)) {
    return {
      reply: `🤝 **Negotiating & Making Offers on Khoj**\n\nKhoj features an interactive **Make an Offer** modal on every product page:\n\n• Browse to any product you like and click **'Make Offer'**.\n• Propose your best counter-offer (usually within 10-20% of the asking price for the highest acceptance rate).\n• The seller receives an instant alert and can **Accept**, **Decline**, or propose a **Counter-Offer**.\n• Once agreed, both of you can coordinate handover right in the Chat Drawer!`,
      suggestedPrompts: [
        "Show discounted flash deals",
        "Browse electronics with discounts",
        "How does buyer chat work?"
      ],
      recommendedProducts: catalog.filter(p => p.originalPrice > p.price).slice(0, 3),
      action: { label: "View Flash Deals", url: "/browse?deal=flash" }
    };
  }

  // 5. WARRANTY & RETURN POLICY
  if (/warranty|guarantee|return|refund|policy|broken|defective/i.test(q)) {
    return {
      reply: `✅ **Khoj Warranty & Buyer Guarantee**\n\n• **7-Day Inspection Protection:** Verified listings displaying the Khoj Guarantee badge come with a 7-day warranty against unstated mechanical or hardware defects.\n• **Condition Transparency:** Every product has a verified grade (*Brand New*, *Used - Like New*, *Used - Good*, *Used - Fair*).\n• **Pre-Handover Checklist:** Use our interactive 10-point checklist during meetup to inspect battery health, screen pixels, IMEI/Serial number, and physical condition.`,
      suggestedPrompts: [
        "Show Used - Like New products",
        "How do Safe Handover Hubs work?",
        "Browse Electronics"
      ],
      recommendedProducts: [],
      action: { label: "Browse Verified Listings", url: "/browse?verifiedOnly=true" }
    };
  }

  // 6. PRODUCT SEARCH & RECOMMENDATION ENGINE
  const categories = ['Electronics', 'Mobile Phones', 'Vehicles', 'Furniture', 'Fashion', 'Gaming', 'Books & Hobbies', 'Home Appliances'];
  let matchedCategory = categories.find(c => q.includes(c.toLowerCase()) || 
    (c === 'Mobile Phones' && /phone|mobile|iphone|samsung|pixel|vivo|xiaomi|smartphone/i.test(q)) ||
    (c === 'Electronics' && /laptop|macbook|dell|headphone|camera|sony|ipad|earbuds/i.test(q)) ||
    (c === 'Furniture' && /sofa|chair|table|desk|bed|couch/i.test(q)) ||
    (c === 'Vehicles' && /bike|motorcycle|scooter|car|yamaha|honda/i.test(q)) ||
    (c === 'Gaming' && /ps5|playstation|xbox|nintendo|game|gpu|rtx/i.test(q))
  );

  // Filter products by query keywords or category
  let matches = catalog.filter(p => {
    const title = (p.title || '').toLowerCase();
    const desc = (p.description || '').toLowerCase();
    const cat = (p.category || '').toLowerCase();

    if (matchedCategory && cat === matchedCategory.toLowerCase()) {
      return true;
    }

    const words = q.split(/\s+/).filter(w => w.length > 2 && !['show', 'find', 'looking', 'want', 'need', 'give', 'best', 'some', 'what', 'have'].includes(w));
    if (words.length > 0) {
      return words.some(w => title.includes(w) || desc.includes(w) || cat.includes(w));
    }
    return false;
  });

  // Check price filter hints
  const priceUnderMatch = q.match(/(?:under|below|less than|within|\$)\s*(\d+)/i);
  if (priceUnderMatch) {
    const maxVal = parseFloat(priceUnderMatch[1]);
    if (!isNaN(maxVal) && maxVal > 0) {
      matches = matches.filter(p => p.price <= maxVal);
    }
  }

  // Fallback to top products if no direct keyword match
  if (matches.length === 0) {
    if (matchedCategory) {
      matches = catalog.filter(p => p.category === matchedCategory);
    }
  }

  if (matches.length > 0) {
    const topMatches = matches.slice(0, 4);
    const catLabel = matchedCategory || 'matching';
    return {
      reply: `✨ Here are top **${catLabel}** recommendations currently available on Khoj that match your inquiry:\n\n${topMatches.map((p, idx) => `${idx + 1}. **${p.title}** — **$${p.price}** *(${p.condition})* in ${p.location}`).join('\n')}\n\nClick any item below to view full specifications, verify seller ratings, or make an offer directly!`,
      suggestedPrompts: [
        "Tell me about seller warranties",
        "How can I negotiate this price?",
        "Can we meet at a Safe Hub?"
      ],
      recommendedProducts: topMatches,
      action: matchedCategory 
        ? { label: `Browse All ${matchedCategory}`, url: `/browse?category=${encodeURIComponent(matchedCategory)}` }
        : { label: "Search More Products", url: `/browse?search=${encodeURIComponent(query)}` }
    };
  }

  // General fallback helpful answer
  return {
    reply: `I understand you're asking about **"${query}"**.\n\nKhoj connects local buyers and sellers for verified electronics, mobile phones, furniture, vehicles, gaming gear, and more.\n\n• You can search across our full catalog by typing brand names (e.g. *MacBook, iPhone, Sony, Herman Miller*).\n• Filter by condition (*Brand New* vs *Used*).\n• Set your price range and verify trusted sellers.\n\nWould you like me to find a specific product category or explain how safe transactions work?`,
    suggestedPrompts: [
      "Show top-rated smartphones",
      "Find furniture & sofas",
      "How does Safe Handover work?",
      "How do I list an item to sell?"
    ],
    recommendedProducts: catalog.slice(0, 3),
    action: { label: "Explore Khoj Catalog", url: "/browse" }
  };
}

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const catalog = await getCatalogProducts();

    // Check if Gemini API key is configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const relevantCatalogSummary = catalog.slice(0, 15).map(p => ({
          id: p._id,
          title: p.title,
          price: p.price,
          category: p.category,
          condition: p.condition,
          location: p.location,
          rating: p.sellerRating
        }));

        const systemPrompt = `You are "Khoj AI", the smart, friendly assistant for Khoj (a peer-to-peer buy & sell marketplace).
Always be helpful, concise, enthusiastic, and provide clear formatting with bullet points and bold highlights.
Key platform facts:
- Safe Handover Hubs: Verified meetup points with CCTV, testing desks, and escrow in Dhaka (Gulshan 2, Dhanmondi, Banani, Uttara, Mirpur).
- Buyers can click 'Make an Offer' on product pages to negotiate directly.
- Free to post ads via '+ Post Ad'.
- 7-Day guarantee on Khoj Verified items.
Here is a sample of current catalog items to reference when relevant:
${JSON.stringify(relevantCatalogSummary, null, 2)}
Always recommend users inspect items safely or use the Safe Handover Hubs.`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            // Find relevant products from catalog
            const qLower = message.toLowerCase();
            const matchingProducts = catalog.filter(p => 
              qLower.includes(p.category.toLowerCase()) || 
              p.title.toLowerCase().split(' ').some(w => w.length > 3 && qLower.includes(w))
            ).slice(0, 3);

            return res.json({
              reply: candidateText,
              suggestedPrompts: [
                "Find laptops & phones",
                "How do Safe Handover Hubs work?",
                "Tips to sell items quickly"
              ],
              recommendedProducts: matchingProducts.length > 0 ? matchingProducts : catalog.slice(0, 2),
              action: { label: "Browse Marketplace", url: "/browse" }
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call skipped/fallback:', geminiError.message);
      }
    }

    // High performance intelligent native engine response
    const result = generateMarketplaceResponse(message, catalog);
    return res.json(result);

  } catch (error) {
    console.error('AI chat endpoint error:', error);
    res.status(500).json({
      reply: "I'm having a brief connection hiccup. Please feel free to browse our categories or ask another question!",
      suggestedPrompts: ["Browse Electronics", "How to post an ad?", "Safe Handover Hubs"],
      recommendedProducts: []
    });
  }
});

module.exports = router;
