import { ZodRawShape, z } from "zod";

type ValidatorProps<T extends ZodRawShape, K> = {
  input: z.ZodObject<T>;
  handler: (data: z.infer<z.ZodObject<T>>) => Promise<K>;
};

export function validator<T extends ZodRawShape, K>({
  input,
  handler,
}: ValidatorProps<T, K>) {
  return async function (data: z.infer<typeof input>) {
    const parse = input.safeParse(data);

    if (!parse.success) {
      throw new Error(parse.error.message);
    }

    return handler(parse.data);
  };
}
