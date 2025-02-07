import React, { useState, useEffect } from "react";
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

const verifyResetCodeSchema = z.object({
  otp: z.string().length(5, { message: "OTP must be 5 characters" }),
});

export function VerifyResetCode() {
  const { openDialog } = useAuthDialog();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingToken, setIsResendingToken] = useState(false);
  const [resent, setResent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: {
      otp: "",
    },
  });

  const _handleSubmit = async (data) => {
    setIsLoading(true);
    const _email = searchParams.get("u_email") || "";
    const isValid = await trigger();
    if (!isValid) return;

    try{
      const response = await fetch(api_urls.users.verify(_email, data.otp), {
          method: 'PATCH',
      });
      const res = await response.text();
      console.log(res)
      if(response.ok){
        const params = [
          { key: "u_email", value: _email },
        ];
        showToast("Approved 🎉", "success");
        setTimeout(() => {
          openDialog(dialog_operations.reset_password, params);
        }, 2000);
      } else {
        showToast(res, "error");
      }
    } catch( error ) {
      showToast(error.message, "error")
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendToken = async () => {
    setIsResendingToken(true);
    const _email = searchParams.get("u_email") || "";
    if(_email === null || _email === ""){
      showToast("Your email is missing, contact support", "warning");
      setIsResendingToken(false);
      return;
    }

    try{
      const response = await fetch(api_urls.users.resend_token(_email, "r"), {
          method: 'POST',
      });
      if(response.ok){
        showToast("Token re-sent to your email address " + _email, "success");
        setResent(true);
      }
    } catch( error ) {
      showToast(error.message, "error")
    } finally {
      setIsResendingToken(false);
    }
  }

  const handleBackToLogin = () => {
    openDialog(dialog_operations.login);
  };

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-8">
      <>
        <h2 className="text-left font-bold text-xl">Verify Password Reset Code</h2>
        <p className="flex items-center gap-3 text-xs text-gray-300">
          Enter the Code sent to your email. 
          {resent ?
            <span className="text-green-600">Resent</span>
          :
            <span onClick={handleResendToken} className="text-blue-600">{isResendingToken ? <LoaderIcon/> : "Resend token"}</span>
          }
        </p>
        <div className="my-6">
          <label className="block mb-1 font-medium text-sm">Enter OTP</label>
          <InputText
            type="number"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="e.g. 23232"
            {...register("otp")}
            className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-500 text-white rounded-lg py-2 font-semibold"
          label={isLoading ? <LoaderIcon color={"black"} /> : "Verify"}
        />
      </>
    </form>
  );
}