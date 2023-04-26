import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface ISelectStatusProps {
  handleSelectStatus: (status: string) => void;
  clearFilter: boolean;
}

export function SelectStatus({
  handleSelectStatus,
  clearFilter,
}: ISelectStatusProps) {
  const [status, setStatus] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    setStatus(value);
    handleSelectStatus(value);
  };

  useEffect(() => {
    setStatus("");
  }, [!clearFilter]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={status}
          onChange={handleChange}
          autoWidth
          label="status"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="PENDING">Pending</MenuItem>
          <MenuItem value="FULFILLED">Fullfilled</MenuItem>
          <MenuItem value="RECEIVED">Received</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
