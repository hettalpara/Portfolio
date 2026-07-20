/**
 * AI Flowchart Agent Generator
 * 
 * Programmatically computes layouts, centers, connectors, and text styles 
 * to generate modern, presentation-grade vector flowcharts.
 */

import fs from 'fs';
import path from 'path';

// ==========================================
// 1. CONFIGURATION & SCHEMA DEFINITION
// ==========================================

const CONFIG = {
  canvas: {
    width: 800,
    height: 1200,
    bgColor: '#FFFFFF',
    slideBorderColor: '#F3F4F6'
  },
  layout: {
    startY: 180,
    boxHeight: 54,
    spacing: 50, // space between boxes (connector length)
    boxWidth: 340,
    boxCenter: 460,
    rx: 8 // rounded corners
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
  }
};

// Raw source stages (can be customized or loaded from external inputs)
const stages = [
  { name: "Requirement Analysis", phase: "Planning" },
  { name: "Market Research", phase: "Planning" },
  { name: "System Design", phase: "Design" },
  { name: "UI/UX Design", phase: "Design" },
  { name: "Frontend Development", phase: "Development" },
  { name: "Backend Development", phase: "Development" },
  { name: "API Integration", phase: "Development" },
  { name: "Testing", phase: "QA" },
  { name: "Deployment", phase: "Release" }
];

// Aesthetic flat color-palette groupings
const phaseStyles = {
  Planning: { bg: "#E0F2F1", border: "#B2DFDB", text: "#004D40", accent: "#00796B" },
  Design: { bg: "#E8EAF6", border: "#C5CAE9", text: "#1A237E", accent: "#3F51B5" },
  Development: { bg: "#FFF8E1", border: "#FFE082", text: "#5D4037", accent: "#D84315" },
  QA: { bg: "#E8F5E9", border: "#C8E6C9", text: "#1B5E20", accent: "#2E7D32" },
  Release: { bg: "#FFF1F2", border: "#FECDD3", text: "#881337", accent: "#E11D48" }
};

// ==========================================
// 2. HELPER UTILITIES & FORMATTING
// ==========================================

function logAgentStep(stepName, message) {
  console.log(`\x1b[35m[AI Agent]\x1b[0m \x1b[36m${stepName.padEnd(18)}\x1b[0m | ${message}`);
}

