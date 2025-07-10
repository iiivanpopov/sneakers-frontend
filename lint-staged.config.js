export default {
  '*.css': ['bun lint:style'],
  '*.{js,ts,jsx,tsx,json,css,md}': ['bun format', 'bun lint']
}
