import { cn } from '@/lib/utils';

interface Props {
  text: string;
  subText?: string;
  textSize?: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export function HeaderTitle(props: Props) {
  const { text, subText, textSize = '2xl' } = props;

  const textSizeMap = {
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  return (
    <div className="flex flex-col py-5 gap-2">
      <h1 className={cn('font-semibold drop-shadow-md', textSizeMap[textSize])}>{text}</h1>
      <p className="text-sm text-muted-foreground">{subText}</p>
    </div>
  );
}
