// Script to seed Firestore database with initial alumni data
// Run this script after setting up Firebase and Firestore

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample alumni data
const alumniData = [
  {
    name: 'Dr. Sarah Johnson',
    batch: '2015',
    profession: 'Medical Doctor',
    location: 'New York, NY',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    email: 'sarah.johnson@email.com',
    company: 'Mount Sinai Hospital',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 8 years of experience in interventional cardiology. She specializes in treating complex cardiovascular conditions and has published numerous research papers in leading medical journals.',
    education: 'MD from Harvard Medical School, Residency at Johns Hopkins Hospital',
    achievements: ['Board Certified Cardiologist', 'Published 15+ research papers', 'Speaker at American Heart Association Conference 2023'],
    interests: ['Cardiovascular Research', 'Medical Education', 'Community Health Outreach'],
    skills: ['Interventional Cardiology', 'Echocardiography', 'Cardiac Catheterization', 'Research Methodology']
  },
  {
    name: 'Michael Chen',
    batch: '2018',
    profession: 'Software Engineer',
    location: 'San Francisco, CA',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    email: 'michael.chen@email.com',
    company: 'Google',
    linkedin: 'https://linkedin.com/in/michaelchen',
    bio: 'Michael Chen is a senior software engineer at Google, specializing in machine learning and distributed systems. He has contributed to several open-source projects and holds multiple patents in AI technology.',
    education: 'BS in Computer Science from Stanford University, MS in Machine Learning from MIT',
    achievements: ['Senior Software Engineer at Google', '5+ patents in AI technology', 'Open Source Contributor'],
    interests: ['Machine Learning', 'Open Source Development', 'Tech Mentorship'],
    skills: ['Python', 'TensorFlow', 'Distributed Systems', 'Machine Learning', 'Go', 'Kubernetes']
  },
  {
    name: 'Emily Rodriguez',
    batch: '2016',
    profession: 'Marketing Manager',
    location: 'Chicago, IL',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    email: 'emily.rodriguez@email.com',
    company: 'Nike',
    linkedin: 'https://linkedin.com/in/emilyrodriguez',
    bio: 'Emily Rodriguez leads global marketing campaigns for Nike, focusing on digital transformation and brand engagement. She has successfully launched campaigns that reached over 100 million consumers worldwide.',
    education: 'MBA from Northwestern Kellogg School of Management, BS in Marketing from University of Illinois',
    achievements: ['Global Marketing Manager at Nike', 'Launched 10+ successful campaigns', 'Digital Marketing Excellence Award 2022'],
    interests: ['Digital Marketing', 'Brand Strategy', 'Sports Marketing'],
    skills: ['Digital Marketing', 'Brand Strategy', 'Campaign Management', 'Data Analytics', 'Social Media Marketing']
  },
  {
    name: 'David Kim',
    batch: '2017',
    profession: 'Financial Analyst',
    location: 'Boston, MA',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    email: 'david.kim@email.com',
    company: 'Goldman Sachs',
    linkedin: 'https://linkedin.com/in/davidkim',
    bio: 'David Kim is a senior financial analyst at Goldman Sachs, specializing in investment banking and corporate finance. He has advised on deals worth over $50 billion across various industries.',
    education: 'MBA from Harvard Business School, BS in Finance from University of Pennsylvania',
    achievements: ['Senior Financial Analyst at Goldman Sachs', 'Advised on $50B+ in deals', 'CFA Charterholder'],
    interests: ['Investment Banking', 'Corporate Finance', 'Market Analysis'],
    skills: ['Financial Modeling', 'Valuation', 'Due Diligence', 'Excel', 'Bloomberg Terminal']
  },
  {
    name: 'Lisa Thompson',
    batch: '2014',
    profession: 'Lawyer',
    location: 'Washington, DC',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    email: 'lisa.thompson@email.com',
    company: 'Baker McKenzie',
    linkedin: 'https://linkedin.com/in/lisathompson',
    bio: 'Lisa Thompson is a partner at Baker McKenzie, specializing in international business law and regulatory compliance. She has represented Fortune 500 companies in complex cross-border transactions.',
    education: 'JD from Yale Law School, BA in Political Science from Georgetown University',
    achievements: ['Partner at Baker McKenzie', 'Recognized in Chambers Global 2023', 'Board Member of International Law Association'],
    interests: ['International Law', 'Regulatory Compliance', 'Legal Education'],
    skills: ['International Business Law', 'Regulatory Compliance', 'Contract Negotiation', 'Cross-border Transactions']
  },
  {
    name: 'James Wilson',
    batch: '2019',
    profession: 'Data Scientist',
    location: 'Seattle, WA',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    email: 'james.wilson@email.com',
    company: 'Amazon',
    linkedin: 'https://linkedin.com/in/jameswilson',
    bio: 'James Wilson is a senior data scientist at Amazon, working on recommendation systems and customer behavior analysis. He has developed algorithms that improved customer engagement by 25%.',
    education: 'MS in Data Science from University of Washington, BS in Mathematics from UC Berkeley',
    achievements: ['Senior Data Scientist at Amazon', 'Improved customer engagement by 25%', 'Published 8 research papers'],
    interests: ['Machine Learning', 'Big Data', 'Customer Analytics'],
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistical Analysis', 'AWS']
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    console.log('Starting to seed Firestore database...');
    
    const alumniCollection = collection(db, 'alumni');
    
    for (const alumni of alumniData) {
      const docRef = await addDoc(alumniCollection, {
        ...alumni,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`Added alumni: ${alumni.name} with ID: ${docRef.id}`);
    }
    
    console.log('Database seeding completed successfully!');
    console.log(`Added ${alumniData.length} alumni members to the database.`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seeding function
seedDatabase();
