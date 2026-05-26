import { HeaderTitle } from '@/components/HeaderTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CompanyPolicyPage() {
  return (
    <div>
      <HeaderTitle text="Chính sách và Điều khoản của công ty" subText="Điều luật chấp hành công việc khi có mặt trong công ty" />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Giới thiệu chung</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Tài liệu này quy định các chính sách và điều khoản áp dụng cho toàn thể nhân viên khi làm việc tại công ty. Mọi cá
              nhân có trách nhiệm tuân thủ các quy định này.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Chính sách làm việc</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>Tuân thủ giờ làm việc và nội quy công ty.</li>
              <li>Hoàn thành công việc theo đúng mô tả và tiến độ.</li>
              <li>Tôn trọng đồng nghiệp và cấp trên.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Chính sách bảo mật thông tin</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Nhân viên không được tiết lộ thông tin nội bộ, dữ liệu khách hàng hoặc thông tin kinh doanh của công ty cho bên thứ
              ba khi chưa được phép.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Quyền lợi & Nghĩa vụ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>Được hưởng lương, thưởng và phúc lợi theo hợp đồng lao động.</li>
              <li>Tuân thủ các quy định về kỷ luật và đạo đức nghề nghiệp.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Điều khoản xử lý vi phạm</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Mọi hành vi vi phạm chính sách công ty sẽ bị xử lý theo quy định nội bộ và pháp luật hiện hành.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Hiệu lực</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Chính sách này có hiệu lực kể từ ngày ban hành và có thể được cập nhật theo từng thời kỳ.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
