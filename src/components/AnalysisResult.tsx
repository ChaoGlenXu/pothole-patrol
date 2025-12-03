import { PotholeReport } from '@/types/report';
import { SeverityBadge } from './SeverityBadge';
import { Button } from './ui/button';
import { MapPin, Ruler, DollarSign, AlertCircle, CheckCircle, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalysisResultProps {
  report: PotholeReport;
  onGenerateReport?: () => void;
}

export function AnalysisResult({ report, onGenerateReport }: AnalysisResultProps) {
  const severityDescriptions = {
    1: 'Minor surface imperfection. Low priority for repair.',
    2: 'Moderate damage. May cause discomfort to vehicles.',
    3: 'Significant damage. Risk to small cars and motorcycles.',
    4: 'Severe damage. High impact forces, tire/wheel damage risk.',
    5: 'Critical damage. Roadbed exposed. Immediate attention required.',
  };

  const astmStandards = {
    1: { diameter: '< 6 inches', depth: '< 1 inch' },
    2: { diameter: '6-12 inches', depth: '1-2 inches' },
    3: { diameter: '6-12 inches', depth: '1-2 inches' },
    4: { diameter: '> 12 inches', depth: '> 2 inches' },
    5: { diameter: '> 12 inches', depth: '> 2 inches' },
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-severity-low" />
          <h3 className="text-xl font-bold text-foreground">Analysis Complete</h3>
        </div>
        <SeverityBadge severity={report.severity} size="lg" />
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-card border border-border space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Ruler className="w-4 h-4" />
            <span className="text-sm font-medium">Dimensions</span>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold text-foreground">
              {report.dimensions.diameter} × {report.dimensions.depth}
            </p>
            <p className="text-xs text-muted-foreground">
              ASTM Standard: {astmStandards[report.severity].diameter} / {astmStandards[report.severity].depth}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">Estimated Cost</span>
          </div>
          <p className="text-3xl font-bold text-primary">${report.estimatedCost}</p>
          <p className="text-xs text-muted-foreground">Based on size and severity</p>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Location</span>
          </div>
          <p className="text-sm font-semibold text-foreground">{report.location.address}</p>
          <p className="text-xs text-muted-foreground">
            {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
          </p>
        </div>
      </div>

      {/* Severity Description */}
      <div className={cn(
        'p-5 rounded-xl border',
        report.severity >= 4 ? 'bg-severity-critical/10 border-severity-critical/30' : 'bg-severity-medium/10 border-severity-medium/30'
      )}>
        <div className="flex items-start gap-3">
          <AlertCircle className={cn(
            'w-5 h-5 mt-0.5',
            report.severity >= 4 ? 'text-severity-critical' : 'text-severity-medium'
          )} />
          <div>
            <p className="font-semibold text-foreground">
              {report.severity >= 4 ? 'Priority Repair Recommended' : 'Repair Suggested'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {severityDescriptions[report.severity]}
            </p>
          </div>
        </div>
      </div>

      {/* ASTM Reference */}
      <div className="p-5 rounded-xl bg-secondary/50 border border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">ASTM D6433 Classification</h4>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={cn(
                'flex-1 h-2 rounded-full transition-all duration-300',
                level === 1 && 'bg-severity-low',
                level === 2 && 'bg-severity-medium',
                level === 3 && 'bg-severity-high',
                level === 4 && 'bg-severity-critical',
                level === 5 && 'bg-severity-extreme',
                level !== report.severity && 'opacity-30'
              )}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
          <span>Critical</span>
          <span>Extreme</span>
        </div>
      </div>

      {/* Action Button */}
      <Button onClick={onGenerateReport} className="w-full gap-2" size="lg">
        <FileText className="w-5 h-5" />
        Generate City Report
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
