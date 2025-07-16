import clsx from 'clsx'
import { HeartIcon } from 'lucide-react'
import { FormattedMessage } from 'react-intl'
import { Button, Typography } from '@/shared/ui'
import { useSneakerPage } from './hooks/useSneakerPage'
import styles from './page.module.css'

export function SneakerPage() {
  const {
    sneaker,
    isFavored,
    stockList,
    selectedStockId,
    setSelectedStockId,
    addToCart,
    handleFavoriteToggle,
    handleAddToCart
  } = useSneakerPage()

  if (!sneaker) {
    return (
      <div className={styles.notFound}>
        <FormattedMessage id="sneaker.notFound" />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.sneakerImage}
            src={sneaker.images[0]}
            alt={sneaker.name}
          />
          {sneaker.hasActiveDiscount && (
            <span className={styles.discountBadge}>
              <FormattedMessage id="discount.savings" />{' '}
              {sneaker.discountSavings ? (
                `$${sneaker.discountSavings}`
              ) : (
                <FormattedMessage id="sneaker.discount" />
              )}
            </span>
          )}
        </div>

        <div className={styles.details}>
          <Typography tag="h1" variant="title" className={styles.title}>
            {sneaker.name}
          </Typography>
          <Typography tag="div" variant="body" className={styles.brand}>
            {sneaker.brandName}
          </Typography>
          <div className={styles.priceContainer}>
            <Typography tag="div" variant="body" className={styles.finalPrice}>
              ${sneaker.finalPrice.toFixed(2)}
            </Typography>
            {sneaker.hasActiveDiscount && (
              <Typography
                tag="div"
                variant="body"
                className={styles.originalPrice}
              >
                ${sneaker.price.toFixed(2)}
              </Typography>
            )}
          </div>
          <Typography tag="div" variant="body" className={styles.description}>
            {sneaker.description}
          </Typography>
          <div className={styles.buttonContainer}>
            <div className={styles.buttons}>
              <Button
                variant="text"
                className={`${styles.favoriteButton} ${
                  isFavored ? styles.favoriteActive : styles.favoriteInactive
                }`}
                onClick={handleFavoriteToggle}
                aria-label={
                  isFavored ? 'aria.removeFromFavorites' : 'aria.addToFavorites'
                }
              >
                <HeartIcon />
              </Button>

              <Button
                className={styles.addToCart}
                type="button"
                variant="text"
                onClick={handleAddToCart}
                disabled={addToCart.status === 'pending' || !selectedStockId}
                aria-label="aria.addToCart"
              >
                {addToCart.status === 'pending' ? (
                  <FormattedMessage
                    id="button.addingToCart"
                    defaultMessage="Adding..."
                  />
                ) : (
                  <FormattedMessage id="button.addToCart" />
                )}
              </Button>
            </div>

            {stockList.length > 0 && (
              <>
                <Typography tag="div" variant="body">
                  <FormattedMessage id="label.sizes" />
                </Typography>
                <div className={styles.sizesGrid}>
                  {stockList.map(stock => (
                    <button
                      key={stock.id}
                      type="button"
                      className={clsx(
                        styles.sizeButton,
                        selectedStockId === stock.id && styles.sizeButtonActive
                      )}
                      disabled={stock.quantity === 0}
                      onClick={() => setSelectedStockId(stock.id)}
                    >
                      {stock.size}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className={styles.stats}>
            <Typography tag="div" variant="body" className={styles.statsText}>
              <span>
                <FormattedMessage
                  id="label.views"
                  values={{ views: sneaker.views }}
                />
              </span>
              <span>
                <FormattedMessage
                  id="label.purchases"
                  values={{ purchases: sneaker.purchases }}
                />
              </span>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
