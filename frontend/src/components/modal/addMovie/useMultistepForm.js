import { useState } from 'react'

export const useMultistepForm = steps => {
    const [currentStep, setCurrentStep] = useState(0)
    const next = () => {
        setCurrentStep(currentStep + 1)
    }
    const prev = () => {
        setCurrentStep(currentStep - 1)
    }
    const goTo = index => {
        setCurrentStep(index)
    }

    return {
        currentStep,
        step: steps[currentStep],
        steps,
        next,
        prev,
        goTo,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === steps.length - 1,
    }
}
