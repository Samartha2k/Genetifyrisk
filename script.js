// Disease Database
const diseases = [
  // Autosomal Dominant
  { id: 1, name: "Huntington's Disease", category: "autosomal-dominant", prevalence: 0.00004, penetrance: 1.0, heritability: 1.0 },
  { id: 2, name: "Familial Hypercholesterolemia", category: "autosomal-dominant", prevalence: 0.002, penetrance: 0.9, heritability: 0.9 },
  { id: 3, name: "Marfan Syndrome", category: "autosomal-dominant", prevalence: 0.00007, penetrance: 0.95, heritability: 1.0 },
  { id: 4, name: "Achondroplasia", category: "autosomal-dominant", prevalence: 0.00003, penetrance: 1.0, heritability: 1.0 },
  { id: 5, name: "Neurofibromatosis Type 1", category: "autosomal-dominant", prevalence: 0.0003, penetrance: 1.0, heritability: 1.0 },

  // Autosomal Recessive
  { id: 6, name: "Cystic Fibrosis", category: "autosomal-recessive", prevalence: 0.0004, penetrance: 1.0, heritability: 1.0 },
  { id: 7, name: "Sickle Cell Disease", category: "autosomal-recessive", prevalence: 0.0003, penetrance: 1.0, heritability: 1.0 },
  { id: 8, name: "Thalassemia", category: "autosomal-recessive", prevalence: 0.001, penetrance: 1.0, heritability: 1.0 },
  { id: 9, name: "Tay-Sachs Disease", category: "autosomal-recessive", prevalence: 0.00003, penetrance: 1.0, heritability: 1.0 },
  { id: 10, name: "Phenylketonuria (PKU)", category: "autosomal-recessive", prevalence: 0.0001, penetrance: 1.0, heritability: 1.0 },

  // X-Linked
  { id: 11, name: "Hemophilia A", category: "x-linked", prevalence: 0.0001, penetrance: 1.0, heritability: 1.0 },
  { id: 12, name: "Duchenne Muscular Dystrophy", category: "x-linked", prevalence: 0.00002, penetrance: 1.0, heritability: 1.0 },
  { id: 13, name: "Fragile X Syndrome", category: "x-linked", prevalence: 0.0004, penetrance: 0.8, heritability: 1.0 },
  { id: 14, name: "Color Blindness", category: "x-linked", prevalence: 0.08, penetrance: 1.0, heritability: 1.0 },

  // Multifactorial
  { id: 15, name: "Type 2 Diabetes", category: "multifactorial", prevalence: 0.10, penetrance: 0.5, heritability: 0.7 },
  { id: 16, name: "Heart Disease", category: "multifactorial", prevalence: 0.06, penetrance: 0.4, heritability: 0.5 },
  { id: 17, name: "Hypertension", category: "multifactorial", prevalence: 0.30, penetrance: 0.4, heritability: 0.5 },
  { id: 18, name: "Alzheimer's Disease", category: "multifactorial", prevalence: 0.10, penetrance: 0.6, heritability: 0.7 },
  { id: 19, name: "Asthma", category: "multifactorial", prevalence: 0.08, penetrance: 0.5, heritability: 0.6 },
  { id: 20, name: "Obesity", category: "multifactorial", prevalence: 0.35, penetrance: 0.3, heritability: 0.6 }
];

// State Management
let currentStep = 1;
let selectedDisease = null;
let familyMembers = [];
let formData = {};

// Initialize
function init() {
  renderDiseases();
  updateProgress();
}

// Render Disease Cards
function renderDiseases(category = 'all') {
  const grid = document.getElementById('diseaseGrid');
  grid.innerHTML = '';

  const filtered = category === 'all'
    ? diseases
    : diseases.filter(d => d.category === category);

  filtered.forEach(disease => {
    const card = document.createElement('div');
    card.className = 'disease-card';
    if (selectedDisease && selectedDisease.id === disease.id) {
      card.classList.add('selected');
    }

    const categoryLabel = disease.category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    card.innerHTML = `
      <h4>${disease.name}</h4>
      <div class="inheritance-type">${categoryLabel}</div>
    `;

    card.onclick = () => selectDisease(disease);
    grid.appendChild(card);
  });
}

function filterDiseases() {
  const category = document.getElementById('diseaseCategory').value;
  renderDiseases(category);
}

