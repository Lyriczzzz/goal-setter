import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { useSession } from '@/hooks/session'
import { AccountMenu } from './account-menu'

export function Header() {
  const { session } = useSession()
  const isLoggedIn = !!session

  return (
    <header className="relative z-10 border-b bg-gray-100 py-3 dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-medium hover:underline">
          GoalSetter
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <AccountMenu />
              <p>{session.displayName}</p>
            </>
          ) : (
            <Button variant="link" asChild>
              <Link to="/login-form">Sign In</Link>
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
