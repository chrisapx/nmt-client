import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import CardLoadingSpinner from "../../global/CardLoadingSpinner";
import { useAuthDialog } from "../../../utils/hooks/useAuthDialog";
import { dialog_operations } from "../../../utils/constansts/DialogOperations";
import { useSearchParams } from "react-router-dom";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  newpassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export function ResetPassword() {
  const { openDialog, handleClose } = useAuthDialog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver( resetPasswordSchema ),
    defaultValues: {
      email: searchParams.get('u_email') || "",
      password: "",
      newpassword: "",
    },
  });

  const _handleSubmit = (data) => {
    if(!trigger()){
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      openDialog(dialog_operations.login);
    }, 3000)
    console.log("Form Data:", data);
  };

  const handleBackToLogin = () => {
    openDialog(dialog_operations.login);
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  
  const toggleNewPasswordVisibility = () => setNewPasswordVisible((prev) => !prev);

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-8">
        <>
          <h2 className="text-left font-bold text-xl">
            Set your new password
          </h2>
          <p className="text-xs text-[#62636C]">
            Create a strong password for your account.
          </p>
          <div className="grid gap-4 mt-4">
            <div>
              <label className="block mb-1 font-medium text-sm">
                New Password
              </label>
              <div className="relative">
                <InputText
                  type={passwordVisible ? "text" : "password"}
                  placeholder="******"
                  {...register("password")}
                  className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
                <span
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <InputText
                  type={newPasswordVisible ? "text" : "password"}
                  placeholder="******"
                  {...register("newpassword")}
                  className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
                />
                <span
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={toggleNewPasswordVisibility}
                >
                  {newPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </span>
              </div>
              {errors.newpassword && (
                <p className="text-red-500 text-sm">
                  {errors.newpassword.message}
                </p>
              )}
            </div>
            <Button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#2F91D7] flex text-white rounded-lg py-2 font-semibold`}
                label={ isLoading ? <CardLoadingSpinner color={'black'}/> : "Set Password"}
              />
            <p
              className="text-sm text-center text-[#1D84C9] cursor-pointer"
              onClick={handleBackToLogin}
            >
              Back to Sign In
            </p>
          </div>
        </>
    </form>
  );
}