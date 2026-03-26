import { useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router'
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
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col lg:flex"
      style={{
        background: 'linear-gradient(180deg, #163B32 0%, #0F2922 100%)',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{ paddingBottom: '30px', paddingTop: '5px' }}>
        <Link to="/dashboard" className="flex items-center gap-2 px-5 pt-4 no-underline">
          <img
            src={`${import.meta.env.BASE_URL}Images/logo.PNG`}
            alt="ReDefiners"
            style={{ maxWidth: '160px', paddingTop: '15px' }}
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-1 flex-col gap-0.5 pb-5"
        style={{
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.15) transparent',
        }}
      >
        {sections.map((section, idx) => (
          <div key={section.title ?? idx}>
            {section.title && (
              <div
                style={{
                  padding: '12px 20px 6px',
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'rgba(124, 181, 164, 0.7)',
                }}
              >
                {section.title}
              </div>
            )}
            {section.items.map((item) => (
              <SidebarItem key={item.href + item.label} item={item} />
            ))}
          </div>
        ))}
      </nav>

      {/* Custom scrollbar styles */}
      <style>{`
        aside::-webkit-scrollbar { width: 4px; }
        aside::-webkit-scrollbar-track { background: transparent; }
        aside::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
      `}</style>
    </aside>
  )
}

/** Extract courseId from pathname like /courses/123/... */
function extractCourseId(pathname: string): string | undefined {
  const match = pathname.match(/^\/courses\/(\d+)/)
  return match?.[1]
}
