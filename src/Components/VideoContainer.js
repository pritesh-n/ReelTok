import { useEffect, useState, useRef } from "react";
import {concat, shuffle} from "lodash";
import "./App.css";
import Video from "./Video";
import Image from "./Image";
import Swiper, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import videoList from "../video.json";
import imageList from "../image.json";
import adsList from "../ad.json";
Swiper.use([Navigation]);

function VideoContainer() {
  const [loading, setload] = useState(null);
  const [data, setData] = useState([
    {
      content: []
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
      const data = shuffle(concat(imageList.Images, videoList.Video));
      const content = []
      let ed_index_counter = 0;
      const ed_interval_count = 3;
      try {
        for (var i = 0; i < data.length; i++)  {
          content.push(data[i]);
            if((i+1) % ed_interval_count === 0){
              content.push(adsList[ed_index_counter]);
              ed_index_counter = ed_index_counter === adsList.length - 1 ? 0 : ed_index_counter + 1; 
          }
        }
        setData([
          {
            content: content
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
        {data.map(({ content }, k) => {
          return (
            <div className="swiper-container" ref={swipeRef} key={k}>
              <div className="swiper-wrapper">
                {content.map((v,k) => (
                  <div className="swiper-slide" key={k}>
                    {loading ? (
                      v.type === 'video' || v.type === 'ad' ?
                      <Video 
                        className="lazy"
                        source={ v.location + '/' + v.filename}
                        videoData = {v}
                        swipeRef = {swipeRef}
                      /> : 
                      <Image
                        className="lazy"
                        source={ v.location + '/' + v.filename}
                        imageData = {v}
                      />
                    ) : (
                      <p className="loading-txt">Loading...</p>
                    )}
                    {v.type === 'video' || v.type === 'image' ? <>
                    <p id="author">{v.category}</p>
                    <p id="title">
                      {v.title.length < 100
                        ? v.title
                        : v.title.substring(0, 100) + "..."}{" "}
                    </p>
                    { v.type === 'video' ? 
                      <a id="link" href={'//'+v.no_link_attribution_sources} target="_blank" rel="noreferrer">{v.no_link_attribution_sources}</a> : 
                      <p id="link" className="img-attr">{v.no_link_attribution_sources}</p>}
                    
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
