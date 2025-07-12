import { Link } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { useGetPopularSneakersQuery } from '@/shared/api/hooks/useGetPopularSneakersQuery'
import { ROUTES } from '@/shared/constants/routes'
import { Typography } from '@/shared/ui/common/Typography'
import styles from './page.module.css'

export function IndexPage() {
  const popularSneakersRequest = useGetPopularSneakersQuery({ limit: '3' })
  const mostPopularSneakers = popularSneakersRequest?.data?.data?.data
  const mostPopularSneaker = mostPopularSneakers?.[0]

  return (
    <>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          <FormattedMessage id="hero.title" />
        </h1>
        <h2 className={styles.heroDescription}>
          <FormattedMessage id="hero.description" />
        </h2>
        <Link className={styles.heroCta} to={ROUTES.CATALOG} resetScroll={true}>
          <FormattedMessage id="hero.shopNow" />
        </Link>
        {!!mostPopularSneaker && (
          <div className={styles.featuredSneakerCard}>
            <div className={styles.imageContainer}>
              <span className={styles.saleBadge}>
                <FormattedMessage id="featuredSneaker.sale" />
              </span>
              <img
                alt={mostPopularSneaker?.name}
                className={styles.sneakerImage}
                src={mostPopularSneaker?.images[0]}
                loading="lazy"
              />
            </div>
            <div className={styles.details}>
              <span className={styles.name}>{mostPopularSneaker?.name}</span>
              <div className={styles.priceInfo}>
                <span className={styles.currentPrice}>
                  {mostPopularSneaker?.finalPrice}$
                </span>
                {!!mostPopularSneaker?.hasActiveDiscount && (
                  <span className={styles.originalPrice}>
                    {mostPopularSneaker.price}$
                  </span>
                )}
              </div>
              <Link to="#" className={styles.addToCartBtn}>
                <FormattedMessage id="featuredSneaker.addToCart" />
              </Link>
            </div>
          </div>
        )}
      </section>
      {!!mostPopularSneakers && (
        <section className={styles.bestSellersSection}>
          <Typography tag="h2" variant="subtitle">
            <FormattedMessage id="bestsellers.title" />
          </Typography>
          <div className={styles.bestSellersList}>
            {mostPopularSneakers?.map(sneaker => (
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
                <span className={styles.currentPrice}>
                  {sneaker.finalPrice}$
                </span>
                {!!sneaker.hasActiveDiscount && (
                  <span className={styles.originalPrice}>{sneaker.price}$</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
