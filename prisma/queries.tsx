import prisma from "@/prisma/client";

export async function getWorkout(id: number) {
  return await prisma.block.findUnique({
    where: { id: id },
    include: {
      exercises: {
        orderBy: {
          orderId: "asc",
        },
        include: {
          exercise: true,
        },
      },
    },
  });
}
