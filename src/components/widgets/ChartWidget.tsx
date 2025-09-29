import { LucideIcon, Eye } from 'lucide-react';

interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  children: React.ReactNode;
  onViewDetails?: () => void;
  className?: string;
}

export function ChartWidget({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-50',
  children,
  onViewDetails,
  className = ''
}: ChartWidgetProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {onViewDetails && (
            <button 
              onClick={onViewDetails}
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="View Details"
            >
              <Eye className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="chart-content">
        {children}
      </div>
    </div>
  );
}
