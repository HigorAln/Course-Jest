/* eslint-disable import/no-anonymous-default-export */
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	clearMocks: true,
	collectCoverageFrom: [
		'<rootDir>/src/components/**/*.tsx',
		'<rootDir>/src/pages/**/*.tsx',
		'<rootDir>/src/hooks/**/*.tsx',
		'!<rootDir>/src/pages/_app.tsx',
		'<rootDir>/store/**/*.ts',
	],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
	transform: {
		'^.+\\.(t|j)sx?$': [
			'@swc/jest',
			{
				jsc: {
					parser: {
						syntax: 'typescript',
						tsx: true,
						decorators: true,
					},
					keepClassNames: true,
					transform: {
						legacyDecorator: true,
						decoratorMetadata: true,
						react: {
							runtime: 'automatic',
						},
					},
				},
				module: {
					type: 'es6',
					noInterop: false,
				},
			},
		],
	},
};
