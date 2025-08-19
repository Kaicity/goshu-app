import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TextBorderProps {
  label: string;
  value?: string;
  placeholder?: string;
}

export const TextBorder = ({ label, value = '', placeholder = '--/--' }: TextBorderProps) => {
  return (
    <div className="flex flex-col gap-2 col-span-3 md:col-span-1 w-full">
      <Label>{label}</Label>
      <Input value={value} placeholder={placeholder} readOnly className="h-12 w-full" />
    </div>
  );
};
