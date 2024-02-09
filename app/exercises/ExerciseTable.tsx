import { Exercise } from "@prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { RemoveExerciseButton } from "./RemoveExerciseButton";

function ExerciseTable({ exercises }: { exercises: Exercise[] }) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell colSpan={2}>
            Description
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {exercises.map((exercise) => (
          <Table.Row className="hover:bg-slate-800" key={exercise.id}>
            <Table.RowHeaderCell>{exercise.name}</Table.RowHeaderCell>
            <Table.Cell>{exercise.description}</Table.Cell>
            <Table.Cell align="right">
              <Flex justify={"end"} gap={"3"}>
                <Button asChild>
                  <Link href={"/exercises/" + exercise.id}>Edit</Link>
                </Button>
                <RemoveExerciseButton exerciseId={exercise.id} />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default ExerciseTable;
