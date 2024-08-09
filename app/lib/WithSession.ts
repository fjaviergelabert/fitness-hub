import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

interface UnauthorizedError {
  errors: string;
}

export const withSession =
  (roles: UserRole[] = []) =>
  <ActionType, Args extends unknown[]>(
    action: (...args: Args) => Promise<ActionType | UnauthorizedError>
  ) =>
  async (...args: Args) => {
    const session = await auth();

    if (!session?.user) {
      return { errors: "Unauthorized action." };
    }

    if (roles.length > 0 && !roles.includes(session?.user.role!)) {
      return {
        errors: `Unauthorized action. Roles required: "${roles.join(", ")}"`,
      };
    }

    return action(...args);
  };

export const withAdminRole = withSession(["ADMIN"]);
export const withPersonalTrainerRole = withSession([
  "ADMIN",
  "PERSONAL_TRAINER",
]);
export const withUserRole = withSession(["ADMIN", "PERSONAL_TRAINER", "USER"]);
