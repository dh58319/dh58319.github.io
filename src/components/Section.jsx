import { useEffect, useRef, useState } from 'react'

export default function Section({ id, title, children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`section reveal ${visible ? 'in-view' : ''}`}
    >
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}
