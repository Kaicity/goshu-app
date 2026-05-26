import { HeaderTitle } from '@/components/HeaderTitle';
import { JobList } from '@/components/layout/customer/JobList';
import SearchBox from '@/components/layout/customer/SearchBox';
import Title from '@/components/layout/customer/Title';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const jobs = [
  {
    id: 1,
    title: 'Senior Product Designer',
    companyLogo: 'https://images.pexels.com/photos/15555955/pexels-photo-15555955.jpeg',
    location: 'San Francisco',
    remote: true,
    tags: ['Design', 'Full-time', 'Figma'],
    salary: '$140k - $180k',
    posted: '2h ago',
    featured: true,
  },
  {
    id: 2,
    title: 'Staff Backend Engineer',
    companyLogo: 'https://images.pexels.com/photos/15635251/pexels-photo-15635251.jpeg',
    location: 'Remote (Global)',
    remote: false,
    tags: ['Engineering', 'Full-time', 'Rust'],
    salary: '$160k - $220k',
    posted: '5h ago',
  },
  {
    id: 3,
    title: 'Growth Marketing Lead',
    companyLogo: 'https://images.pexels.com/photos/6476785/pexels-photo-6476785.jpeg',
    location: 'New York',
    remote: true,
    tags: ['Marketing', 'Full-time', 'B2B SaaS'],
    salary: '$120k - $160k',
    posted: '1d ago',
  },
  {
    id: 4,
    title: 'Senior Mobile Developer',
    companyLogo: 'https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg',
    location: 'London',
    remote: true,
    tags: ['Engineering', 'Full-time', 'Swift'],
    salary: '£80k - £110k',
    posted: '2d ago',
  },
];

const JobsPage = () => {
  return (
    <div className="px-12 py-20">
      <Title
        title="Tìm công việc phù hợp với bạn"
        subTitle="Tìm kiếm ứng viên phù hợp cho các vị trí kỹ sư và thiết kế có tiềm năng phát triển cao."
      />

      <div className="py-2"></div>

      <SearchBox />

      <div className="flex flex-col items-start md:flex-row gap-12 pt-8">
        {/* LEFT */}
        <div className="w-full md:w-1/4">
          <div className="hidden md:block space-y-8">
            {/* Department */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Department</h3>

              <div className="space-y-3">
                {['Engineering', 'Design', 'Product', 'Marketing'].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} defaultChecked={item === 'Engineering' || item === 'Design'} />
                    <Label htmlFor={item} className="cursor-pointer text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Employment Type */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Employment Type</h3>

              <RadioGroup defaultValue="full-time" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-time" id="full-time" />
                  <Label htmlFor="full-time" className="cursor-pointer text-sm">
                    Full-time
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contract" id="contract" />
                  <Label htmlFor="contract" className="cursor-pointer text-sm">
                    Contract
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Experience Level */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Experience Level</h3>

              <div className="space-y-3">
                {['Entry Level', 'Senior (5+ yrs)', 'Staff / Lead'].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} defaultChecked={item === 'Senior (5+ yrs)'} />
                    <Label htmlFor={item} className="cursor-pointer text-sm">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Box */}
            <div className="rounded-xl border bg-primary/10 p-4">
              <p className="mb-3 text-xs text-muted-foreground">Get alerts for this search</p>

              <Button size="xl" className="w-full rounded-lg">
                Enable Job Alerts
              </Button>
            </div>
          </div>

          <div className="block md:hidden">Bộ lọc</div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-3/4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">124</span> cơ hội phù hợp
            </h2>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Sắp xếp theo:</span>

              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0">
                  <SelectValue placeholder="Sort jobs" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>

                  <SelectItem value="oldest">Oldest first</SelectItem>

                  <SelectItem value="salary">Highest salary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <JobList jobs={jobs} />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
