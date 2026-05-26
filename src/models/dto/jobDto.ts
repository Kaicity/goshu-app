export interface Job {
  id: number;
  title: string;
  companyLogo: string;
  location: string;
  remote?: boolean;
  tags: string[];
  salary: string;
  posted: string;
  featured?: boolean;
}
