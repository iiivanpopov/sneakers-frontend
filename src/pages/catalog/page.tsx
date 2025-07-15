import { Link, useLoaderData } from '@tanstack/react-router'
import clsx from 'clsx'
import {
  ArrowLeft,
  ArrowRight,
  HeartIcon,
  ShoppingBasketIcon
} from 'lucide-react'
import { FormattedMessage } from 'react-intl'
import { ROUTES } from '@/shared/constants/routes'
import { Button, Typography } from '@/shared/ui'
import { Filters } from './components/Filters'
import { usePagination } from './hooks/usePagination'
import styles from './page.module.css'

export function CatalogPage() {
  const { currentPage, nextPages, prevPages, next, prev, setPage } =
    usePagination(ROUTES.CATALOG)
  const { sneakers, brands } = useLoaderData({ from: ROUTES.CATALOG })

  return (
    <div className={styles.catalog}>
      <aside className={styles.sidebar}>
        <Typography tag="div" variant="subtitle">
          <FormattedMessage id="label.filters" />
        </Typography>
        <Filters brands={brands} />
      </aside>
      <div className={styles.sneakers}>
        {sneakers.map(sneaker => (
          <div className={styles.sneakerCard} key={sneaker.id}>
            <div className={styles.actions}>
              <Button variant="text">
                <HeartIcon />
              </Button>
              <Button variant="text">
                <ShoppingBasketIcon />
              </Button>
            </div>
            <img
              className={styles.sneakerImage}
              src={sneaker.images[0]}
              alt={sneaker.name}
            />
            <Link to=".">
              <Typography
                className={styles.sneakerName}
                tag="div"
                variant="body"
              >
                {sneaker.name}
              </Typography>
            </Link>
            <Typography tag="div" variant="body">
              {sneaker.finalPrice}$
            </Typography>
            {sneaker.hasActiveDiscount && (
              <Typography
                className={styles.originalPrice}
                tag="div"
                variant="body"
              >
                {sneaker.price}$
              </Typography>
            )}
          </div>
        ))}
      </div>
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
