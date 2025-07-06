"use client"
import {
    AccountBalanceWallet,
    DoneAll,
    TaskAlt,
    AccessTime,
    DoDisturb,
  } from "@mui/icons-material"
import { ProgressBar } from "./Progressbar"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useCardStore } from "../context/IsGrid";
import { useCallback, useEffect } from "react";
import { ButtonSecondary } from "./ButtonSecondary";
import { CheckCircle } from "lucide-react";
import { PauseCircle } from "lucide-react";
import { XCircle } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { ActionsButton } from "./ActionsButton";

function formatDate(date) {
  const newDate = new Date(date);

  if (isNaN(newDate)) {
    throw new Error("Fecha inválida");
  }

  const opciones = { year: "numeric", month: "numeric", day: "numeric" };
  return newDate.toLocaleDateString("es-ES", opciones);
}

function formatDecimal(num) {
  return num?.toFixed(2); 
}

  export function CardTarget({ optimal = 40, 
                              indicator_value = 100, 
                              title, 
                              start_date, 
                              end_date, 
                              value, 
                              indicator, 
                              tag,
                              perspective,
                              lack, 
                              status,
                              progress,
                              id}) {
  
  return (
    <div
      className="max-w-[500px] rounded-2xl p-6 cursor-pointer 
        bg-white border border-gray-200"
    >
      <div className="flex items-center justify-between gap-3 h-20 w-full">
        <LogoCard value={tag} />
        <TitleCard text={title} />
        <StatusCard status={status} />
      </div>

      <DateCard start_date={formatDate(start_date)} end_date={formatDate(end_date)} />

      <div className="pt-8 text-center">
        <strong className="font-medium text-lg">{indicator}</strong>
        <div className="flex flex-col gap-4 py-6">
          <div className="flex justify-between w-full">
            <AccountBalanceWallet sx={{ color: '#4C4F68' }} />
            <p className="font-normal text-sm">Resultado obtenido</p>
            <span className="font-medium text-base">{formatDecimal(indicator_value)}</span>
          </div>
          <div className="flex justify-between w-full">
            <TaskAlt sx={{ color: '#4C4F68' }} />
            <p className="font-normal text-sm">Resultado esperado</p>
            <span className="font-medium text-base">{formatDecimal(optimal)}</span>
          </div>
        </div>
      </div>

      <div>
        <ProgressBar current={indicator_value} optimal={optimal} lack={lack} progress={progress}/>
      </div>

      <ContainerButton id={id} />
    </div>
  );
}
  
  export function ContainerButton({id}) {
    return (
      <div className="h-16 w-full flex justify-center gap-2 pt-4">
        <ActionsButton id={id} />
        <ButtonSecondary text={"Ver detalles"} id={id}/>
      </div>
    )
  }

  export function TitleCard({ text = "Aumentar las ventas un 15%" }) {
    return <strong className="font-semibold text-lg leading-none text-center">{text}</strong>
  }
  
  export function DateCard({ start_date = "23/10/2024", end_date = "28/12/2024" }) {
    return (
      <div className="flex justify-between h-9 w-full pt-8">
        <div className="flex items-center gap-1">
          <AccessTime className="h-4" sx={{ color: "#4C4F68" }}/>
          <p className="text-xs font-light">Inicio: {start_date}</p>
        </div>
        <div className="flex items-center gap-1">
          <AccessTime className="h-4" sx={{ color: "#4C4F68" }}/>
          <p className="text-xs font-light">Final: {end_date}</p>
        </div>
      </div>
    )
  }
  
  export function StatusCard({ status }) {
    console.log(status)
    const statusConfig = {
    completed: {
      icon: <CheckCircle  />
    },
    active: {
      icon: <LoaderCircle  />
    },
    failed: {
      icon: <XCircle  />
    },
  };
    return (
      <div className="min-w-[3rem] min-h-[3rem] bg-[#dfe6fa] rounded-full flex justify-center items-center">
        {statusConfig[status].icon}
      </div>
    )
  }
  
  export function LogoCard({ value = "F", color = "blue" }) {
    return (
      <div
        className={`bg-[#085494] text-white rounded-lg min-w-[4rem] min-h-[4rem] flex justify-center items-center`}
      >
        <strong className="font-semibold text-2xl" title={value}>{value[0]}</strong>
      </div>
    )
  }
  