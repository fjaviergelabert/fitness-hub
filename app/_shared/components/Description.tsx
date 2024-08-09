import { Text, Tooltip } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export function Description({ children }: PropsWithChildren) {
  return (
    <Tooltip content={children}>
      <Text as="p" color="gray" size="2" truncate>
        {children}
      </Text>
    </Tooltip>
  );
}
