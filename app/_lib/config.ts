export const containerMaxW = "xl:max-w-6xl xl:mx-auto";

export const appTitle =
  "MojaSMS - Tanzania's SMS Platform";

export const getPageTitle = (currentPageTitle: string) =>
  `${currentPageTitle} — ${appTitle}`;

export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};
