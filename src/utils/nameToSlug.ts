export const nameToSlug = (name: string) => {
  if (!name) return;

  return name.trim().replace(" ", "-").toLowerCase();
};