function selectDisease(disease) {
  selectedDisease = disease;
  renderDiseases(document.getElementById('diseaseCategory').value);
}

// Family Members
function toggleFamilyMembers() {
  const hasFamily = document.getElementById('hasAffectedFamily').value === 'yes';
  const container = document.getElementById('familyMembersContainer');
  container.style.display = hasFamily ? 'block' : 'none';

  if (hasFamily && familyMembers.length === 0) {
    addFamilyMember();
  }
}

function addFamilyMember() {
  const id = Date.now();
  familyMembers.push({ id, relation: '', status: '', ageOnset: '' });
  renderFamilyMembers();
}

function removeFamilyMember(id) {
  familyMembers = familyMembers.filter(m => m.id !== id);
  renderFamilyMembers();
}

function renderFamilyMembers() {
  const container = document.getElementById('familyMembersList');
  container.innerHTML = familyMembers.map((member, index) => `
    <div class="family-member">
      <div class="family-member-header">
        <div class="family-member-title">Family Member ${index + 1}</div>
        <button type="button" class="remove-btn" onclick="removeFamilyMember(${member.id})">Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Relationship</label>
          <select onchange="updateFamilyMember(${member.id}, 'relation', this.value)">
            <option value="">Select...</option>
            <option value="parent">Parent</option>
            <option value="sibling">Sibling</option>
            <option value="child">Child</option>
            <option value="grandparent">Grandparent</option>
            <option value="aunt-uncle">Aunt/Uncle</option>
            <option value="cousin">Cousin</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select onchange="updateFamilyMember(${member.id}, 'status', this.value)">
            <option value="">Select...</option>
            <option value="affected">Affected</option>
            <option value="carrier">Carrier</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Age of Onset <span class="optional">(Optional)</span></label>
        <input type="number" placeholder="Age when diagnosed" onchange="updateFamilyMember(${member.id}, 'ageOnset', this.value)">
      </div>
    </div>
  `).join('');
}

function updateFamilyMember(id, field, value) {
  const member = familyMembers.find(m => m.id === id);
  if (member) {
    member[field] = value;
  }
}

// Navigation
function nextStep() {
  if (!validateStep(currentStep)) return;

  if (currentStep === 4) {
    calculateRisk();
    return;
  }

  currentStep++;
  updateStepDisplay();
}

function previousStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepDisplay();
  }
}

function updateStepDisplay() {
  // Update form steps
  document.querySelectorAll('.form-step').forEach(step => {
    step.classList.remove('active');
  });
  document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');

  // Update progress
  updateProgress();

  // Update buttons
  document.getElementById('prevBtn').style.display = currentStep > 1 ? 'block' : 'none';
  document.getElementById('nextBtn').textContent = currentStep === 4 ? 'Calculate Risk' : 'Next';
}

function updateProgress() {
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    step.classList.remove('active', 'completed');
    if (index + 1 < currentStep) {
      step.classList.add('completed');
    } else if (index + 1 === currentStep) {
      step.classList.add('active');
    }
  });

  const progress = ((currentStep - 1) / 4) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
}

function validateStep(step) {
  switch(step) {
    case 1:
      if (!selectedDisease) {
        alert('Please select a disease');
        return false;
      }
      return true;
    case 2:
      const age = document.getElementById('age').value;
      const sex = document.getElementById('sex').value;
      const ethnicity = document.getElementById('ethnicity').value;
      if (!age || !sex || !ethnicity) {
        alert('Please fill in all required fields');
        return false;
      }
      return true;
    default:
      return true;
  }
}

// Risk Calculation
function calculateRisk() {
  collectFormData();

  let risk = 0;
  const disease = selectedDisease;

  if (disease.category === 'autosomal-dominant') {
    risk = calculateAutosomalDominant();
  } else if (disease.category === 'autosomal-recessive') {
    risk = calculateAutosomalRecessive();
  } else if (disease.category === 'x-linked') {
    risk = calculateXLinked();
  } else if (disease.category === 'multifactorial') {
    risk = calculateMultifactorial();
  }

  displayResults(risk);
}

