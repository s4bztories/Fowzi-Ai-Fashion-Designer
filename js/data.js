/**
 * Fowzi AI Stylist - Core Dataset
 * Pilot Shops, Catalog Items, Seasonal Color Systems, Body Silhouette Rules, and Hairstyle Guidance.
 */

export const PILOT_SHOPS = [
  {
    id: "shop_shree",
    name: "Shree Boutique",
    city: "Jaipur, Rajasthan",
    specialty: "Handcrafted Silk Anarkalis & Sarees",
    commissionType: "Conversion-based (12%)",
    updateCadence: "Weekly (Mondays)",
    itemCount: 42,
    rating: 4.9,
    contactWhatsapp: "+919876543210",
    verified: true,
    logo: "👑"
  },
  {
    id: "shop_heritage",
    name: "Heritage Jewels",
    city: "Udaipur, Rajasthan",
    specialty: "Antique Kundan & Temple Jewelry",
    commissionType: "Conversion-based (15%)",
    updateCadence: "Weekly (Wednesdays)",
    itemCount: 28,
    rating: 4.8,
    contactWhatsapp: "+919876543211",
    verified: true,
    logo: "💎"
  },
  {
    id: "shop_craft",
    name: "Craft & Co",
    city: "New Delhi",
    specialty: "Hand-embroidered Potli Bags & Clutches",
    commissionType: "Affiliate Click (₹50/click)",
    updateCadence: "Bi-weekly",
    itemCount: 35,
    rating: 4.9,
    contactWhatsapp: "+919876543212",
    verified: true,
    logo: "👜"
  },
  {
    id: "shop_sole",
    name: "Sole & Style",
    city: "Amritsar, Punjab",
    specialty: "Artisanal Ethnic Mojaris & Juttis",
    commissionType: "Conversion-based (10%)",
    updateCadence: "Weekly (Fridays)",
    itemCount: 24,
    rating: 4.7,
    contactWhatsapp: "+919876543213",
    verified: true,
    logo: "👠"
  }
];

