import React, { useState } from "react";
import {
  Easing,
  View,
  Pressable,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import {
  Canvas,
  Line,
  Path,
  runTiming,
  Skia,
  SkPath,
  useComputedValue,
  useValue,
  vec,
  Image,
  useImage,
  useFont,
} from "@shopify/react-native-skia";
import { Text as SkiaText } from "@shopify/react-native-skia";
import { DataPoint, originalData, secondData } from "./Data";
import { curveBasis, line, scaleLinear, scaleTime } from "d3";

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

const PrivacyModal = () => {
  const image = useImage(
    require("../../../../assets/images/runway_ios_simple.png")
  );
  const fontSize = 12;
  const font = useFont(
    require("../../../../assets/fonts/Inter-Bold.ttf"),
    fontSize
  );
  const fontUnit = useFont(
    require("../../../../assets/fonts/Inter-Bold.ttf"),
    12
  );
  const transition = useValue(1);
  const state = useValue({
    current: 0,
    next: 1,
  });

  const [drawingStarted, setDrawingStarted] = useState(false); // State to track if drawing has started

  const GRAPH_HEIGHT = 220;
  const GRAPH_WIDTH = 630;

  const makeGraph = (data: DataPoint[]): GraphData => {
    const max = Math.max(...data.map((val) => val.value));
    const min = Math.min(...data.map((val) => val.value));
    const y = scaleLinear()
      .domain([0, max])
      .range([GRAPH_HEIGHT - 50, 20]);

    const x = scaleTime()
      .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
      .range([30, GRAPH_WIDTH - 10]);

    const curvedLine = line<DataPoint>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.value))
      .curve(curveBasis)(data);

    const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

    return {
      max,
      min,
      curve: skPath!,
    };
  };

  const graphData = makeGraph(secondData);

  const path = useComputedValue(() => {
    const start = graphData.curve;
    const result = start.interpolate(start, 0);
    return result?.toSVGString() ?? "0";
  }, [state, transition]);

  function handleStartDrawing(): void {
    setDrawingStarted(true); // Set drawingStarted to true when drawing starts
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>asdd</Text>
      <Canvas
        style={{
          width: GRAPH_WIDTH,
          height: GRAPH_HEIGHT,
          position: "relative",
          backgroundColor: "#2200ff",
        }}
      >
        {image && (
          <Image image={image} x={480} y={35} width={130} height={130} />
        )}
        {font && (
          <SkiaText x={270} y={12} text="Approach top View" font={font} />
        )}
        {font && <SkiaText x={25} y={200} text="6" font={font} />}
        {font && <SkiaText x={170} y={200} text="4" font={font} />}
        {font && <SkiaText x={320} y={200} text="2" font={font} />}
        {font && <SkiaText x={470} y={200} text="0" font={font} />}
        {font && <SkiaText x={600} y={200} text="2" font={font} />}
        {fontUnit && <SkiaText x={310} y={215} text="[NM]" font={fontUnit} />}
        {font && <SkiaText x={0} y={180} text="-0.1" font={font} />}
        {font && <SkiaText x={5} y={30} text="0.1" font={font} />}
        {fontUnit && <SkiaText x={0} y={100} text="[NM]" font={fontUnit} />}

        <Line
          p1={vec(30, 20)}
          p2={vec(630, 20)}
          color="lightgrey"
          style="stroke"
          strokeWidth={1}
        />
        <Line
          p1={vec(30, 100)}
          p2={vec(630, 100)}
          color="#00cc00"
          style="stroke"
          strokeWidth={1}
        />
        <Line
          p1={vec(30, 180)}
          p2={vec(630, 180)}
          color="lightgrey"
          style="stroke"
          strokeWidth={2}
        />
        <Line
          p1={vec(30, 20)}
          p2={vec(30, 180)}
          color="lightgrey"
          style="stroke"
          strokeWidth={1}
        />
        <Line
          p1={vec(180, 20)}
          p2={vec(180, 180)}
          color="lightgrey"
          style="stroke"
          strokeWidth={1}
        />
        <Line
          p1={vec(330, 20)}
          p2={vec(330, 180)}
          color="lightgrey"
          style="stroke"
          strokeWidth={1}
        />
        <Line
          p1={vec(480, 20)}
          p2={vec(480, 180)}
          color="lightgrey"
          style="stroke"
          strokeWidth={1}
        />

        <Line
          p1={vec(330, 20)}
          p2={vec(610, 100)}
          color="lightgrey"
          style="stroke"
          strokeWidth={2}
        />
        <Line
          p1={vec(330, 180)}
          p2={vec(610, 100)}
          color="lightgrey"
          style="stroke"
          strokeWidth={2}
        />
        {drawingStarted && ( // Render Path only if drawing has started
          <Path style="stroke" path={path} strokeWidth={2} color="#fff" />
        )}
      </Canvas>
      <Pressable onPress={handleStartDrawing} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>Start Drawing</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    backgroundColor: "#000",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonStyle: {
    marginRight: 20,
    backgroundColor: "#6231ff",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textStyle: {
    color: "white",
    fontSize: 20,
  },
});

export default PrivacyModal;
