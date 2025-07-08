import { Link } from '@tanstack/react-router'
import sneaker_sale from '@/assets/img/sneaker_sale.webp'
import styles from './SneakerCard.module.css'

export function SneakerCard() {
  return (
    <div className={styles.sneaker_card}>
      <div className={styles.sneaker_image_wrapper}>
        <span className={styles.sale}>SALE</span>
        <img
          src={sneaker_sale}
          className={styles.sneaker_image}
          alt="Sales sneaker image"
        />
      </div>
      <div className={styles.sneaker_details}>
        <span className={styles.sneaker_name}>Nike Air Max 97</span>
        <div className={styles.price_container}>
          <span className={styles.sneaker_price}>190$</span>
          <span className={styles.sneaker_price_previous}>200$</span>
        </div>
        <Link to="#" className={styles.add_to_cart}>
          ADD TO CART
        </Link>
      </div>
    </div>
  )
}
