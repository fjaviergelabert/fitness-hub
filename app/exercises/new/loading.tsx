import { Heading } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";
import { FormSkeleton } from "../components/FormSkeleton";

export default function Loading() {
  return (
    <>
      <Heading as="h1">Create Exercise</Heading>
      <FormSkeleton />
    </>
  );
}
