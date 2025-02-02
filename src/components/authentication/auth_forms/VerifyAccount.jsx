import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import CardLoadingSpinner from "../../global/CardLoadingSpinner";
import { useAuthDialog } from "../../../utils/hooks/useAuthDialog";
import { dialog_operations } from "../../../utils/constansts/DialogOperations";
import { useSearchParams } from "react-router-dom";

const verifyAccoutSchema = z.object({
  otp: z.string().length(5, { message: "Otp must be 5 characters" }),
});

export function VerifyAccount() {
  const { openDialog } = useAuthDialog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver( verifyAccoutSchema ),
    defaultValues: {
      email: searchParams.get('u_email') || "",
      otp: ""
    },
  });

  const _handleSubmit = (data) => {
    if(!trigger()){
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      openDialog(dialog_operations.reset_password);
    }, 3000)
    console.log("Form Data:", data);
  };

  const handleBackToLogin = () => {
    openDialog(dialog_operations.login);
  };

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-8">
        <>
          <h2 className="text-left font-bold text-xl">
            Reset your password
          </h2>
          <p className="text-xs text-[#62636C]">
            We’ll email you a link to reset your password.
          </p>
          <div className="my-6">
            <label className="block mb-1 font-medium text-sm">Enter Otp</label>
            <InputText
              type="otp"
              placeholder="e.g. 23232"
              {...register("otp")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm">{errors.otp.message}</p>
            )}
          </div>
          <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#2F91D7] flex text-white rounded-lg py-2 font-semibold`}
              label={ isLoading ? <CardLoadingSpinner color={'black'}/> : "Verify"}
            />
          {/* <p
            className="text-sm text-center mt-3 text-[#1D84C9] cursor-pointer"
            onClick={handleBackToLogin}
          >
            Back to Sign In
          </p> */}
        </>
    </form>
  );
}