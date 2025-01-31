import {
    AccountBalanceWallet,
    DoneAll,
    TaskAlt,
    AccessTime,
  } from "@mui/icons-material"
import { ProgressBar } from "./Progressbar"
  
  export function CardTarget({ current = 40, target = 100, title, start, end, value, indicator}) {
    return (
      <div className="rounded-2xl bg-[#ffffff] p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 h-20 w-full">
          <LogoCard value={value}  />
          <TitleCard text={title} />
          <StatusCard />
        </div>
  
        {/* Date */}
        <DateCard start={start} end={end}/>
  
        {/* Total Sales */}
        <div className="pt-8 text-center">
          <strong className="font-medium text-lg">{indicator}</strong>
          <div className="flex flex-col gap-4 py-6">
            <div className="flex justify-between w-full">
              <AccountBalanceWallet sx={{ color: "#4C4F68" }}/>
              <p className="font-normal text-sm">Resultado obtenido</p>
              <span className="font-medium text-base">{current}</span>
            </div>
            <div className="flex justify-between w-full">
              <TaskAlt sx={{ color: "#4C4F68" }}/>
              <p className="font-normal text-sm">Resultado esperado</p>
              <span className="font-medium text-base">{target}</span>
            </div>
          </div>
        </div>
  
        {/* Progress Bar */}
        <div>
          <ProgressBar current={current} target={target} />
        </div>
  
        {/* Button */}
        <ContainerButton />
      </div>
    )
  }
  
  export function ContainerButton() {
    
  
    return (
      <div className="h-16 w-full flex justify-center pt-4">
        <ButtonSecondary text={"Ver detalles"} />
      </div>
    )
  }
  
  export function ButtonSecondary({ text, handle }) {
    return (
      <button
        onClick={handle}
        className="bg-[#ffffff] border-2 border-[#085494] text-[#085494] w-full h-full rounded-lg text-lg px-4 py-2 
                 hover:bg-[#e4e6e8]  transition-all duration-300"
      >
        {text}
      </button>
    )
  }
  
  export function TitleCard({ text = "Aumentar las ventas un 15%" }) {
    return <strong className="font-semibold text-lg leading-none text-center">{text}</strong>
  }
  
  export function DateCard({ start = "23/10/2024", end = "28/12/2024" }) {
    return (
      <div className="flex justify-between h-9 w-full pt-8">
        <div className="flex items-center gap-1">
          <AccessTime className="h-4" sx={{ color: "#4C4F68" }}/>
          <p className="text-xs font-light">Inicio: {start}</p>
        </div>
        <div className="flex items-center gap-1">
          <AccessTime className="h-4" sx={{ color: "#4C4F68" }}/>
          <p className="text-xs font-light">Final: {end}</p>
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
        <strong className="font-semibold text-2xl">{value}</strong>
      </div>
    )
  }
  