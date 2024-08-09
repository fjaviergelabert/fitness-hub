"use client";

import { withRole } from "./WithRole";

// ? Purpose of this file: https://github.com/vercel/next.js/issues/51593#issuecomment-1600289701

export const ADMIN = withRole(["ADMIN"]);
export const PERSONAL_TRAINER = withRole(["ADMIN", "PERSONAL_TRAINER"]);
export const USER = withRole(["ADMIN", "PERSONAL_TRAINER", "USER"]);
