/**
 * lint-staged configuration.
 *
 * This file tells lint-staged how to handle staged files prior to committing.
 */
module.exports = {
  '**/*.{js,ts,jsx,tsx}': filenames => [
    `eslint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`,
  ],
  '**/*.{md,json,yaml,yml}': filenames => [
    `prettier --write ${filenames.join(' ')}`,
  ],
};
