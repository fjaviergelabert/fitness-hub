import { UserRole } from "@prisma/client";
import { Avatar, Button, Flex, Select, Table } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { getUsers, updateRole } from "./_actions";

async function Exercises() {
  const users = await getUsers();

  if ("errors" in users) {
    redirect("/unauthorized");
  }

  return users.length === 0 ? (
    <Flex align={"center"} direction={"column"}>
      <p>No users found.</p>
    </Flex>
  ) : (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.RowHeaderCell width={"4rem"}>
              <Avatar size="3" src={user?.image!} radius="full" fallback="?" />
            </Table.RowHeaderCell>
            <Table.RowHeaderCell>{user.name}</Table.RowHeaderCell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              <Select.Root
                defaultValue={UserRole.USER}
                value={user.role}
                onValueChange={updateRole.bind(null, user.id)}
              >
                <Select.Trigger />
                <Select.Content>
                  {Object.values(UserRole).map((t) => (
                    <Select.Item key={t} value={t}>
                      {t}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Table.Cell>
            <Table.Cell align="right">
              <Flex justify={"end"} gap={"3"}>
                <Button variant="solid" color="red">
                  X
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default Exercises;
