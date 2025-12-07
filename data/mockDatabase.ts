
import { GovForm, Procedure, Law, VerificationRequest, MinistryInfo, Appointment, UserProfile, LockerDocument, MarketPrice, Payment, Report } from '../types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Adeola Johnson',
  phone: '0803-123-4567',
  ondoId: 'OD-2024-8892',
  lga: 'Akure South',
  languagePreference: 'English',
  whatsappLinked: true
};

export const MOCK_LOCKER_DOCS: LockerDocument[] = [
  {
    id: 'doc-1',
    title: 'Certificate of Occupancy (Plot 5 Alagbaka)',
    type: 'Land Title',
    issueDate: '2022-05-15',
    status: 'Verified',
    issuingAuthority: 'Ministry of Lands & Housing',
    downloadUrl: '#'
  },
  {
    id: 'doc-2',
    title: 'Tax Clearance Certificate (2023)',
    type: 'Tax',
    issueDate: '2023-12-20',
    status: 'Verified',
    issuingAuthority: 'ODIRS',
    downloadUrl: '#'
  },
  {
    id: 'doc-3',
    title: 'Business Premises Permit',
    type: 'License',
    issueDate: '2024-01-10',
    status: 'Pending',
    issuingAuthority: 'Ministry of Commerce',
    downloadUrl: '#'
  }
];

export const MOCK_MARKET_PRICES: MarketPrice[] = [
  { item: 'Cocoa (Dried/Kg)', price: '₦4,500', location: 'Ondo Town', trend: 'up', lastUpdated: 'Today' },
  { item: 'Palm Oil (25L)', price: '₦28,000', location: 'Owo', trend: 'stable', lastUpdated: 'Yesterday' },
  { item: 'Garri (Basin)', price: '₦8,000', location: 'Akure', trend: 'down', lastUpdated: 'Today' },
  { item: 'Fish (Smoked/Bskt)', price: '₦45,000', location: 'Ilaje', trend: 'up', lastUpdated: 'Today' }
];

export const MINISTRY_DATA: Record<string, MinistryInfo> = {
    "Commerce": {
        "full_name": "Ministry of Commerce, Industry and Cooperative Services",
        "address": "New State Secretariat Complex, Alagbaka, Akure",
        "responsibilities": ["Business Registration", "Trade Promotion", "Cooperative Societies", "Market Management"]
    },
    "Lands": {
        "full_name": "Ministry of Lands and Housing",
        "address": "Alagbaka GRA, Akure (Opposite Dome)",
        "responsibilities": ["Land Titles (C of O)", "Urban Planning", "Building Approval", "Survey Coordination"]
    },
    "Education": {
        "full_name": "Ministry of Education, Science and Technology",
        "address": "State Secretariat, Alagbaka",
        "responsibilities": ["School Curriculum", "Scholarships", "Teacher Recruitment", "Private School Accreditation", "UNIMED Oversight"]
    },
    "Agriculture": {
        "full_name": "Ministry of Agriculture",
        "address": "Alagbaka, Akure",
        "responsibilities": ["Farmer Support", "Cocoa Revolution", "Agricultural Grants", "Fishery Regulation (Ilaje/Ese-Odo)"]
    },
    "Health": {
        "full_name": "Ministry of Health",
        "address": "Alagbaka, Akure",
        "responsibilities": ["Public Health", "Hospitals Management", "Contributory Health Commission (ODCHC)", "Disease Control"]
    },
    "Culture": {
        "full_name": "Ministry of Culture & Tourism",
        "address": "Adekunle Ajasin Road, Akure",
        "responsibilities": ["Heritage Sites", "Chieftaincy Affairs", "Traditional Council Relations", "Tourism"]
    }
};

