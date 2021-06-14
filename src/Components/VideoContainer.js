import { useEffect, useState } from "react";
import "./App.css";
import Video from "./Video";
import Swiper, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import videoList from "../video.json";
Swiper.use([Navigation]);

function VideoContainer() {
  const [loading, setload] = useState(null);
  const [data, setData] = useState([
    {
      video: [],
      author: [],
      title: [],
    },
  ]);

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
      const author = [];
      const title = [];
      try {
        for (var i = 0; i < data.length; i++) {
          if (
            data[i].type === 'video' &&
            data[i].length < 45
          ) {
            video.push(data[i]);
            author.push(data[i].category);
            title.push(data[i].title);
          }
        }
        setData([
          {
            video: video,
            author: author,
            title: title,
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
        {data.map(({ video, author, title }) => {
          return (
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {video.map((v, index) => (
                  <div className="swiper-slide">
                    {loading ? (
                      <Video
                        className="lazy"
                        source={ v.location + '/' + v.filename}
                      />
                    ) : (
                      <p className="loading-txt">Loading...</p>
                    )}
                    <p id="author">{author[index]}</p>
                    <p id="title">
                      {title[index].length < 100
                        ? title[index]
                        : title[index].substring(0, 100) + "..."}{" "}
                    </p>
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
