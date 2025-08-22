'use client';

import { getEmployee } from '@/api/employee/employee';
import ProtectPage from '@/components/auth/ProtectPage';
import { TextBorder } from '@/components/BoderText';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import { Gender, GENDER_LABELS } from '@/enums/genderEnum';
import { Marital, MARITAL_LABELS } from '@/enums/maritalEnum';
import { TypeWork, TYPEWORK_LABELS } from '@/enums/typeWorkEnum';
import { UserRole } from '@/enums/userRolesEnum';
import type { EmployeeDto } from '@/models/dto/employeeDto';
import { Paperclip } from 'lucide-react';
import { useEffect, useState } from 'react';

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

const ProfileTabsPage = () => {
  const { userAccount } = useApp();
  const [employee, setEmployee] = useState<EmployeeDto | null>(null);
  const [tab, setTab] = useState<string>(tabsInformation[0].value);
  const [documents, setDocuments] = useState<string[]>(Array(documentsList.length).fill(''));
  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      if (userAccount) {
        const res = await getEmployee(userAccount.employeeId as string);
        console.log('res', res);
        console.log('resss', userAccount?.employeeId);
        setEmployee(res);
        setDocuments(res.document);
      }
    };

    fetchEmployeeDetail();
  }, [userAccount]);

  const getGenderLabel = (gender?: string) => {
    if (!gender) return '';
    return GENDER_LABELS[gender as Gender] ?? '';
  };

  const getMartialLabel = (martial?: string) => {
    if (!martial) return '';
    return MARITAL_LABELS[martial as Marital] ?? '';
  };

  const getTypeLabel = (type?: string) => {
    if (!type) return '';
    return TYPEWORK_LABELS[type as TypeWork] ?? '';
  };

  return (
    <>
      <div className=" justify-between items-start gap-3">
          <Tabs defaultValue="personal-info" className="w-full" value={tab} onValueChange={(value) => setTab(value)}>
            <TabsList className="mb-3 w-full flex justify-start overflow-x-auto">
              {tabsInformation.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`
            relative px-6 py-2 text-sm font-medium text-muted-foreground
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
            {/* Personal-info */}
            <TabsContent value="personal-info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextBorder label="Họ" value={employee?.lastname ?? ''} />
                <TextBorder label="Tên" value={employee?.firstname ?? ''} />
                <TextBorder label="Căn Cước Công Dân" value={employee?.identityCard ?? ''} />
                <TextBorder label="Email" value={employee?.email ?? ''} />
                <TextBorder label="Điện thoại" value={employee?.phone ?? ''} />
                <TextBorder
                  label="Ngày sinh"
                  value={employee?.birthday ? new Date(employee.birthday).toLocaleDateString('vi-VN') : ''}
                />
                <TextBorder label="Giới tính" value={getGenderLabel(employee?.gender)} />
                <TextBorder label="Quốc gia" value={employee?.country ?? ''} />
                <TextBorder label="Tình trạng hôn nhân" value={getMartialLabel(employee?.marital)} />
                <TextBorder label="Địa chỉ thường trú" value={employee?.address ?? ''} />
              </div>
            </TabsContent>
            {/* Professional-info */}
            <TabsContent value="professional-information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextBorder label="Mã nhân viên" value={employee?.employeeCode ?? ''} />
                <TextBorder label="Username" value={employee?.username ?? ''} />
                <TextBorder label="Chức vụ" value={getTypeLabel(employee?.type)} />
                <TextBorder label="Vị trí hiện tại" value={employee?.designation ?? ''} />
                <TextBorder label="Phòng ban" value={employee?.departmentId?.name ?? ''} />
                <TextBorder
                  label="Ngày tham gia công ty"
                  value={employee?.joinDate ? new Date(employee.joinDate).toLocaleDateString('vi-VN') : '--/--'}
                />
                <TextBorder
                  label="Ngày bắt đầu làm việc"
                  value={employee?.workingDate ? new Date(employee.workingDate).toLocaleDateString('vi-VN') : '--/--'}
                />
              </div>
            </TabsContent>
            {/* Documents */}
            <TabsContent value="documents">
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
                          </div>
                        );
                      })()
                    ) : (
                      <div className="flex items-center justify-between bg-muted px-3 py-2 rounded mt-2">
                        <div className="flex gap-2">
                          <Paperclip size={20} className="text-primary" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">Chưa có tài liệu</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            {/* Account-access */}
            <TabsContent value="account-access">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TextBorder label="Email / Tài khoản đăng nhập" value={employee?.email ?? ''} />
                <TextBorder label="ID tài khoản Github" value={employee?.githubId ?? ''} />
                <TextBorder label="ID tài khoản Microsoft Teams" value={employee?.microsoftTeamId ?? ''} />
                <TextBorder label="ID tài khoản Slack" value={employee?.slackId ?? ''} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
    </>
  );
};
export default ProtectPage(ProfileTabsPage, { allowedRoles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE] });
