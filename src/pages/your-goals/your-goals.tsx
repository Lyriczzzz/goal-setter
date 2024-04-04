import { Button } from '@/components/ui/button'
import { useSession } from '@/hooks/session'
import { db } from '@/lib/firebase'
import { doc, collection, getDocs, DocumentData } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserGoalCard } from './user-goal-card'
import { FolderPlus } from 'lucide-react'

export function YourGoals() {
  const { session } = useSession()
  const [goals, setGoals] = useState<DocumentData>([])

  async function getGoals(userId: string) {
    const userDocRef = doc(db, 'goal', userId)
    const goalsCollectionRef = collection(userDocRef, 'goals')
    const goalsSnapshot = await getDocs(goalsCollectionRef)
    const goalsData = goalsSnapshot.docs.map((doc) => doc.data())
    return goalsData
  }

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const userGoals = await getGoals(session.uid)
        setGoals(userGoals)
      }
    }
    fetchData()
  }, [session])

  return (
    <main className="container mx-auto space-y-16">
      <div className="flex items-center justify-between">
        <img
          className="mb-8 inline-block rounded-full"
          src="/OIG1.jfif"
          width="50"
          height="50"
          alt="goal tracker logo"
        />
        <Button asChild>
          <Link to="/create-goal">Create Goal</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-8">
        {goals.length > 0 ? (
          goals.map((goal: DocumentData, index: number) => {
            return <UserGoalCard key={index} goal={goal} />
          })
        ) : (
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6">
            <Link to="/create-goal">
              <FolderPlus className="size-16" />
            </Link>
            <h1 className="text-center text-3xl md:text-4xl">
              No goals have yet been created. Click the icon above to add a new
              goal.
            </h1>
          </div>
        )}
      </div>
    </main>
  )
}
