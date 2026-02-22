'use client';

import { TrendingUp, Brain, Users, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { DashboardSectionProps } from '@/types/dashboard';

export function SectionC({ onNavigate }: DashboardSectionProps) {
  return (
    <div className="mt-6 sm:mt-8 mb-6 sm:mb-8 content-visibility-auto" role="region" aria-label="Performance metrics and actions">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Overall Performance Card */}
        <Card className="p-4 sm:p-6 h-full flex flex-col animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#0B2545]">Overall Performance</h2>
            <TrendingUp className="w-5 h-5 text-green-600" aria-hidden="true" />
          </div>
          <div className="flex-1 mb-4">
            <div className="flex items-center">
              <div className="flex items-center justify-between w-full">
                <span className="text-gray-700 text-sm">+12% this month</span>
              </div>
            </div>
          </div>
          <Progress value={78} className="h-2" aria-label="Overall performance: 78%" />
        </Card>

        {/* AI Practice Ready Card */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white animate-scale-in animation-delay-75">
          <div className="flex items-center justify-between mb-4">
            <h2>AI Practice Ready</h2>
            <Brain className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="mb-4">
            <div className="text-3xl mb-2">3 Questions</div>
            <p className="text-white/90 text-sm">Generated for Algebra</p>
          </div>
          <Button
            variant="secondary"
            className="w-full min-h-[44px] touch-manipulation"
            onClick={() => onNavigate?.('practice')}
            aria-label="Continue AI Practice: 3 questions for Algebra"
          >
            Continue Practice
            <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Button>
        </Card>

        {/* Upcoming Session Card */}
        <Card className="p-4 sm:p-6 h-full flex flex-col animate-scale-in animation-delay-150">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#0B2545]">Upcoming Session</h2>
            <Users className="w-5 h-5 text-[#3B82F6]" aria-hidden="true" />
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-sm text-gray-700 mb-1">Tomorrow, 3:00 PM</p>
            <p className="text-[#0B2545]">Sir Azlan - Algebra</p>
            <Button
              variant="outline"
              className="w-full mt-auto min-h-[44px] touch-manipulation"
              onClick={() => onNavigate?.('tutor')}
              aria-label="View upcoming session details: Sir Azlan - Algebra"
            >
              View Details
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
