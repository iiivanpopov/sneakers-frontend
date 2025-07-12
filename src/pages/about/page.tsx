import innovationImage from '@/assets/img/innovation.webp'
import qualityImage from '@/assets/img/quality.webp'
import sustainabilityImage from '@/assets/img/sustainablity.webp'
import { Typography } from '@/shared/ui/common/Typography'
import styles from './page.module.css'

export function AboutPage() {
  return (
    <>
      <section className={styles.aboutHeroSection}>
        <Typography className={styles.sectionTitle}>About us</Typography>
        <div className={styles.cardContainer}>
          <div className={styles.aboutCard}>
            <Typography variant="body" tag="div" className={styles.description}>
              Our online sneaker store offers a curated selection of authentic
              footwear from the world's top brands. We stay on top of trends to
              bring you the latest styles that combine comfort and performance.
              All products are 100% original — no fakes, no compromises. Fast
              shipping, secure payments, and responsive support are part of our
              core service.
            </Typography>
          </div>
        </div>
      </section>
      <section className={styles.advantagesSection}>
        <Typography className={styles.sectionTitle}>Advantages</Typography>
        <div className={styles.advantagesList}>
          <div className={styles.advantageItem}>
            <img
              className={styles.itemImage}
              src={sustainabilityImage}
              alt="sneaker sustainability preview image"
            />
            <div className={styles.itemTitle}>SUSTAINABILITY</div>
          </div>

          <div className={styles.advantageItem}>
            <img
              className={styles.itemImage}
              src={qualityImage}
              alt="sneaker quality preview image"
            />
            <div className={styles.itemTitle}>QUALITY</div>
          </div>

          <div className={styles.advantageItem}>
            <img
              className={styles.itemImage}
              src={innovationImage}
              alt="sneaker innovation preview image"
            />
            <div className={styles.itemTitle}>INNOVATION</div>
          </div>
        </div>
      </section>
    </>
  )
}
