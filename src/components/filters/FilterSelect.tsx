import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterOption } from "@/features/types/prices";

const ALL_VALUE = "__all__";

interface FilterSelectProps {
  id: string;
  label: string;
  allLabel: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterSelect({
  id,
  label,
  allLabel,
  options,
  value,
  onChange,
}: FilterSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <Select
        value={value || ALL_VALUE}
        onValueChange={(nextValue) =>
          onChange(nextValue === ALL_VALUE ? "" : (nextValue ?? ""))
        }
      >
        <SelectTrigger id={id} className="h-10 w-full">
          <SelectValue placeholder={allLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>{allLabel}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
