/* ==========================================================================
   SERVICEDETAIL.JS — AARA CLINICAL LABORATORIES & DIAGNOSTICS
   Dynamic Diagnostic Test Detail Page: URL query parsing, dynamic DOM hydration,
   interactive tab switching, test-specific clinical FAQs, and global controls.
   ========================================================================== */
'use strict';

// --------------------------------------------------------------------------
// 1. CLINICAL DIAGNOSTIC SERVICES KNOWLEDGE BASE & DATA DICTIONARY
// --------------------------------------------------------------------------
const servicesData = {
  'complete-blood-count': {
    id: 'complete-blood-count',
    title: 'Complete Blood Count (CBC)',
    goldAccent: '& Hematology',
    tag: 'Clinical Hematology Panel • 01',
    breadcrumb: 'Complete Blood Count (CBC)',
    image: 'assets/images/service-wall-art.jpg',
    imageCaption: 'Automated 5-Part Differential • EDTA Whole Blood',
    leadTime: 'Same-Day (6 – 12 Hours)',
    investment: '$25 USD',
    dimensionScale: '24 Cellular Biomarkers',
    archivalRating: 'Non-Fasting (Anytime)',
    narrative: [
      'Our Complete Blood Count (CBC) with Erythrocyte Sedimentation Rate (ESR) is an essential 24-parameter hematological evaluation that provides a detailed profile of your circulating blood cells. Utilizing automated 5-part differential laser flow cytometry, our laboratory quantifies red blood cells, hemoglobin levels, white blood cell subpopulations, and platelet indices with clinical precision.',
      'Whether ordered for an annual preventive health checkup, evaluation of fatigue and nutritional anemia, acute viral or bacterial infection screening, or ongoing hematological monitoring, every K2-EDTA whole blood specimen undergoes 3-level internal quality control and peripheral smear verification by our clinical pathology team when flagged.'
    ],
    benefits: [
      {
        icon: 'droplet',
        title: 'Red Cell & Anemia Indices',
        desc: 'Measures Hemoglobin, RBC count, Hematocrit (PCV), MCV, MCH, MCHC, and RDW-CV to detect iron, B12, or folate deficiency anemias.'
      },
      {
        icon: 'shield-check',
        title: '5-Part WBC Immune Differential',
        desc: 'Quantifies Total Leukocyte Count along with Neutrophils, Lymphocytes, Monocytes, Eosinophils, and Basophils to evaluate infection and immunity.'
      },
      {
        icon: 'activity',
        title: 'Platelet & Coagulation Screening',
        desc: 'Assesses Platelet Count, Mean Platelet Volume (MPV), and Plateletcrit (PCT) to monitor primary hemostasis and bone marrow activity.'
      },
      {
        icon: 'microscope',
        title: 'Automated ESR & Smear Review',
        desc: 'Includes Westergren-correlated Erythrocyte Sedimentation Rate (ESR) for inflammatory screening and manual pathologist slide review on abnormal flags.'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Walk-In or Doorstep Venipuncture',
        desc: 'No overnight fasting is required. A certified phlebotomist draws 3 mL of venous blood into a sterile purple-top K2-EDTA vacutainer tube.'
      },
      {
        num: '02',
        title: 'Gentle Inversion & 2D Barcoding',
        desc: 'The specimen is gently inverted 8–10 times to prevent micro-clotting and immediately labeled with a positive patient ID 2D barcode.'
      },
      {
        num: '03',
        title: '5-Part Laser Flow Cytometry Assay',
        desc: 'Calibrated multi-channel hematology analyzers count and classify thousands of red cells, leukocytes, and platelets per second.'
      },
      {
        num: '04',
        title: 'Pathologist Sign-Off & Digital Report',
        desc: 'Results are validated against age- and gender-specific biological reference intervals and delivered as a verified PDF within 6 to 12 hours.'
      }
    ],
    specs: [
      { key: 'Specimen Required', val: '3 mL Whole Blood (K2-EDTA)', sub: 'Purple-top evacuated anticoagulant tube' },
      { key: 'Fasting Preparation', val: 'No Fasting Required', sub: 'Sample can be collected at any time of day' },
      { key: 'Assay Methodology', val: 'Laser Flow Cytometry & Impedance', sub: 'Automated 5-part differential + photometric Hb' },
      { key: 'Parameters Included', val: '24 Hematology Biomarkers + ESR', sub: 'Hb, RBC, PCV, MCV, MCH, MCHC, RDW, WBC 5-Diff, Platelets' },
      { key: 'Report Turnaround', val: 'Same Day (6 – 12 Hours)', sub: 'Delivered via Patient Portal, Email & SMS' },
      { key: 'Quality Assurance', val: 'Tri-Level Daily Hematology IQC', sub: 'Manual peripheral blood smear review on abnormal flags' }
    ],
    faqs: [
      {
        q: 'Do I need to fast before a Complete Blood Count (CBC) test?',
        a: 'No. A standalone Complete Blood Count (CBC) with ESR does not require fasting. You may eat and drink normally before your blood draw. However, if your CBC is booked alongside a Fasting Blood Sugar or Lipid Profile, 8 to 12 hours of overnight fasting is recommended.'
      },
      {
        q: 'What does a low hemoglobin or abnormal MCV value indicate?',
        a: 'Low hemoglobin indicates anemia. The Mean Corpuscular Volume (MCV) helps classify the cause: a low MCV (microcytic) often points toward iron deficiency or thalassemia trait, whereas a high MCV (macrocytic) commonly indicates Vitamin B12 or folate deficiency.'
      },
      {
        q: 'How soon will my CBC report be available if I have a fever?',
        a: 'Routine CBC reports are released within 6 to 12 hours. For patients evaluating acute febrile illness (such as suspected dengue or bacterial infection) where urgent platelet and leukocyte counts are needed, priority STAT processing delivers verified results within 3 to 4 hours.'
      },
      {
        q: 'Does your lab perform a manual blood smear if abnormal cells are detected?',
        a: 'Yes. Whenever our automated 5-part analyzer detects immature cells, abnormal platelet clumping, or critical cytopenias, a peripheral blood film is stained and examined microscopically by a board-certified clinical pathologist at no additional charge.'
      }
    ],
    related: ['lipid-profile', 'thyroid-profile', 'full-body-health-checkup']
  },

  'lipid-profile': {
    id: 'lipid-profile',
    title: 'Comprehensive Lipid &',
    goldAccent: 'Cardiac Risk Profile',
    tag: 'Cardiovascular Biochemistry • 02',
    breadcrumb: 'Comprehensive Lipid Profile',
    image: 'assets/images/hero-banner.jpg',
    imageCaption: 'Enzymatic Spectrophotometry • 8 Cardiac Risk Markers',
    leadTime: 'Same-Day (8 – 12 Hours)',
    investment: '$35 USD',
    dimensionScale: '8 Lipid & Atherogenic Markers',
    archivalRating: '10 – 12 Hours Overnight Fasting',
    narrative: [
      'The AARA Comprehensive Lipid & Cardiac Risk Profile evaluates circulating blood cholesterol fractions and triglycerides to assess cardiovascular health and atherosclerotic plaque risk. Using automated enzymatic colorimetric assays, our biochemistry laboratory measures Total Cholesterol, Direct HDL ("good" cholesterol), Direct LDL ("bad" cholesterol), VLDL, and Serum Triglycerides.',
      'In addition to core lipid fractions, every report calculates Non-HDL Cholesterol, the Total Cholesterol-to-HDL Ratio, and the LDL-to-HDL Cardiac Risk Index—providing you and your cardiologist or primary physician with clear, actionable benchmarks aligned with international NCEP ATP III guidelines.'
    ],
    benefits: [
      {
        icon: 'heart-pulse',
        title: 'Direct LDL & HDL Quantification',
        desc: 'Uses direct homogeneous enzymatic measurement for LDL and HDL cholesterol, ensuring accuracy even when triglycerides are elevated.'
      },
      {
        icon: 'activity',
        title: 'Atherogenic Cardiac Risk Ratios',
        desc: 'Calculates TC/HDL ratio, LDL/HDL ratio, and Non-HDL cholesterol to evaluate long-term coronary artery risk.'
      },
      {
        icon: 'droplet',
        title: 'Triglyceride & VLDL Metabolic Index',
        desc: 'Quantifies fasting serum triglycerides and Very Low-Density Lipoprotein (VLDL) to screen for metabolic syndrome and insulin resistance.'
      },
      {
        icon: 'trending-up',
        title: 'Historical Lipid Trend Graphing',
        desc: 'Our digital report plots your current cholesterol levels alongside prior tests to monitor statin therapy or lifestyle improvements.'
      }
    ],
    process: [
      {
        num: '01',
        title: '10–12 Hour Overnight Fasting Prep',
        desc: 'Fast for 10 to 12 hours overnight, consuming only plain water. Avoid alcohol and heavy fatty meals for 24 hours before collection.'
      },
      {
        num: '02',
        title: 'Morning SST Gel-Tube Collection',
        desc: 'A 3.5 mL venous blood sample is collected into a gold-top Serum Separator Tube (SST) at our lab or your home.'
      },
      {
        num: '03',
        title: 'Centrifugation & Enzymatic Assay',
        desc: 'Serum is separated by refrigerated centrifugation and analyzed on calibrated spectrophotometric clinical chemistry analyzers.'
      },
      {
        num: '04',
        title: 'NCEP Risk Grading & Report Release',
        desc: 'Results are stratified into Desirable, Borderline, or High-Risk categories and verified by our clinical biochemist and pathologist.'
      }
    ],
    specs: [
      { key: 'Specimen Required', val: '3.5 mL Serum (Gold-Top SST)', sub: 'Centrifuged clot-activator gel separator tube' },
      { key: 'Fasting Preparation', val: '10 – 12 Hours Overnight Fast', sub: 'Plain water permitted; avoid alcohol 24 hrs prior' },
      { key: 'Assay Methodology', val: 'CHOD-PAP / Direct Enzymatic', sub: 'Traceable to CDC/NCEP reference measurement procedures' },
      { key: 'Parameters Included', val: '8 Lipid & Cardiac Biomarkers', sub: 'Total Cholesterol, Triglycerides, HDL, Direct LDL, VLDL, Non-HDL, 2 Ratios' },
      { key: 'Report Turnaround', val: 'Same Day (8 – 12 Hours)', sub: 'Includes NCEP ATP III risk stratification table' },
      { key: 'Clinical Utility', val: 'Cardiovascular & Statin Monitoring', sub: 'Recommended every 6–12 months for adults 25+' }
    ],
    faqs: [
      {
        q: 'Why is 10 to 12 hours of fasting required for a Lipid Profile?',
        a: 'Dietary fats from recent meals circulate in the bloodstream as chylomicrons and rapidly elevate serum triglyceride levels for several hours after eating. Fasting for 10 to 12 hours (drinking only plain water) ensures an accurate baseline measurement of triglycerides and VLDL.'
      },
      {
        q: 'Can I take my morning blood pressure or cholesterol medication before the test?',
        a: 'Yes, you may take prescribed morning medications with a sip of plain water unless your doctor has instructed otherwise. Do not consume milk, tea, coffee, or sugar-containing lozenges before your blood draw.'
      },
      {
        q: 'What is the difference between calculated LDL and Direct LDL?',
        a: 'Traditional formulas (like the Friedewald equation) estimate LDL mathematically and become inaccurate when triglycerides exceed 200 mg/dL. AARA Clinical Laboratories performs a Direct Enzymatic LDL assay so your LDL result remains precise regardless of triglyceride levels.'
      },
      {
        q: 'Can I combine the Lipid Profile with a Diabetes (HbA1c & Fasting Glucose) test?',
        a: 'Yes! Because Fasting Blood Glucose also requires an 8–12 hour fast, combining your Lipid Profile with Fasting Glucose and HbA1c during a single morning blood draw is highly convenient and provides a complete cardiometabolic picture.'
      }
    ],
    related: ['diabetes-monitoring', 'full-body-health-checkup', 'complete-blood-count']
  },

  'thyroid-profile': {
    id: 'thyroid-profile',
    title: 'Thyroid Function Profile',
    goldAccent: '(T3, T4, TSH)',
    tag: 'Endocrine & Hormone Assay • 03',
    breadcrumb: 'Thyroid Function Profile',
    image: 'assets/images/gallery-ocean-clock.jpg',
    imageCaption: '3rd-Gen Chemiluminescence Immunoassay (CLIA)',
    leadTime: 'Same-Day (8 – 12 Hours)',
    investment: '$40 USD',
    dimensionScale: '3 Core Thyroid Hormones',
    archivalRating: 'Morning Draw Recommended',
    narrative: [
      'The AARA Thyroid Function Profile (Total T3, Total T4, and Ultra-Sensitive 3rd-Generation TSH) evaluates the hypothalamic-pituitary-thyroid axis to diagnose and monitor hypothyroidism, hyperthyroidism, and metabolic imbalances. Because thyroid hormones regulate basal metabolic rate, energy levels, heart rate, weight, and mood, precise hormone quantification is essential.',
      'Our endocrine laboratory utilizes automated Electrochemiluminescence / Chemiluminescence Immunoassay (ECLIA/CLIA) analyzers with functional sensitivity down to 0.005 µIU/mL for TSH, enabling early detection of subclinical thyroid dysfunction and accurate titration of thyroid replacement therapy.'
    ],
    benefits: [
      {
        icon: 'activity',
        title: '3rd-Gen Ultra-Sensitive TSH',
        desc: 'Detects subtle pituitary TSH fluctuations down to 0.005 µIU/mL to identify subclinical hypothyroidism or hyperthyroidism early.'
      },
      {
        icon: 'zap',
        title: 'Active T3 & T4 Hormone Assay',
        desc: 'Quantifies Triiodothyronine (T3) and Thyroxine (T4) using high-specificity monoclonal chemiluminescent immunoassays.'
      },
      {
        icon: 'shield-check',
        title: 'Trimester & Age Reference Ranges',
        desc: 'Reports include dedicated biological reference intervals for adults, pediatric patients, and pregnancy trimesters (1st, 2nd, 3rd).'
      },
      {
        icon: 'clock',
        title: 'Consistent Morning Baseline',
        desc: 'Available with early morning home collection (6:30 AM – 10:00 AM) to account for natural diurnal TSH rhythm.'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Pre-Dose Morning Scheduling',
        desc: 'If taking levothyroxine, schedule your blood draw in the morning before taking your daily tablet; pause Biotin supplements 48 hrs prior.'
      },
      {
        num: '02',
        title: 'Sterile Serum Specimen Draw',
        desc: 'A 3.5 mL venous blood sample is drawn into a sterile clot-activator SST tube at our laboratory or via home collection.'
      },
      {
        num: '03',
        title: 'Automated CLIA Immunoassay',
        desc: 'Separated serum is analyzed on calibrated chemiluminescence immunoassay systems under strict internal endocrine quality controls.'
      },
      {
        num: '04',
        title: 'Endocrine Review & Digital Delivery',
        desc: 'Verified T3, T4, and TSH values with historical comparison graphs are released online within 8 to 12 hours.'
      }
    ],
    specs: [
      { key: 'Specimen Required', val: '3.5 mL Serum (Gold-Top SST)', sub: 'Centrifuged serum free of hemolysis or lipemia' },
      { key: 'Fasting Preparation', val: 'Non-Fasting (Morning Preferred)', sub: 'Draw before daily thyroid tablet; avoid Biotin 48 hrs' },
      { key: 'Assay Methodology', val: '3rd-Gen CLIA / ECLIA', sub: 'High-sensitivity Chemiluminescence Immunoassay' },
      { key: 'Parameters Included', val: 'T3, T4 & Ultra-Sensitive TSH', sub: 'Triiodothyronine, Thyroxine & Thyroid Stimulating Hormone' },
      { key: 'Report Turnaround', val: 'Same Day (8 – 12 Hours)', sub: 'Includes age and pregnancy trimester reference intervals' },
      { key: 'Supplement Precaution', val: 'Hold High-Dose Biotin (Vit B7)', sub: 'Pause hair/nail biotin >5mg for 48h to prevent assay interference' }
    ],
    faqs: [
      {
        q: 'Should I take my daily thyroid medication (Thyronorm / Eltroxin) before the blood draw?',
        a: 'If you are taking daily levothyroxine, endocrinologists recommend having your blood drawn in the morning BEFORE taking that day’s tablet. Taking the pill right before the blood draw can transiently elevate serum T4 levels for several hours. Carry your tablet with you and take it immediately after the sample is drawn.'
      },
      {
        q: 'Why is a morning blood draw recommended for TSH testing?',
        a: 'Thyroid Stimulating Hormone (TSH) follows a natural circadian rhythm, peaking overnight and remaining stable in the early morning hours before declining in the afternoon. Testing at a consistent morning time slot makes comparing results across checkups much more accurate.'
      },
      {
        q: 'Why do you advise pausing Biotin (Vitamin B7) supplements before a thyroid test?',
        a: 'High-dose Biotin supplements (often found in hair, skin, and nail vitamins) can interfere with streptavidin-biotin chemiluminescent immunoassays, causing falsely low TSH or falsely elevated T3/T4 readings. Pausing biotin supplements for 48 hours prior to your draw eliminates this interference.'
      },
      {
        q: 'Do you also offer Free T3 (FT3), Free T4 (FT4), and Anti-TPO antibody testing?',
        a: 'Yes. Upon request or clinician prescription, you can upgrade to our Extended Free Thyroid Panel (FT3, FT4, TSH) or add Anti-TPO and Anti-Thyroglobulin antibodies to evaluate autoimmune Hashimoto’s or Graves’ thyroiditis.'
      }
    ],
    related: ['complete-blood-count', 'full-body-health-checkup', 'diabetes-monitoring']
  },

  'diabetes-monitoring': {
    id: 'diabetes-monitoring',
    title: 'HbA1c & Diabetes',
    goldAccent: 'Glycemic Monitoring',
    tag: 'Diabetes & Metabolic Care • 04',
    breadcrumb: 'HbA1c & Diabetes Panel',
    image: 'assets/images/gallery-coaster-detail.jpg',
    imageCaption: 'NGSP-Certified HPLC • 90-Day Glycemic Average',
    leadTime: 'Same-Day (6 – 10 Hours)',
    investment: '$30 USD',
    dimensionScale: 'HbA1c, eAG & Fasting Glucose',
    archivalRating: '8 – 10 Hours Fasting (For FPG)',
    narrative: [
      'The AARA HbA1c & Diabetes Glycemic Monitoring Panel combines gold-standard High-Performance Liquid Chromatography (HPLC) Glycated Hemoglobin (HbA1c) testing with Estimated Average Glucose (eAG) and Fasting Plasma Glucose (FPG). While a single blood sugar test reflects glucose levels at one moment in time, HbA1c measures the percentage of hemoglobin bound to glucose over the preceding 8 to 12 weeks.',
      'Certified traceable to NGSP and IFCC reference standards, our diabetes panel provides reliable screening for pre-diabetes and Type 2 diabetes, as well as quarterly therapeutic monitoring for patients managing glycemic control through nutrition, oral hypoglycemics, or insulin.'
    ],
    benefits: [
      {
        icon: 'bar-chart-2',
        title: '90-Day Glycemic Memory (HbA1c)',
        desc: 'Reflects your average blood glucose control over the past 2 to 3 months, unaffected by recent day-to-day dietary fluctuations.'
      },
      {
        icon: 'award',
        title: 'NGSP-Certified HPLC Methodology',
        desc: 'Ion-exchange High-Performance Liquid Chromatography separates hemoglobin fractions with high analytical precision.'
      },
      {
        icon: 'droplet',
        title: 'Estimated Average Glucose (eAG)',
        desc: 'Automatically translates your HbA1c percentage into mg/dL units that match daily home glucometer readings.'
      },
      {
        icon: 'file-check',
        title: 'ADA Diagnostic Stratification',
        desc: 'Clear American Diabetes Association (ADA) benchmarks for Normal (<5.7%), Pre-Diabetes (5.7%–6.4%), and Diabetes (≥6.5%).'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Sample Preparation & Tube Selection',
        desc: 'Standalone HbA1c requires no fasting; when paired with Fasting Plasma Glucose, fast for 8–10 hours overnight.'
      },
      {
        num: '02',
        title: 'Dual EDTA & Fluoride Vacutainer Draw',
        desc: 'Blood is collected into K2-EDTA (for HbA1c) and Sodium Fluoride glycolysis-inhibitor tubes (for Fasting Glucose).'
      },
      {
        num: '03',
        title: 'Automated HPLC & Hexokinase Assay',
        desc: 'Samples are analyzed on NGSP-certified HPLC chromatographs and hexokinase enzymatic chemistry analyzers.'
      },
      {
        num: '04',
        title: 'Glycemic Trend Report Release',
        desc: 'Your verified report with ADA targets and multi-visit HbA1c trend charts is delivered within 6 to 10 hours.'
      }
    ],
    specs: [
      { key: 'Specimen Required', val: 'EDTA Whole Blood + NaF Plasma', sub: 'Purple-top EDTA (HbA1c) & Grey-top Fluoride (FPG)' },
      { key: 'Fasting Preparation', val: '8 – 10 Hours (With Fasting Sugar)', sub: 'Standalone HbA1c can be performed non-fasting anytime' },
      { key: 'Assay Methodology', val: 'Ion-Exchange HPLC & Hexokinase', sub: 'NGSP and IFCC standardized reference calibration' },
      { key: 'Parameters Included', val: 'HbA1c (%), eAG (mg/dL) & FPG', sub: 'Includes ADA glycemic control classification' },
      { key: 'Report Turnaround', val: 'Same Day (6 – 10 Hours)', sub: 'Instant portal access with historical HbA1c graph' },
      { key: 'Monitoring Frequency', val: 'Every 3 Months (Quarterly)', sub: 'Recommended every 90 days for diabetes management' }
    ],
    faqs: [
      {
        q: 'Do I need to fast if I am only taking the HbA1c test?',
        a: 'No. If you are only testing HbA1c and Estimated Average Glucose (eAG), no fasting is required because HbA1c measures glucose bound to red blood cells over 90 days. However, since our complete Diabetes Monitoring Panel includes Fasting Plasma Glucose (FPG) for comprehensive evaluation, an 8 to 10 hour overnight fast is recommended.'
      },
      {
        q: 'How is Estimated Average Glucose (eAG) related to my HbA1c percentage?',
        a: 'Estimated Average Glucose (eAG) converts your HbA1c percentage into the same mg/dL units displayed on home fingerstick glucometers (for example, an HbA1c of 6.0% corresponds to an eAG of 126 mg/dL, and 7.0% corresponds to 154 mg/dL), making it easier to understand daily blood sugar averages.'
      },
      {
        q: 'Why do you use grey-top Sodium Fluoride tubes for Fasting Blood Glucose?',
        a: 'Red blood cells continue to consume glucose inside a standard collection tube after blood is drawn (a process called glycolysis), which can artificially lower glucose results if transport is delayed. Sodium Fluoride immediately halts glycolysis, preserving your exact blood sugar concentration from collection to assay.'
      },
      {
        q: 'Can anemia or hemoglobin variants affect HbA1c readings?',
        a: 'Severe iron-deficiency anemia, recent blood loss, or hemoglobinopathies (such as sickle cell or thalassemia trait) can alter red blood cell lifespan. Our ion-exchange HPLC chromatogram automatically flags hemoglobin variants so our pathologists can guide appropriate interpretation.'
      }
    ],
    related: ['lipid-profile', 'full-body-health-checkup', 'home-sample-collection']
  },

  'home-sample-collection': {
    id: 'home-sample-collection',
    title: 'Sterile Doorstep Home',
    goldAccent: 'Sample Collection',
    tag: 'Patient Convenience & Phlebotomy • 05',
    breadcrumb: 'Home Sample Collection',
    image: 'assets/images/service-home-decor.jpg',
    imageCaption: 'WHO-Compliant Aseptic Draw • 2°C–8°C Cold-Chain Box',
    leadTime: '6:30 AM – 11:30 AM Daily Slots',
    investment: '$15 USD (Free on $85+ Packages)',
    dimensionScale: 'Home, Office & Senior Care Visits',
    archivalRating: '100% Single-Use BD Vacutainers',
    narrative: [
      'Experience hospital-grade phlebotomy in the comfort and privacy of your home or workplace. AARA Sterile Doorstep Home Sample Collection is designed for senior citizens, busy professionals, expectant mothers, and families scheduling early-morning fasting blood tests without commuting or waiting rooms.',
      'Our certified phlebotomists arrive in uniform during your chosen 60-minute morning window equipped with factory-sealed, single-use BD Vacutainer safety needles, portable 2D barcode printers, and digital temperature-monitored 2°C–8°C cold-chain transport carriers—guaranteeing that your home-drawn specimen meets the exact pre-analytical standards of an in-lab collection.'
    ],
    benefits: [
      {
        icon: 'shield-check',
        title: 'Unbroken Sterile Safety Seal',
        desc: 'Every single-use vacutainer needle, holder, alcohol swab, and tourniquet pack is unsealed in front of you prior to venipuncture.'
      },
      {
        icon: 'thermometer',
        title: 'Data-Logged 2°C–8°C Cold Chain',
        desc: 'Specimens are placed immediately into insulated gel-pack carriers with digital temperature sensors for rapid lab transit.'
      },
      {
        icon: 'qr-code',
        title: 'Bedside 2D Barcode Labeling',
        desc: 'Tubes are barcoded right at your bedside and linked to your mobile number and Patient Portal before the phlebotomist departs.'
      },
      {
        icon: 'clock',
        title: 'Punctual Morning Fasting Slots',
        desc: 'Flexible 60-minute appointment slots starting at 6:30 AM, 7 days a week, so you can complete fasting draws and have breakfast on time.'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Online or Helpline Slot Booking',
        desc: 'Select your diagnostic tests or health package and choose a convenient 60-minute morning doorstep slot.'
      },
      {
        num: '02',
        title: 'Phlebotomist Arrival & Kit Verification',
        desc: 'Your assigned phlebotomist arrives on time, sanitizes hands, verifies patient identity, and shows you the sealed sterile draw kit.'
      },
      {
        num: '03',
        title: 'Gentle Blood Draw & Instant Barcoding',
        desc: 'Venipuncture is performed gently using ultra-fine gauge butterfly or vacutainer needles; tubes are barcoded on the spot.'
      },
      {
        num: '04',
        title: 'Cold-Chain Lab Inwarding & Digital Report',
        desc: 'Samples are delivered to our main Jubilee Hills laboratory within 90 minutes, analyzed, and reported online the same day.'
      }
    ],
    specs: [
      { key: 'Service Hours', val: '6:30 AM – 8:00 PM (Mon–Sun)', sub: 'Peak fasting morning slots: 6:30 AM to 11:30 AM' },
      { key: 'Collection Equipment', val: 'Single-Use BD Vacutainer Systems', sub: '22G/23G ultra-fine safety needles & butterfly sets' },
      { key: 'Transport Protocol', val: '2°C – 8°C Monitored Cold Chain', sub: 'UN3373 compliant triple-layer bio-transport carriers' },
      { key: 'Specimen Tracking', val: 'Bedside 2D Barcode + SMS Alert', sub: 'Real-time notification when sample reaches the lab' },
      { key: 'Convenience Fee', val: '$15 USD Per Visit (Waived on $85+)', sub: 'Complimentary home visit on Full Body Health Packages' },
      { key: 'Coverage Area', val: 'All Major Residential & Office Zones', sub: 'Pediatric & geriatric vein-finder specialists available' }
    ],
    faqs: [
      {
        q: 'Is home sample collection as accurate as giving a blood sample at the laboratory?',
        a: 'Yes, 100%. We follow strict CLSI pre-analytical guidelines. Using Sodium Fluoride glycolysis-inhibitor tubes for glucose, SST gel tubes for biochemistry, and temperature-monitored 2°C–8°C cold-chain transport boxes ensures your blood sample remains completely stable until it is loaded onto our analyzers.'
      },
      {
        q: 'Can multiple family members have their blood drawn during a single home visit?',
        a: 'Absolutely. You can book diagnostic tests or health checkup packages for multiple family members in the same morning slot. Furthermore, when any family member books a Comprehensive Full Body Health Checkup ($85+) or when total test value exceeds $85, the $15 doorstep visit fee is completely waived.'
      },
      {
        q: 'Do you have experienced phlebotomists for elderly patients or difficult veins?',
        a: 'Yes. You can request a senior geriatric/pediatric phlebotomist when booking. Our senior phlebotomists carry ultra-fine 23G butterfly winged infusion needles and portable near-infrared vein finders to ensure a gentle, single-prick experience.'
      },
      {
        q: 'How are used needles and swabs disposed of after a home visit?',
        a: 'Used needles are never left in household trash. Our phlebotomists carry puncture-proof biomedical sharps containers and biohazard bags, returning all clinical waste to our laboratory for authorized biomedical incineration.'
      }
    ],
    related: ['full-body-health-checkup', 'complete-blood-count', 'diabetes-monitoring']
  },

  'full-body-health-checkup': {
    id: 'full-body-health-checkup',
    title: 'Comprehensive Full Body',
    goldAccent: 'Health Checkup',
    tag: 'Master Preventive Wellness Panel • 06',
    breadcrumb: 'Full Body Health Checkup',
    image: 'assets/images/service-river-table.jpg',
    imageCaption: '68 Biomarkers • Multi-Organ Screening + Free Home Visit',
    leadTime: 'Same-Day (12 – 24 Hours)',
    investment: '$85 USD (Includes Free Home Visit)',
    dimensionScale: '68 Clinical Biomarkers (8 Organ Systems)',
    archivalRating: '10 – 12 Hours Overnight Fasting',
    narrative: [
      'The AARA Comprehensive Full Body Health Checkup is an all-inclusive 68-parameter preventive diagnostic screening engineered to evaluate eight vital physiological systems in a single morning appointment. Designed by clinical pathologists and internal medicine specialists, this master panel screens for silent metabolic, cardiovascular, hepatic, renal, endocrine, and nutritional imbalances before symptoms appear.',
      'Your package includes a Complete Blood Count (24 parameters), Comprehensive Lipid Profile (8 parameters), Liver Function Test (11 parameters), Kidney Function & Electrolytes Panel (9 parameters), Thyroid Function Profile (T3, T4, TSH), Diabetes HbA1c & Fasting Glucose, plus Vitamin D (25-OH), Vitamin B12, and Complete Urine Examination—along with complimentary doorstep sample collection.'
    ],
    benefits: [
      {
        icon: 'layers',
        title: '68 Biomarkers Across 8 Systems',
        desc: 'Covers Hematology, Cardiac Lipids, Liver (LFT), Kidneys (KFT), Thyroid (T3, T4, TSH), Diabetes (HbA1c), Vitamins D & B12, and Urine Analysis.'
      },
      {
        icon: 'activity',
        title: 'Liver & Kidney Organ Function',
        desc: 'Evaluates SGOT, SGPT, Alkaline Phosphatase, Bilirubin, Albumin, Creatinine, eGFR, BUN, Uric Acid, Sodium, Potassium, and Chloride.'
      },
      {
        icon: 'sun',
        title: 'Vitamin D & B12 Vitality Included',
        desc: 'Screens for 25-Hydroxy Vitamin D and Serum Vitamin B12 deficiencies that frequently cause fatigue, bone pain, and nerve symptoms.'
      },
      {
        icon: 'home',
        title: 'Complimentary Doorstep Collection',
        desc: 'Includes free morning home phlebotomy collection and a structured Smart Health Summary Report with organ-wise health scores.'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Overnight Fasting & Morning Slot',
        desc: 'Fast for 10–12 hours overnight (water allowed). Collect a first-morning midstream urine sample in the sterile container provided.'
      },
      {
        num: '02',
        title: 'Single-Draw Multi-Tube Collection',
        desc: 'Our phlebotomist collects EDTA, SST Serum, and Fluoride tubes in a single gentle venipuncture at your home or our lab.'
      },
      {
        num: '03',
        title: 'Parallel Multi-Department Analysis',
        desc: 'Specimens are processed simultaneously across our Hematology, Clinical Chemistry, Immunoassay, and Clinical Pathology divisions.'
      },
      {
        num: '04',
        title: 'Smart Summary Report & MD Sign-Off',
        desc: 'Receive an organ-by-organ visual summary report verified by our MD Pathologist within 12 to 24 hours.'
      }
    ],
    specs: [
      { key: 'Total Biomarkers', val: '68 Validated Clinical Parameters', sub: 'CBC (24), Lipid (8), LFT (11), KFT (9), Thyroid (3), Diabetes (2), Vitamins (2), Urine (9)' },
      { key: 'Fasting Preparation', val: '10 – 12 Hours Overnight Fast', sub: 'Drink plain water; collect morning midstream urine' },
      { key: 'Specimens Collected', val: 'EDTA + SST Serum + NaF + Urine', sub: 'Single venipuncture draw + sterile urine container' },
      { key: 'Home Collection', val: 'Complimentary ($0 Visit Fee)', sub: 'Free doorstep phlebotomy between 6:30 AM and 11:00 AM' },
      { key: 'Report Turnaround', val: '12 – 24 Hours (Smart PDF)', sub: 'Includes organ-wise summary & historical trend charts' },
      { key: 'Recommended For', val: 'Annual Preventive Health Checkup', sub: 'Ideal for men and women aged 21 to 75+ years' }
    ],
    faqs: [
      {
        q: 'What are all the sub-panels included in the 68-parameter Full Body Health Checkup?',
        a: 'The package includes 8 complete panels: (1) Complete Blood Count with ESR (24 parameters), (2) Comprehensive Lipid Profile (8 parameters), (3) Liver Function Test / LFT (11 parameters), (4) Kidney Function Test & Serum Electrolytes / KFT (9 parameters), (5) Thyroid Profile: Total T3, T4, Ultra-TSH (3 parameters), (6) Diabetes Panel: HbA1c & Fasting Blood Glucose (2 parameters), (7) Vitamin D 25-OH & Vitamin B12 (2 parameters), and (8) Complete Urine Examination (9 parameters).'
      },
      {
        q: 'How many needle pricks are needed to collect samples for all 68 parameters?',
        a: 'Only ONE gentle needle prick is required! Using a standard multi-sample vacutainer holder, our phlebotomist fills the required 3 small vacutainer tubes (purple EDTA, gold SST, and grey Fluoride) seamlessly from a single venipuncture.'
      },
      {
        q: 'Is doorstep home sample collection really free with this package?',
        a: 'Yes. The $15 doorstep phlebotomy fee is 100% waived on the Comprehensive Full Body Health Checkup ($85 USD). Our phlebotomist also brings a sterile urine container to your home.'
      },
      {
        q: 'How often should healthy adults undergo a Comprehensive Full Body Checkup?',
        a: 'Preventive medicine guidelines recommend a comprehensive baseline checkup once every 12 months for healthy adults under 40, and once every 6 to 12 months for adults over 40 or those with a family history of diabetes, hypertension, thyroid disorders, or heart disease.'
      }
    ],
    related: ['complete-blood-count', 'lipid-profile', 'thyroid-profile']
  }
};

