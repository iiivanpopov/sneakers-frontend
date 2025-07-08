import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import {
  ShoppingBasket as CartIcon,
  Heart as HeartIcon,
  Search as SearchIcon
} from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="header">
        <Link to={ROUTES.INDEX} className="header__title">
          Sneakers.
        </Link>
        <div className="header__actions">
          <button type="button" className="header__search">
            <SearchIcon />
          </button>
          <Link to={ROUTES.FAVORED} className="header__favored">
            <HeartIcon />
          </Link>
          <Link to={ROUTES.CART} className="header__cart">
            <CartIcon />
          </Link>

          <Link to={ROUTES.AUTH} className="header__login">
            Log In
          </Link>
          <button type="button" className="header__menu">
            Menu
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <Link to={ROUTES.INDEX} className="footer__title">
          Sneakers.
        </Link>
        <section className="footer_information">
          <div className="information__section">
            <div className="heading">CONTACT</div>
            <div className="information">info@mysite.com</div>
            <div className="information">123-456-7890</div>
            <div className="information">500 Terry Francine St.SA, CA 9415</div>
            <div className="heading">SOCIAL MEDIA</div>
            <div className="multi-information">
              <Link to="https://www.instagram.com/">INST</Link>
              <Link to="https://www.facebook.com/">FCB</Link>
              <Link to="https://www.tiktok.com/">TKTK</Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
})
