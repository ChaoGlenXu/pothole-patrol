import { useState } from 'react';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { ReportCard } from '@/components/ReportCard';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { SeverityBadge } from '@/components/SeverityBadge';
import { Button } from '@/components/ui/button';
import { mockReports, mockStats } from '@/data/mockReports';
import { PotholeReport } from '@/types/report';
import { 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Map,
  List,
  Filter,
  Download,
  Search,
  MapPin,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedSeverity, setSelectedSeverity] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = mockReports.filter((report) => {
    if (selectedSeverity && report.severity !== selectedSeverity) return false;
    if (searchQuery && !report.location.address.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container space-y-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Pothole Dashboard</h1>
              <p className="text-muted-foreground mt-1">Monitor and manage road damage reports</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Analytics
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Reports"
              value={mockStats.totalReports.toLocaleString()}
              icon={AlertTriangle}
              trend={{ value: 12, isPositive: false }}
            />
            <StatCard
              title="Pending Review"
              value={mockStats.pendingReports}
              icon={Clock}
              variant="warning"
            />
            <StatCard
              title="Total Est. Cost"
              value={formatCurrency(mockStats.totalEstimatedCost)}
              icon={DollarSign}
            />
            <StatCard
              title="Critical Issues"
              value={mockStats.criticalCount}
              icon={AlertTriangle}
              variant="danger"
              trend={{ value: 5, isPositive: false }}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map/List View */}
            <div className="lg:col-span-2 space-y-4">
              {/* View Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'map' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('map')}
                    className="gap-2"
                  >
                    <Map className="w-4 h-4" />
                    Map View
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="gap-2"
                  >
                    <List className="w-4 h-4" />
                    List View
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-lg bg-secondary border-none text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary outline-none w-48"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </div>
              </div>

              {/* Severity Filter */}
              <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl bg-card border border-border">
                <span className="text-sm text-muted-foreground mr-2">Severity:</span>
                <Button
                  variant={selectedSeverity === null ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedSeverity(null)}
                >
                  All
                </Button>
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedSeverity(level === selectedSeverity ? null : level)}
                    className={cn(
                      'transition-all duration-200',
                      selectedSeverity === level ? 'scale-110' : 'opacity-60 hover:opacity-100'
                    )}
                  >
                    <SeverityBadge severity={level as 1 | 2 | 3 | 4 | 5} size="sm" />
                  </button>
                ))}
              </div>

              {/* Map or List */}
              {viewMode === 'map' ? (
                <MapPlaceholder />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar - Recent Reports */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Recent Reports</h3>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    View All
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {mockReports.slice(0, 5).map((report) => (
                    <div
                      key={report.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <div className="shrink-0">
                        <SeverityBadge severity={report.severity} size="sm" label="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {report.location.address}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-xs font-semibold text-primary">
                            ${report.estimatedCost}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Summary */}
              <div className="p-4 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Cost by Severity</h3>
                <div className="space-y-3">
                  {[
                    { level: 5, label: 'Extreme', count: 12, cost: 8640 },
                    { level: 4, label: 'Critical', count: 35, cost: 15750 },
                    { level: 3, label: 'High', count: 67, cost: 21440 },
                    { level: 2, label: 'Medium', count: 124, cost: 22320 },
                    { level: 1, label: 'Low', count: 189, cost: 16065 },
                  ].map((item) => (
                    <div key={item.level} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <SeverityBadge severity={item.level as 1 | 2 | 3 | 4 | 5} size="sm" label="" />
                          <span className="text-sm text-foreground">{item.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-foreground">{formatCurrency(item.cost)}</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            item.level === 1 && 'bg-severity-low',
                            item.level === 2 && 'bg-severity-medium',
                            item.level === 3 && 'bg-severity-high',
                            item.level === 4 && 'bg-severity-critical',
                            item.level === 5 && 'bg-severity-extreme'
                          )}
                          style={{ width: `${(item.cost / 22320) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">This Week</p>
                    <p className="text-2xl font-bold text-primary">{mockStats.reportsThisWeek}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  New reports submitted by citizens this week
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
