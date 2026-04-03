import React, { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract numeric value for count-up animation
  const numericValue = parseFloat(value.replace(/[$,]/g, ''));
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(latest);
    return formatted;
  });

  useEffect(() => {
    const controls = animate(count, numericValue, {
      duration: 1.2,
      delay: delay + 0.3,
      ease: [0.23, 1, 0.32, 1], // Custom ease-out curve
    });
    return controls.stop;
  }, [numericValue, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformOrigin: 'center' }}
    >
      <Card className="transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <motion.div
            animate={isHovered ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Icon className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div className="text-2xl font-bold">{rounded}</motion.div>
          {trend && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.6 }}
              className={`text-xs ${
                trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value).toFixed(1)}% from last month
            </motion.p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};