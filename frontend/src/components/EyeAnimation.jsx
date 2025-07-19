import Lottie from "lottie-react";
import animationData from "../assets/splash_eye.json"; 

const EyeAnimation = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}    
      speed={1}      
      style={{ width: 300, height: 300 }} 
    />
  );
};

export default EyeAnimation;
