'use client'

import Product from "../cases/_components/Product";
import { trpc } from "@/lib/trpc/client";

const FavoritesPage = () => {


    const [favorites]=trpc.userFeatures.favorite.getUserFavorites.useSuspenseQuery(undefined,{
      refetchOnWindowFocus:false,
      refetchOnMount:false
    })
    

  return (
    <div className='px-20 mt-5'>
        <h2 className="text-5xl font-bold mb-10">Tus favoritos</h2>
    
        {!favorites?.length? (
            <div>
                <h4 className="font-semibold font-base tracking-wider text-center mt-20">No tienes articulos en tus favoritos...</h4>
            </div>
        ) : (
              <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3'>
            
              {
                  favorites?.map(favorite=>{
                      return(
                          <div key={favorite.id} className=''>
                              <Product key={favorite.id}  product={{...favorite,isFavorite:true}}/>
                           </div>
                      )
                  })
              }
          </div>
        ) }
      
    </div>
  )
}

export default FavoritesPage