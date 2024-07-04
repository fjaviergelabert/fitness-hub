"use client";
import {
  MutationFunction,
  useMutation as useReactQueryMutation,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

type TError<T> = {
  errors: string | Record<keyof T, string>;
};

export function useFormMutation<T extends FieldValues>(
  mutationFn: MutationFunction<T, T>,
  routeRedirect = "/",
  form: UseFormReturn<T>
) {
  return useMutation(mutationFn, routeRedirect, (errors) => {
    if (typeof errors === "string") {
      form.setError("root.serverError", {
        type: "400",
        message: errors,
      });
    } else {
      (Object.keys(errors) as (keyof T)[]).forEach((key) => {
        form.setError(key as Path<T>, {
          type: "400",
          message: (errors as Record<keyof T, string>)[key],
        });
      });
    }
  });
}

// TODO: Decouple error handling logic
export function useMutation<T extends FieldValues>(
  mutationFn: MutationFunction<T, T>,
  routeRedirect = "/",
  onError: (error: TError<T>) => void = () => {}
) {
  const router = useRouter();
  return useReactQueryMutation({
    mutationFn: (args: T) =>
      mutationFn(args)
        .then((data: T) => {
          if (data.errors) {
            onError(data.errors);
            throw new Error(
              typeof data.errors === "string" ? data.errors : "Validation error"
            );
          }
          return data;
        })
        .catch((e: AxiosError) => {
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
