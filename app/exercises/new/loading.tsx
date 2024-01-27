import { Heading } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loading() {
  return (
    <>
      <Heading as="h1">Create Exercise</Heading>
      <form className="flex flex-col gap-3 max-w-screen-lg">
        <fieldset className="max-w-sm">
          <Skeleton />
          <Skeleton />
        </fieldset>
        <fieldset>
          <Skeleton />
          <Skeleton />
        </fieldset>
        <Skeleton />
      </form>
    </>
  );
}

export default Loading;
