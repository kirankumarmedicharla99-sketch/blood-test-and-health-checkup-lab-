/**
 * AARA CLINICAL LABORATORIES (AARA DIAGNOSTICS & LAB) — DYNAMIC HEALTH GUIDE DETAIL LOGIC (journaldetail.js)
 * High-performance dynamic clinical editorial engine rendering 6 in-depth patient health guides,
 * biomarker reference tables, interactive guide switcher, FAQs, and 100% Home 1 parity.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. CLINICAL REPOSITORY: 6 IN-DEPTH PATIENT HEALTH GUIDES
  // =========================================================================
  const articlesData = {
    'cbc-results-guide': {
      title: 'Understanding Your Complete Blood Count (CBC) Results: RBC, WBC, Hemoglobin & Platelets',
      category: 'Hematology & Blood Panels',
      author: 'Dr. Alisha Khan, MD',
      authorRole: 'Chief of Hematology & Clinical Pathology',
      authorImg: 'assets/images/team-elena-vance.jpg',
      date: 'October 14, 2026',
      readTime: '6 Min Read',
      heroImg: 'assets/images/h2-fluid-art.jpg',
      caption: 'Figure 1.0: Automated 5-part differential hematology analyzer processing barcoded EDTA whole-blood specimens at AARA Clinical Laboratories.',
      abstract: 'Learn how to read all 24 parameters of a Complete Blood Count report—including red blood cell indices (MCV, MCH), 5-part differential leukocyte counts, hemoglobin thresholds for anemia, and platelet reference ranges.',
      metaDesc: 'Complete patient guide to understanding your Complete Blood Count (CBC) blood test results, hemoglobin, RBC indices, WBC differential, and platelets.',
      toc: [
        { id: 'erythrocyte-series', label: '1. Red Blood Cells (RBC) & Hemoglobin' },
        { id: 'rbc-indices', label: '2. Decoding MCV, MCH, MCHC & RDW' },
        { id: 'leukocyte-differential', label: '3. White Blood Cells & 5-Part Differential' },
        { id: 'biomarker-matrix', label: '4. Adult CBC Reference Range Matrix' },
        { id: 'platelets-esr', label: '5. Platelets (Thrombocytes) & ESR Context' }
      ],
      bodyHtml: `
        <h2 class="art-prose-h2" id="erythrocyte-series">1. Red Blood Cells (RBC) &amp; Hemoglobin</h2>
        <p class="art-prose-p">
          The Complete Blood Count (CBC) is the foundational diagnostic blood panel ordered in preventive medicine and acute clinical care. Drawn into a lavender-top K2-EDTA vacutainer tube to preserve cellular morphology, a modern 24-parameter CBC evaluates the three primary cellular lineages circulating in your bloodstream: erythrocytes (red blood cells), leukocytes (white blood cells), and thrombocytes (platelets).
        </p>
        <p class="art-prose-p">
          <strong>Hemoglobin (Hb)</strong> is the iron-containing metalloprotein inside red blood cells responsible for transporting oxygen from your lungs to peripheral tissues. Lower-than-normal hemoglobin and Packed Cell Volume (PCV / Hematocrit) indicate anemia, whereas elevated values (polycythemia) may reflect chronic dehydration, high-altitude adaptation, or bone marrow overproduction.
        </p>

        <h2 class="art-prose-h2" id="rbc-indices">2. Decoding MCV, MCH, MCHC &amp; RDW</h2>
        <p class="art-prose-p">
          Beyond the raw RBC count, automated hematology analyzers calculate red cell indices that pinpoint the underlying cause of anemia long before symptoms become severe:
        </p>
        <p class="art-prose-p">
          <strong>Mean Corpuscular Volume (MCV)</strong> measures the average size of your red blood cells in femtoliters (fL). A low MCV (&lt; 80 fL, microcytic) commonly points toward iron deficiency or thalassemia trait, whereas an elevated MCV (&gt; 100 fL, macrocytic) suggests Vitamin B12 or folate deficiency. <strong>Red Cell Distribution Width (RDW-CV)</strong> quantifies variation in cell size (anisocytosis) and is often the earliest laboratory marker to rise during developing nutritional deficiencies.
        </p>

        <div class="art-pullquote">
          <p class="art-pullquote-text">
            "An isolated hemoglobin value tells you whether anemia is present; the red cell indices—MCV, MCH, and RDW—reveal the cellular story of why it developed."
          </p>
          <span class="art-pullquote-cite">— Dr. Alisha Khan, MD, Chief of Hematology &amp; Clinical Pathology</span>
        </div>

        <h2 class="art-prose-h2" id="leukocyte-differential">3. White Blood Cells &amp; 5-Part Differential</h2>
        <p class="art-prose-p">
          Your Total Leukocyte Count (TLC / WBC) reflects immune system activity. At AARA Clinical Laboratories, laser flow cytometry classifies white blood cells into five distinct subpopulations:
        </p>
        <div class="art-step-list">
          <div class="art-step-item">
            <div class="art-step-num">1</div>
            <div class="art-step-content">
              <h4>Neutrophils (40% – 70%)</h4>
              <p>First-responder phagocytes that increase rapidly during acute bacterial infections, tissue inflammation, or physiological stress.</p>
            </div>
          </div>
          <div class="art-step-item">
            <div class="art-step-num">2</div>
            <div class="art-step-content">
              <h4>Lymphocytes (20% – 40%)</h4>
              <p>T-cells, B-cells, and NK cells that coordinate viral immunity and antibody production; often elevated during viral illnesses.</p>
            </div>
          </div>
          <div class="art-step-item">
            <div class="art-step-num">3</div>
            <div class="art-step-content">
              <h4>Eosinophils (1% – 6%), Monocytes (2% – 10%) &amp; Basophils (&lt; 2%)</h4>
              <p>Specialized immune cells involved in allergic responses, parasitic defense (eosinophils), and chronic tissue repair (monocytes).</p>
            </div>
          </div>
        </div>

        <div class="art-callout-box">
          <div class="art-callout-header">
            <i data-lucide="microscope"></i>
            <span>Clinical Pathology Note: Manual Peripheral Smear Review</span>
          </div>
          <div class="art-callout-body">
            Whenever an automated CBC analyzer flags an abnormal cell population, immature granulocytes, or platelet clumping, AARA’s protocol mandates a manual Giemsa-stained peripheral blood smear examination by a board-certified hematopathologist at no additional cost.
          </div>
        </div>

        <h2 class="art-prose-h2" id="biomarker-matrix">4. Adult CBC Reference Range Matrix</h2>
        <p class="art-prose-p">
          The table below summarizes standard adult biological reference intervals used at AARA Clinical Laboratories (values may vary slightly by age and pregnancy status):
        </p>

        <div class="art-specs-table-wrapper">
          <table class="art-specs-table">
            <thead>
              <tr>
                <th>Biomarker Parameter</th>
                <th>Adult Male Range</th>
                <th>Adult Female Range</th>
                <th>Primary Clinical Significance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Hemoglobin (Hb)</strong></td>
                <td>13.5 – 17.5 g/dL</td>
                <td>12.0 – 15.5 g/dL</td>
                <td>Oxygen-carrying capacity; screening for anemia</td>
              </tr>
              <tr>
                <td><strong>Total RBC Count</strong></td>
                <td>4.5 – 5.9 million/µL</td>
                <td>4.0 – 5.2 million/µL</td>
                <td>Erythrocyte mass and bone marrow production</td>
              </tr>
              <tr>
                <td><strong>Hematocrit (PCV)</strong></td>
                <td>41% – 50%</td>
                <td>36% – 44%</td>
                <td>Percentage of whole blood volume occupied by RBCs</td>
              </tr>
              <tr>
                <td><strong>MCV (Cell Size)</strong></td>
                <td>80 – 100 fL</td>
                <td>80 – 100 fL</td>
                <td>Classifies microcytic (iron) vs. macrocytic (B12) anemia</td>
              </tr>
              <tr>
                <td><strong>Total WBC Count (TLC)</strong></td>
                <td>4,000 – 11,000 /µL</td>
                <td>4,000 – 11,000 /µL</td>
                <td>Immune response to bacterial or viral infection</td>
              </tr>
              <tr>
                <td><strong>Platelet Count</strong></td>
                <td>150,000 – 450,000 /µL</td>
                <td>150,000 – 450,000 /µL</td>
                <td>Primary blood clotting and hemostasis capacity</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="art-prose-h2" id="platelets-esr">5. Platelets (Thrombocytes) &amp; ESR Context</h2>
        <p class="art-prose-p">
          Platelets are cytoplasmic fragments critical for blood clotting. Viral fevers (such as dengue) or certain medications can cause transient thrombocytopenia (low platelets &lt; 150,000/µL). When paired with Erythrocyte Sedimentation Rate (ESR), a CBC also provides a helpful baseline screening for systemic inflammation.
        </p>

        <div class="art-takeaways-box">
          <div class="art-takeaways-title">
            <i data-lucide="bookmark-check"></i>
            <span>Key Takeaways for Patients</span>
          </div>
          <ul class="art-takeaways-list">
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>A standalone CBC does not require overnight fasting and can be drawn at any time of day.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Low MCV with elevated RDW is a classic early signature of iron deficiency; high MCV warrants Vitamin B12 and Folate testing.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Always interpret absolute differential counts (e.g., Absolute Neutrophil Count) alongside percentages with your physician.</span>
            </li>
          </ul>
        </div>
      `,
      faqs: [
        {
          q: 'Do I need to fast before a Complete Blood Count (CBC) test?',
          a: 'No. A standalone CBC does not require fasting. However, if your CBC is booked as part of a Comprehensive Health Checkup that includes Fasting Blood Sugar or a Lipid Profile, you should fast for 10 to 12 hours.'
        },
        {
          q: 'Why can dehydration make my hemoglobin and hematocrit look slightly elevated?',
          a: 'Insufficient fluid intake reduces plasma volume in the bloodstream, concentrating red blood cells (hemoconcentration). Drinking a glass of plain water before your blood draw helps ensure accurate baseline readings.'
        },
        {
          q: 'What is "pseudothrombocytopenia" on a platelet report?',
          a: 'In a small percentage of individuals, platelets naturally clump together in the presence of EDTA anticoagulant, causing automated counters to report a falsely low count. Our pathologists verify this on a stained blood smear and can recollect in a sodium citrate tube.'
        }
      ]
    },

    'fasting-lipid-glucose': {
      title: 'Why 10–12 Hour Fasting Matters for Lipid Profile & Blood Glucose Tests',
      category: 'Fasting & Test Prep',
      author: 'Dr. Vikramaditya Rao, MD',
      authorRole: 'Senior Consultant Clinical Biochemist',
      authorImg: 'assets/images/team-marcus-sterling.jpg',
      date: 'September 28, 2026',
      readTime: '7 Min Read',
      heroImg: 'assets/images/service-river-table.jpg',
      caption: 'Figure 2.0: Serum Separator Tubes (SST) undergoing controlled centrifugation prior to enzymatic spectrophotometric lipid analysis.',
      abstract: 'Discover how postprandial chylomicrons spike serum triglycerides and alter calculated LDL cholesterol, why plain water is encouraged during fasting, and how to time morning medications before your phlebotomy draw.',
      metaDesc: 'Learn why 10-12 hours of overnight fasting is essential for accurate Lipid Profile, Triglycerides, LDL Cholesterol, and Fasting Blood Glucose tests.',
      toc: [
        { id: 'postprandial-metabolism', label: '1. Postprandial Metabolism & Chylomicron Clearance' },
        { id: 'friedewald-ldl', label: '2. How Triglycerides Affect Calculated & Direct LDL' },
        { id: 'fasting-rules', label: '3. The Golden Rules of 10–12 Hour Overnight Fasting' },
        { id: 'fasting-matrix', label: '4. Diagnostic Test Fasting Duration Matrix' },
        { id: 'medication-hydration', label: '5. Morning Medications, Coffee & Plain Water' }
      ],
      bodyHtml: `
        <h2 class="art-prose-h2" id="postprandial-metabolism">1. Postprandial Metabolism &amp; Chylomicron Clearance</h2>
        <p class="art-prose-p">
          After you consume a meal, dietary fats and carbohydrates are absorbed through the intestinal mucosa into the bloodstream. Fats are packaged into large lipoprotein particles called chylomicrons, causing serum triglyceride concentrations to rise by 30% to 100% for several hours after eating. Similarly, dietary carbohydrates trigger an immediate postprandial insulin release and transient glucose excursion.
        </p>
        <p class="art-prose-p">
          In healthy individuals, lipoprotein lipase clears chylomicrons from circulation within 8 to 10 hours. Drawing blood during a standardized 10-to-12-hour overnight fast guarantees that your biochemical profile reflects your liver's true baseline endogenous lipid synthesis and basal hepatic glucose output—rather than what you ate for dinner the night before.
        </p>

        <h2 class="art-prose-h2" id="friedewald-ldl">2. How Triglycerides Affect Calculated &amp; Direct LDL</h2>
        <p class="art-prose-p">
          While Total Cholesterol and HDL ("good") cholesterol remain relatively stable after a light meal, Triglycerides and Very Low-Density Lipoprotein (VLDL) are highly sensitive to recent caloric intake. Because standard lipid panels often estimate LDL ("bad") cholesterol using the Friedewald or Sampson equation—which subtracts VLDL (Triglycerides ÷ 5) from Total Cholesterol—an artificially elevated non-fasting triglyceride level can falsely lower calculated LDL or invalidate the formula entirely. At AARA, we also perform direct enzymatic LDL-C measurement when triglycerides exceed 200 mg/dL.
        </p>

        <div class="art-pullquote">
          <p class="art-pullquote-text">
            "Fasting is not about starving the body—it is about standardizing the pre-analytical baseline so your cardiologist can compare your lipid fractions year over year with mathematical precision."
          </p>
          <span class="art-pullquote-cite">— Dr. Vikramaditya Rao, MD, Senior Consultant Clinical Biochemist</span>
        </div>

        <h2 class="art-prose-h2" id="fasting-rules">3. The Golden Rules of 10–12 Hour Overnight Fasting</h2>
        <p class="art-prose-p">
          Both under-fasting (&lt; 8 hours) and prolonged over-fasting (&gt; 14–16 hours) can distort metabolic markers. Fasting beyond 14 hours triggers counter-regulatory hormones (glucagon and cortisol) and free fatty acid mobilization from adipose tissue, which can paradoxically raise serum bilirubin and alter triglyceride readings.
        </p>

        <h2 class="art-prose-h2" id="fasting-matrix">4. Diagnostic Test Fasting Duration Matrix</h2>
        <div class="art-specs-table-wrapper">
          <table class="art-specs-table">
            <thead>
              <tr>
                <th>Diagnostic Blood Panel</th>
                <th>Required Fasting Window</th>
                <th>Ideal Collection Time</th>
                <th>Effect of Breaking Fast Early</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Fasting Blood Glucose (FBS)</strong></td>
                <td>8 – 10 Hours</td>
                <td>6:30 AM – 9:30 AM</td>
                <td>False elevation in plasma glucose &amp; insulin</td>
              </tr>
              <tr>
                <td><strong>Complete Lipid Profile</strong></td>
                <td>10 – 12 Hours</td>
                <td>6:30 AM – 10:00 AM</td>
                <td>Elevated triglycerides; skewed VLDL/LDL ratios</td>
              </tr>
              <tr>
                <td><strong>Serum Iron &amp; TIBC Panel</strong></td>
                <td>10 – 12 Hours (Morning)</td>
                <td>7:00 AM – 9:30 AM</td>
                <td>Diurnal fluctuation &amp; dietary iron spike</td>
              </tr>
              <tr>
                <td><strong>HbA1c / CBC / TSH</strong></td>
                <td>No Fasting Required</td>
                <td>Anytime (Morning preferred for TSH)</td>
                <td>Unaffected by recent meal intake</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="art-prose-h2" id="medication-hydration">5. Morning Medications, Coffee &amp; Plain Water</h2>
        <p class="art-prose-p">
          Many patients mistakenly believe that black coffee or green tea without sugar is acceptable during a fast. In reality, caffeine and polyphenols stimulate catecholamine release, hepatic glycogenolysis, and gastric acid secretion, which measurably alter fasting glucose and free fatty acid levels. Stick strictly to plain room-temperature water during your fasting window.
        </p>

        <div class="art-takeaways-box">
          <div class="art-takeaways-title">
            <i data-lucide="bookmark-check"></i>
            <span>Key Takeaways for Patients</span>
          </div>
          <ul class="art-takeaways-list">
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Finish dinner between 8:00 PM and 9:00 PM for an ideal 7:00 AM to 8:30 AM morning blood draw.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Drink 1 to 2 glasses of plain water upon waking; hydration prevents collapsed veins and hemoconcentration.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Avoid alcohol, heavy high-fat meals, and strenuous gym workouts for 24 hours prior to a Lipid Profile.</span>
            </li>
          </ul>
        </div>
      `,
      faqs: [
        {
          q: 'Can I drink black coffee or lemon water without sugar during my 12-hour fast?',
          a: 'No. Even zero-calorie black coffee, herbal tea, or lemon water triggers metabolic and enzymatic responses in the liver and pancreas. Only plain drinking water is permitted.'
        },
        {
          q: 'What happens if I fast for 16 hours (intermittent fasting) before my lipid test?',
          a: 'Fasting longer than 14 hours causes the body to break down stored fat for energy, releasing free fatty acids that the liver converts into VLDL—which can ironically elevate your triglycerides and serum bilirubin.'
        },
        {
          q: 'How is Postprandial Blood Sugar (PPBS) timed after my fasting blood draw?',
          a: 'For a 2-hour PPBS test, note the exact time you take the first bite of your normal breakfast. Your blood sample must be drawn exactly 2 hours (120 minutes ± 10 minutes) from that first bite.'
        }
      ]
    },

    'thyroid-t3-t4-tsh': {
      title: 'Decoding Thyroid Hormones: T3, T4 & Ultra-Sensitive TSH Reference Ranges',
      category: 'Thyroid & Hormones',
      author: 'Dr. Soraya Al-Mansoor, PhD',
      authorRole: 'Lead Endocrine Immunologist',
      authorImg: 'assets/images/team-soraya-al-mansoor.jpg',
      date: 'August 19, 2026',
      readTime: '6 Min Read',
      heroImg: 'assets/images/service-wall-art.jpg',
      caption: 'Figure 3.0: Automated Chemiluminescence Immunoassay (CLIA) analyzer quantifying picogram-level Free T3, Free T4, and Ultra-Sensitive TSH.',
      abstract: 'A clinical breakdown of the hypothalamic-pituitary-thyroid feedback loop, distinguishing subclinical hypothyroidism from overt thyroid dysfunction, and when to request Anti-TPO antibody screening.',
      metaDesc: 'Understand your Thyroid Profile blood test results: Total T3, Free T4, Ultra-sensitive TSH reference intervals, hypothyroidism, and Anti-TPO antibodies.',
      toc: [
        { id: 'hpt-axis-loop', label: '1. The Pituitary–Thyroid Inverse Feedback Loop' },
        { id: 'total-vs-free', label: '2. Total T3/T4 vs. Free T3/FT4 Immunoassays' },
        { id: 'clinical-patterns', label: '3. Hypothyroidism, Hyperthyroidism & Subclinical States' },
        { id: 'thyroid-matrix', label: '4. Thyroid Biomarker Reference Intervals' },
        { id: 'autoimmune-biotin', label: '5. Anti-TPO Antibodies & Biotin Interference' }
      ],
      bodyHtml: `
        <h2 class="art-prose-h2" id="hpt-axis-loop">1. The Pituitary–Thyroid Inverse Feedback Loop</h2>
        <p class="art-prose-p">
          The thyroid gland—a butterfly-shaped endocrine organ at the base of the neck—regulates basal metabolic rate, heart rate, thermoregulation, and cognitive energy. Thyroid hormone output is governed by a sensitive negative feedback loop between the pituitary gland in the brain and the thyroid gland itself.
        </p>
        <p class="art-prose-p">
          When circulating thyroid hormones (T3 and T4) drop even slightly, the pituitary gland secretes more <strong>Thyroid Stimulating Hormone (TSH)</strong> to prod the thyroid into working harder. Conversely, when thyroid hormone levels are excessively high, pituitary TSH secretion is suppressed toward zero. This inverse logarithmic relationship makes 3rd-generation Ultra-Sensitive TSH the most sensitive frontline screening marker for thyroid health.
        </p>

        <h2 class="art-prose-h2" id="total-vs-free">2. Total T3/T4 vs. Free T3/FT4 Immunoassays</h2>
        <p class="art-prose-p">
          Over 99% of Triiodothyronine (T3) and Thyroxine (T4) circulating in your blood is bound to carrier proteins like Thyroxine-Binding Globulin (TBG) and is metabolically inactive. Only the unbound fraction—<strong>Free T3 (FT3)</strong> and <strong>Free T4 (FT4)</strong>—enters cells to regulate metabolism:
        </p>

        <div class="art-step-list">
          <div class="art-step-item">
            <div class="art-step-num">A</div>
            <div class="art-step-content">
              <h4>Thyroxine (T4 / Free T4)</h4>
              <p>The primary pro-hormone secreted by the thyroid gland with a 7-day half-life, converted into active T3 inside peripheral organs like the liver and kidneys.</p>
            </div>
          </div>
          <div class="art-step-item">
            <div class="art-step-num">B</div>
            <div class="art-step-content">
              <h4>Triiodothyronine (T3 / Free T3)</h4>
              <p>The biologically active hormone possessing 4 times the receptor affinity of T4, directly driving cellular oxygen consumption and energy metabolism.</p>
            </div>
          </div>
        </div>

        <div class="art-pullquote">
          <p class="art-pullquote-text">
            "Because pregnancy, oral contraceptives, and liver protein changes alter binding globulins, measuring Free T3 and Free T4 alongside Ultra-Sensitive TSH provides the clearest window into true cellular thyroid status."
          </p>
          <span class="art-pullquote-cite">— Dr. Soraya Al-Mansoor, PhD, Lead Endocrine Immunologist</span>
        </div>

        <h2 class="art-prose-h2" id="clinical-patterns">3. Hypothyroidism, Hyperthyroidism &amp; Subclinical States</h2>
        <p class="art-prose-p">
          In <strong>Primary Hypothyroidism</strong>, TSH is elevated (&gt; 4.5 µIU/mL) while Free T4 is low, often accompanied by fatigue, weight gain, cold intolerance, and dry skin. In <strong>Subclinical Hypothyroidism</strong>, TSH is mildly elevated (4.5 – 10.0 µIU/mL) while Free T3 and Free T4 remain within normal reference intervals—an early warning stage where your physician may check Anti-TPO antibodies or monitor trends every 3 to 6 months.
        </p>

        <h2 class="art-prose-h2" id="thyroid-matrix">4. Thyroid Biomarker Reference Intervals</h2>
        <div class="art-specs-table-wrapper">
          <table class="art-specs-table">
            <thead>
              <tr>
                <th>Assay Parameter</th>
                <th>Adult Reference Range</th>
                <th>Hypothyroid Pattern</th>
                <th>Hyperthyroid Pattern</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Ultra-Sensitive TSH</strong></td>
                <td>0.45 – 4.50 µIU/mL</td>
                <td>Elevated (&gt; 4.50 µIU/mL)</td>
                <td>Suppressed (&lt; 0.40 µIU/mL)</td>
              </tr>
              <tr>
                <td><strong>Free T4 (FT4)</strong></td>
                <td>0.82 – 1.77 ng/dL</td>
                <td>Low (&lt; 0.82 ng/dL)</td>
                <td>Elevated (&gt; 1.77 ng/dL)</td>
              </tr>
              <tr>
                <td><strong>Free T3 (FT3)</strong></td>
                <td>2.00 – 4.40 pg/mL</td>
                <td>Low or Low-Normal</td>
                <td>Elevated (&gt; 4.40 pg/mL)</td>
              </tr>
              <tr>
                <td><strong>Anti-TPO Antibodies</strong></td>
                <td>&lt; 34.0 IU/mL</td>
                <td>Often &gt; 100 IU/mL in Hashimoto's</td>
                <td>Variable (Elevated in Graves')</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="art-prose-h2" id="autoimmune-biotin">5. Anti-TPO Antibodies &amp; Biotin Interference</h2>
        <p class="art-prose-p">
          Important pre-analytical tip: high-dose <strong>Biotin (Vitamin B7)</strong> hair and nail supplements (&gt; 5,000 mcg/day) can interfere with streptavidin-biotin chemiluminescence immunoassays, causing falsely low TSH and falsely elevated Free T4 readings. Always pause high-dose biotin supplements 48 hours prior to a thyroid blood draw.
        </p>

        <div class="art-takeaways-box">
          <div class="art-takeaways-title">
            <i data-lucide="bookmark-check"></i>
            <span>Key Takeaways for Patients</span>
          </div>
          <ul class="art-takeaways-list">
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>TSH exhibits a circadian rhythm (peaking overnight and lowest in the afternoon); always test at the same morning hour for trend comparison.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>If you take daily levothyroxine, draw your morning blood sample BEFORE taking that day's pill.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Discontinue high-dose Biotin (Vitamin B7) hair/skin supplements for 48 hours before thyroid hormone testing.</span>
            </li>
          </ul>
        </div>
      `,
      faqs: [
        {
          q: 'Why do doctors recommend stricter TSH target ranges during pregnancy?',
          a: 'During the first trimester of pregnancy, human chorionic gonadotropin (hCG) mildly stimulates the thyroid, and fetal neurodevelopment relies entirely on maternal thyroid hormone. Trimester-specific TSH targets (often < 2.5 µIU/mL in Trimester 1) are printed on all AARA reports.'
        },
        {
          q: 'Should I take my morning Thyronorm / Eltroxin tablet before my thyroid blood test?',
          a: 'Wait until after your blood draw. Taking levothyroxine immediately before phlebotomy causes a transient 15%–20% spike in serum Free T4 for 4 to 6 hours. Carry your tablet with you and take it right after the sample is collected.'
        },
        {
          q: 'What does a positive Anti-TPO (Thyroid Peroxidase Antibody) test indicate?',
          a: 'Elevated Anti-TPO antibodies indicate autoimmune thyroiditis (most commonly Hashimoto’s thyroiditis). Identifying antibodies early helps your endocrinologist monitor thyroid reserve even when TSH is only borderline elevated.'
        }
      ]
    },

    'hba1c-vs-fasting-sugar': {
      title: 'HbA1c vs. Fasting Blood Sugar: Complete Clinical Guide to Diabetes Monitoring',
      category: 'Diabetes & Metabolic Care',
      author: 'Dr. Vikramaditya Rao, MD',
      authorRole: 'Senior Consultant Clinical Biochemist',
      authorImg: 'assets/images/team-julian-thorne.jpg',
      date: 'July 30, 2026',
      readTime: '7 Min Read',
      heroImg: 'assets/images/gallery-coaster-detail.jpg',
      caption: 'Figure 4.0: NGSP-certified High-Performance Liquid Chromatography (HPLC) chromatogram separating HbA1c glycated hemoglobin fractions.',
      abstract: 'Understand how glycated hemoglobin (HbA1c) reflects your 90-day average blood glucose without fasting, and why pairing it with Fasting Plasma Glucose (FPG) and Postprandial (PPBS) testing catches early prediabetes.',
      metaDesc: 'Clinical guide comparing HbA1c (Glycated Hemoglobin) and Fasting Blood Glucose (FBS) for diabetes diagnosis, prediabetes screening, and eAG calculation.',
      toc: [
        { id: 'glycation-physiology', label: '1. The Physiology of Hemoglobin Glycation (HbA1c)' },
        { id: 'snapshot-vs-movie', label: '2. Snapshot (FBS/PPBS) vs. 90-Day Movie (HbA1c)' },
        { id: 'hplc-methodology', label: '3. NGSP-Certified HPLC Analytical Precision' },
        { id: 'diabetes-matrix', label: '4. ADA Diagnostic Thresholds & eAG Matrix' },
        { id: 'confounding-factors', label: '5. When Anemia or Hemoglobin Variants Affect HbA1c' }
      ],
      bodyHtml: `
        <h2 class="art-prose-h2" id="glycation-physiology">1. The Physiology of Hemoglobin Glycation (HbA1c)</h2>
        <p class="art-prose-p">
          As red blood cells circulate through your bloodstream over their natural 120-day lifespan, glucose molecules in the plasma spontaneously bind to the N-terminal valine of the hemoglobin beta chain—a non-enzymatic process called <strong>glycation</strong>. The higher your average blood sugar concentration over the preceding 8 to 12 weeks, the higher the percentage of hemoglobin that becomes glycated (HbA1c).
        </p>
        <p class="art-prose-p">
          Because approximately 50% of your HbA1c value is weighted toward the most recent 30 days of glycemic exposure, quarterly HbA1c testing every 3 months serves as the gold-standard clinical benchmark for assessing long-term glycemic control and microvascular complication risk.
        </p>

        <h2 class="art-prose-h2" id="snapshot-vs-movie">2. Snapshot (FBS/PPBS) vs. 90-Day Movie (HbA1c)</h2>
        <p class="art-prose-p">
          Fasting Plasma Glucose (FPG) and 2-Hour Postprandial Blood Sugar (PPBS) act like single-frame photographs: they show how your body handles glucose at a specific moment in time. By contrast, HbA1c is a 90-day motion picture. Pairing both tests is clinically superior because some individuals exhibit normal fasting glucose but experience sharp post-meal spikes that push HbA1c into the prediabetic range.
        </p>

        <div class="art-pullquote">
          <p class="art-pullquote-text">
            "Fasting blood glucose tells us how your liver regulates sugar overnight; HbA1c reveals your body's cumulative 24-hour glucose exposure across 90 consecutive days."
          </p>
          <span class="art-pullquote-cite">— Dr. Vikramaditya Rao, MD, Senior Consultant Clinical Biochemist</span>
        </div>

        <h2 class="art-prose-h2" id="hplc-methodology">3. NGSP-Certified HPLC Analytical Precision</h2>
        <p class="art-prose-p">
          AARA Clinical Laboratories performs all HbA1c assays using NGSP-certified and IFCC-traceable Ion-Exchange High-Performance Liquid Chromatography (HPLC). Unlike rapid point-of-care cartridge tests, automated HPLC separates hemoglobin fractions chromatographically with a Coefficient of Variation (CV) under 1.5%, and automatically calculates your <strong>Estimated Average Glucose (eAG)</strong> in mg/dL.
        </p>

        <h2 class="art-prose-h2" id="diabetes-matrix">4. ADA Diagnostic Thresholds &amp; eAG Matrix</h2>
        <div class="art-specs-table-wrapper">
          <table class="art-specs-table">
            <thead>
              <tr>
                <th>Clinical Category (ADA Criteria)</th>
                <th>HbA1c (%)</th>
                <th>Fasting Plasma Glucose (FBS)</th>
                <th>2-Hour Postprandial (PPBS)</th>
                <th>Estimated Avg Glucose (eAG)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Normal Glycemic Status</strong></td>
                <td>&lt; 5.7%</td>
                <td>70 – 99 mg/dL</td>
                <td>&lt; 140 mg/dL</td>
                <td>&lt; 117 mg/dL</td>
              </tr>
              <tr>
                <td><strong>Prediabetes (Impaired)</strong></td>
                <td>5.7% – 6.4%</td>
                <td>100 – 125 mg/dL</td>
                <td>140 – 199 mg/dL</td>
                <td>117 – 137 mg/dL</td>
              </tr>
              <tr>
                <td><strong>Diabetes Mellitus</strong></td>
                <td>&ge; 6.5%</td>
                <td>&ge; 126 mg/dL</td>
                <td>&ge; 200 mg/dL</td>
                <td>&ge; 140 mg/dL</td>
              </tr>
              <tr>
                <td><strong>Target for Most Treated Adults</strong></td>
                <td>&lt; 7.0%</td>
                <td>80 – 130 mg/dL</td>
                <td>&lt; 180 mg/dL</td>
                <td>&lt; 154 mg/dL</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="art-prose-h2" id="confounding-factors">5. When Anemia or Hemoglobin Variants Affect HbA1c</h2>
        <p class="art-prose-p">
          Because HbA1c depends on a normal 120-day red blood cell lifespan, conditions that alter RBC turnover can skew results. Iron deficiency anemia (which prolongs average cell age) can mildly elevate HbA1c, whereas hemolytic anemia, recent blood loss, or pregnancy can lower it. In such cases, our biochemists recommend <strong>Serum Fructosamine</strong> testing, which reflects a 2-to-3-week glycemic average independent of red blood cells.
        </p>

        <div class="art-takeaways-box">
          <div class="art-takeaways-title">
            <i data-lucide="bookmark-check"></i>
            <span>Key Takeaways for Patients</span>
          </div>
          <ul class="art-takeaways-list">
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>HbA1c requires no fasting and is unaffected by a single indulgent meal the day before testing.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Catching prediabetes (HbA1c 5.7%–6.4%) allows lifestyle and nutritional interventions to reverse progression to Type 2 diabetes.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Sodium Fluoride grey-top vacutainers are used for Fasting Glucose to immediately halt cellular glycolysis after collection.</span>
            </li>
          </ul>
        </div>
      `,
      faqs: [
        {
          q: 'Why are Fasting Blood Sugar samples collected in a special grey-top tube?',
          a: 'Red and white blood cells continue consuming glucose inside a test tube after blood is drawn (losing ~5–7% glucose per hour at room temperature). Grey-top tubes contain Sodium Fluoride, an antiglycolytic agent that freezes glucose levels immediately upon collection.'
        },
        {
          q: 'How often should I test my HbA1c if I have prediabetes or Type 2 diabetes?',
          a: 'Clinical guidelines recommend testing HbA1c every 6 months if your blood sugar is stable and meeting targets, or every 3 months (quarterly) if your therapy has changed or glycemic targets are not yet met.'
        },
        {
          q: 'What is the HOMA-IR test and should I add it to my diabetes panel?',
          a: 'HOMA-IR (Homeostatic Model Assessment for Insulin Resistance) pairs Fasting Glucose with Fasting Serum Insulin to detect insulin resistance years before blood sugar or HbA1c begins to rise.'
        }
      ]
    },

    'vitamin-d-b12-deficiency': {
      title: 'Signs of Vitamin D & B12 Deficiency: Symptoms, Reference Ranges & When to Test',
      category: 'Vitamins & Wellness',
      author: 'Dr. Alisha Khan, MD',
      authorRole: 'Chief of Hematology & Clinical Pathology',
      authorImg: 'assets/images/team-elena-vance.jpg',
      date: 'June 12, 2026',
      readTime: '6 Min Read',
      heroImg: 'assets/images/service-home-decor.jpg',
      caption: 'Figure 5.0: Automated electrochemiluminescence immunoassay quantifying serum 25-Hydroxy Vitamin D and Cobalamin (Vitamin B12).',
      abstract: 'Why chronic fatigue, bone aches, brain fog, and peripheral tingling often trace back to low 25-Hydroxy Vitamin D or serum Cobalamin (B12)—and how targeted immunoassay testing guides safe supplementation.',
      metaDesc: 'Clinical guide to Vitamin D (25-OH) and Vitamin B12 deficiency symptoms, optimal reference ranges, vegetarian risk factors, and follow-up testing.',
      toc: [
        { id: 'silent-epidemic', label: '1. Why Indoor Lifestyles & Diets Drive Micronutrient Deficiencies' },
        { id: 'vitamin-d-physiology', label: '2. 25-Hydroxy Vitamin D: Bone, Immune & Mood Regulation' },
        { id: 'vitamin-b12-neurology', label: '3. Vitamin B12 (Cobalamin): Myelin Sheaths & Red Cell Synthesis' },
        { id: 'vitamin-matrix', label: '4. Vitamin D & B12 Clinical Reference Range Matrix' },
        { id: 'safe-supplementation', label: '5. Guided Supplementation & Avoiding Vitamin D Toxicity' }
      ],
      bodyHtml: `
        <h2 class="art-prose-h2" id="silent-epidemic">1. Why Indoor Lifestyles &amp; Diets Drive Micronutrient Deficiencies</h2>
        <p class="art-prose-p">
          Despite abundant year-round sunshine across India, epidemiological studies show that over 70% to 80% of urban adults have insufficient or deficient <strong>Vitamin D</strong> levels due to indoor office hours, air-conditioned commutes, sunscreen use, and cutaneous melanin filtering UVB rays. Simultaneously, predominantly vegetarian diets, long-term metformin or antacid (PPI) use, and impaired gastric intrinsic factor absorption contribute to widespread <strong>Vitamin B12</strong> deficiency.
        </p>
        <p class="art-prose-p">
          Because both deficiencies develop gradually over months, symptoms like persistent daytime fatigue, lower back pain, muscle cramps, hair thinning, brain fog, and paresthesia (pins-and-needles in hands or feet) are frequently misattributed to work stress or aging until a diagnostic immunoassay reveals the root cause.
        </p>

        <h2 class="art-prose-h2" id="vitamin-d-physiology">2. 25-Hydroxy Vitamin D: Bone, Immune &amp; Mood Regulation</h2>
        <p class="art-prose-p">
          Functioning more like a steroid pro-hormone than a simple vitamin, cholecalciferol (Vitamin D3) is hydroxylated in the liver to <strong>25-Hydroxy Vitamin D [25(OH)D]</strong>—the primary storage form measured in clinical laboratories. Optimal 25(OH)D levels (30–100 ng/mL) are essential for intestinal calcium absorption, bone mineralization, innate immune defense, and neurotransmitter synthesis.
        </p>

        <div class="art-pullquote">
          <p class="art-pullquote-text">
            "Testing before supplementing is vital: knowing whether your 25-OH Vitamin D is 8 ng/mL or 28 ng/mL determines whether you need high-dose loading therapy or simple daily maintenance."
          </p>
          <span class="art-pullquote-cite">— Dr. Alisha Khan, MD, Chief of Hematology &amp; Clinical Pathology</span>
        </div>

        <h2 class="art-prose-h2" id="vitamin-b12-neurology">3. Vitamin B12 (Cobalamin): Myelin Sheaths &amp; Red Cell Synthesis</h2>
        <p class="art-prose-p">
          Vitamin B12 is an essential cofactor for DNA synthesis in bone marrow erythroblasts and for maintaining the protective myelin insulation around peripheral and central nerves. Untreated B12 deficiency can cause megaloblastic anemia, elevated cardiovascular homocysteine levels, memory impairment, and peripheral neuropathy.
        </p>

        <h2 class="art-prose-h2" id="vitamin-matrix">4. Vitamin D &amp; B12 Clinical Reference Range Matrix</h2>
        <div class="art-specs-table-wrapper">
          <table class="art-specs-table">
            <thead>
              <tr>
                <th>Clinical Status</th>
                <th>25-Hydroxy Vitamin D (ng/mL)</th>
                <th>Serum Vitamin B12 (pg/mL)</th>
                <th>Recommended Clinical Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Severe Deficiency</strong></td>
                <td>&lt; 10.0 ng/mL</td>
                <td>&lt; 200 pg/mL</td>
                <td>Physician-supervised therapeutic loading protocol</td>
              </tr>
              <tr>
                <td><strong>Insufficiency / Borderline</strong></td>
                <td>20.0 – 29.9 ng/mL</td>
                <td>200 – 300 pg/mL</td>
                <td>Targeted supplementation; check Active B12 / Homocysteine</td>
              </tr>
              <tr>
                <td><strong>Optimal Sufficiency</strong></td>
                <td>30.0 – 100.0 ng/mL</td>
                <td>300 – 900 pg/mL</td>
                <td>Maintain balanced nutrition &amp; annual preventive re-test</td>
              </tr>
              <tr>
                <td><strong>Hypervitaminosis / Excess</strong></td>
                <td>&gt; 100.0 ng/mL (Toxicity &gt; 150)</td>
                <td>&gt; 950 pg/mL</td>
                <td>Discontinue high-dose supplements; check Serum Calcium</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="art-prose-h2" id="safe-supplementation">5. Guided Supplementation &amp; Avoiding Vitamin D Toxicity</h2>
        <p class="art-prose-p">
          Because Vitamin D is fat-soluble, taking unmonitored high-dose weekly 60,000 IU sachets for many months without re-testing can lead to hypervitaminosis D and hypercalcemia. Clinicians recommend re-testing serum 25(OH)D and Serum Calcium 8 to 12 weeks after completing a corrective course to transition safely to a maintenance dose.
        </p>

        <div class="art-takeaways-box">
          <div class="art-takeaways-title">
            <i data-lucide="bookmark-check"></i>
            <span>Key Takeaways for Patients</span>
          </div>
          <ul class="art-takeaways-list">
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>25-Hydroxy Vitamin D Total (measuring both D2 and D3) is the gold-standard clinical assay for Vitamin D status.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Patients taking Metformin for diabetes or PPIs for acid reflux should screen Vitamin B12 annually.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Re-test 3 months after starting corrective supplementation to confirm optimal levels and prevent over-supplementation.</span>
            </li>
          </ul>
        </div>
      `,
      faqs: [
        {
          q: 'What is the difference between 25-Hydroxy Vitamin D and 1,25-Dihydroxy Vitamin D?',
          a: '25-Hydroxy Vitamin D [25(OH)D] has a 2-to-3-week half-life and accurately reflects your body’s total Vitamin D stores. 1,25-Dihydroxy Vitamin D has a half-life of only 4–6 hours and is ordered only in specialized kidney or parathyroid disorders.'
        },
        {
          q: 'Should I pause my B-complex or multivitamin before a Vitamin B12 blood test?',
          a: 'Yes. Stopping oral B12 or multivitamin supplements for 48 to 72 hours before your blood draw prevents a transient spike in serum cobalamin and gives a truer reading of tissue reserves.'
        },
        {
          q: 'Why are Serum Calcium and Phosphorus often checked alongside Vitamin D?',
          a: 'Vitamin D directly controls intestinal calcium and phosphorus absorption. Evaluating Serum Calcium alongside 25(OH)D ensures your bone mineral axis is balanced.'
        }
      ]
    },

    'automated-hematology-cold-chain': {
      title: 'How Automated Hematology & Cold-Chain Phlebotomy Ensure Diagnostic Accuracy',
      category: 'Lab Quality & Tech',
      author: 'Dr. Julian Thorne, MD',
      authorRole: 'Director of Laboratory Quality Assurance',
      authorImg: 'assets/images/team-marcus-sterling.jpg',
      date: 'May 04, 2026',
      readTime: '8 Min Read',
      heroImg: 'assets/images/gallery-ocean-clock.jpg',
      caption: 'Figure 6.0: Barcoded vacutainer specimen racks entering automated pre-analytical sorting and 3-level quality control verification.',
      abstract: 'Go inside AARA’s quality assurance workflow: 2D barcoded vacutainer tubes, 2°C–8°C digital cold-chain home transport, 3-level daily internal quality controls (IQC), and dual-pathologist report sign-off.',
      metaDesc: 'Discover how AARA Clinical Laboratories guarantees diagnostic accuracy through barcoded vacutainers, 2-8°C cold-chain phlebotomy, and daily EQAS/IQC calibration.',
      toc: [
        { id: 'preanalytical-precision', label: '1. Pre-Analytical Precision: Why 70% of Lab Quality Starts at Draw' },
        { id: 'vacutainer-order', label: '2. Color-Coded Vacutainers & CLSI Order of Draw' },
        { id: 'cold-chain-logistics', label: '3. 2°C–8°C Monitored Cold-Chain Home Transport' },
        { id: 'qc-matrix', label: '4. Multi-Stage Quality Assurance & Vacutainer Matrix' },
        { id: 'pathologist-verification', label: '5. Delta Checks, Critical Alerts & Pathologist Sign-Off' }
      ],
      bodyHtml: `
        <h2 class="art-prose-h2" id="preanalytical-precision">1. Pre-Analytical Precision: Why 70% of Lab Quality Starts at Draw</h2>
        <p class="art-prose-p">
          In clinical pathology, international studies demonstrate that up to 70% of laboratory errors occur not inside the analyzer, but in the <strong>pre-analytical phase</strong>—during venipuncture, tube mixing, labeling, or specimen transit. Prolonged tourniquet application (&gt; 60 seconds), improper needle gauge selection causing hemolysis (ruptured red cells), or warm transit temperatures can skew potassium, glucose, and enzyme readings before the tube ever reaches the lab.
        </p>
        <p class="art-prose-p">
          At AARA Clinical Laboratories, every home visit and walk-in phlebotomist follows strict Clinical and Laboratory Standards Institute (CLSI) venipuncture protocols, using single-use sterile vacuum butterfly systems and immediate bedside 2D barcode generation tied to your unique Patient ID.
        </p>

        <h2 class="art-prose-h2" id="vacutainer-order">2. Color-Coded Vacutainers &amp; CLSI Order of Draw</h2>
        <p class="art-prose-p">
          When multiple blood tubes are collected in a single venipuncture, drawing them in the exact CLSI sequence prevents additive carry-over between tubes:
        </p>

        <div class="art-callout-box">
          <div class="art-callout-header">
            <i data-lucide="shield-check"></i>
            <span>Clinical Safety Alert: Why Order of Draw Matters</span>
          </div>
          <div class="art-callout-body">
            <strong>Critical Example:</strong> Lavender-top tubes contain Potassium-EDTA anticoagulant. If a lavender tube is drawn <em>before</em> a gold-top Serum Separator Tube (SST), microscopic EDTA droplets on the needle sleeve can contaminate the chemistry tube—causing a falsely elevated Serum Potassium (hyperkalemia) and falsely low Serum Calcium reading. AARA strictly draws SST/Plain tubes before EDTA and Fluoride tubes.
          </div>
        </div>

        <h2 class="art-prose-h2" id="cold-chain-logistics">3. 2°C–8°C Monitored Cold-Chain Home Transport</h2>
        <p class="art-prose-p">
          For doorstep sample collections across Hyderabad, protecting specimen integrity against ambient tropical heat is paramount. Each AARA phlebotomist carries a validated, phase-change insulated cold-chain carrier maintained between <strong>2°C and 8°C</strong> with a continuous Bluetooth temperature data logger. Upon arrival at our Jubilee Hills central hub, the carrier's thermal log is scanned before specimens are accepted into the automated track.
        </p>

        <div class="art-pullquote">
          <p class="art-pullquote-text">
            "A diagnostic number is only as trustworthy as the cold chain and quality control behind it. Every patient specimen at AARA is treated as a life-critical clinical decision."
          </p>
          <span class="art-pullquote-cite">— Dr. Julian Thorne, MD, Director of Laboratory Quality Assurance</span>
        </div>

        <h2 class="art-prose-h2" id="qc-matrix">4. Multi-Stage Quality Assurance &amp; Vacutainer Matrix</h2>
        <div class="art-specs-table-wrapper">
          <table class="art-specs-table">
            <thead>
              <tr>
                <th>Vacutainer Cap Color</th>
                <th>Additive / Anticoagulant</th>
                <th>Primary Diagnostic Panels</th>
                <th>Quality Handling Protocol</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Gold / Red Top (SST)</strong></td>
                <td>Clot Activator &amp; Polymer Gel</td>
                <td>Lipid, LFT, KFT, Thyroid, Vitamins</td>
                <td>30-min clot upright, centrifuged at 3,500 RPM</td>
              </tr>
              <tr>
                <td><strong>Lavender Top</strong></td>
                <td>Spray-Coated K2-EDTA</td>
                <td>CBC (24-Param), ESR, HbA1c (HPLC)</td>
                <td>8 gentle inversions; zero micro-clots</td>
              </tr>
              <tr>
                <td><strong>Grey Top</strong></td>
                <td>Sodium Fluoride + K-Oxalate</td>
                <td>Fasting &amp; Postprandial Blood Glucose</td>
                <td>Immediate glycolysis inhibition</td>
              </tr>
              <tr>
                <td><strong>Light Blue Top</strong></td>
                <td>3.2% Buffered Sodium Citrate</td>
                <td>PT/INR, APTT Coagulation Studies</td>
                <td>Strict 9:1 blood-to-additive fill line</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="art-prose-h2" id="pathologist-verification">5. Delta Checks, Critical Alerts &amp; Pathologist Sign-Off</h2>
        <p class="art-prose-p">
          Every morning and shift change, AARA’s analyzers run 3-level Internal Quality Controls (Low, Normal, High) plotted on Levey-Jennings Westgard charts, alongside External Quality Assurance Scheme (EQAS) proficiency testing. Our Laboratory Information System (LIS) automatically performs a <strong>Delta Check</strong>—comparing your current results against your previous historical visits—before a board-certified MD pathologist signs and releases your verified digital report.
        </p>

        <div class="art-takeaways-box">
          <div class="art-takeaways-title">
            <i data-lucide="bookmark-check"></i>
            <span>Key Takeaways for Patients</span>
          </div>
          <ul class="art-takeaways-list">
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Bedside 2D barcoding eliminates manual transcription errors from collection to digital report delivery.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Digital 2°C–8°C cold-chain transport ensures doorstep home collections match in-lab accuracy 100%.</span>
            </li>
            <li class="art-takeaway-item">
              <i data-lucide="check"></i>
              <span>Automated Serum Indices screen every chemistry sample for hemolysis, lipemia, and icterus before analysis.</span>
            </li>
          </ul>
        </div>
      `,
      faqs: [
        {
          q: 'Are home blood collection results as accurate as walking into the main laboratory?',
          a: 'Yes, 100%. Because our phlebotomists use portable centrifuges for time-sensitive serum assays and transport all barcoded tubes in 2°C–8°C temperature-logged carriers within 90 minutes of draw, pre-analytical stability is identical to in-lab collection.'
        },
        {
          q: 'What is a "Critical Value Alert" Policy at AARA Clinical Laboratories?',
          a: 'If a test result falls into a life-critical threshold (such as severely low platelets, critical potassium, or extreme hypoglycemia), the assay is immediately repeated for confirmation and our pathologist personally phones the patient and referring physician within 15 minutes.'
        },
        {
          q: 'How long does AARA store my blood sample in the biobank after my report is released?',
          a: 'Routine serum and plasma aliquots are archived under temperature-controlled refrigeration (2°C–8°C) for 72 hours after report release. This allows you or your doctor to request reflex or add-on tests without needing a second needle prick.'
        }
      ]
    }
  };

  // Map shorthand slugs to the 6 clinical health guides
  const slugAliases = {
    'cbc': 'cbc-results-guide',
    'fasting': 'fasting-lipid-glucose',
    'thyroid': 'thyroid-t3-t4-tsh',
    'diabetes': 'hba1c-vs-fasting-sugar',
    'vitamins': 'vitamin-d-b12-deficiency',
    'quality': 'automated-hematology-cold-chain'
  };

  // =========================================================================
  // 2. STATE & DOM ELEMENTS
  // =========================================================================
  const pageTitle = document.getElementById('pageTitle');
  const pageMetaDesc = document.getElementById('pageMetaDesc');
  const artBcTitle = document.getElementById('artBcTitle');
  const artCategory = document.getElementById('artCategory');
  const artReadTime = document.getElementById('artReadTime');
  const artDate = document.getElementById('artDate');
  const artTitle = document.getElementById('artTitle');
  const artAbstract = document.getElementById('artAbstract');
  const artAuthorImg = document.getElementById('artAuthorImg');
  const artAuthorName = document.getElementById('artAuthorName');
  const artAuthorRole = document.getElementById('artAuthorRole');
  const artHeroImg = document.getElementById('artHeroImg');
  const artImgCaption = document.getElementById('artImgCaption');
  const artTocList = document.getElementById('artTocList');
  const artContentArea = document.getElementById('artContentArea');
  const artFaqAccordion = document.getElementById('artFaqAccordion');
  const artFaqSubtitle = document.getElementById('artFaqSubtitle');
  const artRelatedGrid = document.getElementById('artRelatedGrid');
  const switcherButtons = document.querySelectorAll('#articleSwitcherPills .jnl-switcher-btn');

  const initLucide = () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  };

  // =========================================================================
  // 3. RENDER ARTICLE FUNCTION
  // =========================================================================
  const renderArticle = (rawSlug, updateUrl = true) => {
    const resolvedSlug = slugAliases[rawSlug] || rawSlug;
    const activeSlug = articlesData[resolvedSlug] ? resolvedSlug : 'cbc-results-guide';
    const article = articlesData[activeSlug];

    // Update document title and meta
    if (pageTitle) pageTitle.textContent = `${article.title} | AARA Clinical Health Guides`;
    if (pageMetaDesc) pageMetaDesc.setAttribute('content', article.metaDesc);

    // Update Header and Hero Elements
    if (artBcTitle) artBcTitle.textContent = article.title;
    if (artCategory) artCategory.textContent = article.category;
    if (artReadTime) {
      artReadTime.innerHTML = `<i data-lucide="clock" style="width:13px; height:13px;"></i><span>${article.readTime}</span>`;
    }
    if (artDate) artDate.textContent = article.date;
    if (artTitle) artTitle.textContent = article.title;
    if (artAbstract) artAbstract.textContent = article.abstract;

    if (artAuthorImg) {
      artAuthorImg.src = article.authorImg;
      artAuthorImg.alt = `${article.author} Portrait`;
    }
    if (artAuthorName) artAuthorName.textContent = article.author;
    if (artAuthorRole) artAuthorRole.textContent = article.authorRole;

    if (artHeroImg) {
      artHeroImg.src = article.heroImg;
      artHeroImg.alt = article.title;
    }
    if (artImgCaption) artImgCaption.textContent = article.caption;

    // Update Table of Contents
    if (artTocList) {
      artTocList.innerHTML = article.toc.map((item, idx) => `
        <li>
          <a href="#${item.id}" class="art-toc-link ${idx === 0 ? 'active' : ''}">${item.label}</a>
        </li>
      `).join('');
    }

    // Update Main Editorial Prose Content
    if (artContentArea) {
      artContentArea.innerHTML = article.bodyHtml;
    }

    // Update Dynamic Article FAQs
    if (artFaqAccordion) {
      if (artFaqSubtitle) {
        artFaqSubtitle.textContent = `Specific clinical answers regarding preparation, reference intervals, and interpretation for ${article.title}.`;
      }
      artFaqAccordion.innerHTML = article.faqs.map((faq, idx) => `
        <div class="faq-item ${idx === 0 ? 'active' : ''}">
          <button class="faq-header" type="button" aria-expanded="${idx === 0 ? 'true' : 'false'}">
            <span class="faq-question">${faq.q}</span>
            <span class="faq-icon-indicator"><i data-lucide="chevron-down"></i></span>
          </button>
          <div class="faq-content-collapse" style="${idx === 0 ? 'max-height: 200px;' : ''}">
            <div class="faq-body">${faq.a}</div>
          </div>
        </div>
      `).join('');
    }

    // Update Related Articles (Pick 3 other articles from the 6)
    if (artRelatedGrid) {
      const otherKeys = Object.keys(articlesData).filter(k => k !== activeSlug).slice(0, 3);
      artRelatedGrid.innerHTML = otherKeys.map(k => {
        const item = articlesData[k];
        return `
          <article class="journal-card">
            <div class="journal-card-media">
              <img src="${item.heroImg}" alt="${item.title}" loading="lazy">
              <span class="journal-card-cat-badge">${item.category}</span>
              <span class="journal-card-read-time">
                <i data-lucide="clock" style="width:12px; height:12px;"></i> ${item.readTime}
              </span>
            </div>
            <div class="journal-card-body">
              <div class="journal-card-meta">
                <span class="journal-card-date">${item.date}</span>
                <span class="journal-card-divider">•</span>
                <span class="journal-card-author">${item.author}</span>
              </div>
              <h3 class="journal-card-title">${item.title}</h3>
              <p class="journal-card-excerpt">${item.abstract}</p>
              <div class="journal-card-footer">
                <a href="journaldetail.html?article=${k}" class="btn-card-explore" data-nav-slug="${k}">
                  <span>Read Health Guide</span>
                  <i data-lucide="arrow-right" class="btn-arrow-icon"></i>
                </a>
              </div>
            </div>
          </article>
        `;
      }).join('');

      // Add click listeners to related cards for instant dynamic switching
      artRelatedGrid.querySelectorAll('[data-nav-slug]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSlug = link.getAttribute('data-nav-slug');
          renderArticle(targetSlug, true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }

    // Update Switcher Buttons active state
    switcherButtons.forEach(btn => {
      if (btn.getAttribute('data-slug') === activeSlug) {
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        btn.classList.remove('active');
      }
    });

    // Update URL query parameter without full reload
    if (updateUrl) {
      const newUrl = `${window.location.pathname}?article=${activeSlug}`;
      window.history.pushState({ article: activeSlug }, '', newUrl);
    }

    // Re-initialize Lucide and FAQ accordion listeners
    initLucide();
    attachFaqListeners();
    attachSmoothScroll();
  };

  // =========================================================================
  // 4. FAQ ACCORDION EVENT HANDLERS
  // =========================================================================
  const attachFaqListeners = () => {
    const faqItems = document.querySelectorAll('#artFaqAccordion .faq-item');
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      const content = item.querySelector('.faq-content-collapse');

      if (header && content) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          faqItems.forEach(other => {
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
  };

  // =========================================================================
  // 5. IN-PAGE SMOOTH SCROLLING FOR TABLE OF CONTENTS
  // =========================================================================
  const attachSmoothScroll = () => {
    document.querySelectorAll('.art-toc-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const switcherBarHeight = document.getElementById('journalSwitcherBar')?.offsetHeight || 0;
          const targetTop = target.getBoundingClientRect().top + window.scrollY - switcherBarHeight - 90;
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth'
          });

          document.querySelectorAll('.art-toc-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });
  };

  // =========================================================================
  // 6. INITIALIZE FROM URL QUERY PARAMETER
  // =========================================================================
  const getSlugFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('article') || params.get('id') || 'cbc-results-guide';
  };

  // Handle Switcher Pill Clicks
  switcherButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-slug');
      renderArticle(slug, true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Handle Browser Back/Forward navigation
  window.addEventListener('popstate', (e) => {
    const slug = (e.state && e.state.article) ? e.state.article : getSlugFromUrl();
    renderArticle(slug, false);
  });

  // Initial Render
  const initialSlug = getSlugFromUrl();
  renderArticle(initialSlug, false);

  // =========================================================================
  // 7. SHARE BUTTON & TOAST UTILITY
  // =========================================================================
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

  const btnShareArticle = document.getElementById('btnShareArticle');
  if (btnShareArticle) {
    btnShareArticle.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Health guide link copied to clipboard.');
        }).catch(() => {
          showToast('Health Guide URL: ' + window.location.href);
        });
      } else {
        showToast('Health Guide URL: ' + window.location.href);
      }
    });
  }

  // =========================================================================
  // 8. HEADER, THEME & RTL CONTROLS (Home 1 Parity)
  // =========================================================================
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Drawer
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseLinks = document.querySelectorAll('[data-close-drawer]');

  const openDrawer = () => {
    if (!mobileNavDrawer || !drawerBackdrop) return;
    mobileNavDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    if (hamburgerBtn) hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileNavDrawer || !drawerBackdrop) return;
    mobileNavDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('open');
      if (isOpen) closeDrawer();
      else openDrawer();
    });
  }

  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  drawerCloseLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // RTL Switcher
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');

  const setDirection = (isRtl) => {
    const htmlEl = document.documentElement;
    if (isRtl) {
      htmlEl.setAttribute('dir', 'rtl');
      htmlEl.setAttribute('lang', 'ar');
      if (rtlLabel) rtlLabel.textContent = 'LTR';
      localStorage.setItem('aara-dir', 'rtl');
    } else {
      htmlEl.setAttribute('dir', 'ltr');
      htmlEl.setAttribute('lang', 'en');
      if (rtlLabel) rtlLabel.textContent = 'RTL';
      localStorage.setItem('aara-dir', 'ltr');
    }
  };

  const savedDir = localStorage.getItem('aara-dir');
  if (savedDir) setDirection(savedDir === 'rtl');
  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const isCurrentRtl = document.documentElement.getAttribute('dir') === 'rtl';
      setDirection(!isCurrentRtl);
    });
  }

  // Dark/Light Theme
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('aara-theme', isDark ? 'dark' : 'light');
    if (themeIcon) {
      themeIcon.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      initLucide();
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

  // Modals (Patient Login & Live Sample Status)
  const loginModal = document.getElementById('loginModal');
  const dashboardModal = document.getElementById('dashboardModal');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(loginModal);
      closeModal(dashboardModal);
    });
  });

  [loginModal, dashboardModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  const loginBtn = document.getElementById('loginBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', () => {
      closeDrawer();
      window.location.href = 'login.html';
    });
  }

  const navDashboard = document.getElementById('navDashboard');
  const mobileDashboardBtn = document.getElementById('mobileDashboardBtn');
  const footerVipPortalLink = document.getElementById('footerVipPortalLink');

  if (navDashboard) navDashboard.addEventListener('click', () => { window.location.href = 'dashboard.html'; });
  if (mobileDashboardBtn) mobileDashboardBtn.addEventListener('click', () => {
    closeDrawer();
    window.location.href = 'dashboard.html';
  });
  if (footerVipPortalLink) footerVipPortalLink.addEventListener('click', () => { window.location.href = 'login.html'; });

  // Consultation Trigger Buttons
  document.querySelectorAll('[data-open-commission]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Patient Coordinator notified: Our phlebotomy team will contact you shortly.');
    });
  });

  // Newsletter Subscription
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast(`Thank you! ${emailInput.value} has been subscribed to our preventive health updates.`);
        emailInput.value = '';
      }
    });
  }

  // Keyboard Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(loginModal);
      closeModal(dashboardModal);
      closeDrawer();
    }
  });
});
