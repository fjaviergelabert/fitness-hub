"use client";
import {
  MutationFunction,
  useMutation as useReactQueryMutation,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Path, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

export type TError<T> = {
  errors: string | Record<keyof T, string>;
};

function isTError<T>(value: any): value is TError<T> {
  return typeof value === "object" && "errors" in value;
}

export function useFormMutation<Return extends TError<Return>, Variables>(
  mutationFn: MutationFunction<Return, Variables>,
  routeRedirect = "/",
  form: UseFormReturn<Return>
) {
  return useMutation(mutationFn, routeRedirect, ({ errors }) => {
    if (typeof errors === "string") {
      form.setError("root.serverError", {
        type: "400",
        message: errors,
      });
    } else {
      (Object.keys(errors) as (keyof Return)[]).forEach((key) => {
        form.setError(key as Path<Return>, {
          type: "400",
          message: (errors as Record<keyof Return, string>)[key],
        });
      });
    }
  });
}

export function useToastMutation<Return extends TError<Return>, Variables>(
  mutationFn: MutationFunction<Return, Variables>,
  routeRedirect = "/"
) {
  return useMutation(
    mutationFn,
    routeRedirect,
    ({ errors }) => {
      if (typeof errors === "string") {
        toast.warning(errors, {
          theme: "colored",
        });
      } else {
        const message = "An error ocurred.";
        console.trace(message, errors);
        toast.error(message, {
          theme: "colored",
        });
      }
    },
    () => {
      toast.success("Success.", { theme: "colored" });
    }
  );
}

function useMutation<Return, Variables>(
  mutationFn: MutationFunction<Return, Variables>,
  routeRedirect = "/",
  onError: (errors: {
    errors: string | Record<keyof Return, string>;
  }) => void = () => {},
  onSuccess: () => void = () => {}
) {
  const router = useRouter();
  return useReactQueryMutation<
    Return | TError<Return>,
    TError<Return>,
    Variables
  >({
    mutationFn: (args) =>
      mutationFn(args).then((data) => {
        if (isTError<Return>(data)) {
          throw data;
        }
        return data;
      }),
    onSuccess: () => {
      onSuccess();
      router.push(routeRedirect);
      router.refresh();
    },
    onError,
  });
}
