export const TOTAL_RESULTS_ON_PAGE = 10;

export function calculateTotalPages(totalResults) {
  return Math.ceil(totalResults / TOTAL_RESULTS_ON_PAGE);
}