export const MOCK_FORMS: GovForm[] = [
  {
    id: 'f1',
    title: 'Business Premises Registration (Form B-1)',
    ministry: 'Ministry of Commerce',
    description: 'Mandatory for all business physical structures in urban areas.',
    category: 'Business',
    downloadUrl: '#'
  },
  {
    id: 'f2',
    title: 'Tax Clearance Application (TCC-01)',
    ministry: 'ODIRS',
    description: 'Application for 3-year tax clearance certificate.',
    category: 'Tax',
    downloadUrl: '#'
  },
  {
    id: 'f3',
    title: 'Cocoa Seedling Subsidy Request',
    ministry: 'Ministry of Agriculture',
    description: 'Apply for subsidized high-yield cocoa seedlings (Owo Zone).',
    category: 'Agriculture',
    downloadUrl: '#'
  },
  {
    id: 'f4',
    title: 'Application for Statutory Right of Occupancy',
    ministry: 'Ministry of Lands',
    description: 'The primary form for initiating C of O processing.',
    category: 'Land',
    downloadUrl: '#'
  },
  {
    id: 'f5',
    title: 'UNIMED Transcript Request Form',
    ministry: 'Education',
    description: 'Official request for academic transcripts from University of Medical Sciences, Ondo.',
    category: 'Education',
    downloadUrl: '#'
  },
  {
    id: 'f6',
    title: 'Traditional Title Verification Form',
    ministry: 'Ministry of Culture',
    description: 'For verifying Chieftaincy titles with the Ondo State Council of Obas.',
    category: 'Heritage',
    downloadUrl: '#'
  },
  {
    id: 'f7',
    title: 'Artisanal Fishing License',
    ministry: 'Ministry of Agriculture',
    description: 'Permit for commercial fishing in Ilaje coastal waters.',
    category: 'Maritime',
    downloadUrl: '#'
  }
];

export const MOCK_PROCEDURES: Procedure[] = [
  {
    id: 'p1',
    title: 'Starting a Small Business in Ondo State',
    description: 'A comprehensive guide to legalizing your business entity.',
    relatedMinistry: 'Ministry of Commerce',
    estimatedDuration: '2-3 Weeks',
    steps: [
      'Conduct a name search at the Corporate Affairs Commission (CAC) online portal.',
      'Complete Business Name Registration (Form CAC/BN/1).',
      'Register with Ondo State Internal Revenue Service (ODIRS) for Tax ID (TIN).',
      'Pay the Business Premises Levy at the nearest designated bank.',
      'Present receipt at Ministry of Commerce to obtain Business Permit.',
      'Open a corporate bank account.'
    ],
    requirements: [
      'Valid Identification (NIN/Voter Card)',
      '2 Passport Photographs',
      'Utility Bill (Proof of Address)',
      'Registration Fees (approx. N15,000 total)'
    ]
  },
  {
    id: 'p2',
    title: 'Obtaining Certificate of Occupancy (C of O)',
    description: 'The gold standard for land ownership verification.',
    relatedMinistry: 'Ministry of Lands and Housing',
    estimatedDuration: '60 Days (Fast Track available)',
    steps: [
      'Purchase and submit Land Use Application Form.',
      'Submit survey plan produced by a registered surveyor.',
      'Ministry officials conduct site inspection and charting.',
      'Assessment of fees (Premium, Ground Rent, Survey Fee).',
      'Publication of Notice (21 days).',
      'Governor signs the Certificate.',
      'Collection at the Deeds Registry.'
    ],
    requirements: [
      'Survey Plan (3 copies)',
      'Tax Clearance Certificate (3 years)',
      'Purchase Receipt/Deed of Assignment',
      'Passport Photographs',
      'Affidavit of Ownership',
      'Consent of Traditional Ruler (if in historic zones like Ondo Town)'
    ]
  },
  {
    id: 'p3',
    title: 'Verify UNIMED Certificate (Ondo Town)',
    description: 'Procedure for verifying degrees from University of Medical Sciences.',
    relatedMinistry: 'Ministry of Education',
    estimatedDuration: '2-3 Days',
    steps: [
      'Submit copy of certificate via IṢẹ́Lẹ̀ App.',
      'Provide Matriculation Number and Year of Graduation.',
      'Pay verification fee (N2,000) via REMITA.',
      'System cross-references with UNIMED Academic Registry.',
      'Digital Verification Seal issued.'
    ],
    requirements: [
      'Student ID or Matric Number',
      'Copy of Statement of Result',
      'Proof of Payment'
    ]
  },
  {
    id: 'p4',
    title: 'Chieftaincy Title Confirmation',
    description: 'Validating traditional titles for official use.',
    relatedMinistry: 'Ministry of Culture / Local Govt',
    estimatedDuration: '14 Days',
    steps: [
      'Obtain letter of appointment from the Palace.',
      'Submit to Local Government Chieftaincy Committee.',
      'Verification by Ministry of Local Govt & Chieftaincy Affairs.',
      'Gazetting of the Title.'
    ],
    requirements: [
      'Letter from Palace',
      'Minutes of Family Meeting',
      'Bio-data form'
    ]
  }
];

