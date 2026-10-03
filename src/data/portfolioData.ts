import { ProjectItem, GalleryItem, ExperienceItem, EducationItem, ArsenalCategory } from '../types/portfolio';
import portraitClear from '../assets/images/clear.png';
import portraitGlasses from '../assets/images/glasses.png';
import buddySticker from '../assets/images/buddy.png';
import projectSaas from '../assets/images/project_saas_analytics_1791001627387.jpg';
import projectBrand from '../assets/images/project_brand_system_1791001638996.jpg';
import projectMobile from '../assets/images/project_mobile_experience_1791001652768.jpg';

export const HERO_ASSETS = {
  portraitClear,
  portraitGlasses,
  buddy: buddySticker,
  projectSaas,
  projectBrand,
  projectMobile,
};



export const PROFILE_INFO = {
  name: 'Wijaya Kusuma Bangsa',
  role: 'Website Developer',
  tagline: 'Crafting high-performance web applications, aesthetic design systems, and creative visual experiences.',
  bio: 'Website Developer blending modern front-end architecture, refined aesthetics, and intuitive user experiences. Specializing in responsive web apps, interactive portfolios, and creative digital products.',
  availability: 'Available for new ventures & select Q3 design contracts',
  status: 'Available',
  location: 'Jakarta, Indonesia · Remote Worldwide',
  stats: [
    { label: 'TOTAL CLIENT VALUE', value: '$140K+' },
    { label: 'FOUNDERS HELPED', value: '45+' },
    { label: 'PRODUCTS SHIPPED', value: '18 Shipped' },
    { label: 'ACQUISITIONS & EXITS', value: '2' },
  ],
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'pulse-saas',
    title: 'Pulse Intelligence',
    subtitle: 'Autonomous Analytics & Growth Orchestration Dashboard',
    category: 'saas',
    categoryLabel: 'SaaS Platform',
    image: HERO_ASSETS.projectSaas,
    metrics: '+184% User Activation',
    liveUrl: 'https://pulse-saas.example.com',
    year: '2025',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Figma Systems', 'Data Vis'],
    role: 'Lead Product Designer & Frontend Engineer',
    description: 'A dark-mode analytics console designed for high-frequency SaaS operators. Built with sub-100ms micro-interactions, responsive data density controls, and intuitive node pipelines.',
    challenge: 'Operators were overwhelmed by disconnected telemetry screens and slow query visualizations.',
    solution: 'Designed an unified canvas with keyboard-first shortcuts, luminous purple signal charting, and real-time streaming status indicators.',
  },
  {
    id: 'lumina-brand',
    title: 'Lumina Spatial Identity',
    subtitle: 'Comprehensive Brand Architecture & Visual System',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    image: HERO_ASSETS.projectBrand,
    metrics: 'Red Dot Design Finalist',
    liveUrl: 'https://lumina-brand.example.com',
    year: '2024',
    tags: ['Brand Strategy', 'Typography Specimen', 'Design System', '3D Asset Creation'],
    role: 'Creative Director & Identity Architect',
    description: 'Complete brand repositioning for a next-gen spatial audio laboratory. Developed custom geometric typography, tactile print collateral with holographic foil, and responsive digital guidelines.',
    challenge: 'The brand lacked cohesive luxury weight across physical packaging and responsive web environments.',
    solution: 'Established a dark obsidian aesthetic paired with iridescent violet foil and strict modular typographic scales.',
  },
  {
    id: 'apex-mobile',
    title: 'Apex Financial Experience',
    subtitle: 'Next-Generation Wealth Management & Mobile Exchange',
    category: 'mobile',
    categoryLabel: 'Mobile Application',
    image: HERO_ASSETS.projectMobile,
    metrics: '4.9/5 Rating (120K Downloads)',
    liveUrl: 'https://apex-mobile.example.com',
    year: '2024',
    tags: ['iOS', 'React Native', 'Tactile Motion', 'Micro-Interactions'],
    role: 'Principal Mobile UI/UX Designer',
    description: 'A mobile wealth engine engineered with zero-friction biometrics, real-time portfolio heatmaps, and customizable card widgets.',
    challenge: 'Users suffered drop-offs during complex multi-asset rebalancing flows.',
    solution: 'Engineered a one-thumb progressive disclosure flow with physical haptic rhythm and fluid spring cards.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Pulse Intelligence SaaS Interface',
    category: 'uiux',
    categoryLabel: 'UI/UX & Web',
    image: HERO_ASSETS.projectSaas,
    year: '2025',
    client: 'Pulse Dynamics Inc.',
    tags: ['Dashboard', 'Dark Mode', 'Design System'],
    description: 'High-density telemetry dashboard with custom dark mode glassmorphism and violet luminescence.',
    impact: 'Reduced mean time to insight by 42% across 18,000 active users.',
    tools: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'gal-2',
    title: 'Lumina Brand & Identity System',
    category: 'branding',
    categoryLabel: 'Brand Systems',
    image: HERO_ASSETS.projectBrand,
    year: '2024',
    client: 'Lumina Spatial Lab',
    tags: ['Brand Guidelines', 'Identity', 'Typography'],
    description: 'Holistic visual identity including generative wordmarks, stationery, and tactile product packaging.',
    impact: 'Helped secure $3.2M Series Seed funding with premium visual credibility.',
    tools: ['Illustrator', 'Photoshop', 'Blender 3D', 'InDesign'],
  },
  {
    id: 'gal-3',
    title: 'Apex Mobile Wealth Experience',
    category: 'mobile',
    categoryLabel: 'Mobile Apps',
    image: HERO_ASSETS.projectMobile,
    year: '2024',
    client: 'Apex Fintech Group',
    tags: ['iOS App', 'Fintech', 'Interaction Design'],
    description: 'Fluid iOS design with card stacks, thumb-reach navigation, and responsive financial charts.',
    impact: 'Drove 4.9 App Store rating across 120,000+ active mobile investors.',
    tools: ['Figma', 'Principle', 'SwiftUI Prototypes', 'After Effects'],
  },
  {
    id: 'gal-4',
    title: 'Chroma Design System v3.0',
    category: 'engineering',
    categoryLabel: 'Design Engineering',
    image: HERO_ASSETS.projectSaas,
    year: '2025',
    client: 'Open Source / Enterprise',
    tags: ['Design Tokens', 'Storybook', 'WCAG AA'],
    description: 'Enterprise grade tokenized component library with multi-theme support and zero-dependency accessibility primitives.',
    impact: 'Accelerated cross-team sprint delivery times by 3.5x.',
    tools: ['TypeScript', 'Tailwind', 'Storybook', 'Figma Tokens'],
  },
  {
    id: 'gal-5',
    title: 'Verve Spatial Hardware Visuals',
    category: 'visual3d',
    categoryLabel: 'Visual Design & 3D',
    image: HERO_ASSETS.projectBrand,
    year: '2023',
    client: 'Verve Technologies',
    tags: ['3D Modeling', 'Render', 'Key Visuals'],
    description: 'High-contrast studio product renders and editorial packaging visuals for spatial hardware prototypes.',
    impact: 'Featured on Behance Curated Galleries in Industrial Design.',
    tools: ['Cinema 4D', 'Octane Render', 'Photoshop'],
  },
  {
    id: 'gal-6',
    title: 'Nova AI Agent Flow Studio',
    category: 'uiux',
    categoryLabel: 'UI/UX & Web',
    image: HERO_ASSETS.projectMobile,
    year: '2025',
    client: 'Nova Labs',
    tags: ['AI Interface', 'Visual Canvas', 'Flow Builder'],
    description: 'Drag-and-drop conversational node canvas with real-time prompt testbeds and semantic routing graphs.',
    impact: 'Adopted by over 450 enterprise AI developers in early access.',
    tools: ['Figma', 'React Flow', 'Motion', 'Tailwind CSS'],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Product Designer & Design Engineer',
    company: 'Vanguard Digital Studio',
    period: '2023 — Present',
    description: 'Leading product design and front-end design system architecture for enterprise SaaS clients and high-growth fintech startups.',
    achievements: [
      'Architected cross-platform design token system cutting engineering handoff cycle from 3 weeks to 4 days.',
      'Designed end-to-end user journeys for 5 venture-backed web products resulting in over $12M aggregate capital raised.',
      'Spearheaded dark mode visual language and accessibility compliance standards across all design deliverables.',
    ],
    technologies: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Design Systems'],
  },
  {
    id: 'exp-2',
    role: 'Senior UI/UX & Interaction Designer',
    company: 'HyperPixel Creative',
    period: '2021 — 2023',
    description: 'Crafted bespoke digital brand identities, interactive marketing experiences, and web app prototypes for global tech innovators.',
    achievements: [
      'Designed award-winning interactive landing pages with custom WebGL and SVG micro-interactions.',
      'Mentored a squad of 4 junior and mid-level designers in motion design, typography math, and component architecture.',
      'Collaborated closely with founders on seed-stage pitch decks and interactive clickable prototypes.',
    ],
    technologies: ['Figma', 'Design Systems', 'Spline 3D', 'Next.js', 'Prototyping'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Science in Interactive Media & Computer Science',
    institution: 'University of Science & Visual Arts',
    period: '2017 — 2021',
    specialization: 'Specialized in Human-Computer Interaction, Visual Communication, and Distributed Systems.',
    honors: 'Graduated with Honors · Dean\'s Scholar for Creative Technology Excellence',
  },
];

