import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HighSpeedView from "./BigDataSolution/HighSpeedView";
import HighHeightView from "./BigDataSolution/HighHeightView";
import ApproachSpeedView from "./BigDataSolution/ApproachSpeedView";
import ApproachAltitudeView from "./BigDataSolution/ApproachAltitudeView";
import ApproachDeviationView from "./BigDataSolution/ApproachDeviationView";
import TakeOffAltitudeView from "./BigDataSolution/TakeOffAltitudeView";
import TakeOffDeviationView from "./BigDataSolution/TakeOffDeviationView";
import VerticalLoadView from "./BigDataSolution/VerticalLoadView";
import FlattenStageView from "./BigDataSolution/FlattenStageView";
import ClimbingAltitudeView from "./BigDataSolution/ClimbingAlititudeView";
import ApproachAltitudeBigView from "./BigDataSolution/ApproachAltitudeBigView";
import { COLORS } from "../themes/themes";
import TrackTopView from "./BigDataSolution/TrackTopView";
import FlattenTopView from "./BigDataSolution/FlattenTopView";
import ApproachLocView from "./BigDataSolution/ApproachLocView";
import ApproachCrabView from "./BigDataSolution/ApproachCrabView";
import ApproachRollView from "./BigDataSolution/ApproachRollView";
import TakeOffSpeedView from "./BigDataSolution/TakeOffSpeedView";
import HighTrackView from "./BigDataSolution/HighTrackView";
import ApproachTouchdownGlideView from "./BigDataSolution/ApproachTouchdownGlideView";
import ApproachGSView from "./BigDataSolution/ApproachGSView";

