/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': null
  },
  ignoreFiles: ['./src/assets/css/reset.css']
}
