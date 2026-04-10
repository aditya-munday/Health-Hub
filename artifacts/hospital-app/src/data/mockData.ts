export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  rating: number;
  reviewCount: number;
  fee: number;
  location: string;
  availability: string[];
  image: string;
  bio: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  inStock: boolean;
  description: string;
  brand: string;
  image: string;
}

export interface BloodGroup {
  group: string;
  units: number;
  location: string;
  lastUpdated: string;
  status: "available" | "low" | "critical";
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  turnaround: string;
  description: string;
  preparation: string;
}

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Amelia Carter",
    specialization: "Cardiology",
    qualification: "MBBS, MD (Cardiology), FACC",
    experience: 14,
    rating: 4.9,
    reviewCount: 312,
    fee: 1500,
    location: "Block A, Floor 3",
    availability: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=amelia&backgroundColor=b6e3f4",
    bio: "Dr. Carter is a board-certified cardiologist specializing in interventional cardiology and heart failure management with over 14 years of experience.",
  },
  {
    id: "d2",
    name: "Dr. Marcus Johnson",
    specialization: "Neurology",
    qualification: "MBBS, DM (Neurology)",
    experience: 11,
    rating: 4.7,
    reviewCount: 245,
    fee: 1800,
    location: "Block B, Floor 2",
    availability: ["10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=marcus&backgroundColor=c0aede",
    bio: "Dr. Johnson is a neurologist with expertise in stroke management, epilepsy, and neurodegenerative disorders.",
  },
  {
    id: "d3",
    name: "Dr. Priya Sharma",
    specialization: "Pediatrics",
    qualification: "MBBS, MD (Pediatrics)",
    experience: 9,
    rating: 4.8,
    reviewCount: 420,
    fee: 800,
    location: "Block C, Floor 1",
    availability: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=priya&backgroundColor=ffdfbf",
    bio: "Dr. Sharma is a compassionate pediatrician with expertise in child development, vaccination, and pediatric infectious diseases.",
  },
  {
    id: "d4",
    name: "Dr. Robert Chen",
    specialization: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics)",
    experience: 16,
    rating: 4.6,
    reviewCount: 189,
    fee: 1200,
    location: "Block D, Floor 4",
    availability: ["09:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=robert&backgroundColor=d1d4f9",
    bio: "Dr. Chen is an orthopedic surgeon specializing in joint replacement surgery and sports medicine with 16 years of clinical experience.",
  },
  {
    id: "d5",
    name: "Dr. Sarah Williams",
    specialization: "Dermatology",
    qualification: "MBBS, DVD, DNB (Dermatology)",
    experience: 8,
    rating: 4.9,
    reviewCount: 567,
    fee: 1000,
    location: "Block A, Floor 1",
    availability: ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "05:00 PM"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=sarah&backgroundColor=ffd5dc",
    bio: "Dr. Williams is a dermatologist specializing in medical and cosmetic dermatology, with expertise in acne, psoriasis, and skin cancer.",
  },
  {
    id: "d6",
    name: "Dr. Ahmed Hassan",
    specialization: "General Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 12,
    rating: 4.5,
    reviewCount: 298,
    fee: 600,
    location: "Block B, Floor 1",
    availability: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=ahmed&backgroundColor=b6e3f4",
    bio: "Dr. Hassan is an internal medicine specialist providing comprehensive primary healthcare with a focus on preventive medicine.",
  },
  {
    id: "d7",
    name: "Dr. Lisa Park",
    specialization: "Gynecology",
    qualification: "MBBS, MD (OBG)",
    experience: 10,
    rating: 4.8,
    reviewCount: 380,
    fee: 1100,
    location: "Block C, Floor 2",
    availability: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=lisa&backgroundColor=c0aede",
    bio: "Dr. Park specializes in women's health, including obstetrics, gynecological surgeries, and reproductive medicine.",
  },
  {
    id: "d8",
    name: "Dr. James Patel",
    specialization: "Psychiatry",
    qualification: "MBBS, MD (Psychiatry)",
    experience: 13,
    rating: 4.7,
    reviewCount: 156,
    fee: 1300,
    location: "Block E, Floor 2",
    availability: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=james&backgroundColor=ffdfbf",
    bio: "Dr. Patel is a psychiatrist specializing in mood disorders, anxiety, PTSD, and addiction medicine.",
  },
];

