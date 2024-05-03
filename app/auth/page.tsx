import { NextPage } from 'next'
import { LoginPage } from './Login'
import { RegisterPage } from './Register'

interface Props {
    searchParams?: {
        type: string
    }
}

const Page: NextPage<Props> = ({ searchParams }) => {
    const type = searchParams?.type || 'login'

    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden my-8">
            {type === 'registration' && <RegisterPage />}
            {type === 'login' && <LoginPage />}
        </div>
    )
}

export default Page