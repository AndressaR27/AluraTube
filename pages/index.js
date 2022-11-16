import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset.js"
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/TimeLine"
import React from "react"
import { videoService } from "../src/services/videoService"



function HomePage() {
  const service = videoService()
  const [valorDoFiltro, setValorDoFiltro] = React.useState("")
  // const playlists = {
  //   "jogos": []
  // }
  const [playlists, setPlaylists] = React.useState({});  //config.playlist

  React.useEffect(() => {
    service.getAllVideos()
      .then((dados) => {
        const novasPlaylists = { ...playlists };
        dados.data.forEach((video) => {
          if (!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = [];
          }
          novasPlaylists[video.playlist].push(video);
        });
        setPlaylists(novasPlaylists);
      });
  }, []);


    return (
      <>
        <CSSReset />
        <div>
            <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
            <Header />
            <TimeLine searchValue={valorDoFiltro} playlists={config.playlists} />
        </div>
      </>  
    )
  }
  
  export default HomePage

  const StyledBanner = styled.div`
    height: 230px;
    background-image: url(${({ bg }) => bg });
  `
  
  const StyledHeader = styled.div` 
      background-color: ${({ theme}) => theme.backgroundLevel1};
    
    .user-info{
        width: 100%;
        display: flex;
        align-items: center;
        padding: 16px 32px;
        gap: 16px;

      > img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
  `

  function Header() {
    return (
        <StyledHeader>
          <StyledBanner bg={config.bg} />
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

  function TimeLine({searchValue, ...props}) {
    
    const playlistNames = Object.keys(props.playlists) // retorna uma lista em Array
    return (
        <StyledTimeline>
            {playlistNames.map(playlistName => {
                const videos = props.playlists[playlistName];
                console.log(playlistName)
                console.log(videos)
                return ( 
                    <section key={playlistName}>
                      <h2>{playlistName}</h2>
                      <div>      
                        {videos.filter((video)=> {
                          const titleNormalized = video.title.toLowerCase();
                          const searchValueNormalized = searchValue.toLowerCase();
                          return titleNormalized.includes(searchValueNormalized)
                        }).map(video => {
                          return( 
                            <a  key={video.url} href={video.url}>
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