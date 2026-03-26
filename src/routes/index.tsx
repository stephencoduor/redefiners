import { createBrowserRouter, Navigate } from 'react-router'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { PublicRoute } from '@/routes/PublicRoute'

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        lazy: async () => {
          const { LoginPage } = await import('@/pages/LoginPage')
          return { Component: LoginPage }
        },
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        lazy: async () => {
          const { AppLayout } = await import('@/components/layout/AppLayout')
          return { Component: AppLayout }
        },
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: '/dashboard',
            lazy: async () => {
              const { DashboardPage } = await import('@/pages/DashboardPage')
              return { Component: DashboardPage }
            },
          },
          {
            path: '/courses',
            lazy: async () => {
              const { CoursesPage } = await import('@/pages/courses/CoursesPage')
              return { Component: CoursesPage }
            },
          },
          {
            path: '/courses/:courseId',
            lazy: async () => {
              const { CourseHomePage } = await import('@/pages/courses/CourseHomePage')
              return { Component: CourseHomePage }
            },
          },
          {
            path: '/courses/:courseId/assignments',
            lazy: async () => {
              const { AssignmentsPage } = await import('@/pages/assignments/AssignmentsPage')
              return { Component: AssignmentsPage }
            },
          },
          {
            path: '/courses/:courseId/assignments/:assignmentId',
            lazy: async () => {
              const { AssignmentDetailPage } = await import('@/pages/assignments/AssignmentDetailPage')
              return { Component: AssignmentDetailPage }
            },
          },
          {
            path: '/courses/:courseId/modules',
            lazy: async () => {
              const { ModulesPage } = await import('@/pages/modules/ModulesPage')
              return { Component: ModulesPage }
            },
          },
          {
            path: '/courses/:courseId/grades',
            lazy: async () => {
              const { GradesPage } = await import('@/pages/grades/GradesPage')
              return { Component: GradesPage }
            },
          },
          {
            path: '/courses/:courseId/pages',
            lazy: async () => {
              const { PagesListPage } = await import('@/pages/pages/PagesListPage')
              return { Component: PagesListPage }
            },
          },
          {
            path: '/courses/:courseId/pages/:pageUrl',
            lazy: async () => {
              const { PageViewPage } = await import('@/pages/pages/PageViewPage')
              return { Component: PageViewPage }
            },
          },
          {
            path: '/courses/:courseId/files',
            lazy: async () => {
              const { FilesPage } = await import('@/pages/files/FilesPage')
              return { Component: FilesPage }
            },
          },
          {
            path: '/courses/:courseId/syllabus',
            lazy: async () => {
              const { SyllabusPage } = await import('@/pages/courses/SyllabusPage')
              return { Component: SyllabusPage }
            },
          },
          {
            path: '/courses/:courseId/discussions',
            lazy: async () => {
              const { DiscussionsPage } = await import('@/pages/discussions/DiscussionsPage')
              return { Component: DiscussionsPage }
            },
          },
          {
            path: '/courses/:courseId/discussions/:topicId',
            lazy: async () => {
              const { DiscussionThreadPage } = await import('@/pages/discussions/DiscussionThreadPage')
              return { Component: DiscussionThreadPage }
            },
          },
          {
            path: '/courses/:courseId/quizzes',
            lazy: async () => {
              const { QuizzesPage } = await import('@/pages/quizzes/QuizzesPage')
              return { Component: QuizzesPage }
            },
          },
          {
            path: '/courses/:courseId/people',
            lazy: async () => {
              const { PeoplePage } = await import('@/pages/people/PeoplePage')
              return { Component: PeoplePage }
            },
          },
          {
            path: '/courses/:courseId/groups',
            lazy: async () => {
              const { GroupsPage } = await import('@/pages/groups/GroupsPage')
              return { Component: GroupsPage }
            },
          },
          {
            path: '/courses/:courseId/conferences',
            lazy: async () => {
              const { ConferencesPage } = await import('@/pages/conferences/ConferencesPage')
              return { Component: ConferencesPage }
            },
          },
          {
            path: '/inbox',
            lazy: async () => {
              const { InboxPage } = await import('@/pages/inbox/InboxPage')
              return { Component: InboxPage }
            },
          },
          {
            path: '/profile',
            lazy: async () => {
              const { ProfilePage } = await import('@/pages/profile/ProfilePage')
              return { Component: ProfilePage }
            },
          },
          {
            path: '/admin',
            lazy: async () => {
              const { AdminDashboardPage } = await import('@/pages/admin/AdminDashboardPage')
              return { Component: AdminDashboardPage }
            },
          },
          {
            path: '/admin/users',
            lazy: async () => {
              const { UserManagementPage } = await import('@/pages/admin/UserManagementPage')
              return { Component: UserManagementPage }
            },
          },
          {
            path: '/admin/reports',
            lazy: async () => {
              const { ReportsPage } = await import('@/pages/admin/ReportsPage')
              return { Component: ReportsPage }
            },
          },
          {
            path: '/admin/permissions',
            lazy: async () => {
              const { PermissionsPage } = await import('@/pages/admin/PermissionsPage')
              return { Component: PermissionsPage }
            },
          },
          {
            path: '/admin/terms',
            lazy: async () => {
              const { TermsPage } = await import('@/pages/admin/TermsPage')
              return { Component: TermsPage }
            },
          },
          {
            path: '/admin/developer-keys',
            lazy: async () => {
              const { DeveloperKeysPage } = await import('@/pages/admin/DeveloperKeysPage')
              return { Component: DeveloperKeysPage }
            },
          },
          {
            path: '/settings',
            lazy: async () => {
              const { AccountSettingsPage } = await import('@/pages/settings/AccountSettingsPage')
              return { Component: AccountSettingsPage }
            },
          },
          {
            path: '/courses/:courseId/settings',
            lazy: async () => {
              const { CourseSettingsPage } = await import('@/pages/settings/CourseSettingsPage')
              return { Component: CourseSettingsPage }
            },
          },
          {
            path: '/calendar',
            lazy: async () => {
              const { CalendarPage } = await import('@/pages/calendar/CalendarPage')
              return { Component: CalendarPage }
            },
          },
          {
            path: '/planner',
            lazy: async () => {
              const { PlannerPage } = await import('@/pages/planner/PlannerPage')
              return { Component: PlannerPage }
            },
          },
          {
            path: '/eportfolio',
            lazy: async () => {
              const { EPortfolioPage } = await import('@/pages/eportfolio/EPortfolioPage')
              return { Component: EPortfolioPage }
            },
          },
          {
            path: '/courses/:courseId/outcomes',
            lazy: async () => {
              const { OutcomesPage } = await import('@/pages/outcomes/OutcomesPage')
              return { Component: OutcomesPage }
            },
          },
          {
            path: '/courses/:courseId/rubrics',
            lazy: async () => {
              const { RubricsPage } = await import('@/pages/rubrics/RubricsPage')
              return { Component: RubricsPage }
            },
          },
          {
            path: '/courses/:courseId/gradebook',
            lazy: async () => {
              const { GradebookPage } = await import('@/pages/gradebook/GradebookPage')
              return { Component: GradebookPage }
            },
          },
          {
            path: '/courses/:courseId/speed-grader',
            lazy: async () => {
              const { SpeedGraderPage } = await import('@/pages/gradebook/SpeedGraderPage')
              return { Component: SpeedGraderPage }
            },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFoundPage } = await import('@/pages/NotFound')
      return { Component: NotFoundPage }
    },
  },
], {
  basename: '/app',
})
