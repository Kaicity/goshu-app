import { Card, CardContent } from '@/components/ui/card';
type StatusCardProps = {
  value: number | string;
  description: string;
  icon?: React.ReactNode;
  color?: 'green' | 'red' | 'blue' | 'yellow';
};

export default function StatusCard({ value, description, icon, color = 'green' }: StatusCardProps) {
  const colorClasses: Record<string, string> = {
    green: 'border-green-300 text-green-600 bg-green-500/10 dark:border-green-500 ',
    red: 'border-red-300 text-red-600 bg-red-500/10 ',
    blue: 'border-blue-300 text-blue-600 bg-blue-500/10',
    yellow: 'border-yellow-300 text-yellow-600 bg-yellow-500/10',
  };

  return (
    <Card className="p-4">
      <div className="flex space-x-0 items-center">
        <div className={`w-auto p-2 rounded-md ${colorClasses[color]}`}>{icon}</div>
        <CardContent className="">
          <p className="text-sm text-gray-500">{description}</p>
          <p className="text-2xl font-bold">{value}</p>
        </CardContent>
      </div>
    </Card>
  );
}
