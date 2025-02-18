// components/DesignConfigurator.tsx
'use client'
import { useRouter } from 'next/navigation'
import { useDesign } from '../hooks/useDesign-context'
import { useSaveDesign } from '../hooks/useSaveDesign'
import { ConfigurationPanel } from './ConfigurationPanel'
import { PhoneCasePreview } from './PhoneCasePreview'
import { UploadOverlay } from './UploadOverlay'
import { ChevronLeft } from 'lucide-react'

const DesignConfigurator = () => {
  const { isUploading } = useSaveDesign()
  const router  = useRouter()

  return (
    <section className="relative py-2 overflow-hidden">
      <div className='absolute top-3 left-4 z-[40] h-fit w-fit' >
        <button className='border-2 border-black rounded-full p-1' onClick={()=>router.back()}>
          <ChevronLeft/>
        </button>
      </div>
      
      <div className="bg-gray-200 fixed inset-0"></div>
      <div className="relative mt-2 md:mt-10 grid grid-cols-1 md:grid-cols-2   lg:grid-cols-3  pb-10 px-5">
        <PhoneCasePreview />
        <ConfigurationPanel />
      </div>
    </section>
  )
}

export default DesignConfigurator