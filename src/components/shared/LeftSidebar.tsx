import { sidebarLinks } from "@/constants"
import { useUserContext } from "@/context/AuthContext"
import { NavLinkTypes } from "@/types"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/react-query/queries"
import { useEffect } from "react"

const LeftSidebar = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const { pathname } = useLocation()

  const {mutate: signOut, isSuccess} = useSignOutAccount()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px]
    bg-gray-100">
      <div className="flex flex-col gap-11">
        <Link to={"/"} className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold text-blue-600 text-center">VIBESPHERE</h1>
        </Link>

        <Link to={`/profile/${user.id}`} className='flex items-center gap-3'>
          <img src={user.imageUrl || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"}
            alt=""
            className='h-14 w-14 rounded-full' />

          <div className="flex flex-col">
            <p className="text-[18px] font-bold leading-[140%]">{user.name}</p>
            <p className="text-[14px] font-normal leading-[140%] text-slate-600">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: NavLinkTypes) => {
            const isActive = pathname === link.route
            return (
              <li key={link.label} className={`rounded-lg text-[16px] font-medium leading-[140%]
              hover:bg-blue-200 transition ${isActive && "bg-blue-400"}`}>
                <NavLink to={link.route} className={"flex gap-4 items-center p-4"}>
                  <img src={link.imgUrl} 
                  alt={link.label} className="w-8 h-8" />

                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>


      </div>

      <Button variant={"ghost"} className="hover: bg-transparent" onClick={() => signOut()}>
        <img src="https://cdn-icons-png.flaticon.com/128/16697/16697253.png" alt=""
        className="w-10 h-10" />

        <p className="text-[14px] font-medium leading-[140%] lg:text-[16px]">Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar