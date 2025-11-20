# GENETIC DISORDER PROBABILITY CALCULATOR - PROJECT REPORT

## 1. SPREADABLE GENETIC DISEASES & DISORDERS

### **Autosomal Dominant Diseases** (50% inheritance probability per affected parent)
- Huntington's Disease
- Familial Hypercholesterolemia
- Marfan Syndrome
- Achondroplasia (Dwarfism)
- Osteogenesis Imperfecta (Brittle Bone Disease)
- Hypertrophic Cardiomyopathy
- Polycystic Kidney Disease (PKD)
- Neurofibromatosis Type 1

### **Autosomal Recessive Diseases** (25% if both parents are carriers)
- Cystic Fibrosis
- Sickle Cell Disease
- Thalassemia
- Hemophilia A & B
- Tay-Sachs Disease
- Spinal Muscular Atrophy (SMA)
- Albinism
- Phenylketonuria (PKU)

### **X-Linked Diseases** (inheritance depends on parent gender)
- Hemophilia A & B
- Duchenne Muscular Dystrophy
- Fragile X Syndrome
- Color Blindness
- G6PD Deficiency

### **Multifactorial Diseases** (genetic + environmental factors)
- Type 2 Diabetes
- Heart Disease
- Hypertension
- Alzheimer's Disease
- Asthma
- Obesity

---

## 2. INPUT PARAMETERS REQUIRED

### **Genetic Information Inputs:**
- Family medical history (parents, siblings, grandparents)
- Affected family members and disease type
- Age of onset in relatives
- Carrier status (if known from testing)
- Ethnicity/ancestry (affects disease prevalence)

### **Clinical/Health Inputs:**
- Current age
- Gender/Biological sex
- Lifestyle factors (smoking, diet, exercise)
- BMI (Body Mass Index)
- Blood pressure
- Cholesterol levels
- Existing health conditions

### **Environmental Risk Factors:**
- Occupation/exposure history
- Geographic location
- Social determinants
- Diet and nutrition
- Physical activity level
- Stress levels

---

## 3. PROBABILITY CALCULATION FORMULAS

### **A. MENDELIAN INHERITANCE (Single Gene Disorders)**

#### Autosomal Dominant:
```
P(Affected Child) = 0.50 (if one parent affected)
P(Affected Child) = 0.75 (if both parents affected)
P(Affected Child) = 0.001 (if neither parent affected, accounts for new mutations)
```

#### Autosomal Recessive:
```
P(Affected Child | Both parents carriers) = 0.25
P(Affected Child | One parent affected, one carrier) = 0.50
P(Affected Child | One parent affected, one unaffected) = 0
P(Carrier | Both parents carriers) = 0.50
P(Normal | Both parents carriers) = 0.25
```

#### X-Linked Recessive (for males):
```
P(Affected Male | Carrier mother) = 0.50
P(Affected Male | Affected mother) = 1.0
P(Affected Male | Affected father, unaffected mother) = 0
```

#### X-Linked Recessive (for females):
```
P(Affected Female | Affected father & carrier mother) = 0.50
P(Affected Female | Affected father & affected mother) = 1.0
P(Carrier Female | Affected father & unaffected mother) = 1.0
```

### **B. MULTIFACTORIAL DISEASES (Complex Inheritance)**

#### Empirical Risk Formula:
```
Risk = Baseline Prevalence × Genetic Risk Ratio (GRR)

GRR = 1 + (h² × number of affected relatives)

Where:
- h² = Heritability of disease
- Baseline Prevalence = Population incidence rate
- Number of affected relatives = Count of affected family members
```

#### Example - Type 2 Diabetes:
```
Risk = 0.07 (7% baseline) × GRR

If one parent affected: GRR ≈ 3-4
If both parents affected: GRR ≈ 5-6
If sibling affected: GRR ≈ 3-4
```

#### Bayesian Risk Calculation:
```
Posterior Risk = (Likelihood × Prior Probability) / Evidence

P(Disease | Family History) = P(Family History | Disease) × P(Disease)
                              ÷ P(Family History)
```

