import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { ArrowLeft, ArrowRight, HeartIcon } from 'lucide-react'
import { FormattedMessage } from 'react-intl'
import { useProfile } from '@/shared/contexts/profile'
import { Button, Typography } from '@/shared/ui'
import { Filters } from './components/Filters'
import { useCatalogPage } from './hooks/useCatalogPage'
import styles from './page.module.css'

export function CatalogPage() {
  const { sneakers, brands, pagination, toggleFavorite } = useCatalogPage()
  const { profile } = useProfile()

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
              {profile?.email && (
                <Button onClick={() => toggleFavorite(sneaker)} variant="text">
                  <HeartIcon
                    className={clsx({
                      [styles.favoriteActive]: sneaker.isFavored
                    })}
                  />
                </Button>
              )}
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
          disabled={pagination.currentPage === 1}
          onClick={pagination.prev}
          className={styles.navigationButton}
        >
          <ArrowLeft />
        </Button>
        <div className={styles.pages}>
          {pagination.prevPages.map(page => (
            <span
              key={page}
              className={styles.page}
              onClick={() => pagination.setPage(page)}
            >
              {page}
            </span>
          ))}
          <span className={clsx(styles.page, styles.currentPage)}>
            {pagination.currentPage}
          </span>
          {pagination.nextPages.map(page => (
            <span
              key={page}
              className={styles.page}
              onClick={() => pagination.setPage(page)}
            >
              {page}
            </span>
          ))}
        </div>
        <Button onClick={pagination.next} className={styles.navigationButton}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
