import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useCourses } from '@/hooks/useCourses'
import { CourseCard } from '@/components/shared/CourseCard'
import { TodoItem } from '@/components/shared/TodoItem'
import { EmptyState } from '@/components/common/EmptyState'
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'
import { BookOpen, ClipboardList } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/services/api-client'
import type { CanvasTodoItem } from '@/types/canvas'

function useTodoItems() {
  return useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      const response = await apiGet<CanvasTodoItem[]>('/v1/users/self/todo')
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}

export function DashboardPage() {
  const { data: user, isLoading: userLoading } = useCurrentUser()
  const { data: courses, isLoading: coursesLoading } = useCourses()
  const { data: todoItems, isLoading: todosLoading } = useTodoItems()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {userLoading ? (
            <LoadingSkeleton type="text" count={1} />
          ) : (
            <h3 className="text-2xl font-bold text-primary-800">
              Welcome, {user?.short_name ?? 'Student'}!
            </h3>
          )}
        </div>
      </div>

      {/* Course Cards Grid */}
      <section>
        <h4 className="mb-4 text-lg font-semibold text-neutral-700">
          My Courses
        </h4>
        {coursesLoading ? (
          <LoadingSkeleton type="card" count={3} />
        ) : !courses || courses.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            heading="No courses found"
            description="You are not enrolled in any courses yet."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Todo List Section */}
      <section>
        <h4 className="mb-4 text-lg font-semibold text-neutral-700">To-Do</h4>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          {todosLoading ? (
            <LoadingSkeleton type="row" count={4} />
          ) : !todoItems || todoItems.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              heading="All caught up!"
              description="Nothing to do right now."
            />
          ) : (
            <div>
              {todoItems.slice(0, 8).map((item, idx) => (
                <TodoItem key={`${item.assignment?.id ?? idx}`} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
