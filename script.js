// Intersection Observer for reveal animations
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Active Navigation Link
function updateActiveNav() {
  const sections = document.querySelectorAll('section, [id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// FAQ Toggle Function
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all other FAQs
  document.querySelectorAll('.faq-question.open').forEach(q => {
    q.classList.remove('open');
    q.setAttribute('aria-expanded', 'false');
    q.nextElementSibling.classList.remove('open');
  });

  // Open clicked if it was closed
  if (!isOpen) {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    answer.classList.add('open');
  }
}

// Form Submit Handler with validation and Web3Forms integration
async function handleSubmit(e) {
  e.preventDefault(); // Prevent page reload

  const form = e.target;
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const btn = form.querySelector('.submit-btn');

  // Basic validation
  if (!nameInput.value.trim()) {
    nameInput.focus();
    return false;
  }

  if (emailInput.value && !emailInput.value.includes('@')) {
    emailInput.focus();
    return false;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Prepare form data for Web3Forms
  const formData = new FormData(form);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#28ca42';
      btn.style.boxShadow = '0 4px 12px rgba(40,202,66,0.3)';
      form.reset();
    } else {
      btn.textContent = '❌ Error Sending';
      btn.style.background = '#ff5f57';
    }
  } catch (error) {
    btn.textContent = '❌ Error Sending';
    btn.style.background = '#ff5f57';
  }

  // Reset button state after a delay
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.style.boxShadow = '';
    btn.disabled = false;
  }, 4000);
}

// Nav Scrolled State
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Stats Counter Animation
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const speed = 150;
          const inc = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  counterObs.observe(statsBar);
}

// Initialize Lucide Icons
lucide.createIcons();

// Service Tabs Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const serviceCards = document.querySelectorAll('.service-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-tab');

    serviceCards.forEach(card => {
      if (card.getAttribute('data-category') === category) {
        card.style.display = 'block';
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = `slideUpFade 0.5s ease forwards calc(var(--delay) * 0.07s)`;
      } else {
        card.style.display = 'none';
        card.style.animation = 'none';
      }
    });
  });
});

// Floating Action Button (FAB) Menu Toggle Logic
const fsTrigger = document.getElementById('fsTrigger');
const floatingSocials = document.getElementById('floatingSocials');

if (fsTrigger && floatingSocials) {
  fsTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    floatingSocials.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!floatingSocials.contains(e.target)) {
      floatingSocials.classList.remove('active');
    }
  });
}

// 1. LIGHT / DARK THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
}

// 2. SERVICE AREA CHECKER
const servedBarangays = [
  "carolina", "pacol", "san felipe", "cararayan", 
  "del rosario", "concepcion grande", "concepcion pequena", 
  "balatas", "liboton", "bagumbayan", "lerma", "dayangdang", 
  "triangulo", "tabuco", "sabang", "peñafrancia", "penafrancia", 
  "san francisco", "santa cruz", "sta cruz", "calauag", 
  "tinago", "magsaysay", "abella", "igualdad", "panicuason", 
  "san isidro"
];

const checkAreaBtn = document.getElementById('checkAreaBtn');
const areaInput = document.getElementById('areaInput');
const checkerResult = document.getElementById('checkerResult');

if (checkAreaBtn && areaInput && checkerResult) {
  const performCheck = () => {
    const inputVal = areaInput.value.trim().toLowerCase();
    if (!inputVal) {
      areaInput.focus();
      return;
    }
    
    checkerResult.className = 'ac-result visible';
    
    if (servedBarangays.includes(inputVal)) {
      checkerResult.classList.add('success');
      checkerResult.innerHTML = `<strong>✅ Active Service Zone:</strong> Direct on-site visits and free diagnostics are fully supported for Brgy. ${areaInput.value}!`;
    } else {
      checkerResult.classList.add('warn');
      checkerResult.innerHTML = `<strong>⚠ Limited Service Coverage:</strong> Brgy. ${areaInput.value} is outside our direct service zone. On-site visits are by appointment only. (Diagnostics remain free at our Carolina location)`;
    }
  };

  checkAreaBtn.addEventListener('click', performCheck);
  areaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performCheck();
    }
  });
}

