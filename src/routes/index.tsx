import { createBrowserRouter, Navigate, Outlet } from 'react-router'
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
  // Public pages accessible without authentication
  {
    element: <Outlet />,
    children: [
      {
        path: '/accessibility',
        lazy: async () => {
          const { AccessibilityPage } = await import('@/pages/utility/AccessibilityPage')
          return { Component: AccessibilityPage }
        },
      },
      {
        path: '/terms',
        lazy: async () => {
          const { TermsOfServicePage } = await import('@/pages/utility/TermsOfServicePage')
          return { Component: TermsOfServicePage }
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
            path: '/courses/:courseId/assignments/new',
            lazy: async () => {
              const { AssignmentEditPage } = await import('@/pages/assignments/AssignmentEditPage')
              return { Component: AssignmentEditPage }
            },
          },
          {
            path: '/courses/:courseId/assignments/:assignmentId/edit',
            lazy: async () => {
              const { AssignmentEditPage } = await import('@/pages/assignments/AssignmentEditPage')
              return { Component: AssignmentEditPage }
            },
          },
          {
            path: '/courses/:courseId/assignments/:assignmentId/submit',
            lazy: async () => {
              const { SubmitAssignmentPage } = await import('@/pages/assignments/SubmitAssignmentPage')
              return { Component: SubmitAssignmentPage }
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
            path: '/courses/:courseId/pages/new',
            lazy: async () => {
              const { WikiPageEditPage } = await import('@/pages/pages/WikiPageEditPage')
              return { Component: WikiPageEditPage }
            },
          },
          {
            path: '/courses/:courseId/pages/:pageUrl/edit',
            lazy: async () => {
              const { WikiPageEditPage } = await import('@/pages/pages/WikiPageEditPage')
              return { Component: WikiPageEditPage }
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
            path: '/courses/:courseId/discussions/new',
            lazy: async () => {
              const { DiscussionEditPage } = await import('@/pages/discussions/DiscussionEditPage')
              return { Component: DiscussionEditPage }
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
            path: '/courses/:courseId/quizzes/:quizId',
            lazy: async () => {
              const { QuizShowPage } = await import('@/pages/quizzes/QuizShowPage')
              return { Component: QuizShowPage }
            },
          },
          {
            path: '/courses/:courseId/quizzes/:quizId/take',
            lazy: async () => {
              const { QuizTakePage } = await import('@/pages/quizzes/QuizTakePage')
              return { Component: QuizTakePage }
            },
          },
          {
            path: '/courses/:courseId/quizzes/:quizId/results',
            lazy: async () => {
              const { QuizResultsPage } = await import('@/pages/quizzes/QuizResultsPage')
              return { Component: QuizResultsPage }
            },
          },
          {
            path: '/courses/:courseId/quizzes/:quizId/statistics',
            lazy: async () => {
              const { QuizStatisticsPage } = await import('@/pages/quizzes/QuizStatisticsPage')
              return { Component: QuizStatisticsPage }
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
            path: '/courses/:courseId/collaborations',
            lazy: async () => {
              const { CollaborationsPage } = await import('@/pages/services/CollaborationsPage')
              return { Component: CollaborationsPage }
            },
          },
          {
            path: '/courses/:courseId/content-migrations',
            lazy: async () => {
              const { ContentMigrationsPage } = await import('@/pages/services/ContentMigrationsPage')
              return { Component: ContentMigrationsPage }
            },
          },
          {
            path: '/courses/:courseId/paces',
            lazy: async () => {
              const { CoursePacesPage } = await import('@/pages/courses/CoursePacesPage')
              return { Component: CoursePacesPage }
            },
          },
          {
            path: '/courses/:courseId/copy',
            lazy: async () => {
              const { CourseCopyPage } = await import('@/pages/courses/CourseCopyPage')
              return { Component: CourseCopyPage }
            },
          },
          {
            path: '/courses/:courseId/announcements',
            lazy: async () => {
              const { CourseAnnouncementsPage } = await import('@/pages/courses/CourseAnnouncementsPage')
              return { Component: CourseAnnouncementsPage }
            },
          },
          {
            path: '/courses/:courseId/analytics',
            lazy: async () => {
              const { AnalyticsPage } = await import('@/pages/analytics/AnalyticsPage')
              return { Component: AnalyticsPage }
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
            path: '/notifications',
            lazy: async () => {
              const { NotificationsPage } = await import('@/pages/services/NotificationsPage')
              return { Component: NotificationsPage }
            },
          },
          {
            path: '/search',
            lazy: async () => {
              const { SearchPage } = await import('@/pages/services/SearchPage')
              return { Component: SearchPage }
            },
          },
          {
            path: '/all-courses',
            lazy: async () => {
              const { AllCoursesPage } = await import('@/pages/courses/AllCoursesPage')
              return { Component: AllCoursesPage }
            },
          },
          {
            path: '/change-password',
            lazy: async () => {
              const { ChangePasswordPage } = await import('@/pages/services/ChangePasswordPage')
              return { Component: ChangePasswordPage }
            },
          },
          {
            path: '/help',
            lazy: async () => {
              const { HelpCenterPage } = await import('@/pages/utility/HelpCenterPage')
              return { Component: HelpCenterPage }
            },
          },
          {
            path: '/student-analytics',
            lazy: async () => {
              const { StudentAnalyticsPage } = await import('@/pages/analytics/StudentAnalyticsPage')
              return { Component: StudentAnalyticsPage }
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
          {
            path: '/courses/:courseId/assignments/:assignmentId/peer-reviews',
            lazy: async () => {
              const { PeerReviewsPage } = await import('@/pages/assignments/PeerReviewsPage')
              return { Component: PeerReviewsPage }
            },
          },
          {
            path: '/calendar/appointments/new',
            lazy: async () => {
              const { AppointmentGroupPage } = await import('@/pages/calendar/AppointmentGroupPage')
              return { Component: AppointmentGroupPage }
            },
          },
          {
            path: '/admin/blueprint-courses',
            lazy: async () => {
              const { BlueprintCoursesPage } = await import('@/pages/courses/BlueprintCoursesPage')
              return { Component: BlueprintCoursesPage }
            },
          },
          {
            path: '/courses/:courseId/content-sharing',
            lazy: async () => {
              const { ContentSharingPage } = await import('@/pages/courses/ContentSharingPage')
              return { Component: ContentSharingPage }
            },
          },
          {
            path: '/courses/:courseId/exports',
            lazy: async () => {
              const { ContentExportsPage } = await import('@/pages/courses/ContentExportsPage')
              return { Component: ContentExportsPage }
            },
          },
          {
            path: '/courses/:courseId/link-validator',
            lazy: async () => {
              const { LinkValidatorPage } = await import('@/pages/courses/LinkValidatorPage')
              return { Component: LinkValidatorPage }
            },
          },
          {
            path: '/courses/:courseId/statistics',
            lazy: async () => {
              const { CourseStatisticsPage } = await import('@/pages/courses/CourseStatisticsPage')
              return { Component: CourseStatisticsPage }
            },
          },
          {
            path: '/courses/new',
            lazy: async () => {
              const { CourseWizardPage } = await import('@/pages/courses/CourseWizardPage')
              return { Component: CourseWizardPage }
            },
          },
          {
            path: '/courses/:courseId/grades/summary',
            lazy: async () => {
              const { GradeSummaryPage } = await import('@/pages/grades/GradeSummaryPage')
              return { Component: GradeSummaryPage }
            },
          },
          {
            path: '/courses/:courseId/gradebook/history',
            lazy: async () => {
              const { GradebookHistoryPage } = await import('@/pages/gradebook/GradebookHistoryPage')
              return { Component: GradebookHistoryPage }
            },
          },
          {
            path: '/courses/:courseId/gradebook/upload',
            lazy: async () => {
              const { GradebookUploadsPage } = await import('@/pages/gradebook/GradebookUploadsPage')
              return { Component: GradebookUploadsPage }
            },
          },
          {
            path: '/courses/:courseId/question-banks',
            lazy: async () => {
              const { QuestionBanksPage } = await import('@/pages/quizzes/QuestionBanksPage')
              return { Component: QuestionBanksPage }
            },
          },
          {
            path: '/courses/:courseId/rubrics/:rubricId/assess',
            lazy: async () => {
              const { RubricAssessmentPage } = await import('@/pages/rubrics/RubricAssessmentPage')
              return { Component: RubricAssessmentPage }
            },
          },
          {
            path: '/admin/sis-import',
            lazy: async () => {
              const { SisImportPage } = await import('@/pages/admin/SisImportPage')
              return { Component: SisImportPage }
            },
          },
          {
            path: '/admin/sub-accounts',
            lazy: async () => {
              const { SubAccountsPage } = await import('@/pages/admin/SubAccountsPage')
              return { Component: SubAccountsPage }
            },
          },
          {
            path: '/users/grades',
            lazy: async () => {
              const { UserGradesPage } = await import('@/pages/grades/UserGradesPage')
              return { Component: UserGradesPage }
            },
          },
          {
            path: '/admin/users/:userId/logins',
            lazy: async () => {
              const { UserLoginsPage } = await import('@/pages/admin/UserLoginsPage')
              return { Component: UserLoginsPage }
            },
          },
          {
            path: '/settings/observees',
            lazy: async () => {
              const { ObserveesPage } = await import('@/pages/settings/ObserveesPage')
              return { Component: ObserveesPage }
            },
          },
          {
            path: '/users/outcomes',
            lazy: async () => {
              const { UserOutcomeResultsPage } = await import('@/pages/outcomes/UserOutcomeResultsPage')
              return { Component: UserOutcomeResultsPage }
            },
          },
          {
            path: '/courses/:courseId/notification-settings',
            lazy: async () => {
              const { CourseNotificationSettingsPage } = await import('@/pages/courses/CourseNotificationSettingsPage')
              return { Component: CourseNotificationSettingsPage }
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
