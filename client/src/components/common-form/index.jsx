import { initialOtherSignUpFormData } from "@/config";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
import FormControls from "./form-controls";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";


function CommonForm({
  pageLocation,
  handleSubmit,
  buttonText = "Submit",
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
  
  // loading,
}) {
  console.log("Form data : ", formData)

  const {
      loading
    } = useContext(AuthContext);

  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        pageLocation={pageLocation}
        buttonText={buttonText}
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={loading | isButtonDisabled} type="submit" className="mt-5 w-full">
        {loading? "Loading..." : buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;
