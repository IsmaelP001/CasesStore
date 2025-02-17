"use client";

import { useEffect, useState, useCallback } from "react";
import moment from "moment";
import "moment/locale/es";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../lib/utils/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { useDispatch } from "react-redux";
import { setScheduledTime } from "../../../../config/redux/features/order/orderSlice";

type DeliveryType = "standard" | "scheduled";

interface ScheduledTime {
  deliveryType: DeliveryType;
  date: string | null;
}

const getDeliveryDays = (): string[] => {
  moment.locale("es");
  return Array.from({ length: 5 }, (_, i) => moment().add(i + 1, "days").format("dddd"));
};

const convertDayAndTimeToDate = (day: string, time: string): string => {
  const targetDay = day === "mañana" ? moment().add(1, "day") : moment().day(day);
  const [hour, minutes] = moment(time, "h:mm A").format("HH:mm").split(":").map(Number);
  return targetDay.hour(hour).minute(minutes).toISOString();
};

const getDeliveryTime = (): string[] => {
  const startTime = moment({ hour: 9, minute: 0 });
  return Array.from({ length: 18 }, (_, i) => startTime.clone().add(i * 30, "minutes").format("h:mm A"));
};

const ScheduleDeliveryModal = () => {
  const [deliveryDay, setDeliveryDate] = useState<string | null>(null);
  const [deliveryHour, setDeliveryHour] = useState<string | null>(null);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("standard");
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const updateScheduledTime = useCallback(() => {
    const scheduledDate = deliveryDay && deliveryHour ? convertDayAndTimeToDate(deliveryDay, deliveryHour) : null;
    const payload: ScheduledTime = { deliveryType, date: scheduledDate };
    dispatch(setScheduledTime(payload));
  }, [dispatch, deliveryDay, deliveryHour, deliveryType]);

  useEffect(() => {
    updateScheduledTime();
    if (deliveryType === "standard") setDeliveryHour(null);
    if(deliveryDay && deliveryHour)setOpen(false)
  }, [updateScheduledTime, deliveryType, deliveryDay, deliveryHour]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-4">
        <Button
          className={cn("bg-transparent hover:text-white w-full text-black border border-gray-300 px-6 py-8 rounded-md", {
            "bg-primary text-white": deliveryType === "standard"
          })}
          onClick={() => setDeliveryType("standard")}
        >
          <div>
            <p className="font-semibold mb-1">Standard</p>
            <span className="text-xs font-light">24 horas</span>
          </div>
        </Button>
        <Button
          className={cn("bg-transparent hover:text-white w-full text-black border border-gray-300 px-6 py-8 rounded-md", {
            "bg-primary text-white": deliveryType === "scheduled"
          })}
          onClick={() => {
            setOpen(true);
            setDeliveryType("scheduled");
          }}
        >
          <div>
            <p className="font-semibold mb-1">Agendar entrega</p>
            {deliveryType === "scheduled" && deliveryDay && deliveryHour ? (
              <>
                <span className="capitalize">{deliveryDay} /</span>
                <span>{deliveryHour}</span>
              </>
            ) : (
              <span className="text-xs font-light">Escoja un tiempo</span>
            )}
          </div>
        </Button>
      </div>


      <DialogContent>
        <div className="flex flex-col justify-center">
          <DialogTitle>Escoja una fecha de entrega</DialogTitle>
          <div className="flex justify-between mt-2 bg-gray-200 rounded-[2rem]">
            {getDeliveryDays().map((day) => (
              <Button
                key={day}
                className={cn("rounded-[2rem] hover:text-white bg-transparent text-primary py-7 px-3", {
                  "bg-primary text-white": deliveryDay === day
                })}
                disabled={day === "sábado"}
                onClick={() => setDeliveryDate(day)}
              >
                <p className="text-[0.9rem] font-semibold">{day}</p>
              </Button>
            ))}
          </div>

          {deliveryDay && (
            <>
              <DialogTitle className="mb-5 mt-5">Hora entrega deseada</DialogTitle>
              <div className="grid grid-cols-2 gap-4">
                {getDeliveryTime().map((time) => (
                  <Button
                    key={time}
                    size="sm"
                    onClick={() => setDeliveryHour(time)}
                    className={cn("rounded-xl hover:text-white text-primary h-7", {
                      "bg-primary text-white": time === deliveryHour,
                      "bg-gray-200": time !== deliveryHour
                    })}
                  >
                    <span className="text-semibold">{time}</span>
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDeliveryModal;
