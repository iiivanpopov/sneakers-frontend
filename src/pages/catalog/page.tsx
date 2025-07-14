import clsx from 'clsx'
import { ArrowLeft, ArrowRight, CheckIcon } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'
import { Button } from '@/shared/ui'
import { Checkbox } from '@/shared/ui/Checkbox'
import { usePagination } from './hooks/usePagination'
import styles from './page.module.css'
// import { useLoaderData } from '@tanstack/react-router'

export function CatalogPage() {
  const { currentPage, nextPages, prevPages, next, prev, setPage } =
    usePagination(ROUTES.CATALOG)
  // const { sneakers, brands } = useLoaderData({ from: ROUTES.CATALOG })

  return (
    <div className={styles.catalog}>
      <aside className={styles.sidebar}>
        <Checkbox>
          <Checkbox.Box>
            <CheckIcon size={18} />
          </Checkbox.Box>
          <Checkbox.Label>Label</Checkbox.Label>
        </Checkbox>
      </aside>
      <div className={styles.pagination}>
        <Button
          disabled={currentPage === 1}
          onClick={prev}
          className={styles.navigationButton}
        >
          <ArrowLeft />
        </Button>
        <div className={styles.pages}>
          {prevPages.map(page => (
            <span
              key={page}
              className={styles.page}
              onClick={() => setPage(page)}
            >
              {page}
            </span>
          ))}
          <span className={clsx(styles.page, styles.currentPage)}>
            {currentPage}
          </span>
          {nextPages.map(page => (
            <span
              key={page}
              className={styles.page}
              onClick={() => setPage(page)}
            >
              {page}
            </span>
          ))}
        </div>
        <Button onClick={next} className={styles.navigationButton}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
