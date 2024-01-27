import { Exercise } from "@prisma/client";
import { Table } from "@radix-ui/themes";

function ExerciseTable({ exercises }: { exercises: Exercise[] }) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {exercises.map((exercise) => (
          <Table.Row key={exercise.id}>
            <Table.RowHeaderCell>{exercise.name}</Table.RowHeaderCell>
            <Table.Cell>{exercise.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default ExerciseTable;
