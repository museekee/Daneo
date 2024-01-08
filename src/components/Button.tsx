import React from "react"
import styled from "styled-components"
import Ahover from "./../assets/audios/buttonHover.mp3"
import AClick from "./../assets/audios/buttonClick.mp3"

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  style,
  ...props
}) => {
  const Btn = styled.button`
    border: none;
    cursor: pointer;

    &:hover {
      filter: brightness(90%);
    }
  `
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await (new Audio(AClick)).play()
    
    if (onClick) {
      onClick(e)
    }
  }
  return (
    <Btn onMouseEnter={async () => {
      new Audio(Ahover).play().catch(() => {});
    }} onClick={handleClick} style={style} {...props}>
      {children}
    </Btn>
  )
}


export default Button