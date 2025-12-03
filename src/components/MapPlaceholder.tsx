import { Map, Layers, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './ui/button';

export function MapPlaceholder() {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-navy-deep border border-border">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Heatmap Overlay Mockup */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-severity-critical/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-severity-high/40 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-severity-medium/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-severity-low/40 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-severity-extreme/50 rounded-full blur-2xl" />
      </div>

      {/* Map Pins Mockup */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[25%] w-4 h-4 bg-severity-critical rounded-full border-2 border-background shadow-lg animate-pulse" />
        <div className="absolute top-[35%] right-[30%] w-4 h-4 bg-severity-high rounded-full border-2 border-background shadow-lg" />
        <div className="absolute bottom-[25%] left-[35%] w-4 h-4 bg-severity-medium rounded-full border-2 border-background shadow-lg" />
        <div className="absolute bottom-[40%] right-[20%] w-4 h-4 bg-severity-low rounded-full border-2 border-background shadow-lg" />
        <div className="absolute top-[50%] left-[50%] w-5 h-5 bg-severity-extreme rounded-full border-2 border-background shadow-lg animate-pulse" />
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button variant="glass" size="icon" className="h-9 w-9">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="glass" size="icon" className="h-9 w-9">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="glass" size="icon" className="h-9 w-9">
          <Layers className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border">
        <p className="text-xs font-semibold text-foreground mb-2">Severity Heatmap</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-severity-low" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-severity-medium" />
            <span className="text-xs text-muted-foreground">Med</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-severity-critical" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>
      </div>

      {/* Center Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/60 backdrop-blur-sm border border-border">
          <Map className="w-10 h-10 text-primary" />
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Interactive Map</p>
            <p className="text-xs text-muted-foreground">Connect Mapbox for live heatmap</p>
          </div>
        </div>
      </div>
    </div>
  );
}
