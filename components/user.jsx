import { useSession } from "next-auth/react"

export default function User() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    console.log(session)
    return <p>Signed in as {session.user.email}</p>
  }

  return <a href="/api/auth/signin">Sign in</a>
}