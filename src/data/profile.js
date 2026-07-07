// Curated content sourced from Ajeet Singh's resume + GitHub.
export const profile = {
  name: 'Ajeet Singh',
  first: 'Ajeet',
  last: 'Singh',
  role: 'AI / ML Engineer',
  roles: ['AI / ML Engineer', 'Computer Vision', 'Generative AI · RAG', 'Hackathon Champion'],
  location: 'Chennai, India',
  email: 'itsajeetsingh386@gmail.com',
  phone: '+91 7275216797',
  github: 'https://github.com/AjeetSingh21',
  githubUser: 'AjeetSingh21',
  linkedin: 'https://linkedin.com/in/ajeet-singh-9931a6284',
  avatar: 'https://avatars.githubusercontent.com/u/229067910?v=4',
  tagline: 'A 100,000-particle mind that thinks in shapes.',
  intro:
    "I'm a CSE (AI & ML) undergrad at SRM who builds intelligent systems — computer vision, retrieval-augmented generation, and deep learning. I won the 36-hour DayZero 2.0 hackathon, research VR-based traffic safety at IIT Kharagpur, and ship end-to-end ML pipelines that actually run.",
  about:
    "First-year CGPA of 9.88, three ML internships, and an award-winning product before second year. I like the messy middle of machine learning — cleaning real data, engineering features, training models, and wiring them into things people can use. Lately I've been deep in computer vision and RAG systems.",
  stats: [
    { value: '9.88', label: 'CGPA · Year 1', accent: 'magenta' },
    { value: '1st', label: 'DayZero 2.0 hackathon', accent: 'cyan' },
    { value: '36h', label: 'to ship a winner', accent: 'gold' },
    { value: '27', label: 'public repositories', accent: 'indigo' },
  ],
}

export const skills = [
  { group: 'Languages', items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'HTML', 'CSS'] },
  { group: 'ML / DL', items: ['Scikit-learn', 'TensorFlow', 'Keras', 'ANN', 'CNN', 'NLP'] },
  { group: 'Data', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Feature Engineering'] },
  { group: 'GenAI / CV', items: ['RAG', 'Embeddings', 'Vector Search', 'Computer Vision', 'LLM Prompting'] },
  { group: 'Tools', items: ['GitHub', 'Google Colab', 'Full-Stack Web', 'REST APIs'] },
]

export const experience = [
  {
    role: 'Research Intern',
    org: 'IIT Kharagpur',
    period: '05/2026 – 07/2026',
    place: 'Kolkata',
    points: [
      'VR-based traffic-safety research: designed simulation scenarios.',
      'Collected user-interaction data and analyzed driver behavior in Python.',
      'Supported evaluation of safety interventions.',
    ],
  },
  {
    role: 'Machine Learning Intern',
    org: 'Evoastra Ventures',
    period: '12/2025 – 03/2026',
    place: 'Remote',
    points: [
      'Built end-to-end ML pipelines: cleaning, feature engineering, evaluation.',
      'Applied Scikit-learn and Pandas for reproducible workflows.',
      'Improved model performance on real-world datasets.',
    ],
  },
  {
    role: 'Machine Learning Intern',
    org: 'CodexIntern (CXI)',
    period: '11/2025 – 12/2025',
    place: 'Remote',
    points: [
      'Implemented regression and classification models in Python.',
      'Performed exploratory data analysis and model optimization.',
      'Focused on supervised-learning fundamentals with Scikit-learn.',
    ],
  },
]

export const education = [
  {
    school: 'SRM Institute of Science and Technology',
    degree: 'B.Tech, Computer Science (AI & ML)',
    period: '06/2024 – Present',
    place: 'Chennai',
    note: 'CGPA 9.88 (Year 1)',
  },
  { school: 'The Scindia School', degree: 'Schooling', period: '2018 – 2022', place: 'Gwalior', note: '' },
]

export const certificates = [
  { title: 'DayZero 2.0 — 1st Place', org: 'CodeNex', note: 'Won the 36-hour hackathon.' },
  { title: 'Code to Cloud: Generative AI Mastery', org: 'Aarush 2025', note: 'Azure & Databricks workshop.' },
  { title: 'Hands-On IoT & AI at the Edge', org: 'Workshop', note: 'Edge-computing IoT systems.' },
]

// Flagship projects (resume). repo === null => featured without a public repo.
export const flagship = [
  {
    id: 'readyme',
    name: 'ReadyMe',
    badge: '🏆 DayZero 2.0 Winner',
    tag: 'AI Virtual Try-On',
    period: '04/2026 – Present',
    blurb:
      'AI-powered virtual try-on. Estimates body measurements from user images and recommends accurate clothing sizes — cutting online-shopping uncertainty and return rates.',
    tech: ['Computer Vision', 'Body Estimation', 'Python', 'Deep Learning'],
    repo: null,
    live: null,
    color: '#16E0FF',
  },
  {
    id: 'rag',
    name: 'PDF RAG System',
    tag: 'Retrieval-Augmented Generation',
    period: '11/2025 – 01/2026',
    blurb:
      'Document-grounded QA pipeline: chunking + semantic embeddings, vector similarity search for context-aware retrieval, and LLM prompting for accurate, grounded answers.',
    tech: ['RAG', 'Embeddings', 'Vector Search', 'LLM', 'Python'],
    repo: 'https://github.com/AjeetSingh21',
    live: null,
    color: '#5B6CFF',
  },
  {
    id: 'mask',
    name: 'Mask Detection',
    tag: 'CNN · Computer Vision',
    period: '10/2025 – 11/2025',
    blurb:
      'CNN for binary image classification in TensorFlow/Keras. Applied preprocessing and augmentation to improve accuracy, evaluated with validation metrics.',
    tech: ['TensorFlow', 'Keras', 'CNN', 'Augmentation'],
    repo: 'https://github.com/AjeetSingh21/Mask-Detection',
    live: null,
    color: '#FF2BD6',
  },
  {
    id: 'cereal',
    name: 'The Cereal Network',
    tag: 'Full-Stack Web App',
    period: '07/2025 – 08/2025',
    blurb:
      'Full-stack web application with backend integration, data-driven workflows and API logic on a scalable frontend-backend architecture.',
    tech: ['JavaScript', 'Full-Stack', 'REST API'],
    repo: 'https://github.com/AjeetSingh21/CerealNetwork',
    live: 'https://cereal-network-b12a.vercel.app/',
    color: '#FFE08A',
  },
  {
    id: 'vr',
    name: 'VR Traffic-Safety Research',
    tag: 'IIT Kharagpur · Research',
    period: '05/2026 – 07/2026',
    blurb:
      'VR-based driver-behavior study: designed simulation scenarios, collected interaction data, and analyzed safety interventions in Python.',
    tech: ['VR', 'Python', 'Data Analysis', 'Research'],
    repo: null,
    live: null,
    color: '#B388FF',
  },
]
