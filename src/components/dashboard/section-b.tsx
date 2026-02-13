'use client';

import { ArrowRight } from 'lucide-react';
import { LineChart } from '@mui/x-charts';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
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
    <div className="mt-6 sm:mt-8 mb-6 sm:mb-8 content-visibility-auto">
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* 6-Week Progress Chart */}
        <Card className="p-4 sm:p-6 h-full animate-fade-in-up">
          <CardContent className="p-0 h-full flex flex-col">
            <h2 className="text-[#0B2545] text-base sm:text-lg font-semibold mb-4 sm:mb-6">6-Week Progress</h2>
            <div className="flex-1 min-h-[240px] sm:min-h-[280px] w-full min-w-0">
              <LineChart
                xAxis={[{ data: weeks, scaleType: 'band' }]}
                series={[
                  {
                    data: performanceData,
                    label: 'Score',
                    color: '#2563EB',
                    area: true,
                    showMark: true,
                    curve: 'monotoneX',
                  },
                ]}
                margin={{ top: 10, right: 20, left: 5, bottom: 40 }}
                hideLegend
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

        {/* Subject Strength Analysis */}
        <Card className="p-4 sm:p-6 h-full animate-fade-in-up animation-delay-150">
          <CardContent className="p-0 h-full flex flex-col">
            <h2 className="text-[#0B2545] text-base sm:text-lg font-semibold mb-4 sm:mb-6">Subject Strength Analysis</h2>
            <div className="flex-1 space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {subjectData.map((item) => (
                <div key={item.subject}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#0B2545] font-medium">{item.subject}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {item.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${item.score}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full min-h-[44px] touch-manipulation"
              onClick={() => onNavigate?.('report')}
            >
              View Detailed Report
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
