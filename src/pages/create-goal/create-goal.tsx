import { CreateGoalForm } from "./create-goal-form";

export function CreateGoal() {
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Create Goal</h1>

      <CreateGoalForm />
    </div>
  );
}
