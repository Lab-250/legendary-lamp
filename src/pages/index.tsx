import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import SignIn from "@/components/SignIn";

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace("/dashboard");
  }
  return <SignIn />;
}
