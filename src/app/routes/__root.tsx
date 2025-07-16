import {
  createRootRouteWithContext,
  Link,
  Outlet
} from '@tanstack/react-router'
import { ShoppingBasket as CartIcon, HeartIcon, SearchIcon } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { FormattedMessage } from 'react-intl'
import { ELEMENT_IDS } from '@/shared/constants/elementIds'
import { ROUTES } from '@/shared/constants/routes'
import { useCart } from '@/shared/contexts/cart'
import { useFavorites } from '@/shared/contexts/favorites'
import { useI18n } from '@/shared/contexts/i18n'
import { useProfile } from '@/shared/contexts/profile'
import { useSidebar } from '@/shared/contexts/sidebar/useSidebar'
import styles from './__root.module.css'

const LazySidebar = lazy(() =>
  import('@/shared/ui/Sidebar').then(mod => ({
    default: mod.Sidebar
  }))
)

const LazyFavorites = lazy(() =>
  import('@/shared/ui/Favorites').then(mod => ({
    default: mod.Favorites
  }))
)

const LazyCart = lazy(() =>
  import('@/shared/ui/Cart').then(mod => ({
    default: mod.Cart
  }))
)

interface RouterContext {
  isAuthenticated: boolean
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent
})

function RootComponent() {
  const { setIsOpen } = useSidebar()
  const { profile } = useProfile()
  const { setIsOpened: setIsFavoritesOpen } = useFavorites()
  const { setIsOpened: setIsCartOpen } = useCart()
  const { locale, setLocale } = useI18n()

  return (
    <>
      <Suspense fallback={null}>
        <LazySidebar />
      </Suspense>
      <Suspense fallback={null}>
        <LazyFavorites />
      </Suspense>
      <Suspense fallback={null}>
        <LazyCart />
      </Suspense>
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
          <button
            type="button"
            className={styles.searchButton}
            aria-label="aria.search"
          >
            <SearchIcon />
          </button>
          {!!profile?.email && (
            <button
              type="button"
              id={ELEMENT_IDS.headerFavoritesButton}
              onClick={() => setIsFavoritesOpen(true)}
              className={styles.favoritesLink}
              aria-label="aria.favorites"
            >
              <HeartIcon />
            </button>
          )}
          {!!profile?.email && (
            <button
              type="button"
              id={ELEMENT_IDS.headerCartButton}
              onClick={() => setIsCartOpen(true)}
              className={styles.cartLink}
              aria-label="aria.cart"
            >
              <CartIcon />
            </button>
          )}
          <button
            className={styles.locale}
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'uk' : 'en')}
          >
            {locale}
          </button>
          {!profile?.email && (
            <Link to={ROUTES.AUTH} className={styles.loginLink}>
              <FormattedMessage id="button.signIn" />
            </Link>
          )}
          <button
            type="button"
            id={ELEMENT_IDS.headerMenuButton}
            onClick={() => setIsOpen(true)}
            className={styles.menuButton}
            aria-label="aria.menu"
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
              <Link target="_blank" href="https://www.instagram.com/" to=".">
                INST
              </Link>
              <Link target="_blank" href="https://www.facebook.com/" to=".">
                FCB
              </Link>
              <Link target="_blank" href="https://www.tiktok.com/" to=".">
                TKTK
              </Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}
