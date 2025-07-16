import { Link, useLocation } from '@tanstack/react-router'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { PanelRightClose } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSignOutMutation } from '@/shared/api/hooks/useSignOutMutation'
import { ELEMENT_IDS } from '@/shared/constants/elementIds'
import { LOCAL_STORAGE } from '@/shared/constants/localStorage'
import { ROUTES } from '@/shared/constants/routes'
import { useProfile } from '@/shared/contexts/profile'
import { useSidebar } from '@/shared/contexts/sidebar/useSidebar'
import { useClickOutside } from '@/shared/hooks'
import { Button } from '../Button'
import styles from './Sidebar.module.css'

const LINKS = [
  { label: 'HOME', to: ROUTES.INDEX, authOnly: undefined },
  { label: 'ABOUT', to: ROUTES.ABOUT, authOnly: undefined },
  { label: 'SHOP', to: ROUTES.CATALOG, authOnly: undefined },
  { label: 'PROFILE', to: ROUTES.PROFILE, authOnly: true },
  { label: 'ORDERS', to: ROUTES.ORDERS, authOnly: true },
  { label: 'SIGN IN', to: ROUTES.AUTH, authOnly: false }
]

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar()
  const ref = useRef<HTMLDivElement | null>(null)
  const location = useLocation()
  const { profile, setProfile } = useProfile()

  const signOutMutation = useSignOutMutation()
  const onLogout = async () => {
    const response = await signOutMutation.mutateAsync({ params: {} })

    if (response.data.success) {
      localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN)
      setProfile({
        id: '',
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        country: '',
        city: '',
        role: ''
      })
    }
  }

  const isCurrent = (route: string) => location.pathname === route

  useClickOutside(ref, event => {
    if (
      event.target &&
      'id' in event.target &&
      event.target.id !== ELEMENT_IDS.headerMenuButton
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
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}
      transition={{ duration: 0.2 }}
      className={styles.backdrop}
    >
      <m.div
        initial={{
          x: '100%'
        }}
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
          className={styles.closeSidebar}
          variant="text"
          onClick={() => setIsOpen(false)}
          aria-label="aria.closeSidebar"
        >
          <PanelRightClose />
        </Button>
        {LINKS.map(({ label, to, authOnly }) => {
          if (
            (authOnly === false && profile?.email) ||
            (authOnly === true && !profile?.email)
          ) {
            return null
          }

          return (
            <Link
              key={to}
              to={to}
              disabled={isCurrent(to)}
              className={clsx(styles.link, {
                [styles.linkDisabled]: isCurrent(to)
              })}
            >
              <FormattedMessage id={`sidebar.link.${label}`} />
            </Link>
          )
        })}
        {!!profile?.email && (
          <button type="button" className={styles.signOut} onClick={onLogout}>
            <FormattedMessage id="button.signOut" />
          </button>
        )}
      </m.div>
    </m.div>
  )
}
