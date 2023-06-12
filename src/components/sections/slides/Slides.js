import SlideItem from "./units/SlideItem";
import useSlides from "./useSlidesFour";

function App() {
  const {
    slideItemsBase,
    slideItems,
    refBox,
    refItem,
    handleClickRight,
    handleClickLeft,
    handleBolletClick,
    handleActive,
  } = useSlides();

  return (
    <div className="slides-section">
      <div className="container">
        <h1 className="slides-header">Natural Slides</h1>
        <div className="slides">
          <i className="fa-solid fa-angle-left" onClick={handleClickLeft}></i>
          <div
            ref={refBox}
            className="slides-box"
            id="slides-box"
            onScroll={handleActive}
          >
            {slideItems.map((el, inx) => (
              <SlideItem
                forwardedRef={refItem}
                key={inx}
                image={el.image}
                paragraph={el.paragraph}
              />
            ))}
          </div>
          <i className="fa-solid fa-angle-right" onClick={handleClickRight}></i>
        </div>
        <div className="bollets">
          {slideItems.slice(slideItemsBase.length, -1).map((el, inx) => (
            <div
              key={inx}
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

// 5+{5}+1
// {5} is active slice(-6, -1)

// .slice(-7, -2)