// 3. SERVICE COST ESTIMATOR
const estimatorData = {
  computer: [
    { id: 'c_repair', name: 'Desktop & Laptop Repair (Hardware)', price: 1200, desc: 'Component diagnostics, hardware replacements, and motherboard troubleshooting.', negotiable: true },
    { id: 'c_os', name: 'Clean OS Installation (Windows 10/11)', price: 800, desc: 'Complete OS install, driver configurations, and essential system updates.' },
    { id: 'c_office', name: 'Office Software Configuration', price: 500, desc: 'Installation and setup of productivity suites, email clients, and tools.' },
    { id: 'c_cleaning', name: 'Internal Cleaning & Thermal Paste', price: 600, desc: 'Deep dust cleanout, fan lubrication, and premium thermal paste application.' },
    { id: 'c_upgrade', name: 'Hardware Upgrade (RAM/SSD Install)', price: 500, desc: 'SSD/RAM installation and cloning/system optimization diagnostics.' },
    { id: 'c_virus', name: 'Virus & Malware Removal', price: 600, desc: 'Full malware scans, deep system cleaning, and security browser setup.' },
    { id: 'c_backup', name: 'Data Backup & File Recovery', price: 1000, desc: 'File extraction from corrupted drives and secure backup transfers.', negotiable: true },
    { id: 'c_password', name: 'Windows Login Password Reset', price: 500, desc: 'Safely bypass Windows account password locks with zero data loss.' },
    { id: 'c_licensing', name: 'Windows & Office Activation Support', price: 800, desc: 'Activation and configuration of legal lifetime system licenses.' }
  ],
  cctv: [
    { id: 'cc_install_analog', name: 'Analog CCTV Camera Installation (per unit)', price: 800, hasQty: true, desc: 'Mounting, cabling, and connecting one camera to DVR. Labor only; camera unit, DVR, power supply, and materials are separate.' },
    { id: 'cc_install_ip', name: 'IP CCTV Camera Installation (per unit)', price: 1200, hasQty: true, desc: 'Mounting, cabling, and configuring one digital IP camera unit. Labor only; camera unit, NVR, switch, and materials are separate.' },
    { id: 'cc_dvr', name: 'DVR / NVR System Configuration', price: 1500, desc: 'Central DVR/NVR unit setup, recording schedules, motion detection, and HDD config. DVR/NVR hardware device is separate.', negotiable: true },
    { id: 'cc_remote', name: 'Remote Smartphone Setup', price: 500, desc: 'Port-forwarding, router config, and cloud app setup for remote live viewing.' },
    { id: 'cc_repair', name: 'CCTV Troubleshooting & Maintenance', price: 1200, desc: 'Identifying video loss, power issues, broken links, or camera replacement. Hardware/materials are separate.', negotiable: true }
  ],
  network: [
    { id: 'n_setup', name: 'Router & Network Switch Config', price: 1500, desc: 'IP subnet division, DHCP setup, VLANs, switch configurations, and firewalls.', negotiable: true },
    { id: 'n_cable', name: 'Structured Cabling (per Node)', price: 600, hasQty: true, desc: 'Cat5e/Cat6 neat routing, patch panel terminations, and connectivity testing. Cables/materials are separate.', negotiable: true },
    { id: 'n_wifi', name: 'Wi-Fi Mesh & Access Point Setup', price: 1000, desc: 'Eliminate dead zones, configure mesh nodes, and wireless channel tuning.' },
    { id: 'n_office', name: 'Office Workstation Printer Sharing', price: 2000, desc: 'Workstation network setup, central printer sharing, and file server links.', negotiable: true },
    { id: 'n_sysadmin', name: 'Systems & Cloud Administration', price: 3000, desc: 'Active Directory domain setup, GPO server configurations, and Microsoft 365 environment setup.', negotiable: true },
    { id: 'n_livestream', name: 'Livestreaming & AV Configuration', price: 2500, desc: 'OBS Studio optimization, audio/video interface routing, and stream configuration.', negotiable: true }
  ]
};

