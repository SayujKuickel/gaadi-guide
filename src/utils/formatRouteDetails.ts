export const formatTime = (time: number) => {
  const min = time % 60;
  const hr = Math.floor(time / 60);

  const hrStr = hr > 0 ? `${hr} hour${hr > 1 ? "s" : ""}` : "";
  const minStr = min > 0 ? `${min} min${min > 1 ? "s" : ""}` : "";

  return [hrStr, minStr].filter(Boolean).join(" ");
};

export const formatDistance = (distance: number) => {
  return `${distance / 1000} km`;
};