export const CATALOG_ITEMS = [
  // Outfits
  {
    id: "item_outfit_1",
    name: "Terracotta Silk Embroidered Anarkali",
    shopId: "shop_shree",
    shopName: "Shree Boutique",
    category: "outfit",
    subCategory: "Anarkali Suit",
    price: 8499,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 4,
    colorPalette: "Warm Autumn",
    primaryColor: "#c2593f",
    colorName: "Terracotta & Antique Gold",
    bodyTypeSuitability: ["Hourglass", "Pear", "Rectangle"],
    occasion: ["Festive", "Wedding", "Evening"],
    imageUrl: "./assets/outfit_terracotta.jpg",
    description: "Pure Chanderi silk flared Anarkali featuring intricate Gota Patti hand embroidery around the neckline and borders. Includes silk pants and organza dupatta.",
    whyItFits: "The warm terracotta hue activates golden warm skin undertones, while the high flared waistline balances pear and hourglass silhouettes."
  },
  {
    id: "item_outfit_2",
    name: "Royal Emerald Hand-Woven Chanderi Lehenga",
    shopId: "shop_shree",
    shopName: "Shree Boutique",
    category: "outfit",
    subCategory: "Lehenga Choli",
    price: 14500,
    sizes: ["M", "L"],
    inStock: true,
    stockCount: 2,
    colorPalette: "Deep Winter",
    primaryColor: "#0f5236",
    colorName: "Deep Emerald Green",
    bodyTypeSuitability: ["Hourglass", "Inverted Triangle", "Athletic"],
    occasion: ["Wedding", "Festive"],
    imageUrl: "./assets/hero.jpg",
    description: "Deep emerald silk lehenga adorned with zardozi threadwork and badla embroidery. Comes with matching blouse and sheer netted dupatta.",
    whyItFits: "Rich jewel-toned emerald provides high contrast for cool and deep winter complexions, creating an ethereal regal silhouette."
  },
  {
    id: "item_outfit_3",
    name: "Mustard Silk Draped Dhoti Kurta Set",
    shopId: "shop_shree",
    shopName: "Shree Boutique",
    category: "outfit",
    subCategory: "Indo-Western Set",
    price: 6200,
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    stockCount: 7,
    colorPalette: "Light Spring",
    primaryColor: "#e5a93b",
    colorName: "Mustard Gold",
    bodyTypeSuitability: ["Rectangle", "Athletic", "Inverted Triangle"],
    occasion: ["Festive", "Casual"],
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    description: "Contemporary asymmetric tunic styled with pre-draped dhoti pants in raw silk, detailed with mirror work along the lapel.",
    whyItFits: "Bright warm mustard creates a lively radiance for spring complexions, with draped pants adding soft volume to athletic frames."
  },

  // Accessories - Bags
  {
    id: "item_acc_1",
    name: "Royal Maroon Kundan Hand-Embroidered Potli",
    shopId: "shop_craft",
    shopName: "Craft & Co",
    category: "accessory",
    subCategory: "Potli Bag",
    price: 2850,
    sizes: ["One Size"],
    inStock: true,
    stockCount: 6,
    colorPalette: "Warm Autumn",
    primaryColor: "#800020",
    colorName: "Deep Maroon & Gold",
    bodyTypeSuitability: ["Hourglass", "Pear", "Rectangle", "Inverted Triangle", "Athletic"],
    occasion: ["Festive", "Wedding", "Evening"],
    imageUrl: "./assets/potli_bag.jpg",
    description: "Velvet potli bag meticulously detailed with zardozi gold embroidery, pearl tassel drawstrings, and silk lining.",
    whyItFits: "Complements traditional festive attire; rich maroon pairs seamlessly with terracotta, gold, and emerald silk ensembles."
  },
  {
    id: "item_acc_2",
    name: "Ivory Pearl & Zari Frame Clutch",
    shopId: "shop_craft",
    shopName: "Craft & Co",
    category: "accessory",
    subCategory: "Clutch",
    price: 3200,
    sizes: ["One Size"],
    inStock: true,
    stockCount: 3,
    colorPalette: "Soft Summer",
    primaryColor: "#f5f5f0",
    colorName: "Ivory Pearl",
    bodyTypeSuitability: ["Hourglass", "Pear", "Rectangle", "Inverted Triangle", "Athletic"],
    occasion: ["Wedding", "Evening"],
    imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80",
    description: "Satin clutch enveloped in hand-strung faux freshwater pearls with detachable antique gold chain strap.",
    whyItFits: "Soft ivory tones add gentle luster to muted summer color palettes and complement subtle pastel outfits."
  },

  // Accessories - Jewelry
  {
    id: "item_jewel_1",
    name: "Antique Kundan & Pearl Drop Jhumkas",
    shopId: "shop_heritage",
    shopName: "Heritage Jewels",
    category: "jewelry",
    subCategory: "Earrings",
    price: 4200,
    sizes: ["One Size"],
    inStock: true,
    stockCount: 5,
    colorPalette: "Warm Autumn",
    primaryColor: "#d4af37",
    colorName: "Antique Gold & Pearl",
    bodyTypeSuitability: ["Hourglass", "Pear", "Rectangle", "Inverted Triangle", "Athletic"],
    occasion: ["Festive", "Wedding"],
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    description: "Handcrafted brass base plated in 22k gold foil with green meenakari work, micro pearls, and uncut polki stones.",
    whyItFits: "Warm antique gold plating flatters golden undertones and framing hairstyles, bringing focus to the jawline."
  },

  // Footwear
  {
    id: "item_foot_1",
    name: "Hand-Embroidered Zari & Bead Ethnic Mojaris",
    shopId: "shop_sole",
    shopName: "Sole & Style",
    category: "footwear",
    subCategory: "Mojari / Jutti",
    price: 2400,
    sizes: ["37", "38", "39", "40"],
    inStock: true,
    stockCount: 8,
    colorPalette: "Warm Autumn",
    primaryColor: "#c2593f",
    colorName: "Terracotta & Gold",
    bodyTypeSuitability: ["Hourglass", "Pear", "Rectangle", "Inverted Triangle", "Athletic"],
    occasion: ["Festive", "Wedding", "Casual"],
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    description: "100% genuine leather base with double padding for comfort, hand-stitched with dabka and sequin motifs.",
    whyItFits: "Echoes the warm terracotta color palette of the primary outfit to deliver a unified head-to-toe styling experience."
  }
];

