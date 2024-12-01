"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./index.module.scss";
import { TzFloatButtonBackTop } from "../TzIFloatButton";

const TzPageProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  let width = 44;
  let strokeWidth = 3;
  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  let getStrokeDasharray = useMemo(() => {
    return Math.PI * 2 * (width / 2);
  }, []);
  return (
    <div className={styles['progress']}>
      <svg width={width + strokeWidth * 2} height={width + strokeWidth * 2}>
        <motion.circle
          cx={width / 2 + strokeWidth}
          cy={width / 2 + strokeWidth}
          r={width / 2}
          stroke={"rgb(61, 90, 245)"}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={getStrokeDasharray}
          strokeDashoffset={
            getStrokeDasharray - (scrollProgress / 100) * getStrokeDasharray
          }
          transition={{ duration: 0.3 }}
        ></motion.circle>
      </svg>
      <TzFloatButtonBackTop className="!absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90" />
    </div>

  );
};

export default TzPageProgress;
