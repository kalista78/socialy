import { Community, Post, Event, CourseModule, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Creator',
  username: '@alexcreate',
  email: 'alex@socialy.com',
  avatar: 'https://picsum.photos/seed/user1/200/200',
  bio: 'Digital nomad, designer, and community builder.',
  stats: {
    posts: 42,
    comments: 156
  },
  earnings: {
    lifetime: 12500.50,
    last30Days: 850.00,
    balance: 320.00
  }
};

export const CATEGORIES = [
  'All', 'Hobbies', 'Business', 'Tech', 'Health', 'Design', 'Crypto', 'Writing', 'Marketing', 'Lifestyle'
];

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'c1',
    name: 'Design Systems Mastery',
    shortDescription: 'Learn to build scalable UI kits and design systems.',
    description: 'The ultimate community for UI/UX designers who want to master design systems. Weekly workshops, asset sharing, and expert feedback from industry leaders.',
    coverImage: 'https://picsum.photos/seed/design/1200/400',
    logo: 'https://picsum.photos/seed/design_logo/200/200',
    memberCount: 1240,
    onlineCount: 42,
    admins: 3,
    isPrivate: true,
    price: 29,
    category: 'Design',
    links: [
      { label: 'Official Website', url: '#' },
      { label: 'Figma Community', url: '#' },
      { label: 'YouTube Channel', url: '#' }
    ]
  },
  {
    id: 'c2',
    name: 'Crypto Alpha Circle',
    shortDescription: 'Early insights into the next big web3 projects.',
    description: 'Navigate the volatility of the crypto market with seasoned veterans. Daily charts, alpha calls, and project reviews.',
    coverImage: 'https://picsum.photos/seed/crypto/1200/400',
    logo: 'https://picsum.photos/seed/crypto_logo/200/200',
    memberCount: 8500,
    onlineCount: 312,
    admins: 8,
    isPrivate: true,
    price: 99,
    category: 'Crypto',
    links: [
      { label: 'TradingView', url: '#' },
      { label: 'Discord Backup', url: '#' }
    ]
  },
  {
    id: 'c3',
    name: 'Indie Hackers Hub',
    shortDescription: 'Build, launch, and monetize your side projects.',
    description: 'A supportive group of developers and makers building in public. Share your MRR goals and get technical help.',
    coverImage: 'https://picsum.photos/seed/hacker/1200/400',
    logo: 'https://picsum.photos/seed/hacker_logo/200/200',
    memberCount: 3200,
    onlineCount: 150,
    admins: 5,
    isPrivate: false,
    price: 'Free',
    category: 'Tech',
    links: [
      { label: 'ProductHunt', url: '#' },
      { label: 'GitHub Org', url: '#' }
    ]
  },
  {
    id: 'c4',
    name: 'Mindful Mornings',
    shortDescription: 'Meditation and yoga routines for a better day.',
    description: 'Start your day right with our daily guided sessions. Connect with people seeking peace and mindfulness.',
    coverImage: 'https://picsum.photos/seed/yoga/1200/400',
    logo: 'https://picsum.photos/seed/yoga_logo/200/200',
    memberCount: 540,
    onlineCount: 12,
    admins: 2,
    isPrivate: false,
    price: 'Free',
    category: 'Health'
  },
  {
    id: 'c5',
    name: 'Copywriting 101',
    shortDescription: 'Write words that sell. From emails to landing pages.',
    description: 'Master the art of persuasion. Peer reviews on your copy and lectures from 7-figure copywriters.',
    coverImage: 'https://picsum.photos/seed/writing/1200/400',
    logo: 'https://picsum.photos/seed/writing_logo/200/200',
    memberCount: 2100,
    onlineCount: 85,
    admins: 4,
    isPrivate: true,
    price: 49,
    category: 'Writing'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: { name: 'Sarah Jenks', avatar: 'https://picsum.photos/seed/u2/100' },
    timestamp: '2h ago',
    content: 'Just launched my new portfolio! What do you guys think about the typography choices? I was aiming for a Swiss modernist vibe.',
    image: 'https://picsum.photos/seed/post1/800/400',
    likes: 24,
    comments: 8
  },
  {
    id: 'p2',
    author: { name: 'David Chen', avatar: 'https://picsum.photos/seed/u3/100' },
    timestamp: '5h ago',
    content: 'Here are 5 tips for better React performance that helped me reduce TTI by 40%. \n\n1. Memoize expensive calculations...\n2. Virtualize long lists...',
    likes: 156,
    comments: 42
  },
  {
    id: 'p3',
    author: { name: 'Elena R.', avatar: 'https://picsum.photos/seed/u4/100' },
    timestamp: '1d ago',
    content: 'Does anyone have recommendations for a good headless CMS? I am torn between Strapi and Sanity.',
    likes: 12,
    comments: 19
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Weekly Design Critique',
    date: 'THU, OCT 24 • 7:00 PM',
    host: 'Design Systems Mastery',
    description: 'Bring your latest work in progress and get feedback from the group.',
    attendees: 45,
    image: 'https://picsum.photos/seed/evt1/600/300'
  },
  {
    id: 'e2',
    title: 'Guest Speaker: CEO of Linear',
    date: 'FRI, OCT 25 • 12:00 PM',
    host: 'Indie Hackers Hub',
    description: 'A deep dive into product management and building tools people love.',
    attendees: 320,
    image: 'https://picsum.photos/seed/evt2/600/300'
  }
];

export const MOCK_MODULES: CourseModule[] = [
  {
    id: 'm1',
    title: 'Module 1: Foundations',
    lessons: [
      { id: 'l1', title: 'Introduction to System Thinking', duration: '12:04' },
      { id: 'l2', title: 'Setting up Figma Variables', duration: '24:15' },
      { id: 'l3', title: 'Typography Scales', duration: '18:30' }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Components',
    lessons: [
      { id: 'l4', title: 'Building the Perfect Button', duration: '15:45' },
      { id: 'l5', title: 'Input Fields & States', duration: '22:10' },
    ]
  }
];