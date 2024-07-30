"use client";

// ? Purpose of this file: https://github.com/vercel/next.js/issues/51593#issuecomment-1600289701

import { UserRole } from "@prisma/client";
import { AuthProps, withAuthentication } from "./WithAuthorize";

type AuthenticatedComponent = {
  [key in UserRole]: React.FC<AuthProps>;
} & React.FC<AuthProps>;

export const ADMIN = withAuthentication("ADMIN");
export const PERSONAL_TRAINER = withAuthentication("PERSONAL_TRAINER");
export const USER = withAuthentication("USER");

const Authorize = withAuthentication() as AuthenticatedComponent;
export default Authorize;
