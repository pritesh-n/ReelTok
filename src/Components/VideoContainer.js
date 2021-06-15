import { useEffect, useState, useRef } from "react";
import "./App.css";
import Video from "./Video";
import Swiper, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import videoList from "../video.json";
import adsList from "../ad.json";
Swiper.use([Navigation]);

function VideoContainer() {
  const [loading, setload] = useState(null);
  const [data, setData] = useState([
    {
      video: []
    },
  ]);
  const swipeRef = useRef(false);

  useEffect(() => {
    const mySwiper = new Swiper(".swiper-container", {
      loop: true,
      spaceBetween: 830,
      direction: "vertical",
      slidesPerView: 1,
      speed: 100,
      preloadImages: true,
      observer: true,
      observeParents: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
  }, []);

  useEffect(() => {
    function fetchData() {
      const data = videoList.Video;
      const video = [];
      let ed_index_counter = 0;
      const ed_interval_count = 3;
      try {
        for (var i = 0; i < data.length; i++) {
          if (
            data[i].type === 'video' &&
            data[i].length < 45
          ) {
            video.push(data[i]);
            if((i+1) % ed_interval_count === 0){
              video.push(adsList[ed_index_counter]);
              ed_index_counter = ed_index_counter === adsList.length - 1 ? 0 : ed_index_counter + 1;
            }
          }
        }
        setData([
          {
            video: video
          },
        ]);
        setload(true);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <div id="video-scroll">
        {data.map(({ video }) => {
          return (
            <div className="swiper-container" ref={swipeRef}>
              <div className="swiper-wrapper">
                {video.map((v) => (
                  <div className="swiper-slide">
                    {loading ? (
                      <Video
                        className="lazy"
                        source={ v.location + '/' + v.filename}
                        videoData = {v}
                        swipeRef = {swipeRef}
                      />
                    ) : (
                      <p className="loading-txt">Loading...</p>
                    )}
                    {v.type === 'video' ? <>
                    <p id="author">{v.category}</p>
                    <p id="title">
                      {v.title.length < 100
                        ? v.title
                        : v.title.substring(0, 100) + "..."}{" "}
                    </p>
                    <a id="link" href={'//'+v.no_link_attribution_sources} target="_blank" rel="noreferrer">{v.no_link_attribution_sources}</a>
                    </> : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VideoContainer;
