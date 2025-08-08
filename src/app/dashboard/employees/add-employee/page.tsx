import { DatePicker } from '@/components/date-picker';
import { HeaderTitle } from '@/components/HeaderTitle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GENDER_LABELS } from '@/enums/genderEnum';

export default function UpdateEmployeePage() {
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
            <h3 className="text-lg font-medium mb-5">Thông tin cá nhân</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <div className="flex flex-col gap-2">
                <Label>Họ và tên</Label>
                <Input placeholder="Nhập họ và tên" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Tên</Label>
                <Input placeholder="Nhập tên" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input placeholder="Nhập email" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Địa chỉ</Label>
                <Input placeholder="Nhập địa chỉ" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Điện thoại</Label>
                <Input placeholder="Nhập điện thoại" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Giới tính</Label>
                <Select>
                  <SelectTrigger className="w-full">
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
                <Label>Ngày sinh</Label>
                <DatePicker />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="professional-information" className="p-0">
            <h3 className="text-lg font-medium">Thông tin nâng cao</h3>
            <p className="text-muted-foreground mt-2 text-sm">Quản lý thông tin chuyên môn của bạn.</p>
          </TabsContent>
          <TabsContent value="documents" className="p-0">
            <h3 className="text-lg font-medium">Tài liệu</h3>
            <p className="text-muted-foreground mt-2 text-sm">Quản lý tài liệu của bạn.</p>
          </TabsContent>
          <TabsContent value="account-access" className="p-0">
            <h3 className="text-lg font-medium">Tài khoản truy cập</h3>
            <p className="text-muted-foreground mt-2 text-sm">Quản lý quyền truy cập tài khoản của bạn.</p>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
