
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
  bio: string;
  stats: {
    posts: number;
    comments: number;
  };
  earnings?: {
    lifetime: number;
    last30Days: number;
    balance: number;
  };
}

export interface Community {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  logo?: string; // New: For sidebar thumbnail
  memberCount: number;
  onlineCount?: number; // New
  admins?: number; // New
  isPrivate: boolean;
  price: number | 'Free';
  category: string;
  links?: { label: string; url: string }[]; // New
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  host: string;
  description: string;
  attendees: number;
  image: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    videoUrl?: string; // Placeholder
  }[];
}

export type PageView = 'DISCOVER' | 'COMMUNITY' | 'PROFILE' | 'CREATE_COMMUNITY' | 'HELP_CENTER';
export type AuthModalType = 'LOGIN' | 'SIGNUP' | null;
export type Language = 'TR' | 'EN';
