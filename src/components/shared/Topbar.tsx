import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queries'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {
    const navigate = useNavigate()
    const {user} = useUserContext()
    const {mutate: signOut, isSuccess} = useSignOutAccount()

    useEffect(() => {
        if(isSuccess) navigate(0)
    }, [isSuccess])
  return (
    <section className='sticky top-0 z-50 md:hidden w-full border-b-2'>
        <div className='flex justify-between items-center py-4 px-5'>
            <Link to={"/"} className='flex gap-3 items-center'>
                <h1 className='text-2xl font-bold text-blue-600 text-center'>
                    VIBESPHERE
                </h1>
            </Link>

            <div className='flex gap-4'>
                <Button variant={"ghost"} className='hover:bg-transparent'
                onClick={() => signOut()}>
                    <img src="https://cdn-icons-png.flaticon.com/128/16697/16697253.png" alt=""
                    className='w-8' />
                </Button>

                <Link to={`/profile/${user.id}`} className='flex justify-center items-center gap-3'>
                    <img src={user.imageUrl || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"} 
                    alt=""
                    className='h-10 w-10 rounded-full' />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Topbar