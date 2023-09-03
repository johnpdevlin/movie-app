/** @format */
// .eslintrc.ts
import { Linter } from 'eslint';

const config: Linter.Config = {
	env: {
		browser: true,
		esNext: true,
	},
	extends: 'standard-with-typescript',
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {},
};

export default config;
