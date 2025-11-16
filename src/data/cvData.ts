import { CVData } from '../types';

export const CV_DATA: CVData = {
  personalInfo: {
    fullName: 'John Doe',
    professionalTitle: 'Full Stack Developer',
    avatarUrl: ''
  },
  profile: 'Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications. Strong background in React, Node.js, and cloud technologies. Passionate about clean code and user experience.',
  contact: {
    email: 'john.doe@email.com',
    phone: '+1 234 567 890',
    location: 'New York, USA',
    github: 'github.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe',
    fields: [
      { id: 'contact-1', type: 'email', label: 'Email', value: 'john.doe@email.com' },
      { id: 'contact-2', type: 'phone', label: 'Phone', value: '+1 234 567 890' },
      { id: 'contact-3', type: 'location', label: 'Location', value: 'New York, USA' },
      { id: 'contact-4', type: 'github', label: 'GitHub', value: 'github.com/johndoe' },
      { id: 'contact-5', type: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/johndoe' }
    ]
  },
  skills: [
    { id: 'skill-1', value: 'Project Management' },
    { id: 'skill-2', value: 'Team Leadership' },
    { id: 'skill-3', value: 'Agile Methodologies' },
    { id: 'skill-4', value: 'Problem Solving' },
    { id: 'skill-5', value: 'Communication' }
  ],
  technologies: [
    {
      id: 'tech-1',
      title: 'Frontend',
      items: 'React, TypeScript, Next.js, Tailwind CSS, Redux'
    },
    {
      id: 'tech-2',
      title: 'Backend',
      items: 'Node.js, Express, NestJS, PostgreSQL, MongoDB'
    },
    {
      id: 'tech-3',
      title: 'DevOps',
      items: 'Docker, AWS, CI/CD, Kubernetes, GitHub Actions'
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      missions: [
        'Led development of microservices architecture serving 100k+ users',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored junior developers and conducted code reviews'
      ]
    },
    {
      id: 'exp-2',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      missions: [
        'Built responsive web applications using React and Node.js',
        'Optimized database queries improving performance by 40%',
        'Collaborated with design team to implement pixel-perfect UIs'
      ]
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services'
    },
    {
      id: 'cert-2',
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org'
    }
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'Native' },
    { id: 'lang-2', name: 'Spanish', level: 'Professional' },
    { id: 'lang-3', name: 'French', level: 'Intermediate' }
  ],
  customSections: [
    {
      id: 'custom-education',
      title: 'Education',
      subtitle: 'Academic Background',
      blocks: [
        {
          id: 'edu-1',
          content: 'Bachelor of Science in Computer Science - Massachusetts Institute of Technology (2015-2019)'
        },
        {
          id: 'edu-2',
          content: 'High School Diploma - Boston High School (2011-2015)'
        }
      ]
    }
  ],
  sectionOrder: [
    'personal',
    'profile',
    'skills',
    'technologies',
    'experiences',
    'certifications',
    'languages',
    'custom-education'
  ],
  sectionTitles: {
    profile: 'Professional Profile',
    skills: 'Core Skills',
    technologies: 'Technical Environment',
    experiences: 'Professional Experience',
    certifications: 'Certifications',
    languages: 'Languages'
  },
  sectionLabels: {
    personal: 'Personal Information',
    contact: 'Contact',
    profile: 'Profile',
    skills: 'Skills',
    technologies: 'Technologies',
    experiences: 'Experiences',
    certifications: 'Certifications',
    languages: 'Languages',
    customSections: 'Custom Sections'
  }
};