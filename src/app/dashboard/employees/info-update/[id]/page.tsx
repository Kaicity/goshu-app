'use client';

import { getDepartments } from '@/api/departments/department';
import { getEmployee, updateEmployee } from '@/api/employee/employee';
import { deletefileDataUploadthing } from '@/api/uploadthing/uploadthing';
import { DatePicker } from '@/components/date-picker';
import { HeaderTitle } from '@/components/HeaderTitle';
import { SubmitButton } from '@/components/SummitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import { GENDER_LABELS } from '@/enums/genderEnum';
import { MARITAL_LABELS } from '@/enums/maritalEnum';
import { STATUS_LABELS } from '@/enums/statusEnum';
import { TYPEWORK_LABELS } from '@/enums/typeWorkEnum';
import { useActionWithLoading } from '@/hooks/useExecute';
import { UploadButton, UploadDropzone } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import CountryDto from '@/models/dto/countryDto';
import { DepartmentDto } from '@/models/dto/departmentDto';
import type { EmployeeFormDto } from '@/models/dto/employeeDto';
import { CreateEmployeeFormData, createEmployeeSchema } from '@/models/schemas/createEmployeeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowLeft, Camera, Loader2, Paperclip } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface TabsInformation {
  value: string;
  label: string;
}

const tabsInformation: TabsInformation[] = [
  { value: 'personal-info', label: 'Thông tin cá nhân' },
  { value: 'professional-information', label: 'Thông tin nâng cao' },
  { value: 'documents', label: 'Tài liệu' },
  { value: 'account-access', label: 'Tài khoản truy cập' },
];

const documentsList = ['Tải hồ sơ CV', 'Tải hồ sơ học vấn', 'Tải hồ sơ chứng chỉ tiếng anh', 'Tải hồ sơ chứng chỉ khác'];

export default function UpdateEmployeePage() {
  const params = useParams();
  const router = useRouter();

  const [currentProfileImage, setCurrentProfileImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [tab, setTab] = useState<string>(tabsInformation[0].value);

  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [employee, setEmployee] = useState<EmployeeFormDto | null>(null);
  const [departments, setDepartments] = useState<DepartmentDto[]>([]);

  // EXECUTE IMAGE UPLOAD
  const { isLoadingAction, execute } = useActionWithLoading();

  // FORM-VALUES
  const [genderSelected, setGenderSelected] = useState<string>('');
  const [countrySelected, setCountrySelected] = useState<string>('');
  const [maritalSelected, setMaritalSelected] = useState<string>('');
  const [birthdaySelected, setBirthdaySelected] = useState<Date>(new Date());
  const [joinDateSelected, setJoinDateSelected] = useState<Date>(new Date());
  const [workDateSelected, setWorkDateSelected] = useState<Date>(new Date());
  const [typeWorkSelected, setTypeWorkSelected] = useState<string>('');
  const [departmentSelected, setDepartmentSelected] = useState<string>('');

  const [documents, setDocuments] = useState<string[]>(Array(documentsList.length).fill(''));
  const { userAccount } = useApp();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateEmployeeFormData>({
    resolver: zodResolver(createEmployeeSchema),
  });

  useEffect(() => {
    fetchEmployeeDetail();
    if (userAccount?.role === 'ADMIN' || userAccount?.role === 'HR') {
      fetchDepartments();
    }
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

  useEffect(() => {
    if (employee) {
      //Load dữ liệu cũ từ API
      reset(employee);

      setDepartmentSelected((employee.departmentId as any)?.id || '');
      setValue('departmentId', (employee.departmentId as any)?.id || '');

      if (employee.birthday) {
        const date = new Date(employee.birthday);
        setBirthdaySelected(date);
      }

      if (employee.joinDate) {
        const date = new Date(employee.joinDate);
        setJoinDateSelected(date);
      }

      if (employee.workingDate) {
        const date = new Date(employee.workingDate);
        setWorkDateSelected(date);
      }

      // Dùng 1 ngôi toán tử nếu nó xảy ra, không thì thôi chứ biết seo nè
      employee.gender && setGenderSelected(employee.gender);
      employee.type && setTypeWorkSelected(employee.type);
      // employee.departmentId && setDepartmentSelected(employee.departmentId);
      employee.avatarUrl && setCurrentProfileImage(employee.avatarUrl);
      employee.type && setTypeWorkSelected(employee.type);
      employee.document && employee.document.length > 0 && setDocuments(employee.document);
      employee.marital && setMaritalSelected(employee.marital);
      employee.country && setCountrySelected(employee.country);
    }
  }, [employee, reset, setValue]);

  const fetchEmployeeDetail = async () => {
    try {
      const res = await getEmployee(params.id as string);
      setEmployee(res);
    } catch (error: any) {
      toast.error(error.message);
      router.back();
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments(1, 100, { search: '' });
      setDepartments(res.departments);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: CreateEmployeeFormData) => {
    try {
      const res = await updateEmployee(params.id as string, formData);
      if (res) {
        toast.success('Cập nhật thông tin thành công');
        fetchEmployeeDetail();
      }
    } catch (error: any) {
      toast.error('Cập nhật thông tin thất bại', {
        description: error.message,
      });
    }
  }, undefined);

  const onSubmit = async (data: CreateEmployeeFormData) => {
    console.log(data);

    startTransition(() => {
      submitAction(data);
    });
  };

  const handleBirthdayChange = (date: Date | undefined) => {
    if (!date) return;
    setBirthdaySelected(date);
    setValue('birthday', birthdaySelected);
  };

  const handleJoinDateSelected = (date: Date | undefined) => {
    if (!date) return;
    setJoinDateSelected(date);
    setValue('joinDate', joinDateSelected);
  };

  const handleWorkingDateSelected = (date: Date | undefined) => {
    if (!date) return;
    setWorkDateSelected(date);
    setValue('workingDate', workDateSelected);
  };

  const handleDeleteFileUpload = async (fileUrl: string) => {
    execute(
      async () => {
        if (fileUrl) {
          await deletefileDataUploadthing(fileUrl);
        }
      },
      {
        successMessage: 'File hoặc hình ảnh đã được xóa',
        errorMessage: 'Xóa File hoặc hình ảnh thất bại',
      },
    );
  };

  return (
    <>
      <Link href="/dashboard/employees">
        <div className="flex gap-1 items-center">
          <ArrowLeft size={20} />
          <span className="text-sm">Trở lại</span>
        </div>
      </Link>
      <HeaderTitle text="Cập Nhật Thông Tin" subText="Quản lý thông tin cơ bản của nhân viên" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 bg-card border rounded-lg shadow-sm">
          <Tabs defaultValue="personal-info" className="w-full mr-auto" value={tab} onValueChange={(value) => setTab(value)}>
            <TabsList className="mb-6 flex w-full justify-start overflow-x-auto scrollbar-hide border-b border-border">
              {tabsInformation.map((tab) => (
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

            {/* PERSONAL INFORMATION */}
            <TabsContent value="personal-info" className="p-2 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <div className="flex flex-col col-span-3 gap-2">
                  <Label>Hình ảnh nhân viên</Label>
                  {currentProfileImage ? (
                    <div className="flex items-center gap-3">
                      <div className="relative w-full max-w-[250px] aspect-square">
                        <Image
                          src={currentProfileImage}
                          alt="Ảnh nhân viên"
                          fill
                          className="rounded-md object-cover border border-gray-200 dark:border-gray-700"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            handleDeleteFileUpload(currentProfileImage);
                            setCurrentProfileImage('');
                            setValue('avatarUrl', '');
                          }}
                          className="absolute top-2 right-2 text-xs p-2 bg-red-500 hover:bg-red-500/70 text-white dark:bg-red-700 dark:hover:bg-red-700/80"
                        >
                          {isLoadingAction ? <Spinner size="small" className="text-white" /> : 'Xóa ảnh'}
                        </Button>
                      </div>

                      <div className="relative w-full h-62 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                        <Image src="/assets/banner-emp.jpg" alt="Hướng dẫn điền form" fill className="object-cover opacity-70" />

                        <div className="absolute inset-0 p-4 flex flex-col justify-center bg-black/40 text-white space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">📋 Hướng dẫn cập nhật thông tin</h3>
                            <ul className="text-sm space-y-1 list-disc list-inside">
                              <li>Điền đầy đủ họ tên, ngày sinh và chức vụ.</li>
                              <li>Chọn đúng phòng ban của bạn.</li>
                              <li>Tải ảnh chân dung rõ nét.</li>
                              <li>
                                Nhấn <b>Cập nhật</b> để lưu thay đổi.
                              </li>
                            </ul>
                          </div>

                          <div className="bg-yellow-500/80 text-black p-2 mb-2 rounded-md">
                            <h4 className="text-sm font-semibold mb-1">⚠️ Chú ý</h4>
                            <ul className="text-xs list-disc list-inside space-y-1">
                              <li>Không để trống các trường bắt buộc (*)</li>
                              <li>Ảnh tải lên phải nhỏ hơn 5MB</li>
                              <li>Kiểm tra kỹ chính tả trước khi lưu</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <div className="flex items-start">
                        <UploadButton
                          endpoint="singleImageUploader"
                          onUploadBegin={() => setIsUploading(true)}
                          onClientUploadComplete={(res) => {
                            const url = res[0].ufsUrl;
                            setCurrentProfileImage(url);
                            setValue('avatarUrl', url);
                            setIsUploading(false);
                            toast.success('Hình ảnh của bạn đã được upload');
                          }}
                          onUploadError={(error) => {
                            toast.error(error.message);
                          }}
                          content={{
                            button: isUploading ? (
                              <div className="flex flex-col items-center mx-auto">
                                <Loader2 className="w-4 h-4 animate-spin mb-2 text-white" />
                                <span className="text-xs">Đang tải...</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-1">
                                <Camera className="w-5 h-5" />
                                <span className="text-xs">Chọn ảnh upload</span>
                              </div>
                            ),
                            allowedContent: <></>,
                          }}
                          appearance={{
                            button:
                              'w-62 h-62 bg-primary/50 dark:bg-secondary px-4 py-2 rounded-md hover:bg-primary/40 dark:hover:bg-primary/10 disabled:opacity-50',
                            allowedContent: 'text-xs text-muted-foreground',
                          }}
                        />
                      </div>

                      <div className="relative w-full h-62 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                        <Image src="/assets/banner-emp.jpg" alt="Hướng dẫn điền form" fill className="object-cover opacity-70" />

                        <div className="absolute inset-0 p-4 flex flex-col justify-center bg-black/40 text-white space-y-3">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">📋 Hướng dẫn cập nhật thông tin</h3>
                            <ul className="text-sm space-y-1 list-disc list-inside">
                              <li>Điền đầy đủ họ tên, ngày sinh và chức vụ.</li>
                              <li>Chọn đúng phòng ban của bạn.</li>
                              <li>Tải ảnh chân dung rõ nét.</li>
                              <li>
                                Nhấn <b>Cập nhật</b> để lưu thay đổi.
                              </li>
                            </ul>
                          </div>

                          <div className="bg-yellow-500/80 text-black p-2 mb-2 rounded-md">
                            <h4 className="text-sm font-semibold mb-1">⚠️ Chú ý</h4>
                            <ul className="text-xs list-disc list-inside space-y-1">
                              <li>Không để trống các trường bắt buộc (*)</li>
                              <li>Ảnh tải lên phải nhỏ hơn 5MB</li>
                              <li>Kiểm tra kỹ chính tả trước khi lưu</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 col-span-3 md:col-span-1">
                  <Label>Họ đệm</Label>
                  <Input placeholder="Nhập họ" className="h-12" {...register('lastname')} />
                </div>

                <div className="flex flex-col gap-2 col-span-3 md:col-span-1">
                  <Label>Tên</Label>
                  <Input placeholder="Nhập tên" className="h-12" {...register('firstname')} />
                </div>

                <div className="flex flex-col gap-2 col-span-3 md:col-span-1">
                  <Label>Căn Cước Công Dân</Label>
                  <Input placeholder="0-XXX-XXX-XXX" className="h-12" {...register('identityCard')} />
                </div>

                <div className="flex flex-col col-span-3 md:col-span-1 gap-2">
                  <Label className={cn(errors.internalEmail ? 'text-red-500' : '')}>Email nội bộ</Label>
                  <Input
                    placeholder={errors.internalEmail ? errors.internalEmail.message : 'Nhập Email'}
                    className={cn('h-12', errors.internalEmail ? 'border border-red-500' : '')}
                    {...register('internalEmail')}
                  />
                </div>

                <div className="flex flex-col col-span-3 md:col-span-1 gap-2">
                  <Label>Điện thoại</Label>
                  <Input placeholder="Nhập điện thoại" className="h-12" {...register('phone')} />
                </div>

                <div className="flex flex-col col-span-3 md:col-span-1 gap-2">
                  <Label>Ngày sinh</Label>
                  <DatePicker onDateChange={handleBirthdayChange} dateValue={birthdaySelected} />
                </div>

                <div className="flex flex-col col-span-3 md:col-span-1 gap-2">
                  <Label>Giới tính</Label>
                  <Select
                    value={genderSelected}
                    onValueChange={(value) => {
                      setGenderSelected(value);
                      setValue('gender', value);
                    }}
                  >
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

                <div className="flex flex-col col-span-3 md:col-span-1 gap-2">
                  <Label>Quốc tịch</Label>
                  <Select
                    value={countrySelected}
                    onValueChange={(value) => {
                      setCountrySelected(value);
                      setValue('country', value);
                    }}
                  >
                    <SelectTrigger className="w-full !h-12">
                      <SelectValue placeholder="Chọn quốc tịch hiện tại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectContent>
                        {countries
                          .filter((country) => country.id && country.iso)
                          .map((country, index) => (
                            <SelectItem key={country.id || `${country.iso}-${index}`} value={country.name}>
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

                <div className="flex flex-col col-span-3 md:col-span-1 gap-2">
                  <Label>Tình trạng hôn nhân</Label>
                  <Select
                    value={maritalSelected}
                    onValueChange={(value) => {
                      setMaritalSelected(value);
                      setValue('marital', value);
                    }}
                  >
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
                <div className="flex flex-col col-span-3 gap-2">
                  <Label>Địa chỉ thường trú</Label>
                  <Input placeholder="Nhập địa chỉ" className="h-12" {...register('address')} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={() => setTab(tabsInformation[1].value)} type="button">
                  Tiếp theo
                </Button>
              </div>
            </TabsContent>

            {/* PROFESSIONAL INFORMATION */}
            <TabsContent value="professional-information" className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-2">
                  <Label>Mã nhân viên</Label>
                  <Input
                    placeholder="NV-XXXX"
                    className="h-12 cursor-not-allowed font-bold"
                    value={employee?.employeeCode}
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Username</Label>
                  <Input placeholder="Nhập Username" className="h-12" {...register('username')} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Hình thức làm việc</Label>
                  <Select
                    value={typeWorkSelected}
                    onValueChange={(value) => {
                      setTypeWorkSelected(value);
                      setValue('type', value);
                    }}
                  >
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
                  <Input placeholder="Front-end developer, Kế toán,..." className="h-12" {...register('designation')} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Phòng ban</Label>
                  <Select
                    value={departmentSelected}
                    onValueChange={(value) => {
                      setDepartmentSelected(value);
                      setValue('departmentId', value);
                    }}
                  >
                    <SelectTrigger className="w-full !h-12">
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((item) => (
                        <SelectItem key={item.id} value={item.id as string}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Ngày tham gia công ty</Label>
                  <DatePicker dateValue={joinDateSelected} onDateChange={handleJoinDateSelected} />
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
                  <DatePicker dateValue={workDateSelected} onDateChange={handleWorkingDateSelected} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" onClick={() => setTab(tabsInformation[2].value)}>
                  Tiếp theo
                </Button>
              </div>
            </TabsContent>

            {/* DOCUMENTS */}
            <TabsContent value="documents" className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {documentsList.map((label, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Label>{label}</Label>
                    {documents[index] ? (
                      (() => {
                        const strUrl = documents[index];
                        const fileUrl = strUrl.split('*')[1];
                        const fileName = strUrl.split('*')[0];

                        return (
                          <div className="flex items-center justify-between bg-muted px-3 py-2 rounded mt-2">
                            <div className="flex gap-2">
                              <Paperclip size={20} className="text-primary" />
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate"
                              >
                                {fileName}
                              </a>
                            </div>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="hover:bg-red-700 dark:hover:bg-red-400 text-xs"
                              onClick={() => {
                                handleDeleteFileUpload(documents[index]);
                                setDocuments((prev) => {
                                  const updated = [...prev];
                                  updated[index] = '';
                                  setValue('document', updated);
                                  return updated;
                                });
                              }}
                            >
                              {isLoadingAction ? <Spinner size="small" className="text-white" /> : 'Xóa hồ sơ'}
                            </Button>
                          </div>
                        );
                      })()
                    ) : (
                      <UploadDropzone
                        className="py-6 ut-button:bg-amber-500 ut-button:ut-readying:bg-amber-500/50 ut-button:p-2"
                        onUploadBegin={() => setIsUploading(true)}
                        onClientUploadComplete={(res) => {
                          const url = res[0].ufsUrl;
                          const originalName = res[0].name;

                          setDocuments((prev) => {
                            const updated = [...prev];
                            updated[index] = originalName + '*' + url;
                            setValue('document', updated);
                            return updated;
                          });
                          setIsUploading(false);
                          toast.success('Tệp của bạn đã được upload');
                        }}
                        onUploadError={(error) => {
                          toast.error(error.message);
                        }}
                        endpoint="fileUploader"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <Button onClick={() => setTab(tabsInformation[3].value)} type="button">
                  Tiếp theo
                </Button>
              </div>
            </TabsContent>

            {/* ACCOUNT ACCESS */}
            <TabsContent value="account-access" className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="flex flex-col gap-2">
                  <Label>Email / Tài khoản đăng nhập</Label>
                  <Input placeholder="user@gmail.com" className="h-12 cursor-not-allowed" readOnly value={employee?.email} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>ID tài khoản Github</Label>
                  <Input placeholder="ISSD-2r44-333r3" className="h-12" {...register('githubId')} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>ID tài khoản Microsoft Team</Label>
                  <Input placeholder="ISSD-2r44-333r3" className="h-12" {...register('microsoftTeamId')} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>ID tài khoản Slack</Label>
                  <Input placeholder="ISSD-2r44-333r3" className="h-12" {...register('slackId')} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <SubmitButton text="Lưu thông tin" isPending={isPending} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </form>
    </>
  );
}
