import Skeleton from "react-loading-skeleton";

export function FormSkeleton() {
  return (
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
  );
}
