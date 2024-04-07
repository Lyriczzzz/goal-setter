import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { useSession } from '@/hooks/session'
import { LogOut } from 'lucide-react'

export function AccountMenu() {
  const { session, handleSignOut } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {session?.photoURL && (
            <img
              src={session.photoURL}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mt-2">
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Button variant="secondary" onClick={handleSignOut}>
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
