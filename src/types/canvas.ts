// Canvas LMS API TypeScript Interfaces
// Ported from ReDefiners/js/api.js

// ───────────────────────────────────────
// Enum-like Union Types
// ───────────────────────────────────────

export type EnrollmentType =
  | 'StudentEnrollment'
  | 'TeacherEnrollment'
  | 'TaEnrollment'
  | 'DesignerEnrollment'
  | 'ObserverEnrollment';

export type EnrollmentState =
  | 'active'
  | 'invited'
  | 'inactive'
  | 'completed'
  | 'rejected'
  | 'deleted';

export type WorkflowState =
  | 'unpublished'
  | 'available'
  | 'completed'
  | 'deleted';

export type SubmissionType =
  | 'online_text_entry'
  | 'online_url'
  | 'online_upload'
  | 'media_recording'
  | 'student_annotation'
  | 'discussion_topic'
  | 'online_quiz'
  | 'on_paper'
  | 'external_tool'
  | 'none';

// ───────────────────────────────────────
// Core Interfaces
// ───────────────────────────────────────

export interface CanvasGrades {
  html_url: string;
  current_grade: string | null;
  current_score: number | null;
  final_grade: string | null;
  final_score: number | null;
}

export interface CanvasEnrollment {
  id: number;
  course_id: number;
  type: EnrollmentType;
  role: string;
  enrollment_state: EnrollmentState;
  grades?: CanvasGrades;
  user_id?: number;
  course_section_id?: number;
  computed_current_score?: number | null;
  computed_final_score?: number | null;
  computed_current_grade?: string | null;
  computed_final_grade?: string | null;
}

export interface CanvasPermissions {
  can_create_announcement?: boolean;
  can_create_discussion_topic?: boolean;
  can_manage_account?: boolean;
  become_user?: boolean;
  can_update_name?: boolean;
  can_update_avatar?: boolean;
  manage_grades?: boolean;
  send_messages?: boolean;
  limit_parent_app_web_access?: boolean;
  [key: string]: boolean | undefined;
}

export interface CanvasUser {
  id: number;
  name: string;
  short_name: string;
  login_id: string;
  avatar_url: string;
  email?: string;
  locale?: string | null;
  permissions?: CanvasPermissions;
  enrollments?: CanvasEnrollment[];
  sortable_name?: string;
  bio?: string | null;
  title?: string | null;
  primary_email?: string;
  created_at?: string;
  time_zone?: string;
  effective_locale?: string;
}

export interface CanvasTerm {
  id: number;
  name: string;
  start_at: string | null;
  end_at: string | null;
}

export interface CanvasTeacher {
  id: number;
  display_name: string;
  avatar_image_url: string;
  html_url: string;
}

export interface CanvasCourse {
  id: number;
  name: string;
  course_code: string;
  workflow_state: WorkflowState;
  image_download_url?: string | null;
  term?: CanvasTerm;
  teachers?: CanvasTeacher[];
  enrollments?: CanvasEnrollment[];
  total_students?: number;
  uuid?: string;
  account_id?: number;
  start_at?: string | null;
  end_at?: string | null;
  default_view?: string;
  syllabus_body?: string | null;
  is_public?: boolean;
  time_zone?: string;
}

export interface CanvasTab {
  id: string;
  html_url: string;
  full_url: string;
  label: string;
  type: string;
  position: number;
  visibility: 'public' | 'members' | 'admins' | 'none';
  hidden?: boolean;
}

export interface CanvasCourseSettings {
  allow_student_discussion_topics: boolean;
  allow_student_forum_attachments: boolean;
  allow_student_discussion_editing: boolean;
  hide_final_grades: boolean;
  hide_distribution_graphs: boolean;
  lock_all_announcements: boolean;
  [key: string]: boolean | string | number;
}

export interface CanvasSection {
  id: number;
  name: string;
  course_id: number;
  start_at: string | null;
  end_at: string | null;
  total_students?: number;
}

export interface CanvasRubricRating {
  id: string;
  description: string;
  long_description?: string;
  points: number;
}

export interface CanvasRubricCriterion {
  id: string;
  description: string;
  long_description?: string;
  points: number;
  ratings: CanvasRubricRating[];
}

export interface CanvasSubmission {
  id: number;
  assignment_id: number;
  grade: string | null;
  score: number | null;
  submitted_at: string | null;
  workflow_state: string;
  late: boolean;
  missing: boolean;
  excused: boolean;
  submission_type: SubmissionType | null;
  attempt: number | null;
}

export interface CanvasAssignment {
  id: number;
  name: string;
  description: string | null;
  due_at: string | null;
  points_possible: number;
  submission_types: SubmissionType[];
  submission?: CanvasSubmission;
  rubric?: CanvasRubricCriterion[];
  course_id?: number;
  position?: number;
  html_url?: string;
  lock_at?: string | null;
  unlock_at?: string | null;
  has_submitted_submissions?: boolean;
  grading_type?: string;
  assignment_group_id?: number;
  published?: boolean;
}

export interface CanvasTodoItem {
  type: 'grading' | 'submitting';
  assignment: CanvasAssignment;
  context_type: 'Course' | 'Group';
  context_name: string;
  html_url: string;
  ignore?: string;
  ignore_permanently?: string;
  needs_grading_count?: number;
}

export interface CanvasCalendarEvent {
  id: number;
  title: string;
  start_at: string | null;
  end_at: string | null;
  description: string | null;
  context_code: string;
  workflow_state?: string;
  all_day?: boolean;
  all_day_date?: string | null;
  location_name?: string | null;
  location_address?: string | null;
  html_url?: string;
  url?: string;
}

export interface CanvasConversationParticipant {
  id: number;
  name: string;
  avatar_url: string;
}

export interface CanvasConversation {
  id: number;
  subject: string;
  last_message: string;
  last_message_at: string;
  message_count: number;
  participants: CanvasConversationParticipant[];
  avatar_url: string;
  workflow_state?: 'read' | 'unread' | 'archived';
  subscribed?: boolean;
  starred?: boolean;
  properties?: string[];
  audience?: number[];
}

export interface CanvasActivityStreamItem {
  id: number;
  title: string;
  message: string | null;
  type: string;
  context_type: string;
  course_id?: number;
  group_id?: number;
  created_at: string;
  updated_at: string;
  html_url: string;
}

export interface CanvasColors {
  custom_colors: Record<string, string>;
}

export interface CanvasUserSettings {
  manual_mark_as_read: boolean;
  collapse_global_nav: boolean;
  hide_dashcard_color_overlays: boolean;
  [key: string]: boolean | string | number;
}

export interface CanvasTodoCount {
  assignments_needing_submitting: number;
  assignments_needing_grading: number;
}

// ───────────────────────────────────────
// Pagination
// ───────────────────────────────────────

export interface PaginationLinks {
  current?: string;
  next?: string;
  prev?: string;
  first?: string;
  last?: string;
}

export interface ApiResponse<T> {
  data: T;
  pagination: PaginationLinks | null;
}

// ───────────────────────────────────────
// API Error
// ───────────────────────────────────────

export class ApiError extends Error {
  public readonly status: number;
  public readonly path: string;

  constructor(status: number, message: string, path: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.path = path;
  }

  get isUnauthorized(): boolean {
    return this.status === 401;
  }

  get isForbidden(): boolean {
    return this.status === 403;
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isRateLimited(): boolean {
    return this.status === 403 && this.message.includes('rate');
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }
}
