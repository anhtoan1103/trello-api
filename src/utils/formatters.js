// convert string to slug
export const slugify = (val) => {
  if (!val) return 'heh'
  return String(val)
    .normalize('NFKD') // normalize some special character such as: à, è, ì, ò, ù, À, È, Ì,...
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}