export const links = {
  github: 'https://github.com/TahmidZ68?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/md-tahmid-zoayed-39355037b/',
  kaggle: 'https://www.kaggle.com/mdtahmidzoayed',
  email: 'mohammadtahmidzoayed@gmail.com',
  cv: 'https://drive.google.com/file/d/1JUw7iwuY8GUJJ-NBDeCdbyZZ5LK2mp0s/view?usp=drive_link',
};

export const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  kicker: 'Currently AI Engineer & CBO at Axios Station',
  title: 'AI Engineer · CBO',
  name: 'Md Tahmid Zoayed',
  headline: 'Building AI systems, intelligent products, and automation for real-world problems.',
  lede: [
    "I'm a Computer Science & Engineering graduate specializing in Data Science and Intelligent Systems, currently working as a CBO & AI Engineer at Axios Station.",
    'My work sits at the intersection of Artificial Intelligence, Machine Learning, software engineering, automation, data, product development, and business strategy.',
  ],
  tags: ['AI Engineering', 'AI Automation', 'Machine Learning', 'Intelligent Products'],
};

export const about = {
  paragraphs: [
    "I'm an AI Engineer and technology-focused business professional with a background in Computer Science, Data Science, Machine Learning, and business development.",
    'My journey has taken me from academic machine-learning projects and computer-vision research to building and deploying AI-powered products.',
    'Today, at Axios Station, I work across both technology and business as CBO & AI Engineer — and that combination shapes how I approach engineering.',
    "I don't start by asking which AI model to use.",
    'I start with one question:',
    'What problem are we trying to solve?',
    'From there, I work through the data, architecture, AI components, automation, user experience, deployment, and business value.',
    "I'm particularly interested in building AI systems that are practical, scalable, and useful outside of a research notebook.",
  ],
};

export const experience = [
  {
    company: 'Axios Station',
    role: 'CBO & AI Engineer',
    period: '2026 — Present',
    text: 'Working across AI engineering, product development, business strategy, and technology.',
    skills: [
      'Designing AI-powered products', 'Developing LLM-based applications', 'Building AI automation systems',
      'Integrating AI APIs and services', 'Designing application architectures', 'Developing product strategies',
      'Translating business requirements into technical solutions', 'Exploring AI-driven business opportunities',
      'Taking products from concept to deployment',
    ],
    quote: 'I help turn technology into products, and products into businesses.',
  },
  {
    company: 'Talent Centric / Go Global',
    role: 'Business Development Executive',
    period: 'Previous',
    text: 'Worked in business development within the international education and student consultancy sector.',
    skills: [
      'Business development', 'Client communication', 'Lead generation', 'Market research',
      'Partnership development', 'Sales and relationship management', 'Business operations', 'Digital workflows',
    ],
    note: 'This experience strengthened my ability to understand users, markets, clients, and commercial problems — skills I now combine with my technical background.',
  },
  {
    company: 'EWU Computer Programming Club',
    role: 'General Secretary',
    period: '',
    text: "Contributed to the university's programming community and student technical activities. Worked around technical events, student engagement, programming initiatives, and community activities.",
    skills: [],
  },
];

export const education = [
  {
    institution: 'East West University',
    degree: 'Bachelor of Science in Computer Science & Engineering',
    major: 'Data Science and Intelligent Systems',
    period: '2019 — 2023',
    meta: 'Graduated February 2024',
    text: 'My undergraduate studies focused on computer science, data science, machine learning, artificial intelligence, intelligent systems, and software development.',
  },
  {
    institution: 'Dhaka Imperial College',
    degree: 'Higher Secondary Certificate',
    major: '',
    period: '2016 — 2018',
    meta: '',
    text: '',
  },
  {
    institution: 'National School and College',
    degree: 'Secondary School Certificate',
    major: '',
    period: '',
    meta: '',
    text: '',
  },
];

export const stackGroups = [
  { label: 'Artificial Intelligence', items: ['Machine Learning', 'Deep Learning', 'Generative AI', 'LLMs', 'NLP', 'Computer Vision', 'Explainable AI', 'Meta-Learning', 'Domain Generalization'] },
  { label: 'Machine Learning', items: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'CNNs', 'Classification', 'Regression', 'Object Detection', 'Predictive Modeling'] },
  { label: 'Computer Vision', items: ['OpenCV', 'YOLO', 'Faster R-CNN', 'Image Classification', 'Object Detection', 'Image Restoration', 'Medical Imaging'] },
  { label: 'Data & Analytics', items: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'Statistical Analysis', 'Data Visualization', 'Tableau', 'Excel'] },
  { label: 'Programming', items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'HTML', 'CSS'] },
  { label: 'AI APIs & Automation', items: ['OpenAI API', 'Groq API', 'OCR', 'Nanonets', 'REST APIs', 'Workflow Automation', 'Document AI', 'Intelligent Data Extraction'] },
  { label: 'Development & Tools', items: ['Git', 'GitHub', 'Replit', 'VS Code', 'Android Studio', 'Tableau', 'Google Analytics'] },
];

