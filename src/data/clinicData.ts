import siteforgeConfig from '../../siteforge.config.json';

export interface DoctorInfo {
  salutation: string;
  name: string;
  fullName: string;
  credentials: string;
  degrees: string[];
  registrationNumber: string;
  medicalCouncil: string;
  experienceYears: number;
  designation: string;
  almaMater: string;
  formerInstitutions: string;
  consultationMinutes: number;
  philosophy: string;
  photoUrl: string;
  verifiedRegistrationNotice: string;
}

export interface ClinicContact {
  phoneDisplay: string;
  phoneRaw: string;
  phoneTel: string;
  whatsappRaw: string;
  email: string;
  addressLines: string[];
  landmark: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  emergencyNotice: string;
  googleMapsUrl: string;
  embedMapsUrl: string;
}

export interface OpdSession {
  id: string;
  title: string;
  days: string;
  hours: string;
  type: string;
  startHour: number; // 24-hr format
  startMinute: number;
  endHour: number;
  endMinute: number;
  daysApplicable: number[]; // 0 = Sun, 1 = Mon ... 6 = Sat
  note: string;
}

export interface ServiceItem {
  id: string;
  category: string;
  name: string;
  shortDesc: string;
  duration: string;
  suitableFor: string;
  inclusions?: string[];
}

export interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

// Config type cast
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config = siteforgeConfig as any;

