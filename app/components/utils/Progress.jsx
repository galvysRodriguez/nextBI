import Image from "next/image";
import { LOGO_AFTIM } from "./const";

export default function Progress() {
  return (
    <>
       <div className="relative flex items-center justify-center w-full h-screen bg-gray-100">
        <div
          className="absolute w-48 h-48 bg-gray-400 opacity-25 rounded-[35%] animate-spin-slow"
          style={{
            transform: "scale(1.19168) rotate(258.761deg) translateZ(0px)",
          }}
        />

        <div
          className="absolute w-36 h-36 bg-white-600 opacity-100 rounded-[25%] animate-spin-slow"
          style={{
            transform: "scale(1.0082) rotate(11.2387deg) translateZ(0px)",
          }}
        />

        <div className="absolute flex items-center justify-center animate-spin z-10">
          <Image src={LOGO_AFTIM} alt="APP LOGO" width={100} height={100} />
        </div>
        <div className="mt-24 pt-40">
          <p>Procesando operación, por favor espere</p>
        </div>
      </div>
    </>
  )
}
