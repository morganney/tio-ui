const path = require('path');

const config = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true
    },
    globals: {
        "ENV": false,
        "API_PREFIX": false,
        "LOG_LEVEL": false,
        "CONFIGURED_APPS": false,
        "RUN_MOCK": false,
        "browser": false,
        "telemetry": false
    },
    extends: [
        'eslint:recommended',
        'standard',
        'plugin:fsa/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors'
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: [
        'filenames',
        'fsa',
        'import',
        'react',
        'jsx-a11y'
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        alias: {
                            i18n: path.resolve(__dirname, 'deps/alloy/i18n'),
                            build: path.resolve(__dirname, 'deps/alloy/build'),
                            schedule: path.resolve(__dirname, 'deps/common/src/schedule'),
                            validation: path.resolve(__dirname, 'deps/common/src/validation'),
                            'tio-scans': path.resolve(__dirname, 'apps/scans/src'),
                            'tio-container-security': path.resolve(__dirname, 'apps/container-security/src'),
                            'tio-dashboards': path.resolve(__dirname, 'apps/dashboards/src'),
                            'tio-settings': path.resolve(__dirname, 'apps/settings/src'),
                            'tio-vm': path.resolve(__dirname, 'apps/vulnerability-management/src'),
                            'tio-lumin': path.resolve(__dirname, 'apps/lumin/src'),
                            'tio-app': path.resolve(__dirname, 'apps/tenableio/src')
                        }
                    }
                }
            }
        }
    },
    rules: {
        'react/sort-comp': 'error',
        'filenames/match-regex': [
            'error',
            // matches foo-bar.js || foo.bar.js
            '^[a-z]+([a-z-.]+)*$'
        ],
        'id-match': [
            'error',
            '^[_A-Za-z]+(\\w)*|\\$$|\\$ref',
            {properties: true}
        ],
        'handle-callback-err': [
            'error',
            '^(err|error)$'
        ],
        'arrow-body-style': [
            'error',
            'always'
        ],
        'no-confusing-arrow': [
            'error',
            {allowParens: false}
        ],
        'no-duplicate-imports': [
            'error',
            {includeExports: true}
        ],
        'generator-star-spacing': [
            'error',
            { before: true, after: false }
        ],
        'yield-star-spacing': [
            'error',
            'before'
        ],
        'semi': [
            'error',
            'always'
        ],
        'indent': [
            'error',
            4,
            {SwitchCase: 1}
        ],
        'no-redeclare': [
            'error',
            {builtinGlobals: true}
        ],
        'no-trailing-spaces': [
            'error',
            {skipBlankLines: true}
        ],
        'no-unused-vars': [
            'error',
            {vars: 'all', args: 'after-used'}
        ],
        'quotes': [
            'error',
            'single',
            // for multi-line strings
            {allowTemplateLiterals: true}
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-before-function-paren': [
            'error',
            'always'
        ],
        'arrow-spacing': [
            'error',
            {before: true, after: true}
        ],
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        // Turn off standard even spacing, object-curly-spacing will cover that area
        'standard/object-curly-even-spacing': 'off',
        'one-var-declaration-per-line': [
            'error',
            'always'
        ],
        'padded-blocks': [
            'error',
            {classes: 'never', blocks: 'never', switches: 'never'}
        ],
        'max-depth': [
            'error',
            {max: 4}
        ],
        'max-params': [
            'error',
            {max: 3}
        ],
        'max-nested-callbacks': [
            'error',
            {max: 4}
        ],
        'complexity': [
            'error',
            20
        ],
        'max-statements': [
            'error',
            30
        ],
        'max-len': [
            'error',
            120,
            {
                ignoreComments: true,
                ignoreUrls: true
            }
        ],
        'object-shorthand': [
            'error',
            'always'
        ],
        'jsx-quotes': [
            'error',
            'prefer-single'
        ],
        'no-magic-numbers': [
            'error',
            {
                ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 1000],
                ignoreArrayIndexes: true
            }
        ],
        'import/newline-after-import': [
            'error',
            {count: 1}
        ],
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'index',
                    'sibling',
                    'parent'
                ],
                'newlines-between': 'always'
            }
        ],
        'no-underscore-dangle': [
            'error',
            {
                allow: [
                    '_error', // used by redux-form
                    '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
                ]
            }
        ],
        'no-eval': [
            'error',
            {
                allowIndirect: true
            }
        ],
        'no-else-return': 'error',
        'no-inline-comments': 'error',
        'no-lonely-if': 'error',
        'no-nested-ternary': 'error',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'no-empty-function': 'error',
        'dot-notation': 'error',
        'no-eq-null': 'error',
        'no-extra-label': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-script-url': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unused-labels': 'error',
        'no-useless-concat': 'error',
        'prefer-template': 'error',
        'no-use-before-define': 'error',
        'block-scoped-var': 'error',
        'key-spacing': 'error',
        'no-void': 'error',
        'curly': 'error',
        'new-parens': 'error',
        'camelcase': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'for-direction': 'error',
        'no-await-in-loop': 'error',
        'no-template-curly-in-string': 'error',
        'array-callback-return': 'error',
        'no-multiple-empty-lines': 'error',
        'no-trailing-spaces': 'error',
        'no-useless-rename': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-var': 'error',
        'template-curly-spacing': 'error',
        'brace-style': 'error',
        'comma-dangle': 'error',
        'eol-last': 'error',
        'no-path-concat': 'error',
        'callback-return': 'error',
        'vars-on-top': 'error',
        'yoda': 'error',
        'wrap-iife': 'error',
        'require-await': 'error',
        'no-useless-return': 'error',
        'no-unused-expressions': 'error',
        'no-return-await': 'error',
        'no-useless-concat': 'error',
        'no-return-assign': 'error',
        'no-param-reassign': 'error',
        'no-multi-spaces': 'error',
        'no-loop-func': 'warn',
        'no-implied-eval': 'error',
        'eqeqeq': 'error',
        'prefer-promise-reject-errors': 'error',
        'init-declarations': 'error',
        'no-shadow': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'error',
        'prefer-const': 'error',
        'newline-before-return': 'error',
    }
};

if (process.platform === 'win32') {
	config.rules['linebreak-style'] = ['error', 'windows'];
}

module.exports = config;
