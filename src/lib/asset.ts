/** Resolves a /public path against the deployment base path (works on GitHub Pages sub-paths). */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

/** Applies `asset()` to every URL in a srcset string. */
export function assetSrcSet(srcSet: string): string {
  return srcSet
    .split(',')
    .map((entry) => {
      const [url, ...descriptor] = entry.trim().split(/\s+/);
      return [asset(url), ...descriptor].join(' ');
    })
    .join(', ');
}

/** True when a configurable value (URL, email) has been filled in. */
export function isSet(value: string | undefined | null): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
