import { Link } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { ROUTES } from '@/shared/constants/routes'
import { Typography } from '@/shared/ui/Typography'
import styles from './BestSellersSection.module.css'

interface BestSellersSectionProps {
  popularSneakers: SneakerItem[]
}

export function BestSellersSection({
  popularSneakers
}: BestSellersSectionProps) {
  return (
    <section className={styles.bestSellersSection}>
      <Typography tag="h2" variant="subtitle">
        <FormattedMessage id="bestsellers.title" />
      </Typography>
      <div className={styles.bestSellersList}>
        {popularSneakers?.map(sneaker => (
          <Link
            to={ROUTES.CATALOG}
            className={styles.bestSellerItem}
            key={sneaker.id}
            resetScroll={true}
          >
            <img
              src={sneaker.images[0]}
              className={styles.itemImage}
              loading="lazy"
            />
            <span className={styles.name}>{sneaker.name}</span>
            <span className={styles.currentPrice}>{sneaker.finalPrice}$</span>
            {!!sneaker.hasActiveDiscount && (
              <span className={styles.originalPrice}>{sneaker.price}$</span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
