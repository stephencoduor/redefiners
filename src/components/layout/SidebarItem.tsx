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
          'group flex items-center no-underline transition-all duration-200',
          active
            ? 'font-medium text-white'
            : 'font-normal text-white/75 hover:text-white hover:translate-x-0.5'
        )}
        style={{
          fontSize: '13px',
          padding: '12px 20px 12px 16px',
          borderRadius: '12px',
          margin: '0 10px',
          fontFamily: "'Inter', 'Poppins', sans-serif",
          ...(active
            ? {
                background: 'linear-gradient(135deg, #2DB88A 0%, #25A07A 100%)',
                boxShadow: '0 4px 15px rgba(0,196,140,0.4)',
              }
            : {}),
          ...(!active
            ? {
                background: 'transparent',
              }
            : {}),
        }}
        onMouseOver={(e) => {
          if (!active) {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
          }
        }}
        onMouseOut={(e) => {
          if (!active) {
            e.currentTarget.style.background = 'transparent'
          }
        }}
      >
        {Icon && (
          <Icon
            className="shrink-0"
            style={{ width: '22px', height: '22px', textAlign: 'center', fontSize: '15px' }}
          />
        )}
        <span className="truncate flex-1" style={{ marginLeft: '10px' }}>
          {item.label}
        </span>
        {item.badge != null && item.badge > 0 && (
          <span
            className="ml-auto flex items-center justify-center rounded-full text-white"
            style={{
              background: '#FF6B35',
              fontSize: '10px',
              fontWeight: 600,
              padding: '1px 6px',
              minWidth: '18px',
              textAlign: 'center',
            }}
          >
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronDown
            className={cn(
              'shrink-0 transition-transform duration-200',
              open && 'rotate-180'
            )}
            style={{
              width: '14px',
              height: '14px',
              color: 'rgba(255,255,255,0.5)',
              marginLeft: 'auto',
            }}
          />
        )}
      </Link>
      {hasChildren && (
        <SidebarSubmenu items={item.children!} open={open} />
      )}
    </div>
  )
}
