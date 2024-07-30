"use client";

import { Authenticated as Auth, withRole } from "./WithRole";

// ? Purpose of this file: https://github.com/vercel/next.js/issues/51593#issuecomment-1600289701

export const Authenticated = Auth;
export const ADMIN = withRole("ADMIN");
export const PERSONAL_TRAINER = withRole("PERSONAL_TRAINER");
export const USER = withRole("USER");
