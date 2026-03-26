import { useState } from 'react'
import { Outlet } from 'react-router'
import { TopBar } from '@/components/layout/TopBar'

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen font-poppins">
      {/* Sidebar placeholder - will be implemented as a separate component */}
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[240px] lg:flex-col lg:overflow-y-auto lg:border-r lg:border-neutral-200 lg:bg-white">
        <div className="flex h-16 items-center px-6">
          <img src="/Images/logo.PNG" alt="ReDefiners" className="h-8" />
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[240px] transform bg-white transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center px-6">
          <img src="/Images/logo.PNG" alt="ReDefiners" className="h-8" />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col lg:ml-[240px]">
        <TopBar
          onMenuClick={() => setMobileOpen((prev) => !prev)}
        />
        <div className="flex-1 bg-[#D4EFE6] p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
