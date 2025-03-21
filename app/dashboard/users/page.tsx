import { serverHelpers } from "@/lib/trpc/serverHelper"
import CustomerList from "./_components/CustomerList"
export const dynamic = "force-dynamic";

const page = async () => {

  await serverHelpers.user.getAllUsers.prefetch()

  return (
    <div className='px-10 min-h-screen'>
      <header>
        <h2 className="mt-10 font-semibold text-5xl mb-10">Usuarios</h2>
      </header>
      <CustomerList/>
    </div>
  )
}

export default page