import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isNavItemOrChildActive } from '@/lib/navigation'
import { SidebarSubmenu } from '@/components/layout/SidebarSubmenu'
import type { NavItem } from '@/lib/navigation'

interface SidebarItemProps {
  item: NavItem
}

export function SidebarItem({ item }: SidebarItemProps) {
  const { pathname } = useLocation()
  const hasChildren = item.children && item.children.length > 0
  const active = isNavItemOrChildActive(pathname, item)

  // Auto-expand if a child is active
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (hasChildren && active) {
      setOpen(true)
    }
  }, [pathname, hasChildren, active])

  const Icon = item.icon

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  }

  return (
    <div>
      <Link
        to={item.href}
        onClick={handleClick}
        className={cn(
          'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium no-underline transition-all duration-150',
          active
            ? 'gradient-menu-active text-white shadow-[var(--shadow-glow-green)]'
            : 'text-white/75 hover:bg-white/[0.08] hover:text-white'
        )}
      >
        {Icon && <Icon className="h-[18px] w-[18px] shrink-0" />}
        <span className="truncate flex-1">{item.label}</span>
        {item.badge != null && item.badge > 0 && (
          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF6B35] px-1.5 text-[11px] font-semibold text-white">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 shrink-0 text-white/50 transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        )}
      </Link>
      {hasChildren && (
        <SidebarSubmenu items={item.children!} open={open} />
      )}
    </div>
  )
}
