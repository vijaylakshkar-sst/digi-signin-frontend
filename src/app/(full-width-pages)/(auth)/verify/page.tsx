import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp Page | Sign In - Dashboard Template",
  description: "This is SignUp Page  Dashboard Template",
  // other metadata
};

export default function Verify() {
  return <VerifyOtpForm />;
}
