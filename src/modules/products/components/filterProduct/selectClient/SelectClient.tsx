import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface ISelectClientProps {
  handleSelectClient: (client: string) => void;
  clearFilter: boolean;
}

export function SelectClient({
  handleSelectClient,
  clearFilter,
}: ISelectClientProps) {
  const [client, setClient] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    setClient(value);
    handleSelectClient(value);
  };

  useEffect(() => {
    setClient("");
  }, [clearFilter]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Client</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={client}
          onChange={handleChange}
          autoWidth
          label="Client"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Chrome">Chrome</MenuItem>
          <MenuItem value="Coccoc">Coccoc</MenuItem>
          <MenuItem value="Safari">Safari</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
