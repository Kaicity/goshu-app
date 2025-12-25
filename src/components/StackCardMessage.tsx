import { CircleAlert, CircleX } from 'lucide-react';
import { Button } from './ui/button';

interface StackCardMessageProps {
  title: string;
}

function StackCardMessage({ title }: StackCardMessageProps) {
  return (
    <div className="px-3 py-2 ring-1 ring-orange-200 bg-orange-500/5 rounded-lg text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleAlert className="w-4 h-4 text-orange-500" />
          <h4>{title}</h4>
        </div>
        <Button variant="ghost">
          <CircleX className="w-4 h-4 text-orange-500" />
        </Button>
      </div>
    </div>
  );
}

export default StackCardMessage;
