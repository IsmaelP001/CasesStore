"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

const getDeliveryDays = () => {
  moment.locale("es"); // 'en'
  const allDays = [1, 2, 3, 4, 5].map((day) => {
    return moment().add(day, "days").calendar().split(" ").slice(0, 1).join();
  });

  return allDays;
};

const getDeliveryTime = () => {
  const times = [];
  let currentHour = moment().hour();
  let currentMinutes = moment().minutes();
  const minutes = currentMinutes < 30 ? 30 : 0;
  const hour = currentHour > 17 || currentHour < 8 ? 8 : currentHour;
  let currentTime = moment({ hour: hour, minute: minutes });

  for (let i = 0; i < 18; i++) {
    const timeString = currentTime.format("h:mm A");
    times.push([timeString]);
    currentTime = currentTime.add(30, "minutes");
  }

  return times;
};

const ScheduleDeliveryModal = () => {
  const [deliveryDays, setDeliveryDate] = useState(null);
  const [deliveryHour, setDeliveryHour] = useState(null);
  const [deliveryType, setDeliveryType] = useState({
    type: "STANDARD",
    time: null,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!deliveryDays || !deliveryHour) return;
    const time = `${deliveryDays}  /  ${deliveryHour}`;
    setDeliveryType({ type: "SCHEDULE", time });
    setOpen(false);
  }, [deliveryDays, deliveryHour]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <div>
        <div className="flex gap-4">
          <Button
            data-id="STANDARD"
            className={` bg-transparent w-full text-primary border-2 border-primary p-6 hover:text-secondary rounded-xl ${
              deliveryType.type === "STANDARD" ? "bg-black text-white" : null
            }`}
            onClick={() => setDeliveryType({ type: "STANDARD", time: null })}
          >
            <div>
              <p className="font-semibold mb-1">Standard</p>
              <span className="text-xs font-light">24 horas</span>
            </div>
          </Button>
          <Button
            data-id="SCHEDULE"
            className={`bg-transparent  w-full text-primary border-2 border-primary p-6 hover:text-secondary rounded-xl ${
              deliveryType.type === "SCHEDULE" ? "bg-black text-white" : null
            }`}
            onClick={() => {
              setOpen(true);
              setDeliveryType({ type: "SCHEDULE", time: deliveryHour });
            }}
          >
            <div>
              <p className="font-semibold mb-1">Entregar para mas tarde</p>
              {deliveryType?.time ? (
                <span>{deliveryType.time}</span>
              ) : (
                <span className="text-xs font-light">Escoja un tiempo</span>
              )}
            </div>
          </Button>
        </div>
      </div>
      <DialogContent>
        <div className="modal-box">
          <div className="flex justify-between items-start">
            <DialogTitle className="mb-5"> Escoja una fecha de entrega</DialogTitle>
          </div>
          <div className=" flex justify-evenly bg-gray-200 rounded-[2rem]">
            {getDeliveryDays()?.map((day) => (
              <Button
                key={day}
                className={cn(
                  "rounded-[2rem] bg-transparent text-primary capitalize hover:text-white py-7 px-4",
                  deliveryDays === day ? "bg-primary text-white" : null
                )}
                disabled={day === 'sábado'  ? true : false}
                onClick={(e) => setDeliveryDate(day)}
              >
                <div className="grid gap-2">
                  <p className="text-[0.9rem] tracking-[0.1rem] font-semibold">
                    {day}
                  </p>
                </div>
              </Button>
            ))}
          </div>

          {deliveryDays && (
            <div>
              <DialogTitle className="mb-5 mt-5">Hora entrega deseada</DialogTitle>
              <div className="grid  grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                {getDeliveryTime()?.map(([time]) => (
                  <Button
                    key={time}
                    size="sm"
                    onClick={() => setDeliveryHour(time)}
                    className={cn(
                      "rounded-xl text-primary h-7 hover:text-white",
                      time === deliveryHour
                        ? "bg-primary text-white"
                        : "bg-gray-200"
                    )}
                  >
                    <span className="text-semibold tracking-widest">
                      {" "}
                      {time}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

//   return (
//     <dialog id="scheduleDeliveryModal" className="modal ">
//       <div className="modal-box">
//         <div className="flex justify-between items-start">
//           <h2 className="text-ms font-semibold mb-3">
//             Escoja una fecha de entrega
//           </h2>
//           <button className="btn btn-ghost btn-xs" onClick={closeModal}>
//             x
//           </button>
//         </div>
//         <div className=" flex gap-2 justify-evenly">
//           {getDeliveryDays()?.map((day) => (
//             <button className=""  onClick={(e) => setDeliveryDate(day)} >
//               <div className="grid gap-2">
//                 <p className="text-[0.9rem] font-light tracking-[0.1rem]">
//                   {day}
//                 </p>
//               </div>
//             </button>
//           ))}
//         </div>

//         {deliveryDays && (
//           <div>
//             <h2 className="text-ms font-semibold mb-3 mt-3">
//               Hora entrega deseada
//             </h2>
//             <div className="grid  grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
//               {getDeliveryTime()?.map(([time]) => (
//                 <Button
//                   key={time}
//                   size="sm"
//                   onClick={() => setDeliveryHour(time)}
//                   className={cn(
//                     "rounded-xl text-primary p-0",
//                     time === deliveryHour ? "bg-primary text-white" : "bg-gray-200"
//                   )}
//                 >
//                   {time}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </dialog>
//   );
// };

export default ScheduleDeliveryModal;
