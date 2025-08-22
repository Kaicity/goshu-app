import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TextBorderProps {
  label: string;
  value?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

export const TextBorder = ({ label, value = '', placeholder = '--/--', icon }: TextBorderProps) => {
  return (
    <div className="flex flex-col gap-1 col-span-3 md:col-span-1 w-full">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className={cn('flex items-center h-12 w-full px-3 rounded-md border bg-muted/30', 'text-sm text-muted-foreground')}>
        {icon && <span className="mr-2 text-base text-muted-foreground">{icon}</span>}
        <span className={value ? 'text-foreground' : 'italic text-muted-foreground'}>{value || placeholder}</span>
      </div>
    </div>
  );
};
