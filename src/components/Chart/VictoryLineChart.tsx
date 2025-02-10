import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory-native";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";
import { Card } from "../layout/Card";

interface DataPoint {
  x: number | Date;
  y: number;
}

interface VictoryLineChartProps {
  data: DataPoint[];
  xAxis?: {
    label?: string;
    tickFormat?: (tick: any) => string;
  };
  yAxis?: {
    label?: string;
    tickFormat?: (tick: any) => string;
  };
  color?: string;
  width?: number;
  height?: number;
}

export const VictoryLineChart = ({
  data,
  xAxis,
  yAxis,
  color,
  width: propWidth,
  height: propHeight,
}: VictoryLineChartProps): JSX.Element => {
  const { theme } = useTheme();
  const { layout } = useResponsive();
  const window = useWindowDimensions();

  // 确保有固定的最小尺寸
  const minWidth = 300;
  const minHeight = 200;

  // 计算可用宽度，考虑 section 的内边距
  const availableWidth = Math.max(minWidth, window.width - layout.padding * 2);
  const containerWidth = propWidth || availableWidth;
  const containerHeight =
    propHeight || Math.min(240, Math.max(minHeight, window.height * 0.35));

  // 图表尺寸（确保有具体的数值）
  const chartWidth = Math.floor(containerWidth);
  const chartHeight = Math.floor(containerHeight);

  // 优化边距
  const yAxisWidth = Math.max(35, Math.floor(chartWidth * 0.05));
  const xAxisHeight = Math.max(25, Math.floor(chartHeight * 0.12));
  const rightPadding = Math.max(10, Math.floor(chartWidth * 0.02));

  const lineColor = color || theme.primary;

  const commonAxisStyles = {
    axis: { stroke: theme.text.secondary, strokeWidth: 1 },
    tickLabels: {
      fill: theme.text.secondary,
      fontSize: Math.min(10, Math.floor(chartWidth * 0.016)),
      padding: 2,
    },
    grid: {
      stroke: theme.border,
      strokeDasharray: "4,4",
      strokeOpacity: 0.4,
    },
    axisLabel: {
      fill: theme.text.primary,
      padding: Math.max(8, Math.floor(chartWidth * 0.03)),
      fontSize: Math.min(11, Math.floor(chartWidth * 0.018)),
    },
  };

  return (
    <View style={[styles.container, { width: chartWidth }]}>
      {/* <Card> */}
      <VictoryChart
        width={chartWidth}
        height={chartHeight}
        theme={VictoryTheme.material}
        domainPadding={{
          x: Math.floor(chartWidth * 0.01),
          y: Math.floor(chartHeight * 0.03),
        }}
        padding={{
          top: Math.floor(chartHeight * 0.04),
          bottom: xAxisHeight,
          left: yAxisWidth,
          right: rightPadding,
        }}
        scale={{ x: "linear" }}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${datum.y}`}
            labelComponent={
              <VictoryTooltip
                style={{
                  fill: theme.text.primary,
                  fontSize: Math.min(10, Math.floor(chartWidth * 0.016)),
                }}
                flyoutStyle={{
                  stroke: theme.border,
                  fill: theme.surface,
                  strokeWidth: 1,
                }}
                flyoutPadding={3}
                cornerRadius={2}
              />
            }
          />
        }
      >
        <VictoryAxis
          label={xAxis?.label}
          tickFormat={xAxis?.tickFormat}
          style={commonAxisStyles}
          fixLabelOverlap
          tickCount={5}
          offsetY={35}
        />
        <VictoryAxis
          dependentAxis
          label={yAxis?.label}
          tickFormat={yAxis?.tickFormat}
          style={commonAxisStyles}
          fixLabelOverlap
          tickCount={5}
          offsetX={35}
        />
        <VictoryLine
          data={data}
          style={{
            data: {
              stroke: lineColor,
              strokeWidth: Math.max(1.2, Math.floor(chartWidth * 0.002)),
            },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
        />
      </VictoryChart>
      {/* </Card> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: 8,
  },
});