function collectFormData() {
  formData = {
    age: parseInt(document.getElementById('age').value),
    sex: document.getElementById('sex').value,
    ethnicity: document.getElementById('ethnicity').value,
    carrierStatus: document.getElementById('carrierStatus').value,
    hasAffectedFamily: document.getElementById('hasAffectedFamily').value === 'yes',
    familyMembers: familyMembers,
    bmi: parseFloat(document.getElementById('bmi').value) || null,
    bloodPressure: document.getElementById('bloodPressure').value,
    smoking: document.getElementById('smoking').value,
    activity: document.getElementById('activity').value,
    diet: document.getElementById('diet').value,
    stress: document.getElementById('stress').value
  };
}

function calculateAutosomalDominant() {
  const disease = selectedDisease;
  let risk = disease.prevalence;

  // If person is affected
  if (formData.carrierStatus === 'affected') {
    return 1.0;
  }

  // Check family history
  const affectedParents = familyMembers.filter(m => m.relation === 'parent' && m.status === 'affected').length;
  const affectedSiblings = familyMembers.filter(m => m.relation === 'sibling' && m.status === 'affected').length;

  if (affectedParents > 0) {
    risk = 0.5 * disease.penetrance;
  } else if (affectedSiblings > 0) {
    risk = 0.25 * disease.penetrance;
  } else if (formData.hasAffectedFamily) {
    risk = disease.prevalence * 3; // Empirical risk increase
  }

  return Math.min(risk, 1.0);
}

function calculateAutosomalRecessive() {
  const disease = selectedDisease;

  // If person is affected
  if (formData.carrierStatus === 'affected') {
    return 1.0;
  }

  // If known carrier
  if (formData.carrierStatus === 'carrier') {
    // Risk depends on partner carrier frequency
    const q = Math.sqrt(disease.prevalence);
    return 0.25 * (2 * q);
  }

  // Check family history
  const affectedParents = familyMembers.filter(m => m.relation === 'parent' && m.status === 'affected').length;
  const carrierParents = familyMembers.filter(m => m.relation === 'parent' && m.status === 'carrier').length;

  if (affectedParents === 1) {
    return 0.5; // One affected parent means person is carrier
  }

  if (carrierParents === 2) {
    return 0.25;
  }

  if (carrierParents === 1) {
    const q = Math.sqrt(disease.prevalence);
    return 0.25 * (2 * q);
  }

  // Use Hardy-Weinberg for population
  return disease.prevalence;
}

function calculateXLinked() {
  const disease = selectedDisease;

  if (formData.sex === 'male') {
    // Males are affected if they have the mutation
    const affectedMother = familyMembers.some(m => m.relation === 'parent' && m.status === 'affected');
    const carrierMother = familyMembers.some(m => m.relation === 'parent' && m.status === 'carrier');

    if (affectedMother) return 1.0;
    if (carrierMother) return 0.5;

    return disease.prevalence;
  } else {
    // Females need two copies
    const affectedFather = familyMembers.some(m => m.relation === 'parent' && m.status === 'affected');
    const carrierMother = familyMembers.some(m => m.relation === 'parent' && m.status === 'carrier');

    if (affectedFather && carrierMother) return 0.5;
    if (affectedFather) return 0; // Will be carrier

    return disease.prevalence * disease.prevalence; // Very rare for females
  }
}

function calculateMultifactorial() {
  const disease = selectedDisease;
  let baseRisk = disease.prevalence;

  // Genetic Risk Ratio based on family history
  let grr = 1.0;

  const firstDegree = familyMembers.filter(m =>
    ['parent', 'sibling', 'child'].includes(m.relation) && m.status === 'affected'
  ).length;

  const secondDegree = familyMembers.filter(m =>
    ['grandparent', 'aunt-uncle'].includes(m.relation) && m.status === 'affected'
  ).length;

  if (firstDegree >= 2) grr = 5;
  else if (firstDegree === 1) grr = 3;
  else if (secondDegree >= 1) grr = 1.5;

  // Environmental factors
  let environmentalMultiplier = 1.0;

  // BMI factor
  if (formData.bmi) {
    if (formData.bmi > 30) environmentalMultiplier *= 1.3;
    else if (formData.bmi > 25) environmentalMultiplier *= 1.1;
  }

  // Blood pressure
  if (formData.bloodPressure === 'high') environmentalMultiplier *= 1.2;
  else if (formData.bloodPressure === 'elevated') environmentalMultiplier *= 1.1;

  // Smoking
  if (formData.smoking === 'current') environmentalMultiplier *= 1.4;
  else if (formData.smoking === 'former') environmentalMultiplier *= 1.1;

  // Activity
  if (formData.activity === 'sedentary') environmentalMultiplier *= 1.2;
  else if (formData.activity === 'vigorous') environmentalMultiplier *= 0.8;

  // Diet
  if (formData.diet === 'poor') environmentalMultiplier *= 1.2;
  else if (formData.diet === 'excellent') environmentalMultiplier *= 0.9;

  // Stress
  if (formData.stress === 'high') environmentalMultiplier *= 1.15;

  // Calculate final risk
  const geneticRisk = baseRisk * grr * disease.heritability;
  const environmentalRisk = baseRisk * (environmentalMultiplier - 1) * (1 - disease.heritability);

  return Math.min(geneticRisk + environmentalRisk, 1.0);
}

