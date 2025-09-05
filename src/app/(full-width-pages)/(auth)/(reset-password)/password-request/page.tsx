import PasswordRequestForm from "@/components/auth/PasswordRequestForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password Page | Sign In - Dashboard Template",
  description: "This is Forget Password Page  Dashboard Template",
  // other metadata
};

export default function PasswordRequest() {
  return <PasswordRequestForm />;
}
