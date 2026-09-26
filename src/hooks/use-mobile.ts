import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

export function useIsMobile() {
  const subscribe = React.useCallback((onChange: () => void) => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY)
    mediaQuery.addEventListener("change", onChange)
    return () => mediaQuery.removeEventListener("change", onChange)
  }, [])
  const getSnapshot = React.useCallback(() => window.matchMedia(MOBILE_QUERY).matches, [])

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false)
}
