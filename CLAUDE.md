# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Genetify Risk is a genetic disorder risk calculator web application that estimates the probability of inheriting genetic disorders based on disease prevalence, inheritance type, and familial relationships.

## Architecture

### Core Components

**index.html** - Comprehensive single-page application with multi-step wizard:
- Step 1: Disease selection from 20 pre-configured genetic disorders
- Step 2: Personal information (age, sex, ethnicity, carrier status)
- Step 3: Family history with dynamic family member management
- Step 4: Lifestyle and health factors (BMI, blood pressure, smoking, activity, diet, stress)
- Step 5: Detailed results page with risk breakdown and recommendations

**GENETIC_DISORDER_PROBABILITY_REPORT.md** - Comprehensive reference document containing:
- List of spreadable genetic diseases categorized by inheritance pattern
- Mathematical formulas for probability calculations
- Input parameters and calculation methodologies

### Disease Database

The application includes 20 genetic disorders across 4 inheritance categories (lines 985-1013):

**Autosomal Dominant (5 diseases):**
- Huntington's Disease, Familial Hypercholesterolemia, Marfan Syndrome, Achondroplasia, Neurofibromatosis Type 1

**Autosomal Recessive (5 diseases):**
- Cystic Fibrosis, Sickle Cell Disease, Thalassemia, Tay-Sachs Disease, Phenylketonuria (PKU)

**X-Linked (4 diseases):**
- Hemophilia A, Duchenne Muscular Dystrophy, Fragile X Syndrome, Color Blindness

**Multifactorial (6 diseases):**
- Type 2 Diabetes, Heart Disease, Hypertension, Alzheimer's Disease, Asthma, Obesity

Each disease has associated prevalence, penetrance, and heritability values.

### Calculation Logic

The application implements comprehensive genetic risk calculations:

**Autosomal Dominant (lines 1244-1266):**
- If person is affected: 100% risk
- If parent affected: 50% × penetrance
- If sibling affected: 25% × penetrance
- With family history: 3× baseline prevalence

**Autosomal Recessive (lines 1268-1302):**
- Uses Hardy-Weinberg equilibrium
- Known carrier: 25% × 2q (where q = √prevalence)
- Two carrier parents: 25% risk
- One carrier parent: 25% × 2q

**X-Linked (lines 1304-1326):**
- Male with carrier mother: 50% risk
- Male with affected mother: 100% risk
- Female requires two X chromosomes affected (very rare)

**Multifactorial (lines 1328-1380):**
- Genetic Risk Ratio (GRR) based on family history:
  - 2+ first-degree relatives: GRR = 5
  - 1 first-degree relative: GRR = 3
  - 1+ second-degree relative: GRR = 1.5
- Environmental multipliers for:
  - BMI (1.1-1.3× if overweight/obese)
  - Blood pressure (1.1-1.2× if elevated/high)
  - Smoking (1.4× for current, 1.1× for former)
  - Physical activity (0.8× for vigorous, 1.2× for sedentary)
  - Diet quality (0.9× for excellent, 1.2× for poor)
  - Stress (1.15× for high)
- Final risk = (baseRisk × GRR × heritability) + (baseRisk × (envMultiplier - 1) × (1 - heritability))

### UI/UX Features

**Multi-step Progress Indicator:**
- Visual progress bar with 5 steps
- Step validation before progression
- Previous/Next navigation

**Professional Design:**
- Modern gradient backgrounds
- Card-based layout with smooth animations
- CSS custom properties for consistent theming
- Responsive design (mobile-friendly)
- Interactive disease cards with selection states

**Results Display:**
- Large risk score percentage
- Color-coded risk categories (Low/Moderate/High)
- Population comparison bar chart
- Contributing factors list with impact levels
- Personalized recommendations
- Confidence intervals
- Comprehensive medical disclaimer

## Development

This is a static HTML/CSS/JavaScript application with no build process or dependencies.

**To run:**
Simply open `index.html` in a web browser.

**No package manager, testing framework, or build tools are currently configured.**

## Implementation Notes

- All formulas from GENETIC_DISORDER_PROBABILITY_REPORT.md sections 3.A-3.F are now implemented
- Penetrance values are factored into dominant disease calculations
- Multifactorial diseases use both genetic and environmental risk factors
- Family history tracking supports multiple relatives with different relationships
- Lifestyle factors only affect multifactorial disease calculations
- Risk categories are determined relative to baseline population risk (1.5× for moderate, 3× for high)
- Confidence intervals use ±20% range around calculated risk

## Data Privacy Considerations

When extending this application, ensure compliance with HIPAA/GDPR for health data and include appropriate medical disclaimers (see section 5 of GENETIC_DISORDER_PROBABILITY_REPORT.md).
