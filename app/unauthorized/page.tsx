import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

export default async function UnauthorizedPage() {
  return (
    <Flex gap={"3"} direction={"column"} align={"center"}>
      <Text className="animate-pulse" color="red">
        Unauthorized access, please, talk to your administrator.
      </Text>
      <Image
        src={"/police-officer.avif"}
        width={300}
        height={300}
        alt="unauthorized access"
      />
    </Flex>
  );
}
