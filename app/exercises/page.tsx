"use client";
import { Exercise } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Exercises() {
  const exercises = useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: () => axios.get("/api/exercises").then((res) => res.data),
  });
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {exercises.data?.map((exercise) => (
          <Table.Row key={exercise.id}>
            <Table.RowHeaderCell>{exercise.name}</Table.RowHeaderCell>
            <Table.Cell>{exercise.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default Exercises;
