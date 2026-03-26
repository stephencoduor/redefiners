import { Search, Bell, Mail, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/layout/UserMenu'

interface TopBarProps {
  onMenuClick?: () => void
  unreadCount?: number
}

export function TopBar({ onMenuClick, unreadCount = 0 }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 md:px-6">
      {/* Left: hamburger + search */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 text-neutral-600" />
        </Button>

        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            type="search"
            placeholder="Search courses, assignments..."
            className="h-9 w-64 max-w-[400px] rounded-full border-neutral-200 bg-neutral-50 pl-9 text-sm focus-visible:bg-white"
          />
        </div>
      </div>

      {/* Right: notification icons + avatar */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-neutral-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>

        <Button variant="ghost" size="icon" aria-label="Inbox">
          <Mail className="h-5 w-5 text-neutral-600" />
        </Button>

        <UserMenu />
      </div>
    </header>
  )
}
