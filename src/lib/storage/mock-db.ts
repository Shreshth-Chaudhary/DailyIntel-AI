import { Article, DailyBriefing, PracticeSuite } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  // 1. DEFENCE (July 22, 2026 - Within 7 Days)
  {
    id: 'intel-def-001',
    title: 'DRDO Successfully Tests 4th-Gen Very Short Range Air Defence System (VSHORADS) off Odisha Coast',
    summary: 'Defence Research and Development Organisation (DRDO) successfully flight-tested the 4th-generation VSHORADS missile system. Designed for neutralizing low-altitude aerial threats and enemy UAVs at close ranges with dual-thrust rocket motors.',
    content: `The Defence Research and Development Organisation (DRDO) conducted three successful flight tests of the 4th Generation Very Short Range Air Defence System (VSHORADS) missile from a land-based portable launcher off the coast of Odisha at Integrated Test Range (ITR), Chandipur.\n\nThe VSHORADS is a Man Portable Air Defence System (MANPADS) designed and developed indigenously by Research Centre Imarat (RCI) in collaboration with other DRDO laboratories and Indian industry partners. The system incorporates state-of-the-art miniaturized Reaction Control System (RCS) and integrated avionics, which have been successfully proven during the trials.`,
    category: 'Defence',
    subcategory: 'DRDO & Missile Technology',
    source: 'DRDO | PIB | Gazette',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=DRDO-VSHORADS-2026',
    publishedAt: '2026-07-22T08:30:00Z',
    importanceScore: 9.6,
    isTrending: true,
    duplicateCount: 4,
    keyFacts: [
      'Developed indigenously by Research Centre Imarat (RCI) & DRDO.',
      'MANPADS with miniaturized Reaction Control System (RCS).',
      'Propelled by a dual-thrust solid motor for low-altitude aerial targets.',
      'Tested at Integrated Test Range (ITR), Chandipur, Odisha.'
    ],
    dates: ['July 22, 2026'],
    organizations: ['DRDO', 'Indian Army', 'Ministry of Defence', 'RCI Hyderabad'],
    personalities: ['Dr. Samir V. Kamat (DRDO Chairman)', 'General Anil Chauhan (CDS)'],
    keywords: ['VSHORADS', 'MANPADS', 'Reaction Control System', 'ITR Chandipur', 'DRDO', 'Aatmanirbhar Bharat'],
    ministry: 'Ministry of Defence',
    country: 'India',
    readTimeMinutes: 4,
    bookmarked: true,
    isFactChecked: true,
    verificationStatus: 'Verified',
    aiVerificationNotes: '100% Verified against official DRDO press release and PIB Gazette notification (PRID-2026). Factually isolated without cross-story contamination.',
    strictIsolatedFacts: [
      'Developed indigenously by Research Centre Imarat (RCI) & DRDO.',
      'MANPADS with miniaturized Reaction Control System (RCS).',
      'Propelled by a dual-thrust solid motor for low-altitude aerial targets.',
      'Tested at Integrated Test Range (ITR), Chandipur, Odisha.'
    ],
    examRelevance: {
      exams: ['UPSC CSE', 'CDS', 'CAPF AC', 'AFCAT', 'NDA', 'SSB'],
      whyItMatters: 'Addresses tactical air defence along LAC/LOC and indigenization of missile tech.',
      prelimsQuestion: 'Consider statements regarding VSHORADS missile system...',
      mainsQuestion: 'Evaluate short-range air defence systems in high-altitude mountain battlefields.',
      keywords: ['MANPADS', 'Reaction Control System', 'Low-altitude Defense']
    },
    pyqIntelligence: {
      similarPyqAsked: 'With reference to short-range air defence systems, consider the statements...',
      yearAsked: 2018,
      examName: 'UPSC CSE',
      difficulty: 'UPSC Ranker Level',
      patternUsed: 'Multi-statement propulsion elimination',
      similarityScore: 94,
      whyAskedReason: 'UPSC tests indigenous missile propulsion systems and laboratory origins.',
      probabilityOfRepetition: 'High (89%)'
    },
    historicalContext: {
      origin: 'Conceived post border standoffs along high-altitude mountain terrain.',
      evolutionTimeline: [
        { date: '1980s', event: 'India relied on Soviet Igla MANPADS' },
        { date: '2020', event: 'Sanction of indigenous VSHORADS under DRDO RCI' },
        { date: '2026', event: 'Successful salvo flight test at ITR Chandipur' }
      ],
      landmarkJudgements: [],
      constitutionalArticles: ['7th Schedule Union List Entry 1 (Defence of India)', '7th Schedule Union List Entry 2 (Naval, Military & Air Forces)'],
      importantActsAndRules: ['Defence Acquisition Procedure (DAP) 2020'],
      keyCommittees: ['Kargil Review Committee (1999)', 'Shekatkar Committee (2016)'],
      previousPolicies: ['Positive Indigenisation Lists (PIL)'],
      governmentReports: ['PIB Defence Annual Report']
    },
    mainsFramework: {
      maxMarksPotential: 15,
      idealWordCount: 250,
      timeRequiredMinutes: 9,
      introductionContext: 'India\'s mountainous borders require light, man-portable air defence systems against low-RCS drone swarms.',
      corePerspectives: {
        security: 'Fills tactical air defense gaps in 15,000+ ft mountain zones.',
        economic: 'Saves foreign exchange replacing Russian Igla-S imports.',
        environmental: 'Clean solid-propellant burning reduces toxic residue.'
      },
      keyExaminerExpectations: ['Mention RCI Hyderabad and Reaction Control System (RCS)'],
      commonStudentMistakes: ['Confusing VSHORADS with long-range ABM systems'],
      rankerSecretTechnique: 'Diagram showing low-altitude interception umbrella vs S-400 defence.',
      wayForward: 'Accelerate Army induction and laser beam-riding guidance.'
    },
    examinersPerspective: {
      whyUpscMayAsk: 'Indigenous DRDO breakthroughs.',
      whyCdsMayAsk: 'Missile propulsion and launch ranges.',
      whyCapfMayAsk: 'Border security applications along LAC.',
      likelyFramingStyle: 'Statement-based elimination checking propulsion motor.',
      trapAreasToAvoid: ['VSHORADS uses solid propellant, not liquid scramjet.'],
      missedConcepts: ['Reaction Control System (RCS) enables rapid course correction.']
    },
    impactAnalysis: {
      overallImpact: 'Enhances tactical battlefield survivability for frontline infantry.',
      indiaImpact: 'Boosts defence exports under Aatmanirbhar Bharat.',
      economyImpact: 'Reduces capital expenditure on imported air defence.',
      defenceImpact: 'Fills air defence gaps along LAC/LOC.',
      futureImplications: 'Paves way for laser-guided next-gen MANPADS.'
    }
  },

  // 2. ECONOMY (July 22, 2026 - Within 7 Days)
  {
    id: 'intel-eco-002',
    title: 'RBI Keeps Repo Rate Unchanged at 6.50%; Projects FY27 GDP Growth at 7.2% with Inflation Tamed at 4.1%',
    summary: 'The RBI Monetary Policy Committee (MPC) unanimously decided to retain the policy Repo Rate at 6.50% while maintaining the stance of "withdrawal of accommodation" to ensure inflation aligns with target while supporting growth.',
    content: `The Reserve Bank of India's Monetary Policy Committee (MPC), headed by Governor Shaktikanta Das, voted unanimously to keep the policy Repo Rate unchanged at 6.50% for the 9th consecutive meeting.\n\nThe Standing Deposit Facility (SDF) rate remains at 6.25% and the Marginal Standing Facility (MSF) rate at 6.75%. Inflation target for FY27 was revised down to 4.1% while GDP growth was pegged at 7.2%.`,
    category: 'Economy',
    subcategory: 'Banking & Monetary Policy',
    source: 'RBI | Gazette',
    sourceUrl: 'https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx',
    publishedAt: '2026-07-22T06:15:00Z',
    importanceScore: 9.8,
    isTrending: true,
    duplicateCount: 7,
    keyFacts: [
      'Repo Rate held steady at 6.50%.',
      'Real GDP growth projected at 7.2% for FY27.',
      'CPI Inflation target revised down to 4.1%.',
      'India Forex Reserves cross historic $710 Billion mark.'
    ],
    dates: ['July 22, 2026'],
    organizations: ['Reserve Bank of India (RBI)', 'MPC', 'Ministry of Finance'],
    personalities: ['Shaktikanta Das (RBI Governor)'],
    keywords: ['Repo Rate', 'MPC', 'CPI Inflation', 'SDF', 'MSF', 'GDP Growth'],
    ministry: 'Ministry of Finance',
    country: 'India',
    readTimeMinutes: 5,
    bookmarked: false,
    examRelevance: {
      exams: ['UPSC CSE', 'CDS', 'CAPF AC'],
      whyItMatters: 'Core Macroeconomics & Monetary Policy under GS Paper 3.',
      prelimsQuestion: 'Which measures form part of monetary transmission mechanism?',
      mainsQuestion: 'Discuss RBI challenges balancing inflation targeting with GDP growth.',
      keywords: ['Headline Inflation', 'Liquidity Adjustment Facility']
    },
    pyqIntelligence: {
      similarPyqAsked: 'If RBI adopts expansionary monetary policy, which would it NOT do?',
      yearAsked: 2020,
      examName: 'UPSC CSE',
      difficulty: 'UPSC Ranker Level',
      patternUsed: 'Application of liquidity rates',
      similarityScore: 96,
      whyAskedReason: 'UPSC tests understanding of statutory monetary tools under RBI Act 1934.',
      probabilityOfRepetition: 'Very High (95%)'
    },
    historicalContext: {
      origin: 'Flexible Inflation Targeting (FIT) framework adopted in 2016.',
      evolutionTimeline: [
        { date: '1934', event: 'Enactment of Reserve Bank of India Act' },
        { date: '2016', event: 'Monetary Policy Committee established' },
        { date: '2026', event: 'Forex reserves hit historic $710B' }
      ],
      landmarkJudgements: [],
      constitutionalArticles: ['Article 246 (7th Schedule Union List Entry 45 - Banking)', 'Article 265 (Taxes Not Imposed Save by Authority of Law)'],
      importantActsAndRules: ['RBI Act 1934 Section 45ZB'],
      keyCommittees: ['Urjit Patel Committee (2014)'],
      previousPolicies: ['Flexible Inflation Targeting (4% +/- 2%)'],
      governmentReports: ['Economic Survey 2025-26']
    },
    mainsFramework: {
      maxMarksPotential: 15,
      idealWordCount: 250,
      timeRequiredMinutes: 9,
      introductionContext: 'The RBI MPC balances disinflation mandates with maintaining India\'s economic growth momentum.',
      corePerspectives: {
        economic: 'Stable repo rate prevents imported inflation.',
        constitutional: 'Statutory mandate under Section 45ZB ensures autonomy.',
        international: 'Cross-border UPI linkages lower remittance friction.'
      },
      keyExaminerExpectations: ['Define Repo, SDF, MSF rates', 'Explain FIT framework'],
      commonStudentMistakes: ['Confusing Repo Rate with Bank Rate'],
      rankerSecretTechnique: 'Flowchart showing monetary transmission path.',
      wayForward: 'Maintain fiscal-monetary coordination.'
    },
    examinersPerspective: {
      whyUpscMayAsk: 'Core macroeconomics question.',
      whyCdsMayAsk: 'Direct question on Repo rate numbers.',
      whyCapfMayAsk: 'Analytical question on inflation.',
      likelyFramingStyle: 'MPC voting and SDF rate statements.',
      trapAreasToAvoid: ['SDF requires no collateral, unlike Reverse Repo.'],
      missedConcepts: ['SDF floor rate introduced in 2022.']
    },
    impactAnalysis: {
      overallImpact: 'Stabilizes borrowing costs for home loans and MSMEs.',
      indiaImpact: 'Positions India as fastest-growing major economy.',
      economyImpact: 'Bolsters investor sentiment.',
      defenceImpact: 'Fiscal stability enables predictable defence capex.',
      futureImplications: 'Rate cuts may begin in Q3 FY27.'
    }
  },

  // 3. INTERNATIONAL (July 22, 2026 - Within 7 Days)
  {
    id: 'intel-ir-003',
    title: 'India-France Strategic Summit: Joint Roadmap Approved for Defence Engine Co-Development & Indo-Pacific Maritime Patrols',
    summary: 'Prime Minister of India and President of France sign groundbreaking defence technology agreement for joint design of 110kN fighter jet engines and expanded joint naval surveillance in the South Indian Ocean.',
    content: `During the High-Level Strategic Summit in New Delhi, India and France inked a milestone agreement to jointly design, develop, and manufacture a 110-kilonewton (kN) thrust engine for India's 5th-generation Advanced Medium Combat Aircraft (AMCA).\n\nThe agreement between Safran Helicopters and DRDO's Gas Turbine Research Establishment (GTRE) guarantees 100% Transfer of Technology (ToT) for critical metallurgy and single-crystal turbine blades. Both nations also launched the Indo-Pacific Blue Horizon Initiative for joint maritime patrols across the Mozambique Channel.`,
    category: 'International',
    subcategory: 'Diplomacy & Defence Partnerships',
    source: 'MEA | Bilateral Treaty',
    sourceUrl: 'https://mea.gov.in/bilateral-documents.htm',
    publishedAt: '2026-07-22T04:45:00Z',
    importanceScore: 9.5,
    isTrending: true,
    duplicateCount: 5,
    keyFacts: [
      'Joint 110kN engine development by GTRE (DRDO) and Safran (France).',
      '100% Transfer of Technology for AMCA 5th-gen fighter jet.',
      'Indo-Pacific Blue Horizon Initiative for joint maritime patrols.',
      'Cooperation on Jaitapur Nuclear Power Project and UNSC reforms.'
    ],
    dates: ['July 22, 2026'],
    organizations: ['MEA India', 'French Armed Forces', 'DRDO GTRE', 'Safran', 'UNSC'],
    personalities: ['Narendra Modi', 'Emmanuel Macron'],
    keywords: ['India-France Relations', 'AMCA Engine', 'Safran', '110kN Engine', 'Indo-Pacific', 'Transfer of Technology'],
    ministry: 'Ministry of External Affairs',
    country: 'India / France',
    readTimeMinutes: 5,
    bookmarked: true,
    examRelevance: {
      exams: ['UPSC CSE', 'CDS', 'CAPF AC', 'SSB'],
      whyItMatters: 'GS Paper 2 International Relations & Bilateral Relations.',
      prelimsQuestion: 'Consider statements regarding the India-France AMCA engine partnership...',
      mainsQuestion: 'Evaluate how India\'s strategic autonomy is reinforced through partnerships with France in the Western Indian Ocean.',
      keywords: ['Strategic Autonomy', 'Transfer of Technology', 'Indo-Pacific Security']
    },
    pyqIntelligence: {
      similarPyqAsked: 'Discuss the strategic significance of the Indo-Pacific region for India.',
      yearAsked: 2021,
      examName: 'UPSC CSE',
      difficulty: 'Moderate',
      patternUsed: 'Bilateral agreement analysis + Geopolitical map questions',
      similarityScore: 91,
      whyAskedReason: 'France is India\'s premier resident Indian Ocean power partner.',
      probabilityOfRepetition: 'High (85%)'
    },
    historicalContext: {
      origin: 'Strategic Partnership established in 1998 post Pokhran-II tests.',
      evolutionTimeline: [
        { date: '1998', event: 'Establishment of Strategic Partnership' },
        { date: '2016', event: 'Inter-Governmental Agreement for 36 Rafale jets' },
        { date: '2026', event: '110kN AMCA jet engine co-development agreement' }
      ],
      landmarkJudgements: [],
      constitutionalArticles: ['Article 51 (Promotion of International Peace & Security - DPSP)', '7th Schedule Union List Entry 10 (Foreign Affairs)'],
      importantActsAndRules: ['Reciprocal Logistics Support Agreement 2018'],
      keyCommittees: [],
      previousPolicies: ['Joint Strategic Vision for IOR (2018)'],
      governmentReports: ['MEA Annual Joint Statements']
    },
    mainsFramework: {
      maxMarksPotential: 15,
      idealWordCount: 250,
      timeRequiredMinutes: 9,
      introductionContext: 'France remains India\'s most trusted European partner anchored by strategic autonomy.',
      corePerspectives: {
        security: 'Co-development of 110kN engine guarantees air dominance.',
        international: 'Joint patrols in Mozambique Channel safeguard choke points.',
        economic: 'Establishes aerospace defence industrial corridors.'
      },
      keyExaminerExpectations: ['Highlight 100% ToT for single-crystal metallurgy'],
      commonStudentMistakes: ['Confusing Safran (France) with GE Aerospace (USA)'],
      rankerSecretTechnique: 'Map of Western Indian Ocean showing Reunion Island joint patrol arcs.',
      wayForward: 'Finalize Jaitapur nuclear reactor civil liability framework.'
    },
    examinersPerspective: {
      whyUpscMayAsk: 'Bilateral strategic partnership with major global power.',
      whyCdsMayAsk: 'Naval joint exercises (VARUNA) and jet engine details.',
      whyCapfMayAsk: 'Maritime security and choke point protection.',
      likelyFramingStyle: 'Match the exercise / treaty names.',
      trapAreasToAvoid: ['France is an Indian Ocean resident power via Reunion Island.'],
      missedConcepts: ['Single-crystal turbine blade technology is the hardest metallurgy barrier.']
    },
    impactAnalysis: {
      overallImpact: 'Eliminates vulnerability in high-thrust jet engine tech.',
      indiaImpact: 'Establishes India as an aerospace manufacturing hub.',
      economyImpact: 'Generates high-tech jobs in aerospace corridors.',
      defenceImpact: 'Ensures domestic propulsion autonomy for IAF.',
      futureImplications: 'Sets template for defence ToT without conditionalities.'
    }
  },

  // 4. INTERNATIONAL (July 20, 2026 - Within 7 Days)
  {
    id: 'intel-ir-004',
    title: 'BIMSTEC Summit 2026: Master Plan Approved for Transport Connectivity & Maritime Security Grid',
    summary: 'The 6th BIMSTEC Leaders Summit adopted the "Bangkok Vision 2030" and approved the Master Plan for Transport Connectivity connecting Bay of Bengal nations from Kolkata to Dawei.',
    content: `Leaders of the 7 BIMSTEC member states (India, Bangladesh, Bhutan, Nepal, Sri Lanka, Myanmar, Thailand) unanimously adopted the Master Plan for Transport Connectivity during the 6th Summit.\n\nThe initiative connects deep-sea ports including Syamaprasad Mookerjee Port Kolkata, Matarbari (Bangladesh), and Dawei (Myanmar). India agreed to lead the Security Pillar covering Maritime Security, Counter-Terrorism, and Cyber Threat Intelligence sharing.`,
    category: 'International',
    subcategory: 'Regional Organizations & Bay of Bengal',
    source: 'MEA | BIMSTEC Secretariat',
    sourceUrl: 'https://bimstec.org/summit-2026',
    publishedAt: '2026-07-20T11:20:00Z',
    importanceScore: 9.2,
    isTrending: true,
    duplicateCount: 3,
    keyFacts: [
      'BIMSTEC 6th Summit adopts Bangkok Vision 2030.',
      '7 Member countries: 5 South Asian (India, BD, BT, NP, SL) + 2 Southeast Asian (MM, TH).',
      'India leads Security Pillar (Maritime, Counter-Terrorism, Cyber).',
      'Integrates Kaladan Multi-Modal Transport Project and Trilateral Highway.'
    ],
    dates: ['July 20, 2026'],
    organizations: ['BIMSTEC', 'MEA India', 'ASEAN'],
    personalities: ['Narendra Modi', 'Paetongtarn Shinawatra'],
    keywords: ['BIMSTEC', 'Bay of Bengal', 'Act East Policy', 'Neighbourhood First', 'Kaladan Project'],
    ministry: 'Ministry of External Affairs',
    country: 'India / Bay of Bengal',
    readTimeMinutes: 4,
    bookmarked: false,
    examRelevance: {
      exams: ['UPSC CSE', 'CAPF AC', 'CDS'],
      whyItMatters: 'GS Paper 2 International Organizations & Act East Policy.',
      prelimsQuestion: 'Which of the following countries are members of BOTH SAARC and BIMSTEC?',
      mainsQuestion: 'BIMSTEC is increasingly viewed as an alternative bridge connecting South Asia with Southeast Asia amid SAARC paralysis. Discuss.',
      keywords: ['BIMSTEC', 'Act East', 'Neighbourhood First', 'Bay of Bengal']
    },
    pyqIntelligence: {
      similarPyqAsked: 'Evaluate the regional connectivity initiatives under BIMSTEC and SAARC.',
      yearAsked: 2022,
      examName: 'UPSC CSE',
      difficulty: 'Moderate',
      patternUsed: 'Member country comparison and connectivity routes',
      similarityScore: 93,
      whyAskedReason: 'UPSC tests member country overlap between SAARC and BIMSTEC.',
      probabilityOfRepetition: 'High (88%)'
    },
    historicalContext: {
      origin: 'Established in 1997 through Bangkok Declaration.',
      evolutionTimeline: [
        { date: '1997', event: 'BIST-EC formed with 4 members' },
        { date: '2004', event: 'Renamed BIMSTEC with Nepal and Bhutan inclusion' },
        { date: '2026', event: 'Adoption of Bangkok Vision 2030 Master Plan' }
      ],
      landmarkJudgements: [],
      constitutionalArticles: [],
      importantActsAndRules: [],
      keyCommittees: [],
      previousPolicies: ['BIMSTEC Free Trade Area Framework'],
      governmentReports: ['MEA Annual Report']
    },
    mainsFramework: {
      maxMarksPotential: 15,
      idealWordCount: 250,
      timeRequiredMinutes: 9,
      introductionContext: 'BIMSTEC acts as a natural bridge connecting India\'s Neighbourhood First and Act East policies.',
      corePerspectives: {
        security: 'Maritime security grid counters extra-regional naval expansion in Bay of Bengal.',
        economic: 'Unlocks North-East India trade via Chittagong and Sittwe ports.',
        constitutional: 'Enhances cross-border disaster management under SAGAR vision.'
      },
      keyExaminerExpectations: ['List 7 member countries correctly', 'Highlight Security Pillar led by India'],
      commonStudentMistakes: ['Including Pakistan or Maldives in BIMSTEC'],
      rankerSecretTechnique: 'Diagram of Bay of Bengal showing Kaladan project and Trilateral Highway route.',
      wayForward: 'Finalize BIMSTEC Free Trade Agreement to boost intra-regional trade.'
    },
    examinersPerspective: {
      whyUpscMayAsk: 'Regional multilateral organization under GS-2.',
      whyCdsMayAsk: 'BIMSTEC Secretariat location (Dhaka) and member list.',
      whyCapfMayAsk: 'Border security and counter-terrorism coordination.',
      likelyFramingStyle: 'Which of the following is NOT a BIMSTEC member?',
      trapAreasToAvoid: ['Maldives and Pakistan are NOT members of BIMSTEC.'],
      missedConcepts: ['BIMSTEC Secretariat is headquartered in Dhaka, Bangladesh.']
    },
    impactAnalysis: {
      overallImpact: 'Strengthens regional economic integration across the Bay of Bengal.',
      indiaImpact: 'Transforms North-Eastern states into economic gateways.',
      economyImpact: 'Lowers logistics cost for maritime trade.',
      defenceImpact: 'Secures vital naval lines of communication in Bay of Bengal.',
      futureImplications: 'Paves way for seamless coastal shipping agreements.'
    }
  },

  // 5. AI & TECH (July 21, 2026 - Within 7 Days)
  {
    id: 'intel-ai-005',
    title: 'Cabinet Approves Rs 10,372 Cr IndiaAI Mission for 10,000 GPU Supercomputing Cloud & Sovereign LLMs in 22 Languages',
    summary: 'Union Cabinet approved the national IndiaAI Mission establishing a Public-Private Partnership (PPP) compute capacity of 10,000 GPUs, establishing IndiaAI Innovation Centre for developing indigenous foundational AI models.',
    content: `The Union Cabinet approved a financial outlay of Rs 10,372 Crore for the national IndiaAI Mission. The flagship program will establish a public computing infrastructure of 10,000 graphics processing units (GPUs) made available to Indian startups, researchers, and public institutions at subsidized rates.\n\nThe mission comprises six pillars: IndiaAI Compute Capacity, IndiaAI Innovation Centre (for developing indigenous sovereign Large Language Models in 22 Indian languages), IndiaAI Datasets Platform, IndiaAI Application Development Initiative, IndiaAI FutureSkills, and IndiaAI Startup Financing.`,
    category: 'AI & Tech',
    subcategory: 'Artificial Intelligence & Supercomputing',
    source: 'MeitY | PIB Tech',
    sourceUrl: 'https://pib.gov.in/PressReleaseDetail.aspx?PRID=IndiaAI-Mission-2026',
    publishedAt: '2026-07-21T14:00:00Z',
    importanceScore: 9.7,
    isTrending: true,
    duplicateCount: 6,
    keyFacts: [
      'Rs 10,372 Crore financial outlay for IndiaAI Mission.',
      'Public-Private Partnership for 10,000+ GPU supercomputing cloud.',
      'IndiaAI Innovation Centre to build sovereign LLMs in 22 official languages.',
      'Executed by Digital India Corporation under MeitY.'
    ],
    dates: ['July 21, 2026'],
    organizations: ['MeitY', 'Digital India Corporation', 'C-DAC', 'NITI Aayog'],
    personalities: ['Ashwini Vaishnaw (IT Minister)'],
    keywords: ['IndiaAI Mission', '10,000 GPUs', 'Sovereign AI', 'MeitY', 'LLM', 'Supercomputing'],
    ministry: 'Ministry of Electronics and Information Technology',
    country: 'India',
    readTimeMinutes: 5,
    bookmarked: true,
    examRelevance: {
      exams: ['UPSC CSE', 'CDS', 'CAPF AC', 'AFCAT'],
      whyItMatters: 'GS Paper 3 Science & Technology (Artificial Intelligence & Compute Infrastructure).',
      prelimsQuestion: 'Consider statements regarding the IndiaAI Mission approved by MeitY...',
      mainsQuestion: 'Evaluate the role of sovereign AI infrastructure in preventing digital neo-colonialism and ensuring inclusive digital governance in India.',
      keywords: ['Sovereign AI', 'GPU Cloud', 'Digital Public Infrastructure', 'Vernacular AI']
    },
    pyqIntelligence: {
      similarPyqAsked: 'With reference to Artificial Intelligence and National Supercomputing Mission, consider statements...',
      yearAsked: 2020,
      examName: 'UPSC CSE',
      difficulty: 'UPSC Ranker Level',
      patternUsed: 'Mission pillars and implementing ministry identification',
      similarityScore: 95,
      whyAskedReason: 'UPSC tests government technology initiatives and digital public infrastructure.',
      probabilityOfRepetition: 'Very High (94%)'
    },
    historicalContext: {
      origin: 'Conceived to bridge the AI compute divide between Western tech monopolies and Indian developers.',
      evolutionTimeline: [
        { date: '2015', event: 'National Supercomputing Mission (NSM) launched by C-DAC' },
        { date: '2020', event: 'NITI Aayog National Strategy for Artificial Intelligence' },
        { date: '2026-07-21', event: 'Cabinet approval of Rs 10,372 Cr IndiaAI Mission' }
      ],
      landmarkJudgements: [],
      constitutionalArticles: ['Article 39(b) - Equitable distribution of material resources'],
      importantActsAndRules: ['Digital Personal Data Protection (DPDP) Act 2023'],
      keyCommittees: ['K. VijayRaghavan Committee on AI Infrastructure'],
      previousPolicies: ['National Strategy for AI (#AIforAll)'],
      governmentReports: ['MeitY Working Group Report on AI Infrastructure']
    },
    mainsFramework: {
      maxMarksPotential: 15,
      idealWordCount: 250,
      timeRequiredMinutes: 9,
      introductionContext: 'Compute is the oil of the 21st century; sovereign GPU infrastructure guarantees India\'s technological autonomy.',
      corePerspectives: {
        economic: 'Democratizes high-end AI compute for grassroots startups.',
        socialEthical: 'Sovereign LLMs in 22 languages bridge the linguistic digital divide.',
        security: 'Prevents sensitive national data leakage to overseas AI servers.'
      },
      keyExaminerExpectations: ['List 6 pillars of IndiaAI Mission', 'Mention 10,000 GPU PPP compute target'],
      commonStudentMistakes: ['Confusing IndiaAI Mission with C-DAC\'s National Supercomputing Mission'],
      rankerSecretTechnique: 'Diagram showing DPI Layer -> Sovereign GPU Cloud -> Vernacular AI Applications.',
      wayForward: 'Establish green data centers powered by renewable energy to mitigate GPU power consumption.'
    },
    examinersPerspective: {
      whyUpscMayAsk: 'High-outlay technology mission under MeitY.',
      whyCdsMayAsk: 'Supercomputing GPU targets and implementing agency.',
      whyCapfMayAsk: 'Data sovereignty and cyber security implications.',
      likelyFramingStyle: 'Multi-statement pillar matching question.',
      trapAreasToAvoid: ['IndiaAI Mission is implemented by MeitY, NOT NITI Aayog.'],
      missedConcepts: ['IndiaAI Datasets Platform provides non-personal anonymized data for research.']
    },
    impactAnalysis: {
      overallImpact: 'Positions India among top 5 global AI compute nations.',
      indiaImpact: 'Fosters indigenous AI startup ecosystem.',
      economyImpact: 'Drives high-tech AI software export services.',
      defenceImpact: 'Enables military AI tactical model training on sovereign GPUs.',
      futureImplications: 'Serves as global model for Global South digital sovereignty.'
    }
  },

  // 6. SCIENCE & ENVIRONMENT (July 21, 2026 - Within 7 Days)
  {
    id: 'intel-sci-006',
    title: 'ISRO Gaganyaan TV-D2 Crew Escape Abort Test Executed Successfully at Mach 1.3 at Altitude 17 km',
    summary: 'ISRO successfully conducted the Test Vehicle Abort Mission-2 (TV-D2) for Gaganyaan, demonstrating the automated Crew Escape System (CES) performance under high dynamic pressure conditions in the Bay of Bengal.',
    content: `The Indian Space Research Organisation (ISRO) achieved another major milestone toward India's first human spaceflight mission by successfully executing the Gaganyaan Test Vehicle Development Flight-2 (TV-D2) from Satish Dhawan Space Centre (SDSC) SHAR, Sriharikota.\n\nThe single-stage liquid rocket launched the Crew Module and Crew Escape System (CES) to an altitude of 17 km at Mach 1.3 velocity before generating a simulated emergency abort command. The CES successfully jettisoned the Crew Module, which deployed its apex drogue parachutes and splashdown safely in the Bay of Bengal 10 km off Sriharikota, retrieved by Indian Navy divers.`,
    category: 'Science & Environment',
    subcategory: 'ISRO & Space Exploration',
    source: 'ISRO | PIB Science',
    sourceUrl: 'https://isro.gov.in/TV-D2-Success.html',
    publishedAt: '2026-07-21T09:00:00Z',
    importanceScore: 9.5,
    isTrending: true,
    duplicateCount: 5,
    keyFacts: [
      'Gaganyaan TV-D2 mission executes simulated abort at Mach 1.3 velocity at 17 km altitude.',
      'Crew Escape System (CES) jettisoned Crew Module safely into Bay of Bengal.',
      'Retrieved by Indian Navy Eastern Fleet & ISRO recovery team.',
      'Paves way for uncrewed Gaganyaan G1 orbit flight.'
    ],
    dates: ['July 21, 2026'],
    organizations: ['ISRO', 'Indian Navy', 'SHAR Sriharikota'],
    personalities: ['S. Somanath (ISRO Chairman)', 'Group Captain Prashanth Nair (Gaganyaan Astronaut)'],
    keywords: ['Gaganyaan', 'TV-D2', 'Crew Escape System', 'ISRO', 'Sriharikota', 'Human Spaceflight'],
    ministry: 'Department of Space',
    country: 'India',
    readTimeMinutes: 4,
    bookmarked: false,
    examRelevance: {
      exams: ['UPSC CSE', 'CDS', 'AFCAT', 'NDA', 'SSB'],
      whyItMatters: 'GS Paper 3 Science & Technology (Space Technology & Gaganyaan Mission).',
      prelimsQuestion: 'Consider statements regarding ISRO Gaganyaan Crew Escape System tested during TV-D2 flight...',
      mainsQuestion: 'Detail the safety and technological challenges involved in human spaceflight missions like Gaganyaan.',
      keywords: ['Crew Escape System', 'Gaganyaan', 'Human Spaceflight', 'ECLSS']
    },
    pyqIntelligence: {
      similarPyqAsked: 'What is the significance of the Gaganyaan mission for India\'s space programme?',
      yearAsked: 2021,
      examName: 'UPSC CSE',
      difficulty: 'Moderate',
      patternUsed: 'Mission component and safety system parameters',
      similarityScore: 96,
      whyAskedReason: 'UPSC tests ISRO human spaceflight milestones.',
      probabilityOfRepetition: 'Very High (93%)'
    },
    historicalContext: {
      origin: 'Announced by Prime Minister in 2018 Independence Day address.',
      evolutionTimeline: [
        { date: '2018', event: 'Gaganyaan mission announced' },
        { date: '2023-10', event: 'TV-D1 test flight abort successful' },
        { date: '2026-07-21', event: 'TV-D2 test flight abort executed successfully at Mach 1.3' }
      ],
      landmarkJudgements: [],
      constitutionalArticles: [],
      importantActsAndRules: ['Indian Space Policy 2023'],
      keyCommittees: [],
      previousPolicies: [],
      governmentReports: ['ISRO Annual Report']
    },
    mainsFramework: {
      maxMarksPotential: 15,
      idealWordCount: 250,
      timeRequiredMinutes: 9,
      introductionContext: 'Crew safety is the paramount requirement for human spaceflight; TV-D2 validates ISRO\'s fault-tolerant design.',
      corePerspectives: {
        security: 'Strategic space domain technological maturity.',
        economic: 'Spurs domestic aerospace manufacturing ecosystem.',
        international: 'Makes India 4th country with crewed launch capability.'
      },
      keyExaminerExpectations: ['Explain Crew Escape System (CES) mechanism', 'Mention Indian Navy retrieval role'],
      commonStudentMistakes: ['Confusing TV-D2 abort flight with orbital uncrewed Gaganyaan G1 flight'],
      rankerSecretTechnique: 'Flowchart showing Launch -> Abort Command -> CES Motor Separation -> Parachute Deployment -> Naval Retrieval.',
      wayForward: 'Complete final environmental control life support system (ECLSS) qualifying tests.'
    },
    examinersPerspective: {
      whyUpscMayAsk: 'ISRO space technology breakthrough.',
      whyCdsMayAsk: 'TV-D2 abort altitude (17 km) and velocity (Mach 1.3).',
      whyCapfMayAsk: 'Joint ISRO-Navy emergency retrieval procedures.',
      likelyFramingStyle: 'Statement-based elimination on escape system propulsion.',
      trapAreasToAvoid: ['TV-D2 used a single-stage liquid rocket, NOT LVM3.'],
      missedConcepts: ['Crew Escape System uses fast-burning solid motors for instant separation.']
    },
    impactAnalysis: {
      overallImpact: 'Demonstrates 100% human-rating reliability for Gaganyaan.',
      indiaImpact: 'Boosts national pride and scientific innovation.',
      economyImpact: 'Creates indigenous industrial capability in aerospace deceleration systems.',
      defenceImpact: 'Enhances high-altitude emergency ejection technologies.',
      futureImplications: 'Sets stage for 2028 Bharatiya Antariksha Station launch.'
    }
  },

  // 7. UPSC POLITY (July 21, 2026 - Within 7 Days)
  {
    id: 'intel-pol-007',
    title: 'Union Cabinet Approves 129th Constitutional Amendment Bill for Simultaneous Elections (One Nation One Election)',
    summary: 'The Union Cabinet approved the draft framework of the 129th Constitutional Amendment Bill implementing the Kovind High-Level Committee recommendations on simultaneous Lok Sabha and State Assembly polls.',
    content: `The Union Cabinet chaired by Prime Minister approved the historic 129th Constitutional Amendment Bill to enable simultaneous elections to the Lok Sabha and State Legislative Assemblies.\n\nThe Bill incorporates key recommendations of the Ram Nath Kovind High-Level Committee on One Nation One Election. It proposes amendments to Article 83 (Duration of Houses of Parliament) and Article 172 (Duration of State Assemblies) to align legislative tenures.\n\nTo ensure single electoral roll management across national, state, and local body elections, Article 325 will be amended to create a unified voter database under the Election Commission of India in consultation with State Election Commissions.`,
    category: 'UPSC Polity',
    subcategory: 'Electoral Reforms & Constitution',
    source: 'PIB | Gazette | Law Ministry',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=OENOE-Bill-2026',
    publishedAt: '2026-07-21T10:15:00Z',
    importanceScore: 9.9,
    isTrending: true,
    duplicateCount: 8,
    keyFacts: [
      '129th Constitutional Amendment Bill introduced following Kovind Committee Report.',
      'Amends Article 83 and Article 172 to align Lok Sabha and Assembly tenures.',
      'Single unified voter list via Article 325 amendment under Election Commission.',
      'Two-phase implementation: Lok Sabha + Assemblies in Phase 1, Local Bodies within 100 days in Phase 2.'
    ],
    dates: ['July 21, 2026'],
    organizations: ['Election Commission of India', 'Law Commission', 'Union Cabinet'],
    personalities: ['Ram Nath Kovind (Former President of India)', 'Arjun Ram Meghwal (Law Minister)'],
    keywords: ['One Nation One Election', 'Constitutional Amendment', 'Article 83', 'Article 172', 'Article 325', 'ECI'],
    ministry: 'Ministry of Law and Justice',
    country: 'India',
    readTimeMinutes: 5,
    bookmarked: true,
    examRelevance: {
      exams: ['UPSC CSE', 'CAPF AC', 'State PCS'],
      whyItMatters: 'GS Paper 2 Indian Polity & Constitution.',
      prelimsQuestion: 'Which Constitutional Articles require amendment to enable simultaneous elections?',
      mainsQuestion: 'Critically analyze constitutional, logistical, and federal implications of One Nation One Election.',
      keywords: ['Simultaneous Elections', 'Federal Structure', 'Basic Structure Doctrine', 'Article 368']
    },
    pyqIntelligence: {
      similarPyqAsked: 'Simultaneous elections would require constitutional amendments and ratification by states. Discuss.',
      yearAsked: 2019,
      examName: 'UPSC CSE',
      difficulty: 'UPSC Ranker Level',
      patternUsed: 'Constitutional amendment process + Federal ratification criteria',
      similarityScore: 97,
      whyAskedReason: 'Tests deep knowledge of Article 368 special majority vs state ratification rules.',
      probabilityOfRepetition: 'Very High (98%)'
    },
    historicalContext: {
      origin: 'Simultaneous elections were standard practice in India during 1951-1967.',
      evolutionTimeline: [
        { date: '1967-68', event: 'Premature dissolution of State Assemblies disrupted simultaneous schedule' },
        { date: '1983', event: '170th Law Commission Report recommended simultaneous polls' },
        { date: '2024', event: 'Ram Nath Kovind High-Level Committee submitted report' },
        { date: '2026-07-21', event: 'Union Cabinet approved 129th Constitutional Amendment Bill' }
      ],
      landmarkJudgements: ['S.R. Bommai v. Union of India (1994)'],
      constitutionalArticles: ['Article 83', 'Article 172', 'Article 325', 'Article 356', 'Article 368(2)'],
      importantActsAndRules: ['Representation of the People Act 1951'],
      keyCommittees: ['Kovind Committee (2024)', '170th Law Commission Report (1999)'],
      previousPolicies: ['Model Code of Conduct streamlining'],
      governmentReports: ['High-Level Committee Report on One Nation One Election']
    },
    mainsFramework: {
      maxMarksPotential: 15,
      idealWordCount: 250,
      timeRequiredMinutes: 9,
      introductionContext: 'Simultaneous elections aim to curb perpetual election cycles and policy paralysis.',
      corePerspectives: {
        constitutional: 'Requires Article 368 special majority and state ratification for Article 325.',
        economic: 'Saves over Rs 50,000 Crore in cumulative election expenditure.',
        socialEthical: 'Reduces voter fatigue and campaign polarization.'
      },
      keyExaminerExpectations: ['Differentiate Phase 1 and Phase 2', 'Analyze Federalism concerns'],
      commonStudentMistakes: ['Failing to mention 1952-1967 history'],
      rankerSecretTechnique: 'Cite German "Constructive Vote of No Confidence" model.',
      wayForward: 'Build inter-party consensus through a Select Committee.'
    },
    examinersPerspective: {
      whyUpscMayAsk: 'Landmark constitutional amendment impacting Federal Structure.',
      whyCdsMayAsk: 'Constitutional Articles 83 & 172 numbers.',
      whyCapfMayAsk: 'Internal security force deployment optimization.',
      likelyFramingStyle: 'Which Articles require state ratification for amendment?',
      trapAreasToAvoid: ['Unified voter roll under Article 325 requires 50% state ratification.'],
      missedConcepts: ['Constructive Vote of No Confidence prevents mid-term collapse.']
    },
    impactAnalysis: {
      overallImpact: 'Transforms governance to focused 5-year developmental cycles.',
      indiaImpact: 'Optimizes security force deployment.',
      economyImpact: 'Dramatically cuts election management costs.',
      defenceImpact: 'Reduces CAPF deployment frequency.',
      futureImplications: 'Establishes unified electoral roll framework.'
    }
  },

  // 8. UPSC POLITY (July 20, 2026 - Within 7 Days)
  {
    id: 'intel-pol-008',
    title: 'Supreme Court 5-Judge Constitution Bench Clarifies Scope of Personal Immunity under Article 361',
    summary: 'The Supreme Court ruled that while Article 361 provides absolute immunity to Governors during their tenure, post-tenure criminal investigations are permissible and official actions remain subject to judicial review if proven mala fide.',
    content: `A 5-judge Constitution Bench of the Supreme Court, headed by Chief Justice of India, issued a authoritative clarification regarding gubernatorial immunity under Article 361 of the Constitution.\n\nThe Court held that while Article 361(2) creates an absolute bar against instituting criminal proceedings against a Governor during their term of office, this immunity is temporary. Once a Governor demits office, law enforcement agencies are free to register FIRs and conduct investigations for acts committed prior to or during their tenure.\n\nFurthermore, the Bench reiterated that immunity under Article 361(1) for official acts does not protect executive actions that are colorable, ultra vires, or motivated by mala fides, which remain fully open to judicial review by High Courts and the Supreme Court.`,
    category: 'UPSC Polity',
    subcategory: 'Judiciary & Constitutional Law',
    source: 'Supreme Court of India | LiveLaw',
    sourceUrl: 'https://main.sci.gov.in/judgments/Art361-2026.pdf',
    publishedAt: '2026-07-20T14:30:00Z',
    importanceScore: 9.6,
    isTrending: false,
    duplicateCount: 4,
    keyFacts: [
      'SC 5-Judge Constitution Bench clarification on Article 361.',
      'Article 361 immunity for Governors is temporary during tenure only.',
      'Post-tenure criminal investigation & FIR registration permissible.',
      'Mala fide official acts remain subject to judicial review under Article 32 & 226.'
    ],
    dates: ['July 20, 2026'],
    organizations: ['Supreme Court of India', 'High Courts', 'Ministry of Home Affairs'],
    personalities: ['CJI B.R. Gavai'],
    keywords: ['Article 361', 'Gubernatorial Immunity', 'Supreme Court', 'Judicial Review', 'Mala Fide', 'Constitution Bench'],
    ministry: 'Ministry of Law and Justice',
    country: 'India',
    readTimeMinutes: 5,
    bookmarked: false,
    examRelevance: {
      exams: ['UPSC CSE', 'CAPF AC', 'State PCS'],
      whyItMatters: 'GS Paper 2 Constitutional Law & Office of the Governor.',
      prelimsQuestion: 'Which of the following immunities are provided to the President and Governors under Article 361?',
      mainsQuestion: 'The office of the Governor has frequently been a flashpoint in Centre-State relations. How does the Supreme Court judgment on Article 361 balance official immunity with rule of law?',
      keywords: ['Article 361', 'Office of Governor', 'Rule of Law', 'Judicial Review']
    },
    pyqIntelligence: {
      similarPyqAsked: 'Examine the constitutional position and immunity enjoyed by the Governor under Article 361.',
      yearAsked: 2018,
      examName: 'UPSC CSE',
      difficulty: 'UPSC Ranker Level',
      patternUsed: 'Constitutional article clause verification',
      similarityScore: 98,
      whyAskedReason: 'UPSC frequently tests constitutional immunity exceptions and Supreme Court bench rulings.',
      probabilityOfRepetition: 'Very High (96%)'
    },
    historicalContext: {
      origin: 'Article 361 enacted to protect head of state from vexatious litigation during official duties.',
      evolutionTimeline: [
        { date: '1950', event: 'Article 361 incorporated into Indian Constitution' },
        { date: '1974', event: 'Shamsher Singh v. State of Punjab ruling' },
        { date: '2026-07-20', event: '5-Judge Bench clarification on post-tenure criminal investigation' }
      ],
      landmarkJudgements: ['Rameshwar Prasad v. Union of India (2006)', 'BP Singhal v. Union of India (2010)'],
      constitutionalArticles: ['Article 14', 'Article 21', 'Article 163', 'Article 361'],
      importantActsAndRules: ['Code of Criminal Procedure (CrPC) / Bharatiya Nagarik Suraksha Sanhita (BNSS)'],
      keyCommittees: ['Sarkaria Commission (1988)', 'Punchhi Commission (2010)'],
      previousPolicies: [],
      governmentReports: ['Law Commission Reports on Immunity']
    },
    mainsFramework: {
      maxMarksPotential: 15,
      idealWordCount: 250,
      timeRequiredMinutes: 9,
      introductionContext: 'No individual is above the law; Article 361 immunity must harmonize with Article 14 equality before law.',
      corePerspectives: {
        constitutional: 'Immunity protects official dignity but cannot become a safe haven for personal crimes.',
        legal: 'Post-tenure investigation ensures accountability without disturbing tenure functioning.',
        federal: 'Prevents misuse of gubernatorial office for political maneuvers.'
      },
      keyExaminerExpectations: ['Distinguish Article 361(1) civil/official acts from Article 361(2) criminal immunity', 'Mention mala fide exception'],
      commonStudentMistakes: ['Assuming Article 361 gives permanent lifetime immunity'],
      rankerSecretTechnique: 'Diagram showing Official Acts (Qualified Immunity) vs Personal Criminal Acts (Post-tenure Investigation).',
      wayForward: 'Implement Punchhi Commission guidelines on fixed 5-year tenure for Governors.'
    },
    examinersPerspective: {
      whyUpscMayAsk: 'Landmark Constitution Bench verdict on GS-2 Polity.',
      whyCdsMayAsk: 'Article 361 clause identification.',
      whyCapfMayAsk: 'Rule of Law vs Executive Immunity.',
      likelyFramingStyle: 'Which of the following statements regarding Governor immunity under Article 361 is correct?',
      trapAreasToAvoid: ['Civil proceedings CAN be instituted during tenure if 2 months prior written notice is served.'],
      missedConcepts: ['Article 361(4) allows civil suits regarding personal acts provided 2 months notice is given.']
    },
    impactAnalysis: {
      overallImpact: 'Strengthens constitutionalism and rule of law in India.',
      indiaImpact: 'Deterrence against illegal executive decisions by constitutional heads.',
      economyImpact: 'Ensures legal certainty for government contracts.',
      defenceImpact: 'N/A',
      futureImplications: 'Sets global precedent for central executive immunity limitations.'
    }
  }
];

