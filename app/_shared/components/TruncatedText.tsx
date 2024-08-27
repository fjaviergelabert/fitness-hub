import { Text, Tooltip } from "@radix-ui/themes";
import { Responsive } from "@radix-ui/themes/props";
import { PropsWithChildren } from "react";

export function TruncatedText({
  children,
  weight,
}: PropsWithChildren<{
  weight?: Responsive<"bold" | "light" | "regular" | "medium"> | undefined;
}>) {
  return (
    <Tooltip content={children}>
      <Text as="p" color="gray" size="2" weight={weight} truncate>
        {children}
      </Text>
    </Tooltip>
  );
}
