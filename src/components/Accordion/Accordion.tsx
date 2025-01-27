import { ReactNode, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"
import Button from "../Button"

interface IAccordion {
  title: string
  children: ReactNode
}

export default function Accordion({ children, title }: IAccordion) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className=" pb-2 mt-2">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left leading-relaxed border-b border-primary"
        aria-expanded={isOpen}
        data-testid="accordion-button"
        ariaLabel="Botão de busca do Accordion"
      >
        <p className="font-semibold">{title}</p>
        <span data-testid={isOpen ? "up-arrow" : "down-arrow"}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </Button>

      {isOpen && <div className="mt-2 text-gray-700">{children}</div>}
    </div>
  )
}