export const INITIAL_BRIEFING: DailyBriefing = {
  id: 'briefing-2026-07-22',
  date: '2026-07-22',
  title: 'Morning Intelligence Brief - 22 July 2026',
  summary: 'Top strategic updates across Defence missile tests, RBI Repo Rate decision, India-France jet engine ToT pact, IndiaAI 10k GPU cloud approval, and ISRO Gaganyaan crew escape test.',
  topHeadlines: INITIAL_ARTICLES,
  defenceUpdates: [INITIAL_ARTICLES[0]],
  economyUpdates: [INITIAL_ARTICLES[1]],
  internationalUpdates: [INITIAL_ARTICLES[2], INITIAL_ARTICLES[3]],
  aiTechUpdates: [INITIAL_ARTICLES[4]],
  scienceUpdates: [INITIAL_ARTICLES[5]],
  upscUpdates: [INITIAL_ARTICLES[6], INITIAL_ARTICLES[7]],
  editorialAnalysis: `Today's strategic headlines reflect India's multi-pronged push toward self-reliance (Aatmanirbharta) across defence propulsion, artificial intelligence infrastructure, and space exploration. The RBI's macroeconomic stability provides the necessary fiscal cushion for these capital-intensive national projects. Simultaneously, the Supreme Court's constitutional interpretation of Article 361 reinforces democratic checks and balances amidst expanding executive responsibilities.`,
  revisionNotes: [
    'DRDO VSHORADS: Man Portable Air Defence System using Reaction Control System (RCS) tested at ITR Chandipur.',
    'RBI MPC Decision: Repo Rate at 6.50%, Real GDP Growth target 7.2%, CPI inflation at 4.1%, Forex reserves $710B.',
    'India-France Engine Deal: Joint 110kN engine for AMCA 5th-gen fighter with 100% ToT between GTRE & Safran.',
    'BIMSTEC Summit: Master Plan for Transport Connectivity & Security Pillar led by India.',
    'IndiaAI Mission: Rs 10,372 Cr outlay for 10,000 GPUs PPP cloud & sovereign LLMs in 22 languages.',
    'Gaganyaan TV-D2: Crew Escape System abort executed at Mach 1.3, altitude 17 km in Bay of Bengal.',
    'Polity (129th Bill): One Nation One Election Bill introduced to align Lok Sabha & Assembly tenures.',
    'Polity (Art 361): SC 5-judge bench clarifies post-tenure inquiry permissible and mala fide official acts subject to judicial review.'
  ],
  keyTakeaways: [
    'Defence indigenization accelerating across short-range air defence and 5th-generation propulsion.',
    'Monetary policy remains prudently balanced to nurture 7.2% GDP growth while anchoring inflation expectations.',
    'Technology sovereignty now explicitly includes GPU supercomputing and localized sovereign AI models.'
  ]
};

