import slideImgOne from "./../../../assets/code img-1.jpg";
import slideImgTwo from "./../../../assets/code img-2.jpg";
import slideImgThree from "./../../../assets/code img-3.jpg";
import slideImgFour from "./../../../assets/code img-4.jpg";
import slideImgFive from "./../../../assets/code img-5.jpg";

import { useEffect, useRef, useState } from "react";

const useSlides = () => {
  const [slideItemsBase] = useState([
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
  const [slideItems, setSlideItems] = useState([
    {
      type: "slide-1",
      image: slideImgOne,
      paragraph: "1 image for display montains",
      active: true,
    },
    {
      type: "slide-2",
      image: slideImgTwo,
      paragraph: "2 image for display montains",
      active: false,
    },
    {
      type: "slide-3",
      image: slideImgThree,
      paragraph: "3 image for display montains",
      active: false,
    },
    {
      type: "slide-4",
      image: slideImgFour,
      paragraph: "4 image for display montains",
      active: false,
    },
    {
      type: "slide-5",
      image: slideImgFive,
      paragraph: "5 image for display montains",
      active: false,
    },
  ]);

  const [slidebox, setSlidebox] = useState(null);
  const [slideItem, setSlideItem] = useState(null);

  const [isOnce, setIsOnce] = useState(true);

  const refBox = useRef();
  const refItem = useRef();

  useEffect(() => {
    const updateState = () => {
      if (isOnce) {
        const slideItemsClone = [...slideItems];
        slideItemsClone.push(...slideItemsClone);
        slideItemsClone.push(slideItemsClone[0]);
        setSlideItems(slideItemsClone);
        console.log(slideItemsClone);
        setIsOnce(false);
      }
      if (slidebox && slideItem) {
        slidebox.classList.add("no-smooth");
        slidebox.scrollLeft =
          ((slideItems.length - 1) / 2) * slideItem.offsetWidth;
        slidebox.classList.remove("no-smooth");
        setSlidebox(slidebox);
        setSlideItem(slideItem);
      }
    };
    updateState();
  }, [slidebox, slideItem]);

  useEffect(() => {
    const updateRefAndScroll = () => {
      if (refBox && refItem) {
        setSlidebox(refBox.current);
        setSlideItem(refItem.current);
      }
    };
    updateRefAndScroll();
  }, [refBox, refItem]);

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
  };

  const handleActive = () => {
    if (slidebox && slideItem) {
      const slideItemsClone = [...slideItems];
      const newSlideItems = slideItemsClone.map((el) => ({
        ...el,
        active: false,
      }));
      for (let x = 0; x < newSlideItems.length; x++) {
        if (
          slideItem.offsetWidth * x <=
            slidebox.scrollLeft + 0.5 * slideItem.offsetWidth &&
          slideItem.offsetWidth * x >=
            slidebox.scrollLeft - 0.2 * slideItem.offsetWidth
        ) {
          newSlideItems[x]["active"] = true;
          newSlideItems.forEach((el) => {
            if (el.type === `slide-${x + 1}`) el.active = true;
          });
        }
      }
      setSlideItems(newSlideItems);
      handleLoopSlide();
    }
  };

  const handleLoopSlide = () => {
    const slideboxRightEdge = slidebox.scrollLeft + slidebox.offsetWidth;

    if (slideboxRightEdge >= slideItem.offsetWidth * slideItems.length) {
      slidebox.classList.add("no-smooth");
      slidebox.scrollLeft =
        ((slideItems.length + 1) / 2) * slideItem.offsetWidth -
        2 * slideItem.offsetWidth;
      slidebox.classList.remove("no-smooth");
    }

    if (slidebox.scrollLeft === 0) {
      slidebox.classList.add("no-smooth");
      slidebox.scrollLeft = slideboxRightEdge + slideItem.offsetWidth * 3;
      slidebox.classList.remove("no-smooth");
    }
  };

  return {
    slideItemsBase,
    slideItems,
    refBox,
    refItem,
    handleClickRight,
    handleClickLeft,
    handleBolletClick,
    handleActive,
  };
};

export default useSlides;

// style={{ transform: `translateX(${currentIndex * 50})` }}
