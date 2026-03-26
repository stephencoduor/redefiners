import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  ClipboardList,
  ListChecks,
  Send,
  GraduationCap,
  ImagePlay,
  Users,
  HandHelping,
  CalendarDays,
  TrendingUp,
  UserCircle,
  HelpCircle,
  ShieldCheck,
  Server,
  ArrowLeft,
  Home,
  Megaphone,
  FileText,
  CircleHelp,
  MessageSquare,
  Layers,
  BarChart3,
  FileEdit,
  Folder,
  BookOpen,
  Star,
  UserPlus,
  Video,
  Handshake,
  Settings,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────

export interface NavItem {
  label: string
  icon?: LucideIcon
  href: string
  matchPaths?: string[]
  children?: NavItem[]
  requiredRole?: 'admin' | 'teacher'
  badge?: number
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

// ─── Global Navigation ──────────────────────────────

export function getGlobalNavSections(): NavSection[] {
  return [
    {
      items: [
        {
          label: 'Dashboard',
          icon: LayoutDashboard,
          href: '/dashboard',
          matchPaths: ['/dashboard'],
        },
        {
          label: 'Courses',
          icon: ClipboardList,
          href: '/courses',
          matchPaths: ['/courses'],
          children: [], // populated dynamically from API
        },
        {
          label: 'Planner',
          icon: ListChecks,
          href: '/planner',
          matchPaths: ['/planner'],
        },
      ],
    },
    {
      title: 'Communication',
      items: [
        {
          label: 'Messages',
          icon: Send,
          href: '/inbox',
          matchPaths: ['/inbox', '/chat', '/announcements/editor', '/feedback', '/message-templates'],
          children: [
            { label: 'Messages', href: '/inbox', matchPaths: ['/inbox'] },
            { label: 'Live Chat', href: '/chat', matchPaths: ['/chat'] },
            { label: 'Announcements', href: '/announcements/editor', matchPaths: ['/announcements/editor'] },
            { label: 'Feedback Hub', href: '/feedback', matchPaths: ['/feedback'] },
            { label: 'Templates', href: '/message-templates', matchPaths: ['/message-templates'] },
          ],
        },
      ],
    },
    {
      title: 'Learning',
      items: [
        {
          label: 'Growth & Goals',
          icon: GraduationCap,
          href: '/learning-objectives',
          matchPaths: [
            '/learning-objectives', '/competencies', '/learning-paths',
            '/certificates', '/goal-setting', '/progress-tracker',
          ],
          children: [
            { label: 'Learning Objectives', href: '/learning-objectives', matchPaths: ['/learning-objectives'] },
            { label: 'Competencies', href: '/competencies', matchPaths: ['/competencies'] },
            { label: 'Learning Paths', href: '/learning-paths', matchPaths: ['/learning-paths'] },
            { label: 'Certificates', href: '/certificates', matchPaths: ['/certificates'] },
            { label: 'Goal Setting', href: '/goal-setting', matchPaths: ['/goal-setting'] },
            { label: 'Progress Tracker', href: '/progress-tracker', matchPaths: ['/progress-tracker'] },
          ],
        },
        {
          label: 'Content & Media',
          icon: ImagePlay,
          href: '/content-library',
          matchPaths: [
            '/content-library', '/resource-library', '/video-studio',
            '/interactive-tools', '/commons',
          ],
          children: [
            { label: 'Content Library', href: '/content-library', matchPaths: ['/content-library'] },
            { label: 'Resource Library', href: '/resource-library', matchPaths: ['/resource-library'] },
            { label: 'Video Studio', href: '/video-studio', matchPaths: ['/video-studio'] },
            { label: 'Interactive Tools', href: '/interactive-tools', matchPaths: ['/interactive-tools'] },
            { label: 'Learning Commons', href: '/commons', matchPaths: ['/commons'] },
          ],
        },
      ],
    },
    {
      title: 'Community',
      items: [
        {
          label: 'Collaborate',
          icon: Users,
          href: '/study-groups',
          matchPaths: [
            '/study-groups', '/workspaces', '/conferences',
            '/recordings', '/group-assignments',
          ],
          children: [
            { label: 'Study Groups', href: '/study-groups', matchPaths: ['/study-groups'] },
            { label: 'Workspaces', href: '/workspaces', matchPaths: ['/workspaces'] },
            { label: 'Conferences', href: '/conferences', matchPaths: ['/conferences'] },
            { label: 'Recordings', href: '/recordings', matchPaths: ['/recordings'] },
            { label: 'Group Assignments', href: '/group-assignments', matchPaths: ['/group-assignments'] },
          ],
        },
        {
          label: 'Student Services',
          icon: HandHelping,
          href: '/tutoring',
          matchPaths: [
            '/tutoring', '/mentoring', '/career-services',
            '/support', '/wellness', '/office-hours',
          ],
          children: [
            { label: 'Tutoring', href: '/tutoring', matchPaths: ['/tutoring'] },
            { label: 'Mentoring', href: '/mentoring', matchPaths: ['/mentoring'] },
            { label: 'Career Services', href: '/career-services', matchPaths: ['/career-services'] },
            { label: 'Support Resources', href: '/support', matchPaths: ['/support'] },
            { label: 'Wellness Check', href: '/wellness', matchPaths: ['/wellness'] },
            { label: 'Office Hours', href: '/office-hours', matchPaths: ['/office-hours'] },
          ],
        },
      ],
    },
    {
      title: 'Schedule',
      items: [
        {
          label: 'Schedule & Events',
          icon: CalendarDays,
          href: '/calendar',
          matchPaths: [
            '/calendar', '/academic-calendar', '/events',
            '/room-booking', '/attendance',
          ],
          children: [
            { label: 'Calendar', href: '/calendar', matchPaths: ['/calendar'] },
            { label: 'Academic Calendar', href: '/academic-calendar', matchPaths: ['/academic-calendar'] },
            { label: 'Events', href: '/events', matchPaths: ['/events'] },
            { label: 'Room Booking', href: '/room-booking', matchPaths: ['/room-booking'] },
            { label: 'Attendance', href: '/attendance', matchPaths: ['/attendance'] },
          ],
        },
      ],
    },
    {
      title: 'Insights',
      items: [
        {
          label: 'Analytics',
          icon: TrendingUp,
          href: '/analytics',
          matchPaths: [
            '/analytics', '/learning-analytics', '/engagement',
            '/completion-reports', '/analytics-hub',
          ],
          children: [
            { label: 'Performance Analytics', href: '/analytics', matchPaths: ['/analytics'] },
            { label: 'Learning Analytics', href: '/learning-analytics', matchPaths: ['/learning-analytics'] },
            { label: 'Engagement Metrics', href: '/engagement', matchPaths: ['/engagement'] },
            { label: 'Completion Reports', href: '/completion-reports', matchPaths: ['/completion-reports'] },
            { label: 'Analytics Hub', href: '/analytics-hub', matchPaths: ['/analytics-hub'] },
          ],
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          label: 'Account',
          icon: UserCircle,
          href: '/profile',
          matchPaths: ['/profile', '/settings', '/notifications', '/eportfolio', '/change-password'],
          children: [
            { label: 'Profile', href: '/profile', matchPaths: ['/profile'] },
            { label: 'Settings', href: '/settings', matchPaths: ['/settings'] },
            { label: 'Notifications', href: '/notifications', matchPaths: ['/notifications'] },
            { label: 'ePortfolio', href: '/eportfolio', matchPaths: ['/eportfolio'] },
            { label: 'Change Password', href: '/change-password', matchPaths: ['/change-password'] },
          ],
        },
        {
          label: 'Help Center',
          icon: HelpCircle,
          href: '/help',
          matchPaths: ['/help'],
        },
      ],
    },
    {
      title: 'Administration',
      items: [
        {
          label: 'Admin',
          icon: ShieldCheck,
          href: '/admin',
          matchPaths: [
            '/admin', '/admin/users', '/admin/enrollments', '/admin/reports',
            '/admin/audit-log', '/admin/developer-keys', '/admin/permissions',
            '/admin/authentication', '/admin/sub-accounts', '/admin/sis-import',
          ],
          requiredRole: 'admin',
          children: [
            { label: 'Users', href: '/admin/users', matchPaths: ['/admin/users'] },
            { label: 'Enrollments', href: '/admin/enrollments', matchPaths: ['/admin/enrollments'] },
            { label: 'Reports', href: '/admin/reports', matchPaths: ['/admin/reports'] },
            { label: 'Audit Log', href: '/admin/audit-log', matchPaths: ['/admin/audit-log'] },
            { label: 'Developer Keys', href: '/admin/developer-keys', matchPaths: ['/admin/developer-keys'] },
            { label: 'Permissions', href: '/admin/permissions', matchPaths: ['/admin/permissions'] },
            { label: 'Authentication', href: '/admin/authentication', matchPaths: ['/admin/authentication'] },
            { label: 'Sub-Accounts', href: '/admin/sub-accounts', matchPaths: ['/admin/sub-accounts'] },
            { label: 'SIS Import', href: '/admin/sis-import', matchPaths: ['/admin/sis-import'] },
          ],
        },
        {
          label: 'System',
          icon: Server,
          href: '/admin/system',
          matchPaths: [
            '/admin/system', '/admin/institution', '/admin/terms',
            '/admin/course-templates', '/admin/system-health', '/admin/backup',
            '/admin/data-privacy', '/admin/api-tokens', '/admin/accessibility',
          ],
          requiredRole: 'admin',
          children: [
            { label: 'Institution Settings', href: '/admin/institution', matchPaths: ['/admin/institution'] },
            { label: 'Terms & Semesters', href: '/admin/terms', matchPaths: ['/admin/terms'] },
            { label: 'Course Templates', href: '/admin/course-templates', matchPaths: ['/admin/course-templates'] },
            { label: 'System Health', href: '/admin/system-health', matchPaths: ['/admin/system-health'] },
            { label: 'Backup & Restore', href: '/admin/backup', matchPaths: ['/admin/backup'] },
            { label: 'Data Privacy', href: '/admin/data-privacy', matchPaths: ['/admin/data-privacy'] },
            { label: 'API Tokens', href: '/admin/api-tokens', matchPaths: ['/admin/api-tokens'] },
            { label: 'Accessibility', href: '/admin/accessibility', matchPaths: ['/admin/accessibility'] },
          ],
        },
      ],
    },
  ]
}

// ─── Course Context Navigation ──────────────────────

export function getCourseNavSections(courseId: string): NavSection[] {
  const base = `/courses/${courseId}`

  return [
    {
      items: [
        {
          label: 'Back to Dashboard',
          icon: ArrowLeft,
          href: '/dashboard',
        },
      ],
    },
    {
      title: 'Course',
      items: [
        {
          label: 'Home',
          icon: Home,
          href: `${base}`,
          matchPaths: [base, `${base}/home`],
        },
        {
          label: 'Announcements',
          icon: Megaphone,
          href: `${base}/announcements`,
          matchPaths: [`${base}/announcements`],
        },
        {
          label: 'Assignments',
          icon: FileText,
          href: `${base}/assignments`,
          matchPaths: [`${base}/assignments`],
        },
        {
          label: 'Quizzes',
          icon: CircleHelp,
          href: `${base}/quizzes`,
          matchPaths: [`${base}/quizzes`],
        },
        {
          label: 'Discussions',
          icon: MessageSquare,
          href: `${base}/discussions`,
          matchPaths: [`${base}/discussions`],
        },
        {
          label: 'Modules',
          icon: Layers,
          href: `${base}/modules`,
          matchPaths: [`${base}/modules`],
        },
        {
          label: 'Grades',
          icon: BarChart3,
          href: `${base}/grades`,
          matchPaths: [`${base}/grades`],
        },
        {
          label: 'Pages',
          icon: FileEdit,
          href: `${base}/pages`,
          matchPaths: [`${base}/pages`],
        },
        {
          label: 'Files',
          icon: Folder,
          href: `${base}/files`,
          matchPaths: [`${base}/files`],
        },
        {
          label: 'People',
          icon: Users,
          href: `${base}/people`,
          matchPaths: [`${base}/people`],
        },
        {
          label: 'Syllabus',
          icon: BookOpen,
          href: `${base}/syllabus`,
          matchPaths: [`${base}/syllabus`],
        },
      ],
    },
    {
      title: 'Assessment',
      items: [
        {
          label: 'Assessment',
          icon: Star,
          href: `${base}/grades`,
          matchPaths: [
            `${base}/rubrics`, `${base}/outcomes`,
            `${base}/speed-grader`, `${base}/gradebook`,
          ],
          children: [
            { label: 'Rubrics', href: `${base}/rubrics`, matchPaths: [`${base}/rubrics`] },
            { label: 'Outcomes', href: `${base}/outcomes`, matchPaths: [`${base}/outcomes`] },
            { label: 'SpeedGrader', href: `${base}/speed-grader`, matchPaths: [`${base}/speed-grader`] },
            { label: 'Gradebook', href: `${base}/gradebook`, matchPaths: [`${base}/gradebook`] },
          ],
        },
      ],
    },
    {
      title: 'Collaborate',
      items: [
        {
          label: 'Groups',
          icon: UserPlus,
          href: `${base}/groups`,
          matchPaths: [`${base}/groups`],
        },
        {
          label: 'Conferences',
          icon: Video,
          href: `${base}/conferences`,
          matchPaths: [`${base}/conferences`],
        },
        {
          label: 'Collaborations',
          icon: Handshake,
          href: `${base}/collaborations`,
          matchPaths: [`${base}/collaborations`],
        },
        {
          label: 'Analytics',
          icon: TrendingUp,
          href: `${base}/analytics`,
          matchPaths: [`${base}/analytics`, `${base}/statistics`],
        },
        {
          label: 'Settings',
          icon: Settings,
          href: `${base}/settings`,
          matchPaths: [`${base}/settings`],
        },
      ],
    },
  ]
}

// ─── Helpers ────────────────────────────────────────

/** Check if a path matches any of the matchPaths (prefix match) */
export function isNavItemActive(pathname: string, item: NavItem): boolean {
  if (item.matchPaths) {
    return item.matchPaths.some(p => pathname === p || pathname.startsWith(p + '/'))
  }
  return pathname === item.href || pathname.startsWith(item.href + '/')
}

/** Check if any child of a nav item is active */
export function isNavItemOrChildActive(pathname: string, item: NavItem): boolean {
  if (isNavItemActive(pathname, item)) return true
  if (item.children) {
    return item.children.some(child => isNavItemActive(pathname, child))
  }
  return false
}
