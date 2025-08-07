import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { ContainerLayout } from "../layout";
import { Button } from "../ui";

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