export const COLOR_PALETTES = {
  "Warm Autumn": {
    name: "Warm Autumn",
    undertone: "Warm Golden / Peach",
    bestColors: ["Terracotta", "Mustard Gold", "Olive Green", "Deep Maroon", "Warm Copper"],
    colorsToAvoid: ["Electric Blue", "Icy Pink", "Stark Cool White"],
    recommendedMetals: "Antique Gold, Copper & Warm Kundan",
    hexCodes: ["#c2593f", "#e5a93b", "#556b2f", "#800020", "#b87333"],
    description: "Rich, earthy, and sun-kissed tones that mirror autumn foliage and warm sunlight."
  },
  "Deep Winter": {
    name: "Deep Winter",
    undertone: "Cool Pink / Deep Olive",
    bestColors: ["Emerald Green", "Royal Blue", "Deep Ruby Red", "Plum", "Pure White"],
    colorsToAvoid: ["Pastel Yellow", "Muted Beige", "Dusty Peach"],
    recommendedMetals: "Silver, White Gold & Polki Diamonds",
    hexCodes: ["#0f5236", "#002366", "#9b111e", "#4b0082", "#ffffff"],
    description: "High-contrast, jewel-toned hues with intense clarity and deep royal authority."
  },
  "Soft Summer": {
    name: "Soft Summer",
    undertone: "Neutral Cool / Rose",
    bestColors: ["Rose Pink", "Dusty Lavender", "Sage Green", "Soft Slate Blue", "Muted Ivory"],
    colorsToAvoid: ["Neon Orange", "Hot Yellow", "Harsh Black"],
    recommendedMetals: "Rose Gold, Oxidized Silver & Freshwater Pearls",
    hexCodes: ["#d8a7b1", "#b5a7c2", "#9caf88", "#708090", "#f5f5f0"],
    description: "Gentle, romantic, and dreamy cool tones inspired by soft misty mornings."
  },
  "Light Spring": {
    name: "Light Spring",
    undertone: "Warm Peachy / Golden",
    bestColors: ["Peach Coral", "Warm Canary Gold", "Mint Green", "Aqua", "Warm Cream"],
    colorsToAvoid: ["Dark Charcoal", "Deep Burgundy", "Muddy Brown"],
    recommendedMetals: "Bright Yellow Gold & Yellow Sapphires",
    hexCodes: ["#f88379", "#ffdb58", "#98ff98", "#00ffff", "#fffdd0"],
    description: "Bright, fresh, and luminous pastel shades infused with golden sunshine."
  }
};

