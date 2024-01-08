import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faClipboard, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import Button from "./Button"

const Item = ({icon, text}: {icon: IconProp, text: string}) => {
  const Div = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
    justify-items: center;
    width: 100%;
    height: 100%;
    padding: 5px;
  `
  return (
    <Button style={{
      background: 'none',
      color: '#ffffff',
      fontFamily: 'inherit',
      appearance: 'none',
      fontWeight: 'bold'
    }}>
      <Div>
        <FontAwesomeIcon fontSize={30} icon={icon} />
        <span
          style={{
            fontSize: 20
          }}>
          {text}
        </span>
      </Div>
    </Button>
  )
}
const BottomNavigation = () => {
  const Navigation = styled.footer`
    display: flex;
    width: 100%;  
    height: 75px;
    background : linear-gradient(to top, #000000df, #ffffff11 120%);
    justify-content: center;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;

    & > * {
      display: block;
      height: 100%;
      aspect-ratio: 3 / 2;
      border: none;
      border-right: 1px solid #ffffff !important;

      &:last-child {
        border-right: none !important;
      }
    }
  `
  return (
    <Navigation>
      <Item icon={faHome} text='메인' />
      <Item icon={faClipboard} text='기록' />
    </Navigation>
  )
}

export default BottomNavigation