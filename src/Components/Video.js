import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from '@material-ui/icons/Share';

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

function Video({ source, videoData, swipeRef }) {
  const [click, setClicked] = useState(false);
  const [count, setCount] = useState();
  const [edCounter, setEdCounter] = useState(5);
  const [canPlays, setCanPlay] = useState(false);
  const videoRef = useRef();
  const audioRef = useRef(false);
  const playRef = useRef(false);
  const edTimerRef = useRef(false);
  const ref = useRef();
  const navSec = useRef(null);

  const onScreen = useOnScreen(ref);
  const debouncedSearchTerm = useDebounce(onScreen, 400);

  if(videoData.type === 'ad' && edCounter === 5 && onScreen === true){
    swipeRef.current.style.pointerEvents = "none";
  }

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

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ReelTok',
        text: videoData.title,
        url: window.location.href,
      })
        .then()
        .catch((error) => console.log('Error sharing', error));
    }
  }

  const canPlay = (e) => {
    setCanPlay(true);
  };

  useEffect(() => {
    if (debouncedSearchTerm === true && canPlays === true) {
      if(videoData.type === 'ad' && edCounter === 5){
        const edTimer = setInterval(() => {
          setEdCounter((value) => {
            if(value === 0){
              swipeRef.current.style.pointerEvents = "all";
              clearInterval(edTimer);
            }
            return value - 1
          });
        },1000)
      }

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

      <h1 id="logo">ReelTok</h1>
      {videoData.type === 'video' ?
      <div id="ld">
        <IconButton id="icons" onClick={clickFunc}>
          {click ? (
            <FavoriteIcon style={{ fontSize: "40px" }} />
          ) : (
            <FavoriteBorderIcon style={{ fontSize: "40px" }} />
          )}
        </IconButton>
        <span id="like-count">{count}</span>
        <IconButton id="icons2" onClick={shareLink}>
          <ShareIcon style={{ fontSize: "40px" }} />
        </IconButton>
      </div> : videoData.type === 'ad' ? <><span className='sponsored-txt'>Sponsored</span> <span className="ed-timer" ref={edTimerRef}>{edCounter >= 0 ? 'Skip in ' + edCounter : ''}</span></> : <></>
    }
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
        <></>
      )}
    </div>
  );
}
export default Video;
