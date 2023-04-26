// import DateFnsUtils from "@date-io/date-fns";
// import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { format } from "date-fns";
// import { useState } from "react";

// export interface IFilterDateTimeProps {}

// export function FilterDateTime(props: IFilterDateTimeProps) {
//   const [selectedDate, setSelectedDate] = useState();

//   const handleDateChange = (date: any) => {
//     setSelectedDate(date);
//   };
//   return (
//     <div>
//       <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <DateTimePicker
//           label="Chọn ngày giờ"
//           value={selectedDate}
//           onChange={handleDateChange}
//           format="dd/MM/yyyy"
//           fullWidth
//         />
//       </MuiPickersUtilsProvider>
//     </div>
//   );
// }
