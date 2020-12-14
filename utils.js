export function getHostName(url) {
  const urlStart = url.includes('//www.') ? '//www.' : '//';
  return url.substring(url.indexOf(urlStart) + urlStart.length).split('/')[0];
}