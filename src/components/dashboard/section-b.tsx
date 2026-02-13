'use client';

import { ArrowRight } from 'lucide-react';
import { LineChart } from '@mui/x-charts';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { DashboardSectionProps } from '@/types/dashboard';

export function SectionB({ onNavigate }: DashboardSectionProps) {
  const performanceData = [45, 52, 58, 65, 72, 78];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];

  const subjectData = [
    { subject: 'Algebra', score: 45, color: '#DC2626' },
    { subject: 'Geometry', score: 85, color: '#059669' },
    { subject: 'Statistics', score: 68, color: '#D97706' },
    { subject: 'Calculus', score: 72, color: '#2563EB' },
  ];

  return (
    <div className="mt-8 mb-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 6-Week Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 h-full">
            <CardContent className="p-0 h-full flex flex-col">
              <h2 className="text-[#0B2545] text-lg font-semibold mb-6">6-Week Progress</h2>
              <div className="flex-1 min-h-[280px] w-full">
                <LineChart
                  xAxis={[{ data: weeks, scaleType: 'band' }]}
                  series={[
                    {
                      data: performanceData,
                      label: 'Score',
                      color: '#2563EB',
                      area: true,
                      showMark: true,
                      curve: 'monotone',
                    },
                  ]}
                  margin={{ top: 10, right: 20, left: 40, bottom: 40 }}
                  sx={{
                    '& .MuiAreaElement-root': {
                      fill: 'url(#gradient)',
                    },
                    '& .MuiLineElement-root': {
                      strokeWidth: 3,
                    },
                    '& .MuiMarkElement-root': {
                      fill: '#2563EB',
                      r: 5,
                    },
                  }}
                  slotProps={{
                    legend: { hidden: true },
                  }}
                >
                  <defs>
                    <linearGradient id="gradient" gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subject Strength Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 h-full">
            <CardContent className="p-0 h-full flex flex-col">
              <h2 className="text-[#0B2545] text-lg font-semibold mb-6">Subject Strength Analysis</h2>
              <div className="flex-1 space-y-4 mb-6">
                {subjectData.map((item, index) => (
                  <motion.div
                    key={item.subject}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#0B2545] font-medium">{item.subject}</span>
                      <span className="text-sm font-bold text-gray-900">
                        {item.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate?.('report')}
              >
                View Detailed Report
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
