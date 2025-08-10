'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props {
  title: string;
  value: Date;
  onchange: (date: Date) => void;
  dateTypeFormat?: string;
}

export function DatePicker(props: Props) {
  const { title, onchange, value, dateTypeFormat } = props;
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal h-12"
        >
          {date ? format(date, dateTypeFormat ?? 'PPP') : <span className="flex-1">{title}</span>}
          <CalendarIcon className="text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