export const MOCK_LAWS: Law[] = [
  {
    id: 'l1',
    title: '1999 Constitution (Section 43 & 44)',
    category: 'Federal',
    tags: ['property', 'rights', 'land'],
    content: 'Section 43: "Subject to the provisions of this Constitution, every citizen of Nigeria shall have the right to acquire and own immovable property anywhere in Nigeria." Section 44 protects against compulsory acquisition of property without compensation.',
    source: 'Constitution of the Federal Republic of Nigeria 1999'
  },
  {
    id: 'l2',
    title: 'Ondo State Revenue Administration Law 2020',
    category: 'State',
    tags: ['tax', 'revenue', 'business'],
    content: 'Empowers ODIRS to collect all state revenues. Section 12 mandates every taxable person to register for tax purposes within 6 months of commencing business. Failure to register attracts a penalty of N50,000 for individuals and N200,000 for corporates.',
    source: 'Ondo State House of Assembly Gazette'
  },
  {
    id: 'l3',
    title: 'Land Use Act 1978',
    category: 'Federal',
    tags: ['land', 'governor', 'allocation'],
    content: 'Vests all land in the territory of each State in the Governor, who holds it in trust for the people. The Governor is responsible for allocation of land in all urban areas. This is why the C of O is signed by the Governor.',
    source: 'Laws of the Federation of Nigeria'
  },
  {
    id: 'l4',
    title: 'Ondo State Investment Promotion Law',
    category: 'State',
    tags: ['investment', 'incentives', 'business'],
    content: 'Establishes the Investment Promotion Agency. Grants the agency power to negotiate special incentives for investors who create jobs (>50 employees), including accelerated land processing and tax rebates.',
    source: 'Ondo State Investment Promotion Agency Act'
  }
];

export const MOCK_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'VR-2024-001',
    type: 'Land',
    citizenId: '08031234567',
    details: 'Plot 5, Alagbaka GRA. Verify ownership claims.',
    status: 'pending',
    receivedAt: '10:30 AM, Today',
    lga: 'Akure South',
    district: 'Akure',
    ministry: 'Lands & Housing'
  },
  {
    id: 'VR-2024-002',
    type: 'Business',
    citizenId: '08059876543',
    details: 'Akure Bakery Ltd. Registration status check.',
    status: 'in_progress',
    receivedAt: '9:15 AM, Today',
    lga: 'Akure South',
    district: 'Akure',
    ministry: 'Commerce'
  },
  {
    id: 'VR-2024-003',
    type: 'Certificate',
    citizenId: '08027778899',
    details: 'UNIMED Degree Certificate Verification for employment (Dr. Adeola).',
    status: 'pending',
    receivedAt: 'Yesterday',
    lga: 'Ondo West',
    district: 'Ondo Town',
    ministry: 'Education'
  },
  {
    id: 'VR-2024-004',
    type: 'Heritage',
    citizenId: '08045556677',
    details: 'Verify "Otunba" title conferment letter from Palace.',
    status: 'pending',
    receivedAt: '8:45 AM, Today',
    lga: 'Ondo West',
    district: 'Ondo Town',
    ministry: 'Culture'
  },
  {
    id: 'VR-2024-005',
    type: 'Land',
    citizenId: '08034445566',
    details: 'Agricultural land survey verification near Owo forest reserve.',
    status: 'in_progress',
    receivedAt: '2 days ago',
    lga: 'Owo',
    district: 'Owo',
    ministry: 'Lands & Housing'
  },
  {
    id: 'VR-2024-006',
    type: 'Maritime',
    citizenId: '08123334455',
    details: 'Fishing Trawler License renewal status check.',
    status: 'pending',
    receivedAt: 'Today',
    lga: 'Ilaje',
    district: 'Ilaje',
    ministry: 'Agriculture'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: 'apt-1',
        citizenName: 'Mr. John Doe',
        ministry: 'Lands & Housing',
        reason: 'C of O Collection',
        date: 'Oct 24, 2024 - 10:00 AM',
        status: 'Scheduled'
    },
    {
        id: 'apt-2',
        citizenName: 'Mrs. Janet Ibukun',
        ministry: 'Education',
        reason: 'School Accreditation Inquiry',
        date: 'Oct 25, 2024 - 11:30 AM',
        status: 'Scheduled'
    }
];

