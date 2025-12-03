import { PotholeReport } from '@/types/report';
import { SeverityBadge } from './SeverityBadge';
import { MapPin, Calendar, DollarSign, Cloud, Car } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportCardProps {
  report: PotholeReport;
  onClick?: () => void;
}

const statusStyles = {
  pending: 'bg-severity-medium/20 text-severity-medium',
  reviewed: 'bg-primary/20 text-primary',
  scheduled: 'bg-blue-500/20 text-blue-400',
  repaired: 'bg-severity-low/20 text-severity-low',
};

export function ReportCard({ report, onClick }: ReportCardProps) {
  const formattedDate = new Date(report.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={report.imageUrl}
          alt={`Pothole at ${report.location.address}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <SeverityBadge severity={report.severity} />
        </div>
        <div className="absolute top-3 right-3">
          <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold capitalize', statusStyles[report.status])}>
            {report.status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-foreground font-medium line-clamp-2">{report.location.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-xs">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-semibold text-foreground">${report.estimatedCost}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            {report.weather && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Cloud className="w-3.5 h-3.5" />
                {report.weather}
              </div>
            )}
            {report.trafficLevel && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Car className="w-3.5 h-3.5" />
                {report.trafficLevel}
              </div>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {report.dimensions.diameter} × {report.dimensions.depth}
          </span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
