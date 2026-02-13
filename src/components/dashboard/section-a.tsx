'use client';

import { Brain } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DashboardSectionProps } from '@/types/dashboard';

export function SectionA({ onNavigate }: DashboardSectionProps) {
  return (
    <>
      {/* Welcome Header */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-[#0B2545] text-3xl font-bold mb-2">Welcome back, Aiman 👋</h1>
        <p className="text-gray-700">Let's continue our learning journey today</p>
      </div>

      {/* AI Insight Alert */}
      <div className="mb-8 animate-fade-in-up animation-delay-100">
        <Card className="p-6 bg-gradient-to-r from-[#1E3A8A]/10 to-[#3B82F6]/10 border-[#3B82F6]/30">
          <CardContent className="p-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-[#0B2545] font-semibold">AI Insight Detected</h2>
                  <Badge className="bg-red-700 text-white hover:bg-red-800 font-semibold">Action Needed</Badge>
                </div>
                <p className="text-gray-700 mb-4">
                  KBAT Pattern Weakness: <strong>Contextual Algebra Problems</strong>
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  Our AI has identified that you struggle with algebra questions that require contextual understanding.
                  We've generated 3 new adaptive practice questions to help strengthen this skill.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white"
                  onClick={() => onNavigate?.('practice')}
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