export const CLINIC_DATA = {
  name: config?.businessName || "Aarogya Family Clinic",
  tagline: config?.tagline || "Thoughtful, Evidence-Based Family Healthcare",
  badge: "Primary Care & Family Medicine Practice",
  subheading: config?.doctor?.fullName ? `by ${config.doctor.fullName}` : "by Dr. Arjun Mehta, MBBS, MD",
  consultationFeeApprox: `₹${config?.consultationFee?.standardOutpatientFee || 400}`,
  followUpPolicy: `${config?.consultationFee?.followUpWindowDays || 7}-Day Complimentary Follow-up`,

  doctor: {
    salutation: config?.doctor?.salutation || "Dr.",
    name: config?.doctor?.name || "Arjun Mehta",
    fullName: config?.doctor?.fullName || "Dr. Arjun Mehta",
    credentials: config?.doctor?.credentials || "MBBS, MD (General Medicine)",
    degrees: config?.doctor?.degrees || ["MBBS", "MD - General Medicine"],
    registrationNumber: config?.doctor?.registrationNumber || "DMC/R/58492",
    medicalCouncil: config?.doctor?.medicalCouncil || "Delhi & Madhya Pradesh Medical Council",
    experienceYears: config?.doctor?.experienceYears || 12,
    designation: config?.doctor?.designation || "Consultant General Physician & Family Doctor",
    almaMater: config?.doctor?.almaMater || "King George's Medical University (KGMU)",
    formerInstitutions: config?.doctor?.formerInstitutions || "Ex-Senior Resident, Dept. of Internal Medicine, SMS Medical College & Hospital",
    consultationMinutes: config?.doctor?.consultationMinutes || 15,
    philosophy: config?.doctor?.philosophy || "Unhurried, evidence-based consultations with zero tolerance for unnecessary antibiotic prescribing or polypharmacy. Every diagnosis is clearly explained to patients and families.",
    photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    verifiedRegistrationNotice: `Registered Medical Practitioner (Reg. No. ${config?.doctor?.registrationNumber || 'DMC/R/58492'}). Public council credentials can be verified directly at clinic reception.`
  } as DoctorInfo,

  contact: {
    phoneDisplay: config?.contact?.displayPhone || config?.contact?.phone || "+91 98260 12345",
    phoneRaw: (config?.contact?.phone || "+919826012345").replace(/\s+/g, ''),
    phoneTel: `tel:${(config?.contact?.phone || "+919826012345").replace(/\s+/g, '')}`,
    whatsappRaw: (config?.contact?.whatsapp || "919826012345").replace(/[^0-9]/g, ''),
    email: config?.contact?.email || "consult@aarogyafamilyclinic.in",
    addressLines: [
      config?.contact?.address || "Shop No. 12, Ground Floor, Shanti Vihar Commercial Complex, Ring Road",
      config?.contact?.landmark ? `Landmark: ${config.contact.landmark}` : "Opposite Central Bank of India, Near Navlakha Square"
    ],
    landmark: config?.contact?.landmark || "Opposite Central Bank of India, Near Navlakha Square",
    area: config?.contact?.area || "Navlakha / Ring Road",
    city: config?.contact?.city || "Indore",
    state: config?.contact?.state || "Madhya Pradesh",
    pincode: config?.contact?.pincode || "452001",
    emergencyNotice: config?.contact?.emergencyNotice || "For life-threatening emergencies (chest pain, acute breathlessness, seizures, or severe trauma), please report immediately to the nearest tertiary emergency department/ICU.",
    googleMapsUrl: config?.urls?.googleMaps || "https://maps.google.com/?q=22.6980,75.8750",
    embedMapsUrl: config?.urls?.embedMaps || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.528!2d75.8750!3d22.6980!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQxJzUyLjgiTiA3NcKwNTInMzAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
  } as ClinicContact,

  // OPD Sessions with exact 24-hr times for real-time status calculation
  opdSchedule: [
    {
      id: "morning",
      title: "Morning OPD",
      days: "Monday – Saturday",
      hours: "10:00 AM – 1:30 PM",
      type: "Primary Consultations & Health Checks",
      startHour: 10,
      startMinute: 0,
      endHour: 13,
      endMinute: 30,
      daysApplicable: [1, 2, 3, 4, 5, 6],
      note: "Tokens distributed from 9:45 AM onwards"
    },
    {
      id: "evening",
      title: "Evening OPD",
      days: "Monday – Saturday",
      hours: "5:30 PM – 9:00 PM",
      type: "General OPD & Follow-up Consultations",
      startHour: 17,
      startMinute: 30,
      endHour: 21,
      endMinute: 0,
      daysApplicable: [1, 2, 3, 4, 5, 6],
      note: "Tokens distributed from 5:15 PM onwards"
    },
    {
      id: "sunday",
      title: "Sunday OPD",
      days: "Sunday Only",
      hours: "10:00 AM – 1:00 PM",
      type: "Prior Appointment Only",
      startHour: 10,
      startMinute: 0,
      endHour: 13,
      endMinute: 0,
      daysApplicable: [0],
      note: "Prior appointment required on Saturday evening"
    }
  ] as OpdSession[],

  consultationFee: {
    amount: config?.consultationFee?.standardOutpatientFee || 400,
    symbol: "₹",
    followUpDays: config?.consultationFee?.followUpWindowDays || 7,
    followUpFee: 0,
    paymentModes: config?.consultationFee?.paymentModes || ["Cash", "UPI (PhonePe, Google Pay, Paytm)", "Debit / Credit Cards"],
    inclusions: config?.consultationFee?.inclusions || [
      "15-minute dedicated physician consultation",
      "Physical examination & vitals check (BP, Pulse, SpO2, Blood Sugar check if required)",
      "Digital prescription with clear dosage instructions",
      "Free follow-up review within 7 days for the same acute episode"
    ],
    disclaimer: "Consultation fees are collected directly at reception. No hidden dispensing markups or surprise charges."
  },

  services: (config?.services || [
    {
      id: "acute-infections",
      category: "Fever & Acute Care",
      name: "Fever, Viral & Infection Management",
      shortDesc: "Evidence-based diagnosis and treatment for viral fevers, malaria, dengue, typhoid, urinary tract infections, and seasonal respiratory illnesses.",
      duration: "15 min",
      suitableFor: "Patients with acute high temperature, body aches, shivering, cough, or persistent malaise."
    },
    {
      id: "chronic-diseases",
      category: "Chronic Conditions",
      name: "Diabetes & Hypertension Care",
      shortDesc: "Comprehensive monitoring and individualized management for Type 2 Diabetes, High Blood Pressure, and Lipid Disorders to prevent cardiovascular complications.",
      duration: "20 min",
      suitableFor: "Patients needing long-term metabolic control, regular dosage titration, and lifestyle coaching."
    },
    {
      id: "preventive-health",
      category: "Preventive Care",
      name: "Annual Health Check & Risk Screening",
      shortDesc: "Proactive screening for early detection of lifestyle disorders, comprehensive review of blood biomarkers, and personalized preventive health advice.",
      duration: "25 min",
      suitableFor: "Individuals aged 25+ seeking routine preventive assessment and baseline vitals evaluation."
    },
    {
      id: "respiratory-care",
      category: "Respiratory Care",
      name: "Asthma, Cough & Allergy Care",
      shortDesc: "Clinical evaluation for chronic allergic cough, bronchitis, seasonal rhinitis, and guidance on correct inhaler and spacer usage.",
      duration: "15 min",
      suitableFor: "Recurrent nocturnal cough, wheezing, dust allergies, and respiratory discomfort."
    },
    {
      id: "pediatric-family",
      category: "Family Care",
      name: "Routine Family & Pediatric Care",
      shortDesc: "Primary healthcare for children (2+ years) and adults. Common childhood ailments, growth and nutrition counseling, and digestive issues.",
      duration: "15 min",
      suitableFor: "Families looking for a reliable, single-point primary care physician."
    },
    {
      id: "minor-procedures",
      category: "Clinical Procedures",
      name: "Minor Procedures & Vitals Screening",
      shortDesc: "Sterile dressing for minor wounds, suture removal, acute nebulization for asthma attacks, finger-prick blood sugar, and vitals assessment.",
      duration: "15 min",
      suitableFor: "Immediate non-critical wound care, dressing change, or breathing nebulization."
    }
  ]) as ServiceItem[],

  patientInstructions: {
    whatToBring: config?.patientInstructions?.whatToBring || [
      "Any previous doctor prescriptions and discharge summaries",
      "Recent diagnostic lab reports and blood work (within last 6 months)",
      "Current prescription medication strips or a list of daily dosages",
      "Government photo ID (Aadhaar or Driving License for clinic registration)"
    ],
    appointmentProcess: config?.patientInstructions?.appointmentProcess || [
      {
        step: 1,
        title: "Submit Enquiry or Message on WhatsApp",
        description: "Choose your preferred morning or evening OPD slot through the web form or send a pre-filled WhatsApp message."
      },
      {
        step: 2,
        title: "Reception Confirms Your Slot & Token",
        description: "The clinic desk reviews doctor availability and messages back with your confirmed consultation token and estimated timing."
      },
      {
        step: 3,
        title: "Arrive 10 Minutes Prior",
        description: "Visit the clinic at Shanti Vihar Complex with past medical files. Vitals will be recorded before meeting Dr. Arjun Mehta."
      }
    ]
  },

  faqs: (config?.faqs || [
    {
      category: "Consultation & Fees",
      question: "What is the consultation fee and what payment methods are accepted?",
      answer: "The outpatient consultation fee is ₹400. This includes a comprehensive 15-minute examination, vitals screening, and a digitally printed prescription. We accept Cash, UPI (Google Pay, PhonePe, Paytm), and major Debit/Credit cards."
    },
    {
      category: "Consultation & Fees",
      question: "How does the 7-day follow-up consultation work?",
      answer: "If you need a follow-up review for the same illness within 7 days of your initial visit (e.g. to review new blood test reports or monitor fever progression), the follow-up consultation is completely complimentary (₹0)."
    },
    {
      category: "Appointments & Timings",
      question: "Do I need an appointment or can I walk in directly?",
      answer: "Walk-in patients are always welcome during morning (10:00 AM – 1:30 PM) and evening (5:30 PM – 9:00 PM) OPD hours. However, priority tokens are allocated to patients who request an appointment slot online or via WhatsApp, which reduces your waiting room time."
    },
    {
      category: "Appointments & Timings",
      question: "Does submitting a website enquiry guarantee my appointment time?",
      answer: "No. Submitting the web enquiry notifies our clinic reception. Our team verifies the doctor's real-time schedule and confirms your slot with a consultation token via WhatsApp message or telephone call."
    },
    {
      category: "Clinic & Location",
      question: "Where is Aarogya Family Clinic located and is parking available?",
      answer: "We are located at Shop No. 12, Ground Floor, Shanti Vihar Commercial Complex, Ring Road, Indore (Opposite Central Bank of India, near Navlakha Square). Ground-level two-wheeler and four-wheeler parking is available right in front of the complex."
    },
    {
      category: "Medical Policies",
      question: "What should I do in case of a medical emergency?",
      answer: "Aarogya Family Clinic is an outpatient primary care facility and does not operate an emergency trauma center or intensive care unit. For life-threatening emergencies (chest pain, acute breathlessness, seizures, or severe trauma), please proceed directly to the nearest hospital emergency casualty."
    }
  ]) as FaqItem[]
};
