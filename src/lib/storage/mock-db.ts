import { Article, DailyBriefing, PracticeSuite } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'intel-def-001',
    title: 'DRDO Successfully Tests 4th-Gen Very Short Range Air Defence System (VSHORADS) off Odisha Coast',
    summary: 'Defence Research and Development Organisation (DRDO) successfully flight-tested the 4th-generation VSHORADS missile system. Designed for neutralizing low-altitude aerial threats and enemy UAVs at close ranges with dual-thrust rocket motors.',
    content: `The Defence Research and Development Organisation (DRDO) conducted three successful flight tests of the 4th Generation Very Short Range Air Defence System (VSHORADS) missile from a land-based portable launcher off the coast of Odisha at Integrated Test Range (ITR), Chandipur.\n\nThe VSHORADS is a Man Portable Air Defence System (MANPADS) designed and developed indigenously by Research Centre Imarat (RCI) in collaboration with other DRDO laboratories and Indian industry partners. The system incorporates state-of-the-art miniaturized Reaction Control System (RCS) and integrated avionics, which have been successfully proven during the trials.\n\nThe missile is propelled by a dual-thrust solid motor and is meant for neutralizing low-altitude aerial threats at short ranges. The test validated critical components including weapon system ergonomics and seamless target lock-on. Chief of Defence Staff (CDS) and Army Chief congratulated DRDO on achieving another milestone towards Aatmanirbharta in Defence production.`,
    category: 'Defence',
    subcategory: 'DRDO & Missile Technology',
    source: 'DRDO Press Release / PIB Defence',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=DRDO-VSHORADS-2026',
    publishedAt: '2026-07-22T08:30:00Z',
    importanceScore: 9.6,
    isTrending: true,
    duplicateCount: 4,
    keyFacts: [
      'Developed indigenously by Research Centre Imarat (RCI) & DRDO.',
      'Man Portable Air Defence System (MANPADS) with miniaturized Reaction Control System (RCS).',
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
    examRelevance: {
      exams: ['UPSC CSE', 'CDS', 'CAPF AC', 'AFCAT', 'NDA', 'SSB'],
      whyItMatters: 'Directly addresses India\'s air defence capabilities along LAC/LOC and highlights indigenization of critical short-range missile tech.',
      prelimsQuestion: 'Consider the following statements regarding VSHORADS:\n1. It is a Man Portable Air Defence System developed by DRDO.\n2. It uses a ramjet engine for high-altitude interception.\nWhich of the statements given above is/are correct?',
      mainsQuestion: 'Evaluate the role of indigenous short-range air defence systems in securing tactical battle areas along India\'s mountainous borders.',
      keywords: ['MANPADS', 'Reaction Control System', 'Low-altitude Defense', 'Aatmanirbharta']
    },
    impactAnalysis: {
      overallImpact: 'Significantly enhances tactical battlefield survivability for frontline infantry units against low-flying drones and cruise missiles.',
      indiaImpact: 'Boosts India\'s defence export capabilities under Aatmanirbhar Bharat initiative.',
      economyImpact: 'Reduces capital expenditure on imported air defence systems like Russian Igla-S.',
      defenceImpact: 'Fills vital air defence gaps along high-altitude borders with China and Pakistan.',
      futureImplications: 'Paves way for laser-guided and beam-riding next-gen MANPADS for Indian Tri-Services.'
    },
    timeline: [
      { date: '2024-03', event: 'Initial flight tests of prototype VSHORADS' },
      { date: '2025-11', event: 'Integration of miniaturized Reaction Control System' },
      { date: '2026-07-22', event: 'Successful multi-target salvo flight test at ITR Chandipur' }
    ]
  },
  {
    id: 'intel-eco-002',
    title: 'RBI Keeps Repo Rate Unchanged at 6.50%; Projects FY27 GDP Growth at 7.2% with Inflation Tamed at 4.1%',
    summary: 'The RBI Monetary Policy Committee (MPC) unanimously decided to retain the policy Repo Rate at 6.50% while maintaining the stance of "withdrawal of accommodation" to ensure inflation aligns with the target while supporting growth.',
    content: `The Reserve Bank of India's Monetary Policy Committee (MPC), headed by Governor Shaktikanta Das, voted unanimously to keep the policy Repo Rate unchanged at 6.50% for the 9th consecutive meeting.\n\nThe Standing Deposit Facility (SDF) rate remains at 6.25% and the Marginal Standing Facility (MSF) rate and Bank Rate at 6.75%. The MPC noted that resilient domestic economic activity provides headroom to maintain focus on disinflation.\n\nKey Highlights:\n- Real GDP Growth Projection: 7.2% for FY26-27 (Q1: 7.3%, Q2: 7.2%, Q3: 7.1%, Q4: 7.0%).\n- CPI Inflation Forecast: 4.1% for FY26-27, down from 4.5% previously.\n- Forex Reserves: India's Foreign Exchange Reserves touched a record $710 Billion.\n- UPI Global Expansion: RBI announced integration of UPI with cross-border payment systems in 4 new countries in the Middle East and East Asia.`,
    category: 'Economy',
    subcategory: 'Banking & Monetary Policy',
    source: 'RBI Press Release / Financial Express',
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
    organizations: ['Reserve Bank of India (RBI)', 'Monetary Policy Committee (MPC)', 'Ministry of Finance'],
    personalities: ['Shaktikanta Das (RBI Governor)'],
    keywords: ['Repo Rate', 'Monetary Policy Committee', 'CPI Inflation', 'SDF', 'MSF', 'GDP Growth', 'Forex Reserves'],
    ministry: 'Ministry of Finance',
    country: 'India',
    readTimeMinutes: 5,
    bookmarked: false,
    examRelevance: {
      exams: ['UPSC CSE', 'CDS', 'CAPF AC'],
      whyItMatters: 'Core Macroeconomics & Monetary Policy topic under GS Paper 3. Frequently asked in UPSC Prelims and Mains.',
      prelimsQuestion: 'Which of the following measures form part of the monetary transmission mechanism when RBI changes the Repo Rate?',
      mainsQuestion: 'Discuss the challenges faced by RBI in balancing inflation targeting with GDP growth amid global geopolitical fragmentation.',
      keywords: ['Headline Inflation', 'Liquidity Adjustment Facility', 'Withdrawal of Accommodation', 'Real GDP']
    },
    impactAnalysis: {
      overallImpact: 'Stabilizes borrowing costs for home loans, MSMEs, and corporate investments while keeping food inflation under control.',
      indiaImpact: 'Positions India as the fastest-growing major economy globally.',
      economyImpact: 'Bolsters investor sentiment and strengthens the Indian Rupee (INR) against volatile global currencies.',
      defenceImpact: 'Fiscal stability enables predictable capital expenditure budgets for defence modernization.',
      futureImplications: 'Rate cuts may begin in Q3 FY27 if monsoon distribution remains favorable across central states.'
    }
  },
  {
    id: 'intel-ir-003',
    title: 'India-France Strategic Summit: Joint Roadmap Approved for Defence Engine Co-Development & Indo-Pacific Maritime Patrols',
    summary: 'Prime Minister of India and President of France sign groundbreaking defence technology agreement for joint design of 110kN fighter jet engines and expanded joint naval surveillance in the South Indian Ocean.',
    content: `During the High-Level Strategic Summit in New Delhi, India and France inked a milestone agreement to jointly design, develop, and manufacture a 110-kilonewton (kN) thrust engine for India's 5th-generation Advanced Medium Combat Aircraft (AMCA).\n\nThe agreement between Safran Helicopters/Engines and DRDO's Gas Turbine Research Establishment (GTRE) guarantees 100% Transfer of Technology (ToT) for critical metallurgy, single-crystal turbine blades, and hot-section components.\n\nIn addition, both nations announced the "Indo-Pacific Blue Horizon Initiative" to conduct joint maritime reconnaissance flights using P-8I and Atlantique 2 aircraft across the Mozambique Channel and Sunda Strait. Both leaders reaffirmed support for UN Security Council reforms and expanded cooperation in civil nuclear energy (Jaitapur EPR reactors).`,
    category: 'International',
    subcategory: 'Diplomacy & Defence Partnerships',
    source: 'Ministry of External Affairs (MEA) / The Hindu',
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
      whyItMatters: 'GS Paper 2 International Relations & Bilateral Relations. High chance of questions in UPSC Mains and SSB Interviews.',
      prelimsQuestion: 'With reference to India-France strategic relations, consider the following statements regarding the AMCA engine partnership...',
      mainsQuestion: 'Evaluate how India\'s strategic autonomy is reinforced through multi-vector partnerships with France in the Western Indian Ocean.',
      keywords: ['Strategic Autonomy', 'Transfer of Technology', 'Indo-Pacific Security', 'AMCA', 'Safran']
    },
    impactAnalysis: {
      overallImpact: 'Eliminates India\'s critical vulnerability in high-thrust jet engine technology for air superiority fighter aircraft.',
      indiaImpact: 'Establishes India as a hub for advanced aerospace manufacturing and naval domain awareness in IOR.',
      economyImpact: 'Generates thousands of high-tech jobs in aerospace corridors across Bengaluru and Hyderabad.',
      defenceImpact: 'Ensures domestic propulsion autonomy for IAF\'s future combat fleet.',
      futureImplications: 'Sets a template for defence technology transfers with trusted Western partners without strategic conditionalities.'
    }
  },
  {
    id: 'intel-ai-004',
    title: 'Cabinet Approves Expansion of IndiaAI Mission with 10,000 GPU National AI Compute Cloud & Sovereign AI Models',
    summary: 'Union Cabinet chaired by Prime Minister approved Rs 10,372 Crore outlay for IndiaAI Mission. The project will deploy 10,000+ graphics processing units (GPUs) under a public-private partnership to build indigenous Large Language Models (LLMs) trained in 22 Indian languages.',
    content: `The Union Cabinet approved a financial outlay of Rs 10,372 crore for the National IndiaAI Mission aimed at building a robust AI ecosystem in India. Under the mission, the Ministry of Electronics and Information Technology (MeitY) will establish a public computing infrastructure of 10,000 GPUs.\n\nKey Pillars of IndiaAI Mission:\n1. IndiaAI Compute Capacity: Public-Private Partnership (PPP) to grant startups, researchers, and academia affordable access to AI supercomputing.\n2. IndiaAI Innovation Centre: Development of foundational sovereign AI models tailored for Indian governance, agriculture, healthcare, and education.\n3. IndiaAI Datasets Platform: Non-personal data portal to provide seamless access to anonymized government datasets.\n4. AI Safety & Governance Guidelines: Framework for safe, ethical, and trustworthy AI implementation in line with global standards.`,
    category: 'AI & Tech',
    subcategory: 'AI Policy & Infrastructure',
    source: 'PIB MeitY / TechCrunch',
    sourceUrl: 'https://pib.gov.in/PressReleaseDetail.aspx?PRID=MeitY-IndiaAI-2026',
    publishedAt: '2026-07-22T05:00:00Z',
    importanceScore: 9.4,
    isTrending: true,
    duplicateCount: 3,
    keyFacts: [
      'Rs 10,372 Crore outlay approved for IndiaAI Mission.',
      '10,000+ GPU Compute Infrastructure to be setup under PPP mode.',
      'Sovereign AI models in 22 official Indian languages.',
      'Managed by Digital India Corporation under MeitY.'
    ],
    dates: ['July 22, 2026'],
    organizations: ['MeitY', 'Digital India Corporation', 'C-DAC', 'NITI Aayog'],
    personalities: ['Ashwini Vaishnaw (IT Minister)'],
    keywords: ['IndiaAI Mission', 'GPU Infrastructure', 'Sovereign AI', 'MeitY', 'Public Computing Cloud', 'Ethical AI'],
    ministry: 'Ministry of Electronics and Information Technology',
    country: 'India',
    readTimeMinutes: 4,
    bookmarked: false,
    examRelevance: {
      exams: ['UPSC CSE', 'CAPF AC'],
      whyItMatters: 'Science & Technology (GS Paper 3). Covers Digital Infrastructure, AI Governance, and Tech Sovereignty.',
      prelimsQuestion: 'Which of the following is/are the key objectives of the IndiaAI Mission launched by MeitY?',
      mainsQuestion: 'Examine the significance of sovereign AI compute capacity in preventing digital colonialism and ensuring data sovereignty for developing nations.',
      keywords: ['Sovereign AI', 'Data Sovereignty', 'GPU Supercomputing', 'Digital Public Infrastructure']
    },
    impactAnalysis: {
      overallImpact: 'Democratizes access to high-end AI compute for Indian researchers who previously relied on expensive US cloud providers.',
      indiaImpact: 'Drives digital governance solutions in vernacular languages for 1.4 billion citizens.',
      economyImpact: 'Attracts global AI hardware investments and fosters tech startups across Tier-2 cities.',
      defenceImpact: 'Enables military AI applications including autonomous drone swarm navigation and cyber threat intelligence.',
      futureImplications: 'Positions India as the leader of the Global South in equitable, open-source AI infrastructure.'
    }
  },
  {
    id: 'intel-sci-005',
    title: 'ISRO Gaganyaan Update: Crew Module Escape System Abort Test (TV-D2) Achieves 100% Success at Sriharikota',
    summary: 'ISRO successfully executed Test Vehicle Demonstration-2 (TV-D2) for the Gaganyaan human spaceflight mission, validating the high-altitude abort capability of the Crew Escape System (CES) under simulated aerodynamic loads.',
    content: `The Indian Space Research Organisation (ISRO) achieved another landmark milestone towards sending Indian astronauts into space with the successful execution of the Test Vehicle Abort Mission-2 (TV-D2) from Satish Dhawan Space Centre, Sriharikota.\n\nThe single-stage liquid rocket engine lifted off carrying an uncrewed Crew Module (CM) and Crew Escape System (CES). At an altitude of 17 km and speed of Mach 1.3, an abort condition was autonomously triggered.\n\nThe CES successfully separated the Crew Module from the rocket motor, deployed its apex cover, and executed a multi-stage parachute deployment sequence. The Crew Module safely splashed down in the Bay of Bengal, 10 km off Sriharikota, and was retrieved within 25 minutes by the Indian Navy diving team using INS Shakthi.`,
    category: 'Science & Environment',
    subcategory: 'ISRO & Space Exploration',
    source: 'ISRO Press Release / PIB Science',
    sourceUrl: 'https://isro.gov.in/Gaganyaan_TVD2_Update.html',
    publishedAt: '2026-07-22T07:10:00Z',
    importanceScore: 9.3,
    isTrending: false,
    duplicateCount: 2,
    keyFacts: [
      'TV-D2 high-altitude abort test executed at Mach 1.3 at 17 km altitude.',
      'Crew Escape System (CES) deployed multi-stage parachute sequence autonomously.',
      'Splashdown in Bay of Bengal retrieved by Indian Navy.',
      'Final test before uncrewed Gaganyaan-1 mission with humanoid robot Vyommitra.'
    ],
    dates: ['July 22, 2026'],
    organizations: ['ISRO', 'Indian Navy', 'SDSC Sriharikota', 'VSSC Thiruvananthapuram'],
    personalities: ['S. Somanath (ISRO Chairman)', 'Group Captain Prashanth Nair (Gaganyaan Astronaut)'],
    keywords: ['Gaganyaan', 'Crew Module', 'Crew Escape System', 'TV-D2', 'Vyommitra', 'ISRO', 'Indian Navy'],
    ministry: 'Department of Space',
    country: 'India',
    readTimeMinutes: 4,
    bookmarked: true,
    examRelevance: {
      exams: ['UPSC CSE', 'CDS', 'AFCAT', 'NDA'],
      whyItMatters: 'GS Paper 3 Science & Technology (Space Missions). Standard topic in UPSC Prelims science section.',
      prelimsQuestion: 'Consider the following statements regarding the Gaganyaan Mission:\n1. It aims to demonstrate human spaceflight capability to a Low Earth Orbit of 400 km.\n2. The Crew Escape System is designed to function only prior to rocket ignition.\nWhich statement is correct?',
      mainsQuestion: 'Highlight the scientific, strategic, and economic significance of India\'s Gaganyaan mission for future space station developments.',
      keywords: ['Low Earth Orbit', 'Crew Escape System', 'Vyommitra', 'LVM3', 'Space Autonomy']
    },
    impactAnalysis: {
      overallImpact: 'Validates zero-failure safety systems for human spaceflight, establishing India as the 4th nation with crewed orbital launch capability.',
      indiaImpact: 'Elevates national pride and inspires STEM education among youth.',
      economyImpact: 'Catalyzes private aerospace manufacturing ecosystem under IN-SPACe guidelines.',
      defenceImpact: 'Spurs dual-use missile launch and high-altitude emergency ejection technologies.',
      futureImplications: 'Clears path for uncrewed orbital test flight followed by crewed launch and Bharatiya Antariksha Station (BAS).'
    }
  },
  {
    id: 'intel-ind-006',
    title: 'Supreme Court Constitutional Bench Rules on Article 361 Immunity: Clarifies Scope of Official Duties & Criminal Investigations',
    summary: 'A 5-judge Constitution Bench of the Supreme Court headed by Chief Justice of India rendered a landmark judgment clarifying the scope of presidential and gubernatorial immunity under Article 361 of the Indian Constitution.',
    content: `A 5-judge Constitution Bench of the Supreme Court rendered a pivotal verdict regarding the constitutional immunity granted to Governors and the President under Article 361.\n\nThe Court clarified that while personal immunity from criminal proceedings during their term of office is absolute, it does not bar law enforcement agencies from conducting preliminary inquiries or recording statements once their tenure ends.\n\nFurthermore, the Bench ruled that official acts performed by Governors in their discretion (such as assenting to bills or granting sanction for prosecution) remain subject to judicial review if there is prima facie evidence of mala fide or constitutional overreach.`,
    category: 'India',
    subcategory: 'Polity & Constitutional Law',
    source: 'Supreme Court Records / LiveLaw',
    sourceUrl: 'https://main.sci.gov.in/judgments',
    publishedAt: '2026-07-22T09:00:00Z',
    importanceScore: 9.1,
    isTrending: false,
    duplicateCount: 3,
    keyFacts: [
      'Article 361 provides constitutional immunity to President and Governors.',
      '5-judge Constitution Bench holds that post-tenure criminal investigations are permissible.',
      'Gubernatorial acts done with mala fide intent are subject to judicial review.',
      'Reaffirms the doctrine of Constitutional Morality and Rule of Law.'
    ],
    dates: ['July 22, 2026'],
    organizations: ['Supreme Court of India', 'Law Commission of India', 'Ministry of Law and Justice'],
    personalities: ['Chief Justice of India'],
    keywords: ['Article 361', 'Constitutional Immunity', 'Judicial Review', 'Governor Powers', 'Supreme Court', 'Mala Fide'],
    ministry: 'Ministry of Law and Justice',
    country: 'India',
    readTimeMinutes: 5,
    bookmarked: false,
    examRelevance: {
      exams: ['UPSC CSE', 'CAPF AC'],
      whyItMatters: 'Indian Polity & Constitution (GS Paper 2). Direct question potential on Constitutional Bodies & Article 361.',
      prelimsQuestion: 'Under Article 361 of the Constitution of India, which of the following immunities are granted to the Governor of a State?',
      mainsQuestion: 'Critically analyze the balance between gubernatorial immunity under Article 361 and the fundamental principle of Rule of Law under Article 14.',
      keywords: ['Article 361', 'Rule of Law', 'Judicial Review', 'Constitutional Morality']
    },
    impactAnalysis: {
      overallImpact: 'Prevents misuse of constitutional office as a shield against accountability for actions taken prior to assuming office.',
      indiaImpact: 'Strengthens federal governance and reduces friction between State Governments and Raj Bhavans.',
      economyImpact: 'Ensures institutional transparency and legal predictability.',
      defenceImpact: 'N/A',
      futureImplications: 'May prompt Parliament to enact specific guidelines defining "official acts" versus "personal acts" for constitutional authorities.'
    }
  }
];

