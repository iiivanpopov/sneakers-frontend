import innovationImage from '@/assets/img/innovation.webp'
import qualityImage from '@/assets/img/quality.webp'
import sustainabilityImage from '@/assets/img/sustainablity.webp'
import { Typography } from '@/shared/ui/common/Typography'
import styles from './page.module.css'

export function AboutPage() {
  return (
    <>
      <section className={styles.about_section}>
        <Typography className={styles.title}>About us</Typography>
        <div className={styles.about_card_wrapper}>
          <div className={styles.about_card}>
            <Typography
              variant="body"
              tag="div"
              className={styles.about_card__description}
            >
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
      <section className={styles.advantages}>
        <Typography className={styles.title}>Advantages</Typography>
        <div className={styles.advantages_list}>
          <div className={styles.advantage}>
            <img
              className={styles.advantage_image}
              src={sustainabilityImage}
              alt="sneaker sustainability preview image"
            />
            <div className={styles.advantage_name}>SUSTAINABLITY</div>
          </div>

          <div className={styles.advantage}>
            <img
              className={styles.advantage_image}
              src={qualityImage}
              alt="sneaker quality preview image"
            />
            <div className={styles.advantage_name}>quality</div>
          </div>

          <div className={styles.advantage}>
            <img
              className={styles.advantage_image}
              src={innovationImage}
              alt="sneaker innovation preview image"
            />
            <div className={styles.advantage_name}>innovation</div>
          </div>
        </div>
      </section>
    </>
  )
}
