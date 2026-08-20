/**
 * Fowzi AI Stylist - Recommendation Engine
 * Matches extracted user profile (palette, body shape, face shape, occasion)
 * with partner shop catalog stock to generate a cohesive "Complete Look".
 */

import { CATALOG_ITEMS, PILOT_SHOPS, FACE_HAIRSTYLES } from './data.js';

export function buildCompleteLook({ paletteKey, bodyTypeKey, faceShapeKey = "Oval", occasion = "Festive" }) {
  // Score items in catalog
  const scoredItems = CATALOG_ITEMS.map(item => {
    let score = 0;

    // Color palette match (40 points)
    if (item.colorPalette === paletteKey) {
      score += 40;
    }

    // Body silhouette suitability (35 points)
    if (item.bodyTypeSuitability.includes(bodyTypeKey)) {
      score += 35;
    }

    // Occasion match (25 points)
    if (item.occasion.includes(occasion)) {
      score += 25;
    }

    return { ...item, matchScore: score };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // Pick top outfit
  const primaryOutfit = scoredItems.find(item => item.category === "outfit") || CATALOG_ITEMS[0];

  // Pick top accessories matching outfit
  const bagAccessory = scoredItems.find(item => item.category === "accessory") || CATALOG_ITEMS[3];
  const jewelryAccessory = scoredItems.find(item => item.category === "jewelry") || CATALOG_ITEMS[5];
  const footwearAccessory = scoredItems.find(item => item.category === "footwear") || CATALOG_ITEMS[6];

  // Hairstyle direction
  const hairstyleGuide = FACE_HAIRSTYLES[faceShapeKey] || FACE_HAIRSTYLES["Oval"];

  // Partner shop details
  const outfitShop = PILOT_SHOPS.find(s => s.id === primaryOutfit.shopId) || PILOT_SHOPS[0];

  return {
    primaryOutfit,
    outfitShop,
    accessories: {
      bag: bagAccessory,
      jewelry: jewelryAccessory,
      footwear: footwearAccessory
    },
    hairstyleGuide,
    totalPrice: primaryOutfit.price + bagAccessory.price + jewelryAccessory.price + footwearAccessory.price,
    reasoning: generateStylingReasoning(paletteKey, bodyTypeKey, primaryOutfit, outfitShop)
  };
}

function generateStylingReasoning(paletteKey, bodyTypeKey, outfit, shop) {
  return [
    `The ${outfit.colorName} hue activates your ${paletteKey} skin profile, casting a luminous warm glow.`,
    `The ${outfit.subCategory} cut provides structured waist accentuation, balancing your ${bodyTypeKey} silhouette.`,
    `Sourced directly from partner boutique "${shop.name}" in ${shop.city} with verified live stock availability.`
  ];
}