function formatLabel(name) {
  const acronyms = ["UI", "UX", "API", "QA", "IT", "UX/UI", "UI/UX"];
  let words = name.split(/\s+/);
  if (words.length === 0) return "";
  
  return words.map((word, idx) => {
    // Check if word contains slash acronyms like UI/UX
    const cleanWord = word.replace(/[^a-zA-Z/]/g, "").toUpperCase();
    if (acronyms.includes(cleanWord)) {
      return word.toUpperCase();
    }
    if (idx === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase();
  }).join(" ");
}

// ==========================================
// 3. CORE GENERATION ENGINE
// ==========================================

function generateFlowchart() {
  logAgentStep("INITIALIZING", "Starting flow diagram generation script...");
  logAgentStep("PARSING INPUTS", `Processing ${stages.length} flowchart nodes...`);

  // Calculate layout offsets & boxes dynamically
  const nodes = stages.map((stage, idx) => {
    const yTop = CONFIG.layout.startY + idx * (CONFIG.layout.boxHeight + CONFIG.layout.spacing);
    const yCenter = yTop + (CONFIG.layout.boxHeight / 2);
    const yBottom = yTop + CONFIG.layout.boxHeight;
    const style = phaseStyles[stage.phase] || { bg: "#F3F4F6", border: "#D1D5DB", text: "#1F2937", accent: "#4B5563" };
    
    return {
      ...stage,
      formattedName: formatLabel(stage.name),
      yTop,
      yCenter,
      yBottom,
      style
    };
  });

  // Calculate phase groupings for bracket generation
  const phases = {};
  nodes.forEach(node => {
    if (!phases[node.phase]) {
      phases[node.phase] = {
        name: node.phase,
        style: node.style,
        nodes: []
      };
    }
    phases[node.phase].nodes.push(node);
  });

  logAgentStep("CALCULATING LAYOUT", "Mapping SVG node geometry and coordinates...");

  // Generate SVG Brackets code
  let svgBrackets = "";
  Object.values(phases).forEach(phase => {
    const firstNode = phase.nodes[0];
    const lastNode = phase.nodes[phase.nodes.length - 1];
    
    // Offset bracket slightly above first box center and below last box center
    const yStart = firstNode.yCenter - 12;
    const yEnd = lastNode.yCenter + 12;
    const yLabelCenter = (yStart + yEnd) / 2;

    svgBrackets += `
  <!-- ${phase.name} Phase Bracket -->
  <path d="M 235 ${yStart} L 240 ${yStart} L 240 ${yEnd} L 235 ${yEnd}" class="bracket-line" stroke="${phase.style.border}"/>
  <text x="225" y="${yLabelCenter}" text-anchor="end" dominant-baseline="middle" class="phase-text" fill="${phase.style.accent}">${phase.name}</text>`;
  });

  // Generate SVG Boxes code
  let svgBoxes = "";
  nodes.forEach((node, idx) => {
    svgBoxes += `
  <!-- Node ${idx + 1}: ${node.formattedName} -->
  <rect x="${CONFIG.layout.boxCenter - CONFIG.layout.boxWidth/2}" y="${node.yTop}" width="${CONFIG.layout.boxWidth}" height="${CONFIG.layout.boxHeight}" rx="${CONFIG.layout.rx}" fill="${node.style.bg}" stroke="${node.style.border}" stroke-width="1.2"/>
  <text x="${CONFIG.layout.boxCenter}" y="${node.yCenter + 4.5}" text-anchor="middle" class="stage-text" fill="${node.style.text}">${node.formattedName}</text>`;
  });

  // Generate Connector Lines & Arrows code
  let svgConnectors = "";
  for (let i = 0; i < nodes.length - 1; i++) {
    const currentNode = nodes[i];
    const nextNode = nodes[i + 1];
    const arrowTipY = nextNode.yTop - 1;
    
    svgConnectors += `
  <!-- Connector ${i + 1} -> ${i + 2} -->
  <line x1="${CONFIG.layout.boxCenter}" y1="${currentNode.yBottom}" x2="${CONFIG.layout.boxCenter}" y2="${arrowTipY}" class="connector-line"/>
  <path d="M ${CONFIG.layout.boxCenter - 4} ${arrowTipY - 4} L ${CONFIG.layout.boxCenter} ${arrowTipY} L ${CONFIG.layout.boxCenter + 4} ${arrowTipY - 4}" class="connector-arrow"/>`;
  }

  // Construct complete clean SVG
  const svgOutput = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CONFIG.canvas.width} ${CONFIG.canvas.height}" width="100%" height="100%">
  <defs>
    <style>
      .title {
        font-family: ${CONFIG.typography.fontFamily};
        font-size: 32px;
        font-weight: 700;
        fill: #111827;
        letter-spacing: -0.02em;
      }
      .subtitle {
        font-family: ${CONFIG.typography.fontFamily};
        font-size: 15px;
        font-weight: 400;
        fill: #6B7280;
      }
      .stage-text {
        font-family: ${CONFIG.typography.fontFamily};
        font-size: 15px;
        font-weight: 500;
      }
      .phase-text {
        font-family: ${CONFIG.typography.fontFamily};
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .connector-line {
        stroke: #D1D5DB;
        stroke-width: 1.5;
        stroke-linecap: round;
      }
      .connector-arrow {
        fill: none;
        stroke: #9CA3AF;
        stroke-width: 1.5;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .bracket-line {
        stroke-width: 1.5;
        stroke-linecap: round;
        fill: none;
      }
      .slide-border {
        fill: none;
        stroke: ${CONFIG.canvas.slideBorderColor};
        stroke-width: 1;
      }
    </style>
  </defs>

  <rect width="100%" height="100%" fill="${CONFIG.canvas.bgColor}"/>
  <rect x="24" y="24" width="${CONFIG.canvas.width - 48}" height="${CONFIG.canvas.height - 48}" rx="16" class="slide-border"/>

  <text x="${CONFIG.layout.boxCenter}" y="85" text-anchor="middle" class="title">Project Workflow</text>
  <text x="${CONFIG.layout.boxCenter}" y="118" text-anchor="middle" class="subtitle">Nine sequential stages of the project lifecycle</text>

  <!-- ==================== BRACKETS & PHASE LABELS ==================== -->
  ${svgBrackets}

  <!-- ==================== FLOWCHART STAGES (BOXES & TEXT) ==================== -->
  ${svgBoxes}

  <!-- ==================== CONNECTING ARROWS ==================== -->
  ${svgConnectors}
</svg>`;

  logAgentStep("GENERATING XML", "Compiling SVG string...");

  // Write outputs
  const svgFilename = "project_workflow.svg";
  const htmlFilename = "project_workflow.html";

  fs.writeFileSync(path.join(process.cwd(), svgFilename), svgOutput, "utf-8");
  logAgentStep("SAVING SVG", `Successfully generated ${svgFilename}`);

  // Create HTML wrapper
  const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Workflow Flowchart Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-color: #F8FAFC;
      --card-bg: #FFFFFF;
      --text-main: #0F172A;
      --text-sub: #64748B;
      --border-color: #E2E8F0;
      --btn-bg: #FFFFFF;
      --btn-hover: #F1F5F9;
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    body.dark-mode {
      --bg-color: #0F172A;
      --card-bg: #1E293B;
      --text-main: #F8FAFC;
      --text-sub: #94A3B8;
      --border-color: #334155;
      --btn-bg: #1E293B;
      --btn-hover: #334155;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: background-color 0.3s, color 0.3s;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 32px;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    body.dark-mode header { background-color: rgba(15, 23, 42, 0.8); }
    .brand { display: flex; flex-direction: column; }
    .brand h1 { font-size: 18px; font-weight: 700; letter-spacing: -0.01em; }
    .brand p { font-size: 12px; color: var(--text-sub); }
    .controls { display: flex; gap: 12px; }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background-color: var(--btn-bg);
      color: var(--text-main);
      cursor: pointer;
      transition: all 0.2s;
      gap: 8px;
      box-shadow: var(--shadow-sm);
    }
    .btn:hover { background-color: var(--btn-hover); transform: translateY(-1px); }
    .btn:active { transform: translateY(0); }
    .btn-primary { background-color: #2563EB; color: #FFFFFF; border-color: #2563EB; }
    .btn-primary:hover { background-color: #1D4ED8; border-color: #1D4ED8; }
    main { flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px 20px; }
    .slide-container {
      width: 100%;
      max-width: 540px;
      aspect-ratio: 800 / 1200;
      background-color: #FFFFFF;
      border-radius: 16px;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      overflow: hidden;
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .slide-container:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    }
    .slide-container svg { width: 100%; height: 100%; display: block; }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background-color: #0F172A;
      color: #FFFFFF;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: var(--shadow-lg);
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 1000;
    }
    .toast.show { transform: translateY(0); opacity: 1; }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <h1>Project Workflow Flowchart</h1>
      <p>Clean, Minimal, Portrait Presentation Slide</p>
    </div>
    <div class="controls">
      <button class="btn" id="themeToggleBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        Toggle Dark Interface
      </button>
      <button class="btn" id="copyBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        Copy SVG Code
      </button>
      <button class="btn btn-primary" id="downloadBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        Download SVG
      </button>
    </div>
  </header>

  <main>
    <div class="slide-container" id="slideContainer">
      ${svgOutput}
    </div>
  </main>

  <div class="toast" id="toast">SVG code copied to clipboard!</div>

  <script>
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const toast = document.getElementById('toast');
    const slideContainer = document.getElementById('slideContainer');

    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    copyBtn.addEventListener('click', () => {
      const svgContent = slideContainer.innerHTML.trim();
      navigator.clipboard.writeText(svgContent).then(() => {
        showToast('SVG XML copied to clipboard!');
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    });

    downloadBtn.addEventListener('click', () => {
      const svgContent = slideContainer.innerHTML.trim();
      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'project_workflow.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('SVG download started!');
    });

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(process.cwd(), htmlFilename), htmlOutput, "utf-8");
  logAgentStep("SAVING HTML", `Successfully generated ${htmlFilename}`);
  logAgentStep("COMPLETE", "Generation finished! Flowchart files successfully built.");
}

generateFlowchart();
