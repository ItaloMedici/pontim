import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { useState } from "react";

export const useApiMutation = <Mutation extends FunctionReference<"mutation">>(
  mutationFunction: Mutation
) => {
  const [isPending, setIsPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutation = async (payload: Mutation["_args"]) => {
    setIsPending(true);

    return apiMutation(payload)
      .finally(() => {
        setIsPending(false);
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  return {
    mutation,
    isPending,
  };
};