export const medicines: Medicine[] = [
  {
    id: "m1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 25,
    unit: "Strip of 10",
    inStock: true,
    description: "Effective fever reducer and pain reliever for mild to moderate pain.",
    brand: "Calpol",
    image: "💊",
  },
  {
    id: "m2",
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    price: 120,
    unit: "Strip of 10",
    inStock: true,
    description: "Broad-spectrum antibiotic for bacterial infections.",
    brand: "Mox",
    image: "💊",
  },
  {
    id: "m3",
    name: "Cetirizine 10mg",
    category: "Antiallergic",
    price: 45,
    unit: "Strip of 10",
    inStock: true,
    description: "Antihistamine for allergic rhinitis, hives, and itching.",
    brand: "Cetzine",
    image: "💊",
  },
  {
    id: "m4",
    name: "Metformin 500mg",
    category: "Diabetes",
    price: 85,
    unit: "Strip of 15",
    inStock: true,
    description: "First-line medication for type 2 diabetes management.",
    brand: "Glycomet",
    image: "💊",
  },
  {
    id: "m5",
    name: "Amlodipine 5mg",
    category: "Cardiovascular",
    price: 95,
    unit: "Strip of 10",
    inStock: true,
    description: "Calcium channel blocker for high blood pressure and angina.",
    brand: "Amlode",
    image: "💊",
  },
  {
    id: "m6",
    name: "Pantoprazole 40mg",
    category: "Gastro",
    price: 110,
    unit: "Strip of 10",
    inStock: false,
    description: "Proton pump inhibitor for acid reflux and peptic ulcers.",
    brand: "Pan",
    image: "💊",
  },
  {
    id: "m7",
    name: "Vitamin D3 60000 IU",
    category: "Vitamins",
    price: 180,
    unit: "Pack of 4 sachets",
    inStock: true,
    description: "Weekly vitamin D supplementation for deficiency treatment.",
    brand: "D-Shine",
    image: "🧴",
  },
  {
    id: "m8",
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 35,
    unit: "Strip of 10",
    inStock: true,
    description: "NSAID for pain, fever, and inflammation.",
    brand: "Brufen",
    image: "💊",
  },
  {
    id: "m9",
    name: "Azithromycin 500mg",
    category: "Antibiotics",
    price: 145,
    unit: "Strip of 3",
    inStock: true,
    description: "Z-pack antibiotic for respiratory and other infections.",
    brand: "Zithromax",
    image: "💊",
  },
  {
    id: "m10",
    name: "Losartan 50mg",
    category: "Cardiovascular",
    price: 130,
    unit: "Strip of 10",
    inStock: true,
    description: "ARB medication for hypertension and kidney protection in diabetics.",
    brand: "Losacar",
    image: "💊",
  },
  {
    id: "m11",
    name: "Multivitamin Tablets",
    category: "Vitamins",
    price: 220,
    unit: "Bottle of 60",
    inStock: true,
    description: "Complete daily nutrition with vitamins and minerals.",
    brand: "Supradyn",
    image: "🧴",
  },
  {
    id: "m12",
    name: "Omeprazole 20mg",
    category: "Gastro",
    price: 75,
    unit: "Strip of 10",
    inStock: true,
    description: "For acid reflux and stomach ulcer prevention.",
    brand: "Omez",
    image: "💊",
  },
];

export const bloodGroups: BloodGroup[] = [
  { group: "A+", units: 45, location: "City Hospital, Downtown", lastUpdated: "2 hours ago", status: "available" },
  { group: "A-", units: 8, location: "City Hospital, Downtown", lastUpdated: "4 hours ago", status: "low" },
  { group: "B+", units: 62, location: "City Hospital, Downtown", lastUpdated: "1 hour ago", status: "available" },
  { group: "B-", units: 3, location: "City Hospital, Downtown", lastUpdated: "6 hours ago", status: "critical" },
  { group: "O+", units: 78, location: "City Hospital, Downtown", lastUpdated: "30 mins ago", status: "available" },
  { group: "O-", units: 12, location: "City Hospital, Downtown", lastUpdated: "3 hours ago", status: "low" },
  { group: "AB+", units: 29, location: "City Hospital, Downtown", lastUpdated: "2 hours ago", status: "available" },
  { group: "AB-", units: 2, location: "City Hospital, Downtown", lastUpdated: "8 hours ago", status: "critical" },
  { group: "A+", units: 33, location: "MedCare Branch, Westside", lastUpdated: "1 hour ago", status: "available" },
  { group: "B+", units: 41, location: "MedCare Branch, Westside", lastUpdated: "2 hours ago", status: "available" },
  { group: "O+", units: 55, location: "MedCare Branch, Westside", lastUpdated: "45 mins ago", status: "available" },
  { group: "O-", units: 5, location: "MedCare Branch, Westside", lastUpdated: "5 hours ago", status: "low" },
  { group: "A+", units: 18, location: "HealthFirst, Northpark", lastUpdated: "3 hours ago", status: "available" },
  { group: "B-", units: 1, location: "HealthFirst, Northpark", lastUpdated: "10 hours ago", status: "critical" },
  { group: "AB+", units: 14, location: "HealthFirst, Northpark", lastUpdated: "4 hours ago", status: "available" },
  { group: "AB-", units: 6, location: "HealthFirst, Northpark", lastUpdated: "6 hours ago", status: "low" },
];