function displayResults(risk) {
  const riskPercent = (risk * 100).toFixed(2);
  const disease = selectedDisease;
  const populationRisk = (disease.prevalence * 100).toFixed(2);

  // Show results container
  document.querySelector('.card').style.display = 'none';
  document.getElementById('resultsContainer').classList.add('active');

  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update risk score
  document.getElementById('riskScore').textContent = riskPercent + '%';

  // Determine risk category based on absolute percentage
  let category, categoryColor, categoryBgColor, categoryTextColor;
  const riskPercentValue = parseFloat(riskPercent);

  if (riskPercentValue < 10) {
    category = 'Low Risk';
    categoryColor = '#10b981';
    categoryBgColor = 'rgba(16, 185, 129, 0.25)';
    categoryTextColor = '#d1fae5';
  } else if (riskPercentValue < 30) {
    category = 'Moderate Risk';
    categoryColor = '#f59e0b';
    categoryBgColor = 'rgba(245, 158, 11, 0.25)';
    categoryTextColor = '#fef3c7';
  } else {
    category = 'High Risk';
    categoryColor = '#ef4444';
    categoryBgColor = 'rgba(239, 68, 68, 0.35)';
    categoryTextColor = '#ffffff';
  }

  const categoryEl = document.getElementById('riskCategory');
  categoryEl.textContent = category;
  categoryEl.style.background = categoryBgColor;
  categoryEl.style.color = categoryTextColor;
  categoryEl.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7)'; // Enhanced shadow for better visibility

  // Population comparison
  document.getElementById('populationRisk').textContent = populationRisk + '%';
  document.getElementById('yourRisk').textContent = riskPercent + '%';

  const comparisonPercent = Math.min((risk / Math.max(disease.prevalence, risk)) * 100, 100);
  setTimeout(() => {
    document.getElementById('comparisonBar').style.width = comparisonPercent + '%';
    document.getElementById('comparisonBar').textContent = comparisonPercent.toFixed(0) + '%';
  }, 300);

  // Contributing factors
  const factors = getContributingFactors(risk);
  const factorsList = document.getElementById('factorsList');
  factorsList.innerHTML = factors.map(f => `
    <li class="factor-item">
      <span class="factor-name">${f.name}</span>
      <span class="factor-impact impact-${f.impact}">${f.impact.toUpperCase()}</span>
    </li>
  `).join('');

  // Explanations
  document.getElementById('riskExplanation').textContent = getRiskExplanation(risk, category);
  document.getElementById('confidenceInterval').textContent = getConfidenceInterval(risk);

  // Recommendations
  const recommendations = getRecommendations(risk, category);
  document.getElementById('recommendationsList').innerHTML = recommendations.map(r => `<li>${r}</li>`).join('');

  // Update progress
  currentStep = 5;
  updateProgress();
}

function getContributingFactors(risk) {
  const factors = [];
  const disease = selectedDisease;

  // Family history
  const affectedFamily = familyMembers.filter(m => m.status === 'affected').length;
  if (affectedFamily > 0) {
    factors.push({
      name: `${affectedFamily} affected family member(s)`,
      impact: affectedFamily >= 2 ? 'high' : 'moderate'
    });
  }

  // Carrier status
  if (formData.carrierStatus === 'carrier') {
    factors.push({ name: 'Known carrier status', impact: 'high' });
  }

  // Lifestyle factors (for multifactorial)
  if (disease.category === 'multifactorial') {
    if (formData.bmi && formData.bmi > 30) {
      factors.push({ name: 'Obesity (BMI > 30)', impact: 'moderate' });
    }
    if (formData.smoking === 'current') {
      factors.push({ name: 'Current smoking', impact: 'high' });
    }
    if (formData.bloodPressure === 'high') {
      factors.push({ name: 'High blood pressure', impact: 'moderate' });
    }
    if (formData.activity === 'sedentary') {
      factors.push({ name: 'Sedentary lifestyle', impact: 'moderate' });
    }
    if (formData.stress === 'high') {
      factors.push({ name: 'High stress levels', impact: 'low' });
    }
  }

  // Genetic factors
  factors.push({
    name: 'Genetic predisposition',
    impact: disease.heritability > 0.7 ? 'high' : 'moderate'
  });

  if (factors.length === 0) {
    factors.push({ name: 'Population baseline risk', impact: 'low' });
  }

  return factors;
}

