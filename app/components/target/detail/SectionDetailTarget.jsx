"use client"
import { useRouter } from "next/navigation";
import { Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { LogoCard } from "../CardTarget";
import { convertDate } from "../../utils/convert";
import CustomBackButton from "./BackButton";

const GaugeChart = lazy(() => import("../../chart/echart/Gauge"));
const TrafficChart = lazy(() => import("../../chart/echart/TrafficChart"));


export default function TargetDetailPage({ targetData }) {
    return (
            <SectionDetailTarget {...targetData} /> 
    );
}

// Componente de esqueleto de carga
export function LoadingSkeletonDetail() {
    return (
        <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-6 pt-12 animate-pulse">
            <div className="flex gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="w-24 h-6 bg-gray-300 rounded"></div>
                    <KeyboardDoubleArrowRight className="text-gray-300" />
                    <div className="w-24 h-6 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-6 pt-2">
                <div className="flex flex-col gap-4">
                    <div className="w-64 h-24 bg-gray-300 rounded-xl"></div>
                    <div className="w-64 h-24 bg-gray-300 rounded-xl"></div>
                    <div className="w-64 h-24 bg-gray-300 rounded-xl"></div>
                </div>
                <div className="w-64 h-64 bg-gray-300 rounded-full"></div>
                <div className="w-64 h-96 bg-gray-300 rounded-xl"></div>
            </div>
            <div className="w-full h-96 bg-gray-300 rounded-xl"></div>
        </div>
    );
}

export function ButtonSecondary({ text, id }) {
    const router = useRouter();
  
    return (
      <button
        onClick={() => router.push(`/dashboard/target/update/${id}`)}
        className="bg-[#ffffff] border-2 border-[#085494] text-[#085494] w-64 h-full rounded-lg text-lg px-4 py-2 
                   hover:bg-[#e4e6e8] transition-all duration-300"
      >
        {text}
      </button>
    );
  }

// Sección principal de detalle de objetivo
function SectionDetailTarget({perspective, indicator, title, optimal, tolerable, deficient, indicator_value,
                                start_date, end_date, elapsed, restant, detail, min_daily, tag, progress
}) {
    
    return (
        <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-6 pt-12">
            <div className="flex items-center gap-8">
                <CustomBackButton></CustomBackButton>
                <TitleDetailTarget perspective={perspective} description={indicator} tag={tag} />
            </div>
            <div className="flex justify-center">
                <TitleTarget title={title} />
            </div>
            <div className="flex justify-center items-center gap-6 pt-2">
                <div className="flex flex-col gap-4">
                    <CardDetailTarget label="Valor óptimo" amount={optimal} />
                    <CardDetailTarget label="Valor tolerable" amount={tolerable} />
                    <CardDetailTarget label="Valor deficiente" amount={deficient} />
                </div>
                <Suspense fallback={<div className="w-64 h-64 bg-gray-300 rounded-full"></div>}>
                    <GaugeChart result={progress}/>
                </Suspense>
                <DateInfoTarget start={convertDate(start_date)} 
                                end={convertDate(end_date)} 
                                remaining={restant} 
                                duration={elapsed} />
            </div>
        </div>
    );
}

// Componente para mostrar la tarjeta de detalles (valor obtenido, esperado, estimado)
function CardDetailTarget({ label, amount }) {
    return (
        <Box className="bg-white rounded-xl shadow-md p-6 w-64 h-30">
            <p className="text-sm font-light text-gray-700">{label}</p>
            <div className="flex justify-center pt-2">
                <strong className="text-3xl font-medium text-gray-900">{amount}</strong>
            </div>
        </Box>
    );
}

// Componente para mostrar el rango de fechas y tiempo restante
function DateInfoTarget({ start, end, remaining, duration }) {
    return (
        <Box className="bg-white rounded-xl shadow-md h-96 w-64 p-6">
            <strong className="text-lg text-center text-gray-900">Período de tiempo</strong>
            <div className="flex flex-col gap-8 pt-8 text-gray-700">
                <p>Inicio: <span className="font-semibold">{start}</span></p>
                <p>Final: <span className="font-semibold">{end}</span></p>
                <p>Transcurrido: <span className="font-semibold">{duration}</span> días</p>
                <p>Restante: <span className="font-semibold">{remaining}</span> días</p>
            </div>
        </Box>
    );
}

function TitleTarget({ title }) {
    return <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>;
}

function TitleDetailTarget({ perspective, description, tag }) {
    return (
        <div className="flex items-center gap-2">
            <LogoCard value={perspective}/>
            <h4 className="text-xl font-medium text-gray-700">{perspective}</h4>
            <KeyboardDoubleArrowRight />
            <h4 className="text-xl font-medium text-gray-700">{tag}</h4>
            <KeyboardDoubleArrowRight />
            <h4 className="text-xl font-medium text-gray-700">{description}</h4>
        </div>
    );
}