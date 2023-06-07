
import SlideItem from "./units/SlideItem";
import useSlides from "./useSlides";

function App() {
  const {slideItems, refOne, refTwo, handleClickRight, handleClickLeft, handleBolletClick, handleActive} = useSlides();
  
  return (
    <div className="slides-section">
      <div className="container">
        <h1 className="slides-header">Natural Slides</h1>
        <div className="slides">
          <i className="fa-solid fa-angle-left" onClick={handleClickLeft}></i>
          <div ref={refOne} className="slides-box" id="slides-box" onScroll={handleActive}>
            {slideItems.map((el) => (
              <SlideItem
                forwardedRef={refTwo}
                key={el.id}
                image={el.image}
                paragraph={el.paragraph}
              />
            ))}
          </div>
          <i className="fa-solid fa-angle-right" onClick={handleClickRight}></i>
        </div>
        <div className="bollets">
          {slideItems.map((el, inx) => (
            <div
              key={el.id}
              className={`bollet-item ${el.active ? "active" : ""}`}
              onClick={() => handleBolletClick(inx)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
