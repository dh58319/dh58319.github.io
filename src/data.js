// Edit this file to update your portfolio content.
export const profile = {
  name: 'Donghyun Kim',
  title: 'PhD Student · Artificial Intelligence',
  affiliation: 'Ajou University, Suwon, South Korea',
  email: 'dh58319@ajou.ac.kr',
  location: 'South Korea',
  // To enable the "CV" button: drop your PDF at public/cv.pdf and set cv: '/cv.pdf'
  cv: '',
  // Social links shown as icons. Available icons: email, linkedin, github, scholar, twitter.
  socials: [
    { label: 'Email', href: 'mailto:dh58319@ajou.ac.kr', icon: 'email' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/donghyun-kim-1b538a225',
      icon: 'linkedin',
    },
    { label: 'GitHub', href: 'https://github.com/dh58319', icon: 'github' },
    // { label: 'Google Scholar', href: 'https://scholar.google.com/', icon: 'scholar' },
  ],
}

// Short timeline of recent updates, shown on the Home page.
export const news = [
  {
    date: 'Mar 2024',
    text: 'Started my integrated M.S and Ph.D. in Artificial Intelligence at Ajou University.',
  },
  {
    date: '2023',
    text: 'Won the Grand Prize at the Virtual Environment-based Autonomous Driving Competition.',
  },
]

export const bio = [
  `I am a Ph.D. student in Artificial Intelligence at Ajou University, where I also
   completed my B.E. in Computer Science (Software) and a micro degree in Artificial
   Intelligence in Medicine.`,
  `I am interested in machine learning and deep learning, especially for robot learning, 
  Vision-Language-Action models, and embodied AI. With hands-on experience in PyTorch and software development, 
  I enjoy applying AI to real-world problems where perception, reasoning, and action must work together. 
  My current research focuses on building reliable multimodal systems that can understand physical environments and support robust robotic execution.`,
]

export const publications = []

export const experience = [
  {
    role: 'KATUSA, Eighth Army Public Affairs Office',
    org: 'US Eighth Army',
    period: 'May 2020 – Nov 2021',
    location: 'Pyeongtaek, Gyeonggi-do, South Korea',
    points: [
      'Served military duty as a KATUSA (Korean Augmentation To the United States Army).',
      'Produced graphics, videos, and photography for the Public Affairs Office.',
    ],
  },
]

export const education = [
  {
    degree: 'Ph.D. in Artificial Intelligence',
    org: 'Ajou University',
    period: 'Mar 2024 – Feb 2030 (expected)',
    note: '',
  },
  {
    degree: 'Micro degree in Artificial Intelligence in Medicine',
    org: 'Ajou University',
    period: 'Feb 2024',
    note: '',
  },
  {
    degree: 'B.E. in Computer Science (Software)',
    org: 'Ajou University',
    period: '2018 – Feb 2024',
    note: '',
  },
]

export const skills = [
  'PyTorch',
  'Machine Learning',
  'Deep Learning',
  'Software Development',
  'Vision-Language-Action Models',
  'Docker'
]

export const awards = [
  {
    title:
      'Grand Prize — Virtual Environment-based Autonomous Driving Competition',
    year: 2023,
  },
  { title: '2023 Medical AI Idea Competition', year: 2023 },
]

export const researchInterests = [
'Vision-Language-Action Models',
  'Machine Learning & Deep Learning',
  'Medical Artificial Intelligence',
  'Computer Vision',
]

export const researchProjects = [
  {
    title: 'Virtual Environment-based Autonomous Driving',
    period: '2023',
    summary:
      'Developed and tuned deep learning models for autonomous driving in a virtual environment. Awarded the Grand Prize at the competition.',
    tags: ['Vision-Language-Action Models', 'OpenCV', 'Computer Vision'],
    // Optional links: { label: 'Code', href: '...' }, { label: 'Demo', href: '...' }
    links: [],
  },
  {
    title: 'Medical AI Idea',
    period: '2023',
    summary:
      'Explored applications of artificial intelligence to medical problems as part of the 2023 Medical AI Idea Competition.',
    tags: ['Medical AI', 'Machine Learning'],
    links: [],
  },
]

// Teaching / mentoring activities. Add entries as needed.
export const teaching = [
  // {
  //   role: 'Teaching Assistant',
  //   course: 'Introduction to Machine Learning',
  //   org: 'Ajou University',
  //   period: 'Spring 2025',
  // },
]
