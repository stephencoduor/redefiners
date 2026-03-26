// Quizzes API module
// Ported from ReDefiners/js/api.js QuizzesAPI class

import { apiGet } from '@/services/api-client';
import type { ApiResponse } from '@/types/canvas';

export interface CanvasQuiz {
  id: number;
  title: string;
  description: string | null;
  quiz_type: string;
  points_possible: number;
  time_limit: number | null;
  question_count: number;
  due_at: string | null;
  lock_at: string | null;
  unlock_at: string | null;
  published: boolean;
  html_url: string;
  allowed_attempts: number;
  scoring_policy: string;
  show_correct_answers: boolean;
  assignment_group_id: number | null;
}

type ParamValue = string | number | boolean | string[] | number[] | undefined | null;

export function listQuizzes(
  courseId: number | string,
  params: Record<string, ParamValue> = {},
): Promise<ApiResponse<CanvasQuiz[]>> {
  return apiGet<CanvasQuiz[]>(
    `/v1/courses/${courseId}/quizzes`,
    { per_page: 50, ...params },
  );
}

export function getQuiz(
  courseId: number | string,
  quizId: number | string,
): Promise<ApiResponse<CanvasQuiz>> {
  return apiGet<CanvasQuiz>(
    `/v1/courses/${courseId}/quizzes/${quizId}`,
  );
}
