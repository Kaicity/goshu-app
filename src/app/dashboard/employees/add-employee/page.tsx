import { DatePicker } from '@/components/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUpload from '@/components/upload-image';
import { GENDER_LABELS } from '@/enums/genderEnum';

export default function MinimalTabs() {
  return (
    <div className="p-1 mt-4 bg-white border rounded-lg shadow-sm">
      <Tabs defaultValue="personal-info" className="w-full mr-auto">
        <TabsList className="mb-6 flex w-full justify-start gap-8 border-b bg-transparent pb-0 overflow-x-auto">
          <TabsTrigger
            value="personal-info"
            className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-primary rounded-none bg-transparent px-0 py-2 pb-3 data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
          >
            Thông tin cá nhân
          </TabsTrigger>
          <TabsTrigger
            value="professional-information"
            className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-primary rounded-none bg-transparent px-0 py-2 pb-3 data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
          >
            Thông tin nâng cao
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-primary rounded-none bg-transparent px-0 py-2 pb-3 data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
          >
            Tài liệu
          </TabsTrigger>
          <TabsTrigger
            value="account-access"
            className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-primary rounded-none bg-transparent px-0 py-2 pb-3 data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
          >
            Tài khoản truy cập
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal-info" className="p-0 w-full">
          <h3 className="text-lg font-medium ml-2 ">Thông tin cá nhân</h3>
          <div className="max-w-md w-full ml-2">
            <ImageUpload />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7  mt-2 ml-3">
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
  );
}
