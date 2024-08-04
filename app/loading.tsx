import { Flex, Spinner } from "@radix-ui/themes";

function Loading() {
  return (
    <Flex height={"100%"} align={"center"} justify={"center"}>
      <Spinner size={"3"} />
    </Flex>
  );
}

export default Loading;
