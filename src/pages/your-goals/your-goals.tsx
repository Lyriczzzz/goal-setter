import { Button } from '@/components/ui/button'
import { useSession } from '@/hooks/session'
import { db } from '@/lib/firebase'
import { doc, collection, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserGoalCard } from './user-goal-card'
import { GoalIcon } from 'lucide-react'

export type GoalProps = {
  name: string
  description: string
  tags: string
}

export function YourGoals() {
  const { session } = useSession()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [goals, setGoals] = useState<any>([])

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
        <GoalIcon className="size-12" />
        <Button asChild>
          <Link to="/create-goal">Create Goal</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-8">
        {goals.map((goal: GoalProps, index: number) => {
          return <UserGoalCard key={index} goal={goal} />
        })}
      </div>
    </main>
  )
}
