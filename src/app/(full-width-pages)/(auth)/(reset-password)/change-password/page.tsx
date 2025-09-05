import ChangePasswordForm from "@/components/auth/ChangePasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password Page | Sign In - Dashboard Template",
  description: "This is Forget Password Page  Dashboard Template",
  // other metadata
};

export default function ChangePassword() {
  return <ChangePasswordForm />;
}
