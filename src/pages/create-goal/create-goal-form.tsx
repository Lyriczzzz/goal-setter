import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSession } from '@/hooks/session'
import { db } from '@/lib/firebase'
import { addDoc, collection, doc, runTransaction } from 'firebase/firestore'

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  tags: z.string().min(1).max(50),
})

type GoalProps = {
  name: string
  description: string
  tags: string
}

export function CreateGoalForm() {
  const { session } = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      tags: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userId = session?.uid

    if (userId) {
      const goalData: GoalProps = {
        name: values.name,
        description: values.description,
        tags: values.tags,
      }

      const userDocRef = doc(db, 'goal', userId)

      const goalsCollectionRef = collection(userDocRef, 'goals')

      await runTransaction(db, async () => {
        await addDoc(goalsCollectionRef, goalData)
      }).catch((error) => {
        console.error('Error adding document: ', error)
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Goal Setter Is Awesome" />
              </FormControl>
              <FormDescription>This is your public goal name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Im working on a side project, come join me"
                />
              </FormControl>
              <FormDescription>
                Please describe what you are be coding on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="sport, habit, health" />
              </FormControl>
              <FormDescription>
                List the tags that best suit your goal
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
