import { useBundle } from "../../context/BundleContext";
import AccordionStep from "./AccordionStep";

export default function Builder() {
  const { state, dispatch, data } = useBundle();

  const handleToggle = (stepIndex: number) => {
    dispatch({
      type: "SET_STEP",
      payload: state.activeStep === stepIndex ? -1 : stepIndex,
    });
  };

  const handleNext = (stepIndex: number) => {
    if (stepIndex < data.steps.length - 1) {
      dispatch({ type: "SET_STEP", payload: stepIndex + 1 });
    }
  };

  return (
    <div className="bg-white rounded-[10px] overflow-hidden">
      <h1 className="lg:hidden text-center text-[32px] font-bold text-[#1F1F1F] pt-6 pb-2 tracking-[-0.06px]">
        Let's get started!
      </h1>
      {data.steps.map((step, index) => (
        <AccordionStep
          key={step.id}
          step={step}
          isActive={state.activeStep === index}
          onToggle={() => handleToggle(index)}
          onNext={() => handleNext(index)}
        />
      ))}
    </div>
  );
}
