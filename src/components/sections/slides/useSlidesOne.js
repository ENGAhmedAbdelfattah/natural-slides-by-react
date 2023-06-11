import slideImgOne from "./../../../assets/code img-1.jpg";
import slideImgTwo from "./../../../assets/code img-2.jpg";
import slideImgThree from "./../../../assets/code img-3.jpg";
import slideImgFour from "./../../../assets/code img-4.jpg";
import slideImgFive from "./../../../assets/code img-5.jpg";

import { useEffect, useRef, useState } from "react";

const useSlides = () => { 
  const [slideItems, setSlideItems] = useState([
      {
        id: "slide-1",
        image: slideImgOne,
        paragraph: "1 image for display montains",
        active: true,
      },
      {
        id: "slide-2",
        image: slideImgTwo,
        paragraph: "2 image for display montains",
        active: false,
      },
      {
        id: "slide-3",
        image: slideImgThree,
        paragraph: "3 image for display montains",
        active: false,
      },
      {
        id: "slide-4",
        image: slideImgFour,
        paragraph: "4 image for display montains",
        active: false,
      },
      {
        id: "slide-5",
        image: slideImgFive,
        paragraph: "5 image for display montains",
        active: false,
      },
    ]);
  
  const [slidebox, setSlidebox] = useState(null);
  const [slideItem, setSlideItem] = useState(null);
  
  const refBox = useRef();
  const refItem = useRef();

  useEffect(() => {
    if(refBox) setSlidebox(refBox.current)
    if(refItem) setSlideItem(refItem.current)

  },[refBox,refItem]);
  useEffect(() => {
    const slideItemsClone = [...slideItems];
    slideItemsClone.push(slideItemsClone[0], slideItemsClone[1]);
    setSlideItems(slideItemsClone);
  },[]);

  const handleClickRight = () => {
    slidebox.scrollLeft += slideItem.offsetWidth;
    handleLoopSlide();
  };

  const handleClickLeft = () => {
    slidebox.scrollLeft -= slideItem.offsetWidth - 20;
    handleLoopSlide();
  };

  const handleBolletClick = (inx) => {
    slidebox.scrollLeft = inx * slideItem.offsetWidth;
    let slideItemsClone = [...slideItems];
    const newSlideItems = slideItemsClone.map((el) => ({
      ...el,
      active: false,
    }));
    newSlideItems[inx][`active`] = true;
    setSlideItems(newSlideItems);
  };

  const handleActive = () => {
    const slideItemsClone = [...slideItems];
    const newSlideItems = slideItemsClone.map((el) => ({
      ...el,
      active: false,
    }));
    for (let x = 0; x < slideItems.length; x++) {
      if (
        slideItem.offsetWidth * x <=
          slidebox.scrollLeft + 0.5 * slideItem.offsetWidth &&
        slideItem.offsetWidth * x >=
          slidebox.scrollLeft - 0.2 * slideItem.offsetWidth
      ) {
        newSlideItems[x]["active"] = true;
      }
    }
    setSlideItems(newSlideItems);
    handleLoopSlide();
  };

  const handleLoopSlide = () => {
    // console.log("slidebox.scrollLeft",slidebox.scrollLeft)
    // console.log("slideboxRightEdge",slidebox.scrollLeft + slidebox.offsetWidth)
    // console.log("slideItem.offsetWidth * slideItems.length",slideItem.offsetWidth * slideItems.length)

    const slideboxRightEdge = slidebox.scrollLeft + slidebox.offsetWidth

    if (slideboxRightEdge >= slideItem.offsetWidth * slideItems.length) {
      slidebox.classList.add("no-smooth");
      slidebox.scrollLeft = 0;
      slidebox.classList.remove("no-smooth");
    }
    // if (slidebox.scrollLeft = slideItem.offsetWidth ) {
    //   slidebox.classList.add("no-smooth");
    //   slidebox.scrollLeft = slideboxRightEdge + slideItem.offsetWidth * 3;
    //   slidebox.classList.remove("no-smooth");
    // }
  }
  
  return {slideItems,refBox, refItem, handleClickRight, handleClickLeft, handleBolletClick, handleActive}
}

export default useSlides

// style={{ transform: `translateX(${currentIndex * 50})` }}