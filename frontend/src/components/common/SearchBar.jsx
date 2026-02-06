import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

/**
 * SearchBar Component
 * Search input with icon
 * 
 * @param {Object} props
 * @param {string} props.value - Search value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 */
export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`relative ${className}`} data-testid="search-bar">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
        data-testid="search-input"
      />
    </div>
  );
};
