import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Job } from '@/models/dto/jobDto';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

interface Props {
  job: Job;
}

export function JobCard({ job }: Props) {
  return (
    <div
      className="
        group rounded-lg border bg-background
        p-5 transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <Image src={job.companyLogo} alt={job.title} width={100} height={100} className="rounded-md object-cover w-16 h-16" />

        {job.featured && (
          <Badge variant="secondary" className="rounded-full px-3">
            New
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3
        className="
          mb-2 text-xl font-semibold
          transition-colors
          group-hover:text-primary
        "
      >
        {job.title}
      </h3>

      {/* Location */}
      <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin size={14} />

        <span>
          {job.location}
          {job.remote && ' / Remote'}
        </span>
      </div>

      {/* Tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-md font-normal">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-semibold">{job.salary}</p>

          <p className="text-sm text-muted-foreground">Đã đăng {job.posted}</p>
        </div>

        <Button className="rounded-lg px-6">Ứng tuyển</Button>
      </div>
    </div>
  );
}
