import { ReactNode } from "react"

interface ICard {
  children: ReactNode
  id: string
}

export default function Card({ children, id }: ICard) {
  return (
    <div id={id} data-testid={id}>
      {children}
    </div>
  )
}
