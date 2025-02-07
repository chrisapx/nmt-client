import { Sidebar } from "primereact/sidebar";
import { useAuthDialog } from "../../hooks/useAuthDialog";
import { dialog_operations } from "../utils/constansts/DialogOperations";
import { Login } from "./auth_forms/LogIn";
import { SignUp } from "./auth_forms/SignUp";
import { VerifyAccount } from "./auth_forms/VerifyAccount";
import VerificationStatus from "./auth_forms/VerificationStatus";
import { SendPasswordResetEmail } from "./auth_forms/SendResetLink";
import { ResetPassword } from "./auth_forms/ResetPassword";
import { VerifyResetCode } from "./auth_forms/VerifyResetCode";

export default function AuthDrawer() {
  const { dialogOpen, operation, handleClose } = useAuthDialog();
  
  return (
    <div className="flex justify-center items-center w-full">
      <Sidebar
        position="bottom"
        visible={dialogOpen}
        onHide={handleClose}
        className="rounded-t-3xl h-[70vh] w-[100vw]"
        content={() => (
          <div className="bg-white rounded-3xl w-full md:w-[32vw] overflow-auto">
            <div className="flex justify-center mt-2">
              <p className="h-1.5 w-16 px-4 rounded-xl bg-gray-400"></p>
            </div>
            <div
              className="cursor-pointer pi pi-times text-sm absolute justify-between right-3 top-3"
              title="Close"
              onClick={handleClose}
            />

            <section className="px-8">
              {operation === dialog_operations.login && <Login />}
              {operation === dialog_operations.signup && <SignUp />}
              {operation === dialog_operations.verify && <VerifyAccount />}
              {operation === dialog_operations.verify_reset_code && <VerifyResetCode />}
              {operation === dialog_operations.reset_email && <SendPasswordResetEmail />}
              {operation === dialog_operations.reset_password && <ResetPassword />}
              {operation === dialog_operations.verification_status && <VerificationStatus/>}

            </section>

          </div>
        )}
      />
    </div>
  );
}