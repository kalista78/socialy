import React, { useState } from 'react';
import { CheckCircle, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

const CreateCommunityPage: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'pricing'>('intro');
  const [selectedPlan, setSelectedPlan] = useState<'hobby' | 'pro'>('hobby');

  // Step 1: Intro Screen
  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center pt-16 pb-20 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center max-w-3xl leading-tight mb-12">
          Join a movement of 172k passionate people earning $1+ billion per year building communities
        </h1>

        {/* Hero Image Placeholder / Carousel */}
        <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden mb-12 border border-gray-200">
           {/* Top colored bar mockup */}
           <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
           <div className="p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                 <h2 className="text-4xl font-bold font-serif italic text-gray-900">LEARN Modern Calligraphy</h2>
                 <div className="flex items-center justify-between px-8 text-sm font-handwriting">
                    <span>Jordan</span>
                    <span>Jillian</span>
                 </div>
                 <div className="flex justify-center gap-4">
                    {/* Mock Pens */}
                    <div className="w-4 h-32 bg-pink-500 rounded-full transform -rotate-12"></div>
                    <div className="w-4 h-32 bg-red-500 rounded-full transform -rotate-6"></div>
                    <div className="w-4 h-32 bg-yellow-400 rounded-full transform rotate-6"></div>
                 </div>
              </div>
              <div className="relative">
                  {/* Green Badge */}
                  <div className="absolute -top-6 -right-6 bg-[#00A651] text-white p-4 rounded-lg shadow-lg z-10 text-center animate-bounce-slow">
                      <div className="font-bold text-sm">Calligraphy School</div>
                      <div className="text-xs opacity-90">Earns <span className="font-bold">$6.237/month</span></div>
                  </div>
                  <img src="https://picsum.photos/seed/calligraphy/400/300" className="rounded-xl shadow-inner border border-gray-100 opacity-80" alt="Community Example" />
              </div>
           </div>
           
           {/* Carousel Dots */}
           <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              <button className="w-2 h-2 rounded-full bg-gray-300"></button>
              <button className="w-2 h-2 rounded-full bg-blue-600"></button>
              <button className="w-2 h-2 rounded-full bg-gray-300"></button>
              <button className="w-2 h-2 rounded-full bg-gray-300"></button>
           </div>

            {/* Carousel Arrows */}
           <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-sm text-gray-600">
              <ChevronLeft size={24} />
           </button>
           <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-sm text-gray-600">
              <ChevronRight size={24} />
           </button>
        </div>

        <button 
          onClick={() => setStep('pricing')}
          className="px-12 py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-lg text-lg shadow-sm transition-all uppercase tracking-wide transform hover:scale-105"
        >
          CREATE YOUR COMMUNITY
        </button>
      </div>
    );
  }

  // Step 2: Pricing Screen
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center pt-12 pb-20 px-4">
      <div className="flex items-center gap-2 font-bold text-2xl mb-8">
          <span className="text-blue-600">SOCIALY</span>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-10">Select your plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-16">
         {/* Hobby Plan */}
         <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8 flex flex-col relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="text-center mb-8">
               <div className="flex items-end justify-center leading-none">
                 <span className="text-5xl font-bold text-gray-900">$9</span>
                 <span className="text-gray-500 font-medium mb-1">/month</span>
               </div>
               <div className="font-bold text-gray-900 mt-2 text-lg">Hobby</div>
            </div>
            
            <div className="space-y-4 flex-1 mb-8">
               <FeatureItem label="All features" />
               <FeatureItem label="Unlimited members" />
               <FeatureItem label="Unlimited videos" />
               <FeatureItem label="Unlimited live-streaming" />
               <FeatureItem label="10% transaction fee" />
               <FeatureItem label="Custom URL" included={false} />
               <FeatureItem label="Hide suggested communities" included={false} />
               <FeatureItem label="Advanced analytics" included={false} />
            </div>

            <button className="w-full py-3.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-lg shadow-sm transition-colors uppercase tracking-wide text-sm">
               TRY FOR FREE
            </button>
         </div>

         {/* Pro Plan */}
         <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8 flex flex-col relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="text-center mb-8">
               <div className="flex items-end justify-center leading-none">
                 <span className="text-5xl font-bold text-gray-900">$99</span>
                 <span className="text-gray-500 font-medium mb-1">/month</span>
               </div>
               <div className="font-bold text-gray-900 mt-2 text-lg">Pro</div>
            </div>
            
            <div className="space-y-4 flex-1 mb-8">
               <FeatureItem label="All features" />
               <FeatureItem label="Unlimited members" />
               <FeatureItem label="Unlimited videos" />
               <FeatureItem label="Unlimited live-streaming" />
               <FeatureItem label="2.9% transaction fee*" />
               <FeatureItem label="Custom URL" />
               <FeatureItem label="Hide suggested communities" />
               <FeatureItem label="Advanced analytics" />
            </div>

            <button className="w-full py-3.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-lg shadow-sm transition-colors uppercase tracking-wide text-sm">
               TRY FOR FREE
            </button>
         </div>
      </div>

      {/* Footer Fees Table */}
      <div className="text-center max-w-3xl w-full">
         <p className="font-bold text-gray-900 mb-6 text-sm">*Socialy has the lowest transaction fees</p>
         
         <div className="grid grid-cols-6 gap-2 md:gap-8 text-sm text-gray-600 border-t border-gray-200 pt-6">
            <div className="flex flex-col gap-1">
               <span className="font-medium">Discord</span>
               <span>16%</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="font-medium">Patreon</span>
               <span>14%</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="font-medium">Whop</span>
               <span>13%</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="font-medium">Circle</span>
               <span>7%</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="font-medium">Stan</span>
               <span>6%</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-gray-900">Socialy</span>
               <span className="font-bold text-gray-900">2.9%</span>
            </div>
         </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ label: string; included?: boolean }> = ({ label, included = true }) => (
  <div className="flex items-center gap-3">
    <div className={`
       w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0
       ${included ? 'bg-[#00A651]' : 'bg-gray-200'}
    `}>
       {included ? <Check size={12} strokeWidth={4} /> : <X size={12} strokeWidth={3} className="text-gray-400" />}
    </div>
    <span className={`text-sm ${included ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
       {label}
    </span>
  </div>
);

export default CreateCommunityPage;