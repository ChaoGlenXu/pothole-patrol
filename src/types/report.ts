export interface PotholeReport {
  id: string;
  imageUrl: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  severity: 1 | 2 | 3 | 4 | 5;
  severityLabel: 'Low' | 'Medium' | 'High' | 'Critical' | 'Extreme';
  estimatedCost: number;
  dimensions: {
    diameter: string;
    depth: string;
  };
  createdAt: string;
  status: 'pending' | 'reviewed' | 'scheduled' | 'repaired';
  weather?: string;
  trafficLevel?: 'low' | 'medium' | 'high';
}

export interface DashboardStats {
  totalReports: number;
  pendingReports: number;
  totalEstimatedCost: number;
  avgSeverity: number;
  reportsThisWeek: number;
  criticalCount: number;
}
