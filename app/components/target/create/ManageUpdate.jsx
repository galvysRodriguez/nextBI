"use client"
import { useEffect } from "react"
import { useTargetForm } from "../../context/FormTarget"
import { useTargetId } from "../../hooks/useTargetId"
import StepForm from "./SectionFormTarget"



export function ManageUpdate({isCreate, activeStep, id}){
    const {data:target } = useTargetId(id)
    const {setFullFormData} = useTargetForm()

    useEffect(()=>{
        setFullFormData(target)
    }, [])
     return (
        <>
            <StepForm isCreate={isCreate} initialStep={activeStep}></StepForm>
        </>
    )
}