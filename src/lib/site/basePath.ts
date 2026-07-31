export const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";

export function withBasePath(path: string) {
  if (!path || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }

  if (siteBasePath && path.startsWith(siteBasePath)) {
    return path;
  }

  return path.startsWith("/") ? `${siteBasePath}${path}` : path;
}
