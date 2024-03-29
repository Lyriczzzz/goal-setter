import { GoalProps } from "./your-goals";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { useSession } from "@/hooks/session";
import { db } from "@/lib/firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";

export function UserGoalCard({ goal }: { goal: GoalProps }) {
  const { session } = useSession();
  const tags = goal.tags.split(",").map((goal) => goal.trim());

  async function handleDeleteGoal() {
    if (session) {
      const userId = session.uid;
      const userDocRef = doc(db, "goal", userId);
      const goalsCollectionRef = collection(userDocRef, "goals");

      try {
        const snapshot = await getDocs(goalsCollectionRef);
        // Checks if the current goal belongs to the clicked document
        const selectedGoalDoc = snapshot.docs.find(
          (doc) => doc.data().name === goal.name
        );
        if (selectedGoalDoc) {
          // Deletes the document with the selected ID
          await deleteDoc(doc(goalsCollectionRef, selectedGoalDoc.id));
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching and deleting goal:", error);
      }
    }
  }

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
      <CardFooter>
        <AlertDialog>
          <Button asChild variant="destructive">
            <AlertDialogTrigger>
              <Delete className="mr-2" /> Delete
            </AlertDialogTrigger>
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button asChild onClick={handleDeleteGoal}>
                <AlertDialogAction>Continue</AlertDialogAction>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
