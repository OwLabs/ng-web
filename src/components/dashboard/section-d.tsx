'use client';

import { Brain, FileText, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { DashboardSectionProps } from '@/types/dashboard';

export function SectionD({ onNavigate }: DashboardSectionProps) {
  const quickActions = [
    {
      icon: Brain,
      title: 'Continue AI Practice',
      description: 'Resume your adaptive learning session',
      page: 'practice' as const,
      delay: 'animation-delay-200',
    },
    {
      icon: FileText,
      title: 'View Analysis',
      description: 'Check your KBAT learning insights',
      page: 'report' as const,
      delay: 'animation-delay-300',
    },
    {
      icon: Users,
      title: 'Find a Tutor',
      description: 'Get personalized help from experts',
      page: 'tutor' as const,
      delay: 'animation-delay-400',
    },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, page: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate?.(page);
    }
  };

  return (
    <div className="content-visibility-auto">
      <h2 className="text-[#0B2545] text-base sm:text-lg font-semibold mb-3 sm:mb-4 animate-fade-in-up">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {quickActions.map((action) => (
          <Card
            key={action.title}
            className={`p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-all duration-200 h-full border-2 border-transparent hover:border-[#3B82F6]/20 hover:-translate-y-1 min-h-[44px] touch-manipulation animate-fade-in-up focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none ${action.delay}`}
            onClick={() => onNavigate?.(action.page)}
            onKeyDown={(e) => handleKeyDown(e, action.page)}
            role="button"
            tabIndex={0}
            aria-label={`${action.title}: ${action.description}`}
          >
            <CardContent className="p-0">
              <action.icon className="w-8 h-8 text-[#3B82F6] mb-3" aria-hidden="true" />
              <h3 className="text-[#0B2545] font-semibold mb-2">{action.title}</h3>
              <p className="text-gray-700 text-sm">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
