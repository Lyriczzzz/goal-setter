import { CreateGoalForm } from './create-goal-form'

export function CreateGoal() {
  return (
    <div className="container mx-auto flex flex-col gap-8 pb-24 pt-12">
      <h1 className="text-4xl font-bold">Create Goal</h1>

      <CreateGoalForm />
    </div>
  )
}
