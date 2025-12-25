import React from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

interface CardReportProps {
  title: string;
  value: string;
  percentage?: number;
  comparisonText?: string;
  icon?: React.ReactNode;
  className?: string;
  cardItemClassName?: string;
}

const CardReport = ({
  title,
  value,
  percentage,
  comparisonText = 'vs last month',
  icon,
  className,
  cardItemClassName,
}: CardReportProps) => {
  const isPositive = percentage && percentage >= 0;

  return (
    <Card className={cn('rounded-2xl shadow-sm', className)}>
      <CardContent className="p-5 flex items-center justify-between h-28">
        {/* Left content */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>

          {percentage ? (
            <p className={cn('text-sm font-medium', isPositive ? 'text-emerald-600' : 'text-red-500')}>
              {isPositive ? '+' : ''}
              {percentage}% <span className="text-muted-foreground font-normal">{comparisonText}</span>
            </p>
          ) : (
            <span className="text-muted-foreground text-sm font-normal">{comparisonText}</span>
          )}
        </div>

        {/* Right icon */}
        {icon && <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', cardItemClassName)}>{icon}</div>}
      </CardContent>
    </Card>
  );
};

export default CardReport;