const materialsData = [
  { id: 'm_cat6', name: 'Cat6 Ethernet Cable (per meter)', price: 25, hasQty: true, desc: 'UTP copper cabling for IP camera installations. Camera units separate.' },
  { id: 'm_rg59', name: 'RG59 Coaxial Cable with Power (per meter)', price: 30, hasQty: true, desc: 'Coaxial plus dual power line for Analog CCTV cabling. Camera units separate.' },
  { id: 'm_balun', name: 'CCTV Video Balun (per pair)', price: 180, hasQty: true, desc: 'Passive video transceivers for analog signal connection.' },
  { id: 'm_bnc', name: 'BNC & DC Power Connectors (per set)', price: 60, hasQty: true, desc: 'Solderless connections for camera and DVR ends.' },
  { id: 'm_rj45', name: 'RJ45 Connectors (per piece)', price: 15, hasQty: true, desc: 'Gold-plated pass-through connectors for IP cabling.' },
  { id: 'm_poe_4', name: '4-Port PoE Switch (IP camera power)', price: 1800, desc: 'Power over Ethernet switch with 4 PoE ports and 2 Uplinks.' },
  { id: 'm_poe_8', name: '8-Port PoE Switch (IP camera power)', price: 2800, desc: 'Power over Ethernet switch with 8 PoE ports and 2 Uplinks.' },
  { id: 'm_nvr_4', name: 'NVR 4-Channel (Network Video Recorder)', price: 2500, desc: 'Network Video Recorder supporting up to 4 IP cameras. HDD storage separate.' },
  { id: 'm_nvr_8', name: 'NVR 8-Channel (Network Video Recorder)', price: 3800, desc: 'Network Video Recorder supporting up to 8 IP cameras. HDD storage separate.' },
  { id: 'm_dvr_4', name: 'DVR 4-Channel (Digital Video Recorder)', price: 1800, desc: 'Digital Video Recorder supporting up to 4 analog cameras. HDD storage separate.' },
  { id: 'm_dvr_8', name: 'DVR 8-Channel (Digital Video Recorder)', price: 2800, desc: 'Digital Video Recorder supporting up to 8 analog cameras. HDD storage separate.' },
  { id: 'm_databox_2u', name: '2U Data Cabinet / Wallmount Box', price: 1500, desc: 'Compact metal cabinet for NVR, DVR, power box, and cables.' },
  { id: 'm_databox_4u', name: '4U Data Cabinet / Wallmount Box', price: 2200, desc: 'Wallmount cabinet for recorders, switches, and a UPS battery unit.' },
  { id: 'm_junction_box', name: 'Waterproof Camera Junction Box (per unit)', price: 150, hasQty: true, desc: 'Weatherproof box to protect camera connections from rain/dust.' },
  { id: 'm_ups', name: '650VA Uninterruptible Power Supply (UPS)', price: 2200, desc: 'Battery backup to keep cameras and NVR/DVR online during blackouts.' },
  { id: 'm_hdd_1tb', name: '1TB Surveillance HDD (Storage)', price: 3200, desc: 'Western Digital Purple 24/7 surveillance-optimized storage drive.' },
  { id: 'm_hdd_2tb', name: '2TB Surveillance HDD (Storage)', price: 4500, desc: 'Western Digital Purple high-capacity surveillance-optimized drive.' },
  { id: 'm_monitor_19', name: '19-inch LED Monitor (CCTV display)', price: 2800, desc: 'Dedicated LED monitor for continuous camera feed viewing.' },
  { id: 'm_monitor_22', name: '22-inch Full HD Monitor (CCTV display)', price: 3800, desc: '1080p LED display for detailed security feeds.' },
  { id: 'm_power_box', name: 'CCTV 12V Centralized Power Supply Box', price: 1200, desc: 'Power supply distributor to safely power up to 9 cameras.', negotiable: true },
  { id: 'm_molding', name: 'PVC Cable Molding (per 1.8m length)', price: 60, hasQty: true, desc: 'Self-adhesive wall molding for neat wire placement.' }
];

const estCategory = document.getElementById('estCategory');
const estServicesChecklist = document.getElementById('estServicesChecklist');
const estSumBreakdown = document.getElementById('estSumBreakdown');
const estTotalVal = document.getElementById('estTotalVal');
const bookEstimateBtn = document.getElementById('bookEstimateBtn');

let selectedServices = new Set();
let selectedQty = {};
let selectedMaterials = new Set();
let selectedMaterialQty = {};

