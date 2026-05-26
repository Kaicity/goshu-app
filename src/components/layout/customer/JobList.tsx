import type { Job } from '@/models/dto/jobDto';
import { JobCard } from './JobCard';

interface Props {
  jobs: Job[];
}

export function JobList({ jobs }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
