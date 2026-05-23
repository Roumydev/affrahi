import Sidebar from "@/components/dashboard/shared/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#FDFCFB] font-sans">
      <Sidebar />
      <main className="flex-1 p-12">{children}</main>
    </div>
  );
}
