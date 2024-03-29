import { Button } from '@/components/ui/button'
import { useSession } from '@/hooks/session'

export function SignIn() {
  const handleGoogleSignIn = useSession()
  return (
    <div className="flex flex-1 items-center justify-center ">
      <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
    </div>
  )
}
