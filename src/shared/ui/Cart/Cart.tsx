import { Link } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { useRemoveSneakerFromCartMutation } from '@/shared/api/hooks/useRemoveSneakerFromCartMutation'
import { ELEMENT_IDS } from '@/shared/constants/elementIds'
import { ROUTES } from '@/shared/constants/routes'
import { useCart } from '@/shared/contexts/cart'
import { Button } from '../Button'
import { ModalList } from '../ModalList/ModalList'
import { Typography } from '../Typography'
import styles from './Cart.module.css'

export function Cart() {
  const cart = useCart()
  const removeMutation = useRemoveSneakerFromCartMutation({
    options: {
      onSuccess: (_data, variables) => {
        cart.setCart(prev =>
          prev.filter(item => item.slug !== variables.params.slug)
        )
      }
    }
  })

  if (cart.cart.length === 0) return null

  return (
    <>
      <ModalList
        items={cart.cart}
        isOpened={cart.isOpened}
        setIsOpened={cart.setIsOpened}
        triggerButtonId={ELEMENT_IDS.headerCartButton}
        modalClassName={styles.modal}
        footer={
          <Button
            className={styles.createOrderButton}
            variant="contained"
            type="button"
            onClick={() => {}}
            style={{ width: '100%', marginTop: 16 }}
          >
            <FormattedMessage
              id="button.createOrder"
              defaultMessage="Create Order"
            />
          </Button>
        }
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
              <Button
                variant="text"
                className={styles.removeButton}
                onClick={() =>
                  removeMutation.mutate({
                    params: { slug: item.slug }
                  })
                }
                disabled={removeMutation.isPending}
              >
                {removeMutation.isPending && (
                  <FormattedMessage
                    id="button.removing"
                    defaultMessage="Removing..."
                  />
                )}
                {!removeMutation.isPending && (
                  <FormattedMessage
                    id="button.remove"
                    defaultMessage="Remove"
                  />
                )}
              </Button>
            </div>
          </div>
        )}
      </ModalList>
    </>
  )
}