function updateEstimator() {
  const category = estCategory.value;
  const services = estimatorData[category];
  
  // Show/Hide CCTV materials container
  const materialsContainer = document.getElementById('estMaterialsContainer');
  if (materialsContainer) {
    if (category === 'cctv') {
      materialsContainer.style.display = 'block';
      renderMaterials();
    } else {
      materialsContainer.style.display = 'none';
      selectedMaterials.clear();
      selectedMaterialQty = {};
    }
  }

  // Show/Hide CCTV disclaimer
  const estDisclaimer = document.getElementById('estDisclaimer');
  if (estDisclaimer) {
    estDisclaimer.style.display = category === 'cctv' ? 'block' : 'none';
  }
  
  estServicesChecklist.innerHTML = services.map(s => {
    const isSelected = selectedServices.has(s.id);
    const qty = selectedQty[s.id] || 1;
    const itemPrice = s.price * qty;
    return `
      <div class="est-item ${isSelected ? 'selected' : ''}" data-id="${s.id}" onclick="toggleEstimateItem(this)">
        <div class="est-item-left">
          <input type="checkbox" id="${s.id}" ${isSelected ? 'checked' : ''} onclick="event.stopPropagation(); toggleEstimateItem(this.parentElement.parentElement);" />
          <div class="est-item-text-group">
            <div class="est-item-title-row">
              <label class="est-item-name" for="${s.id}" onclick="event.preventDefault();">${s.name}</label>
              ${s.negotiable ? `<span class="est-negotiable-tag">Negotiable</span>` : ''}
            </div>
            <p class="est-item-desc">${s.desc}</p>
          </div>
        </div>
        <div class="est-item-right" onclick="event.stopPropagation();">
          ${s.hasQty && isSelected ? `
            <div class="est-qty-control">
              <button class="qty-btn" onclick="adjustQty('${s.id}', -1)">−</button>
              <span class="qty-val">${qty}</span>
              <button class="qty-btn" onclick="adjustQty('${s.id}', 1)">+</button>
            </div>
          ` : ''}
          <span class="est-item-price">₱${itemPrice.toLocaleString()}</span>
        </div>
      </div>
    `;
  }).join('');
  
  calculateEstimate();
}

