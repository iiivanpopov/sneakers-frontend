import { Link, useLoaderData } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { FormattedMessage } from 'react-intl'
import { ROUTES } from '@/shared/constants/routes'
import styles from './page.module.css'

const BestSellersSection = lazy(() =>
  import('./components/BestSellersSection').then(mod => ({
    default: mod.BestSellersSection
  }))
)

export function IndexPage() {
  const { popularSneakers } = useLoaderData({
    from: ROUTES.INDEX
  }) as {
    popularSneakers: SneakerItem[]
  }
  const mostPopularSneaker = popularSneakers?.[0]

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
              <Link to={ROUTES.CATALOG} className={styles.addToCartBtn}>
                <FormattedMessage id="featuredSneaker.addToCart" />
              </Link>
            </div>
          </div>
        )}
      </section>
      {!!popularSneakers && (
        <Suspense fallback={<div>Loading Best sellers...</div>}>
          <BestSellersSection popularSneakers={popularSneakers} />
        </Suspense>
      )}
    </>
  )
}
