import { useState, useEffect } from "react";

const useGlobalCountdown = (key, durationInSeconds) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const endTimeKey = `${key}_endTime`;
    let endTime = parseInt(sessionStorage.getItem(endTimeKey), 10);

    if (!endTime || isNaN(endTime)) {
      // 第一次访问时写入
      endTime = Date.now() + durationInSeconds * 1000;
      sessionStorage.setItem(endTimeKey, endTime);
    }

    const updateTimer = () => {
      const remainingTime = Math.max(
        0,
        Math.floor((endTime - Date.now()) / 1000)
      );
      console.log(`[${key}] remainingTime:`, remainingTime);
      setTimeLeft(remainingTime);
    };

    // 立即更新一次，确保初始状态正确
    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [key, durationInSeconds]);

  return timeLeft;
};

export default useGlobalCountdown;
