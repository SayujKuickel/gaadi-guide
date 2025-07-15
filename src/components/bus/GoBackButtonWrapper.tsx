import ContainerLayout from "@/layout/ContainerLayout";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const GoBackButtonSection = () => {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <ContainerLayout size="sm" className="mt-2 mb-6">
      <Button
        onClick={handleGoBack}
        ariaLabel="Go back to previous page button"
        title="Back"
        iconStyle="fi fi-rr-angle-small-left"
        className="text-sm"
        variant="ghost"
      />
    </ContainerLayout>
  );
};

export default GoBackButtonSection;
