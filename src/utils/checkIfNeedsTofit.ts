// Checks if the route needs to fit
export function checkIfNeedsTofit(searchParams: URLSearchParams): boolean {
  const routeExists = searchParams.get("route");
  const stopExists = searchParams.get("stop");

  if (routeExists && stopExists) return false;

  return true;
}
