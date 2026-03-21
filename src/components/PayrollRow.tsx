import { formatVND } from '@/utils/formatMoneyVnd';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface PayrollRowProps {
  label: string;
  amount: number;
  isExpandable?: boolean;
  isTotal?: boolean;
}

const PayrollRow = ({ label, amount, isExpandable, isTotal }: PayrollRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    if (isExpandable) setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mb-3">
      <div
        onClick={toggle}
        className={`
      flex items-center justify-between p-4 rounded-xl border transition-all duration-300
      ${isTotal ? 'bg-muted border-transparent' : 'bg-background hover:bg-accent'}
      ${isExpandable ? 'cursor-pointer' : 'cursor-default'}
    `}
      >
        <div className="flex items-center gap-2">
          <span
            className={`
          ${isTotal ? 'font-bold text-base' : 'font-semibold text-sm'}
          text-foreground
        `}
          >
            {label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`
          ${isTotal ? 'font-bold text-lg' : 'font-semibold text-sm'}
          text-foreground
        `}
          >
            {formatVND(amount)}
          </span>

          {isExpandable && (
            <div className="text-muted-foreground">{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
          )}
        </div>
      </div>

      {isOpen && isExpandable && (
        <div
          className="
        px-4 py-2 rounded-b-xl border-x border-b border-border
        bg-muted/50 mt-[-8px]
        animate-in slide-in-from-top-2 duration-300
      "
        >
          <div className="flex justify-between items-center py-2 text-xs text-muted-foreground italic">
            <span>Không có dữ liệu.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollRow;
