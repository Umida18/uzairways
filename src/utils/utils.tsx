export const PriceComponent = ({ price }: { price: string }) => {
  const formatPrice = (price: string) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return <div>$ {formatPrice(price)}</div>;
};
export function formattedDay(dateString: string | undefined): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function formattedTime(dateString: string | undefined): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
