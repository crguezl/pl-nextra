import { signIn, useSession } from "next-auth/react"

const SignInButton = () => <button onClick={() => signIn()}>Sign in</button>
export default function RenderAuthButtons() {
    const { session, loading } = useSession()

    if (loading) return (<div>Loading...</div>);
    if (session) return (<div>Hi, {session.user.name}! 
        <button onClick={() => signOut()}>Sign out</button>
        </div>);
    return <SignInButton />

}