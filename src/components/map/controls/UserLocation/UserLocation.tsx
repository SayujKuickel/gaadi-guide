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
      iconStyle={`text-xl ${
        isSearchingLocation
          ? "fi fi-rr-spinner animate-spin"
          : "fi fi-rr-location-crosshairs"
      }`}
      ariaLabel="Locate me"
    />
  );
};

export default UserLocation;
