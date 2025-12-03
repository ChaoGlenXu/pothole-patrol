import { cn } from '@/lib/utils';

interface SeverityBadgeProps {
  severity: 1 | 2 | 3 | 4 | 5;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const severityConfig = {
  1: { bg: 'bg-severity-low', text: 'text-white', label: 'Low' },
  2: { bg: 'bg-severity-medium', text: 'text-black', label: 'Medium' },
  3: { bg: 'bg-severity-high', text: 'text-white', label: 'High' },
  4: { bg: 'bg-severity-critical', text: 'text-white', label: 'Critical' },
  5: { bg: 'bg-severity-extreme', text: 'text-white', label: 'Extreme' },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function SeverityBadge({ severity, label, size = 'md' }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold',
        config.bg,
        config.text,
        sizeClasses[size]
      )}
    >
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black/20 text-xs font-bold">
        {severity}
      </span>
      {label || config.label}
    </span>
  );
}
