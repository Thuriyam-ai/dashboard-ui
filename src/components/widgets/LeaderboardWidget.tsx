import { LucideIcon, ChevronDown } from 'lucide-react';

interface LeaderboardItem {
  id: string | number;
  rank: number;
  name: string;
  score: number | string;
  subtitle?: string;
  metrics: Array<{
    label: string;
    value: string | number;
  }>;
  onClick?: () => void;
}

interface LeaderboardWidgetProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  items: LeaderboardItem[];
  onTimeRangeChange?: (range: string) => void;
  timeRangeOptions?: string[];
  currentTimeRange?: string;
}

export function LeaderboardWidget({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-50',
  items,
  onTimeRangeChange,
  timeRangeOptions = ['This Week', 'This Month', 'This Quarter'],
  currentTimeRange = 'This Week'
}: LeaderboardWidgetProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500';
    if (rank === 2) return 'bg-gray-400';
    if (rank === 3) return 'bg-orange-600';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
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
          {onTimeRangeChange && (
            <select 
              value={currentTimeRange}
              onChange={(e) => onTimeRangeChange(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {timeRangeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors group"
            onClick={item.onClick}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getRankColor(item.rank)}`}>
                {item.rank}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                {item.subtitle && <p className="text-sm text-gray-500">{item.subtitle}</p>}
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {item.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.label}</p>
                </div>
              ))}
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
