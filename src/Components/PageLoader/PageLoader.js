import React from "react";
import "./PageLoaderStyle.css";

const PageLoader = () => {
  
  return (
    <div className="preloader-wrapper">
      <div className="cssloader">
        <img src={require('../../Assets/Bean Eater-1s-200px.gif')} alt="" />
        
      </div>
    </div>
  );
};
export default PageLoader;
