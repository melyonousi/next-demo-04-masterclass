import AuthSignUp from "@/app/components/Auth/AuthSignUp";
import Container from "@/app/components/Container"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master Class | Sign up"
};

const SignUp = () => {
  return (
    <Container>
      <AuthSignUp />
    </Container>
  )
}

export default SignUp