import { Link } from '@tanstack/react-router'
import { ELEMENT_IDS } from '@/shared/constants/elementIds'
import { ROUTES } from '@/shared/constants/routes'
import { useFavorites } from '@/shared/contexts/favorites'
import { ModalList } from '../ModalList/ModalList'
import { Typography } from '../Typography'
import styles from './Favorites.module.css'

export function Favorites() {
  const favorites = useFavorites()

  if (favorites.favorites.length === 0) return null

  return (
    <ModalList
      items={favorites.favorites}
      isOpened={favorites.isOpened}
      setIsOpened={favorites.setIsOpened}
      triggerButtonId={ELEMENT_IDS.headerFavoritesButton}
      modalClassName={styles.modal}
    >
      {favored => (
        <div key={favored.name} className={styles.item}>
          <div className={styles.imageWrapper}>
            <img
              src={favored.images[0]}
              className={styles.image}
              alt={favored.name}
            />
          </div>
          <div className={styles.details}>
            <Link to={ROUTES.SNEAKER} params={{ slug: favored.slug }}>
              <Typography tag="div" variant="body">
                {favored.name}
              </Typography>
            </Link>
            <div className={styles.priceContainer}>
              <Typography
                tag="div"
                variant="body"
                className={styles.finalPrice}
              >
                ${favored.finalPrice.toFixed(2)}
              </Typography>
              {favored.hasActiveDiscount && (
                <Typography
                  tag="div"
                  variant="body"
                  className={styles.originalPrice}
                >
                  ${favored.price.toFixed(2)}
                </Typography>
              )}
            </div>
          </div>
        </div>
      )}
    </ModalList>
  )
}
