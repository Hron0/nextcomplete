import { LoginPage } from '@/app/auth/Login'
import { RegisterPage } from '@/app/auth/Register'
import { NextPage } from 'next'

interface Props {
    searchParams?: {
        type: string
    }
}

const Page: NextPage<Props> = ({ searchParams }) => {
    const type = searchParams?.type || 'login'

    return (
        <div>
            {type === 'registration' && <RegisterPage />}
            {type === 'login' && <LoginPage />}
        </div>
    )
}

export default Page