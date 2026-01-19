'use client';

import { HeaderTitle } from '@/components/HeaderTitle';
import { cn } from '@/lib/utils';
import {
  BellRing,
  Briefcase,
  Building2,
  CalendarClock,
  Check,
  CreditCard,
  KeyRound,
  Lock,
  MapPin,
  Plug,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const settingsSections = [
  { id: 'company-info', name: 'Company Info', icon: Building2 },
  { id: 'offices', name: 'Offices', icon: MapPin },
  { id: 'department', name: 'Department', icon: Users },
  { id: 'job-titles', name: 'Job Titles', icon: Briefcase },
  { id: 'work-schedule', name: 'Work Schedule', icon: CalendarClock },
  { id: 'permission', name: 'Permission', icon: Lock },
  { id: 'integration', name: 'Integration', icon: Plug },
  { id: 'subscription', name: 'Subscription', icon: CreditCard },
  { id: 'password', name: 'Password', icon: KeyRound },
  { id: 'notification', name: 'Notification', icon: BellRing },
];

export default function Settings() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get('section') || 'company-info';

  const [formData, setFormData] = useState({
    companyName: 'Unipixel Studio',
    website: 'www.unipixel.co',
    contactNumber: '+62',
    phone: '838245783500',
    email: 'contact@unipixel.com',
    overview:
      'Unipixel Studio could be a creative agency that offers a range of services such as branding, graphic design, web development, and digital marketing. With a team of talented and experienced designers, developers, and marketers, Unipixel Studio would work closely with clients to develop unique and effective solutions to their branding and marketing needs.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="">
      {/* Header */}
      <HeaderTitle text="Cài đặt" subText="Quản lý cài đặt hệ thống" />

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="bg-card rounded-lg border border-border p-4">
            <ul className="space-y-1">
              {settingsSections.map((section) => {
                const isActive = activeSection === section.id;
                const Icon = section.icon;
                return (
                  <li key={section.id}>
                    <Link
                      href={`/settings?section=${section.id}`}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm',
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {section.name}
                      {isActive && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {activeSection === 'company-info' && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Company Info</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name & Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Website <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                    <Check className="absolute right-3 top-[42px] w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Contact Number & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className="w-24 px-3 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="+62">+62</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+91">+91</option>
                      </select>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                {/* Company Overview */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Overview</label>
                  <textarea
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-foreground text-background rounded-lg font-medium text-sm hover:bg-foreground/90 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Placeholder for other sections */}
          {activeSection !== 'company-info' && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {settingsSections.find((s) => s.id === activeSection)?.name}
              </h2>
              <p className="text-muted-foreground">This section is under development. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
