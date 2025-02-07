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

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export function AdminLogin() {
  const { openDialog, handleClose } = useAuthDialog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: zodResolver( loginSchema ),
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
    showToast("Log in test passed", "error")
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
    }, 3000)
    console.log("Form Data:", data);
  };

  const handleForgotPassword = () => {
    openDialog(dialog_operations.reset_email);
  };

  const handleContinueWithGoogle = () => {
    openDialog(dialog_operations.verification_status)
    confirm("Continuing with google");
    console.log("Logged in with googlr");
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  
  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-8">
        <>
          <div className="grid gap-3">
            <div className="text-center">
              <p className="font-[600] text-xl">Welcome</p>
              <p className="flex gap-2 justify-center">
                <span className="text-gray-500 text-xs">No account yet? </span>
                <p onClick={() => openDialog(dialog_operations.signup) } className="font-medium text-xs text-blue-400 hover:text-blue-700 cursor-pointer">Signup</p>
              </p>
            </div>
            <div className="">
              <label className="block mb-1 font-medium text-sm">Email</label>
              <InputText
                type="email"
                placeholder="name@domain.com"
                {...register("email")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="">
              <label className="block mb-1 font-medium text-sm">Password</label>
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
                  { passwordVisible ? <i className="pi pi-eye" /> : <i className="pi pi-eye-slash" />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <Button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-red-400 flex text-white rounded-lg py-2 mt-3 font-semibold`}
                label={ isLoading ? <LoaderIcon color={'black'}/> : "Sign In"}
              />
            <div className="flex justify-center text-sm text-[#1D84C9]">
              <p
                className="cursor-pointer"
                onClick={handleForgotPassword}
              >
                Forgot your password?
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
                <span className="text-lg font-normal text-[#80828D]">
                  or
                </span>
                <span className="border h-1 border-b-0 border-l-0 border-r-0 grow"></span>
              </div>
              <button onClick={handleContinueWithGoogle} className="flex items-center border border-[#CDCED7] rounded-[8px] py-2 w-full">
                <div className="w-6 h-6 object-cover mx-6">
                  <img src="/icons/google.png" alt="Google" />
                </div>
                <p className="font-medium flex-1 text-center">Continue with Google</p>
              </button>
            </div>
          </div>
        </>
    </form>
  );
}