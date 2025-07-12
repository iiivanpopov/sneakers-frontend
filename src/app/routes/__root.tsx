import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ShoppingBasket as CartIcon, HeartIcon, SearchIcon } from 'lucide-react'
import { FormattedMessage } from 'react-intl'
import { ELEMENT_IDS } from '@/shared/constants/elementIds'
import { ROUTES } from '@/shared/constants/routes'
import { useI18n } from '@/shared/contexts/i18n'
import { useSidebar } from '@/shared/contexts/sidebar/useSidebar'
import { Sidebar } from '@/shared/ui/Sidebar'
import styles from './__root.module.css'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  const { setIsOpen } = useSidebar()
  const { locale, setLocale } = useI18n()

  return (
    <>
      <Sidebar />
      <div className={styles.shippingBanner}>
        <span>
          <FormattedMessage id="header.freeShipping" />
        </span>
        <span>
          <FormattedMessage id="header.freeShipping" />
        </span>
        <span>
          <FormattedMessage id="header.freeShipping" />
        </span>
        <span>
          <FormattedMessage id="header.freeShipping" />
        </span>
        <span>
          <FormattedMessage id="header.freeShipping" />
        </span>
      </div>
      <header className={styles.siteHeader}>
        <Link to={ROUTES.INDEX} className={styles.brandLogo}>
          Ryst.
        </Link>
        <div className={styles.headerActions}>
          <button type="button" className={styles.searchButton}>
            <SearchIcon />
          </button>
          <Link to={ROUTES.FAVORED} className={styles.favoritesLink}>
            <HeartIcon />
          </Link>
          <Link to={ROUTES.CART} className={styles.cartLink}>
            <CartIcon />
          </Link>
          <button
            className={styles.locale}
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'uk' : 'en')}
          >
            {locale}
          </button>
          <Link to={ROUTES.AUTH} className={styles.loginLink}>
            <FormattedMessage id="button.signIn" />
          </Link>
          <button
            type="button"
            id={ELEMENT_IDS.headerMenuButton}
            onClick={() => setIsOpen(true)}
            className={styles.menuButton}
          >
            <FormattedMessage id="button.menu" />
          </button>
        </div>
      </header>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <footer className={styles.siteFooter}>
        <section className={styles.footerInfo}>
          <div className={styles.infoSection}>
            <div className={styles.sectionHeading}>
              <FormattedMessage id="footer.contacts" />
            </div>
            <div className={styles.infoItem}>info@mysite.com</div>
            <div className={styles.infoItem}>123-456-7890</div>
            <div className={styles.infoItem}>
              500 Terry Francine St.SA, CA 9415
            </div>
            <div className={styles.sectionHeading}>
              <FormattedMessage id="footer.socials" />
            </div>
            <div className={styles.socialLinks}>
              <Link target="_blank" to="https://www.instagram.com/">
                INST
              </Link>
              <Link target="_blank" to="https://www.facebook.com/">
                FCB
              </Link>
              <Link target="_blank" to="https://www.tiktok.com/">
                TKTK
              </Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}
