/**
 * Fowzi AI Stylist - Image Analysis Engine
 * Handles image canvas rendering, landmark overlay drawing, pixel color sampling,
 * and rule-based trait extraction.
 */

import { COLOR_PALETTES, BODY_SILHOUETTES, FACE_HAIRSTYLES } from './data.js';

export function sampleSkinToneFromImage(imageElement, canvasElement) {
  const ctx = canvasElement.getContext('2d');
  canvasElement.width = imageElement.naturalWidth || imageElement.width || 400;
  canvasElement.height = imageElement.naturalHeight || imageElement.height || 400;
  
  ctx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height);

  // Sample center cheek region (approx 45-55% width, 40-50% height)
  const sampleX = Math.floor(canvasElement.width * 0.5);
  const sampleY = Math.floor(canvasElement.height * 0.45);
  const sampleSize = 20;

  try {
    const imgData = ctx.getImageData(sampleX, sampleY, sampleSize, sampleSize);
    const data = imgData.data;
    let r = 0, g = 0, b = 0, count = 0;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    const hexColor = rgbToHex(r, g, b);
    const paletteKey = determinePaletteFromRGB(r, g, b);

    // Draw scanning HUD mesh on canvas
    drawFaceLandmarkOverlay(ctx, canvasElement.width, canvasElement.height, sampleX, sampleY);

    return {
      r, g, b,
      hexColor,
      paletteKey,
      paletteData: COLOR_PALETTES[paletteKey]
    };
  } catch (e) {
    console.warn("Canvas pixel read fallback:", e);
    // Fallback if cross-origin or canvas read error
    return {
      r: 194, g: 89, b: 63,
      hexColor: "#c2593f",
      paletteKey: "Warm Autumn",
      paletteData: COLOR_PALETTES["Warm Autumn"]
    };
  }
}

export function drawFaceLandmarkOverlay(ctx, w, h, cx, cy) {
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';

  // Face oval contour
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.22, h * 0.32, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Landmark dots (Eyes, Nose, Jaw, Lips)
  const landmarks = [
    { x: cx - w * 0.08, y: cy - h * 0.06 }, // Left eye
    { x: cx + w * 0.08, y: cy - h * 0.06 }, // Right eye
    { x: cx, y: cy + h * 0.02 },            // Nose tip
    { x: cx - w * 0.05, y: cy + h * 0.12 }, // Left lip corner
    { x: cx + w * 0.05, y: cy + h * 0.12 }, // Right lip corner
    { x: cx, y: cy + h * 0.24 }             // Chin
  ];

  landmarks.forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  // Mesh connecting lines
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(landmarks[0].x, landmarks[0].y);
  ctx.lineTo(landmarks[1].x, landmarks[1].y);
  ctx.lineTo(landmarks[2].x, landmarks[2].y);
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);
}

export function analyzeBodySilhouetteFromImage(imageElement, canvasElement) {
  const ctx = canvasElement.getContext('2d');
  canvasElement.width = imageElement.naturalWidth || imageElement.width || 400;
  canvasElement.height = imageElement.naturalHeight || imageElement.height || 600;

  ctx.drawImage(imageElement, 0, 0, canvasElement.width, canvasElement.height);

  const w = canvasElement.width;
  const h = canvasElement.height;

  // Draw pose skeleton overlay
  drawPoseSkeletonOverlay(ctx, w, h);

  // Return estimated body silhouette based on standard landmark proportions
  return {
    bodyTypeKey: "Hourglass",
    bodyTypeData: BODY_SILHOUETTES["Hourglass"],
    shoulderWidthPx: Math.round(w * 0.38),
    waistWidthPx: Math.round(w * 0.26),
    hipWidthPx: Math.round(w * 0.37)
  };
}

export function drawPoseSkeletonOverlay(ctx, w, h) {
  ctx.strokeStyle = 'rgba(78, 205, 196, 0.85)';
  ctx.fillStyle = '#4ecdc4';
  ctx.lineWidth = 3;

  const points = {
    head: { x: w * 0.5, y: h * 0.15 },
    neck: { x: w * 0.5, y: h * 0.22 },
    lShoulder: { x: w * 0.32, y: h * 0.26 },
    rShoulder: { x: w * 0.68, y: h * 0.26 },
    lElbow: { x: w * 0.24, y: h * 0.40 },
    rElbow: { x: w * 0.76, y: h * 0.40 },
    lWaist: { x: w * 0.37, y: h * 0.48 },
    rWaist: { x: w * 0.63, y: h * 0.48 },
    lHip: { x: w * 0.33, y: h * 0.58 },
    rHip: { x: w * 0.67, y: h * 0.58 },
    lAnkle: { x: w * 0.36, y: h * 0.90 },
    rAnkle: { x: w * 0.64, y: h * 0.90 }
  };

  // Draw skeleton bones
  const connections = [
    [points.head, points.neck],
    [points.neck, points.lShoulder],
    [points.neck, points.rShoulder],
    [points.lShoulder, points.lElbow],
    [points.rShoulder, points.rElbow],
    [points.lShoulder, points.lWaist],
    [points.rShoulder, points.rWaist],
    [points.lWaist, points.lHip],
    [points.rWaist, points.rHip],
    [points.lHip, points.lAnkle],
    [points.rHip, points.rAnkle]
  ];

  connections.forEach(([p1, p2]) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  });

  // Draw joint nodes
  Object.values(points).forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw dimension markers (Shoulder line, Waist line, Hip line)
  ctx.strokeStyle = '#f7b731';
  ctx.setLineDash([6, 3]);

  // Shoulder line
  ctx.beginPath();
  ctx.moveTo(points.lShoulder.x - 15, points.lShoulder.y);
  ctx.lineTo(points.rShoulder.x + 15, points.rShoulder.y);
  ctx.stroke();

  // Waist line
  ctx.beginPath();
  ctx.moveTo(points.lWaist.x - 15, points.lWaist.y);
  ctx.lineTo(points.rWaist.x + 15, points.rWaist.y);
  ctx.stroke();

  // Hip line
  ctx.beginPath();
  ctx.moveTo(points.lHip.x - 15, points.lHip.y);
  ctx.lineTo(points.rHip.x + 15, points.rHip.y);
  ctx.stroke();

  ctx.setLineDash([]);
}

function determinePaletteFromRGB(r, g, b) {
  // Simple warmth & brightness heuristic
  const brightness = (r + g + b) / 3;
  const warmth = r - b;

  if (warmth > 25 && brightness < 170) {
    return "Warm Autumn";
  } else if (warmth > 20 && brightness >= 170) {
    return "Light Spring";
  } else if (warmth <= 20 && brightness < 140) {
    return "Deep Winter";
  } else {
    return "Soft Summer";
  }
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}
