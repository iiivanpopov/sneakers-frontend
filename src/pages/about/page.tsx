import { FormattedMessage } from 'react-intl'
import innovationImage from '@/assets/img/innovation.webp'
import qualityImage from '@/assets/img/quality.webp'
import sustainabilityImage from '@/assets/img/sustainablity.webp'
import { Typography } from '@/shared/ui/Typography'
import styles from './page.module.css'

export function AboutPage() {
  return (
    <>
      <section className={styles.aboutHeroSection}>
        <Typography className={styles.sectionTitle}>
          <FormattedMessage id="aboutUs.title" />
        </Typography>
        <div className={styles.cardContainer}>
          <div className={styles.aboutCard}>
            <Typography variant="body" tag="div" className={styles.description}>
              <FormattedMessage id="aboutUs.description" />
            </Typography>
          </div>
        </div>
      </section>
      <section className={styles.advantagesSection}>
        <Typography className={styles.sectionTitle}>
          <FormattedMessage id="advantages.title" />
        </Typography>
        <div className={styles.advantagesList}>
          <div className={styles.advantageItem}>
            <img
              className={styles.itemImage}
              src={sustainabilityImage}
              alt="sneaker sustainability preview image"
            />
            <div className={styles.itemTitle}>
              <FormattedMessage id="advantage.sustainability" />
            </div>
          </div>
          <div className={styles.advantageItem}>
            <img
              className={styles.itemImage}
              src={qualityImage}
              alt="sneaker quality preview image"
            />
            <div className={styles.itemTitle}>
              <FormattedMessage id="advantage.quality" />
            </div>
          </div>
          <div className={styles.advantageItem}>
            <img
              className={styles.itemImage}
              src={innovationImage}
              alt="sneaker innovation preview image"
            />
            <div className={styles.itemTitle}>
              <FormattedMessage id="advantage.innovation" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
