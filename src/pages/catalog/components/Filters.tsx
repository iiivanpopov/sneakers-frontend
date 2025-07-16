import { CheckIcon } from 'lucide-react'
import { FormattedMessage } from 'react-intl'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Radiobox } from '@/shared/ui/Radiobox'
import { useFilters } from '../hooks/useFilters'

interface FiltersProps {
  brands: SneakerBrandItem[]
}

export function Filters({ brands }: FiltersProps) {
  const filters = useFilters()

  return (
    <>
      <Radiobox onSelect={filters.functions.setBrand}>
        {brands.map(brand => (
          <Radiobox.Group key={brand.name}>
            <Radiobox.Box key={`box${brand.name}`}>{brand.name}</Radiobox.Box>
            <Radiobox.Label key={`label${brand.name}`}>
              {brand.name}
            </Radiobox.Label>
          </Radiobox.Group>
        ))}
      </Radiobox>
      <Checkbox onCheck={filters.functions.setDiscount}>
        <Checkbox.Box>
          <CheckIcon size={18} strokeWidth={3} />
        </Checkbox.Box>
        <Checkbox.Label>
          <FormattedMessage id="label.discount" />
        </Checkbox.Label>
      </Checkbox>
    </>
  )
}
