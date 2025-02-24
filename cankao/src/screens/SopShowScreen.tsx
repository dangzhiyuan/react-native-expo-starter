import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from "react-native";

interface SopResult {
  result_id: string;
  sop_lesson_name: string;
  procedure_name: string;
  procedure_state: "success" | "failed" | "skipped";
  time_stamp: string;
}

interface TrainsProps {
  sop_result: SopResult[];
}

interface SopShowScreenProps {
  trains: TrainsProps;
}

const formatTime = (timeStamp: string) => {
  const date = new Date(timeStamp);
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// 时间线项组件
const TimelineItem = ({
  item,
  isLast,
}: {
  item: SopResult;
  isLast: boolean;
}) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;

  return (
    <View style={styles.timelineItem}>
      <View style={styles.dotContainer}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                item.procedure_state === "success"
                  ? "#2ed573"
                  : item.procedure_state === "failed"
                  ? "#ff4757"
                  : "#ffa502",
            },
          ]}
        />
        {!isLast && <View style={styles.connectionLine} />}
      </View>
      <Text style={[styles.timelineTime, isSmallScreen && styles.smallText]}>
        {formatTime(item.time_stamp)}
      </Text>
      <Text
        style={[styles.timelineAction, isSmallScreen && styles.smallText]}
        numberOfLines={2}
      >
        {item.procedure_name}
      </Text>
      <Text style={[styles.timelineStatus, isSmallScreen && styles.smallText]}>
        {item.procedure_state}
      </Text>
    </View>
  );
};

const SopShowScreen = ({ trains }: SopShowScreenProps) => {
  // const { sop_result } = trains;
  const sop_result: SopResult[] = [
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_start",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:30",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "take_oxygen_mask",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "init_pb_active",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "int_receive_active",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "pa_receive_active",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "pa_broadcast",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "pa_broadcast",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "pa_broadcast",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "pa_broadcast",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "pa_broadcast",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "pa_broadcast",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
    {
      result_id: "d7b01248-ef5c-11ef-b14d-f46d3f1cad1c",
      sop_lesson_name: "emergency_descent",
      procedure_name: "emergency_descent_exit",
      procedure_state: "success",
      time_stamp: "2025-02-20T15:32:31",
    },
  ];
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;

  // 统计不同状态的数量
  const statusCounts = sop_result.reduce((acc, curr) => {
    acc[curr.procedure_state] = (acc[curr.procedure_state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.insightsPanel}>
            <View style={styles.insightsHeader}>
              <View style={styles.legend}>
                {["failed", "skipped", "success"].map((state) => (
                  <View key={state} style={styles.legendItem}>
                    <Text
                      style={[
                        styles.legendText,
                        isSmallScreen && styles.smallText,
                      ]}
                    >
                      {statusCounts[state] || 0}{" "}
                      {state.charAt(0).toUpperCase() + state.slice(1)}
                    </Text>
                    <View
                      style={[
                        styles.dot,
                        {
                          backgroundColor:
                            state === "success"
                              ? "#2ed573"
                              : state === "failed"
                              ? "#ff4757"
                              : "#ffa502",
                        },
                      ]}
                    />
                  </View>
                ))}
              </View>
            </View>

            <ScrollView
              style={styles.timeline}
              showsVerticalScrollIndicator={false}
            >
              {sop_result.map((item, index) => (
                <TimelineItem
                  key={index}
                  item={item}
                  isLast={index === sop_result.length - 1}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2f3542",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  statusPanel: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  time: {
    color: "#fff",
    fontSize: 16,
  },
  rvr: {
    color: "#fff",
    fontSize: 16,
  },
  infoGrid: {
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    color: "#a4b0be",
    width: 150,
    fontSize: 16,
  },
  value: {
    color: "#fff",
    fontSize: 16,
  },
  malfunction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2f3542",
    padding: 10,
  },
  malfunctionText: {
    color: "#ff4757",
    marginLeft: 10,
    fontSize: 16,
  },
  insightsPanel: {
    backgroundColor: "#2f3542",
    padding: 15,
    borderRadius: 8,
  },
  insightsHeader: {
    marginBottom: 20,
  },
  insightsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  legend: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  legendText: {
    color: "#a4b0be",
    marginRight: 5,
    fontSize: 12,
    flexShrink: 1,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: "relative",
    zIndex: 2,
  },
  timeline: {
    paddingLeft: 15,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dotContainer: {
    width: 16,
    alignItems: "center",
  },
  connectionLine: {
    position: "absolute",
    top: 8,
    left: "50%",
    width: 2,
    height: 27,
    backgroundColor: "#a4b0be",
    transform: [{ translateX: -1 }],
  },
  timelineTime: {
    fontSize: 15,
    color: "#fff",
    width: 70,
    marginRight: 8,
    marginLeft: 8,
  },
  timelineAction: {
    fontSize: 15,
    color: "#2ed573",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 10,
  },
  timelineStatus: {
    fontSize: 15,
    color: "#fff",
    textAlign: "right",
    minWidth: 60,
  },
  smallText: {
    fontSize: 14,
  },
  smallTitle: {
    fontSize: 16,
  },
});

export default SopShowScreen;
