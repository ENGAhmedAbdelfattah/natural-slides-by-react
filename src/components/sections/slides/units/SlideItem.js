import React from "react";

function SlideItem({ image, paragraph, forwardedRef }) {
  return (
    <div ref={forwardedRef} className={`slides-item`}>
      <div className="image-handle">
        <img src={image} alt="Mountain next to river" />
      </div>
      <p>{paragraph}</p>
    </div>
  );
}

export default SlideItem;