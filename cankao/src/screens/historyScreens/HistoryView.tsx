import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon, PaperProvider, Portal, Searchbar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { lessonStore } from "../../stroages/lessonStorage";
import { useNavigation } from "@react-navigation/native";
import CustomTrainName from "../modals/CustomTrainName";
import HistoryDetail from "./HistoryDetail";

const HistoryView = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [saveName, setSaveName] = useState(null);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const flashListRef = useRef(null);
  const scrollOffset = useRef(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMoreRecords();
  }, []);

  useEffect(() => {
    async function loadRecords(pageIndex) {
      setIsLoading(true);
      try {
        const newRecords = await lessonStore
          .getState()
          .getHistoryScore(pageIndex, pageSize);
        if (pageIndex === 0) {
          setRecords(newRecords);
        } else {
          setRecords((prev) => [...prev, ...newRecords]);
        }
        setPage(pageIndex);
        setHasMore(newRecords.length >= pageSize);
      } catch (error) {
        console.error("Failed to fetch records", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    }
    loadRecords(0);
    if (changeName) {
      loadMoreRecords();
    }
  }, [changeName]);

  useEffect(() => {
    console.log("scrollOffset.current", scrollOffset.current);
    if (selectedItem === null && flashListRef.current) {
      flashListRef.current.scrollToOffset({
        offset: scrollOffset.current,
        animated: false,
      });
    }
  }, [selectedItem]);

  const loadMoreRecords = async () => {
    if (!isLoading && hasMore) {
      const pageIndex = page + 1;
      setIsLoading(true);
      try {
        const newRecords = await lessonStore
          .getState()
          .getHistoryScore(pageIndex, pageSize);
        if (pageIndex === 0) {
          setRecords(newRecords);
        } else {
          setRecords((prev) => [...prev, ...newRecords]);
        }
        setPage(pageIndex);
        setHasMore(newRecords.length >= pageSize);
      } catch (error) {
        console.error("Failed to fetch records", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const showModal = () => {
    setVisible(true);
    setChangeName(false);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const filteredRecords = searchQuery.trim()
    ? records.filter(
        (item) =>
          item.lesson_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase().trim()) ||
          item.result_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase().trim())
      )
    : records;

  const fetchRecords = async (page) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return lessonStore.getState().getHistoryScore(page, pageSize);
  };

  const handleScroll = (event) => {
    scrollOffset.current = event.nativeEvent.contentOffset.y;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recordItem}
      onPress={() => {
        setSelectedItem(item);
      }}
    >
      <View
        style={{
          width: "100%",
          height: "20%",
          backgroundColor: "rgba(30, 35, 48, 1)",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            color: "rgba(130, 144, 174, 1)",
            left: 24,
          }}
        >
          {item.train_begin_time} - {item.train_end_time}
        </Text>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", marginTop: 6, marginLeft: 32 }}>
          <View
            style={{
              width: 76,
              height: 28,
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "transparent",
              }}
            ></Text>
          </View>
          <Text style={styles.arrowIcon}>→</Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 32 }}>
          <Text style={styles.details}>{item.lesson_name}</Text>
          <View style={{ marginTop: 5 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                color: "rgba(130, 144, 174, 1)",
                textAlign: "left",
                verticalAlign: "top",
              }}
            >
              ({item.result_name})
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              borderColor: "rgba(46, 50, 66, 1)",
              backgroundColor: "rgba(46, 50, 66, 1)",
              borderWidth: 1,
              marginTop: 8,
              marginLeft: "2%",
            }}
            onPress={() => {
              showModal();
              setSaveName(item);
            }}
          >
            <Icon source="pencil" color={"rgba(197, 205, 222, 1)"} size={17} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginTop: 22, marginLeft: 38 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.score}>{item.total_score_manual}</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "rgba(197, 205, 222, 1)",
                marginTop: 12,
              }}
            >
              分
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "55%",
            }}
          >
            <View style={styles.avatar}>
              <Image
                source={require("../../../assets/images/icon.png")}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "rgba(197, 205, 222, 1)",
                textAlign: "left",
                verticalAlign: "top",
              }}
            >
              教员 {item.pilot_name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDetailsView = () => {
    return (
      <View style={styles.detailsView}>
        <HistoryDetail
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </View>
    );
  };

  return (
    <PaperProvider>
      <Portal>
        <View style={styles.container}>
          {selectedItem ? (
            renderDetailsView()
          ) : (
            <>
              <Searchbar
                placeholder="搜索"
                style={{
                  backgroundColor: "rgba(19, 22, 31, 1)",
                  borderRadius: 73,
                  borderColor: "transparent",
                  marginBottom: 10,
                }}
                inputStyle={{
                  backgroundColor: "rgba(19, 22, 31, 1)",
                  color: "rgba(240, 245, 255, 1)",
                }}
                selectionColor={"white"}
                iconColor="rgba(130, 144, 174, 1)"
                placeholderTextColor={"rgba(130, 144, 174, 1)"}
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
              <View style={styles.trainRecords}>
                <Text style={styles.moonIcon}>训练记录</Text>
                <FlashList
                  ref={flashListRef}
                  data={filteredRecords}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  contentInsetAdjustmentBehavior="always"
                  keyExtractor={(item) => item.result_id}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  onEndReached={loadMoreRecords}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
                  estimatedItemSize={300}
                  onScroll={handleScroll}
                  overrideItemLayout={(layout, item, index, maxColumns) => {
                    layout.size = 300;
                  }}
                />
              </View>
            </>
          )}
        </View>
        <CustomTrainName
          visible={visible}
          onDismiss={hideModal}
          selectItem={saveName}
          setChangeName={setChangeName}
          navigation={navigation}
        />
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(25, 29, 40, 1)",
  },
  detailsView: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "transparent",
    borderRadius: 15,
    padding: 10,
  },
  trainRecords: {
    flex: 1,
    flexDirection: "column",
    margin: 15,
  },
  recordItem: {
    flex: 1,
    height: 200,
    backgroundColor: "rgba(35, 40, 56, 1)",
    borderRadius: 8,
    padding: 0,
    marginTop: 10,
    marginBottom: 10,
    position: "relative",
  },
  score: {
    fontSize: 30,
    fontWeight: "500",
    color: "rgba(240, 245, 255, 1)",
  },
  details: {
    fontSize: 20,
    margin: 5,
    color: "rgba(197, 205, 222, 1)",
  },
  arrowIcon: {
    marginLeft: "80%",
    color: "rgba(197, 205, 222, 1)",
    fontSize: 20,
    fontWeight: "500",
  },
  moonIcon: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(130, 144, 174, 1)",
    textAlign: "left",
    verticalAlign: "top",
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    left: "5%",
    top: 60,
  },
  avatar: {
    backgroundColor: "rgb(230, 230, 230)",
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default HistoryView;
