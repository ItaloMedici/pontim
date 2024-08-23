import { useState } from "react";

type ApiMutationFunction<T, K> = (payload: T) => Promise<K>;

export const useAction = <T, K>(
  mutationFunction: ApiMutationFunction<T, K>,
) => {
  const [isPending, setIsPending] = useState(false);

  const mutation = async (payload: T) => {
    setIsPending(true);

    return mutationFunction(payload)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return {
    mutation,
    isPending,
  };
};
