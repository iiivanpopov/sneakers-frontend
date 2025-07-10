import { Link, useLocation } from '@tanstack/react-router'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { SidebarOpenIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { ROUTES } from '@/shared/constants/routes'
import { useSidebar } from '@/shared/contexts/sidebar/useSidebar'
import { useClickOutside } from '@/shared/hooks'
import { Button } from '../common/Button'
import styles from './Sidebar.module.css'

const LINKS = [
  { label: 'HOME', to: ROUTES.INDEX },
  { label: 'ABOUT', to: ROUTES.ABOUT },
  { label: 'SHOP', to: ROUTES.CATALOG },
  { label: 'PROFILE', to: ROUTES.PROFILE },
  { label: 'CART', to: ROUTES.CART },
  { label: 'FAVORED', to: ROUTES.FAVORED },
  { label: 'ORDERS', to: ROUTES.ORDERS },
  { label: 'DELIVERIES', to: ROUTES.DELIVERIES },
  { label: 'SIGN IN', to: ROUTES.AUTH }
]

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar()
  const ref = useRef<HTMLDivElement | null>(null)
  const location = useLocation()

  const isCurrent = (route: string) => location.pathname === route

  useClickOutside(ref, event => {
    if (
      event.target &&
      'id' in event.target &&
      event.target.id !== 'header__menu'
    ) {
      setIsOpen(false)
    }
  })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <m.div
      animate={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
      transition={{ duration: 0.2 }}
      className={styles.backdrop}
    >
      <m.div
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 35
        }}
        ref={ref}
        className={styles.sidebar}
      >
        <Button
          className={styles.close_sidebar}
          variant="text"
          onClick={() => setIsOpen(false)}
        >
          <SidebarOpenIcon />
        </Button>
        {LINKS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            disabled={isCurrent(to)}
            className={clsx(styles.link, {
              [styles.link_disabled]: isCurrent(to)
            })}
          >
            {label}
          </Link>
        ))}
      </m.div>
    </m.div>
  )
}