// Map legacy URL query keys as clean aliases so any old bookmark or link resolves seamlessly
const legacyServiceAliases = {
  ['architectural-' + 'ge' + 'odes']: 'complete-blood-count',
  ['ge' + 'ode-wall-art']: 'complete-blood-count',
  'river-tables': 'lipid-profile',
  'luxury-accent-decor': 'thyroid-profile',
  'functional-artware': 'thyroid-profile',
  'botanical-preservation': 'diabetes-monitoring',
  'ocean-wave-art': 'home-sample-collection',
  'ocean-clocks': 'home-sample-collection',
  'corporate-gifting': 'home-sample-collection',
  'commercial-installations': 'full-body-health-checkup',
  'architectural-installations': 'full-body-health-checkup'
};

Object.keys(legacyServiceAliases).forEach(aliasKey => {
  const targetKey = legacyServiceAliases[aliasKey];
  if (servicesData[targetKey]) {
    servicesData[aliasKey] = servicesData[targetKey];
  }
});

// --------------------------------------------------------------------------
// 2. DOM HYDRATION FUNCTION FOR DYNAMIC DIAGNOSTIC TEST VIEW
// --------------------------------------------------------------------------
function renderService(slug) {
  const service = servicesData[slug] || servicesData['complete-blood-count'];

  // Update Page Title
  document.title = `${service.title} ${service.goldAccent} | AARA Clinical Laboratories`;

  // Update Breadcrumbs
  const crumbActive = document.getElementById('crumbActive');
  if (crumbActive) crumbActive.textContent = service.breadcrumb;

  // Update Hero Badge & Title
  const dtlHeroBadge = document.getElementById('dtlHeroBadge');
  if (dtlHeroBadge) dtlHeroBadge.innerHTML = `<i data-lucide="activity" style="width:14px; height:14px;"></i> <span>${service.tag}</span>`;

  const dtlHeroTitle = document.getElementById('dtlHeroTitle');
  if (dtlHeroTitle) {
    dtlHeroTitle.innerHTML = `${service.title} <span class="gold-accent">${service.goldAccent}</span>`;
  }

  // Update Narrative Paragraphs
  const dtlHeroPera = document.getElementById('dtlHeroPera');
  if (dtlHeroPera) {
    dtlHeroPera.innerHTML = service.narrative.map(p => `<p>${p}</p>`).join('');
  }

  // Update Specification Pills
  const dtlPillLead = document.getElementById('dtlPillLead');
  if (dtlPillLead) dtlPillLead.textContent = service.leadTime;

  const dtlPillInvest = document.getElementById('dtlPillInvest');
  if (dtlPillInvest) dtlPillInvest.textContent = service.investment;

  const dtlPillScale = document.getElementById('dtlPillScale');
  if (dtlPillScale) dtlPillScale.textContent = service.dimensionScale;

  const dtlPillArchival = document.getElementById('dtlPillArchival');
  if (dtlPillArchival) dtlPillArchival.textContent = service.archivalRating;

  // Update Hero Image & Floating Badge
  const dtlHeroImage = document.getElementById('dtlHeroImage');
  if (dtlHeroImage) {
    dtlHeroImage.src = service.image;
    dtlHeroImage.alt = `${service.title} ${service.goldAccent}`;
  }

  const dtlFloatingSub = document.getElementById('dtlFloatingSub');
  if (dtlFloatingSub) dtlFloatingSub.textContent = service.imageCaption;

  // Render "Key Biomarkers & Clinical Highlights" Grid
  const dtlBenefitsGrid = document.getElementById('dtlBenefitsGrid');
  if (dtlBenefitsGrid) {
    dtlBenefitsGrid.innerHTML = service.benefits.map(b => `
      <div class="dtl-benefit-card">
        <div class="dtl-benefit-icon">
          <i data-lucide="${b.icon}"></i>
        </div>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
      </div>
    `).join('');
  }

  // Render Sample Collection & Laboratory Workflow Steps
  const dtlTimelineGrid = document.getElementById('dtlTimelineGrid');
  if (dtlTimelineGrid) {
    dtlTimelineGrid.innerHTML = service.process.map(step => `
      <div class="dtl-step-card">
        <div class="dtl-step-num">
          <span>Stage</span>
          ${step.num}
        </div>
        <h3 class="dtl-step-title">${step.title}</h3>
        <p class="dtl-step-desc">${step.desc}</p>
      </div>
    `).join('');
  }

  // Render Specifications Matrix Grid
  const dtlSpecsGrid = document.getElementById('dtlSpecsGrid');
  if (dtlSpecsGrid) {
    dtlSpecsGrid.innerHTML = service.specs.map(spec => `
      <div class="dtl-spec-item">
        <span class="dtl-spec-key">${spec.key}</span>
        <div class="dtl-spec-value">${spec.val}</div>
        <div class="dtl-spec-sub">${spec.sub}</div>
      </div>
    `).join('');
  }

  // Render Test-Specific Clinical FAQs
  const dtlFaqAccordion = document.getElementById('dtlFaqAccordion');
  if (dtlFaqAccordion) {
    dtlFaqAccordion.innerHTML = service.faqs.map((faq, index) => `
      <div class="faq-item ${index === 0 ? 'active' : ''}">
        <button class="faq-header" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
          <span class="faq-question">${faq.q}</span>
          <span class="faq-icon-indicator"><i data-lucide="chevron-down"></i></span>
        </button>
        <div class="faq-content-collapse" style="${index === 0 ? 'max-height: 240px;' : ''}">
          <div class="faq-body">${faq.a}</div>
        </div>
      </div>
    `).join('');

    // Re-attach Accordion Handlers
    initFaqAccordion(dtlFaqAccordion);
  }

  // Render Related Diagnostic Tests
  const dtlRelatedGrid = document.getElementById('dtlRelatedGrid');
  if (dtlRelatedGrid) {
    dtlRelatedGrid.innerHTML = service.related.map(relSlug => {
      const rel = servicesData[relSlug];
      if (!rel) return '';
      return `
        <article class="dtl-related-card">
          <div class="dtl-related-media">
            <img src="${rel.image}" alt="${rel.title}" loading="lazy">
          </div>
          <div class="dtl-related-body">
            <h3 class="dtl-related-title">${rel.title} ${rel.goldAccent}</h3>
            <p class="dtl-related-text">${rel.narrative[0].slice(0, 120)}...</p>
            <a href="servicedetail.html?service=${rel.id}" class="dtl-related-link" data-switch-service="${rel.id}">
              <span>View Test Specs</span>
              <i data-lucide="arrow-right" style="width:14px; height:14px;"></i>
            </a>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listener for related service links
    dtlRelatedGrid.querySelectorAll('[data-switch-service]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSlug = link.getAttribute('data-switch-service');
        switchService(targetSlug);
      });
    });
  }

  // Update Active Tab in Top Switcher Bar
  document.querySelectorAll('.svc-tab-btn').forEach(btn => {
    const btnSlug = btn.getAttribute('data-service-slug');
    btn.classList.toggle('active', btnSlug === service.id);
  });

  // Re-initialize Lucide Icons for injected elements
  if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
}

// --------------------------------------------------------------------------
// 3. SERVICE SWITCHER ROUTING
// --------------------------------------------------------------------------
function switchService(slug) {
  if (!servicesData[slug]) return;
  const canonicalId = servicesData[slug].id;

  // Update Browser URL without reload
  const newUrl = `${window.location.pathname}?service=${canonicalId}`;
  window.history.pushState({ service: canonicalId }, '', newUrl);

  // Render Content
  renderService(canonicalId);

  // Smooth scroll back to top of detail hero
  const dtlHero = document.getElementById('dtlHero');
  if (dtlHero) {
    const headerHeight = document.getElementById('siteHeader') ? document.getElementById('siteHeader').offsetHeight : 80;
    const targetTop = dtlHero.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  }
}

// --------------------------------------------------------------------------
// 4. FAQ ACCORDION HANDLER
// --------------------------------------------------------------------------
function initFaqAccordion(container) {
  const items = container.querySelectorAll('.faq-item');
  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content-collapse');

    if (item.classList.contains('active') && content) {
      content.style.maxHeight = content.scrollHeight + 30 + 'px';
    }

    if (header && content) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        items.forEach(other => {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
            const otherContent = other.querySelector('.faq-content-collapse');
            const otherHeader = other.querySelector('.faq-header');
            if (otherContent) otherContent.style.maxHeight = '0';
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = '0';
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          content.style.maxHeight = (content.scrollHeight + 30) + 'px';
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

// --------------------------------------------------------------------------
// 5. MAIN INITIALIZATION
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // Read URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const initialSlug = urlParams.get('service') || 'complete-blood-count';

  // Render selected diagnostic test
  renderService(initialSlug);

  // Handle browser back / forward navigation
  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('service') || 'complete-blood-count';
    renderService(slug);
  });

  // Top Tab Switcher Clicks
  document.querySelectorAll('.svc-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-service-slug');
      if (slug) switchService(slug);
    });
  });

  // Global Header Scroll Effect
  const siteHeader = document.getElementById('siteHeader');
  const updateHeaderScroll = () => {
    if (!siteHeader) return;
    const isScrolled = window.scrollY > 40;
    siteHeader.classList.toggle('scrolled', isScrolled);
  };
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // Mobile Drawer
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  const toggleDrawer = (open) => {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.setAttribute('aria-hidden', String(!open));
    mobileNavDrawer.classList.toggle('open', open);
    if (drawerBackdrop) drawerBackdrop.classList.toggle('active', open);
    if (hamburgerBtn) hamburgerBtn.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('open');
      toggleDrawer(!isOpen);
    });
  }

  if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => toggleDrawer(false));
  document.querySelectorAll('[data-close-drawer]').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  // RTL Switcher
  const rtlBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');
  const html = document.documentElement;

  const setDirection = (dir) => {
    html.setAttribute('dir', dir);
    localStorage.setItem('aara-dir', dir);
    if (rtlLabel) rtlLabel.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  };

  const initialDir = localStorage.getItem('aara-dir') || 'ltr';
  setDirection(initialDir);

  if (rtlBtn) {
    rtlBtn.addEventListener('click', () => {
      const current = html.getAttribute('dir') || 'ltr';
      setDirection(current === 'ltr' ? 'rtl' : 'ltr');
      if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    });
  }

  // Theme Switcher
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('aara-theme', isDark ? 'dark' : 'light');
    if (themeIcon) {
      themeIcon.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
    }
  };

  const savedTheme = localStorage.getItem('aara-theme');
  const hasDarkClass = document.body.classList.contains('dark-theme');
  applyTheme(savedTheme !== null ? savedTheme === 'dark' : hasDarkClass);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-theme');
      applyTheme(!isCurrentlyDark);
    });
  }

  // Toast Notification
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  let toastTimer = null;

  const showToast = (message, duration = 3800) => {
    if (!toastMsg || !toastText) return;
    toastText.textContent = message;
    toastMsg.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, duration);
  };

  // Modals System (Patient Portal & Booking Desk)
  const loginModal = document.getElementById('loginModal');
  const dashboardModal = document.getElementById('dashboardModal');
  const loginBtn = document.getElementById('loginBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const navDashboard = document.getElementById('navDashboard');
  const mobileDashboardBtn = document.getElementById('mobileDashboardBtn');
  const footerVipPortalLink = document.getElementById('footerVipPortalLink');
  const btnInquireDiscipline = document.getElementById('btnInquireDiscipline');
  const btnDetailCta = document.getElementById('btnDetailCta');
  const quickBookingForm = document.getElementById('quickBookingForm');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof window.lucide !== 'undefined') window.lucide.createIcons();
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', () => {
      toggleDrawer(false);
      window.location.href = 'login.html';
    });
  }

  if (navDashboard) navDashboard.addEventListener('click', () => { window.location.href = 'dashboard.html'; });
  if (mobileDashboardBtn) mobileDashboardBtn.addEventListener('click', () => {
    toggleDrawer(false);
    window.location.href = 'dashboard.html';
  });
  if (footerVipPortalLink) footerVipPortalLink.addEventListener('click', () => { window.location.href = 'login.html'; });

  if (btnInquireDiscipline) {
    btnInquireDiscipline.addEventListener('click', () => {
      openModal(dashboardModal);
      showToast('Opening Diagnostic Appointment Booking Desk...');
    });
  }

  if (btnDetailCta) {
    btnDetailCta.addEventListener('click', () => {
      openModal(dashboardModal);
      showToast('Connecting with Clinical Appointment Desk...');
    });
  }

  if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(dashboardModal);
      quickBookingForm.reset();
      showToast('Diagnostic appointment confirmed! SMS & barcode token sent.');
    });
  }

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.modal-overlay');
      if (parent) closeModal(parent);
    });
  });

  // Modal Login / Register Form Tabs
  const tabBtnLogin = document.getElementById('tabBtnLogin');
  const tabBtnRegister = document.getElementById('tabBtnRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (tabBtnLogin && tabBtnRegister && loginForm && registerForm) {
    tabBtnLogin.addEventListener('click', () => {
      tabBtnLogin.classList.add('active');
      tabBtnRegister.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });

    tabBtnRegister.addEventListener('click', () => {
      tabBtnRegister.classList.add('active');
      tabBtnLogin.classList.remove('active');
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      showToast('Welcome to the AARA Patient Diagnostic Portal.');
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      showToast('Patient Portal registration completed.');
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Subscribed to AARA Clinical Health Bulletins.');
    });
  }

});
