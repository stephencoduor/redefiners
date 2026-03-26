import { Link } from 'react-router'
import type { CanvasCourse } from '@/types/canvas'

interface CourseCardProps {
  course: CanvasCourse
}

export function CourseCard({ course }: CourseCardProps) {
  // Find grade from student enrollment
  const studentEnrollment = course.enrollments?.find(
    (e) => e.type === 'StudentEnrollment',
  )
  const currentScore = studentEnrollment?.computed_current_score ?? null

  // Get teacher names
  const teacherNames = course.teachers?.map((t) => t.display_name).join(', ')

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group block rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Course image */}
      <div className="relative h-[150px] w-full overflow-hidden rounded-t-lg">
        <img
          src={course.image_download_url ?? '/Images/car1.png'}
          alt={course.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Course info */}
      <div className="p-4">
        <h5 className="mb-1 line-clamp-2 text-sm font-bold text-neutral-800">
          {course.name}
        </h5>
        {course.course_code && (
          <p className="mb-0.5 text-xs text-neutral-500">{course.course_code}</p>
        )}
        {course.term?.name && (
          <p className="mb-0.5 text-[11px] text-neutral-400">{course.term.name}</p>
        )}
        {teacherNames && (
          <p className="mb-2 truncate text-[11px] text-neutral-400">
            {teacherNames}
          </p>
        )}

        {/* Progress bar */}
        {currentScore !== null && (
          <div className="mt-2">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-neutral-500">Progress</span>
              <span className="font-semibold text-primary-700">
                {Math.round(currentScore)}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-primary-500 transition-all"
                style={{ width: `${Math.min(currentScore, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