const SectionalTwo = ({ trains, currentTrainName }) => {
  const trainScore = trains?.time_history_view_recall?.data_recall;
  const specialView = trains?.special_view_recall?.data_recall;
  const runway = trains?.special_view_recall.runway;
  const overLimitss = trains["events"]["exceedance"];

  const { exceedance, malf, alert } = trains["events"];
  //遍历出同一时刻发生多种事件的项，保存在d中
  let d = [];
  const map = {};
  const processedTimes = new Set();
  const overLimits = {
    exceedance: [],
    malf: [],
    alert: [],
  };
  const processItems = (items, source) => {
    items.forEach((item) => {
      if (!map[item.time]) {
        map[item.time] = [{ ...item, source }];
      } else {
        map[item.time].push({ ...item, source });
      }
      overLimits[source].push({ ...item, source });
    });
  };
  processItems(exceedance, "exceedance");
  processItems(malf, "malf");
  processItems(alert, "alert");
  for (let key in map) {
    if (map[key].length > 1) {
      d.push({ time: key, details: map[key] });
      processedTimes.add(key);
    }
  }

  //模拟一个进度加载动画优化用户体验
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.secondary} />
        <Text style={{ marginTop: 10, fontSize: 16, color: "gray" }}>
          数据加载中...
        </Text>
      </View>
    );
  }

  const getTvPairsByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.tv_pairs : undefined;
  };

  const getXLeftByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.x_left_limit : undefined;
  };
  const getXRightByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.x_right_limit : undefined;
  };
  const getYDownByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.y_down_limit : undefined;
  };
  const getYUpByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.y_up_limit : undefined;
  };
  const getXUnitByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.x_axis_unit : undefined;
  };
  const getYUnitByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.y_axis_unit : undefined;
  };
  const getXAxisName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.x_axis_name : undefined;
  };
  const getYAxisName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.y_axis_name : undefined;
  };
  const getViewTitle = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    console.log(">>>>>>>>",item)
    return item ? item.view_title : undefined;
  };
  const getXSegByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.x_axis_seg_num : undefined;
  };
  const getYSegByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.y_axis_seg_num : undefined;
  };
  const getTolUpperByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.tolerance_upper : undefined;
  };
  const getTolLowerByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.tolerance_lower : undefined;
  };

  const getXaxisDecimalByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.x_axis_decimal_digits : undefined;
  };
  const getYaxisDecimalByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    return item ? item.y_axis_decimal_digits : undefined;
  };

  const sectionalViewCategories = (category) => {
    const locView = specialView.filter(
      (item) => item.label_name === "loc_view"
    );
    const exLocView = specialView.filter(
      (item) => item.label_name === "ex_top_view"
    );
    const tillGlideView = specialView.filter(
      (item) => item.label_name === "till_touchdown_side_view"
    );
    const glideView = specialView.filter(
      (item) => item.label_name === "side_view"
    );
    const flareView = specialView.filter(
      (item) => item.label_name === "flare_side_view"
    );
    const flareTopView = specialView.filter(
      (item) => item.label_name === "flare_top_view"
    );
    const loadView = specialView.filter(
      (item) => item.label_name === "load_view"
    );
    const speedView = specialView.filter(
      (item) => item.label_name === "speed_with_vapp_view"
    );
    const gsView = specialView.filter((item) => item.label_name === "gs_view");
    const topView = specialView.filter(
      (item) => item.label_name === "top_view"
    );
    const otherViews = specialView.filter(
      (item) =>
        item.label_name !== "loc_view" &&
        item.label_name !== "side_view" &&
        item.label_name !== "flare_side_view" &&
        item.label_name !== "flare_top_view" &&
        item.label_name !== "load_view" &&
        item.label_name !== "speed_with_vapp_view" &&
        item.label_name !== "till_touchdown_side_view" &&
        item.label_name !== "gs_view" &&
        item.label_name !== "top_view" &&
        item.label_name !== "ex_top_view"
    );
    const orderedViews = [
      ...glideView,
      ...tillGlideView,
      ...topView,
      ...exLocView,
      ...gsView,
      ...locView,
      ...flareView,
      ...flareTopView,
      ...loadView,
      ...speedView,
      ...otherViews,
    ];
    if (specialView && specialView.length > 0) {
      if (category === "起飞" || category === "take-off") {
        return orderedViews.map((item, index) => {
          let componentToRender;
          const flag = isTvPairsEmptyByLabelName(specialView, item.label_name);
          const views = getTvPairsByLabelName(specialView, item.label_name);
          const x_left = getXLeftByLabelName(specialView, item.label_name);
          const x_right = getXRightByLabelName(specialView, item.label_name);
          const y_down = getYDownByLabelName(specialView, item.label_name);
          const y_up = getYUpByLabelName(specialView, item.label_name);
          const x_axis = getXAxisName(specialView, item.label_name);
          const y_axis = getYAxisName(specialView, item.label_name);
          const title = getViewTitle(specialView, item.label_name);
          const x_unit = getXUnitByLabelName(specialView, item.label_name);
          const y_unit = getYUnitByLabelName(specialView, item.label_name);
          const x_axis_seg = getXSegByLabelName(specialView, item.label_name);
          const y_axis_seg = getYSegByLabelName(specialView, item.label_name);
          const tol_upper = getTolUpperByLabelName(
            specialView,
            item.label_name
          );
          const tol_lower = getTolLowerByLabelName(
            specialView,
            item.label_name
          );
          const x_decimal = getXaxisDecimalByLabelName(
            specialView,
            item.label_name
          );
          const y_decimal = getYaxisDecimalByLabelName(
            specialView,
            item.label_name
          );

          switch (item.label_name) {
            case "top_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <TakeOffDeviationView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "side_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <TakeOffAltitudeView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "ex_top_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <TrackTopView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "speed_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <TakeOffSpeedView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;

            default:
              componentToRender = (
                <Text key={index} style={{ color: "black" }}></Text>
              );
          }
          return componentToRender;
        });
      }
      if (category === "初始爬升") {
        return orderedViews.map((item, index) => {
          let componentToRender;
          const flag = isTvPairsEmptyByLabelName(specialView, item.label_name);
          const views = getTvPairsByLabelName(specialView, item.label_name);
          const x_left = getXLeftByLabelName(specialView, item.label_name);
          const x_right = getXRightByLabelName(specialView, item.label_name);
          const y_down = getYDownByLabelName(specialView, item.label_name);
          const y_up = getYUpByLabelName(specialView, item.label_name);
          const x_axis = getXAxisName(specialView, item.label_name);
          const y_axis = getYAxisName(specialView, item.label_name);
          const title = getViewTitle(specialView, item.label_name);
          const x_unit = getXUnitByLabelName(specialView, item.label_name);
          const y_unit = getYUnitByLabelName(specialView, item.label_name);
          const x_axis_seg = getXSegByLabelName(specialView, item.label_name);
          const y_axis_seg = getYSegByLabelName(specialView, item.label_name);
          const tol_upper = getTolUpperByLabelName(
            specialView,
            item.label_name
          );
          const tol_lower = getTolLowerByLabelName(
            specialView,
            item.label_name
          );
          const x_decimal = getXaxisDecimalByLabelName(
            specialView,
            item.label_name
          );
          const y_decimal = getYaxisDecimalByLabelName(
            specialView,
            item.label_name
          );
          switch (item.label_name) {
            case "top_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <TakeOffDeviationView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "side_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ClimbingAltitudeView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "speed_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <TakeOffSpeedView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "ex_loc_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <TrackTopView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            default:
              componentToRender = (
                <Text key={index} style={{ color: "black" }}></Text>
              );
          }
          return componentToRender;
        });
      }
      if (category === "进近") {
        return orderedViews.map((item, index) => {
          let componentToRender;
          const flag = isTvPairsEmptyByLabelName(specialView, item.label_name);
          const views = getTvPairsByLabelName(specialView, item.label_name);
          const x_left = getXLeftByLabelName(specialView, item.label_name);
          const x_right = getXRightByLabelName(specialView, item.label_name);
          const y_down = getYDownByLabelName(specialView, item.label_name);
          const y_up = getYUpByLabelName(specialView, item.label_name);
          const x_axis = getXAxisName(specialView, item.label_name);
          const y_axis = getYAxisName(specialView, item.label_name);
          const title = getViewTitle(specialView, item.label_name);
          const x_unit = getXUnitByLabelName(specialView, item.label_name);
          const y_unit = getYUnitByLabelName(specialView, item.label_name);
          const x_axis_seg = getXSegByLabelName(specialView, item.label_name);
          const y_axis_seg = getYSegByLabelName(specialView, item.label_name);
          const tol_upper = getTolUpperByLabelName(
            specialView,
            item.label_name
          );
          const tol_lower = getTolLowerByLabelName(
            specialView,
            item.label_name
          );
          const x_decimal = getXaxisDecimalByLabelName(
            specialView,
            item.label_name
          );
          const y_decimal = getYaxisDecimalByLabelName(
            specialView,
            item.label_name
          );

          switch (item.label_name) {
            case "loc_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachLocView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        tdOffset={runway.rwy_gs_point_offset}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "side_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachAltitudeView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        tdOffset={runway.rwy_gs_point_offset}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "till_touchdown_side_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachTouchdownGlideView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        tdOffset={runway.rwy_gs_point_offset}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "gs_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachGSView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        tdOffset={0}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "load_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <VerticalLoadView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        data={views}
                        limits={overLimits}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "speed_with_vapp_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachSpeedView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        xAxis={x_axis}
                        yAxis={y_axis}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "top_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachDeviationView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        tdOffset={runway.rwy_loc_point_offset}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "crab_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachCrabView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            default:
              componentToRender = (
                <Text key={index} style={{ color: "black" }}></Text>
              );
          }
          return componentToRender;
        });
      }
      if (category === "着陆") {
        return orderedViews.map((item, index) => {
          let componentToRender;
          const flag = isTvPairsEmptyByLabelName(specialView, item.label_name);
          const views = getTvPairsByLabelName(specialView, item.label_name);
          const x_left = getXLeftByLabelName(specialView, item.label_name);
          const x_right = getXRightByLabelName(specialView, item.label_name);
          const y_down = getYDownByLabelName(specialView, item.label_name);
          const y_up = getYUpByLabelName(specialView, item.label_name);
          const x_axis = getXAxisName(specialView, item.label_name);
          const y_axis = getYAxisName(specialView, item.label_name);
          const title = getViewTitle(specialView, item.label_name);
          const x_unit = getXUnitByLabelName(specialView, item.label_name);
          const y_unit = getYUnitByLabelName(specialView, item.label_name);
          const x_axis_seg = getXSegByLabelName(specialView, item.label_name);
          const y_axis_seg = getYSegByLabelName(specialView, item.label_name);
          const tol_upper = getTolUpperByLabelName(
            specialView,
            item.label_name
          );
          const tol_lower = getTolLowerByLabelName(
            specialView,
            item.label_name
          );
          const x_decimal = getXaxisDecimalByLabelName(
            specialView,
            item.label_name
          );
          const y_decimal = getYaxisDecimalByLabelName(
            specialView,
            item.label_name
          );
          switch (item.label_name) {
            case "loc_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachLocView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        tdOffset={runway.rwy_loc_point_offset}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "side_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachAltitudeView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        tdOffset={runway.rwy_gs_point_offset}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "till_touchdown_side_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachTouchdownGlideView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        tdOffset={runway.rwy_gs_point_offset}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "load_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <VerticalLoadView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "speed_with_vapp_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachSpeedView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        data={views}
                        limits={overLimits}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "flare_side_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <FlattenStageView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        wellHeight={0}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "flare_top_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <FlattenTopView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "crab_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachCrabView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "roll_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachRollView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "gs_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachGSView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        tdOffset={0}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            case "top_view":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <ApproachDeviationView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                        tdOffset={runway.rwy_loc_point_offset}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
              // case "top_view_back":
              //   componentToRender = (
              //     <View key={index} style={styles.chartContainer}>
              //       <View style={styles.chartHeader}>
              //         <Text style={styles.chartTitle}>{title}</Text>
              //       </View>
              //       <View style={styles.chartPlaceholder}>
              //         {flag ? (
              //           <ApproachDeviationView
              //             minY={y_down}
              //             maxY={y_up}
              //             minX={x_left}
              //             maxX={x_right}
              //             xAxis={x_axis}
              //             yAxis={y_axis}
              //             xUnit={x_unit}
              //             yUnit={y_unit}
              //             gapX={x_axis_seg}
              //             gapY={y_axis_seg}
              //             tolUpper={tol_upper}
              //             tolLower={tol_lower}
              //             xDecimal={x_decimal}
              //             yDecimal={y_decimal}
              //             data={views}
              //             limits={overLimits}
              //             runway={runway}
              //             tdOffset={runway.rwy_loc_point_offset}
              //           />
              //         ) : (
              //           <Text
              //             style={{
              //               color: "white",
              //               textAlign: "center",
              //               marginVertical: 100,
              //             }}
              //           >
              //             No data available
              //           </Text>
              //         )}
              //       </View>
              //     </View>
              //   );
              //   break;
              //   case "side_view_back":
              //     componentToRender = (
              //       <View key={index} style={styles.chartContainer}>
              //         <View style={styles.chartHeader}>
              //           <Text style={styles.chartTitle}>{title}</Text>
              //         </View>
              //         <View style={styles.chartPlaceholder}>
              //           {flag ? (
              //             <ApproachAltitudeView
              //               minY={y_down}
              //               maxY={y_up}
              //               minX={x_left}
              //               maxX={x_right}
              //               xAxis={x_axis}
              //               yAxis={y_axis}
              //               xUnit={x_unit}
              //               yUnit={y_unit}
              //               gapX={x_axis_seg}
              //               gapY={y_axis_seg}
              //               tolUpper={tol_upper}
              //               tolLower={tol_lower}
              //               xDecimal={x_decimal}
              //               yDecimal={y_decimal}
              //               data={views}
              //               limits={overLimits}
              //               runway={runway}
              //               tdOffset={runway.rwy_gs_point_offset}
              //             />
              //           ) : (
              //             <Text
              //               style={{
              //                 color: "white",
              //                 textAlign: "center",
              //                 marginVertical: 100,
              //               }}
              //             >
              //               No data available
              //             </Text>
              //           )}
              //         </View>
              //       </View>
              //     );
              //     break;
              //     case "flare_side_view_back":
              //       componentToRender = (
              //         <View key={index} style={styles.chartContainer}>
              //           <View style={styles.chartHeader}>
              //             <Text style={styles.chartTitle}>{title}</Text>
              //           </View>
              //           <View style={styles.chartPlaceholder}>
              //             {flag ? (
              //               <FlattenStageView
              //                 minY={y_down}
              //                 maxY={y_up}
              //                 minX={x_left}
              //                 maxX={x_right}
              //                 xAxis={x_axis}
              //                 yAxis={y_axis}
              //                 xUnit={x_unit}
              //                 yUnit={y_unit}
              //                 gapX={x_axis_seg}
              //                 gapY={y_axis_seg}
              //                 tolUpper={tol_upper}
              //                 tolLower={tol_lower}
              //                 xDecimal={x_decimal}
              //                 yDecimal={y_decimal}
              //                 data={views}
              //                 limits={overLimits}
              //                 runway={runway}
              //                 wellHeight={0}
              //               />
              //             ) : (
              //               <Text
              //                 style={{
              //                   color: "white",
              //                   textAlign: "center",
              //                   marginVertical: 100,
              //                 }}
              //               >
              //                 No data available
              //               </Text>
              //             )}
              //           </View>
              //         </View>
              //       );
              //       break;
              //     case "flare_top_view_back":
              componentToRender = (
                <View key={index} style={styles.chartContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>{title}</Text>
                  </View>
                  <View style={styles.chartPlaceholder}>
                    {flag ? (
                      <FlattenTopView
                        minY={y_down}
                        maxY={y_up}
                        minX={x_left}
                        maxX={x_right}
                        xAxis={x_axis}
                        yAxis={y_axis}
                        xUnit={x_unit}
                        yUnit={y_unit}
                        gapX={x_axis_seg}
                        gapY={y_axis_seg}
                        tolUpper={tol_upper}
                        tolLower={tol_lower}
                        xDecimal={x_decimal}
                        yDecimal={y_decimal}
                        data={views}
                        limits={overLimits}
                        runway={runway}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          marginVertical: 100,
                        }}
                      >
                        No data available
                      </Text>
                    )}
                  </View>
                </View>
              );
              break;
            default:
              componentToRender = (
                <Text key={index} style={{ color: "black" }}></Text>
              );
          }
          return componentToRender;
        });
      }
    } else {
      return <Text>No special_view_recall data available.</Text>;
    }
  };

  const isDataAvailable = (index) =>
    trainScore &&
    Array.isArray(trainScore) &&
    trainScore.length > 0 &&
    trainScore[0]["tv_pairs"].length !== 0 &&
    index < trainScore.length;

  const isTvPairsEmptyByLabelName = (data, labelName) => {
    const item = data.find((element) => element.label_name === labelName);
    if (item && item.tv_pairs.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {sectionalViewCategories(currentTrainName)}
      {currentTrainName !== "起飞" &&
        currentTrainName !== "着陆" &&
        currentTrainName !== "进近" &&
        currentTrainName !== "初始爬升" && (
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>
                {getViewTitle(trainScore, "th_altitude_view")}
              </Text>
              <View style={styles.chartMetrics}></View>
            </View>
            <View style={styles.chartPlaceholder}>
              {isDataAvailable(1) ? (
                <HighHeightView
                  data={getTvPairsByLabelName(trainScore, "th_altitude_view")}
                  limits={overLimitss}
                  minY={getYDownByLabelName(trainScore, "th_altitude_view")}
                  maxY={getYUpByLabelName(trainScore, "th_altitude_view")}
                  minX={getXLeftByLabelName(trainScore, "th_altitude_view")}
                  maxX={getXRightByLabelName(trainScore, "th_altitude_view")}
                  xAxis={getXAxisName(trainScore, "th_altitude_view")}
                  yAxis={getYAxisName(trainScore, "th_altitude_view")}
                  xUnit={getXUnitByLabelName(trainScore, "th_altitude_view")}
                  yUnit={getYUnitByLabelName(trainScore, "th_altitude_view")}
                  gapX={getXSegByLabelName(trainScore, "th_altitude_view")}
                  gapY={getYSegByLabelName(trainScore, "th_altitude_view")}
                  tolUpper={getTolUpperByLabelName(
                    trainScore,
                    "th_altitude_view"
                  )}
                  tolLower={getTolLowerByLabelName(
                    trainScore,
                    "th_altitude_view"
                  )}
                  xDecimal={getXaxisDecimalByLabelName(
                    trainScore,
                    "th_altitude_view"
                  )}
                  yDecimal={getYaxisDecimalByLabelName(
                    trainScore,
                    "th_altitude_view"
                  )}
                />
              ) : (
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginVertical: 100,
                  }}
                >
                  No data available
                </Text>
              )}
            </View>
          </View>
        )}
      {currentTrainName !== "起飞" &&
        currentTrainName !== "着陆" &&
        currentTrainName !== "进近" &&
        currentTrainName !== "初始爬升" && (
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>
                {getViewTitle(trainScore, "th_speed_view")}
              </Text>
              <View style={styles.chartMetrics}></View>
            </View>
            <View style={styles.chartPlaceholder}>
              {isDataAvailable(1) ? (
                <HighSpeedView
                  data={getTvPairsByLabelName(trainScore, "th_speed_view")}
                  limits={overLimitss}
                  minY={getYDownByLabelName(trainScore, "th_speed_view")}
                  maxY={getYUpByLabelName(trainScore, "th_speed_view")}
                  minX={getXLeftByLabelName(trainScore, "th_speed_view")}
                  maxX={getXRightByLabelName(trainScore, "th_speed_view")}
                  xAxis={getXAxisName(trainScore, "th_speed_view")}
                  yAxis={getYAxisName(trainScore, "th_speed_view")}
                  xUnit={getXUnitByLabelName(trainScore, "th_speed_view")}
                  yUnit={getYUnitByLabelName(trainScore, "th_speed_view")}
                  gapX={getXSegByLabelName(trainScore, "th_speed_view")}
                  gapY={getYSegByLabelName(trainScore, "th_speed_view")}
                  tolUpper={getTolUpperByLabelName(trainScore, "th_speed_view")}
                  tolLower={getTolLowerByLabelName(trainScore, "th_speed_view")}
                  xDecimal={getXaxisDecimalByLabelName(
                    trainScore,
                    "th_speed_view"
                  )}
                  yDecimal={getYaxisDecimalByLabelName(
                    trainScore,
                    "th_speed_view"
                  )}
                />
              ) : (
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginVertical: 100,
                  }}
                >
                  No data available
                </Text>
              )}
            </View>
          </View>
        )}
      {currentTrainName !== "起飞" &&
        currentTrainName !== "着陆" &&
        currentTrainName !== "进近" &&
        currentTrainName !== "初始爬升" && (
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>
                {getViewTitle(trainScore, "th_track_view")}
              </Text>
              <View style={styles.chartMetrics}></View>
            </View>
            <View style={styles.chartPlaceholder}>
              {getViewTitle(trainScore, "th_track_view")!==undefined ? (
                <HighTrackView
                  data={getTvPairsByLabelName(trainScore, "th_track_view")}
                  limits={overLimitss}
                  minY={getYDownByLabelName(trainScore, "th_track_view")}
                  maxY={getYUpByLabelName(trainScore, "th_track_view")}
                  minX={getXLeftByLabelName(trainScore, "th_track_view")}
                  maxX={getXRightByLabelName(trainScore, "th_track_view")}
                  xAxis={getXAxisName(trainScore, "th_track_view")}
                  yAxis={getYAxisName(trainScore, "th_track_view")}
                  xUnit={getXUnitByLabelName(trainScore, "th_track_view")}
                  yUnit={getYUnitByLabelName(trainScore, "th_track_view")}
                  gapX={getXSegByLabelName(trainScore, "th_track_view")}
                  gapY={getYSegByLabelName(trainScore, "th_track_view")}
                  tolUpper={getTolUpperByLabelName(trainScore, "th_track_view")}
                  tolLower={getTolLowerByLabelName(trainScore, "th_track_view")}
                  xDecimal={getXaxisDecimalByLabelName(
                    trainScore,
                    "th_track_view"
                  )}
                  yDecimal={getYaxisDecimalByLabelName(
                    trainScore,
                    "th_track_view"
                  )}
                />
              ) : (
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginVertical: 100,
                  }}
                >
                  No data available
                </Text>
              )}
            </View>
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 15,
  },
  chartContainer: {
    backgroundColor: "rgba(35,40,56,1)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 10,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "rgb(255,255,255)",
    textAlign: "left",
    marginLeft: 0,
  },
  chartMetrics: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "35%",
  },
  metricText: {
    fontSize: 20,
    fontWeight: "400",
    marginRight: 30,
    color: "rgb(204,204,204)",
    textAlign: "left",
    verticalAlign: "top",
  },

  metricsButton: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 5,
    borderRadius: 5,
  },
  metricButtonText: {
    color: "white",
  },
  chartPlaceholder: {
    backgroundColor: "rgb(35,40,56)",
    width: "100%",
    height: 400,
  },
  chartFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  playButton: {},
  playButtonText: {
    fontSize: 20,
    color: "white",
  },
  timestamps: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  timestampText: {
    fontSize: 12,
    color: "white",
  },
});

export default SectionalTwo;
