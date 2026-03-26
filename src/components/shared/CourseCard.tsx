import { Link } from 'react-router'
import type { CanvasCourse } from '@/types/canvas'

interface CourseCardProps {
  course: CanvasCourse
}

const PROGRESS_GRADIENTS = [
  'linear-gradient(90deg, #2DB88A 0%, #00D99A 100%)',
  'linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%)',
  'linear-gradient(90deg, #FF6B35 0%, #FF8A5C 100%)',
]

export function CourseCard({ course }: CourseCardProps) {
  // Find grade from student enrollment
  const studentEnrollment = course.enrollments?.find(
    (e) => e.type === 'StudentEnrollment',
  )
  const currentScore = studentEnrollment?.computed_current_score ?? null

  // Get teacher names
  const teacherNames = course.teachers?.map((t) => t.display_name).join(', ')

  // Pick a gradient based on course id
  const gradientIdx = course.id % PROGRESS_GRADIENTS.length

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group block overflow-hidden no-underline transition-all duration-300 hover:-translate-y-[3px]"
      style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #E5E7EB',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      {/* Course image */}
      <div className="relative w-full overflow-hidden" style={{ height: '150px' }}>
        <img
          src={course.image_download_url ?? `${import.meta.env.BASE_URL}Images/car1.png`}
          alt={course.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Course info */}
      <div style={{ padding: '16px' }}>
        <h5
          className="mb-1 line-clamp-2 font-semibold"
          style={{ fontSize: '16px', color: '#163B32' }}
        >
          {course.name}
        </h5>
        {course.course_code && (
          <p className="mb-0.5" style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 2px' }}>
            {course.course_code}
          </p>
        )}
        {course.term?.name && (
          <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 2px' }}>
            {course.term.name}
          </p>
        )}
        {teacherNames && (
          <p className="truncate" style={{ fontSize: '11px', color: '#9CA3AF', margin: '0 0 8px' }}>
            {teacherNames}
          </p>
        )}

        {/* Progress bar */}
        {currentScore !== null && (
          <div style={{ marginTop: '8px' }}>
            <div className="mb-1 flex items-center justify-between">
              <span style={{ fontSize: '12px', color: '#6B7280' }}>Progress</span>
              <span className="font-semibold" style={{ fontSize: '12px', color: '#163B32' }}>
                {Math.round(currentScore)}%
              </span>
            </div>
            <div
              className="w-full overflow-hidden"
              style={{ height: '6px', borderRadius: '9999px', background: '#E5E7EB' }}
            >
              <div
                className="h-full transition-all"
                style={{
                  width: `${Math.min(currentScore, 100)}%`,
                  borderRadius: '9999px',
                  background: PROGRESS_GRADIENTS[gradientIdx],
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
