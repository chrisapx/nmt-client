import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Check, TriangleAlert } from "lucide-react";
import { useState } from "react";

function VerificationSuccess() {
  const [visible, setVisible] = useState(true);
  const [success, setIsSuccess] = useState(false);

  return (
    <div className="card flex justify-center">
      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="flex flex-col justify-center gap-2">
          {success ? (
            <>
              <div className="bg-[#ECF8EF] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
                <div className="bg-[#3DA755] flex   justify-center items-center w-10 h-10 p-3 rounded-full">
                  <Check className="text-white w-5 h-5" />
                </div>
              </div>
              <span>Your account has been successfully verified!</span>

              <span>You can now log in to your account.</span>

              <Button 
                icon={<i className="pi-arrow-up"></i>}
                label="Sign In"
                className="flex items-center text-white bg-[#2F91D7] rounded-[58px]"
              />
            </>
          ) : (
            <>
              <div className="bg-[#FDECEC] w-16 h-16 rounded-full mx-auto flex justify-center items-center">
                <div className="bg-[#EE443F] flex   justify-center items-center w-10 h-10 p-3 rounded-full">
                  <TriangleAlert className="text-white w-5 h-5" />
                </div>
              </div>
              <span>This link has expired or is already used.</span>

              <span>Request a new verification link if needed.</span>

              <Button className="flex items-center text-[#2F91D7] bg-white border-[#2F91D7] rounded-[58px]">
                <span>Resend Verification Link</span>

                <i className="pi-arrow-up-right"></i>
              </Button>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default VerificationSuccess;