export const ARSENAL_CATEGORIES: ArsenalCategory[] = [
  {
    title: 'Product Design & UI/UX',
    iconName: 'Palette',
    items: [
      { name: 'Figma & FigJam', subtext: 'Components, Auto Layout, Tokens' },
      { name: 'Design Systems', subtext: 'Scalable multi-brand architectures' },
      { name: 'Tactile Motion', subtext: 'Sub-200ms spring micro-interactions' },
      { name: 'User Research', subtext: 'Journey mapping, usability audits' },
    ],
  },
  {
    title: 'Frontend Engineering',
    iconName: 'Code',
    items: [
      { name: 'React & Next.js', subtext: 'Modern hooks, server components' },
      { name: 'TypeScript', subtext: 'Strict type safety & interfaces' },
      { name: 'Tailwind CSS v4', subtext: 'Zero-slop custom responsive layouts' },
      { name: 'Motion / Framer', subtext: 'Physics-based animation pipelines' },
    ],
  },
  {
    title: 'Visual Craft & 3D',
    iconName: 'Sparkles',
    items: [
      { name: 'Brand Typography', subtext: 'Editorial scales & pairing math' },
      { name: 'Spline & Blender', subtext: '3D spatial assets & web optimization' },
      { name: 'Creative Direction', subtext: 'High-contrast dark mode aesthetics' },
      { name: 'Photo & Asset Grading', subtext: 'Color balance & studio lighting' },
    ],
  },
  {
    title: 'Tooling & Workflow',
    iconName: 'Cpu',
    items: [
      { name: 'Git & GitHub CI', subtext: 'Trunk-based workflow & deployment' },
      { name: 'Storybook', subtext: 'Isolated component documentation' },
      { name: 'Vite & Build Tools', subtext: 'Lightning fast client bundles' },
      { name: 'Generative AI Tools', subtext: 'Asset synthesis & prompt engineering' },
    ],
  },
];
