import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import React from 'react';
import { LocationSelect } from './LocationSelect';

const SearchBox = () => {
  return (
    <div
      className="
        w-full max-w-5xl
        rounded-lg border bg-background
        shadow-sm
        transition-all
        hover:shadow-md
      "
    >
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Search */}
        <div className="py-3 md:py-0 flex flex-1 items-center px-4 h-16">
          <Search className="mr-3 text-muted-foreground" size={18} />

          <input
            type="text"
            placeholder="Tìm công việc, kỹ năng..."
            className="
              w-full bg-transparent outline-none
              text-sm placeholder:text-muted-foreground
            "
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-border" />

        {/* Location */}
        <div className="py-3 md:py-0 flex flex-1 items-center px-4 h-16">
          <MapPin className="mr-3 text-muted-foreground" size={18} />

          <LocationSelect />
        </div>

        {/* Button */}
        <div className="p-3 pt-0 md:pt-3">
          <Button
            size="lg"
            className="
              w-full md:w-auto
              rounded-lg
              px-8
            "
          >
            Tìm kiếm Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
