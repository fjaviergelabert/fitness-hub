"use client";
import { Button } from "@radix-ui/themes";
import { ImCross } from "react-icons/im";

export function RemoveExerciseButton({ onClick }: { onClick: () => any }) {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <ImCross size={"1rem"} />
    </Button>
  );
}
