import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import i18n from "../locales";
import { formatTime } from "./BigDataSolution/tools";

const TimeReviewScreen = ({ trains }) => {
  const { exceedance, malf, alert } = trains;


  const allEvents = [
    ...exceedance.map((item) => ({ ...item, source: "exceedance" })),
    ...malf.map((item) => ({ ...item, source: "malf" })),
    ...alert.map((item) => ({ ...item, source: "alert" })),
  ];

  allEvents.sort((a, b) => {
    const timeA = a.time.split(":").map(Number);
    const timeB = b.time.split(":").map(Number);

    // Convert the time parts to seconds for easier comparison
    const totalSecondsA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2];
    const totalSecondsB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2];

    return totalSecondsA - totalSecondsB;
  });

  if (allEvents.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          margin: 20,
          top: "-10%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "400",
            color: "rgb(204,204,204)",
            marginTop: 28,
          }}
        >
          {i18n.t("eventif")}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {allEvents.map((event, index) => {
        const isFirstEvent = index === 0;
        const isLastEvent = index === allEvents.length - 1;

        switch (event.source) {
          case "exceedance":
            return (
              <EventComponentExcee
                key={index}
                event={event}
                isFirstEvent={isFirstEvent}
                isLastEvent={isLastEvent}
              />
            );
          case "malf":
            return (
              <EventComponentCustom
                key={index}
                event={event}
                isFirstEvent={isFirstEvent}
                isLastEvent={isLastEvent}
              />
            );
          case "alert":
            return (
              <EventComponentWarning
                key={index}
                event={event}
                isFirstEvent={isFirstEvent}
                isLastEvent={isLastEvent}
              />
            );
          default:
            return null;
        }
      })}
    </ScrollView>
  );
};

const EventComponentCustom = ({ event, isFirstEvent, isLastEvent }) => {
  return (
    <View style={styles.event}>
      <View style={styles.eventLineContainer}>
        <View style={styles.eventIcon}>
          <Image
            source={require("../../assets/images/point.png")}
            resizeMode="contain"
          />
        </View>
        {!isFirstEvent && (
          <View style={[styles.line, { top: -175, height: 180 }]} />
        )}
        {!isLastEvent && <View style={styles.line} />}
        <Text style={styles.eventTime}>{formatTime(event.time)} </Text>
      </View>
      <View style={styles.eventContent}>
        <View style={styles.title3}>
          <Image
            source={require("../../assets/images/warn.png")}
            resizeMode="contain"
          />
          <Text style={{ color: "rgb(247,47,80)" }}>故障</Text>
        </View>
        <View style={styles.warnInfo}>
          <Text style={styles.desStyle}>{event.value}</Text>
          <Text style={styles.dexStyle2}>{event.value_en}</Text>
        </View>
      </View>
    </View>
  );
};

const EventComponentExcee = ({ event, isFirstEvent, isLastEvent }) => {
  return (
    <View style={styles.event}>
      <View style={styles.eventLineContainer}>
        <View style={styles.eventIcon}>
          <Image
            source={require("../../assets/images/point.png")}
            resizeMode="contain"
          />
        </View>
        {!isFirstEvent && (
          <View style={[styles.line, { top: -175, height: 180 }]} />
        )}
        {!isLastEvent && <View style={styles.line} />}
        <Text style={styles.eventTime}>{formatTime(event.time)} </Text>
      </View>
      <View style={styles.eventContent}>
        <View style={styles.title}>
          <Image
            source={require("../../assets/images/warn.png")}
            resizeMode="contain"
          />
          <Text style={{ color: "rgb(247,47,80)" }}>超限(硬警告)</Text>
        </View>
        <View style={styles.warnInfo}>
          <View style={{ flexDirection: "row",flexWrap: "wrap" }}>
            <Text style={styles.desStyle}>{event.value}:</Text>
              <Text
                style={[
                  styles.desStyle,
                  {
                    marginLeft: 10,
                    fontWeight: "400",
                    // color: "rgb(247,47,80)",
                  },
                ]}
              >
                {event.result}
              </Text>
          </View>

          <Text style={styles.dexStyle2}>{event.value_en}</Text>
        </View>
      </View>
    </View>
  );
};
const EventComponentWarning = ({ event, isFirstEvent, isLastEvent }) => {
  return (
    <View style={styles.event}>
      <View style={styles.eventLineContainer}>
        <View style={styles.eventIcon}>
          <Image
            source={require("../../assets/images/point.png")}
            resizeMode="contain"
          />
        </View>
        {!isFirstEvent && (
          <View style={[styles.line, { top: -175, height: 180 }]} />
        )}
        {!isLastEvent && <View style={styles.line} />}
        <Text style={styles.eventTime}>{formatTime(event.time)} </Text>
      </View>
      <View style={styles.eventContent}>
        <View style={styles.title2}>
          <Image
            source={require("../../assets/images/warn.png")}
            resizeMode="contain"
          />
          <Text
            style={{
              color:
                event.level === "WARNING"
                  ? "rgb(247,47,80)"
                  : event.level === "CAUTION"
                  ? "yellow"
                  : "white",
            }}
          >
            告警(<Text>{event.level}</Text>)
          </Text>
        </View>
        <View style={styles.warnInfo}>
          <Text style={styles.desStyle}>{event.value}</Text>
          <Text style={styles.dexStyle2}>{event.value_en}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    margin: 10,
    backgroundColor: "transparent",
  },
  event: {
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  eventTime: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
    color: "rgb(197,205,222)",
    width: 120,
  },
  eventIcon: {
    backgroundColor: "rgb(197,205,222)",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  eventContent: {
    flex: 1,
    backgroundColor: "rgb(35,40,56)",
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  eventLineContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: 1,
    height: 180,
    top: 20,
    backgroundColor: "rgb(90,145,204)",
    position: "absolute",
    left: 15,
    zIndex: -1,
  },
  title: {
    flexDirection: "row",
    width: 120,
    height: 32,
    padding: 5,
    paddingLeft: 15,
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "rgba(247, 47, 80, 0.1)",
  },
  title2: {
    flexDirection: "row",
    width: 155,
    height: 32,
    padding: 5,
    paddingLeft: 15,
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "rgba(243, 156, 18, 0.3)",
  },
  title3: {
    flexDirection: "row",
    width: 96,
    height: 32,
    padding: 5,
    paddingLeft: 15,
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: " rgba(52, 152, 219, 0.3)",
  },
  warnInfo: {
    flexDirection: "column",
    padding: 3,
    marginTop: 10,
    marginLeft: 3,
  },
  desStyle: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgb(240,245,255)",
    verticalAlign: "top",
    textAlign: "left",
  },
  dexStyle2: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    color: "rgb(197,205,222)",
    verticalAlign: "top",
    textAlign: "left",
  },
});

export default TimeReviewScreen;
