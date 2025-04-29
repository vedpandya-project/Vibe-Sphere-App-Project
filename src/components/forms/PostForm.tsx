import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"

const formSchema = z.object({
    username: z.string().min(2).max(50)
})

const PostForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
  return <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
    <FormField
      control={form.control}
      name="caption"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Caption</FormLabel>
          <FormControl>
            <Textarea className="h-36 border border-slate-400 focus-visible:ring-0
            focus-visible:ring-offset-0" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

<FormField
      control={form.control}
      name="file"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Add Photos</FormLabel>
          <FormControl>
            <FileUploader />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

<FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Add Location</FormLabel>
          <FormControl>
            <Input type="text" className="h-12 border border-slate-400
            focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

<FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Add Tags (separated by comma " , ")</FormLabel>
          <FormControl>
            <Input type="text" className="h-12 border border-slate-400 focus-visible:ring-0
            focus-visible:ring-offset-0"
            placeholder="Movies, Travel, Explore" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <div className="flex gap-4 items-center justify-end">
        <Button type="button" className="h-12 px-5 bg-red-500 flex gap-2">Cancel</Button>
        <Button type="button" className="h-12 px-5 bg-green-500 flex gap-2
        whitespace-nowrap">Submit</Button>
    </div>
  </form>
</Form>
}

export default PostForm