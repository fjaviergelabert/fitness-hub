import { Exercise } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";

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
              <Link href={"/exercises/" + exercise.id}>
                <Button>Edit</Button>
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default ExerciseTable;