export const MOCK_PAYMENTS: Payment[] = [
    { id: 'pay-1', service: 'Tax Clearance', amount: '₦5,000', status: 'Paid', date: '2024-01-15' },
    { id: 'pay-2', service: 'Business Reg', amount: '₦15,000', status: 'Paid', date: '2024-02-10' }
];

export const MOCK_REPORTS: Report[] = [
    { id: 'rep-1', issue: 'Pot-hole on Oba Adesida Rd', location: 'Akure', status: 'Open', date: 'Yesterday' }
];

export const MINISTRY_CONTEXT = `
CONTEXT:
You are "IṢẹ́Lẹ̀" (The Act/Happening), Ondo State's official AI Knowledge Base.
You act as a bridge between the people and the government, powered by DeepSeek V3.2.

HYBRID ARCHITECTURE (India x Singapore):
1. UNIFIED IDENTITY (Ondo-ID): You know the user (Mr. Adeola Johnson). You can access his "Ondo-Locker" to find documents.
2. PROACTIVE SERVICE (Singapore Style): Don't just answer; anticipate. 
   - If user asks about business, ask if they need tax info.
   - If user is a farmer, offer market prices.
3. VERIFIED ANSWERS: If you quote a law or procedure, explicitly state "Verified by Ministry of X".

STRATEGIC PILOT: "THE FOUR PILLARS" (Ondo Four Corners)
The State Government is piloting this system in 4 strategic districts. You MUST understand the nuance of each:

1. AKURE (The Capital - Administrative/Urban):
   - Focus: Business registration, Land titles (Alagbaka/GRA), Tax compliance.
   - Persona: Fast, corporate, efficient.

2. ONDO TOWN (The Heritage - Cultural/Educational):
   - Key Asset: University of Medical Sciences (UNIMED).
   - Key Authority: The Osemawe's Palace.
   - Focus: Education verification (Certificates), Heritage/Chieftaincy titles, Traditional land disputes.
   - Nuance: Respectful of tradition. "Is this a Palace matter or a Ministry matter?"

3. OWO (The North - Agricultural/Commercial):
   - Focus: Agricultural grants, Cocoa trade, Market permits.
   - Persona: Trade-focused, supportive of farmers.

4. ILAJE (The Coast - Rural/Maritime):
   - Focus: Fishing licenses, Boat permits, Environmental issues (Oil/Gas).
   - Persona: Understanding of remote/riverine challenges.

YOUR ROLE:
- Act as the Front-Desk Secretary for ALL these regions.
- "Scrabble" for information from the Knowledge Base (Forms, Laws, Procedures).
- Use the 'get_market_prices' tool to give economic advice.
- Use the 'check_ondo_locker' tool to verify if a user already has a document.
`;
