import { useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarItem } from '@/components/layout/SidebarItem'
import {
  getGlobalNavSections,
  getCourseNavSections,
  type NavSection,
} from '@/lib/navigation'

export function Sidebar() {
  const { pathname } = useLocation()
  const params = useParams()

  // Determine if we're in a course context
  const courseId = params.courseId ?? extractCourseId(pathname)

  const sections: NavSection[] = useMemo(() => {
    if (courseId) {
      return getCourseNavSections(courseId)
    }
    return getGlobalNavSections()
  }, [courseId])

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col gradient-sidebar lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 pb-3">
        <Link to="/dashboard" className="flex items-center gap-2 no-underline">
          <img
            src={`${import.meta.env.BASE_URL}Images/logo.PNG`}
            alt="ReDefiners"
            className="h-8"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <span
            className="text-white font-semibold text-base"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            ReDefiners
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 pb-4">
        <nav className="flex flex-col gap-0.5">
          {sections.map((section, idx) => (
            <div key={section.title ?? idx}>
              {section.title && (
                <div className="px-3 pt-5 pb-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/40">
                    {section.title}
                  </span>
                </div>
              )}
              {section.items.map((item) => (
                <SidebarItem key={item.href + item.label} item={item} />
              ))}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}

/** Extract courseId from pathname like /courses/123/... */
function extractCourseId(pathname: string): string | undefined {
  const match = pathname.match(/^\/courses\/(\d+)/)
  return match?.[1]
}
