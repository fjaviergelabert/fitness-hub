import { withProtectedRoute } from "@/app/_shared/components/Authorize/WithProtectedRoute";
import { Flex, Heading, Section } from "@radix-ui/themes";
import { CreateForm } from "../../_shared/components/ExerciseForm";

async function NewExercise() {
  return (
    <>
      <Flex justify={"center"} asChild>
        <Heading as="h1">Create Exercise</Heading>
      </Flex>
      <Section>
        <CreateForm />
      </Section>
    </>
  );
}

export default withProtectedRoute(["ADMIN", "PERSONAL_TRAINER"])(NewExercise);