export const BODY_SILHOUETTES = {
  "Hourglass": {
    title: "Balanced Hourglass",
    ratioDescription: "Shoulder and hip measurements are balanced with a defined waistline.",
    stylingAdvice: "Emphasize your waist! Fitted cholis, flared Anarkalis with empire waistbands, and belted drapes highlight your natural symmetry.",
    bestNecklines: "V-Neck, Sweetheart, Scoop Neck",
    recommendedCuts: ["Flared Anarkalis", "Fitted Lehengas", "Draped Sarees"]
  },
  "Pear": {
    title: "Pear / A-Line",
    ratioDescription: "Hips are subtly wider than shoulder line with a defined waist.",
    stylingAdvice: "Draw attention to the neck and torso with embroidered necklines, statement dupattas, and high-waist A-line skirts.",
    bestNecklines: "Boat Neck, Off-Shoulder, Embellished Round Neck",
    recommendedCuts: ["A-Line Anarkalis", "High-Waist Lehengas", "Sharara Sets"]
  },
  "Inverted Triangle": {
    title: "Inverted Triangle",
    ratioDescription: "Shoulders are broader than hip width with an athletic upper frame.",
    stylingAdvice: "Add volume to the lower half with layered pleated skirts, dhoti drapes, and flared bottoms while keeping necklines clean.",
    bestNecklines: "V-Neck, Deep U-Neck, Halter Neck",
    recommendedCuts: ["Pleated Lehengas", "Dhoti Sets", "Gharara Suits"]
  },
  "Rectangle": {
    title: "Column / Rectangle",
    ratioDescription: "Shoulders, waist, and hips are aligned with minimal waist dip.",
    stylingAdvice: "Create the illusion of curves! Layered tunics, peplum blouses, cinched waist belts, and textured fabrics add dimension.",
    bestNecklines: "Sweetheart, Cowl Neck, High Neck with Cutouts",
    recommendedCuts: ["Peplum Shararas", "Layered Indo-Westerns", "Ruffled Sarees"]
  }
};

export const FACE_HAIRSTYLES = {
  "Oval": {
    title: "Oval Face Shape",
    summary: "Balanced proportions with gently rounded jawline and slightly wider forehead.",
    hairstyleDirection: "Soft Layered Waves & Side-Swept Volume",
    details: "Most versatile face shape! Face-framing soft layers add graceful motion around the cheekbones without obscuring your jaw.",
    referenceImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    tips: ["Soft beach waves with side parting", "Sleek low bun with loose front tendrils", "Textured layered bob"]
  },
  "Round": {
    title: "Round Face Shape",
    summary: "Equal width and length with soft, curved cheekbones and jawline.",
    hairstyleDirection: "High Crown Volume & Long Angular Layers",
    details: "Elongate the face by creating height at the crown. Long cascading layers starting below the chin elongate facial structure.",
    referenceImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    tips: ["High bouffant bun with Maang Tikka", "Deep side part with asymmetric length", "Curtain bangs framing chin"]
  },
  "Square": {
    title: "Square Face Shape",
    summary: "Strong, well-defined jawline with equal width at forehead and cheeks.",
    hairstyleDirection: "Soft Feathered Layers & Waves",
    details: "Soften strong jaw angles with gentle waves, wispy bangs, and side-parted styles that cascade softly across the shoulders.",
    referenceImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    tips: ["Soft romantic side braid", "Voluminous loose curls", "Wispy curtain bangs"]
  },
  "Heart": {
    title: "Heart Face Shape",
    summary: "Wider forehead tapering down to a delicate, pointed chin line.",
    hairstyleDirection: "Chin-Length Bob or Low Textured Bun",
    details: "Balance a wider forehead by building volume around the jawline. A low textured chignon or chin-grazing waves work wonders.",
    referenceImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    tips: ["Low side bun with floral gajra", "Chin-length textured waves", "Center part with chin-length layers"]
  }
};

export const TEST_MODEL_PRESETS = [
  {
    id: "preset_1",
    name: "Model Ananya (Warm Autumn • Hourglass)",
    faceImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bodyImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    palette: "Warm Autumn",
    bodyType: "Hourglass",
    faceShape: "Oval",
    undertone: "Warm Golden",
    hexSample: "#c2593f"
  },
  {
    id: "preset_2",
    name: "Model Priya (Deep Winter • Pear Shape)",
    faceImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    bodyImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
    palette: "Deep Winter",
    bodyType: "Pear",
    faceShape: "Round",
    undertone: "Cool Pink / Deep Olive",
    hexSample: "#0f5236"
  },
  {
    id: "preset_3",
    name: "Model Diya (Soft Summer • Rectangle)",
    faceImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    bodyImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    palette: "Soft Summer",
    bodyType: "Rectangle",
    faceShape: "Square",
    undertone: "Neutral Cool",
    hexSample: "#d8a7b1"
  }
];