function renderMaterials() {
  const materialsChecklist = document.getElementById('estMaterialsChecklist');
  if (!materialsChecklist) return;
  
  materialsChecklist.innerHTML = materialsData.map(m => {
    const isSelected = selectedMaterials.has(m.id);
    const qty = selectedMaterialQty[m.id] || 1;
    const itemPrice = m.price * qty;
    return `
      <div class="est-item ${isSelected ? 'selected' : ''}" data-id="${m.id}" onclick="toggleMaterialItem(this)">
        <div class="est-item-left">
          <input type="checkbox" id="${m.id}" ${isSelected ? 'checked' : ''} onclick="event.stopPropagation(); toggleMaterialItem(this.parentElement.parentElement);" />
          <div class="est-item-text-group">
            <div class="est-item-title-row">
              <label class="est-item-name" for="${m.id}" onclick="event.preventDefault();">${m.name}</label>
            </div>
            <p class="est-item-desc">${m.desc}</p>
          </div>
        </div>
        <div class="est-item-right" onclick="event.stopPropagation();">
          ${m.hasQty && isSelected ? `
            <div class="est-qty-control">
              <button class="qty-btn" onclick="adjustMaterialQty('${m.id}', -1)">−</button>
              <span class="qty-val">${qty}</span>
              <button class="qty-btn" onclick="adjustMaterialQty('${m.id}', 1)">+</button>
            </div>
          ` : ''}
          <span class="est-item-price">₱${itemPrice.toLocaleString()}</span>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleEstimateItem = function(element) {
  const id = element.getAttribute('data-id');
  const checkbox = element.querySelector('input[type="checkbox"]');
  
  if (selectedServices.has(id)) {
    selectedServices.delete(id);
    delete selectedQty[id];
    element.classList.remove('selected');
    if (checkbox) checkbox.checked = false;
  } else {
    selectedServices.add(id);
    selectedQty[id] = 1;
    element.classList.add('selected');
    if (checkbox) checkbox.checked = true;
  }
  
  updateEstimator();
};

window.toggleMaterialItem = function(element) {
  const id = element.getAttribute('data-id');
  const checkbox = element.querySelector('input[type="checkbox"]');
  
  if (selectedMaterials.has(id)) {
    selectedMaterials.delete(id);
    delete selectedMaterialQty[id];
    element.classList.remove('selected');
    if (checkbox) checkbox.checked = false;
  } else {
    selectedMaterials.add(id);
    selectedMaterialQty[id] = 1;
    element.classList.add('selected');
    if (checkbox) checkbox.checked = true;
  }
  
  renderMaterials();
  calculateEstimate();
};

window.adjustQty = function(id, delta) {
  if (!selectedQty[id]) selectedQty[id] = 1;
  selectedQty[id] += delta;
  if (selectedQty[id] < 1) selectedQty[id] = 1;
  updateEstimator();
};

window.adjustMaterialQty = function(id, delta) {
  if (!selectedMaterialQty[id]) selectedMaterialQty[id] = 1;
  selectedMaterialQty[id] += delta;
  if (selectedMaterialQty[id] < 1) selectedMaterialQty[id] = 1;
  renderMaterials();
  calculateEstimate();
};

function calculateEstimate() {
  let laborTotal = 0;
  let materialsTotal = 0;
  let selectedLaborList = [];
  let selectedMaterialsList = [];
  
  // Calculate Labor
  Object.keys(estimatorData).forEach(cat => {
    estimatorData[cat].forEach(s => {
      if (selectedServices.has(s.id)) {
        const qty = selectedQty[s.id] || 1;
        const itemTotal = s.price * qty;
        laborTotal += itemTotal;
        selectedLaborList.push({
          ...s,
          qty: qty,
          totalPrice: itemTotal
        });
      }
    });
  });
  
  // Calculate Materials
  materialsData.forEach(m => {
    if (selectedMaterials.has(m.id)) {
      const qty = selectedMaterialQty[m.id] || 1;
      const itemTotal = m.price * qty;
      materialsTotal += itemTotal;
      selectedMaterialsList.push({
        ...m,
        qty: qty,
        totalPrice: itemTotal
      });
    }
  });
  
  const grandTotal = laborTotal + materialsTotal;
  
  const totalContainer = document.getElementById('estTotalContainer');
  
  if (selectedLaborList.length === 0 && selectedMaterialsList.length === 0) {
    estSumBreakdown.innerHTML = '<div class="est-empty-msg">No services selected yet.</div>';
    if (totalContainer) {
      totalContainer.innerHTML = `
        <div class="est-sum-total">
          <span>Estimated Labor:</span>
          <span class="total-price" id="estTotalVal">₱0</span>
        </div>
      `;
    } else if (estTotalVal) {
      estTotalVal.textContent = '₱0';
    }
    bookEstimateBtn.disabled = true;
  } else {
    // Generate breakdown rows
    let html = '';
    
    if (selectedLaborList.length > 0) {
      html += `<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; letter-spacing: 0.05em;">Labor / Installation Services</div>`;
      html += selectedLaborList.map(s => `
        <div class="est-breakdown-row" style="margin-bottom: 6px;">
          <span>${s.name} ${s.hasQty ? `(x${s.qty})` : ''}</span>
          <strong>₱${s.totalPrice.toLocaleString()}</strong>
        </div>
      `).join('');
    }
    
    if (selectedMaterialsList.length > 0) {
      html += `<div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent); margin-top: 14px; margin-bottom: 6px; letter-spacing: 0.05em;">Consumables &amp; Materials</div>`;
      html += selectedMaterialsList.map(m => `
        <div class="est-breakdown-row" style="margin-bottom: 6px;">
          <span>${m.name} ${m.hasQty ? `(x${m.qty})` : ''}</span>
          <strong>₱${m.totalPrice.toLocaleString()}</strong>
        </div>
      `).join('');
    }
    
    estSumBreakdown.innerHTML = html;
    
    // Update Totals Card Layout to show sub-totals and grand total
    if (materialsTotal > 0) {
      if (totalContainer) {
        totalContainer.innerHTML = `
          <div style="font-size: 12.5px; color: var(--muted); display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between;"><span>Labor Subtotal:</span><span>₱${laborTotal.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Materials Subtotal:</span><span>₱${materialsTotal.toLocaleString()}</span></div>
          </div>
          <div class="est-sum-divider" style="margin: 8px 0;"></div>
          <div class="est-sum-total">
            <span>Estimated Total:</span>
            <span class="total-price" id="estTotalVal">₱${grandTotal.toLocaleString()}</span>
          </div>
        `;
      }
    } else {
      if (totalContainer) {
        totalContainer.innerHTML = `
          <div class="est-sum-total">
            <span>Estimated Labor:</span>
            <span class="total-price" id="estTotalVal">₱${laborTotal.toLocaleString()}</span>
          </div>
        `;
      } else if (estTotalVal) {
        estTotalVal.textContent = `₱${grandTotal.toLocaleString()}`;
      }
    }
    
    bookEstimateBtn.disabled = false;
  }
}

