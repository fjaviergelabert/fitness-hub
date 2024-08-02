import { Section } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";
import ExerciseTableSkeleton from "./ExerciseTableSkeleton";
import { ExercisesHeading } from "./ExercisesHeading";

function Loading() {
  return (
    <>
      <ExercisesHeading />
      <Section>
        <ExerciseTableSkeleton />
      </Section>
    </>
  );
}

export default Loading;
