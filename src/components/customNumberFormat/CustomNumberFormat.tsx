import { NumberFormatBase } from "react-number-format";

export default function CustomNumberFormat(props: any) {
  const format = (numStr: any) => {
    if (numStr === "") return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numStr);
  };

  return <NumberFormatBase {...props} format={format} />;
}