function getRiskExplanation(risk, category) {
  const disease = selectedDisease;
  const ratio = (risk / disease.prevalence).toFixed(1);

  if (category === 'Low Risk') {
    return `Your risk for ${disease.name} is ${ratio}x the general population risk. This is considered low, but regular health monitoring is still recommended.`;
  } else if (category === 'Moderate Risk') {
    return `Your risk for ${disease.name} is ${ratio}x the general population risk. This warrants closer monitoring and possible preventive measures.`;
  } else {
    return `Your risk for ${disease.name} is ${ratio}x the general population risk. This is significantly elevated and genetic counseling is strongly recommended.`;
  }
}

function getConfidenceInterval(risk) {
  const lower = Math.max(0, risk * 0.8);
  const upper = Math.min(1, risk * 1.2);
  return `95% Confidence Interval: ${(lower * 100).toFixed(2)}% - ${(upper * 100).toFixed(2)}%`;
}

function getRecommendations(risk, category) {
  const recommendations = [];
  const disease = selectedDisease;

  if (category === 'High Risk' || category === 'Moderate Risk') {
    recommendations.push('Consult with a genetic counselor to discuss your risk and testing options');
    recommendations.push('Consider genetic testing to confirm carrier status or predisposition');
  }

  if (disease.category === 'multifactorial') {
    if (formData.smoking === 'current') {
      recommendations.push('Quit smoking - this is one of the most impactful changes you can make');
    }
    if (formData.bmi && formData.bmi > 25) {
      recommendations.push('Work towards a healthy weight through diet and exercise');
    }
    if (formData.activity === 'sedentary') {
      recommendations.push('Increase physical activity to at least 150 minutes of moderate exercise per week');
    }
    if (formData.diet !== 'excellent') {
      recommendations.push('Improve diet quality with more fruits, vegetables, and whole grains');
    }
    if (formData.bloodPressure !== 'normal') {
      recommendations.push('Monitor and manage blood pressure through lifestyle changes and/or medication');
    }
  }

  recommendations.push('Schedule regular check-ups with your healthcare provider');
  recommendations.push('Stay informed about family medical history and update as needed');
  recommendations.push('Consider joining support groups or communities for individuals with similar risk profiles');

  return recommendations;
}

