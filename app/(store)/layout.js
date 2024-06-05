
import NavigationMenu from '../../components/Navbar'
import Cart from '../../components/cart/Cart'

const layout = ({children}) => {
  return (
    <div className="drawer drawer-end">
    
      <NavigationMenu/>
      <div className='bg-base-200 min-h-screen z-1'>{children}</div>
   
  </div>
  )
}

export default layout
