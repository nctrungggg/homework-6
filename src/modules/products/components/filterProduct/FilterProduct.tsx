import { useState } from "react";
import { SelectStatus } from "./selectStatus/SelectStatus";
import { SelectClient } from "./selectClient/SelectClient";

export interface IFitlerProductProps {
  handleSelectClient: (status: string) => void;
  handleSelectStatus: (client: string) => void;
  handleClearFilter: (state: any) => void;
  handleFilter: () => void;
}

export function FitlerProduct({
  handleSelectStatus,
  handleClearFilter,
  handleFilter,
  handleSelectClient,
}: IFitlerProductProps) {
  const [clearFilter, setClearFilter] = useState<boolean>(true);

  return (
    <div>
      <div className="flex gap-3">
        <SelectStatus
          clearFilter={clearFilter}
          handleSelectStatus={handleSelectStatus}
        />
        <SelectClient
          clearFilter={clearFilter}
          handleSelectClient={handleSelectClient}
        />
        {/* <FilterDateTime /> */}
        <div className="ml-auto">
          <button
            className="text-[#1DA8DF] h-full text-sm border-1 font-medium rounded-xl w-[100px] border-[#1DA8DF] mr-3 transition-all duration-200 hover:bg-[#1DA8DF] hover:text-white"
            onClick={handleFilter}
          >
            APPLY
          </button>

          <button
            className="text-[#EF699B] h-full text-sm border-1 font-medium rounded-xl w-[100px] border-[#EF699B] transition-all duration-200 hover:bg-[#EF699B] hover:text-white"
            onClick={() => handleClearFilter(setClearFilter(!clearFilter))}
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
}
