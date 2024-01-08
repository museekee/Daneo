import React from "react"
import styled from "styled-components"
import Ahover from "./../assets/audios/buttonHover.mp3"
import AClick from "./../assets/audios/buttonClick.mp3"

interface ImageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  img?: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  img,
  children,
  onClick,
  ...props
}) => {
  const Btn = styled.button`
    background-size: cover;
    background-position: center;
    border: none;
    cursor: pointer;
    background-image: url(${img});
    display: flex;
    align-items: center;
    justify-content: center;
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
    }} onClick={handleClick}
    {...props}>
      {children}
    </Btn>
  )
}

export default ImageButton