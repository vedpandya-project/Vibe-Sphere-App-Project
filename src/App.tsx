import { Route, Routes } from "react-router-dom"
import SigninForm from "./auth/forms/SigninForm"
import SignupForm from "./auth/forms/SignupForm"
import Home from "./root/pages/Home"
import AuthLayout from "./auth/AuthLayout"
import RootLayout from "./root/RootLayout"
import { Toaster } from "./components/ui/toaster"
import Explore from "./root/pages/Explore"
import Saved from "./root/pages/Saved"
import AllUser from "./root/pages/AllUser"
import CreatPost from "./root/pages/CreatPost"
import EditPost from "./root/pages/EditPost"
import PostDetails from "./root/pages/PostDetails"
import Profile from "./root/pages/Profile"
import UpdateProfile from "./root/pages/UpdateProfile"

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUser />} />
          <Route path="/create-post" element={<CreatPost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App