/**
 * Fowzi AI Stylist - Main Application Controller
 */

import { TEST_MODEL_PRESETS, CATALOG_ITEMS, PILOT_SHOPS, COLOR_PALETTES, BODY_SILHOUETTES, FACE_HAIRSTYLES } from './data.js';
import { sampleSkinToneFromImage, analyzeBodySilhouetteFromImage } from './analysisEngine.js';
import { buildCompleteLook } from './recommendationEngine.js';
import { renderMerchantPortal } from './portal.js';

// Application State
const state = {
  currentTab: 'scan', // 'scan' | 'catalog' | 'portal'
  selectedPreset: TEST_MODEL_PRESETS[0],
  faceImageSrc: TEST_MODEL_PRESETS[0].faceImage,
  bodyImageSrc: TEST_MODEL_PRESETS[0].bodyImage,
  occasion: 'Festive',
  isScanning: false,
  analysisResults: null,
  completeLook: null
};

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderApp();
});

function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      navBtns.forEach(b => b.classList.remove('active'));
      const targetTab = e.target.dataset.tab;
      e.target.classList.add('active');
      state.currentTab = targetTab;
      renderApp();
    });
  });
}

function renderApp() {
  const viewContainer = document.getElementById('viewContainer');
  
  if (state.currentTab === 'scan') {
    renderScanView(viewContainer);
  } else if (state.currentTab === 'catalog') {
    renderCatalogView(viewContainer);
  } else if (state.currentTab === 'portal') {
    renderMerchantPortal(viewContainer);
  }
}

function renderScanView(container) {
  container.innerHTML = `
    <!-- Hero Banner -->
    <div class="hero-banner">
      <img src="./assets/hero.jpg" alt="Fowzi Fashion Styling" class="hero-bg" />
      <div class="hero-overlay">
        <span class="hero-badge">✨ AI-Powered Complete Look Engine</span>
        <h1 class="hero-title">Your complete look, from people who actually stock it.</h1>
        <p class="hero-desc">
          Upload 2 photos (Face & Full Body). Fowzi analyzes skin undertones, body proportions, and facial structure, then matches you with buyable stock across 15+ partner boutiques.
        </p>
        <div style="display:flex; gap:1rem;">
          <a href="#scannerHub" class="btn btn-primary">Start AI Scan Now</a>
          <button class="btn btn-outline" id="btnQuickDemo">⚡ Load Demo Preset Model</button>
        </div>
      </div>
    </div>

    <!-- Scanner Hub -->
    <div id="scannerHub" class="card glass-panel mb-4">
      <div class="card-header-flex">
        <h2>📸 3-Point AI Scanning Hub</h2>
        <span class="badge badge-gold">v1 MVP Scan Pipeline</span>
      </div>

      <!-- Presets quick selector -->
      <div class="preset-selector mt-3">
        <label><strong>Quick Demo Models (Test 3 Parallel AI Scans Instantly):</strong></label>
        <div class="preset-chips">
          ${TEST_MODEL_PRESETS.map(p => `
            <button class="chip ${p.id === state.selectedPreset.id ? 'selected' : ''}" data-preset-id="${p.id}">
              ${p.name}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="scanner-grid mt-4">
        <!-- Step 1: Face Photo Upload & Canvas -->
        <div class="upload-card">
          <div class="hud-overlay-tag">FACE & SKIN HUD</div>
          <h4>1. Face & Skin Tone Photo</h4>
          <p class="text-xs text-muted mt-1">Extracts skin undertone RGB & face landmark shape</p>
          
          <div class="canvas-preview-box mt-2">
            <img id="faceImgPreview" src="${state.faceImageSrc}" crossorigin="anonymous" style="display:none;" />
            <canvas id="faceCanvas"></canvas>
          </div>
          
          <button class="btn btn-outline btn-xs mt-3" id="btnUploadFace">📁 Change Face Photo</button>
          <input type="file" id="inputFaceFile" accept="image/*" style="display:none;" />
        </div>

        <!-- Step 2: Body Photo Upload & Canvas -->
        <div class="upload-card">
          <div class="hud-overlay-tag">BODY SILHOUETTE HUD</div>
          <h4>2. Full Body Fit Photo</h4>
          <p class="text-xs text-muted mt-1">Computes shoulder-to-hip ratio skeleton overlay</p>
          
          <div class="canvas-preview-box mt-2">
            <img id="bodyImgPreview" src="${state.bodyImageSrc}" crossorigin="anonymous" style="display:none;" />
            <canvas id="bodyCanvas"></canvas>
          </div>

          <button class="btn btn-outline btn-xs mt-3" id="btnUploadBody">📁 Change Body Photo</button>
          <input type="file" id="inputBodyFile" accept="image/*" style="display:none;" />
        </div>
      </div>

      <!-- Occasion Selector & Action -->
      <div class="grid-2col mt-3">
        <div class="form-group">
          <label><strong>Select Styling Occasion:</strong></label>
          <select id="occasionSelect" class="form-control">
            <option value="Festive" ${state.occasion === 'Festive' ? 'selected' : ''}>Festive Celebration (Diwali, Eid, Puja)</option>
            <option value="Wedding" ${state.occasion === 'Wedding' ? 'selected' : ''}>Wedding Guest / Bridal Party</option>
            <option value="Evening" ${state.occasion === 'Evening' ? 'selected' : ''}>Evening Gala & Reception</option>
            <option value="Casual" ${state.occasion === 'Casual' ? 'selected' : ''}>Chic Casual / Brunch</option>
          </select>
        </div>

        <div style="display:flex; align-items:flex-end;">
          <button class="btn btn-primary btn-block" id="btnRunScan">
            🚀 Run AI Analysis & Ground Look in Partner Stock
          </button>
        </div>
      </div>
    </div>

    <!-- Output Section (Results & Moat Display) -->
    <div id="resultsContainer"></div>
  `;

  // Attach scanner events
  attachScannerEvents(container);

  // Trigger initial scan analysis to populate preview canvas
  runScanningPipeline();
}

function attachScannerEvents(container) {
  // Preset model buttons
  const presetChips = container.querySelectorAll('.chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      const presetId = e.target.dataset.presetId;
      const found = TEST_MODEL_PRESETS.find(p => p.id === presetId);
      if (found) {
        state.selectedPreset = found;
        state.faceImageSrc = found.faceImage;
        state.bodyImageSrc = found.bodyImage;
        renderScanView(container);
      }
    });
  });

  const btnQuickDemo = container.querySelector('#btnQuickDemo');
  if (btnQuickDemo) {
    btnQuickDemo.addEventListener('click', () => {
      runScanningPipeline();
    });
  }

  // Upload buttons
  const btnUploadFace = container.querySelector('#btnUploadFace');
  const inputFaceFile = container.querySelector('#inputFaceFile');
  if (btnUploadFace && inputFaceFile) {
    btnUploadFace.addEventListener('click', () => inputFaceFile.click());
    inputFaceFile.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        state.faceImageSrc = URL.createObjectURL(e.target.files[0]);
        renderScanView(container);
      }
    });
  }

  const btnUploadBody = container.querySelector('#btnUploadBody');
  const inputBodyFile = container.querySelector('#inputBodyFile');
  if (btnUploadBody && inputBodyFile) {
    btnUploadBody.addEventListener('click', () => inputBodyFile.click());
    inputBodyFile.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        state.bodyImageSrc = URL.createObjectURL(e.target.files[0]);
        renderScanView(container);
      }
    });
  }

  const occasionSelect = container.querySelector('#occasionSelect');
  if (occasionSelect) {
    occasionSelect.addEventListener('change', (e) => {
      state.occasion = e.target.value;
    });
  }

  const btnRunScan = container.querySelector('#btnRunScan');
  if (btnRunScan) {
    btnRunScan.addEventListener('click', () => {
      runScanningPipeline();
    });
  }
}

function runScanningPipeline() {
  const faceImg = document.getElementById('faceImgPreview');
  const bodyImg = document.getElementById('bodyImgPreview');
  const faceCanvas = document.getElementById('faceCanvas');
  const bodyCanvas = document.getElementById('bodyCanvas');

  if (!faceImg || !bodyImg || !faceCanvas || !bodyCanvas) return;

  const processImages = () => {
    // 1. Skin & Color analysis
    const skinResults = sampleSkinToneFromImage(faceImg, faceCanvas);

    // 2. Body & Fit analysis
    const bodyResults = analyzeBodySilhouetteFromImage(bodyImg, bodyCanvas);

    // Override with preset profile if preset selected for richer metadata
    const paletteKey = state.selectedPreset ? state.selectedPreset.palette : skinResults.paletteKey;
    const bodyTypeKey = state.selectedPreset ? state.selectedPreset.bodyType : bodyResults.bodyTypeKey;
    const faceShapeKey = state.selectedPreset ? state.selectedPreset.faceShape : "Oval";

    // 3. Build complete look from partner shop stock
    const lookBundle = buildCompleteLook({
      paletteKey,
      bodyTypeKey,
      faceShapeKey,
      occasion: state.occasion
    });

    state.analysisResults = { skinResults, bodyResults, paletteKey, bodyTypeKey, faceShapeKey };
    state.completeLook = lookBundle;

    renderResultsSection();
  };

  if (faceImg.complete && bodyImg.complete) {
    processImages();
  } else {
    faceImg.onload = () => {
      if (bodyImg.complete) processImages();
    };
    bodyImg.onload = () => {
      if (faceImg.complete) processImages();
    };
  }
}

function renderResultsSection() {
  const resultsContainer = document.getElementById('resultsContainer');
  if (!resultsContainer || !state.completeLook) return;

  const { paletteKey, bodyTypeKey, faceShapeKey } = state.analysisResults;
  const palette = COLOR_PALETTES[paletteKey];
  const bodyInfo = BODY_SILHOUETTES[bodyTypeKey];
  const hairInfo = FACE_HAIRSTYLES[faceShapeKey];
  const look = state.completeLook;
  const outfit = look.primaryOutfit;
  const shop = look.outfitShop;

  resultsContainer.innerHTML = `
    <!-- Section 1: Trait Analysis Cards -->
    <div class="results-header mt-4">
      <span class="badge badge-gold">✨ AI Trait Extraction Breakdown</span>
      <h2 class="mt-2">Your Personal Styling Profile</h2>
    </div>

    <div class="traits-row">
      <!-- Trait 1: Seasonal Color Palette -->
      <div class="trait-card">
        <h3>🎨 Color Palette</h3>
        <p class="text-gold"><strong>${palette.name}</strong></p>
        <p class="text-xs text-muted mt-1">Undertone: ${palette.undertone}</p>
        
        <div class="swatch-group">
          ${palette.hexCodes.map(hex => `<div class="swatch" style="background:${hex};" title="${hex}"></div>`).join('')}
        </div>

        <p class="text-xs text-muted"><strong>Metals:</strong> ${palette.recommendedMetals}</p>
      </div>

      <!-- Trait 2: Body Silhouette -->
      <div class="trait-card">
        <h3>📐 Body Silhouette</h3>
        <p class="text-gold"><strong>${bodyInfo.title}</strong></p>
        <p class="text-xs text-muted mt-1">${bodyInfo.ratioDescription}</p>
        <div class="mt-2 text-xs">
          <strong>Best Necklines:</strong> ${bodyInfo.bestNecklines}
        </div>
      </div>

      <!-- Trait 3: Face Shape & Hairstyle Direction -->
      <div class="trait-card">
        <h3>💇 Hairstyle Direction</h3>
        <p class="text-gold"><strong>${hairInfo.title}</strong></p>
        <p class="text-xs text-muted mt-1">${hairInfo.hairstyleDirection}</p>
        <div class="mt-2 text-xs">
          <strong>Styling Tip:</strong> ${hairInfo.tips[0]}
        </div>
      </div>
    </div>

    <!-- Section 2: Complete Look Display (Partner Stock Moat) -->
    <div class="look-container">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <div>
          <span class="badge badge-gold">⭐ Grounded Partner Stock Match</span>
          <h2 style="color:#fff;" class="mt-1">Complete Look #1: ${outfit.name}</h2>
        </div>
        <div class="text-right">
          <div class="text-xs text-muted">Total Complete Look Value</div>
          <h2 style="color:var(--color-gold);">₹${look.totalPrice.toLocaleString()}</h2>
        </div>
      </div>

      <div class="look-grid">
        <!-- Left: Primary Outfit Image & Shop Info -->
        <div>
          <img src="${outfit.imageUrl}" alt="${outfit.name}" class="outfit-display-img" />
          
          <div class="card glass-panel mt-3">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong>Boutique Partner:</strong> ${shop.name} (${shop.city})
                <div class="text-xs text-muted">Rating: ${shop.rating} ★ • ${shop.updateCadence} Sync</div>
              </div>
              <span class="badge badge-success">In Stock (${outfit.stockCount} left)</span>
            </div>

            <a href="https://wa.me/${shop.contactWhatsapp.replace('+', '')}?text=Hi%20${encodeURIComponent(shop.name)},%20I%20saw%20the%20${encodeURIComponent(outfit.name)}%20(₹${outfit.price})%20on%20Fowzi%20AI.%20Is%20it%20available?" target="_blank" class="btn btn-primary btn-block mt-3">
              💬 Buy / Contact ${shop.name} on WhatsApp
            </a>
          </div>
        </div>

        <!-- Right: Outfit Details, Accessories & Hairstyle Guidance -->
        <div>
          <div class="card glass-panel mb-3">
            <h3>👗 Outfit Details</h3>
            <p class="mt-2 text-sm">${outfit.description}</p>
            <div class="mt-2 text-xs text-gold">
              💡 <strong>Why this fits:</strong> ${outfit.whyItFits}
            </div>
            <div class="mt-2 text-xs">
              <strong>Available Sizes:</strong> ${outfit.sizes.join(', ')}
            </div>
          </div>

          <!-- Matching Accessories from Partner Shops -->
          <h3>👜 Matching Accessories from Partner Stock</h3>
          <div class="accessories-grid mb-3">
            <!-- Bag -->
            <div class="acc-card">
              <img src="${look.accessories.bag.imageUrl}" alt="${look.accessories.bag.name}" class="acc-thumb" />
              <div class="text-xs"><strong>${look.accessories.bag.name}</strong></div>
              <div class="text-xs text-gold">₹${look.accessories.bag.price.toLocaleString()}</div>
              <div class="text-xs text-muted">${look.accessories.bag.shopName}</div>
            </div>

            <!-- Jewelry -->
            <div class="acc-card">
              <img src="${look.accessories.jewelry.imageUrl}" alt="${look.accessories.jewelry.name}" class="acc-thumb" />
              <div class="text-xs"><strong>${look.accessories.jewelry.name}</strong></div>
              <div class="text-xs text-gold">₹${look.accessories.jewelry.price.toLocaleString()}</div>
              <div class="text-xs text-muted">${look.accessories.jewelry.shopName}</div>
            </div>

            <!-- Footwear -->
            <div class="acc-card">
              <img src="${look.accessories.footwear.imageUrl}" alt="${look.accessories.footwear.name}" class="acc-thumb" />
              <div class="text-xs"><strong>${look.accessories.footwear.name}</strong></div>
              <div class="text-xs text-gold">₹${look.accessories.footwear.price.toLocaleString()}</div>
              <div class="text-xs text-muted">${look.accessories.footwear.shopName}</div>
            </div>
          </div>

          <!-- Hairstyle Card -->
          <div class="card glass-panel">
            <h3>💇 Recommended Hairstyle Direction</h3>
            <p class="text-sm mt-1"><strong>${hairInfo.hairstyleDirection}</strong></p>
            <p class="text-xs text-muted mt-1">${hairInfo.details}</p>
            <div class="mt-2 text-xs">
              <strong>Hairstyle Tips:</strong> ${hairInfo.tips.join(' • ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCatalogView(container) {
  container.innerHTML = `
    <div class="card glass-panel mb-4">
      <h2>👗 Partner Shops Catalog (${CATALOG_ITEMS.length} Buyable Items)</h2>
      <p class="text-muted text-sm">Explore curated items from our network of 4 pilot partner boutiques.</p>
    </div>

    <div class="grid-3col">
      ${CATALOG_ITEMS.map(item => `
        <div class="card glass-panel">
          <img src="${item.imageUrl}" alt="${item.name}" style="width:100%; height:260px; object-fit:cover; border-radius:var(--radius-sm);" />
          <div class="mt-3">
            <span class="badge badge-gold">${item.shopName}</span>
            <h4 class="mt-1">${item.name}</h4>
            <div class="text-gold font-bold mt-1" style="font-size:1.2rem;">₹${item.price.toLocaleString()}</div>
            <p class="text-xs text-muted mt-2">${item.description}</p>
            <div class="mt-2 text-xs">
              <span class="color-dot" style="background:${item.primaryColor};"></span>
              ${item.colorPalette} • ${item.category}
            </div>
            <a href="https://wa.me/?text=Inquiry%20about%20${encodeURIComponent(item.name)}" target="_blank" class="btn btn-outline btn-xs btn-block mt-3">
              💬 Direct Boutique Inquiry
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
