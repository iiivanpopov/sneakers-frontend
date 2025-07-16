import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { FormattedMessage } from 'react-intl'
import { ROUTES } from '@/shared/constants/routes'
import styles from './Section.module.css'

export interface SectionProps {
  sneaker: SneakerItem
  sectionName: string
  className: string
}

export function Section({ sneaker, sectionName, className }: SectionProps) {
  return (
    <section className={clsx(styles.section, className)}>
      <h1 className={styles.title}>
        <FormattedMessage id={`${sectionName}.title`} />
      </h1>
      <h2 className={styles.description}>
        <FormattedMessage id={`${sectionName}.description`} />
      </h2>
      <Link className={styles.cta} to={ROUTES.CATALOG} resetScroll={true}>
        <FormattedMessage id={`${sectionName}.shopNow`} />
      </Link>
      {!!sneaker && (
        <div className={styles.featuredSneakerCard}>
          <div className={styles.imageContainer}>
            <span className={styles.saleBadge}>
              <FormattedMessage id="featuredSneaker.sale" />
            </span>
            <img
              alt={sneaker?.name}
              className={styles.sneakerImage}
              src={sneaker?.images[0]}
              loading="lazy"
            />
          </div>
          <div className={styles.details}>
            <span className={styles.name}>{sneaker?.name}</span>
            <div className={styles.priceInfo}>
              <span className={styles.currentPrice}>
                {sneaker?.finalPrice}$
              </span>
              {!!sneaker?.hasActiveDiscount && (
                <span className={styles.originalPrice}>{sneaker.price}$</span>
              )}
            </div>
            <Link
              to={ROUTES.SNEAKER}
              params={{ slug: sneaker.slug }}
              className={styles.addToCartBtn}
            >
              <FormattedMessage id="button.view" />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