export const featuredProjects = [
  {
    title: 'Axios Talent',
    subtitle: 'AI-Powered Hiring Intelligence',
    text: 'Axios Talent is an AI-powered recruitment platform designed to help candidates and hiring teams make better decisions using intelligent resume, job-description, and candidate analysis.',
    intro: 'The platform combines resume intelligence, candidate analysis, job matching, AI-assisted hiring, and recruitment workflows into a unified ecosystem.',
    capabilities: [
      'Resume analysis', 'Resume information extraction', 'Job description analysis', 'Candidate-job matching',
      'Resume-to-JD compatibility analysis', 'Candidate recommendations', 'AI-powered interview assistance',
      'Candidate intelligence', 'Recruitment workflows', 'AI-assisted hiring decisions',
    ],
    focus: 'LLMs · NLP · Document AI · AI Automation · Recruitment Technology',
    links: [
      { label: 'Candidate Platform', url: 'https://axios-talent-candidate.vercel.app', type: 'candidate' },
      { label: 'Recruiter Platform', url: 'https://axios-talent-tau.vercel.app', type: 'recruiter' },
      { label: 'GitHub', url: links.github, type: 'github' },
    ],
  },
  {
    title: 'Axios Insight',
    subtitle: 'AI-Powered Data Intelligence',
    text: 'Axios Insight is an AI-powered data analysis platform designed to make data exploration and analysis more accessible through natural-language interaction.',
    intro: 'Instead of requiring users to manually perform every analytical operation, Axios Insight allows them to interact with their data and receive intelligent analysis, visualizations, forecasts, and insights.',
    capabilities: [
      'Conversational data analysis', 'Automatic dataset profiling', 'Data quality analysis', 'Statistical analysis',
      'Correlation discovery', 'Forecasting', 'Automated insights', 'Data visualization',
      'AI-generated reports', 'Natural-language data querying',
    ],
    focus: 'AI · Data Science · LLMs · Data Analysis · Visualization · Automation',
    links: [
      { label: 'Live Demo', url: 'https://axios-insight-v1-three.vercel.app', type: 'live' },
      { label: 'GitHub', url: links.github, type: 'github' },
    ],
  },
];

export const academicProjects = [
  { title: 'Autism Classification', focus: 'Machine Learning · Classification · Data Analysis', conference: 'ICDMIS 2024' },
  { title: 'COVID-19 & Pneumonia X-Ray Classification', focus: 'Deep Learning · CNNs · Computer Vision · Medical Imaging' },
  { title: 'Startup Success Rate Prediction', focus: 'Machine Learning · Predictive Analytics · Data Science' },
  { title: 'Obesity Prediction', focus: 'Machine Learning · Classification · Data Analysis' },
  { title: 'Car Price Prediction', focus: 'Regression · Machine Learning · Data Analysis' },
  { title: 'Spirulina Harvesting', focus: 'Research · Engineering · Sustainability' },
  { title: 'Rainwater Harvesting', focus: 'Sustainability · Engineering · Resource Management' },
];

export const research = {
  heading: 'Meta-Learning and Explainable AI for Domain-Generalized Computer Vision Systems',
  text: 'My research interests focus on developing computer-vision systems that can remain reliable when the environment, image quality, and data distribution change. The broader objective is to build AI systems that are both adaptive and interpretable.',
  areas: ['Meta-Learning', 'Domain Generalization', 'Explainable AI', 'Computer Vision', 'Object Detection', 'Deep Learning', 'Adaptive AI Systems', 'Robust AI'],
  direction: 'Adaptive Object Detection in Low-Quality Environments',
  directionText: 'One research direction I have explored involves an adaptive computer-vision pipeline. The system first identifies image degradation, adapts the restoration process, and then performs object detection on the improved representation.',
  pipeline: ['Degradation Classification', 'Adaptive Restoration', 'Object Detection'],
  closing: 'The goal is to investigate whether computer-vision systems can maintain better performance when operating under real-world image-quality constraints.',
};

