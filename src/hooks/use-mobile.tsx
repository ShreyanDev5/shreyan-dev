import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Use requestAnimationFrame for better performance
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Throttle the resize event handler
    let timeoutId: number | null = null
    const throttledCheck = () => {
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId)
      }
      timeoutId = window.requestAnimationFrame(checkIsMobile)
    }
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      throttledCheck()
    }
    
    mql.addEventListener("change", onChange)
    checkIsMobile()
    
    return () => {
      mql.removeEventListener("change", onChange)
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId)
      }
    }
  }, [])

  return !!isMobile
}
