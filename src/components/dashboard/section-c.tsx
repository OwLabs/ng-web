'use client';

import { TrendingUp, Brain, Users, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { motion } from 'motion/react';
import { DashboardSectionProps } from '@/types/dashboard';

export function SectionC({ onNavigate }: DashboardSectionProps) {
  return (
    <div className="mt-8 mb-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overall Performance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 h-full flex flex-col">
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
        </motion.div>

        {/* AI Practice Ready Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white">
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
              className="w-full"
              onClick={() => onNavigate?.('practice')}
            >
              Continue Practice
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Card>
        </motion.div>

        {/* Upcoming Session Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#0B2545]">Upcoming Session</h2>
              <Users className="w-5 h-5 text-[#3B82F6]" aria-hidden="true" />
            </div>
            <div className="flex-1 flex flex-col">
              <p className="text-sm text-gray-700 mb-1">Tomorrow, 3:00 PM</p>
              <p className="text-[#0B2545]">Sir Azlan - Algebra</p>
              <Button
                variant="outline"
                className="w-full mt-auto"
                onClick={() => onNavigate?.('tutor')}
              >
                View Details
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
