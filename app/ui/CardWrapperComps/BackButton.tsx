"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'

const BackButton = () => {
    const searchParams = useSearchParams();
    const isLogin = searchParams.get('type') == "login"

    return (
        <Button
            variant="link"
            size="sm"
            className="font-normal w-full"
            asChild
        >
            <Link href={isLogin ? { pathname: "/auth", query: { type: 'registration' } } : { pathname: "/auth", query: { type: 'login' } }}>
                {isLogin ? "Нет аккаунта?" : "Уже зарегестрированы?"}
            </Link>
        </Button>
    )
}

export default BackButton