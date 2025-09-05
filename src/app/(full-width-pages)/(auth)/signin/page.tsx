import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn Page | Sign In -  Dashboard Template",
  description: "This is Signin Dashboard Template",
};

export default function SignIn() {
  return <SignInForm />;
}
