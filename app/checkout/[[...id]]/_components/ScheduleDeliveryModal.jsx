'use client'
import { useEffect, useState } from "react"
import moment from 'moment';

const getDeliveryDays=()=>{
  const allDays=[1,2,3,4,5].map(day=>{
    return moment().add(day, 'days').calendar().split('at').slice(0,1).join()
  })

  return allDays
}

const getDeliveryTime=()=>{

}

const ScheduleDeliveryModal=({handleSetDeliveryTime})=>{

    const [deliveryDays,setDeliveryDate]=useState(getDeliveryDays())
    const [deliveryHour,setDeliveryHour]=useState(null)

    const closeModal=()=>{
        document.getElementById('scheduleDeliveryModal').close()
    }

    console.log('deliveryDays',)





    const getDeliveryHours = () => {
      let currentTime = parseInt(moment().format('LT').split(":")[0]);
      const allHours = [];
  
      for (let i = 0; i < 10; i++) {
          currentTime = currentTime % 12; // Asegurarse de que esté dentro del rango de 1-12
  
          if (currentTime === 0) {
              currentTime = 12; // Cambiar 0 a 12 para representar la medianoche
          }
  
          allHours.push(currentTime);
  
          currentTime++; // Incrementar la hora
  
          // Si es mayor que 8 (8 PM), reiniciar a 1 (1 PM)
          if (currentTime > 8) {
              currentTime = 7;
          }
      }
  
      return allHours;
  };


    console.log('deliveryHours',getDeliveryHours())


   



    useEffect(()=>{
        if(!deliveryDays || !deliveryHour)return
        const time=`${deliveryDays}  /  ${deliveryHour}`
        handleSetDeliveryTime('SCHEDULE',time)
        document.getElementById('scheduleDeliveryModal').close()
    },[deliveryDays,deliveryHour])


    return (
      <dialog id="scheduleDeliveryModal" className="modal ">
        <div className="modal-box">
        <div className="flex justify-between items-start">
           <h2 className="text-ms font-semibold mb-3">Escoja una fecha de entrega</h2>
           <button className="btn btn-ghost btn-xs" onClick={closeModal}>x</button>
        </div>
        <div className=" flex gap-2 justify-evenly">
            
            <button className={`btn btn-ghost  btn-outline  flex-col ${deliveryDays === 'Martes' && 'btn-active'}`} onClick={(e)=>setDeliveryDate('Martes')}>
                <div className="grid gap-2">
                  <p className="text-[0.9rem] font-light tracking-[0.1rem]" >Mañana</p>
                  <span className="text-[1.1rem]">16</span>
                </div>
            </button>
            <button className={`btn btn-ghost btn-outline flex-col ${deliveryDays === 'Miercoles' && 'btn-active'}`} onClick={(e)=>setDeliveryDate('Miercoles')}>
                <div className="grid gap-2">
                  <p className="text-[0.9rem] font-light tracking-[0.1rem]" >Miercoles</p>
                  <span className="text-[1.1rem]">17</span>
                </div>
            </button>
            <button className={`btn btn-ghost btn-outline  flex-col ${deliveryDays === 'Jueves' && 'btn-active'}`} onClick={(e)=>setDeliveryDate('Jueves')}>
                <div className="grid gap-2">
                  <p className="text-[0.9rem] font-light tracking-[0.1rem]" >Jueves</p>
                  <span className="text-[1.1rem]">18</span>
                </div>
            </button>
            <button className={`btn btn-ghost flex-col btn-outline   ${deliveryDays === 'Viernes' && 'btn-active'}`} onClick={(e)=>setDeliveryDate('Viernes')}>
                <div className="grid gap-2">
                  <p className="text-[0.9rem] font-light tracking-[0.1rem]" >Viernes</p>
                  <span className="text-[1.1rem]">19</span>
                </div>
            </button>
          </div>  

         {
          deliveryDays && 
          <div>
          <h2 className="text-ms font-semibold mb-3 mt-3">Hora entrega deseada</h2>
          <div className="grid  grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '8:00 am - 8:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('8:00 am - 8:30 am')}>8:00 am - 8:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '9:00 am - 9:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('9:00 am - 9:30 am')}>9:00 am - 9:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '12:00 am - 12:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('12:00 am - 12:30 am')}>12:00 am - 12:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '11:00 am - 11:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('11:00 am - 11:30 am')}>11:00 am - 11:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '10:00 am - 8:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('10:00 am - 8:30 am')}>10:00 am - 8:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '1:00 am - 1:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('1:00 am - 1:30 am')}>1:00 am - 1:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '2:00 am - 2:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('2:00 am - 2:30 am')}>2:00 am - 2:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '3:00 am - 3:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('3:00 am - 3:30 am')}>3:00 am - 3:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '4:00 am - 4:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('4:00 am - 4:30 am')}>4:00 am - 4:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '5:00 am - 5:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('5:00 am - 5:30 am')}>5:00 am - 5:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '6:00 am - 6:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('6:00 am - 6:30 am')}>6:00 am - 6:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '7:00 am - 7:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('7:00 am - 7:30 am')}>7:00 am - 7:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '8:00 am - 8:30 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('8:00 am - 8:30 am')}>8:00 am - 8:30 am</button>
              <button className={`btn btn-sm btn-ghost btn-outline rounded-xl ${deliveryHour === '8:30 am - 9:00 am' && 'btn-active'}`} onClick={(e)=>setDeliveryHour('9:00 am - 9:30 am')}>9:00 am - 9:30 am</button>

           </div>
          </div>
         }
         
       </div>
    
        
      </dialog>
    )
}

export default ScheduleDeliveryModal