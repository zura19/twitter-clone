export const calculateTimePassed = (start) => {
  const startDate = new Date(start);
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) {
    return `${years}y`;
  }
  if (months >= 1) {
    return `${months}m`;
  }
  if (weeks >= 1) {
    return `${weeks}w`;
  }
  if (days >= 1) {
    return `${days}d`;
  }
  if (hours >= 1) {
    return `${hours}h`;
  }
  if (minutes >= 1) {
    return `${minutes}m`;
  }
  return `Just now`;
};
