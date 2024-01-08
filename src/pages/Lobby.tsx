import styled from "styled-components"
import LayoutBox from "../components/LayoutBox"
import StartGameImg from "./../assets/images/start_game.png"
import JuBack from "./../assets/images/ju_btn_back.png"
import GekBack from "./../assets/images/gek_btn_back.png"
import JoBack from "./../assets/images/jo_btn_back.png"
import { faClipboard, faList, faMusic, faStar, faUser } from "@fortawesome/free-solid-svg-icons"
import ImageButton from "../components/ImageButton"
import { useEffect, useRef, useState } from "react"
import Button from "../components/Button"
import subjects from "../subjects"

const Lobby = () => {
  const gameModes = [
    {name: '주관식', image: JuBack},
    {name: '객관식', image: GekBack},
    {name: '조합', image: JoBack},
  ]
  const [gameMode, setGameMode] = useState(0)
  const [subject, setSubject] = useState(0)

  const Main = styled.main`
    display: grid;
    width: 100%;
    height: calc(100% - 125px);
    padding: 50px 30px 20px 30px;
    grid-template-columns: 2fr 8fr 350px;
    grid-template-rows: 6fr 4fr;
    gap: 10px;
  `
  const StyledImageButton = styled(ImageButton)`
    width: 100%;
    font-size: 75px;
    font-family: 'Warhaven';

    &:hover {
      transform: scale(1.05);
      transition: all 250ms;
      filter: brightness(200%);
    }
  `
  const SubjectList = styled.div`
    display: 'flex';
    flex-direction: 'column';

    & > * {
      display: block;
      width: 100%;
      border: none;
      font-size: 18px;
      border-bottom: 1px solid #333333 !important;
      padding: 10px;

      &:last-child {
        border-bottom: none !important;
      }
    }
  `
  return (
    <Main>
      {
        //#region 1 패치노트, 내정보
      }
      {/* 패치노트 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gridColumn: 1,
          gridRow: '1 / 3',
          gap: 'inherit',
          minWidth: 200
        }}>
        <LayoutBox
          icon={faClipboard}
          style={{
            width: '100%',
            height: '100%',
          }}
          title="패치 노트">
          <div>
            v 2.0.1<br/>
            패치노트를 만듦
          </div>
        </LayoutBox>
        {/* 내정보 */}
        <LayoutBox
          style={{
            aspectRatio: 1,
            minWidth: '100%',
          }}
          icon={faUser}
          title="내 정보">
          안녕히
        </LayoutBox>
      </div>
      {
        //#endregion
      }

      {
        //#region 2 버튼
      }
      {/* 게임 시작 */}
      <StyledImageButton 
        style={{zIndex: 1}} 
        img={StartGameImg}
        onClick={() => {
          
        }} />
      {/* 게임 선택 */}
      <div
        style={{
          gridColumn: 2,
          gridRow: 2,
          display: 'flex',
          justifyContent: 'space-around',
        }}>{
          gameModes.map((item, idx) => {
            const style: React.CSSProperties = {}
            if (idx === gameMode) {
              style.filter = 'brightness(200%)'
            }
            return <StyledImageButton style={style} onClick={() => setGameMode(idx)} img={item.image}>{item.name}</StyledImageButton>
          })
      }</div>
      {
        //#endregion
      }

      {
        //#region 3 주제, 즐찾 기록
      }
      <div
        style={{
          display: 'flex',
          gridColumn: 3,
          gridRow: '1/3',
          height: '100%',
          flexDirection: 'column',
          gap: 10
        }}>
        {/* 주제 */}
        <LayoutBox
          icon={faList}
          title="주제">
            <SubjectList>
              {/* 데이터 json 갖고오기, 데이터 저장하기 */}
              {
                subjects.map((item, i) => {
                  const style: React.CSSProperties = {}
                  if (i === subject) {
                    style.filter = 'brightness(70%)'
                  }
                  return (
                    <Button style={style} onClick={() => setSubject(i)}>{item.name}</Button>
                  )
                })
              }
            </SubjectList>
        </LayoutBox>
        {/* 즐겨찾기 */}
        <LayoutBox 
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
          icon={faStar}
          title="즐겨 찾는 기록">
          안녕히
        </LayoutBox>
      </div>
      {
        //#endregion
      }
    </Main>
  )
}

export default Lobby