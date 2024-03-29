import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { useSession } from '@/hooks/session'

export function Header() {
  const { session, handleSignOut } = useSession()
  const isLoggedIn = !!session

  return (
    <header className="border-b py-3 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-medium hover:underline">
          GoalSetter
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button variant="link" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button variant="link" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
