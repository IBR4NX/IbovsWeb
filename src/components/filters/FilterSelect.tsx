import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterOption } from "@/features/catalog/types";

const ALL_VALUE = " ";

interface FilterSelectProps {
  id: string;
  label: string;
  allLabel: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  getOptionValue?: (option: FilterOption) => string;
}

export function FilterSelect({
  id,
  label,
  allLabel,
  options,
  value,
  onChange,
  getOptionValue = (option) => option.id,
}: FilterSelectProps) {
  return (
    <div className="col-span-2">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <Select
        value={value || allLabel}
        onValueChange={(nextValue) =>
          onChange(nextValue === ALL_VALUE ? "" : (nextValue ?? ""))
        }
        defaultValue={allLabel}
      >
        <SelectTrigger id={id} className="h-10 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>{allLabel}</SelectItem>
          {options.map((option) => {
            const optionValue = getOptionValue(option);

            return (
            <SelectItem key={option.id} value={optionValue}>
              {option.name}
            </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
