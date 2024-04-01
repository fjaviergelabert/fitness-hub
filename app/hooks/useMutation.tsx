"use client";
import {
  MutationFunction,
  useMutation as useReactQueryMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useMutation<T>(
  mutationFn: MutationFunction<T, T>,
  routeRedirect = "/"
) {
  const router = useRouter();
  return useReactQueryMutation({
    mutationFn: (args: T) =>
      mutationFn(args).catch((e: AxiosError) => {
        throw e;
      }),
    onError: async (e: AxiosError<{ error: string }>) => {
      if ((e.status = 400)) {
        toast.warning(e.response?.data.error, {
          theme: "colored",
        });
      } else {
        toast.error("An error ocurred.", {
          theme: "colored",
        });
      }
    },
    onSuccess: async () => {
      toast.success("Success.", { theme: "colored" });
      router.push(routeRedirect);
      router.refresh();
    },
  });
}