if (estCategory && estServicesChecklist) {
  estCategory.addEventListener('change', updateEstimator);
  updateEstimator();
}

if (bookEstimateBtn) {
  bookEstimateBtn.addEventListener('click', () => {
    let selectedNames = [];
    Object.keys(estimatorData).forEach(cat => {
      estimatorData[cat].forEach(s => {
        if (selectedServices.has(s.id)) {
          const qty = selectedQty[s.id] || 1;
          const qtyStr = s.hasQty ? ` (x${qty})` : '';
          selectedNames.push(`${s.name}${qtyStr}`);
        }
      });
    });
    
    let selectedMatNames = [];
    materialsData.forEach(m => {
      if (selectedMaterials.has(m.id)) {
        const qty = selectedMaterialQty[m.id] || 1;
        const qtyStr = m.hasQty ? ` (x${qty})` : '';
        selectedMatNames.push(`${m.name}${qtyStr}`);
      }
    });
    
    const totalValElement = document.getElementById('estTotalVal');
    const grandTotalVal = totalValElement ? totalValElement.textContent : '₱0';
    
    let msgText = `I checked the Cost Estimator and selected: \n\nLABOR & SERVICES:\n- ${selectedNames.join('\n- ')}`;
    if (selectedMatNames.length > 0) {
      msgText += `\n\nMATERIALS / CONSUMABLES:\n- ${selectedMatNames.join('\n- ')}`;
    }
    if (estCategory && estCategory.value === 'cctv') {
      msgText += `\n\n*Notice: I understand camera units and other hardware/devices are not included in the installation labor cost and are charged separately.`;
    }
    msgText += `\n\nMy estimated total is ${grandTotalVal}. Please review my request and contact me.`;
    
    const messageField = document.getElementById('msg');
    if (messageField) {
      messageField.value = msgText;
    }
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// 4. DETAILED SERVICE POPUP MODALS
const serviceDetailsData = {
  "desktop & laptop repair": {
    time: "1-3 Business Days",
    price: "₱500 - ₱1,500+",
    desc: "Complete hardware diagnostics and component-level repair for desktop towers and laptops. Includes board repair, heat management, and screen replacements.",
    checklist: ["Comprehensive component diagnostics", "Thermal paste replacement included", "Motherboard testing & cleaning", "30-day warranty on labor"]
  },
  "cellphone repair": {
    time: "1-2 Business Days",
    price: "₱400 - ₱1,200+",
    desc: "Screen replacement, charging port repair, battery replacement, and board troubleshooting for all popular mobile brands.",
    checklist: ["High-quality replacement screens", "Charging port tests", "Battery health calibration", "Order-based premium parts"]
  },
  "os installation": {
    time: "Same-Day (2-3 Hours)",
    price: "₱800",
    desc: "Clean installation of Microsoft Windows 10 or 11. Includes configuration, essential system driver setup, and updates.",
    checklist: ["Genuine Windows OS configuration", "All necessary drivers pre-installed", "Full driver compatibility check", "System optimization configurations"]
  },
  "office software installation": {
    time: "Same-Day (1-2 Hours)",
    price: "₱500",
    desc: "Installation and configuration of productivity suites such as Microsoft Office (Word, Excel, PowerPoint, Outlook) or open-source software fallbacks.",
    checklist: ["Genuine license activation", "Outlook email configuration", "Compatibility checks", "Latest updates configured"]
  },
  "hardware cleaning & maintenance": {
    time: "Same-Day (1-2 Hours)",
    price: "₱600",
    desc: "Deep dust cleanout, fan lubrication, motherboard scrub, and fresh thermal paste application to protect hardware from overheating and thermal throttle.",
    checklist: ["Deep hardware dust extraction", "Arctic MX-4 thermal paste replacement", "Fan cleanout & noise reduction check", "Thermal profile reporting"]
  },
  "performance upgrades": {
    time: "Same-Day (1 Hour)",
    price: "₱500",
    desc: "Breathe new life into sluggish PCs. Upgrade old hard drives to high-speed Solid State Drives (SSDs) and expand RAM capacity for seamless multitasking.",
    checklist: ["Hardware compatibility assessment", "SSD cloning or clean OS setup options", "RAM stability testing", "Labor warrantied for 30 days"]
  },
  "virus & malware removal": {
    time: "Same-Day (2 Hours)",
    price: "₱600",
    desc: "Thorough scan and removal of viruses, trojans, adware, and hidden cryptominers. Restores computer speed and secures user accounts.",
    checklist: ["Full system virus scans", "Browser cleanups & malware removals", "Free antivirus setup & scan schedules", "Security configurations check"]
  },
  "data backup & recovery": {
    time: "2-4 Business Days",
    price: "₱1,000 - ₱3,000+",
    desc: "Secure recovery of photos, documents, and database files from failed, formatted, or corrupted hard drives and flash drives.",
    checklist: ["Secure file transfer checks", "Deep raw file partition scanning", "Data transfer to backup external devices", "Privacy & file confidentiality guarantee"]
  },
  "windows login password removal": {
    time: "Same-Day (1 Hour)",
    price: "₱500",
    desc: "Regain immediate access to locked Windows accounts. Safely bypass password locks without deleting personal files or programs.",
    checklist: ["Safe password bypass scripts", "Zero data loss guarantee", "Works on Windows 10 and 11", "Offline local account recovery"]
  },
  "office & windows os licensing": {
    time: "Same-Day (1 Hour)",
    price: "₱800+",
    desc: "Upgrade or buy fully legitimate licenses for Windows 10/11 and Microsoft Office to guarantee security updates and compliance.",
    checklist: ["100% legal & legitimate activations", "Lifetime license validity", "Official support configuration", "Direct link to Microsoft accounts"]
  },
  "cctv installation": {
    time: "1-2 Days (Site Based)",
    price: "Analog: ₱800/unit | IP: ₱1,200/unit",
    desc: "Professional layout planning, camera mounting, cable routing, and NVR/DVR setup. Base labor rate is per camera unit and depends on whether you choose HD Analog or digital IP cameras.",
    checklist: ["Optimal camera coverage planning", "Weatherproof outdoor box wiring", "HD Analog or IP camera configs", "System user manuals provided"]
  },
  "cctv monitoring setup": {
    time: "Same-Day (2-3 Hours)",
    price: "₱500 - ₱1,500",
    desc: "Configure network routing, dynamic DNS, and smartphone apps to enable secure live surveillance viewing from anywhere in the world.",
    checklist: ["Router port-forwarding setups", "Live viewing apps setup (iOS/Android)", "Motion detection recording schedules", "Cloud backup options configured"]
  },
  "cctv maintenance & repair": {
    time: "1-3 Hours",
    price: "₱1,200 (Base Labor)",
    desc: "Troubleshoot issues with video loss, cameras losing power, recording failures, or broken cables to bring security feeds online.",
    checklist: ["Power supply diagnostic checks", "Coaxial & RJ45 connection repairs", "NVR/DVR hard drive health scans", "Camera lens cleaning & refocusing"]
  },
  "network setup & configuration": {
    time: "1-2 Days (Site Based)",
    price: "₱1,500 - ₱3,500+",
    desc: "Deploy fast and secure home or office networks. Includes router installations, switches, subnet division, and secure Wi-Fi access configurations.",
    checklist: ["Router & switch config checks", "IP addressing & DHCP setup", "Network firewalls & security keys", "Local sharing access configurations"]
  },
  "structured cabling": {
    time: "Site Dependent",
    price: "₱600 / Node Labor",
    desc: "Neat routing of Cat5e/Cat6 network links inside walls, conduits, or trays. Includes patch panel terminations and faceplate jack fittings.",
    checklist: ["Cat5e/Cat6 cable deployment", "Patch panel terminations", "Neat routing & zip-tying", "Fluke patch cable node testing"]
  },
  "wifi troubleshooting & optimization": {
    time: "Same-Day (2-3 Hours)",
    price: "₱1,000",
    desc: "Diagnose connection drops, slow speed, and dead spots. Configure mesh systems and wireless channels to cover the entire property.",
    checklist: ["Wireless interference checks", "Mesh node optimal placement", "Dual-band SSIDs configurations", "Connection latency reporting"]
  },
  "office it setup": {
    time: "1-3 Days (Site Based)",
    price: "₱2,000 - ₱5,000+",
    desc: "Complete business workspace design. We wire networks, setup computers, configure printers for local sharing, and link central databases.",
    checklist: ["Desktop network integrations", "Office file sharing setups", "Network printer sharing", "Central backup storage configuration"]
  },
  "systems & cloud administration": {
    time: "1-3 Days (Site Based)",
    price: "₱3,000 (Base Labor)",
    desc: "Centralized server and user environment setup. Configuration of Active Directory Domain Services, Group Policies (GPO), shared storage permissions, and Microsoft 365 migrations.",
    checklist: ["Active Directory installation & configuration", "Group Policy (GPO) security & access setup", "M365 email migration & tenant setup", "Central database & share folder controls", "Remote administrative tools setup"]
  },
  "livestreaming & av configuration": {
    time: "Same-Day / Event-Based",
    price: "₱2,500 (Base Labor)",
    desc: "Professional setup and optimization of livestreaming environments for virtual events, webinars, churches, or content creators. Includes OBS Studio setup, audio mixer routing, and multi-camera inputs.",
    checklist: ["OBS Studio scene & source configuration", "Audio-visual hardware mixer integration", "Camera capture cards & sound interface routing", "Stream bitrates & encoder settings optimization", "Youtube/Facebook live key integration"]
  }
};

const serviceModal = document.getElementById('serviceModal');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTime = document.getElementById('modalTime');
const modalPrice = document.getElementById('modalPrice');
const modalChecklist = document.getElementById('modalChecklist');
const modalActionBtn = document.getElementById('modalActionBtn');

function getServiceKey(cardTitle) {
  return cardTitle.toLowerCase().trim().replace(/&amp;/g, '&').replace(/[^a-z0-9\s&]/g, '').replace(/\s+/g, ' ');
}

window.openServiceModal = function(card) {
  const cardTitle = card.querySelector('.service-name').textContent.trim();
  const cleanKey = getServiceKey(cardTitle);
  const data = serviceDetailsData[cleanKey];
  
  if (!data) return;
  
  modalTitle.textContent = cardTitle;
  modalDesc.textContent = data.desc;
  modalTime.textContent = data.time;
  modalPrice.textContent = data.price;
  
  const cardIcon = card.querySelector('.service-icon').innerHTML;
  modalIcon.innerHTML = cardIcon;
  
  modalChecklist.innerHTML = data.checklist.map(item => `<li>${item}</li>`).join('');
  
  serviceModal.classList.add('active');
  serviceModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

function closeServiceModal() {
  serviceModal.classList.remove('active');
  serviceModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (modalClose) modalClose.addEventListener('click', closeServiceModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeServiceModal);

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    openServiceModal(card);
  });
});

if (modalActionBtn) {
  modalActionBtn.addEventListener('click', () => {
    const selectedTitle = modalTitle.textContent.trim();
    closeServiceModal();
    
    const select = document.getElementById('service');
    if (select) {
      let matched = false;
      const cleanCardText = selectedTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
      for (let i = 0; i < select.options.length; i++) {
        const option = select.options[i];
        const cleanOptText = option.textContent.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanOptText.includes(cleanCardText) || cleanCardText.includes(cleanOptText)) {
          select.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) {
        select.value = "";
      }
    }

    const messageField = document.getElementById('msg');
    if (messageField) {
      messageField.value = `I would like to inquire about and book the following service:\n- ${selectedTitle}\n\nPlease let me know your availability and next steps.`;
    }
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// 5. TESTIMONIALS SLIDER INTERACTION
const track = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('slidePrev');
const nextBtn = document.getElementById('slideNext');

if (track && prevBtn && nextBtn) {
  const getScrollAmount = () => {
    const card = track.querySelector('.testi-card');
    return card ? card.offsetWidth + 24 : 380;
  };

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });
}