export const researchInterests = [
  { label: 'Artificial Intelligence', items: ['LLMs', 'Generative AI', 'Machine Learning', 'Deep Learning'] },
  { label: 'Computer Vision', items: ['Object Detection', 'Image Restoration', 'Domain Generalization', 'Explainable AI'] },
  { label: 'Intelligent Systems', items: ['Meta-Learning', 'Adaptive Systems', 'Decision Intelligence'] },
  { label: 'AI Automation', items: ['AI Agents', 'Workflow Automation', 'Document Intelligence', 'Intelligent Data Extraction'] },
  { label: 'Data Intelligence', items: ['Data Analytics', 'Predictive Analytics', 'Visualization', 'Business Intelligence'] },
];

export const researchExperience = {
  role: 'Research Assistant',
  org: 'Bangladesh Agricultural University',
  period: 'April 2022 — August 2022',
  text: 'Worked on research involving Spirulina harvesting-time prediction.',
  contributions: [
    'Collected laboratory data', 'Managed daily experimental data', 'Developed an image dataset',
    'Built image-preprocessing pipelines', 'Developed CNN-based models', 'Conducted experimental evaluation',
    'Tuned model architectures', 'Supported manuscript preparation',
  ],
  note: 'The project involved creating a novel image dataset from daily observations and developing deep-learning models to predict harvesting time.',
};

export const publications = [
  { title: 'Rainwater Harvesting and Reducing Biological Threat of Utilizing', detail: 'Research publication / conference work, 2023.' },
  { title: 'Autism Disease Detection Using Classification Algorithms', detail: 'Machine-learning research on classification-based autism detection.' },
  { title: 'Autism Detecting Model Using Image', detail: 'Deep-learning research involving image-based autism detection.' },
  { title: 'Startup Success Prediction Using Classification Algorithms', detail: 'Machine-learning research focused on startup-success prediction.' },
  { title: 'Spirulina Harvesting-Time Prediction Using Deep Learning', detail: 'Research focused on predicting harvesting time using image-based deep learning.' },
];

export const processSteps = [
  { num: '01', title: 'Understand', text: 'Start with the actual problem and requirements.' },
  { num: '02', title: 'Design', text: 'Define the data flow, architecture, AI components, and user experience.' },
  { num: '03', title: 'Build', text: 'Develop the models, APIs, application, database, and automation layers.' },
  { num: '04', title: 'Integrate', text: 'Connect AI with the rest of the product instead of treating the model as the entire solution.' },
  { num: '05', title: 'Deploy', text: 'Turn the system into something users can actually interact with.' },
  { num: '06', title: 'Improve', text: 'Measure, test, learn, and iterate.' },
];

export const beyondAI = {
  intro: "I'm interested in applying technology to problems beyond conventional software and AI applications.",
  label: 'Areas I want to explore further include:',
  areas: ['Energy systems', 'Climate intelligence', 'Earth observation', 'Disaster intelligence', 'Scientific computing', 'AI for scientific research', 'Large-scale real-world data analysis'],
  closing: 'Use intelligent systems to understand complex real-world problems.',
};

export const currentFocus = [
  { title: 'Building', text: 'AI-powered products, automation systems, and intelligent applications through Axios Station.' },
  { title: 'Researching', text: 'Meta-learning, explainable AI, domain generalization, and adaptive computer vision.' },
  { title: 'Exploring', text: 'AI for science, energy, climate intelligence, and large-scale real-world systems.' },
  { title: 'Preparing', text: 'For graduate research in Artificial Intelligence and intelligent systems.' },
];

export const careerFocus = {
  tags: ['AI Engineering', 'Machine Learning Engineering', 'AI Automation', 'LLM Applications', 'Computer Vision', 'Intelligent Systems', 'AI Product Engineering', 'Applied AI Research'],
  statementLead: "I'm particularly interested in environments where I can combine:",
  statement: 'Research + Engineering + Product + Business',
};

export const onlinePresence = [
  { label: 'GitHub', handle: 'TahmidZ68', text: 'Source code, AI applications, machine-learning projects, experiments, and development work.', url: links.github, icon: 'Github' },
  { label: 'Kaggle', handle: 'Md. Tahmid Zoayed', text: 'Machine-learning notebooks, datasets, experiments, and data-science work.', url: links.kaggle, icon: 'ExternalLink' },
  { label: 'LinkedIn', handle: 'Md Tahmid Zoayed', text: 'Professional updates, career experience, AI engineering, product development, research, and business.', url: links.linkedin, icon: 'Linkedin' },
];

export const contact = {
  heading: "Let's Build Something",
  options: ['Have an AI problem?', 'Building an AI product?', 'Looking for an AI engineer?', 'Interested in research collaboration?'],
  cta: "Let's talk.",
  email: links.email,
};
