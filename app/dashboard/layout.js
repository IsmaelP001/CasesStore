import Link from "next/link"
import Sidebar from './_components/Sidebar'

const layout = ({children}) => {
  return (
    <div className="drawer lg:drawer-open ">
     <div className="flex gap-5">
       <Sidebar></Sidebar>
       <div className="flex-1">{children}</div>
     </div>
  </div>
  )
}

export default layout