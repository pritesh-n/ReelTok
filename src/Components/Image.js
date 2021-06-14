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

function Image({ source }) {
  const [click, setClicked] = useState(false);
  const [count, setCount] = useState();
  const ref = useRef();

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

  return (
    <div id="video-container" ref={ref}>

      <h1 id="logo">ReelTok</h1>

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
        <img
          width="auto"
          height="100%"
          src={source}
        />
      ) : (
        <div className="loading-txt">Loading...</div>
      )}
    </div>
  );
}
export default Image;
