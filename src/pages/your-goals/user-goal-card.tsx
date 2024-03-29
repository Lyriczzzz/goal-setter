import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoalProps } from "./your-goals";
import { Badge } from "@/components/ui/badge";

export function UserGoalCard({ goal }: { goal: GoalProps }) {
  const tags = goal.tags.split(",").map((goal) => goal.trim());

  return (
    <Card className="w-full sm:w-[410px]">
      <CardHeader>
        <CardTitle className="text-3xl">{goal.name}</CardTitle>
        <CardDescription>{goal.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge key={index} className="w-fit rounded-full py-1">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
