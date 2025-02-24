import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  LineSegment,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryZoomContainer,
} from "victory-native";
import Slider from "@react-native-community/slider";
import { PaperProvider, Portal } from "react-native-paper";
import OverEventModal from "../modals/OverEventModal";
import { parseDateTime } from "./tools";

export type DomainTuple = [Date, Date];

const HighSpeedView: React.FC<{
  data: any;
  limits: any;
  minY: number;
  maxY: number;
  minX: number;
  maxX: number;
  xAxis: string;
  yAxis: string;
  xUnit: string;
  yUnit: string;
  gapX: number;
  gapY: number;
  tolUpper: number;
  tolLower: number;
  xDecimal: number;
  yDecimal: number;
}> = ({
  data,
  limits,
  minY,
  maxY,
  minX,
  maxX,
  xAxis,
  yAxis,
  xUnit,
  yUnit,
  gapX,
  gapY,
  tolUpper,
  tolLower,
  xDecimal,
  yDecimal,
}) => {
  const originalData = data;
  const screenWidth = Dimensions.get("window").width;
  const [maxPoints, setMaxPoints] = useState(originalData.length);
  const baseTime = parseDateTime(originalData[0].time);
  const padding = 50;

  console.log("minY,maxY", minY, maxY);

  console.log("tolUpper,tolLower", tolUpper, tolLower);

  const entireDomain = {
    x: [
      parseDateTime(originalData[0].time),
      parseDateTime(originalData[originalData.length - 1].time),
    ] as DomainTuple,
    y: [minY, maxY] as [number, number],
  };

  const [zoomedXDomain, setZoomedXDomain] = useState<DomainTuple>(
    entireDomain.x
  );

  const tickValues = useMemo(() => {
    let values = [minX, maxX];
    const interval = (maxX - minX) / gapX;
    for (let i = 1; i < gapX; i++) {
      const tick = minX + interval * i;
      values.push(tick);
    }
    if (minX < 0 && maxX > 0) {
      values.push(0);
    }
    return values.sort((a, b) => a - b);
  }, [minX, maxX]);

  const yTickValues = useMemo(() => {
    const values = [minY, maxY];
    const steps = gapY;
    const increment = (maxY - minY) / steps;
    for (let i = 1; i < steps; i++) {
      const tick = minY + increment * i;
      values.push(tick);
    }
    return values.sort((a, b) => a - b);
  }, [minY, maxY]);

  const onDomainChange = useCallback(
    (domain: { x: DomainTuple; y: DomainTuple }) => {
      setZoomedXDomain(domain.x);
      const width = domain.x[1].getTime() - domain.x[0].getTime();
      const newMaxPoints = Math.min(screenWidth, width / 1000);
      setMaxPoints(40);
    },
    []
  );

  const getData = useCallback((): any => {
    const filtered = originalData.filter(
      (d) =>
        parseDateTime(d.time) >= zoomedXDomain[0] &&
        parseDateTime(d.time) <= zoomedXDomain[1]
    );
    if (filtered.length > maxPoints) {
      const k = Math.ceil(filtered.length / maxPoints);
      return filtered.filter((_, i) => i % k === 0);
    }
    return filtered;
  }, [zoomedXDomain, maxPoints]);

  const getZoomFactor = useCallback((): number => {
    const entireRange =
      entireDomain.x[1].getTime() - entireDomain.x[0].getTime();
    const zoomedRange = zoomedXDomain[1].getTime() - zoomedXDomain[0].getTime();
    const factor = entireRange / zoomedRange;
    return parseFloat(factor.toFixed(factor < 3 ? 1 : 0));
  }, [zoomedXDomain, entireDomain.x]);

  /***************modal框控制*** */
  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  /***************modal框控制*** */

  /********************** */
  const [progress, setProgress] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(1000); // 总播放时间为1000毫秒
  const progressIncrement = 0.1 / (totalDuration / 1000); // 每次间隔增加的进度
  const renderedData = getData().slice(0, Math.floor(progress * maxPoints));
  const renderedDataTmp = getData();
  const processedData = renderedDataTmp.map((d) => {
    if (d.value["ref"] === 99999.9) {
      return { ...d, value: { ...d.value, ref: null } };
    }
    return d;
  });

  const targetPoints = limits?.map((item) => item.time);
  const targetDataPointsScatter = originalData
    .filter((d) => {
      const today = new Date().toISOString().split("T")[0];
      const fullDateTimeString = `${today}T${d.time}`;
      const date = new Date(fullDateTimeString);
      const differenceInMillis = date.getTime() - baseTime.getTime();
      const positiveDiffInMillis = Math.max(0, differenceInMillis);
      const hours = Math.floor(positiveDiffInMillis / (1000 * 60 * 60));
      const minutes = Math.floor(
        (positiveDiffInMillis % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((positiveDiffInMillis % (1000 * 60)) / 1000);

      const hoursFormatted = hours.toString().padStart(2, "0");
      const minutesFormatted = minutes.toString().padStart(2, "0");
      const secondsFormatted = seconds.toString().padStart(2, "0");
      const timeFormatted = `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
      return targetPoints.includes(timeFormatted);
    })
    .map((d) => ({
      x: parseDateTime(d.time).getTime(),
      y: d.value,
      time: d.time,
      value: d.value,
      progress:
        ((parseDateTime(d.time).getTime() - entireDomain.x[0].getTime()) /
          (entireDomain.x[1].getTime() - entireDomain.x[0].getTime())) *
        100,
    }))
    .filter((d) => {
      const lastIndex = Math.floor(progress * maxPoints) - 1;
      if (lastIndex >= 0) {
        const lastTime = parseDateTime(
          renderedData[Math.min(lastIndex, renderedData.length - 1)].time
        ).getTime();
        return d.x <= lastTime;
      }
      return false;
    });

  const handlePlayPause = () => {
    if (progress >= 1) {
      setProgress(0);
      setZoomedXDomain(entireDomain.x);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + progressIncrement;
          if (nextProgress >= 1) {
            setIsPlaying(false);
            clearInterval(interval);
            return 1;
          }
          return nextProgress;
        });
      }, 100);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, progressIncrement]);
  /********************** */
  const screenHeight = Dimensions.get("window").height;

  const chartWidth = screenWidth - 50 * 2 - 20; // 计算视图（图表）的实际宽度
  const chartHeight = screenHeight * 0.29;

  return (
    <PaperProvider>
      <Portal>
        <ScrollView
          contentContainerStyle={{ backgroundColor: "rgba(35, 40, 56, 1)" }}
        >
          <VictoryChart
            domain={entireDomain}
            // containerComponent={
            //   <VictoryZoomContainer
            //     zoomDimension="x"
            //     onZoomDomainChange={onDomainChange}
            //   />
            // }
            // domainPadding={30}
            padding={{
              top: padding,
              bottom: padding,
              left: padding,
              right: padding,
            }}
            width={chartWidth * 1.13}
          >
            <VictoryAxis
              tickFormat={(t) => {
                const date = new Date(t);
                const differenceInMillis = date.getTime() - baseTime.getTime();
                const minutes = Math.floor(differenceInMillis / (1000 * 60));
                const seconds = Math.floor(
                  (differenceInMillis % (1000 * 60)) / 1000
                );
                return `${minutes}m ${seconds}s`;
              }}
              label={xAxis + "[" + xUnit + "]"}
              offsetY={50}
              style={{
                axis: { stroke: "rgba(240, 245, 255, 0.1)" },
                grid: {
                  stroke: "rgba(240, 245, 255, 0.1)",
                  strokeWidth: 1,
                  strokeDasharray: "5 0",
                },
                axisLabel: {
                  fill: "rgba(130, 144, 174, 1)",
                  fontSize: 18,
                  padding: 30,
                },
                ticks: { size: 3, stroke: "transparent" },
                tickLabels: {
                  fill: "rgba(197, 205, 222, 1)",
                  fontSize: 10,
                  padding: 5,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickValues={yTickValues}
              tickFormat={(y) => parseFloat(y).toFixed(yDecimal)}
              offsetX={50}
              label={yAxis + "[" + yUnit + "]"}
              style={{
                axis: { stroke: "rgba(240, 245, 255, 0.1)" },
                grid: {
                  stroke: "rgba(240, 245, 255, 0.1)",
                  strokeWidth: 1,
                  strokeDasharray: "5 0",
                },
                axisLabel: {
                  fill: "rgba(130, 144, 174, 1)",
                  fontSize: 15,
                  padding: 35,
                },
                ticks: { size: 3, stroke: "transparent" },
                tickLabels: {
                  fill: "rgba(197, 205, 222, 1)",
                  fontSize: 10,
                  padding: 5,
                },
              }}
            />
            <VictoryLine
              data={renderedData}
              x={(d) => parseDateTime(d.time).getTime()}
              y={(d) => d.value.y}
              // interpolation="natural"
              interpolation="basis"
              style={{ data: { stroke: "rgb(90,145,204)", strokeWidth: 3 } }}
            />

            {/* 添加容差带..... */}
            {tolUpper !== 99999.9 && (
              <VictoryLine
                style={{
                  data: {
                    stroke: "red",
                    strokeWidth: 2,
                    strokeDasharray: "10, 8",
                    opacity: 0.3,
                  },
                }}
                sortKey={10}
                interpolation="basis"
                data={processedData}
                x={(d) => parseDateTime(d.time).getTime()}
                y={(d) =>
                  d.value.ref !== null ? d.value.ref + tolUpper : null
                }
              />
            )}

            {tolUpper !== 99999.9 && tolLower !== 99999.9 && (
              <VictoryLine
                data={processedData}
                x={(d) => parseDateTime(d.time).getTime()}
                y={(d) => d.value.ref}
                sortKey={10}
                interpolation="basis"
                style={{
                  data: {
                    stroke: "green",
                    strokeWidth: 2,
                    strokeDasharray: "10, 8",
                    opacity: 0.3,
                  },
                }}
              />
            )}

            {tolLower !== 99999.9 && (
              <VictoryLine
                style={{
                  data: {
                    stroke: "red",
                    strokeWidth: 2,
                    strokeDasharray: "10, 8",
                    opacity: 0.3,
                  },
                }}
                sortKey={10}
                interpolation="basis"
                data={processedData}
                x={(d) => parseDateTime(d.time).getTime()}
                y={(d) =>
                  d.value.ref !== null ? d.value.ref + tolLower : null
                }
              />
            )}
            {/* 添加容差带..... */}
            {/* <VictoryScatter
              data={targetDataPointsScatter}
              style={{
                data: {
                  fill: "white",
                  stroke: "rgb(90,145,204)",
                  strokeWidth: 3,
                },
              }}
              size={7}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPress: (evt, clickedPoint) => {
                      console.log(
                        `time: ${clickedPoint.datum.time}, value: ${clickedPoint.datum.value}`
                      );
                      showModal();
                    },
                  },
                },
              ]}
            /> */}
          </VictoryChart>
          <ScrollView horizontal>
            <Text>
              {/* {getZoomFactor()}x zoom;Rendering {renderedData.length} of{" "}
              {originalData.length} points. */}
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={handlePlayPause}
          >
            {isPlaying ? (
              <Image
                source={require("../../../assets/images/pause.png")}
                style={{
                  backgroundColor: "rgb(130,144,174)",
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                }}
              />
            ) : (
              <Image
                source={require("../../../assets/images/play.png")}
                style={{
                  backgroundColor: "rgb(130,144,174)",
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                }}
              />
            )}
          </TouchableOpacity>
          <View
            style={{
              position: "relative",
              justifyContent: "center",
            }}
          >
            <View style={styles.sliderContainer}>
              <View style={styles.progressBarContainer}>
                <View
                  style={[styles.progressBar, { width: `${progress * 100}%` }]}
                ></View>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={progress}
                onValueChange={setProgress}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                thumbTintColor="transparent"
              />
              {targetDataPointsScatter.map((point, index) => (
                <View
                  key={index}
                  style={[styles.targetPoint, { left: `${point.progress}%` }]}
                />
              ))}
              {targetDataPointsScatter.map((point, index) => (
                <View
                  key={index}
                  style={[styles.targetInfo, { left: `${point.progress}%` }]}
                >
                  <>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                        color: "rgba(130, 144, 174, 1)",
                      }}
                    >
                      {point.time}
                    </Text>
                  </>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <OverEventModal
          visible={visible}
          onDismiss={hideModal}
          modalInfo={undefined}
        />
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  playPauseButton: {
    position: "absolute",
    top: 330,
    left: 0,
    backgroundColor: "rgb(130,144,174)",
    borderRadius: 10,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
    position: "relative",
  },
  slider: {
    width: "90%",
    height: 40,
    zIndex: 2,
  },
  progressBarContainer: {
    height: 12,
    width: "88%",
    backgroundColor: "rgba(46, 50, 66, 1)",
    borderRadius: 5,
    position: "absolute",
    zIndex: 1,
    top: "25%",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "rgba(130, 144, 174, 1)",
    borderRadius: 3,
  },
  targetPoint: {
    height: 10,
    backgroundColor: "rgb(197,205,222)",
    position: "absolute",
    top: 10,
    bottom: 0,
    width: 10,
    borderRadius: 5,
    zIndex: 2,
  },
  targetInfo: {
    height: 20,
    position: "absolute",
    top: 25,
    bottom: 0,
    width: 50,
    borderRadius: 5,
    zIndex: 2,
  },
});
export default HighSpeedView;
