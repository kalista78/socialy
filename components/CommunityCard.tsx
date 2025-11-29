import React from 'react';
import { Users, Lock, Unlock } from 'lucide-react';
import { Community } from '../types';

interface CommunityCardProps {
  community: Community;
  onClick: (id: string) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community, onClick }) => {
  return (
    <div 
      onClick={() => onClick(community.id)}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-soft hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col"
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={community.coverImage} 
          alt={community.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <div className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 text-gray-900 border border-gray-200">
            {typeof community.price === 'number' ? `$${community.price}/mo` : 'Free'}
          </div>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
            {community.category}
          </span>
          {community.isPrivate && <Lock size={14} className="text-gray-400" />}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
          {community.name}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
          {community.shortDescription}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
            <Users size={14} />
            <span>{community.memberCount.toLocaleString()} members</span>
          </div>
          <span className="text-sm font-semibold text-blue-600 group-hover:underline">
            View community
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;