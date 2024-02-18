"use client";

import { Box } from "@radix-ui/themes";
import { useStopwatch } from "react-timer-hook";

const Stopwatch = () => {
  const stopWatch = useStopwatch({ autoStart: true });

  return (
    <Box>{`${String(stopWatch.hours).padStart(2, "0")}:${String(
      stopWatch.minutes
    ).padStart(2, "0")}:${String(stopWatch.seconds).padStart(2, "0")}`}</Box>
  );
};

export default Stopwatch;
