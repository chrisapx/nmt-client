import React from "react";
import { ErrorOutline } from "@mui/icons-material";
import { Button } from "primereact/button";
import { useSearchParams } from "react-router-dom";
import { useAuthDialog } from "../../../hooks/useAuthDialog";
import { dialog_operations } from "../../utils/constansts/DialogOperations";

function VerificationStatus() {
  const { openDialog } = useAuthDialog();
  const [urlParams, setUrlParams] = useSearchParams();
  const email = urlParams.get("u_email");
  const status = urlParams.get("acc_status");
  const errorMessage = urlParams.get("error_message");

  const handleLogin = () => {
    openDialog(dialog_operations.login);
  };

  const handleGenerateNewOtp = () => {
    const newParams = new URLSearchParams(urlParams);
    newParams.set("u_email", email || "");
    setUrlParams(newParams);
    openDialog(dialog_operations.verify);
  };

  return (
    <div className="py-9">
      <div className="flex flex-col justify-center gap-2">
        {status === "success" ? (
          <>
            <div className="bg-[#ECF8EF] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
              <div className="bg-[#3DA755] flex justify-center items-center w-10 h-10 p-3 rounded-full">
                <i className="pi pi-check text-white font-bold"></i>
              </div>
            </div>
            <p className="text-md text-center font-bold">
              Your account has been successfully verified!
            </p>
            <p className="text-xs font-medium text-center">
              You can now log in to your account.
            </p>
            <Button
              onClick={handleLogin}
              label="Sign In"
              className="text-white bg-red-500 rounded-md py-3 mt-16"
            />
          </>
        ) : (
          <>
            <div className="bg-[#FDECEC] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
              <div className="bg-[#EE443F] flex justify-center items-center w-10 h-10 p-3 rounded-full">
                <ErrorOutline className="text-white w-5 h-5" />
              </div>
            </div>
            <p className="text-xs font-medium text-center">
              Error verifying your nalmart account
            </p>
            <p className="text-md text-center font-bold">
              {errorMessage || "Your OTP is expired!"}
            </p>
            <p className="text-xs font-medium text-center">Generate a new OTP.</p>
            {!errorMessage && <p className="text-xs font-medium text-center">Contact Support</p>}

            <Button
              onClick={handleGenerateNewOtp}
              className="flex items-center justify-center gap-2 mt-16 text-[#2F91D7] bg-white border-[#2F91D7] rounded-[58px]"
            >
              <span>Generate</span>
              <i className="pi pi-arrow-up-right text-xs"></i>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default VerificationStatus;