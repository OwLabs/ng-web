'use client';

import { Brain } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DashboardSectionProps } from '@/types/dashboard';

export function SectionA({ onNavigate }: DashboardSectionProps) {
  return (
    <>
      {/* Welcome Header - instant visibility */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[#0B2545] text-2xl sm:text-3xl font-bold mb-2">Welcome back, Aiman 👋</h1>
        <p className="text-gray-700 text-sm sm:text-base">Let&apos;s continue our learning journey today</p>
      </div>

      {/* AI Insight Alert - subtle slide animation */}
      <div className="mb-6 sm:mb-8 animate-slide-up">
        <Card className="p-4 sm:p-6 bg-gradient-to-r from-[#1E3A8A]/10 to-[#3B82F6]/10 border-[#3B82F6]/30">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h2 className="text-[#0B2545] font-semibold text-base sm:text-lg">AI Insight Detected</h2>
                  <Badge className="bg-red-700 text-white hover:bg-red-800 font-semibold w-fit">Action Needed</Badge>
                </div>
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  KBAT Pattern Weakness: <strong>Contextual Algebra Problems</strong>
                </p>
                <p className="text-gray-700 text-xs sm:text-sm mb-4">
                  Our AI has identified that you struggle with algebra questions that require contextual understanding.
                  We&apos;ve generated 3 new adaptive practice questions to help strengthen this skill.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white min-h-[44px] touch-manipulation"
                  onClick={() => onNavigate?.('practice')}
                  type="button"
                >
                  Start AI Practice Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
