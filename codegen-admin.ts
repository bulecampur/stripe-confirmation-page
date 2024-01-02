import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: ["https://vendure.warawul.coffee/admin-api"],
	documents: ['"src/providers/admin/**/*.{ts,tsx}"', '!src/generated/*'],
	generates: {
		'src/generated/graphql-admin.ts': {
			config: {
				enumsAsConst: true,
			},
			plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
		},
		'src/generated/schema-admin.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