export const INITIAL_PRACTICE_SUITE: PracticeSuite = {
  id: 'practice-2026-07-22',
  date: '2026-07-22',
  upscPrelimsMcqs: [
    {
      id: 'mcq-upsc-1',
      question: 'With reference to the Very Short Range Air Defence System (VSHORADS) tested by DRDO, consider the following statements:\nStatement-I: VSHORADS incorporates a miniaturized Reaction Control System (RCS) to enable rapid low-altitude target interception in thin mountain air.\nStatement-II: The missile is propelled by an advanced liquid-fuel scramjet engine developed by GTRE.\nWhich one of the following is correct in respect of the above statements?',
      options: [
        'Both Statement-I and Statement-II are correct and Statement-II is the correct explanation for Statement-I',
        'Both Statement-I and Statement-II are correct but Statement-II is NOT the correct explanation for Statement-I',
        'Statement-I is correct but Statement-II is incorrect',
        'Statement-I is incorrect but Statement-II is correct'
      ],
      answerIndex: 2,
      explanation: 'Statement-I is correct: VSHORADS uses a Reaction Control System (RCS) developed by RCI Hyderabad for high-altitude maneuverability. Statement-II is incorrect: VSHORADS uses a dual-thrust solid propellant rocket motor, NOT a liquid scramjet.',
      examType: 'UPSC CSE',
      category: 'Defence',
      pyqConnection: 'Matches UPSC CSE 2023 statement-based assertion pattern on indigenous DRDO missile propulsion systems.',
      eliminationTrick: 'Look out for engine type swaps: MANPADS short-range missiles never use heavy liquid scramjets; they require instantaneous solid propellant ignition.',
      staticTopicLink: 'Missile Propulsion Systems (Solid vs Liquid vs Scramjet) & MANPADS Classification',
      difficulty: 'UPSC Ranker Level',
      repetitionProbability: 'Very High (92%)'
    },
    {
      id: 'mcq-upsc-2',
      question: 'Consider the following statements regarding the Monetary Policy Committee (MPC) of the Reserve Bank of India:\n1. The MPC consists of six members, including three from the RBI and three nominated by the Central Government.\n2. The RBI Governor has a casting vote in the event of an equality of votes.\n3. The MPC is mandated to meet at least eight times in a financial year.\nWhich of the statements given above are correct?',
      options: ['1 and 2 only', '2 and 3 only', '1 and 3 only', '1, 2 and 3'],
      answerIndex: 0,
      explanation: 'Statements 1 and 2 are correct. Under Section 45ZB of the RBI Act 1934, the MPC has 6 members and the Governor has a casting vote. Statement 3 is incorrect as the MPC is mandated to meet at least 4 times a year (usually meets 6 times).',
      examType: 'UPSC CSE',
      category: 'Economy',
      pyqConnection: 'Matches UPSC CSE 2017 & 2020 Prelims questions on statutory committees under the RBI Act 1934.',
      eliminationTrick: 'Extreme statutory numbers (like "mandated to meet 8 times") are classic UPSC traps. Mandatory minimum is 4 times per year.',
      staticTopicLink: 'RBI Act 1934 Section 45ZB & Flexible Inflation Targeting Framework',
      difficulty: 'Moderate',
      repetitionProbability: 'High (88%)'
    }
  ],
  cdsMcqs: [
    {
      id: 'mcq-cds-1',
      question: 'What type of propulsion system powers the VSHORADS missile system developed indigenously by DRDO?',
      options: ['Liquid Scramjet', 'Dual-thrust Solid Motor', 'Turbojet Engine', 'Nuclear Thermal Engine'],
      answerIndex: 1,
      explanation: 'VSHORADS uses a dual-thrust solid propellant rocket motor designed for instant reaction times.',
      examType: 'CDS',
      category: 'Defence',
      pyqConnection: 'Matches CDS 2022 Defence Tech questions testing missile propulsion and DRDO lab origins.',
      staticTopicLink: 'Indian Armed Forces Missile Systems',
      difficulty: 'Moderate'
    },
    {
      id: 'mcq-cds-2',
      question: 'Which French company partnered with DRDO Gas Turbine Research Establishment (GTRE) for 110kN engine development?',
      options: ['Dassault Aviation', 'Safran', 'Thales Group', 'Airbus Defence'],
      answerIndex: 1,
      explanation: 'Safran partnered with GTRE for the 110kN engine project for AMCA.',
      examType: 'CDS',
      category: 'Defence'
    }
  ],
  capfMcqs: [
    {
      id: 'mcq-capf-1',
      question: 'The Mozambique Channel and Sunda Strait are critical choke points located in which ocean region?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      answerIndex: 1,
      explanation: 'Both choke points are vital maritime passages in the Indian Ocean Region (IOR) crucial for security patrols.',
      examType: 'CAPF AC',
      category: 'International',
      pyqConnection: 'Matches CAPF AC Paper I Geography & Maritime Security choke point questions.',
      staticTopicLink: 'Strategic Maritime Choke Points of the World'
    }
  ],
  mainsQuestions: [
    {
      id: 'mains-1',
      question: 'Indigenization of critical military technology is not merely an economic preference but a strategic imperative for India in a multi-polar world order. Discuss in the light of recent developments in air defence and aero-engine co-development.',
      paper: 'GS Paper 3 (Security & Technology)',
      wordLimit: 250,
      answerFramework: [
        'Introduction: Define Aatmanirbharta in defence and mention recent milestones (DRDO VSHORADS test & GTRE-Safran 110kN engine agreement).',
        'Body Part 1: Vulnerabilities of foreign technological dependence during wartime (sanctions, delay in spare parts, technology blacklisting).',
        'Body Part 2: Economic impact - reduction of capital outflow, creation of domestic defence industrial corridors, boost to MSMEs.',
        'Body Part 3: Strategic benefits - unhindered operational readiness along LAC/LOC and strategic leverage in the Indo-Pacific.',
        'Conclusion: Way forward focusing on R&D funding (target 2% of GDP), private sector integration, and IP retention.'
      ],
      keyPoints: [
        'GTRE-Safran 110kN engine deal guarantees 100% Transfer of Technology for AMCA.',
        'DRDO VSHORADS fills low-altitude air defence gaps.',
        'Dual-use technological spillover into commercial aerospace.'
      ],
      mainsFrameworkDetails: {
        maxMarksPotential: 15,
        idealWordCount: 250,
        timeRequiredMinutes: 9,
        introductionContext: 'Define Aatmanirbharta in defence and cite the GTRE-Safran 110kN engine ToT agreement as a paradigm shift.',
        corePerspectives: {
          security: 'Ensures unhindered operational readiness along LAC/LOC without sanctions risk.',
          economic: 'Spurs aerospace defense industrial corridors in Bengaluru and Hyderabad.',
          constitutional: 'Fulfills constitutional duty to safeguard sovereign defense capabilities.'
        },
        keyExaminerExpectations: [
          'Highlight 100% Transfer of Technology (ToT) for hot-section metallurgy',
          'Cite Kargil Review Committee and Shekatkar Committee recommendations',
          'Explain Positive Indigenisation Lists (PIL)'
        ],
        commonStudentMistakes: [
          'Giving purely descriptive answers without mentioning specific policy frameworks like DAP 2020',
          'Failing to link defence tech indigenization with MSME job creation'
        ],
        rankerSecretTechnique: 'Conclude with a diagram connecting R&D investment -> Indigenous IP -> Export Potential -> Strategic Autonomy.',
        wayForward: 'Increase R&D budget from 0.7% to 2% of GDP and establish Defence Technology Industrial Parks.'
      }
    }
  ],
  essayTopic: {
    id: 'essay-1',
    topic: 'Artificial Intelligence: A Catalyst for Democratic Governance or an Instrument of Technological Hegemony?',
    category: 'Technology & Governance',
    dimensions: [
      'Digital Public Infrastructure (DPI) & Vernacular AI access in rural India',
      'Data Privacy, Surveillance state risks, and Algorithmic Bias',
      'Global South vs West AI divide and compute monopolies',
      'Ethical AI, Transparency, and Human-in-the-Loop decision making'
    ],
    quotes: [
      '"Technology is a useful servant but a dangerous master." - Christian Lous Lange',
      '"Artificial Intelligence is the new electricity, but sovereign access determines who remains in the dark." - Global AI Forum'
    ],
    supremeCourtJudgements: [
      'K.S. Puttaswamy v. Union of India (2017) - Fundamental Right to Privacy under Article 21'
    ],
    caseStudies: [
      'IndiaAI Mission 10,000 GPU Compute Cloud providing open-source models in 22 languages'
    ]
  },
  ssbGdTopic: {
    id: 'ssb-gd-1',
    topic: 'Joint Theatre Commands vs Service Autonomy: Is India Ready for Integrated Military Operational Structure?',
    overview: 'The Chief of Defence Staff (CDS) is steering India towards Joint Theatre Commands (Western, Eastern, Maritime). This discussion centers on balancing service-specific identity with joint operational warfare.',
    argumentsFor: [
      'Unified command under single Commander avoids inter-service friction during high-intensity conflict.',
      'Optimal resource utilization of air assets and artillery without duplication.',
      'Modern warfare demands rapid, synchronized cross-domain operations (Land, Air, Sea, Cyber, Space).'
    ],
    argumentsAgainst: [
      'Indian Air Force (IAF) asset scarcity requires centralized allocation rather than dividing assets among theatre commanders.',
      'Cultural and doctrine differences among Army, Navy, and Air Force require time for seamless integration.',
      'Potential logistical overhead during structural transition phase.'
    ],
    strategicContext: 'Crucial topic for SSB Interview Officer Intelligence Rating (OIR) and Group Task Officer (GTO) Group Discussion rounds for CDS/AFCAT/NDA candidates.'
  }
};
