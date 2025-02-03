import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import StepOne from "../components/StepOne.jsx";
import StepTwo from "../components/StepTwo.jsx";
import StepThree from "../components/StepThree.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

const steps = ["Personal Info", "Profile Customization", "Confirmation"];

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data) => {
    if (step === steps.length - 1) {
      try {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Registration failed");
        }

        alert("Profile Created Successfully!");
        navigate("/home");
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#081F35] via-[#94b2a9] to-[#081F35] flex justify-center items-center">
      <div className="w-full max-w-lg bg-[#081F35] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">{steps[step]}</h2>
        <ProgressBar step={step} steps={steps} />

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 0 && <StepOne register={register} errors={errors} />}
            {step === 1 && <StepTwo register={register} errors={errors} watch={watch} />}
            {step === 2 && <StepThree watch={watch} />}

            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 text-lg bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-200"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:from-blue-600 hover:to-blue-800 transition duration-200"
              >
                {step === steps.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default MultiStepForm;














