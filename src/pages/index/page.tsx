import { useLoaderData } from '@tanstack/react-router'
import { ROUTES } from '@/shared/constants/routes'
import { BestSellersSection } from './components/BestSellersSection'
import { Section } from './components/Section'
import styles from './page.module.css'

export function IndexPage() {
  const { popularSneakers } = useLoaderData({
    from: ROUTES.INDEX
  })

  return (
    <>
      <Section
        className={styles.heroSection}
        sectionName="hero"
        sneaker={popularSneakers[0]}
      />
      {popularSneakers.length !== 0 && (
        <BestSellersSection popularSneakers={popularSneakers} />
      )}
      <Section
        className={styles.discountSection}
        sectionName="discount"
        sneaker={popularSneakers[1]}
      />
    </>
  )
}
