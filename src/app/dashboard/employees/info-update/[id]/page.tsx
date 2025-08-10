'use client';

import { getEmployee } from '@/api/employee/employee';
import { DatePicker } from '@/components/date-picker';
import { HeaderTitle } from '@/components/HeaderTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GENDER_LABELS } from '@/enums/genderEnum';
import { MARITAL_LABELS } from '@/enums/maritalEnum';
import { STATUS_LABELS } from '@/enums/statusEnum';
import { TYPEWORK_LABELS } from '@/enums/typeWorkEnum';
import { UploadButton, UploadDropzone } from '@/lib/uploadthing';
import type CountryDto from '@/models/dto/countryDto';
import type { EmployeeDto } from '@/models/dto/employeeDto';
import axios from 'axios';
import { Camera, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface DepartmentDto {
  name: string;
  description: string;
}

export default function UpdateEmployeePage() {
  const params = useParams();

  const [currentProfileImage, setCurrentProfileImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [employee, setEmployee] = useState<EmployeeDto | null>(null);
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);

  useEffect(() => {
    fetchEmployeeDetail();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get('https://open.oapi.vn/location/countries');
        setCountries(res.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
    fetchCountries();
  }, []);

  const fetchEmployeeDetail = async () => {
    try {
      if (params.id) {
        const res = await getEmployee(params.id as string);
        setEmployee(res);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchDepartment = async () => {
    try {
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <HeaderTitle text="Cập Nhật Thông Tin" subText="Quản lý thông tin cơ bản của nhân viên" />

      <div className="p-4 bg-card border rounded-lg shadow-sm">
        <Tabs defaultValue="personal-info" className="w-full mr-auto">
          <TabsList className="mb-6 flex w-full justify-start overflow-x-auto scrollbar-hide border-b border-border">
            {[
              { value: 'personal-info', label: 'Thông tin cá nhân' },
              { value: 'professional-information', label: 'Thông tin nâng cao' },
              { value: 'documents', label: 'Tài liệu' },
              { value: 'account-access', label: 'Tài khoản truy cập' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`
          relative px-4 py-3 text-sm font-medium text-muted-foreground
          rounded-none bg-transparent
          transition-all duration-200 ease-in-out
          hover:text-foreground hover:bg-accent/30
          data-[state=active]:text-primary
          data-[state=active]:bg-transparent
          after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-200
          data-[state=active]:after:scale-x-100
        `}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="personal-info" className="p-2 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col col-span-2 gap-2">
                <Label>Hình ảnh nhân viên</Label>

                {currentProfileImage ? (
                  <div className="relative w-full max-w-[200px] aspect-square">
                    <Image
                      src={currentProfileImage}
                      alt="Ảnh nhân viên"
                      fill
                      className="rounded-md object-cover border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => setCurrentProfileImage('')}
                      className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <UploadButton
                      endpoint="singleImageUploader"
                      onUploadBegin={() => setIsUploading(true)}
                      onClientUploadComplete={(res) => {
                        const url = res[0].ufsUrl;
                        setCurrentProfileImage(url);
                        setIsUploading(false);
                        toast.success('Hình ảnh của bạn đã được upload');
                      }}
                      onUploadError={(error) => {
                        toast.error(error.message);
                      }}
                      content={{
                        button: isUploading ? (
                          <div className="flex flex-col items-center">
                            <UploadCloud className="w-5 h-5 animate-bounce" />
                            <span className="text-xs">Đang tải...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <Camera className="w-5 h-5" />
                            <span className="text-xs">Chọn ảnh</span>
                          </div>
                        ),
                        allowedContent: 'PNG, JPG (tối đa 8MB)',
                      }}
                      appearance={{
                        button:
                          'w-30 h-30 bg-primary/50 dark:bg-secondary px-4 py-2 rounded-md hover:bg-primary/40 dark:hover:bg-primary/10 disabled:opacity-50',
                        allowedContent: 'text-xs text-muted-foreground',
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Họ</Label>
                <Input placeholder="Nhập họ" className="h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Tên</Label>
                <Input placeholder="Nhập tên" className="h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input placeholder="Nhập email" className="h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Điện thoại</Label>
                <Input placeholder="Nhập điện thoại" className="h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Ngày sinh</Label>
                <DatePicker title="Chọn ngày sinh" value={new Date()} onchange={() => {}} dateTypeFormat="dd/MM/yyyy" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Giới tính</Label>
                <Select>
                  <SelectTrigger className="w-full !h-12">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(GENDER_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">{label}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Quốc tịch</Label>
                <Select>
                  <SelectTrigger className="w-full !h-12">
                    <SelectValue placeholder="Chọn quốc tịch hiện tại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectContent>
                      {countries
                        .filter((country) => country.id && country.iso)
                        .map((country, index) => (
                          <SelectItem key={country.id || `${country.iso}-${index}`} value={country.iso}>
                            <div className="flex items-center gap-2">
                              <img src={country.flag} alt={country.name} className="w-5 h-5 rounded" />
                              {country.niceName}
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Tình trạng hôn nhân</Label>
                <Select>
                  <SelectTrigger className="w-full !h-12">
                    <SelectValue placeholder="Chọn tình trạng hôn nhân" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(MARITAL_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">{label}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <Label>Địa chỉ</Label>
                <Input placeholder="Nhập địa chỉ" className="h-12" />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Hủy</Button>
              <Button>Tiếp theo</Button>
            </div>
          </TabsContent>

          <TabsContent value="professional-information" className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <Label>Mã nhân viên</Label>
                <Input placeholder="NV-XXXX" className="h-12" readOnly />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input placeholder="Nhập Username" className="h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Hình thức làm việc</Label>
                <Select>
                  <SelectTrigger className="w-full !h-12">
                    <SelectValue placeholder="Chọn hình thức làm việc" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPEWORK_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">{label}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Vị trí hiện tại</Label>
                <Input placeholder="Front-end developer, Kế toán,..." className="h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Phòng ban</Label>
                <Select>
                  <SelectTrigger className="w-full !h-12">
                    <SelectValue placeholder="Chọn phòng ban" />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Ngày tham gia công ty</Label>
                <DatePicker title="Chọn ngày tham gia" value={new Date()} onchange={() => {}} dateTypeFormat="dd/MM/yyyy" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Trạng thái</Label>
                <Select disabled>
                  <SelectTrigger className="w-full !h-12">
                    <SelectValue placeholder="Trạng thái nhân viên" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">{label}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Ngày bắt đầu làm việc</Label>
                <DatePicker
                  title="Chọn ngày bắt đầu làm việc"
                  value={new Date()}
                  onchange={() => {}}
                  dateTypeFormat="dd/MM/yyyy"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Hủy</Button>
              <Button>Tiếp theo</Button>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <Label>Tải hồ sơ CV</Label>
                <UploadDropzone
                  className="py-6 ut-button:bg-amber-500 ut-button:ut-readying:bg-amber-500/50 ut-button:p-2"
                  onUploadBegin={() => setIsUploading(true)}
                  onClientUploadComplete={(res) => {
                    const url = res[0].ufsUrl;
                    setCurrentProfileImage(url);
                    setIsUploading(false);
                    toast.success('Hình ảnh của bạn đã được upload');
                  }}
                  onUploadError={(error) => {
                    toast.error(error.message);
                  }}
                  endpoint="singleImageUploader"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Tải hồ sơ học vấn</Label>
                <UploadDropzone
                  className="py-6 ut-button:bg-amber-500 ut-button:ut-readying:bg-amber-500/50 ut-button:p-2"
                  onUploadBegin={() => setIsUploading(true)}
                  onClientUploadComplete={(res) => {
                    const url = res[0].ufsUrl;
                    setCurrentProfileImage(url);
                    setIsUploading(false);
                    toast.success('Hình ảnh của bạn đã được upload');
                  }}
                  onUploadError={(error) => {
                    toast.error(error.message);
                  }}
                  endpoint="singleImageUploader"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Tải hồ sơ chứng chỉ tiếng anh</Label>
                <UploadDropzone
                  className="py-6 ut-button:bg-amber-500 ut-button:ut-readying:bg-amber-500/50 ut-button:p-2"
                  onUploadBegin={() => setIsUploading(true)}
                  onClientUploadComplete={(res) => {
                    const url = res[0].ufsUrl;
                    setCurrentProfileImage(url);
                    setIsUploading(false);
                    toast.success('Hình ảnh của bạn đã được upload');
                  }}
                  onUploadError={(error) => {
                    toast.error(error.message);
                  }}
                  endpoint="singleImageUploader"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Tải hồ sơ chứng chỉ khác</Label>
                <UploadDropzone
                  className="py-6 ut-button:bg-amber-500 ut-button:ut-readying:bg-amber-500/50 ut-button:p-2"
                  onUploadBegin={() => setIsUploading(true)}
                  onClientUploadComplete={(res) => {
                    const url = res[0].ufsUrl;
                    setCurrentProfileImage(url);
                    setIsUploading(false);
                    toast.success('Hình ảnh của bạn đã được upload');
                  }}
                  onUploadError={(error) => {
                    toast.error(error.message);
                  }}
                  endpoint="singleImageUploader"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Hủy</Button>
              <Button>Tiếp theo</Button>
            </div>
          </TabsContent>

          <TabsContent value="account-access" className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <Label>Email / Tài khoản đăng nhập</Label>
                <Input placeholder="user@gmail.com" className="h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>ID tài khoản Github</Label>
                <Input placeholder="ISSD-2r44-333r3" className="h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>ID tài khoản Microsoft Team</Label>
                <Input placeholder="ISSD-2r44-333r3" className="h-12" />
              </div>

              <div className="flex flex-col gap-2">
                <Label>ID tài khoản Slack</Label>
                <Input placeholder="ISSD-2r44-333r3" className="h-12" />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button>Lưu thông tin</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
