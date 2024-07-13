import type { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";

// Split config file for Edge Compatibility
// ? Source: https://authjs.dev/guides/edge-compatibility#split-config
export default {
  providers: [Resend({ from: "onboarding@resend.dev" })],
} satisfies NextAuthConfig;
