import { Link } from '@tanstack/react-router'
import sneaker_sale from '@/assets/img/sneaker_sale.webp'
import { ROUTES } from '@/shared/constants/routes'
import styles from './page.module.css'

export function IndexPage() {
  return (
    <>
      <section className={styles.landing_section}>
        <h1 className={styles.title}>Step-up Your Stride</h1>
        <h2 className={styles.description}>Premium Athletic Footwear</h2>
        <Link className={styles.shop_now} to={ROUTES.CATALOG}>
          SHOP NOW
        </Link>
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
      </section>
    </>
  )
}
