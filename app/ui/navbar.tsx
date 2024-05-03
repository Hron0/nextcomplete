import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { auth } from '@/auth';

export default async function Navbar() {
    const session = await auth()

    return (
        <div className="w-full py-2 px-6 flex flex-row items-center justify-between bg-black">
            <div className='flex flex-row items-center gap-4'>
                <Label className='text-white'>
                    <Link href={"/"}>Home</Link>
                </Label>
                <Label className='text-white'>
                    <Link href={"/blog"}>Blog Page</Link>
                </Label>
            </div>

            {session
                ?
                <Label className='text-white'>
                    <Link href={"/settings"}>Настройки</Link>
                </Label>
                :
                <div className='flex flex-row items-center gap-6'>
                    <Label className='text-white'>
                        <Link href={{pathname: "/auth", query:{type: 'login'}}}>Login</Link>
                    </Label>
                    <Label className='text-white'>
                        <Link href={{pathname: "/auth", query:{type: 'registration'}}}>Register</Link>
                    </Label>
                </div>
            }
        </div>
    )
}