// export const parseDateTime = (dateTimeStr: string): Date => {
//   const defaultDatePart = "2020-09-01";
//   return new Date(`${defaultDatePart}T${dateTimeStr}`);
// };

import { runwayPaths } from "./runway";

//时间格式化
export const parseDateTime = (dateTimeStr: string): Date => {
  const defaultDatePart = "2020-09-01";
  const [hours, minutes, seconds, milliseconds] = dateTimeStr
    .split(":")
    .map(Number);

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMilliseconds = milliseconds.toString().padStart(3, "0");

  const formattedTime = `${hours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  return new Date(`${defaultDatePart}T${formattedTime}`);
};

//分离毫秒不显示
export const formatTime = (time) => {
  return time.split(":").slice(0, 3).join(":");
};

//插入采样丢失的事件点
export const updateDataWithInterpolatedPoints = (limits, originalData) => {
  const targetPoints = [];

  for (const limitType in limits) {
    limits[limitType].forEach((item) => {
      if (!targetPoints.includes(item.time)) {
        targetPoints.push(item.time);
      }
    });
  }

  // 检查并创建缺失的目标点
  const existingTimes = new Set(originalData.map((d) => d.time));
  targetPoints.forEach((time) => {
    if (!existingTimes.has(time)) {
      // 找到前后的时间点
      const before = originalData
        .filter(
          (d) => parseDateTime(d.time).getTime() < parseDateTime(time).getTime()
        )
        .sort(
          (a, b) =>
            parseDateTime(b.time).getTime() - parseDateTime(a.time).getTime()
        )[0];
      const after = originalData
        .filter(
          (d) => parseDateTime(d.time).getTime() > parseDateTime(time).getTime()
        )
        .sort(
          (a, b) =>
            parseDateTime(a.time).getTime() - parseDateTime(b.time).getTime()
        )[0];

      let interpolatedX, interpolatedY, interpolateRef;

      if (before && after) {
        // 插值计算
        interpolatedX = (before.value.x + after.value.x) / 2;
        interpolatedY = (before.value.y + after.value.y) / 2;
        interpolateRef = (before.value.ref + after.value.ref) / 2;
      } else if (before) {
        // 仅有 before，使用 before 的值进行外推
        interpolatedX = before.value.x;
        interpolatedY = before.value.y;
        interpolateRef = before.value.ref;
      } else if (after) {
        // 仅有 after，使用 after 的值进行外推
        interpolatedX = after.value.x;
        interpolatedY = after.value.y;
        interpolateRef = after.value.ref;
      }

      if (before || after) {
        console.log(
          "Interpolated Point:",
          time,
          before,
          after,
          interpolatedX,
          interpolatedY
        );
        originalData.push({
          time: time,
          value: { ref: interpolateRef, x: interpolatedX, y: interpolatedY },
        });
      }
    }
  });

  const sortedData = originalData.sort((a, b) => {
    return parseDateTime(a.time).getTime() - parseDateTime(b.time).getTime();
  });
  return sortedData;
};

//获取当前跑道信息
export const getImagePath = (runwayKey: string, viewType: string) => {
  if (viewType === "top") {
    return (
      runwayPaths[runwayKey] ||
      require("../../../../assets/runways/normalRunway.png")
    );
  } else {
    return (
      runwayPaths[runwayKey + "_glide"] ||
      require("../../../../assets/runways/normalRunway-Slide.png")
    );
  }
};

export function getTargetDataPointsScatter(
  limits,
  limitType,
  currentRef,
  originalData,
  entireDomain,
  minX,
  maxX,
  minY,
  maxY
) {
  const targetPoints = limits[limitType]?.map((item) => item.time);
  if (limitType === "exceedance" && currentRef === "top_view") {
    console.log("Current Ref:", targetPoints);
  }

  // Filter the original data to match target points and within x, y bounds
  let filteredData = null;

  if (minY > maxY) {
    filteredData = originalData
      .filter((d) => targetPoints.includes(d.time))
      .filter((d) => d.value.x >= minX && d.value.x <= maxX)
      .filter((d) => d.value.y >= maxY && d.value.y <= minY);
  } else {
    filteredData = originalData
      .filter((d) => targetPoints.includes(d.time))
      .filter((d) => d.value.x >= minX && d.value.x <= maxX)
      .filter((d) => d.value.y >= minY && d.value.y <= maxY);
  }

  if (limitType === "exceedance" && currentRef === "top_view") {
    console.log("minY,maxY", minY, maxY);
    console.log("Filtered Data:", filteredData);
  }

  // Map the filtered data to the desired structure
  const mappedData = filteredData
    .map((d) => {
      const limitItems = limits[limitType].filter(
        (item) => item.time === d.time
      );
      if (limitType === "exceedance" && currentRef === "top_view") {
        console.log(
          `Mapping Data for time: ${d.time}, found limitItems:`,
          limitItems
        );
      }
      return limitItems.map((limitItem) => ({
        x: d.value.x,
        y: d.value.y,
        time: d.time,
        source: limitItem ? limitItem.source : undefined,
        result: limitItem ? limitItem.result : undefined,
        ref_views: limitItem ? limitItem.ref_views : [],
        progress:
          (parseDateTime(d.time).getTime() - entireDomain.x[0].getTime()) /
          (entireDomain.x[1].getTime() - entireDomain.x[0].getTime()),
      }));
    })
    .flat(); // Flatten the array of arrays

  if (limitType === "exceedance" && currentRef === "top_view") {
    console.log("Mapped Data:", mappedData);
  }

  // Further filter based on progress time and ref_views
  const furtherFilteredData = mappedData
    .filter((d) => {
      const progressTime =
        entireDomain.x[0].getTime() +
        (entireDomain.x[1].getTime() - entireDomain.x[0].getTime()) *
          d.progress;
      const withinProgressTime =
        parseDateTime(d.time).getTime() <= progressTime;
      if (limitType === "exceedance" && currentRef === "top_view") {
        console.log(
          `Filtering progress time for ${d.time}:`,
          withinProgressTime
        );
      }
      return withinProgressTime;
    })
    .filter((d) => d.ref_views.includes(currentRef));

  if (limitType === "exceedance" && currentRef === "top_view") {
    console.log("Further Filtered Data:", furtherFilteredData);
  }

  // Reduce to unique times but keep all instances with the same time
  const uniqueTimes = new Set();
  const targetDataPointsScatter = furtherFilteredData.reduce((unique, d) => {
    if (!uniqueTimes.has(d.time)) {
      uniqueTimes.add(d.time);
      unique.push(d);
    }
    return unique;
  }, []);

  if (limitType === "exceedance" && currentRef === "top_view") {
    console.log("Target Data Points Scatter:", targetDataPointsScatter);
  }

  // Final filter to ensure only unique entries are kept
  const finalFilteredData = targetDataPointsScatter.filter((d) => {
    const includesRef = d.ref_views.includes(currentRef);
    if (!includesRef) {
      console.log(
        `ref_views does not include ${currentRef} for time ${d.time}`
      );
    }
    return includesRef;
  });

  if (limitType === "exceedance" && currentRef === "top_view") {
    console.log("Final Filtered Data:", finalFilteredData);
  }

  return finalFilteredData;
}
