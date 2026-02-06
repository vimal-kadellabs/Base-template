import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

/**
 * FilterDropdown Component
 * Generic filter dropdown with label
 * 
 * @param {Object} props
 * @param {Array} props.options - Array of { value, label } objects
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.label - Label text
 * @param {string} props.placeholder - Placeholder text
 */
export const FilterDropdown = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select...',
}) => {
  return (
    <div className="space-y-2" data-testid="filter-dropdown">
      {label && (
        <Label className="text-sm font-medium text-foreground">{label}</Label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger data-testid="filter-trigger">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              data-testid={`filter-option-${option.value}`}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
