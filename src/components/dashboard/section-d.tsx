'use client';

import { Brain, FileText, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { motion } from 'motion/react';
import { DashboardSectionProps } from '@/types/dashboard';

export function SectionD({ onNavigate }: DashboardSectionProps) {
  const quickActions = [
    {
      icon: Brain,
      title: 'Continue AI Practice',
      description: 'Resume your adaptive learning session',
      page: 'practice',
      delay: 0.6,
    },
    {
      icon: FileText,
      title: 'View Analysis',
      description: 'Check your KBAT learning insights',
      page: 'report',
      delay: 0.7,
    },
    {
      icon: Users,
      title: 'Find a Tutor',
      description: 'Get personalized help from experts',
      page: 'tutor',
      delay: 0.8,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-[#0B2545] text-lg font-semibold mb-4">Quick Actions</h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: action.delay }}
            whileHover={{ y: -4 }}
          >
            <Card
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow h-full border-2 border-transparent hover:border-[#3B82F6]/20"
              onClick={() => onNavigate?.(action.page)}
            >
              <CardContent className="p-0">
                <action.icon className="w-8 h-8 text-[#3B82F6] mb-3" aria-hidden="true" />
                <h3 className="text-[#0B2545] font-semibold mb-2">{action.title}</h3>
                <p className="text-gray-700 text-sm">{action.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
