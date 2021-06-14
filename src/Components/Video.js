import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return isIntersecting;
}
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function Video({ source }) {
  const [click, setClicked] = useState(false);
  const [count, setCount] = useState();
  const [canPlays, setCanPlay] = useState(false);
  console.log(canPlays);
  const videoRef = useRef();
  const audioRef = useRef(false);
  const playRef = useRef(false);
  const ref = useRef();
  const navSec = useRef(null);

  const onScreen = useOnScreen(ref);
  const debouncedSearchTerm = useDebounce(onScreen, 400);

  const clickFunc = () => {
    if (click === false) {
      setClicked(true);
      setCount(1);
    } else {
      setClicked(false);
      setCount("");
      console.log(click);
    }
  };
  const canPlay = (e) => {
    setCanPlay(true);
  };

  useEffect(() => {
    if (debouncedSearchTerm === true && canPlays === true) {
      audioRef.current.currentTime = videoRef.current.currentTime;
      videoRef.current.play();
      audioRef.current.play();

      playRef.current.style.display = "none";
    }
  });

  const videoPlay = () => {
    if (
      videoRef.current.paused === false &&
      audioRef.current.paused === false
    ) {
      videoRef.current.pause();
      audioRef.current.pause();
      playRef.current.style.display = "block";
    } else {
      videoRef.current.play();
      audioRef.current.play();
      playRef.current.style.display = "none";
    }
  };
  return (
    <div id="video-container" ref={ref}>
      <img ref={playRef} id="play-btn" src="./play.png" alt="play" />

      <h1 id="logo"><svg xmlns="http://www.w3.org/2000/svg" width="85" height="39" viewBox="0 0 85 39">
        <g fill="none" fill-rule="nonzero">
          <path fill="#FFF" d="M0 3.434h25.99l-3.048 6.964H7.948v4.876h13.56l-3.09 6.94-10.47-.345v10.242H0zM35.901 3.229L48.11 32.111h-8.522l-2.089-5.12H26.438l-2.049 5.12h-8.357L28.24 3.23h7.661zm-3.892 9.423l-3.236 8.152h6.432l-3.196-8.152zM73.103 32.504c1.748 0 3.332-.212 4.752-.635 1.42-.423 2.635-1.038 3.646-1.843a8.44 8.44 0 0 0 2.356-2.93c.56-1.147.84-2.458.84-3.932v-.082c0-1.339-.246-2.493-.738-3.462-.492-.97-1.202-1.796-2.13-2.479-.929-.683-2.055-1.263-3.38-1.74-1.325-.479-2.806-.895-4.445-1.25a28.76 28.76 0 0 1-2.438-.635c-.642-.205-1.147-.41-1.515-.615-.37-.205-.629-.43-.779-.676a1.617 1.617 0 0 1-.225-.86v-.082c0-.519.239-.956.717-1.311s1.195-.533 2.15-.533c1.284 0 2.616.24 3.995.717 1.38.478 2.724 1.182 4.035 2.11l3.974-5.612a16.61 16.61 0 0 0-5.223-2.848c-1.926-.642-4.118-.962-6.576-.962-1.72 0-3.263.225-4.629.676-1.366.45-2.533 1.085-3.503 1.905a8.176 8.176 0 0 0-2.212 2.908c-.505 1.12-.758 2.349-.758 3.687v.082c0 1.475.28 2.71.84 3.708a7.427 7.427 0 0 0 2.294 2.499c.97.669 2.11 1.215 3.421 1.639a52.6 52.6 0 0 0 4.26 1.167c.984.219 1.783.43 2.397.635.615.205 1.106.417 1.475.635.369.219.621.444.758.676.137.232.205.499.205.799v.082c0 .628-.28 1.113-.84 1.454-.56.342-1.372.512-2.438.512-3.332 0-6.432-1.147-9.3-3.44l-4.424 5.284a17.752 17.752 0 0 0 6.125 3.564c2.308.792 4.745 1.188 7.313 1.188z"/>
          <path fill="#E31720" stroke="#FFF" stroke-width="1.254" d="M66.165 25.033l14.613 12.513h-10.5l-9.013-7.79c-1.537.967-2.8 1.619-4.023 1.992-1.535.47-3.153.704-4.853.704-2.293 0-4.423-.405-6.385-1.216-1.957-.808-3.65-1.91-5.074-3.306a15.29 15.29 0 0 1-3.353-4.91c-.813-1.883-1.22-3.893-1.22-6.026v-.082c0-2.132.407-4.149 1.22-6.044a15.151 15.151 0 0 1 3.396-4.955c1.45-1.408 3.156-2.517 5.113-3.325 1.962-.81 4.092-1.215 6.385-1.215s4.422.405 6.384 1.215c1.958.809 3.651 1.911 5.075 3.307a15.29 15.29 0 0 1 3.353 4.91c.812 1.882 1.219 3.892 1.219 6.025v.082c0 1.593-.228 3.117-.685 4.571a14.691 14.691 0 0 1-1.652 3.55zM52.592 8.956a8.103 8.103 0 1 0 0 16.205 8.103 8.103 0 0 0 0-16.205z"/>
        </g>
      </svg></h1>

      <div id="ld">
        <IconButton id="icons" onClick={clickFunc}>
          {click ? (
            <FavoriteIcon style={{ fontSize: "40px" }} />
          ) : (
            <FavoriteBorderIcon style={{ fontSize: "40px" }} />
          )}
        </IconButton>
        <span id="like-count">{count}</span>
      </div>
      {debouncedSearchTerm ? (
        <video
          ref={videoRef}
          onClick={videoPlay}
          width="450"
          height="900"
          src={source}
          type="video/mp4"
          preload="auto"
          onCanPlayThrough={canPlay}
          playsInline
        />
      ) : (
        <div className="loading-txt">Loading...</div>
      )}
      {debouncedSearchTerm ? (
        <audio ref={audioRef}>
          <source src={source} />
        </audio>
      ) : (
        console.log("audio element is loading")
      )}
    </div>
  );
}
export default Video;
