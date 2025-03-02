"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense, lazy } from "react";
import { Box } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { LogoCard } from "../CardTarget";
import { useTargetId } from "../../hooks/useTargetId";

const GaugeChart = lazy(() => import("../../chart/echart/Gauge"));
const TrafficChart = lazy(() => import("../../chart/echart/TrafficChart"));


async function fetchTargetById(id) {
    const data = [
        { id: "1", title: "Aumentar ventas 15%", perspective: "Finanzas", description: "Total de ventas", amount: 300, expected: 800, estimated: 700, gauge: 40, start: "23/10/2024", end: "28/12/2024", remaining: 5, duration: 5 },
        { id: "2", title: "Reducir costos 10%", perspective: "Operaciones", description: "Costos operativos", amount: 500, expected: 900, estimated: 750, gauge: 60, start: "10/09/2024", end: "20/11/2024", remaining: 15, duration: 10 }
    ];

    return data.find(target => target.id === id) || null;
}

export default function TargetDetailPage({ id }) {
    const [targetData, setTargetData] = useState(null);
    const {data:target} = useTargetId(id)
    console.log(id)
    console.log(target)

    useEffect(() => {
        if (id) {
            fetchTargetById(id).then(data => setTargetData(data));
        }
    }, [id]);

    return (
        <Suspense fallback={<LoadingSkeleton />}>
            {targetData ? <SectionDetailTarget data={targetData} /> : <LoadingSkeleton />}
        </Suspense>
    );
}

// Componente de esqueleto de carga
function LoadingSkeleton() {
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
function SectionDetailTarget({ data }) {
    return (
        <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-6 pt-12">
            <div className="flex gap-8">
                <TitleDetailTarget perspective={data.perspective} description={data.description} />
            </div>
            <div className="flex justify-center">
                <TitleTarget title={data.title} />
            </div>
            <div className="flex justify-center items-center gap-6 pt-2">
                <div className="flex flex-col gap-4">
                    <CardDetailTarget label="Valor obtenido" amount={`${data.amount}$`} />
                    <CardDetailTarget label="Valor esperado" amount={`${data.expected}$`} />
                    <CardDetailTarget label="Valor estimado" amount={`${data.estimated}$`} />
                </div>
                <Suspense fallback={<div className="w-64 h-64 bg-gray-300 rounded-full"></div>}>
                    <GaugeChart value={data.gauge} />
                </Suspense>
                <DateInfoTarget start={data.start} end={data.end} remaining={data.remaining} duration={data.duration} />
            </div>
            <div className="w-full h-156 pb-12">
                <Suspense fallback={<div className="w-full h-156 bg-gray-300 rounded-xl"></div>}>
                    <TrafficChart />
                </Suspense>
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
            <strong className="text-lg text-center text-gray-900">Periodo de tiempo</strong>
            <div className="flex flex-col gap-8 pt-8 text-gray-700">
                <p>Inicio: <span className="font-semibold">{start}</span></p>
                <p>Final: <span className="font-semibold">{end}</span></p>
                <p>Transcurrido: <span className="font-semibold">{duration}</span> días</p>
                <p>Restante: <span className="font-semibold">{remaining}</span> días</p>
            </div>
        </Box>
    );
}

// Componente para mostrar el título de la sección
function TitleTarget({ title }) {
    return <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>;
}

// Componente para mostrar los detalles del objetivo (perspectiva, descripción)
function TitleDetailTarget({ perspective, description }) {
    return (
        <div className="flex items-center gap-2">
            <LogoCard />
            <h4 className="text-xl font-medium text-gray-700">{perspective}</h4>
            <KeyboardDoubleArrowRight />
            <h4 className="text-xl font-medium text-gray-700">{description}</h4>
        </div>
    );
}