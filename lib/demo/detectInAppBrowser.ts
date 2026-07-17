/** Common in-app WebViews where getUserMedia / autoplay often fail. */
export function isInAppBrowser(ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''): boolean {
  const value = ua.toLowerCase();
  return (
    value.includes('fbav') ||
    value.includes('fban') ||
    value.includes('fb_iab') ||
    value.includes('instagram') ||
    value.includes('line/') ||
    value.includes('tiktok') ||
    value.includes('; wv)') ||
    (value.includes('android') && value.includes('version/') && value.includes('chrome/') && !value.includes('mobile safari'))
  );
}
