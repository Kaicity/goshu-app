export default function ForbiddenPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-destructive">403 - Không có quyền truy cập</h1>
        <p className="mt-2 text-gray-600">Bạn không có quyền truy cập trang này.</p>
      </div>
    </div>
  );
}
