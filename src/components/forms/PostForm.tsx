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
import { Models } from "appwrite"
import { PostFormSchema } from "@/lib/validation"
import { useCreatePost } from "@/lib/react-query/queries"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

type PostFormProps = {
  post ?: Models.Document
}

const PostForm = ({ post }: PostFormProps) => {
    const {user} = useUserContext()
    const {toast} = useToast()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof PostFormSchema>>({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post.location: "",
            tags: post ? post.tags.join(",") : ""
        },
    })

    // Query
    const {mutateAsync: createPost, isPending: isLoadingCreate} = useCreatePost()

    async function onSubmit(values: z.infer<typeof PostFormSchema>) {
        // console.log(values)

        const newPost = await createPost({...values, userId: user.id})
        
        if(!newPost) {
          toast({title: "Please try again"})
        }

        navigate("/")
    }

  return <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl
  custom-scrollbar">
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
            <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
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
        <Button type="submit" className="h-12 px-5 bg-green-500 flex gap-2
        whitespace-nowrap">Submit</Button>
    </div>
  </form>
</Form>
}

export default PostForm