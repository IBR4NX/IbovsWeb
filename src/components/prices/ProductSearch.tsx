import { Search } from "lucide-react";
import { cn } from "cn"
import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

// interface SearcFilterProps {
//   value: string;
//   onChange: (value: string) => void;
  
// } 
type SearchFilterProps =
  & {
      value: string;
      placeholder?:string;
      onChange: (value: string) => void;
    }
  & Omit<React.ComponentProps<"div">, "onChange">;

export function SearchFilter({ value,placeholder, onChange, className  }: SearchFilterProps) {
  return (
    <div className={cn(" col-span-4 ",className)} >
      {/* <label htmlFor="product-search" className="mb-1.5 block text-sm font-medium">
        البحث
      </label> */}
      <InputGroup className="h-10">
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          id="product-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder??"ابحث عن منتج..."}
        />
      </InputGroup>
    </div>
  );
}
