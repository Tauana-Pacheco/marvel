import { ReactNode } from "react"

interface ICard {
  children: ReactNode
  id: string
  className?: string
}

export default function Card({ children, className, id }: ICard) {
  return (
    <section id={id} data-testid={id} className={className}>
      {children}
    </section>
  )
}
