/**
 * Preserve session when navigating between platform routes.
 */
export function withSessionQuery(
  path: string,
  sessionId: string | null | undefined
): string {
  if (!sessionId) return path;
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}session_id=${encodeURIComponent(sessionId)}`;
}
