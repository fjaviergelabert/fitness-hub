import { withProtectedRoute } from "@/app/components/Authorize/WithProtectedRoute";
import { Heading } from "@radix-ui/themes";
import { CreateForm } from "../../components/ExerciseForm";

async function NewExercise() {
  return (
    <>
      <Heading as="h1">Create Exercise</Heading>
      <CreateForm />
    </>
  );
}

export default withProtectedRoute(["ADMIN", "PERSONAL_TRAINER"])(NewExercise);
