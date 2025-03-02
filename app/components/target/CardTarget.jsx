"use client"
import {
    AccountBalanceWallet,
    DoneAll,
    TaskAlt,
    AccessTime,
  } from "@mui/icons-material"
import { ProgressBar } from "./Progressbar"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useCardStore } from "../context/IsGrid";
import { useEffect } from "react";

function formatDate(date) {
  const newDate = new Date(date);

  if (isNaN(newDate)) {
    throw new Error("Fecha inválida");
  }

  const opciones = { year: "numeric", month: "numeric", day: "numeric" };
  return newDate.toLocaleDateString("es-ES", opciones);
}

function formatDecimal(num) {
  return num?.toFixed(2); // Retorna un string con dos decimales
}

  export function CardTarget({ optimal = 40, 
                              indicator_value = 100, 
                              title, 
                              start_date, 
                              end_date, 
                              value, 
                              indicator, 
                              aggregation,
                              perspective,
                              id}) {
    // Obtener el estado y el método handleSelect del store
  const { selectedCard, handleSelect, clearSelection } = useCardStore();

  // Verificar si esta tarjeta está seleccionada
  const isSelected = selectedCard === id;

  
  
  return (
    <div
      className={`max-w-[500px] rounded-2xl p-6 cursor-pointer ${
        isSelected ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white border border-gray-200'
      }`}
      onClick={() => handleSelect(id)} // Manejar la selección al hacer clic
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 h-20 w-full">
        <LogoCard value={perspective} />
        <TitleCard text={title} />
        <StatusCard />
      </div>

      {/* Date */}
      <DateCard start_date={formatDate(start_date)} end_date={formatDate(end_date)} />

      {/* Total Sales */}
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

      {/* Progress Bar */}
      <div>
        <ProgressBar current={indicator_value} target={optimal} />
      </div>

      {/* Button */}
      <ContainerButton id={id} />
    </div>
  );
}
  
  export function ContainerButton({id}) {
    
  
    return (
      <div className="h-16 w-full flex justify-center pt-4">
        <ButtonSecondary text={"Ver detalles"} id={id}/>
      </div>
    )
  }

  export function ButtonSecondary({ text, id }) {
    const router = useRouter();
  
    return (
      <button
        onClick={() => router.push(`/dashboard/target/${id}`)}
        className="bg-[#ffffff] border-2 border-[#085494] text-[#085494] w-full h-full rounded-lg text-lg px-4 py-2 
                   hover:bg-[#e4e6e8] transition-all duration-300"
      >
        {text}
      </button>
    );
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
  
  export function StatusCard({ status = "finally" }) {
    return (
      <div className="min-w-[3rem] min-h-[3rem] bg-[#dfe6fa] rounded-full flex justify-center items-center">
        <DoneAll />
      </div>
    )
  }
  
  export function LogoCard({ value = "F", color = "blue" }) {
    return (
      <div
        className={`bg-[#085494] text-white rounded-lg min-w-[4rem] min-h-[4rem] flex justify-center items-center`}
      >
        <strong className="font-semibold text-2xl">{value[0]}</strong>
      </div>
    )
  }
  