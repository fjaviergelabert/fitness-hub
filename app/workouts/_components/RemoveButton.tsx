"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { MouseEventHandler } from "react";
import { ImCross } from "react-icons/im";

export function RemoveButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button type="button">
          <ImCross size={"1rem"} />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Delete action</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this item?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button onClick={onClick} variant="solid" color="red">
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
