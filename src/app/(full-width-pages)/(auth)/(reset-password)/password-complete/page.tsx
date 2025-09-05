import PasswordCompleteForm from "@/components/auth/PasswordCompleteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password Success Page | Sign In - Dashboard Template",
  description: "This is Forget Password Success Page  Dashboard Template",
  // other metadata
};

export default function ChangePassword() {
  return <PasswordCompleteForm />;
}
