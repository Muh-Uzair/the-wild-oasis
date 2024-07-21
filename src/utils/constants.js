export const TOTAL_RESULTS_ON_PAGE = 5;

export function calculateTotalPages(totalResults) {
  return Math.ceil(totalResults / TOTAL_RESULTS_ON_PAGE);
}
