import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSearchParams } from "react-router-dom";
import LoaderIcon from "../../../global/LoaderIcon";
import { useAuthDialog } from "../../../hooks/useAuthDialog";
import { showToast } from "../../../global/Toast";
import { api_urls } from "../../utils/ResourceUrls";
import { getAuthUser, setAuthUser } from "../../utils/AuthCookiesManager";
const user = getAuthUser();
console.log(user);

const FormSchema = z.object({
  fullName: z.string().min(2, { message: "Make the name longer" }),
  email: z.string().email({ message: "Invalid email address." }),
  address: z.object({
    street: z.string().min(1, { message: "Street is required." }),
    city: z.string().min(1, { message: "City is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    state: z.string().min(1, { message: "Region is required." }),
    zip: z.string().min(1, { message: "Postal Code is required." }),
  }),
});

export function EditProfile() {
  const { openDialog, handleClose } = useAuthDialog();
  const [searchParams] = useSearchParams();
  const editIndex = searchParams.get("p_edit_index");
  console.log(editIndex);
  const [currentStep, setCurrentStep] = useState(editIndex || 1);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
      address: {
        street: user?.address?.street,
        state: user?.address?.state,
        city: user?.address?.city,
        country: user?.address?.country,
        zip: user?.address?.zip
      }
    },
  });

  const _handleSubmit = async (data) => {
    setIsLoading(true);
    if(!trigger()){
      return;
    }
    try{
      const _email = data.email;
      const response = await fetch(api_urls.users.edit_profile(_email), {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if(response.ok){
        reset();
        const data = await response.json();
        setAuthUser(data);
        console.log(data);
        showToast("Profile info updates successfully", "success");
        handleClose();
        window.location.reload();
      } else {
          showToast((await response.text()).toString(), "error");
      }
      
    } catch (error) {
        showToast(error.message, "error");
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleNextStep = async () => {
    const valid = await trigger(["fullName", "email"]);
    if (valid) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  return (
    <form onSubmit={handleSubmit(_handleSubmit)} className="w-full py-6">
      <div className="text-center">
        <p className="font-[600] text-xl">Edit your profile</p>
      </div>

      <div className="grid grid-cols-2 gap-6 my-4">
        <p className="h-1 bg-[#6CAFE6] rounded-full"></p>
        <p className={`h-1 rounded-full ${currentStep == 2 ? 'bg-[#6CAFE6]' : 'bg-gray-300'}`}></p>
      </div>

      { currentStep == 1 && (
        <>
          <p className="font-bold border-b mb-2 pb-1">Personal details</p>
          <div className="grid grid-cols-1 gap-y-3">

            <div className="col-span-2">
              <label className="block mb-1 font-medium text-sm">Email</label>
              <InputText 
                type="email"
                disabled
                placeholder="email.name@example.com"
                {...register("email")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="block mb-1 font-medium text-sm">Full Name</label>
              <InputText 
                type="text"
                placeholder="joe Doe"
                {...register("fullName")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">{errors.fullName.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <Button onClick={handleNextStep} label="Next" className="mt-4 w-full bg-red-500 flex text-white rounded-lg py-2 font-semibold"/>      
            </div>
          </div>
        </>
      )}

      { currentStep == 2 && (
        <>
          <p className="font-bold border-b mb-2 pb-1">Address details</p>
          <div className="w-full grid grid-cols-2 gap-y-3 gap-x-2">
            <div className="col-span-2">
              <label className="block mb-1 font-medium text-sm">Street</label>
              <InputText
                type="text"
                placeholder="e.g., Plot 24 Kampala Rd"
                {...register("address.street")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.address?.street && (
                <p className="text-red-500 text-xs">{errors.address.street.message}</p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">Country</label>
              <InputText
                type="country"
                placeholder="e.g., Uganda"
                {...register("address.country")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.address?.country && (
                <p className="text-red-500 text-xs">{errors.address.country.message}</p>
              )}
            </div>
            
            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">City</label>
              <InputText
                type="text"
                placeholder="e.g., Kampala"
                {...register("address.city")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.address?.city && (
                <p className="text-red-500 text-xs">{errors.address.city.message}</p>
              )}
            </div>
            
      
            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">Zip Code</label>
              <InputText
                type="text"
                placeholder="e.g., 256"
                {...register("address.zip")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.address?.zip && (
                <p className="text-red-500 text-xs">{errors.address.zip.message}</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="block mb-1 font-medium text-sm">Region</label>
              <InputText
                type="text"
                placeholder="e.g., Central"
                {...register("address.state")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.address?.state && (
                <p className="text-red-500 text-xs">{errors.address.state.message}</p>
              )}
            </div>

            {/* <div className="col-span-2">
              <label className="block mb-1 font-medium text-sm">Address decription</label>
              <InputText
                type="text"
                placeholder="e.g., In Nakawa near the URA building"
                {...register("address.description")}
                className="border-gray-200 shadow-none rounded-lg w-full border-2 px-3 py-2 placeholder:text-md focus-within:border-[#6CAFE6] hover:border-[#6CAFE6]"
              />
              {errors.address?.postalCode && (
                <p className="text-red-500 text-xs">{errors.address.postalCode.message}</p>
              )}
            </div> */}

            
            <div className="col-span-2 flex gap-2 mt-2">
              <Button
                disabled={isLoading}
                icon={<i className="pi pi-angle-left"/>}
                onClick={handlePreviousStep}
                className="text-black border-2 font-medium rounded-[8px] py-3 "
              />
              <Button
                type="submit"
                
                disabled={isLoading}
                className={`bg-red-500 flex-1 text-white rounded-[8px] py-2 px-3`}
                label={ isLoading ? <LoaderIcon color={'black'}/> : "Save"}
              />
            </div>
          </div>
        </>
      )}
    </form>
  );
}