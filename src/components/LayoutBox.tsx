import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"

interface LayoutBoxProps extends React.HTMLProps<HTMLDivElement> {
  title: string
  icon: IconProp
}

const LayoutBox: React.FC<LayoutBoxProps> = ({
  title,
  icon,
  ...props
}) => {
  const Box = styled.div`
    display: grid;
    grid-template-rows: 40px 1fr;
    background-color: #ffffffdd;
  `
  const Title = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
    background-color: #000000dd;
    font-weight: bold;
    color: #ffffff;
    gap: 10px;
    height: 40px;
  `
  return (
    <Box {...props}>
      <Title>
        <FontAwesomeIcon icon={icon} />
        {title}
      </Title>
      {props.children}
    </Box>
  )
}

export default LayoutBox