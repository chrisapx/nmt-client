import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Close } from "@mui/icons-material";
import { getAuthUser, getUserToken } from "../../../components/utils/AuthCookiesManager";
import { api_urls } from "../../../utils/ResourceUrls";
import CategoryTreeSelect from "../elements/CategorytreeSelect";
import LoaderIcon from "../../../global/LoaderIcon";
import { InputTextarea } from "primereact/inputtextarea";
const user = getAuthUser();
const token = getUserToken();

const CategoriesForm = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [subCategory, SetSubCategory] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { control, handleSubmit, watch, formState: { errors }, trigger, reset, } = useForm({
    defaultValues: { parentCategoryId: "", name: "", description: "", },
  });
  // const { fields, append, remove } = useFieldArray({ control, name: "details", });

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Data", {data});

    let payload = subCategory ? 
      data : { name: data.name, description: data.description };
    
    try {
        const response = await fetch(api_urls.items.categories.upload, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        setSuccess( data.name + " uploaded successfully");
        console.log("Submission successful");
        setStep(1);
        reset();
      } else {
        const error = await response.text();
        setError(error);
        console.error("Error submitting form:", error.message || response.statusText);
      }
    } catch (error) {
        setError(error.message);
        console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const formData = watch();

  return (
    <div className="card flex justify-center">
        <Dialog
          visible={visible}
          style={{ width: "60vw" }}
          onHide={() => {if (!visible) return; setVisible(false); }}
          position="top"
          content={(({ hide }) => (
            <form onSubmit={handleSubmit(onSubmit)} className="px-12 py-5 bg-white rounded-lg">

              <div className="absolute right-3 top-3">
                <Close className="cursor-pointer" title="Close" onClick={() => { reset(); hide();  }} />
              </div>

              <div className="flex gap-6 pb-4">
                <input
                      type="checkbox"
                      checked={subCategory}
                      onChange={() => SetSubCategory(!subCategory)}
                    />
                    <span className={`${subCategory ? '' : 'text-gray-400'}`}>SubCategory</span>
              </div>
              {!subCategory && <small className="text-red-400">Check box to add sub category</small>}

              <p className={`${!(error || success) && 'hidden'} ${error? 'text-red-500 bg-red-200' : 'text-green-500 bg-green-200'} p-5 rounded-lg flex justify-between`}>{ success ? 
                success.toString() : error.toString()} <span><Close className="cursor-pointer" onClick={() => {setError(""); setSuccess("");}}/></span></p>
    
              {step === 1 && (
                <div className=" overflow-y-auto">
                  <h3 className="sticky top-0 bg-white text-xl font-bold text-gray-500 py-8">{ subCategory ? "Sub Category form" : "Category form"}</h3>
                  <div className="max-h-[80vh] overflow-y-auto">
                    { subCategory && <div>
                      <Controller
                        name="parentCategoryId"
                        control={control}
                        rules={{ required: "Please select the parentCategory" }}
                        render={({ field, fieldState: { error } }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">Parent Category</label>
                            <CategoryTreeSelect
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                            {errors.parentCategoryId && <small className="p-error">{errors.parentCategoryId.message}</small>}
                          </div>
                        )}
                      />
                    </div>}
                    <div className="col-12 md:col-6">
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "We can't store a category with no name" }}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">Name</label>
                            <InputText {...field} className={`${errors.name ? "p-invalid" : ""} p-3 border`} placeholder="Which category do you want added?"/>
                            {errors.name && <small className="p-error">{errors.name.message}</small>}
                          </div>
                        )}
                      />
                    </div>
                    <div className="">
                      <Controller
                        name="description"
                        control={control}
                        rules={{ required: "A short description is needed" }}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">Description</label>
                            <InputTextarea {...field} className={`${errors.description ? "p-invalid" : ""} p-3 border`} placeholder="Briefly describe what the category will be about"/>
                            {errors.description && (
                              <small className="p-error">{errors.description.message}</small>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
    
              {/* Step 4: Preview Information */}
              {step === 2 && (
                <div className="h-[70vh] overflow-y-auto px-6 py-4 bg-white rounded-md shadow-md">
                  <h3 className="sticky top-0 bg-white text-xl font-bold text-gray-700">Step 2: Preview Information</h3>
                  <p className="text-gray-600 py-8">
                    Review the information you have provided in the previous steps. If everything looks good, you can proceed to submit.
                  </p>
                  <div className="mt-4 overflow-y-auto">
                    {/* Add preview details */}
                    <div className="border-t border-gray-300 mt-4 pt-4">
                      <h4 className="text-lg font-semibold text-gray-700">Summary:</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        <li className="truncate"><strong>Name:</strong> {formData.name || "N/A"}</li>
                        <li className="truncate"><strong>Description:</strong> {formData.description || "N/A"}</li>
                        { subCategory && <li className="truncate"><strong>Parent Category ID:</strong> {formData.parentCategoryId || "N/A"}</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

    
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-16">
                {(step > 1 )&& (
                  <Button type="button" label="Previous" icon="pi pi-arrow-left" className="p-2 text-sm bg-red-400 text-white border border-gray-300" onClick={prevStep} />
                )}
                {step === 1 && <Button type="button" label="Preview" className="px-8 py-2 text-sm bg-red-400 text-white border border-gray-300" onClick={nextStep}/>}
                {step === 2 && 
                  <Button 
                    disabled={loading}
                    type="submit"
                    icon={loading && <LoaderIcon color={'white'}/>} 
                    label={loading ? null : "Submit"} 
                    className="bg-red-500 py-3 px-8 text-white"/>
                }
              </div>
            </form>
          ))}
        ></Dialog>
    </div>
  );
};

export default CategoriesForm;