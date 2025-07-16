import ContainerLayout from "@/layout/ContainerLayout";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const GoBackButtonSection = () => {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <ContainerLayout size="sm" className="mt-4 mb-8">
      <Button
        onClick={handleGoBack}
        ariaLabel="Go back to previous page button"
        title="Back"
        icon={<ChevronLeft size={14} />}
        className="text-sm"
        variant="ghost"
      />
    </ContainerLayout>
  );
};

export default GoBackButtonSection;
