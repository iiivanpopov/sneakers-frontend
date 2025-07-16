import { Link } from '@tanstack/react-router'
import { ELEMENT_IDS } from '@/shared/constants/elementIds'
import { ROUTES } from '@/shared/constants/routes'
import { useCart } from '@/shared/contexts/cart'
import { ModalList } from '../ModalList/ModalList'
import { Typography } from '../Typography'
import styles from './Cart.module.css'

export function Cart() {
  const cart = useCart()

  if (cart.cart.length === 0) return null

  return (
    <ModalList
      items={cart.cart}
      isOpened={cart.isOpened}
      setIsOpened={cart.setIsOpened}
      triggerButtonId={ELEMENT_IDS.headerCartButton}
      modalClassName={styles.modal}
    >
      {item => (
        <div key={item.name} className={styles.item}>
          <div className={styles.imageWrapper}>
            <img
              src={item.images[0]}
              className={styles.image}
              alt={item.name}
            />
          </div>
          <div className={styles.details}>
            <Link to={ROUTES.SNEAKER} params={{ slug: item.slug }}>
              <Typography tag="div" variant="body">
                {item.name}
              </Typography>
            </Link>
            <div className={styles.priceContainer}>
              <Typography
                tag="div"
                variant="body"
                className={styles.finalPrice}
              >
                ${item.finalPrice.toFixed(2)}
              </Typography>
              {item.hasActiveDiscount && (
                <Typography
                  tag="div"
                  variant="body"
                  className={styles.originalPrice}
                >
                  ${item.price.toFixed(2)}
                </Typography>
              )}
            </div>
          </div>
        </div>
      )}
    </ModalList>
  )
}