export const labTests: LabTest[] = [
  {
    id: "lt1",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    price: 250,
    turnaround: "4-6 hours",
    description: "Comprehensive blood test measuring red cells, white cells, platelets, hemoglobin, and more.",
    preparation: "No special preparation required.",
  },
  {
    id: "lt2",
    name: "Lipid Profile",
    category: "Biochemistry",
    price: 450,
    turnaround: "6-8 hours",
    description: "Measures cholesterol, triglycerides, LDL, and HDL to assess cardiovascular risk.",
    preparation: "12-hour fasting required before the test.",
  },
  {
    id: "lt3",
    name: "HbA1c (Glycated Hemoglobin)",
    category: "Diabetes",
    price: 380,
    turnaround: "4-6 hours",
    description: "3-month average blood sugar level, key for diabetes diagnosis and management.",
    preparation: "No fasting required.",
  },
  {
    id: "lt4",
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Endocrinology",
    price: 520,
    turnaround: "8-12 hours",
    description: "Evaluates thyroid function to detect hypothyroidism or hyperthyroidism.",
    preparation: "Morning sample preferred. No fasting needed.",
  },
  {
    id: "lt5",
    name: "Liver Function Test (LFT)",
    category: "Biochemistry",
    price: 490,
    turnaround: "6-8 hours",
    description: "Panel of tests measuring liver enzymes, proteins, and bilirubin.",
    preparation: "Avoid alcohol for 24 hours before the test.",
  },
  {
    id: "lt6",
    name: "Kidney Function Test (KFT)",
    category: "Biochemistry",
    price: 420,
    turnaround: "4-6 hours",
    description: "Assesses kidney health by measuring creatinine, urea, and electrolytes.",
    preparation: "Stay hydrated; avoid heavy protein meal before the test.",
  },
  {
    id: "lt7",
    name: "Urine Routine & Microscopy",
    category: "Urology",
    price: 120,
    turnaround: "2-4 hours",
    description: "Basic urine analysis for infections, kidney disease, and metabolic conditions.",
    preparation: "Collect midstream morning urine sample.",
  },
  {
    id: "lt8",
    name: "COVID-19 RT-PCR",
    category: "Microbiology",
    price: 800,
    turnaround: "12-24 hours",
    description: "Gold standard test for detecting active COVID-19 infection via nasopharyngeal swab.",
    preparation: "No eating or drinking 30 minutes before swab collection.",
  },
  {
    id: "lt9",
    name: "Dengue NS1 Antigen & IgM/IgG",
    category: "Serology",
    price: 650,
    turnaround: "6-8 hours",
    description: "Panel test for early and late dengue fever detection.",
    preparation: "No special preparation required.",
  },
  {
    id: "lt10",
    name: "Vitamin D (25-OH)",
    category: "Vitamins",
    price: 1100,
    turnaround: "1-2 days",
    description: "Measures vitamin D levels to detect deficiency or toxicity.",
    preparation: "No special preparation required.",
  },
  {
    id: "lt11",
    name: "ECG / Electrocardiogram",
    category: "Cardiology",
    price: 350,
    turnaround: "Immediate",
    description: "Records electrical activity of the heart to detect abnormalities.",
    preparation: "Wear loose-fitting clothing; avoid lotions on chest area.",
  },
  {
    id: "lt12",
    name: "X-Ray Chest (PA View)",
    category: "Radiology",
    price: 300,
    turnaround: "1-2 hours",
    description: "Chest X-ray to evaluate lungs, heart, and chest wall.",
    preparation: "Remove all metallic objects and jewelry before the scan.",
  },
];

export const specializations = [
  "All Specializations",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Medicine",
  "Gynecology",
  "Psychiatry",
];

export const medicineCategories = [
  "All Categories",
  "Pain Relief",
  "Antibiotics",
  "Antiallergic",
  "Diabetes",
  "Cardiovascular",
  "Gastro",
  "Vitamins",
];

export const labCategories = [
  "All Categories",
  "Hematology",
  "Biochemistry",
  "Diabetes",
  "Endocrinology",
  "Urology",
  "Microbiology",
  "Serology",
  "Vitamins",
  "Cardiology",
  "Radiology",
];

export const bloodLocations = [
  "All Locations",
  "City Hospital, Downtown",
  "MedCare Branch, Westside",
  "HealthFirst, Northpark",
];
