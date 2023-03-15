import { Fragment, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'


export default function ScrollToTop(children) {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <Fragment>{children}</Fragment>
}
