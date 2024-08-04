"use client";

import { profileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserRole } from "@prisma/client";
import { Button, Callout, Select, Text, TextField } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { useFormMutation } from "../hooks/useMutation";
import { updateUser } from "./_actions";

export function ProfileForm({ session }: { session: Session }) {
  const { user } = session;
  const form = useForm<User>({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted, isSubmitSuccessful, isDirty },
    formState,
  } = form;

  const profileMutation = useFormMutation<any, User>(
    updateUser.bind(null, user.id),
    "/profile",
    form
  );

  function onSubmit(formUser: User) {
    reset(formUser);
    profileMutation.mutate(formUser);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-3"
    >
      {isSubmitted && !isValid && errors.root?.serverError && (
        <Callout.Root color="crimson">
          <Callout.Icon>
            <CiCircleInfo />
          </Callout.Icon>

          <Callout.Text>
            The form is not valid.{" "}
            {errors.root?.serverError &&
              `Server Error: ${errors.root?.serverError.message}`}
          </Callout.Text>
        </Callout.Root>
      )}
      {!isDirty && isSubmitSuccessful && isValid && (
        <Callout.Root color="green">
          <Callout.Icon>
            <CiCircleInfo />
          </Callout.Icon>
          <Callout.Text>Profile updated.</Callout.Text>
        </Callout.Root>
      )}
      <fieldset className="max-w-sm">
        <Text as="label">
          User Name
          <TextField.Root {...register("name")} />
        </Text>
        {errors.name && <Text color="crimson">{errors.name?.message}</Text>}
      </fieldset>
      <fieldset>
        <Text as="label">
          Image URL
          <Link
            className="text-red-300 hover:text-red-500"
            href="https://unsplash.com/s/photos/fitness"
            rel="noopener noreferrer"
            target="_blank"
          >
            {' (Only "unsplash" available)'}
          </Link>
          <TextField.Root {...register("image")} />
        </Text>
        {errors.image && <Text color="crimson">{errors.image?.message}</Text>}
      </fieldset>
      <fieldset>
        <Text as="p">Role</Text>
        <Select.Root defaultValue={UserRole.USER} value={user.role} disabled>
          <Select.Trigger />
          <Select.Content>
            {Object.values(UserRole).map((t) => (
              <Select.Item key={t} value={t}>
                {t}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </fieldset>
      <fieldset>
        <Button
          type="submit"
          disabled={profileMutation.isPending}
          loading={profileMutation.isPending}
        >
          SAVE
        </Button>
      </fieldset>
    </form>
  );
}
