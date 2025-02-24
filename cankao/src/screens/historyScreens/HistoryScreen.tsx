import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { lessonStore } from "../../stroages/lessonStorage";

const TableHeader = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.columnHeader}>
    <Text style={styles.columnHeaderText}>{title}</Text>
  </TouchableOpacity>
);

const HistoryScreen = ({ backgroundColor }) => {
  const [data, setData] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const fetchHistoryScore = async () => {
    try {
      // await lessonStore.getState().getHistoryScore("1");
      const result = lessonStore.getState().historyScore;
      console.log("result", result[0]);
      if (result) {
        setData([...result]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortKey === null) {
      return 0;
    }
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue === bValue) {
      return 0;
    }
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={fetchHistoryScore}
        style={[styles.button, { backgroundColor }]}
      >
        <Text style={styles.buttonText}>Fetch History Score</Text>
      </TouchableOpacity>
      <View style={styles.headerRow}>
        <TableHeader
          title="lesson_id"
          onPress={() => handleSort("lesson_id")}
        />
        <TableHeader title="data" onPress={() => handleSort("data")} />
        <TableHeader title="data_en" onPress={() => handleSort("data_en")} />
        <TableHeader title="name" onPress={() => handleSort("name")} />
        <TableHeader title="name_en" onPress={() => handleSort("name_en")} />
        <TableHeader
          title="data_up_boundary"
          onPress={() => handleSort("data_up_boundary")}
        />
        <TableHeader
          title="data_down_boundary"
          onPress={() => handleSort("data_down_boundary")}
        />
        <TableHeader title="result" onPress={() => handleSort("result")} />
        <TableHeader title="score" onPress={() => handleSort("score")} />
        <TableHeader title="time" onPress={() => handleSort("time_stamp")} />
      </View>
      <View style={styles.separator} />
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.dataRow}>
            <Text style={styles.cell}>{item.lesson_id}</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.cell}>{item.data}</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.cell}>{item.data_en}</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.cell}>{item.name}</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.cell}>{item.name_en}</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.cell}>{item.data_up_boundary}</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.cell}>{item.data_down_boundary}</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.cell}>{item.result}</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.cell}>{item.score}</Text>
            <View style={styles.verticalSeparator} />
            <Text style={styles.cell}>
              {new Date(item.time_stamp).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  dataRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  columnHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  columnHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    fontSize: 14,
  },
  verticalSeparator: {
    width: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HistoryScreen;
