import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const mediaQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

  const subscribe = React.useCallback(
    (callback: () => void) => {
      if (typeof window !== "undefined") {
        const mql = window.matchMedia(mediaQuery)
        mql.addEventListener("change", callback)
        return () => mql.removeEventListener("change", callback)
      }
      return () => {}
    },
    [mediaQuery]
  )

  const getSnapshot = React.useCallback(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(mediaQuery).matches
    }
    return false // SSR fallback
  }, [mediaQuery])

  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
