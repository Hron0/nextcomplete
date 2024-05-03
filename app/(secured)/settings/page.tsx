import { NextPage } from 'next'
import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/auth';

interface Props { }

const Page: NextPage<Props> = async ({ }) => {
    const session = await auth()

    return (
        <div>
            <h1>Settings Page, Your Data:</h1>

            <h1>{JSON.stringify(session, null, 2)}</h1>

            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <Button type='submit' variant="destructive">Выйти из акка</Button>
            </form>
        </div>
    )
}

export default Page