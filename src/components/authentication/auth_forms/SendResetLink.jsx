import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSearchParams } from "react-router-dom";
import LoaderIcon from "../../../global/LoaderIcon";
import { useAuthDialog } from "../../../hooks/useAuthDialog";
import { dialog_operations } from "../../utils/constansts/DialogOperations";
import { showToast } from "../../../global/Toast";
import { api_urls } from "../../utils/ResourceUrls";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export function SendPasswordResetEmail() {
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
    resolver: zodResolver( forgotPasswordSchema ),
    defaultValues: {
      email: searchParams.get('u_email') || "",
    },
  });

  const _handleSubmit = async (data) => {
    if(!trigger()){
      return;
    }
    setIsLoading(true);

    try{
      const response = await fetch(api_urls.users.resend_token(data.email, "r"), {
          method: 'POST',
      });
      if(response.ok){
        showToast( "Code sent to your email address " + data.email, "success");
        setTimeout(() => {
          openDialog(dialog_operations.verify_reset_code, [{key: "u_email", value: data.email}]);
        }, 1500)
      } else {
        showToast( await response.text(), "error")
      }
    } catch( error ) {
      showToast(error.message, "error")
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    openDialog(dialog_operations.login);
  };

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-8">
        <>
          <h2 className="text-left font-bold text-xl">
            Get password reset code
          </h2>
          <p className="text-xs text-[#62636C]">
            We’ll email you a code to reset your password.
          </p>
          <div className="my-6">
            <label className="block mb-1 font-medium text-sm">Email</label>
            <InputText
              type="email"
              placeholder="doe@example.com"
              {...register("email")}
              className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <Button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-500 flex text-white rounded-lg py-2 font-semibold`}
              label={ isLoading ? <LoaderIcon color={'black'}/> : "Generate Code"}
            />
          <p
            className="text-sm text-center mt-3 text-[#1D84C9] cursor-pointer"
            onClick={handleBackToLogin}
          >
            Back to Sign In
          </p>
        </>
    </form>
  );
}