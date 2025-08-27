import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Upload, 
  Users, 
  AlertTriangle, 
  Calendar,
  FileText,
  Settings,
  LogOut,
  Activity
} from 'lucide-react';

interface DashboardProps {
  onNewScan: () => void;
  onViewHistory: () => void;
  recentScans: Array<{
    id: string;
    patientName: string;
    age: number;
    stage: string;
    risk: 'Low' | 'Moderate' | 'High';
    date: string;
  }>;
  onViewScan: (id: string) => void;
  onViewRecentScans: () => void;
}

export function Dashboard({ onNewScan, onViewHistory, recentScans, onViewScan, onViewRecentScans }: DashboardProps) {
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Moderate': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">OsteoScan</h1>
            </div>
            <Badge variant="secondary" className="bg-teal-50 text-teal-700">
              AI-Powered Analysis
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Removed Dr. Wilson */}
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
          <p className="text-gray-600">{currentDate}</p>
        </div>

        {/* Stats Cards (AI accuracy/model performance removed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Scans</CardTitle>
              <Upload className="w-4 h-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentScans.length}</div>
              <p className="text-xs text-muted-foreground">
                Today and recent
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients</CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(recentScans.map(s => s.patientName)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Recently analyzed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged (High Risk)</CardTitle>
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {recentScans.filter(s => s.risk === 'High').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Needs attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onNewScan}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-teal-600" />
                </div>
                New X-ray Analysis
              </CardTitle>
              <CardDescription>
                Upload patient X-ray for AI-powered osteoporosis detection and staging
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Start New Scan
              </Button>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewHistory}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                Patient History
              </CardTitle>
              <CardDescription>
                View previous scans, reports, and patient tracking data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Scans
            </CardTitle>
            <CardDescription>
              Latest X-ray analyses and patient assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.length === 0 && (
                <p className="text-sm text-gray-500">No recent scans.</p>
              )}
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {scan.patientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{scan.patientName}</p>
                      <p className="text-sm text-gray-500">Age {scan.age} • {scan.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={`${getRiskColor(scan.risk)} border-0`}>
                      {scan.stage}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => onViewScan(scan.id)}>
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {recentScans.length > 0 && (
              <div className="mt-4 text-right">
                <Button variant="outline" onClick={onViewRecentScans}>View All</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}