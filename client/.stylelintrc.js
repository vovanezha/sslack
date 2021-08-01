module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  rules: {
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': null,
  },
};
