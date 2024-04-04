import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { CreateGoalForm } from './create-goal-form'
import { Button } from '@/components/ui/button'

export function CreateGoal() {
  return (
    <div className="container mx-auto flex flex-col gap-8 pb-24">
      <Button asChild variant="secondary" className="w-max">
        <Link to="/your-goals">
          <ArrowLeft className="mr-2 size-4" />
          Back
        </Link>
      </Button>
      <h1 className="text-4xl font-bold">Create Goal</h1>

      <CreateGoalForm />
    </div>
  )
}
