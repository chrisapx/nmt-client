import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Close, PendingSharp, Verified } from "@mui/icons-material";
import { getAuthUser, getUserToken } from "../../../components/utils/AuthCookiesManager";
import CategoryTreeSelect from "../elements/CategorytreeSelect";
import { api_urls } from "../../../utils/ResourceUrls";
import LoaderIcon from "../../../global/LoaderIcon";
const user = getAuthUser();
const token = getUserToken();

const ProductForm = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [userManual, setUserManual] = useState(null);
  const { control, handleSubmit, watch, formState: { errors }, trigger, reset, } = useForm({
    defaultValues: {
      name: "",
      description: "",
      globalPrice: "",
      price: "",
      stockCount: "",
      brand: "",
      vendorId: user?.fullName || user?.userId,
      store: "",
      approved: false,
      whatIsInTheBox: "",
      categoryId: "",
      details: [{ name: "", value: "" }],
      photos: [],
      videos: [],
      userManual: null,
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "details", });

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

  const handlePhotoSelect = (e) => {
    console.log("Selected files:", e.files);
    console.log("Existing photos:", photos);
    const files = Array.from(e.files);
    const uniqueFiles = files.filter(
      (file) => !photos.some((existing) => existing.name === file.name)
    );
    setPhotos((prev) => [...prev, ...uniqueFiles].slice(0, 10));
    console.log("Updated photos:", photos);
  };
  

  const handleVideoSelect = (e) => {
    const files = Array.from(e.files);
    const validVideos = files.filter(
      (file) =>
        (file.type.startsWith("video/") || file.type === "image/gif") &&
        videos.length < 3
    );
    setVideos((prev) => [...prev, ...validVideos].slice(0, 3));
  };

  const handleUserManualSelect = (e) => {
    const file = e.files[0];
    if (file?.type === "application/pdf") {
      setUserManual(file);
    } else {
      alert("Only PDF files are allowed for the user manual.");
    }
  };

  const handlePhotoRemove = (file) => {
    setPhotos((prev) => prev.filter((p) => p.name !== file.name));
  };

  const handleVideoRemove = (file) => {
    setVideos((prev) => prev.filter((v) => v.name !== file.name));
  };


  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Data", {data});
    const formData = new FormData();
    formData.append("product", JSON.stringify(data));
    photos.forEach((file) => formData.append("photos", file));
    videos.forEach((file) => formData.append("videos", file));
    if (userManual) {
      formData.append("userManual", userManual);
    }
    console.log("Payload", JSON.stringify(formData));
    // return;
  
    try {
        const response = await fetch(api_urls.items.upload, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      console.log(await response.json());
      if (response.ok) {
        setSuccess("Product uploaded successfully");
        console.log("Submission successful");
        reset();
        setPhotos([]);
        setVideos([]);
        setUserManual(null);
        setStep(1);
      } else {
        const error = await response.text();
        setError("Error here ", error);
        console.error("Error submitting form:", error.message || response.statusText);
      }
    } catch (error) {
        // if(error.message.contains("Duplicate")){
        //   setError("Product name or serial number already exists");
        // } else {
        // }
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

              <p className={`${!(error || success) && 'hidden'} ${error? 'text-red-500 bg-red-200' : 'text-green-500 bg-green-200'} p-5 rounded-lg flex justify-between`}>{ success ? 
                success.toString() : error.toString()} <span><Close className="cursor-pointer" onClick={() => {setError(""); setSuccess("");}}/></span></p>

              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="h-[80vh] overflow-y-auto">
                  <h3 className="sticky top-0 bg-white text-xl font-bold text-gray-500 py-8">Step 1: Basic Information</h3>
                  <div className="">
                    <div className="">
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Really? How can we display the product with no name😊" }}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2">Name</label>
                            <InputText {...field} className={`${errors.name ? "p-invalid" : ""} p-3 border`} placeholder="E.g Wireless apple charger" />
                            {errors.name && <small className="p-error">{errors.name.message}</small>}
                          </div>
                        )}
                      />
                    </div>

                    <div className="">
                      <Controller
                        name="stockCount"
                        control={control}
                        rules={{ required: "Product Stock count is highly wanted to track stock levels" }}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">Stock count</label>
                            <InputText {...field} className={`${errors.stockCount ? "p-invalid" : ""} p-3 border`} placeholder="How many pieces do you have in stock" />
                            {errors.stockCount && <small className="p-error">{errors.stockCount.message}</small>}
                          </div>
                        )}
                      />
                    </div>

                    <div className="">
                      <Controller
                        name="brand"
                        control={control}
                        rules={{ required: "Brand is required" }}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">Brand</label>
                            <InputText {...field} className= {`${errors.brand ? "p-invalid" : ""} p-3 border`} placeholder="E.g Apple"/>
                            {errors.brand && <small className="p-error">{errors.brand.message}</small>}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <Controller
                        name="description"
                        control={control}
                        rules={{ 
                          required: "Description is required",
                          validate: (value) => {
                            const lineCount = value.split("\n").length;
                            if (lineCount < 3) {
                              return "Let's make the description longer 😊 (at least 3 lines)";
                            }
                            if (lineCount > 10) {
                              return "Description is too long 😅 (maximum 10 lines)";
                            }
                            return true;
                          },
                        }}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">Description</label>
                            <InputTextarea {...field} className={`${errors.description ? "p-invalid" : ""} p-3 border`} placeholder="Give a simple 3-5 line description of key highlights on the product ..."/>
                            {errors.description && (
                              <small className="p-error">{errors.description.message}</small>
                            )}
                          </div>
                        )}
                      />
                    </div>

                    <div className="">
                      <Controller
                        name="whatIsInTheBox"
                        control={control}
                        rules={{ required: "Describe what is in the box" }}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">What is in the box</label>
                            <InputTextarea {...field} className={`${errors.whatIsInTheBox ? "p-invalid" : ""} p-3 border`} placeholder="What will the user find on opening the package? ..."/>
                            {errors.whatIsInTheBox && (
                              <small className="p-error">{errors.whatIsInTheBox.message}</small>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
    
              {/* Step 2: Pricing and Stock */}
              {step === 2 && (
                <div className="h-[80vh] overflow-y-auto">
                  <h3 className="sticky top-0 bg-white text-xl font-bold text-gray-500 py-8">Step 2: More details</h3>
                  <div className="max-h-[80vh] overflow-y-auto">
                    <div className="">
                      <Controller
                        name="globalPrice"
                        control={control}
                        rules={{ required: "Global price is required" }}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">Global Price</label>
                            <InputText {...field} className={`${errors.globalPrice ? "p-invalid" : ""} p-3 border`} placeholder="Price on the overall market"/>
                            {errors.globalPrice && (
                              <small className="p-error">{errors.globalPrice.message}</small>
                            )}
                          </div>
                        )}
                      />
                    </div>
                    <div className="col-12 md:col-6">
                      <Controller
                        name="price"
                        control={control}
                        rules={{ required: "Price is required" }}
                        render={({ field }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">Price</label>
                            <InputText {...field} className={`${errors.price ? "p-invalid" : ""} p-3 border`} placeholder="Price you are selling it at"/>
                            {errors.price && <small className="p-error">{errors.price.message}</small>}
                          </div>
                        )}
                      />
                    </div>
                  
                    <div>
                      <Controller
                        name="categoryId"
                        control={control}
                        rules={{ required: "Please select a category" }}
                        render={({ field, fieldState: { error } }) => (
                          <div className="flex flex-col">
                            <label className="font-[500] pb-2 pt-4">Category</label>
                            <CategoryTreeSelect
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                            {error && <small className="p-error">{error.message}</small>}
                          </div>
                        )}
                      />
                    </div>

                    <div className="">
                      <label className="font-[500] pb-2 pt-6">Details</label>
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2 mt-4">
                          <Controller
                            name={`details[${index}].name`}
                            control={control}
                            render={({ field }) => (
                              <InputText {...field} placeholder="Name" className="flex-1 p-3 border" />
                            )}
                          />
                          <Controller
                            name={`details[${index}].value`}
                            control={control}
                            render={({ field }) => (
                              <InputText {...field} placeholder="Value" className="flex-1 p-3 border" />
                            )}
                          />
                          <Button
                            type="button"
                            icon="pi pi-minus"
                            className="p-button-danger"
                            title="Remove"
                            onClick={() => remove(index)}
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        label="Add Detail"
                        title="Add more details"
                        icon="pi pi-plus"
                        className="p-2 mt-2 border text-xs text-gray-700"
                        onClick={() => append({ name: "", value: "" })}
                      />
                    </div>
                  </div>
                </div>
              )}
    
              {/* Step 3: Details and Files */}
              {step === 3 && (
                <div className="h-[80vh] overflow-y-auto">
                  <h3 className="sticky top-0 bg-white text-xl font-bold text-gray-500 py-8">Step 3: Product Files</h3>
                  <div className="max-h-[70vh] overflow-auto">
                    <div>
                      <label>Photos (Max 10) *</label>
                      <FileUpload
                        name="photos"
                        mode="advanced"
                        className=""
                        chooseOptions={() => {<></>}}
                        multiple={true}
                        customUpload
                        onClear={() => setPhotos([])}
                        accept="image/*"
                        maxFileSize={1000000}
                        onSelect={handlePhotoSelect}
                        onRemove={(e) => handlePhotoRemove(e.file)}
                      />
                      {photos.length > 0 && <p>{photos.length} photos added</p>}
                    </div>
                    <div>
                      <label>Videos (Max 3) (Optional)</label>
                      <FileUpload
                        name="videos"
                        mode="advanced"
                        multiple
                        customUpload
                        onClear={() => setVideos([])}
                        accept="video/*,image/gif"
                        maxFileSize={5000000}
                        onSelect={handleVideoSelect}
                        onRemove={(e) => handleVideoRemove(e.file)}
                      />
                      {videos.length > 0 && <p>{videos.length} videos added</p>}
                    </div>
                    <div>
                      <label>User Manual (PDF) *</label>
                      <FileUpload
                        name="userManual"
                        mode="advanced"
                        customUpload
                        onClear={() => setUserManual(null)}
                        accept="application/pdf"
                        maxFileSize={2000000}
                        onSelect={handleUserManualSelect}
                      />
                      {userManual && <p>{userManual.name} selected</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Preview Information */}
              {step === 4 && (
                <div className="h-[70vh] overflow-y-auto px-6 py-4 bg-white rounded-md shadow-md">
                  <h3 className="sticky top-0 bg-white text-xl font-bold text-gray-700">Step 4: Preview Information</h3>
                  <p className="text-gray-600">
                    Review the information you have provided in the previous steps. If everything looks good, you can proceed to the next step.
                  </p>
                  <div className="mt-4  h-[70vh] overflow-y-auto">
                    {/* Add preview details */}
                    <div className="border-t border-gray-300 mt-4 pt-4">
                      <h4 className="text-lg font-semibold text-gray-700">Summary:</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        <li className="truncate"><strong>Name:</strong> {formData.name || "N/A"}</li>
                        <li className="truncate"><strong>Description:</strong> {formData.description || "N/A"}</li>
                        <li className="truncate"><strong>Global Price:</strong> {formData.globalPrice || "N/A"}</li>
                        <li className="truncate"><strong>Price:</strong> {formData.price || "N/A"}</li>
                        <li className="truncate"><strong>Stock Count:</strong> {formData.stockCount || "N/A"}</li>
                        <li className="truncate"><strong>Brand:</strong> {formData.brand || "N/A"}</li>
                        {/* <li className="truncate"><strong>Serial Number:</strong> {formData.serialNumber || "N/A"}</li> */}
                        <li className="truncate"><strong>Vendor ID:</strong> {formData.vendorId || "N/A"}</li>
                        <li className="truncate"><strong>Store:</strong> {formData.store || "N/A"}</li>
                        <li className="truncate"><strong>Approved:</strong> {!formData.approved ? <Verified className="text-green-600"/> : <PendingSharp className="text-orange-600"/>}</li>
                        <li className="truncate"><strong>What's In The Box:</strong> {formData.whatIsInTheBox || "N/A"}</li>
                        <li className="truncate"><strong>Category ID:</strong> {formData.categoryId || "N/A"}</li>
                        <li className="truncate"><strong>Details:</strong>
                          <ul className="list-disc pl-5">
                            {formData.details && formData.details.length > 0 ? (
                              formData.details.map((detail, index) => (
                                <li key={index} className="ml-8"><strong>{detail.name}:</strong> {detail.value || "N/A"}</li>
                              ))
                            ) : (
                              <li>N/A</li>
                            )}
                          </ul>
                        </li>
                        <li><strong>Photos:</strong> {photos && photos.length > 0 ? 
                          <section className="flex gap-3 items-center m-4 flex-wrap">
                            { photos.map((photo, index) => {
                              const toggleFullScreen = (e) => {
                                const imgElement = e.target;
                              
                                if (!document.fullscreenElement) {
                                  imgElement.requestFullscreen();
                                } else {
                                  document.exitFullscreen();
                                }
                              };
                              
                              return <img onClick={toggleFullScreen} key={index} width={60} height={60} src={URL.createObjectURL(photo)} alt={photo.name} />;
                            }) }
                          </section>
                          : "N/A"}</li>

                        <li><strong>Videos:</strong> {videos && videos.length > 0 ? videos.join(", ") : "N/A"}</li>
                        <li><strong>User Manual:</strong> {userManual ? userManual.name : "N/A It is required though" }</li>
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
                {(step < 3) && (
                  <Button type="button" label="Next" icon="pi pi-arrow-right" className="p-2 text-sm bg-red-400 text-white border border-gray-300" onClick={nextStep} />
                )}
                {step === 3 && <Button type="button" label="Preview" className="px-8 text-sm bg-red-400 text-white border border-gray-300" onClick={nextStep}/>}
                {step === 4 && 
                  <Button 
                    disabled={loading}
                    type="submit"
                    icon={loading && <LoaderIcon color={'white'}/>} 
                    label={loading ? null : "Submit"} 
                    className="bg-red-500 py-3 px-8 text-white"/>

                  // <Button type="submit" label="Submit" className="px-8 text-sm bg-red-400 text-white border border-gray-300" />
                }
              </div>
            </form>
          ))}
        ></Dialog>
    </div>
  );
};

export default ProductForm;