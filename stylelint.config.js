/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'no-empty-source': null
  },
  ignoreFiles: ['./src/assets/css/reset.css']
}
