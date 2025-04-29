import { bottombarLinks } from "@/constants"
import { Link, useLocation } from "react-router-dom"

const Bottombar = () => {
  const { pathname } = useLocation()
  return (
    <section className='z-50 flex justify-between items-center w-full sticky bottom-0 rounded-t-[20px]
    px-5 py-4 md:hidden bg-gray-200'>
      {
        bottombarLinks.map((link) => {
          const isActive = pathname === link.route

          return (
            <Link key={`bottombar-${link.label}`} to={link.route} 
            className={`${isActive && "bg-blue-400 rounded-[10px]"} flex flex-col
            justify-center items-center gap-1 p-2 tr{link.imgUrl}sition`}>
              <img src={link.imgUrl} alt={link.label} width={24} height={24} />

              <p className="text-[14px] font-medium leading-[140%]
              text-blue-900">{link.label}</p>
            </Link>
          )
        })
      }
    </section>
  )
}

export default Bottombar