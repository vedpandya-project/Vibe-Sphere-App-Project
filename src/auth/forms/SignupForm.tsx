import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpFormSchema } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/hooks/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries"
import { useUserContext } from "@/context/AuthContext"

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext()

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  // queries
  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = 
  useCreateUserAccount()

  const {mutateAsync: signInAccount, isPending: isSigningInUser } = 
  useSignInAccount()

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    const newUser = await createUserAccount(values)

    if(!newUser) {
      toast({title: "Sign up failed. Please try again."})

      navigate("/sign-in")

      return 
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session) {
      toast({ title: "Something went wrong. Please try again."})

      navigate("/sign-in")

      return
    }

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn) {
      form.reset()

      navigate("/")
    } else {
      toast({title: "Login failed. Please try again."})

      return
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-[420px] flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 text-center">VIBESPHERE</h1>

        <h2 className="text-[24px] md:text-[30px] font-bold leading-[140%] tracking-tighter pt-5
        sm:pt-12">Create a new account</h2>


        <p className="text-slate-500 text-[14px] font-medium leading-[140%] md:text-[16px]
      md:font-normal mt-2">
          Welcome to Vibesphere, Please provide your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input type="text" className="h-12 border border-slate-400 focus-visible:ring-0
              focus-visible:ring-offset-0" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>

                <FormControl>
                  <Input type="text" className="h-12 border border-slate-400 focus-visible:ring-0
              focus-visible:ring-offset-0" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input type="email" className="h-12 border border-slate-400 focus-visible:ring-0
              focus-visible:ring-offset-0" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input type="password" className="h-12 border border-slate-400 focus-visible:ring-0
              focus-visible:ring-offset-0" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-blue-500">
            {isCreatingAccount ? (
              <div className="flex items-center justify-center gap-2">
                <Loader /> Loading
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-slate-600 text-center mt-2">
            Already have an account?
            <Link to={"/sign-in"} className="text-blue-500 font-semibold ml-1">Sign In</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm