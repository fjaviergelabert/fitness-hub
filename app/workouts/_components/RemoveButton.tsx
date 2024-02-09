"use client";
import { Button } from "@radix-ui/themes";
import { ImCross } from "react-icons/im";

export function RemoveButton({ onClick }: any & { onClick: () => any }) {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      asChild
    >
      <span className="cursor-pointer">
        <ImCross size={"1rem"} />
      </span>
    </Button>
  );
}
