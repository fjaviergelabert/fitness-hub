import { withProtectedRoute } from "../_shared/components/Authorize/WithProtectedRoute";

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export default withProtectedRoute(["ADMIN"])(RootLayout);
