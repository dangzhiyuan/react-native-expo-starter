import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";
import dayjs from "dayjs";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
}

export const Calendar = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
}: CalendarProps) => {
  const { theme } = useTheme();
  const { layout } = useResponsive();
  const [currentMonth, setCurrentMonth] = useState(value || new Date());

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      borderRadius: 8,
      padding: layout.padding,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: layout.gutter,
    },
    weekDays: {
      flexDirection: "row",
      marginBottom: layout.gutter,
    },
    weekDay: {
      flex: 1,
      alignItems: "center",
    },
    daysGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    day: {
      width: `${100 / 7}%`,
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    selectedDay: {
      backgroundColor: theme.primary,
      borderRadius: 100,
    },
    disabledDay: {
      opacity: 0.3,
    },
    todayText: {
      color: theme.primary,
      fontWeight: "bold",
    },
  });

  const getDaysInMonth = (date: Date) => {
    const start = dayjs(date).startOf("month");
    const end = dayjs(date).endOf("month");
    const days = [];
    let current = start.startOf("week");

    while (current.isBefore(end) || current.isSame(end, "day")) {
      days.push(current.toDate());
      current = current.add(1, "day");
    }

    return days;
  };

  const isDisabled = (date: Date) => {
    if (minDate && dayjs(date).isBefore(minDate, "day")) return true;
    if (maxDate && dayjs(date).isAfter(maxDate, "day")) return true;
    return disabledDates.some((d) => dayjs(date).isSame(d, "day"));
  };

  const isSelected = (date: Date) => value && dayjs(date).isSame(value, "day");

  const isToday = (date: Date) => dayjs(date).isSame(new Date(), "day");

  const handleDayPress = (date: Date) => {
    if (!isDisabled(date)) {
      onChange?.(date);
    }
  };

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
  const days = getDaysInMonth(currentMonth);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() =>
            setCurrentMonth(dayjs(currentMonth).subtract(1, "month").toDate())
          }
        >
          <Text>上个月</Text>
        </Pressable>
        <Text variant="h3">{dayjs(currentMonth).format("YYYY年MM月")}</Text>
        <Pressable
          onPress={() =>
            setCurrentMonth(dayjs(currentMonth).add(1, "month").toDate())
          }
        >
          <Text>下个月</Text>
        </Pressable>
      </View>
      <View style={styles.weekDays}>
        {weekDays.map((day) => (
          <View key={day} style={styles.weekDay}>
            <Text color="secondary">{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.daysGrid}>
        {days.map((date, index) => {
          const disabled = isDisabled(date);
          const selected = isSelected(date);
          const today = isToday(date);

          return (
            <Pressable
              key={index}
              style={[
                styles.day,
                selected && styles.selectedDay,
                disabled && styles.disabledDay,
              ]}
              onPress={() => handleDayPress(date)}
              disabled={disabled}
            >
              <Text
                color={selected ? "inverse" : undefined}
                style={today && styles.todayText}
              >
                {dayjs(date).format("D")}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