// Export to PDF function - Professional Edition
function exportToPDF() {
  try {
    if (!window.jspdf) {
      alert('PDF library is still loading. Please try again in a moment.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const disease = selectedDisease;
    const riskPercent = document.getElementById('riskScore').textContent;
    const riskCategory = document.getElementById('riskCategory').textContent;
    const populationRisk = document.getElementById('populationRisk').textContent;
    const explanation = document.getElementById('riskExplanation').textContent;
    const confidenceInterval = document.getElementById('confidenceInterval').textContent;

  // ==================== COVER PAGE ====================
  // Gradient Header
  doc.setFillColor(139, 92, 246);
  doc.rect(0, 0, 210, 50, 'F');

  // White accent line
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.5);
  doc.line(0, 50, 210, 50);

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('GENETIFY RISK', 105, 22, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Genetic Risk Assessment Report', 105, 35, { align: 'center' });

  // DNA Helix Icon (using characters)
  doc.setFontSize(40);
  doc.text('⚕', 105, 95, { align: 'center' });

  // Report Details Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.roundedRect(40, 110, 130, 40, 3, 3, 'FD');

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Report Date: ${today}`, 105, 123, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.text(`Patient: ${formData.age} years, ${formData.sex.charAt(0).toUpperCase() + formData.sex.slice(1)}`, 105, 133, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.text(`Assessment: ${disease.name}`, 105, 143, { align: 'center' });

  // Large Risk Score
  let yPos = 175;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(80, 80, 80);
  doc.text('YOUR CALCULATED RISK', 105, yPos, { align: 'center' });

  yPos += 15;
  doc.setFontSize(48);

  // Color based on risk category
  if (riskCategory.includes('Low')) {
    doc.setTextColor(16, 185, 129);
  } else if (riskCategory.includes('Moderate')) {
    doc.setTextColor(245, 158, 11);
  } else {
    doc.setTextColor(239, 68, 68);
  }
  doc.text(riskPercent, 105, yPos, { align: 'center' });

  yPos += 12;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(riskCategory.toUpperCase(), 105, yPos, { align: 'center' });

  // Footer for cover page
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('CONFIDENTIAL MEDICAL REPORT', 105, 275, { align: 'center' });
  doc.text('For Educational and Informational Purposes Only', 105, 282, { align: 'center' });

  // ==================== PAGE 2: DETAILED ASSESSMENT ====================
  doc.addPage();
  yPos = 25;

  // Section Header Helper Function
  const drawSectionHeader = (title, y) => {
    doc.setFillColor(139, 92, 246);
    doc.rect(15, y - 7, 4, 10, 'F');
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text(title, 22, y);

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(22, y + 2, 195, y + 2);
    return y + 10;
  };

  // Info Box Helper Function
  const drawInfoBox = (label, value, y, color = [139, 92, 246]) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.roundedRect(15, y, 180, 12, 2, 2, 'FD');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...color);
    doc.text(label, 20, y + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(value, 80, y + 7.5);
    return y + 15;
  };

  // PERSONAL INFORMATION SECTION
  yPos = drawSectionHeader('PERSONAL INFORMATION', yPos);
  yPos = drawInfoBox('Age:', `${formData.age} years`, yPos);
  yPos = drawInfoBox('Biological Sex:', formData.sex.charAt(0).toUpperCase() + formData.sex.slice(1), yPos);
  yPos = drawInfoBox('Ethnicity:', formData.ethnicity.charAt(0).toUpperCase() + formData.ethnicity.slice(1), yPos);
  yPos = drawInfoBox('Carrier Status:', formData.carrierStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()), yPos);

  yPos += 5;

  // DISEASE INFORMATION SECTION
  yPos = drawSectionHeader('DISEASE ASSESSMENT', yPos);
  const categoryLabel = disease.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  yPos = drawInfoBox('Disease:', disease.name, yPos, [236, 72, 153]);
  yPos = drawInfoBox('Inheritance Type:', categoryLabel, yPos, [236, 72, 153]);
  yPos = drawInfoBox('Population Prevalence:', populationRisk, yPos, [236, 72, 153]);

  yPos += 5;

  // RISK RESULTS SECTION
  yPos = drawSectionHeader('RISK ASSESSMENT RESULTS', yPos);

  // Large Risk Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(139, 92, 246);
  doc.setLineWidth(1.5);
  doc.roundedRect(15, yPos, 180, 35, 3, 3, 'FD');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  doc.text('YOUR RISK ASSESSMENT', 105, yPos + 10, { align: 'center' });

  doc.setFontSize(28);
  if (riskCategory.includes('Low')) {
    doc.setTextColor(16, 185, 129);
  } else if (riskCategory.includes('Moderate')) {
    doc.setTextColor(245, 158, 11);
  } else {
    doc.setTextColor(239, 68, 68);
  }
  doc.text(riskPercent, 105, yPos + 25, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`[${riskCategory.toUpperCase()}]`, 105, yPos + 32, { align: 'center' });

  yPos += 40;

  // Comparison
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`General Population Risk: ${populationRisk}  |  `, 105, yPos, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  const ratio = (parseFloat(riskPercent) / parseFloat(populationRisk)).toFixed(1);
  doc.text(`${ratio}x Population Risk`, 105, yPos + 5, { align: 'center' });

  yPos += 15;

  // INTERPRETATION SECTION
  yPos = drawSectionHeader('INTERPRETATION', yPos);

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.roundedRect(15, yPos, 180, 25, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  const explanationLines = doc.splitTextToSize(explanation, 170);
  doc.text(explanationLines, 20, yPos + 7);

  yPos += 30;

  // Confidence Interval
  doc.setFillColor(240, 245, 255);
  doc.roundedRect(15, yPos, 180, 10, 2, 2, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(80, 80, 150);
  doc.text(confidenceInterval, 105, yPos + 6.5, { align: 'center' });

  // ==================== PAGE 3: FACTORS & RECOMMENDATIONS ====================
  doc.addPage();
  yPos = 25;

  // CONTRIBUTING FACTORS
  yPos = drawSectionHeader('CONTRIBUTING FACTORS', yPos);

  const factors = getContributingFactors(parseFloat(riskPercent.replace('%', '')) / 100);

  factors.forEach((factor, index) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 25;
    }

    const impactColor = factor.impact === 'high' ? [239, 68, 68] :
                       factor.impact === 'moderate' ? [245, 158, 11] : [16, 185, 129];

    // Factor box
    doc.setFillColor(252, 252, 252);
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.roundedRect(15, yPos, 180, 12, 2, 2, 'FD');

    // Impact badge
    doc.setFillColor(...impactColor);
    doc.circle(22, yPos + 6, 2.5, 'F');

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(factor.name, 28, yPos + 7.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...impactColor);
    doc.text(factor.impact.toUpperCase(), 185, yPos + 7.5, { align: 'right' });

    yPos += 14;
  });

  yPos += 5;

  // RECOMMENDATIONS
  if (yPos > 180) {
    doc.addPage();
    yPos = 25;
  }

  yPos = drawSectionHeader('PERSONALIZED RECOMMENDATIONS', yPos);

  const recommendations = getRecommendations(parseFloat(riskPercent.replace('%', '')) / 100, riskCategory);

  recommendations.forEach((rec, index) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 25;
    }

    // Calculate text height first
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const recLines = doc.splitTextToSize(rec, 165);
    const boxHeight = Math.max(12, recLines.length * 5 + 6);

    // Recommendation box
    doc.setFillColor(245, 250, 255);
    doc.setDrawColor(139, 92, 246);
    doc.setLineWidth(0.3);
    doc.roundedRect(15, yPos, 180, boxHeight, 2, 2, 'FD');

    // Number badge
    doc.setFillColor(139, 92, 246);
    doc.circle(22, yPos + 6, 3, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(String(index + 1), 22, yPos + 7.5, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(recLines, 28, yPos + 6.5);

    yPos += boxHeight + 2;
  });

  // ==================== DISCLAIMER ====================
  if (yPos > 230) {
    doc.addPage();
    yPos = 25;
  } else {
    yPos += 10;
  }

  doc.setFillColor(255, 250, 240);
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1);
  doc.roundedRect(15, yPos, 180, 40, 3, 3, 'FD');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(245, 158, 11);
  doc.text('⚠  IMPORTANT MEDICAL DISCLAIMER', 105, yPos + 8, { align: 'center' });

  yPos += 15;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 80, 60);
  const disclaimerText = 'This genetic risk assessment is for educational and informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider or genetic counselor before making any decisions regarding your health. The calculations are based on statistical models and may not account for all individual factors.';
  const disclaimerLines = doc.splitTextToSize(disclaimerText, 170);
  doc.text(disclaimerLines, 105, yPos, { align: 'center' });

  // ==================== FOOTER ON ALL PAGES ====================
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Footer line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(15, 282, 195, 282);

    // Footer text
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(130, 130, 130);
    doc.text('Genetify Risk - Professional Genetic Risk Assessment Platform', 20, 288);

    doc.setFont('helvetica', 'bold');
    doc.text(`Page ${i} of ${pageCount}`, 190, 288, { align: 'right' });
  }

  // Save the PDF
  const fileName = `Genetify_Risk_Report_${disease.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF report. Please check the console for details.');
  }
}

function restartAssessment() {
  currentStep = 1;
  selectedDisease = null;
  familyMembers = [];
  formData = {};

  document.getElementById('resultsContainer').classList.remove('active');
  document.querySelector('.card').style.display = 'block';

  // Reset form
  document.querySelectorAll('input, select, textarea').forEach(el => {
    if (el.type === 'checkbox') el.checked = false;
    else el.value = '';
  });

  document.getElementById('diseaseCategory').value = 'all';
  document.getElementById('hasAffectedFamily').value = 'no';
  document.getElementById('familyMembersContainer').style.display = 'none';

  renderDiseases();
  updateStepDisplay();
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
