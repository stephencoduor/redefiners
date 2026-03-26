import { Search, Bell, Mail, Menu } from 'lucide-react'
import { UserMenu } from '@/components/layout/UserMenu'

interface TopBarProps {
  onMenuClick?: () => void
  unreadCount?: number
}

export function TopBar({ onMenuClick, unreadCount = 0 }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between"
      style={{
        height: '64px',
        background: 'white',
        borderBottom: '1px solid #E5E7EB',
        padding: '0 24px',
      }}
    >
      {/* Left: hamburger + search */}
      <div className="flex items-center gap-3">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Menu className="h-5 w-5" style={{ color: '#6B7280' }} />
        </button>

        <div
          className="hidden items-center sm:flex"
          style={{
            borderRadius: '9999px',
            background: '#F3F4F6',
            border: '1px solid #E5E7EB',
            padding: '0 16px',
            height: '40px',
            width: '400px',
            maxWidth: '400px',
            gap: '8px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        >
          <Search className="shrink-0" style={{ color: '#6B7280', width: '14px', height: '14px' }} />
          <input
            type="search"
            placeholder="Search courses, assignments..."
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: "'Inter', 'Poppins', sans-serif",
              fontSize: '13px',
              color: '#163B32',
              flex: 1,
              minWidth: 0,
            }}
          />
        </div>
      </div>

      {/* Right: notification icons + avatar */}
      <div className="flex items-center gap-2">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
          aria-label="Notifications"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <Bell className="h-5 w-5" style={{ color: '#6B7280' }} />
          {unreadCount > 0 && (
            <span
              className="absolute flex items-center justify-center rounded-full text-white"
              style={{
                top: '-2px',
                right: '-2px',
                height: '16px',
                minWidth: '16px',
                background: '#EF4444',
                fontSize: '10px',
                fontWeight: 700,
                padding: '0 4px',
              }}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
          aria-label="Inbox"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <Mail className="h-5 w-5" style={{ color: '#6B7280' }} />
        </button>

        <UserMenu />
      </div>
    </header>
  )
}
