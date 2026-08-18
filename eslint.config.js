import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['**/dist/', '**/node_modules/', '**/.expo/'] },
	js.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	// Config files here are plain JS and sit outside every tsconfig, so the
	// type-aware rules have no type information to work with.
	{ files: ['**/*.js', '**/*.mjs'], ...tseslint.configs.disableTypeChecked },
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@stylistic': stylistic,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			// TS-aware stylistic rules (@stylistic replaces the deprecated,
			// TS-ignorant core rules of the same names).
			'@stylistic/arrow-spacing': ['warn', { before: true, after: true }],
			'@stylistic/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
			'@stylistic/comma-dangle': ['error', 'always-multiline'],
			'@stylistic/comma-spacing': 'error',
			'@stylistic/comma-style': 'error',
			'@stylistic/dot-location': ['error', 'property'],
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/keyword-spacing': 'error',
			'@stylistic/max-statements-per-line': ['error', { max: 2 }],
			'@stylistic/no-floating-decimal': 'error',
			'@stylistic/no-multi-spaces': 'error',
			'@stylistic/no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
			'@stylistic/no-trailing-spaces': ['error'],
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/quotes': ['error', 'double'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/space-before-blocks': 'error',
			'@stylistic/space-before-function-paren': [
				'error',
				{
					anonymous: 'never',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			'@stylistic/space-in-parens': 'error',
			'@stylistic/space-infix-ops': 'error',
			'@stylistic/space-unary-ops': 'error',
			'@stylistic/spaced-comment': 'error',

			// Logic/correctness rules (core, or the TS extension where one exists).
			curly: ['error', 'multi-line', 'consistent'],
			'max-nested-callbacks': ['error', { max: 4 }],
			'no-console': 'off',
			'no-empty-function': 'off',
			'@typescript-eslint/no-empty-function': 'error',
			'no-inline-comments': 'error',
			'no-lonely-if': 'error',
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
			'no-var': 'error',
			'no-undef': 'off',
			'prefer-const': 'error',
			yoda: 'error',
		},
	},
);
