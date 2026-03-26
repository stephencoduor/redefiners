import { Outlet } from 'react-router'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Inter, Poppins, system-ui, sans-serif' }}>
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex flex-1 flex-col lg:ml-[240px]">
        <TopBar />
        <div className="flex-1 bg-[#D4EFE6] p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
