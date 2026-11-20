export interface TestimonialItem {
  id: string;
  patientName: string;
  age: number;
  condition: string;
  category: 'Chronic Care' | 'Fever & Infection' | 'Family Care' | 'Senior Citizen';
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedConsent: boolean;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    patientName: "Rajeshwar Sharma",
    age: 54,
    condition: "Type 2 Diabetes & Blood Pressure",
    category: "Chronic Care",
    location: "Navlakha, Indore",
    rating: 5,
    date: "October 2026",
    comment: "Dr. Arjun Mehta took 20 full minutes to review my 3-year lab history and explained why I did not need two of the extra medicines I was previously given. My HbA1c is now stable at 6.8 with proper lifestyle changes. A doctor who truly cares.",
    verifiedConsent: true
  },
  {
    id: "t2",
    patientName: "Sunita Verma",
    age: 38,
    condition: "Severe Viral Fever & Cough",
    category: "Fever & Infection",
    location: "Bhawarkua, Indore",
    rating: 5,
    date: "September 2026",
    comment: "Very polite and attentive doctor. Did not prescribe unnecessary IV drips or expensive brand-name medicines. Guided us on hydration and fever monitoring. My fever resolved completely in 4 days. The 7-day follow-up was free of charge as promised.",
    verifiedConsent: true
  },
  {
    id: "t3",
    patientName: "Anand Joshi",
    age: 67,
    condition: "Senior Citizen Health Check",
    category: "Senior Citizen",
    location: "Ring Road, Indore",
    rating: 5,
    date: "August 2026",
    comment: "Finding a family doctor who genuinely listens without hurrying is rare nowadays. The clinic is clean, well-ventilated, and wheelchair accessible from the parking area. Dr. Mehta reviewed all my cardiac reports thoroughly.",
    verifiedConsent: true
  },
  {
    id: "t4",
    patientName: "Meenakshi Patidar",
    age: 32,
    condition: "Pediatric Fever & Stomach Upset (Son, 5 yrs)",
    category: "Family Care",
    location: "Transport Nagar, Indore",
    rating: 5,
    date: "October 2026",
    comment: "Dr. Arjun was remarkably gentle with my five-year-old son, who usually cries at doctor clinics. Explained the ORS dosage and viral cycle with great patience. We have made Aarogya our family clinic.",
    verifiedConsent: true
  },
  {
    id: "t5",
    patientName: "Virendra Singh Solanki",
    age: 49,
    condition: "Hypertension & Dyslipidemia",
    category: "Chronic Care",
    location: "Sapna Sangeeta, Indore",
    rating: 5,
    date: "July 2026",
    comment: "Clear, transparent advice without inducing fear. The appointment process via WhatsApp is straightforward, and the consultation fee of ₹400 is very reasonable for this quality of medical attention.",
    verifiedConsent: true
  }
];

export const TESTIMONIALS_DISCLAIMER = "Notice: All patient testimonials are published with informed patient consent. Individual clinical outcomes vary depending on patient health history, adherence to medical guidance, and individual biology. No medical guarantee is implied.";
