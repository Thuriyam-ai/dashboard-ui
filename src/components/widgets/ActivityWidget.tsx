import { LucideIcon } from 'lucide-react';

interface ActivityItem {
  id: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  title: string;
  timestamp: string;
  description?: string;
}

interface ActivityWidgetProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  activities: ActivityItem[];
  onViewAll?: () => void;
}

export function ActivityWidget({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-green-600',
  iconBgColor = 'bg-green-50',
  activities,
  onViewAll
}: ActivityWidgetProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className={`flex items-start space-x-3 p-3 ${activity.iconBgColor} rounded-lg hover:opacity-90 transition-opacity cursor-pointer`}>
            <div className={`w-6 h-6 ${activity.iconBgColor} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <activity.icon className={`w-3 h-3 ${activity.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              {activity.description && (
                <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
        
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            View All Activity →
          </button>
        )}
      </div>
    </div>
  );
}
