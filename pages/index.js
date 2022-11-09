import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/TimeLine"

function HomePage() {
    // const estilosDoHomePage = { backgroundColor: "red"}

    return (
      <>
        <CSSReset />
        <div>
            <Menu />
            <Header />
            <TimeLine  playlists={config.playlists} />
        </div>
      
      </>
        
    )
  }
  
  export default HomePage

  const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info{
        width: 100%;
        display: flex;
        align-items: center;
        padding: 16px 32px;
        gap: 16px;
    }
  `

  function Header() {
    return (
        <StyledHeader>
            {/* <img  src="banner" alt=""/> */}
            <section className="user-info">
                <img  src={`http://github.com/${config.github}.png`} alt="Foto do usuário"/>
                <div>
                    <h2>{ config.name }</h2>
                    <p>{ config.job }</p>
                </div>

            </section>
        </StyledHeader>
        
    )
  }

  function TimeLine(props) {
    
    const playlistNames = Object.keys(props.playlists) // retorna uma lista em Array
    return (
        <StyledTimeline>
            {playlistNames.map(playlistName => {
                const videos = props.playlists[playlistName];
                console.log(playlistName)
                console.log(videos)
                return ( 
                    <section>
                      <h2>{playlistName}</h2>
                      <div>      
                        {videos.map(video => {
                          return( 
                            <a href={video.url}>
                              <img src={video.thumb} />
                              <span> {video.title}  </span>
                            </a>
                          )
                        })}
                      </div>
                    </section>
                )   
            })} 
        </StyledTimeline>
    )
  }