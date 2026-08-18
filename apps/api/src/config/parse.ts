import { prettifyError, type z } from "zod";

export function parseConfig<T extends z.ZodType>(name: string, schema: T, source: unknown): z.infer<T> {
	const result = schema.safeParse(source);
	if (!result.success) {
		throw new Error(`Invalid ${name} configuration:\n${prettifyError(result.error)}`);
	}
	return result.data;
}
