import { Check } from 'lucide-react'
import { Checkbox } from '@/shared/ui/Checkbox'
import styles from './page.module.css'

export function CatalogPage() {
  return (
    <div className={styles.catalog}>
      <Checkbox>
        <Checkbox.Box>
          <Check size={18} />
        </Checkbox.Box>
        <Checkbox.Label>Label</Checkbox.Label>
      </Checkbox>
    </div>
  )
}
