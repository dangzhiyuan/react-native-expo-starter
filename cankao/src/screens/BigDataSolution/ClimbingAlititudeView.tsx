import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryZoomContainer,
} from "victory-native";
import { DataPoint } from "./modelTime";
import Slider from "@react-native-community/slider";
import { PaperProvider, Portal, overlay } from "react-native-paper";
import OverEventModal from "../modals/OverEventModal";
import rdpSimplify from "./DeSimplife/rdpSimplify";
import {
  getTargetDataPointsScatter,
  parseDateTime,
  updateDataWithInterpolatedPoints,
} from "./tools";

export type DomainTuple = [Date, Date];

const ClimbingAltitudeView: React.FC<{
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
  data: DataPoint[];
  limits: any;
  runway: any;
}> = ({
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
  data,
  limits,
  runway,
}) => {
  const originalData = updateDataWithInterpolatedPoints(limits, data);
  // const originalData = rdpSimplify(
  //   data.map((d) => ({ x: d.value.x, y: d.value.y })),
  //   0.00001
  // );

  //maxY为y轴最大值限制，wellHeight为拉平开始高度设置,gapY为自定义y轴刻度间隔
  const xValues = data.map((point) => point.value.x);
  const yValues = data.map((point) => point.value.y);
  const offsetLabel = 50;
  const padding = 50;
  // minX = Math.min(...xValues);
  // maxX = Math.max(...xValues);
  // minY = Math.min(...yValues);
  // maxY = Math.max(...yValues);

  // console.log("minX:", minX, "minY:", minY, "maxY:", maxY);
  // maxY = 0.0001;
  const [maxPoints, setMaxPoints] = useState(originalData.length);

  const entireDomain = {
    x: [
      parseDateTime(originalData[0].time),
      parseDateTime(originalData[originalData.length - 1].time),
    ] as DomainTuple,
    y: [minY, maxY] as [number, number],
  };

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

  const [zoomedXDomain, setZoomedXDomain] = useState<DomainTuple>(
    entireDomain.x
  );

  const getData = useCallback((): DataPoint[] => {
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
  const [datum, setDatum] = useState(null);
  const [modalInfo, setModalInfo] = useState(null);
  const showModal = (datum) => {
    setDatum(datum);
    setModalInfo(
      limits[datum.source].filter((item) => item.time === datum.time)
    );
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
  const [showExceeScatter, setShowExceeScatter] = useState(true);
  const [showCustomScatter, setShowCustomScatter] = useState(true);
  const [showWarnScatter, setShowWarnScatter] = useState(true);
  const [symbolColors, setSymbolColors] = useState({
    exceedance: "rgba(247, 47, 80, 1)",
    malf: "rgba(52, 152, 219, 1)",
    alert: "rgba(243, 156, 18, 1)",
  });
  const resetSymbolColors = () => {
    setSymbolColors({
      exceedance: "white",
      malf: "white",
      alert: "white",
    });
  };
  const toggleExceeScatter = () => {
    setShowExceeScatter(!showExceeScatter);
  };
  const toggleCustomScatter = () => {
    setShowCustomScatter(!showCustomScatter);
  };
  const toggleWarnScatter = () => {
    setShowWarnScatter(!showWarnScatter);
  };

  const targetDataPointsScatterExcee = getTargetDataPointsScatter(
    limits,
    "exceedance",
    "",
    originalData,
    entireDomain,
    minX,
    maxX,
    minY,
    maxY
  );
  const targetDataPointsScatterCustom = getTargetDataPointsScatter(
    limits,
    "malf",
    "",
    originalData,
    entireDomain,
    minX,
    maxX,
    minY,
    maxY
  );
  const targetDataPointsScatterWarn = getTargetDataPointsScatter(
    limits,
    "alert",
    "",
    originalData,
    entireDomain,
    minX,
    maxX,
    minY,
    maxY
  );

  const handlePlayPause = () => {
    if (progress >= 1) {
      setProgress(0);
      setZoomedXDomain(entireDomain.x);
      setIsPlaying(true);
      setShowExceeScatter(false);
      setShowCustomScatter(false);
      setShowWarnScatter(false);
      resetSymbolColors();
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

  /***************************** */
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const chartWidth = screenWidth * 0.85; // 计算视图（图表）的实际宽度
  const chartHeight = screenHeight * 0.29;
  console.log("runway", runway.rwy_length, runway.rwy_width);

  // 计算图片应该显示的大小和位置
  const calculateImageBackgroundStyle = () => {
    const rangeX = Math.abs(maxX - minX); // X轴坐标范围
    const rangeY = Math.abs(maxY - minY); // Y轴坐标范围
    // console.log("range:", rangeX, rangeY);
    // const imageWidth =
    //   (runway.rwy_length * (chartWidth * (maxX / rangeX))) / maxX; // 跑道宽度(NM)，坐标维度
    const imageWidth = (chartWidth * runway.rwy_length) / rangeX;
    const imageHeight = (runway.rwy_width * (chartHeight * 0.67)) / rangeY; // 跑道高度(m)，坐标维度
    if (!isFinite(imageWidth) || !isFinite(imageHeight)) {
      return { width: 0, height: 0, top: 0, left: 0 };
    }
    console.log("imageWidth:", imageWidth, imageHeight);
    // const offsetX = (chartWidth / gapX) * 3 + padding; // x偏移量
    let offsetX = (chartWidth * Math.abs(minX)) / rangeX;
    if (minX > 0) {
      offsetX = -(chartWidth * Math.abs(minX)) / rangeX + padding - 8;
    }
    const offsetY = padding - imageHeight / 2 + 200; // y偏移量
    // console.log("offsetX:", offsetX, offsetY);
    return {
      width: imageWidth,
      height: imageHeight,
      top: offsetY, // 顶部偏移
      left: offsetX + padding, // 设置左侧偏移,由于斜视的跑道图被人为拉伸，左侧多出了30像素的空间，所以要减去
      position: "absolute" as "absolute",
      opacity: 1,
      zIndex: 0,
    };
  };

  // 使用`useMemo`来优化性能，避免在每次渲染时都重新计算
  const imageBackgroundStyle = useMemo(calculateImageBackgroundStyle, [
    maxX,
    minX,
    screenHeight,
  ]);
  /***************************** */

  const calculateDy = (data, index) => {
    if (!data || data.length === 0) {
      return 0;
    }
    const { x: currentX } = data[index];
    const nextX = data[index + 1] ? data[index + 1].x : null;
    const prevX = data[index - 1] ? data[index - 1].x : null;

    if (nextX && prevX) {
      const distance = Math.abs(nextX - prevX);
      if (distance < 10) {
        return currentX % 2 === 0 ? -20 : 100;
      }
    }
    return 0;
  };

  return (
    <PaperProvider>
      <Portal>
        <ScrollView
          contentContainerStyle={{ backgroundColor: "rgba(35, 40, 56, 1)" }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              borderColor: "white",
              borderRadius: 2,
              // borderWidth: 1,
              padding: 0,
            }}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              // console.log(width, height);
            }}
          >
            <ImageBackground
              resizeMode="stretch"
              source={require("../../../assets/images/runway_ios_simple.png")}
              style={imageBackgroundStyle}
            ></ImageBackground>
            <VictoryChart
              containerComponent={<VictoryVoronoiContainer />}
              padding={{
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
              }}
              width={chartWidth * 1.13}
              domain={{
                x: [minX, maxX],
                y: [minY, maxY],
              }}
            >
              <VictoryLegend
                x={chartWidth * 0.3}
                y={chartHeight * -0.01}
                titleOrientation="left"
                gutter={80}
                orientation="horizontal"
                style={{
                  data: {
                    fill: "white",
                    stroke: "transparent",
                    strokeWidth: 2,
                  },
                  labels: { fill: "white" },
                  title: { fontSize: 20 },
                }}
                events={[
                  {
                    target: "data",
                    eventHandlers: {
                      onPressOut: (event, props) => {
                        const colorMapping = {
                          exceedance: "rgba(247, 47, 80, 1)",
                          malf: "rgba(52, 152, 219, 1)",
                          alert: "rgba(243, 156, 18, 1)",
                        };
                        const defaultColor = "white";
                        const newColor =
                          props.style.fill === defaultColor
                            ? colorMapping[props.datum.name]
                            : defaultColor;
                        setSymbolColors((prevColors) => ({
                          ...prevColors,
                          [props.datum.name]: newColor,
                        }));
                        switch (props.datum.name) {
                          case "exceedance":
                            toggleExceeScatter();
                            break;
                          case "malf":
                            toggleCustomScatter();
                            break;
                          case "alert":
                            toggleWarnScatter();
                            break;
                          default:
                            break;
                        }
                        return [
                          {
                            target: "data",
                            mutation: () => ({
                              style: { ...props.style, fill: newColor },
                            }),
                          },
                        ];
                      },
                    },
                  },
                ]}
                data={[
                  {
                    name: "exceedance",
                    symbol: { fill: symbolColors.exceedance, size: 10 },
                  },
                  {
                    name: "malf",
                    symbol: { fill: symbolColors.malf, size: 10 },
                  },
                  {
                    name: "alert",
                    symbol: { fill: symbolColors.alert, size: 10 },
                  },
                ]}
              />
              <VictoryLine
                data={[
                  { x: minX, y: maxY },
                  { x: 0, y: 0 },
                ]}
                style={{
                  data: {
                    stroke: "green",
                    strokeWidth: 2,
                    strokeDasharray: "10, 8",
                    opacity: 0,
                  },
                }}
              />
              <VictoryLine
                data={[
                  { x: 0, y: minY },
                  { x: 0, y: maxY },
                ]}
                style={{
                  data: {
                    stroke: "rgba(197, 205, 222, 1)",
                    strokeWidth: 2,
                    opacity: 1,
                  },
                }}
              />
              <VictoryAxis
                tickValues={tickValues}
                tickFormat={(x) => parseFloat(x).toFixed(xDecimal)}
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
                tickFormat={(x) => parseFloat(x).toFixed(yDecimal)}
                offsetX={offsetLabel}
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
              <VictoryLine
                data={renderedData}
                x={(d) => d.value.x}
                y={(d) => d.value.y}
                sortKey={10}
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
                  x={(d) => d.value.x}
                  y={(d) =>
                    d.value.ref !== null ? d.value.ref + tolUpper : null
                  }
                />
              )}
              <VictoryLine
                data={processedData}
                x={(d) => d.value.x}
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
                  x={(d) => d.value.x}
                  y={(d) =>
                    d.value.ref !== null ? d.value.ref + tolLower : null
                  }
                />
              )}
              {/* 添加容差带..... */}
              {showExceeScatter && targetDataPointsScatterExcee.length > 0 && (
                <VictoryScatter
                  containerComponent={
                    <VictoryVoronoiContainer
                      voronoiDimension="x"
                      voronoiPadding={10}
                    />
                  }
                  data={targetDataPointsScatterExcee.map((point) => ({
                    ...point,
                    y: point.y !== undefined && point.y !== null ? point.y : 0,
                  }))}
                  style={{
                    data: {
                      fill: "white",
                      stroke: "rgba(247, 47, 80, 1)",
                      strokeWidth: 3,
                    },
                  }}
                  size={8}
                  labelComponent={
                    <VictoryTooltip
                      active={true}
                      constrainToVisibleArea
                      activateData={true}
                      renderInPortal={false}
                      flyoutPadding={8}
                      pointerOrientation={({ datum, index }) =>
                        calculateDy(targetDataPointsScatterExcee, index) === 100
                          ? "top"
                          : "bottom"
                      }
                      orientation={({ datum, index }) =>
                        calculateDy(targetDataPointsScatterExcee, index) === 100
                          ? "bottom"
                          : "top"
                      }
                      style={{
                        fontSize: 8,
                        fill: "blue",
                        pointerEvents: "fill",
                      }}
                      cornerRadius={5}
                      pointerLength={38}
                    />
                  }
                  labels={({ datum }) => `${datum.source}`}
                  events={[
                    {
                      target: "labels",
                      eventHandlers: {
                        onPressOut: (evt, pressedProps) => {
                          showModal(pressedProps.datum);
                        },
                      },
                    },
                    {
                      target: "data",
                      eventHandlers: {
                        onPress: (evt, clickedPoint) => {
                          showModal(clickedPoint.datum);
                        },
                      },
                    },
                  ]}
                />
              )}

              {showCustomScatter &&
                targetDataPointsScatterCustom.length > 0 && (
                  <VictoryScatter
                    data={targetDataPointsScatterCustom.map((point) => ({
                      ...point,
                      y:
                        point.y !== undefined && point.y !== null ? point.y : 0,
                    }))}
                    containerComponent={
                      <VictoryVoronoiContainer
                        voronoiDimension="x"
                        voronoiPadding={10}
                      />
                    }
                    style={{
                      data: {
                        fill: "white",
                        stroke: "rgba(52, 152, 219, 1)",
                        strokeWidth: 3,
                      },
                    }}
                    size={8}
                    labelComponent={
                      <VictoryTooltip
                        active={true}
                        constrainToVisibleArea={true}
                        activateData={true}
                        renderInPortal={false}
                        flyoutPadding={8}
                        pointerOrientation={({ datum, index }) =>
                          calculateDy(targetDataPointsScatterCustom, index) ===
                          100
                            ? "top"
                            : "bottom"
                        }
                        orientation={({ datum, index }) =>
                          calculateDy(targetDataPointsScatterCustom, index) ===
                          100
                            ? "bottom"
                            : "top"
                        }
                        style={{
                          fontSize: 8,
                          fill: "blue",
                          pointerEvents: "fill",
                        }}
                        cornerRadius={5}
                        pointerLength={38}
                      />
                    }
                    labels={({ datum }) => `${datum.source}`}
                    events={[
                      {
                        target: "labels",
                        eventHandlers: {
                          onPressOut: (evt, pressedProps) => {
                            showModal(pressedProps.datum);
                          },
                        },
                      },
                      {
                        target: "data",
                        eventHandlers: {
                          onPress: (evt, clickedPoint) => {
                            showModal(clickedPoint.datum);
                          },
                        },
                      },
                    ]}
                  />
                )}

              {showWarnScatter && targetDataPointsScatterWarn.length > 0 && (
                <VictoryScatter
                  data={targetDataPointsScatterWarn.map((point) => ({
                    ...point,
                    y: point.y !== undefined && point.y !== null ? point.y : 0,
                  }))}
                  containerComponent={
                    <VictoryVoronoiContainer
                      voronoiDimension="x"
                      voronoiPadding={10}
                    />
                  }
                  style={{
                    data: {
                      fill: "white",
                      stroke: "rgba(243, 156, 18, 1)",
                      strokeWidth: 3,
                    },
                  }}
                  size={8}
                  labelComponent={
                    <VictoryTooltip
                      active={true}
                      constrainToVisibleArea={true}
                      activateData={true}
                      renderInPortal={false}
                      flyoutPadding={8}
                      pointerOrientation={({ datum, index }) =>
                        calculateDy(targetDataPointsScatterWarn, index) === 100
                          ? "top"
                          : "bottom"
                      }
                      orientation={({ datum, index }) =>
                        calculateDy(targetDataPointsScatterWarn, index) === 100
                          ? "bottom"
                          : "top"
                      }
                      style={{
                        fontSize: 8,
                        fill: "blue",
                        pointerEvents: "fill",
                      }}
                      cornerRadius={5}
                      pointerLength={38}
                    />
                  }
                  labels={({ datum }) => `${datum.source}`}
                  events={[
                    {
                      target: "labels",
                      eventHandlers: {
                        onPressOut: (evt, pressedProps) => {
                          showModal(pressedProps.datum);
                        },
                      },
                    },
                    {
                      target: "data",
                      eventHandlers: {
                        onPress: (evt, clickedPoint) => {
                          showModal(clickedPoint.datum);
                        },
                      },
                    },
                  ]}
                />
              )}
            </VictoryChart>
          </View>
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
            </View>
          </View>
        </ScrollView>
        <OverEventModal
          visible={visible}
          onDismiss={hideModal}
          modalInfo={modalInfo}
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
    width: "92%",
    left: "0%",
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
    height: "50%",
    position: "absolute",
    top: "55%",
    left: "-50%",
    bottom: 0,
    // width: "100%",
    borderRadius: 5,
    zIndex: 2,
  },
});
export default ClimbingAltitudeView;
