import Button from "@/components/common/Button";

interface UserLocationProps {
  isSearchingLocation: boolean;
  getUserLocation: () => void;
}

const UserLocation: React.FC<UserLocationProps> = ({
  isSearchingLocation,
  getUserLocation,
}) => {
  return (
    <Button
      onClick={getUserLocation}
      iconStyle={`${
        isSearchingLocation
          ? "fi fi-rr-spinner flex animate-spin"
          : "fi fi-rr-location-crosshairs"
      }`}
      className="text-base md:text-xl"
      ariaLabel="Locate me"
    />
  );
};

export default UserLocation;
