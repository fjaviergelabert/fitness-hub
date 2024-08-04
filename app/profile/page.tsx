import { auth } from "@/auth";
import { Flex, Heading, Section } from "@radix-ui/themes";
import { withProtectedRoute } from "../components/Authorize/WithProtectedRoute";
import { ProfileForm } from "./ProfileForm";

async function ProfilePage() {
  const session = await auth();
  return (
    <>
      <Flex justify={"center"} asChild>
        <Heading as="h1">Profile</Heading>
      </Flex>
      <Flex asChild>
        <Section>
          <ProfileForm session={session!} />
        </Section>
      </Flex>
    </>
  );
}

export default withProtectedRoute()(ProfilePage);
