import { withProtectedRoute } from "../components/Authorize/WithProtectedRoute";

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export default withProtectedRoute(["ADMIN"])(RootLayout);
