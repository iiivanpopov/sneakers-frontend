import { Link } from '@tanstack/react-router'
import { ROUTES } from '@/shared/constants/routes'
import { SneakerCard } from './components/SneakerCard'
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
        <SneakerCard />
      </section>
    </>
  )
}