export const INITIAL_BRIEFING: DailyBriefing = {
  id: 'briefing-2026-07-22',
  date: '2026-07-22',
  title: 'Morning Intelligence Brief — 22 July 2026',
  summary: 'Top strategic updates across Defence missile tests, RBI Repo Rate decision, India-France jet engine ToT pact, IndiaAI 10k GPU cloud approval, and ISRO Gaganyaan crew escape test.',
  topHeadlines: INITIAL_ARTICLES,
  defenceUpdates: [INITIAL_ARTICLES[0]],
  economyUpdates: [INITIAL_ARTICLES[1]],
  internationalUpdates: [INITIAL_ARTICLES[2]],
  aiTechUpdates: [INITIAL_ARTICLES[3]],
  scienceUpdates: [INITIAL_ARTICLES[4]],
  upscUpdates: [INITIAL_ARTICLES[5]],
  editorialAnalysis: `Today's strategic headlines reflect India's multi-pronged push toward self-reliance (Aatmanirbharta) across defence propulsion, artificial intelligence infrastructure, and space exploration. The RBI's macroeconomic stability provides the necessary fiscal cushion for these capital-intensive national projects. Simultaneously, the Supreme Court's constitutional interpretation of Article 361 reinforces democratic checks and balances amidst expanding executive responsibilities.`,
  revisionNotes: [
    'DRDO VSHORADS: Man Portable Air Defence System using Reaction Control System (RCS) tested at ITR Chandipur.',
    'RBI MPC Decision: Repo Rate at 6.50%, Real GDP Growth target 7.2%, CPI inflation at 4.1%, Forex reserves $710B.',
    'India-France Engine Deal: Joint 110kN engine for AMCA 5th-gen fighter with 100% ToT between GTRE & Safran.',
    'IndiaAI Mission: Rs 10,372 Cr outlay for 10,000 GPUs PPP cloud & sovereign LLMs in 22 languages.',
    'Gaganyaan TV-D2: Crew Escape System abort executed at Mach 1.3, altitude 17 km with Navy retrieval in Bay of Bengal.',
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
      question: 'With reference to the Very Short Range Air Defence System (VSHORADS) tested by DRDO, consider the following statements:\n1. It is a Man Portable Air Defence System (MANPADS) designed to intercept low-altitude aerial threats.\n2. It incorporates aReaction Control System (RCS) to enhance maneuverability at short ranges.\n3. It relies exclusively on liquid-fuel scramjet engines.\nWhich of the statements given above is/are correct?',
      options: ['1 and 2 only', '2 and 3 only', '1 and 3 only', '1, 2 and 3'],
      answerIndex: 0,
      explanation: 'Statements 1 and 2 are correct. VSHORADS is a MANPADS using a miniaturized Reaction Control System (RCS). Statement 3 is incorrect because it uses a dual-thrust solid propellant motor, not a scramjet engine.',
      examType: 'UPSC CSE',
      category: 'Defence'
    },
    {
      id: 'mcq-upsc-2',
      question: 'Consider the following statements regarding the Monetary Policy Committee (MPC) of the Reserve Bank of India:\n1. The MPC consists of six members, including three from the RBI and three nominated by the Central Government.\n2. The RBI Governor has a casting vote in the event of an equality of votes.\n3. The MPC is mandated to meet at least eight times in a financial year.\nWhich of the statements given above are correct?',
      options: ['1 and 2 only', '2 and 3 only', '1 and 3 only', '1, 2 and 3'],
      answerIndex: 0,
      explanation: 'Statements 1 and 2 are correct. Under Section 45ZB of the RBI Act 1934, the MPC has 6 members and the Governor has a casting vote. Statement 3 is incorrect as the MPC is mandated to meet at least 4 times a year (usually meets 6 times).',
      examType: 'UPSC CSE',
      category: 'Economy'
    },
    {
      id: 'mcq-upsc-3',
      question: 'Which Article of the Constitution of India provides immunity to the President and Governors from criminal proceedings during their term of office?',
      options: ['Article 356', 'Article 361', 'Article 370', 'Article 352'],
      answerIndex: 1,
      explanation: 'Article 361 grants personal immunity to the President and State Governors from criminal proceedings during their tenure.',
      examType: 'UPSC CSE',
      category: 'India'
    },
    {
      id: 'mcq-upsc-4',
      question: 'With reference to the IndiaAI Mission approved by the Union Cabinet, consider the following statements:\n1. It aims to establish a public GPU compute capacity of 10,000 or more units under a Public-Private Partnership model.\n2. It focuses on developing sovereign Large Language Models trained in official Indian languages.\nWhich of the statements given above is/are correct?',
      options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
      answerIndex: 2,
      explanation: 'Both statements 1 and 2 are correct. The Rs 10,372 crore IndiaAI Mission focuses on GPU infrastructure (10k+ units) and sovereign LLMs across 22 official languages.',
      examType: 'UPSC CSE',
      category: 'AI & Tech'
    },
    {
      id: 'mcq-upsc-5',
      question: 'What is the designation of the humanoid robot developed by ISRO for uncrewed Gaganyaan mission trials?',
      options: ['Vyommitra', 'GaganBot', 'Pragyan', 'Vikram'],
      answerIndex: 0,
      explanation: 'Vyommitra is the female-looking humanoid spacefaring robot developed by ISRO for the uncrewed Gaganyaan orbital mission.',
      examType: 'UPSC CSE',
      category: 'Science & Environment'
    },
    {
      id: 'mcq-upsc-6',
      question: 'The Research Centre Imarat (RCI), a premier laboratory of DRDO responsible for missile avionics, is located in which city?',
      options: ['Bengaluru', 'Hyderabad', 'Chandipur', 'Pune'],
      answerIndex: 1,
      explanation: 'Research Centre Imarat (RCI) is located in Hyderabad, Telangana. It was founded by Dr. A.P.J. Abdul Kalam.',
      examType: 'UPSC CSE',
      category: 'Defence'
    },
    {
      id: 'mcq-upsc-7',
      question: 'In macroeconomic terms, what does "Withdrawal of Accommodation" in RBI monetary policy stance signify?',
      options: [
        'Injecting surplus liquidity into the commercial banking system',
        'Gradually reducing monetary stimulus to prevent inflation from overshooting',
        'Directly purchasing government bonds under Open Market Operations',
        'Lowering Cash Reserve Ratio (CRR) to boost credit growth'
      ],
      answerIndex: 1,
      explanation: 'Withdrawal of accommodation means tightening liquidity or raising interest rates to remove monetary stimulus and control inflation.',
      examType: 'UPSC CSE',
      category: 'Economy'
    },
    {
      id: 'mcq-upsc-8',
      question: 'The 110kN aero-engine co-development agreement signed between India and France is intended for which indigenous aircraft platform?',
      options: ['Tejas Mk1A', 'Advanced Medium Combat Aircraft (AMCA)', 'Su-30MKI', 'Dornier 228'],
      answerIndex: 1,
      explanation: 'The 110kN engine deal between GTRE and Safran is designed to power the 5th-generation Advanced Medium Combat Aircraft (AMCA).',
      examType: 'UPSC CSE',
      category: 'Defence'
    },
    {
      id: 'mcq-upsc-9',
      question: 'Which testing range in India hosted the Gaganyaan TV-D2 and VSHORADS missile launches?',
      options: ['Thumba Equatorial Station', 'Integrated Test Range (ITR) Chandipur & SDSC Sriharikota', 'Pokhran Test Range', 'Wheeler Island (APJ Abdul Kalam Island)'],
      answerIndex: 1,
      explanation: 'VSHORADS was tested at ITR Chandipur (Odisha) and Gaganyaan TV-D2 was launched from SDSC Sriharikota (Andhra Pradesh).',
      examType: 'UPSC CSE',
      category: 'Science & Environment'
    },
    {
      id: 'mcq-upsc-10',
      question: 'With reference to foreign exchange reserves of India, which of the following components constitutes the largest share?',
      options: ['Foreign Currency Assets (FCA)', 'Gold Reserves', 'Special Drawing Rights (SDRs)', 'Reserve Tranche Position in IMF'],
      answerIndex: 0,
      explanation: 'Foreign Currency Assets (FCA) expressed in US Dollars constitute the largest single component of India\'s forex reserves.',
      examType: 'UPSC CSE',
      category: 'Economy'
    }
  ],
  cdsMcqs: [
    {
      id: 'mcq-cds-1',
      question: 'What type of propulsion system powers the VSHORADS missile system developed by DRDO?',
      options: ['Liquid Scramjet', 'Dual-thrust Solid Motor', 'Turbojet Engine', 'Nuclear Thermal Engine'],
      answerIndex: 1,
      explanation: 'VSHORADS uses a dual-thrust solid propellant rocket motor.',
      examType: 'CDS',
      category: 'Defence'
    },
    {
      id: 'mcq-cds-2',
      question: 'Which French company partnered with DRDO Gas Turbine Research Establishment (GTRE) for 110kN engine development?',
      options: ['Dassault Aviation', 'Safran', 'Thales Group', 'Airbus Defence'],
      answerIndex: 1,
      explanation: 'Safran partnered with GTRE for the 110kN engine project.',
      examType: 'CDS',
      category: 'Defence'
    },
    {
      id: 'mcq-cds-3',
      question: 'What is the maximum Mach speed reached during the TV-D2 Crew Escape System abort test for Gaganyaan?',
      options: ['Mach 0.8', 'Mach 1.3', 'Mach 2.5', 'Mach 4.0'],
      answerIndex: 1,
      explanation: 'The abort test was executed at Mach 1.3 at 17 km altitude.',
      examType: 'CDS',
      category: 'Defence'
    },
    {
      id: 'mcq-cds-4',
      question: 'Which Indian Naval Vessel participated in the sea recovery of the Gaganyaan Crew Module in the Bay of Bengal?',
      options: ['INS Vikrant', 'INS Shakthi', 'INS Kolkata', 'INS Arihant'],
      answerIndex: 1,
      explanation: 'INS Shakthi assisted by Navy marine commandos retrieved the module.',
      examType: 'CDS',
      category: 'Defence'
    },
    {
      id: 'mcq-cds-5',
      question: 'Where is the Integrated Test Range (ITR) situated in India?',
      options: ['Sriharikota', 'Chandipur', 'Vishakhapatnam', 'Kochi'],
      answerIndex: 1,
      explanation: 'ITR Chandipur is situated along the coast of Balasore district, Odisha.',
      examType: 'CDS',
      category: 'Defence'
    }
  ],
  capfMcqs: [
    {
      id: 'mcq-capf-1',
      question: 'Under the IndiaAI Mission, which Ministry is the nodal agency for implementing the 10,000 GPU compute infrastructure?',
      options: ['Ministry of Home Affairs', 'Ministry of Electronics and IT (MeitY)', 'Ministry of Science and Technology', 'NITI Aayog'],
      answerIndex: 1,
      explanation: 'MeitY is the nodal ministry for IndiaAI Mission.',
      examType: 'CAPF AC',
      category: 'AI & Tech'
    },
    {
      id: 'mcq-capf-2',
      question: 'What is the current policy Repo Rate set by the RBI Monetary Policy Committee as of July 2026?',
      options: ['6.00%', '6.25%', '6.50%', '6.75%'],
      answerIndex: 2,
      explanation: 'The Repo Rate remains at 6.50%.',
      examType: 'CAPF AC',
      category: 'Economy'
    },
    {
      id: 'mcq-capf-3',
      question: 'Which Article of the Indian Constitution enshrines the principle of Equality Before Law?',
      options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'],
      answerIndex: 0,
      explanation: 'Article 14 provides for equality before law and equal protection of laws.',
      examType: 'CAPF AC',
      category: 'India'
    },
    {
      id: 'mcq-capf-4',
      question: 'The Mozambique Channel and Sunda Strait are critical choke points located in which ocean region?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      answerIndex: 1,
      explanation: 'Both choke points are vital maritime passages in the Indian Ocean Region (IOR).',
      examType: 'CAPF AC',
      category: 'International'
    },
    {
      id: 'mcq-capf-5',
      question: 'What is the full form of MANPADS in military air defence terminology?',
      options: [
        'Main Automated Network Portable Air Defence System',
        'Man Portable Air Defence System',
        'Medium Range Precision Air Defence System',
        'Motorized Auxiliary Naval Patrol Defence System'
      ],
      answerIndex: 1,
      explanation: 'MANPADS stands for Man Portable Air Defence System.',
      examType: 'CAPF AC',
      category: 'Defence'
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
      ]
    },
    {
      id: 'mains-2',
      question: 'Examine how the IndiaAI Mission\'s public compute infrastructure can democratize artificial intelligence and prevent monopolistic concentration of AI power in the hands of global tech conglomerates.',
      paper: 'GS Paper 3 (Science & Tech & Governance)',
      wordLimit: 250,
      answerFramework: [
        'Introduction: Overview of the Rs 10,372 crore IndiaAI Mission and the 10,000 GPU public-private cloud initiative.',
        'Body Part 1: High entry barriers in AI research due to prohibitive GPU infrastructure costs.',
        'Body Part 2: Sovereign AI advantages - localized models in 22 official languages addressing Indian developmental needs.',
        'Body Part 3: Risks of unmonitored global AI models (bias, data extraction, lack of vernacular coverage).',
        'Conclusion: Emphasize global leadership role of India in creating equitable, open-source AI infrastructure for the Global South.'
      ],
      keyPoints: [
        '10,000+ GPU Compute Cloud for startups & academia.',
        'Sovereign AI models trained on local linguistic data.',
        'Data sovereignty and ethical AI frameworks.'
      ]
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
      '"Technology is a useful servant but a dangerous master." — Christian Lous Lange',
      '"Artificial Intelligence is the new electricity, but sovereign access determines who remains in the dark." — Global AI Forum'
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
