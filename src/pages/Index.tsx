import { useState } from 'react';
import { Header } from '@/components/Header';
import { ImageUploader } from '@/components/ImageUploader';
import { AnalysisResult } from '@/components/AnalysisResult';
import { Button } from '@/components/ui/button';
import { PotholeReport } from '@/types/report';
import { Scan, Shield, Zap, MapPin, ChevronRight, AlertTriangle, FileText, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PotholeReport | null>(null);
  const [location, setLocation] = useState({ address: '', lat: 0, lng: 0 });

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock result based on ASTM D6433 standards
    const severities = [1, 2, 3, 4, 5] as const;
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
    
    const severityLabels = {
      1: 'Low',
      2: 'Medium',
      3: 'High',
      4: 'Critical',
      5: 'Extreme',
    } as const;

    const costEstimates = {
      1: 85,
      2: 180,
      3: 320,
      4: 450,
      5: 720,
    };

    const dimensions = {
      1: { diameter: '4 inches', depth: '0.5 inches' },
      2: { diameter: '8 inches', depth: '1.2 inches' },
      3: { diameter: '11 inches', depth: '1.8 inches' },
      4: { diameter: '14 inches', depth: '2.5 inches' },
      5: { diameter: '18 inches', depth: '3.5 inches' },
    };

    const mockResult: PotholeReport = {
      id: Date.now().toString(),
      imageUrl: URL.createObjectURL(selectedFile),
      location: location.address ? location : {
        address: '123 Main Street, Downtown',
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.0060 + (Math.random() - 0.5) * 0.1,
      },
      severity: randomSeverity,
      severityLabel: severityLabels[randomSeverity],
      estimatedCost: costEstimates[randomSeverity] + Math.floor(Math.random() * 50),
      dimensions: dimensions[randomSeverity],
      createdAt: new Date().toISOString(),
      status: 'pending',
      weather: ['Clear', 'Rain', 'Cloudy', 'Snow'][Math.floor(Math.random() * 4)],
      trafficLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    toast.success('Analysis complete!');
  };

  const handleGenerateReport = () => {
    toast.success('City report generated and submitted!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-severity-critical/10 rounded-full blur-3xl" />
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <AlertTriangle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Road Analysis</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Report Potholes.{' '}
                <span className="gradient-text">Fix Roads Faster.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload a photo of road damage and our AI instantly analyzes severity, estimates repair costs, and generates reports for city officials.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a href="#upload">
                  <Button variant="hero" size="xl" className="gap-2">
                    <Scan className="w-5 h-5" />
                    Start Analysis
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </a>
                <Link to="/dashboard">
                  <Button variant="outline" size="xl" className="gap-2">
                    <BarChart3 className="w-5 h-5" />
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 border-t border-border">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: 'Instant Analysis',
                  description: 'AI-powered severity scoring based on ASTM D6433 standards',
                },
                {
                  icon: Shield,
                  title: 'Accurate Estimates',
                  description: 'Get repair cost estimates based on pothole dimensions',
                },
                {
                  icon: FileText,
                  title: 'Auto Reports',
                  description: 'Generate professional city reports with one click',
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upload Section */}
        <section id="upload" className="py-16 bg-secondary/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-3">Upload Road Image</h2>
                <p className="text-muted-foreground">
                  Take a photo of any pothole or road damage for instant AI analysis
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Area */}
                <div className="space-y-6">
                  <ImageUploader onImageSelect={handleImageSelect} />
                  
                  {/* Location Input */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Location (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter address or use GPS"
                      value={location.address}
                      onChange={(e) => setLocation({ ...location, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    disabled={!selectedFile || isAnalyzing}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Scan className="w-5 h-5" />
                        Analyze Pothole
                      </>
                    )}
                  </Button>
                </div>

                {/* Results Area */}
                <div className="lg:min-h-[500px]">
                  {analysisResult ? (
                    <div className="p-6 rounded-xl bg-card border border-border">
                      <AnalysisResult
                        report={analysisResult}
                        onGenerateReport={handleGenerateReport}
                      />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center p-6 rounded-xl bg-card/50 border border-dashed border-border">
                      <div className="text-center space-y-3">
                        <div className="p-4 rounded-full bg-muted/50 mx-auto w-fit">
                          <BarChart3 className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">
                          Upload an image and click analyze to see results
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ASTM Standards Info */}
        <section className="py-16 border-t border-border">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-3">ASTM D6433 Classification</h2>
                <p className="text-muted-foreground">Industry-standard severity scoring for road damage</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { level: 1, label: 'Low', diameter: '< 6"', depth: '< 1"', color: 'bg-severity-low' },
                  { level: 2, label: 'Medium', diameter: '6-12"', depth: '1-2"', color: 'bg-severity-medium' },
                  { level: 3, label: 'High', diameter: '6-12"', depth: '1-2"', color: 'bg-severity-high' },
                  { level: 4, label: 'Critical', diameter: '> 12"', depth: '> 2"', color: 'bg-severity-critical' },
                  { level: 5, label: 'Extreme', diameter: '> 12"', depth: '> 2"', color: 'bg-severity-extreme' },
                ].map((item) => (
                  <div key={item.level} className="p-4 rounded-xl bg-card border border-border text-center space-y-3">
                    <div className={`w-10 h-10 rounded-full ${item.color} mx-auto flex items-center justify-center text-white font-bold`}>
                      {item.level}
                    </div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>⌀ {item.diameter}</p>
                      <p>↓ {item.depth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">RoadWatch</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered infrastructure monitoring for safer roads
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
