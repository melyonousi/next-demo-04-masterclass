import AuthSignIn from "@/app/components/Auth/AuthSignIn";
import Container from "@/app/components/Container"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Master Class | Sign in"
};

const SignIn = async () => {
  
  return (
    <Container>
      <h3>Sign in</h3>
      <AuthSignIn />
    </Container>
  )
}

export default SignIn