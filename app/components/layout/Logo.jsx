import Image from "next/image"
import { LOGO_AFTIM } from "../utils/const"

export function Logo(){
    return(
        <Image src={LOGO_AFTIM} alt="logo" width={42} height={42} />
    )
}