### **C. RELATIVE RECURRENCE RISK (λ_R)**

```
Risk for Relative = Baseline Risk × λ_R

Common λ_R Values:
- First-degree relative (parent, sibling, child): λ = 2-10
- Second-degree relative (aunt, uncle, grandparent): λ = 1-3
- Third-degree relative (cousin): λ = 1-2
```

### **D. CARRIER PROBABILITY FORMULA**

#### For Autosomal Recessive:
```
If both parents are unknown: P(Carrier) ≈ 2pq (Hardy-Weinberg)
Where p = frequency of normal allele, q = frequency of disease allele

If one parent affected, one unknown:
P(Offspring is Carrier) = 0.50

If both parents carriers:
P(Offspring is Carrier) = 0.50
```

### **E. PENETRANCE & EXPRESSIVITY ADJUSTMENT**

```
Actual Risk = Mendelian Risk × Penetrance

Example - BRCA1 Mutation:
- Penetrance for breast cancer = 0.70-0.80 (70-80%)
- Lifetime risk = 0.50 × 0.75 = 0.375 (37.5%)
```

### **F. RISK SCORE MODEL (for multifactorial diseases)**

```
Risk Score = Base Score + (Genetic Component) + (Environmental Component)

Risk = 1 / (1 + e^(-Risk Score))  [Logistic regression]

Where:
- Genetic Component = Sum of genetic variants × effect size
- Environmental Component = Weighted sum of lifestyle factors
- e = Euler's number (2.718)
```

---

## 4. WEBSITE INTERFACE REQUIREMENTS

### **User Input Form Should Include:**
1. Personal Information (age, gender, ethnicity)
2. Medical History (current conditions, medications)
3. Lifestyle Assessment (diet, exercise, smoking, alcohol)
4. Family History Tree (with disease types and age of onset)
5. Genetic Testing Results (if available)

### **Output Report Should Show:**
1. Calculated Risk Percentage (with confidence interval)
2. Risk Category (Low/Moderate/High)
3. Comparison to Population Average
4. Individual Risk Factors Contributing Most
5. Personalized Recommendations
6. Disclaimer/Limitations

---

## 5. IMPLEMENTATION CONSIDERATIONS

- **Data Privacy**: Ensure HIPAA/GDPR compliance for health data
- **Disclaimers**: State this is NOT medical advice; consult healthcare providers
- **Accuracy**: Use validated epidemiological data and risk models
- **Testing**: Validate calculations against published risk assessment tools
- **Updates**: Regular updates as genetic research evolves

---

## 6. QUICK REFERENCE - DISEASE INHERITANCE PATTERNS

| Disease | Inheritance Type | Affected Parent Scenario | Child Risk % |
|---------|-----------------|------------------------|-------------|
| Huntington's | Autosomal Dominant | One parent affected | 50% |
| Marfan Syndrome | Autosomal Dominant | One parent affected | 50% |
| Cystic Fibrosis | Autosomal Recessive | Both parents carriers | 25% |
| Sickle Cell | Autosomal Recessive | Both parents carriers | 25% |
| Hemophilia A | X-Linked Recessive | Carrier mother | 50% (males) |
| Type 2 Diabetes | Multifactorial | One parent affected | 3-4× risk |
| Heart Disease | Multifactorial | One parent affected | 2-3× risk |

---

## 7. EXAMPLE CALCULATION WORKFLOW

### **Scenario: Cystic Fibrosis Risk Assessment**

**Input Data:**
- Both parents are carriers (heterozygous)
- No existing diagnosis in the individual
- European ancestry

**Calculation:**
1. Base Mendelian Risk: 25% (0.25)
2. Penetrance: 100% (1.0) - CF is fully penetrant
3. Final Risk = 0.25 × 1.0 = **0.25 or 25%**

**Output:**
- Risk Category: Moderate
- Recommendation: Genetic counseling, consider carrier testing for partner
- Confidence: 95% CI: 20%-30%

---

*This report is for educational and development purposes. Any genetic risk calculator should include comprehensive medical disclaimers and be validated by genetic counselors and medical professionals.*
