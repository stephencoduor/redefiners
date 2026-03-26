// Pages API module
// Ported from ReDefiners/js/api.js PagesAPI class

import { apiGet } from '@/services/api-client';
import type { ApiResponse, CanvasPage } from '@/types/canvas';

type ParamValue = string | number | boolean | string[] | number[] | undefined | null;

export function listPages(
  courseId: number | string,
  params: Record<string, ParamValue> = {},
): Promise<ApiResponse<CanvasPage[]>> {
  return apiGet<CanvasPage[]>(`/v1/courses/${courseId}/pages`, {
    sort: 'title',
    ...params,
  });
}

export function getFrontPage(
  courseId: number | string,
): Promise<ApiResponse<CanvasPage>> {
  return apiGet<CanvasPage>(`/v1/courses/${courseId}/front_page`);
}

export function getPage(
  courseId: number | string,
  pageUrl: string,
): Promise<ApiResponse<CanvasPage>> {
  return apiGet<CanvasPage>(`/v1/courses/${courseId}/pages/${pageUrl}`);
}
