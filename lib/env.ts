/** Optional: signup app base URL (links back from platform). */
export function getOptionalPublicSignupUrl(): string | undefined {
  const v = process.env.NEXT_PUBLIC_SIGNUP_URL?.trim();
  return v || undefined;
}
