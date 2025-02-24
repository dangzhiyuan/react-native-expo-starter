import * as React from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider as PaperProvider,
  Chip,
  Switch,
} from "react-native-paper";
import { ScrollView, View } from "react-native";

const dataSource = [
  "Volvo",
  "Alpha Sports",
  "Ford",
  "Gräf & Stift",
  "Aston Martin",
  "BMW",
  "Tarrant Automobile",
  "Push",
  "Österreichische Austro-Fiat",
  "Mazda",
  "Rosenbauer",
];

const SwitchLanguageModal = ({ backgroundColor, openModal, setOpenModal }) => {
  const hideModal = () => setOpenModal(false);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const color = ["red", "#66CCFF", "#FFCC00", "#1C9379", "#8A7BA7"];
  const randomColor = () => {
    let col = color[Math.floor(Math.random() * color.length)];
    return col;
  };

  return (
    <Portal>
      <Modal
        visible={openModal}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          margin: 100,
          borderRadius: 10,
        }}
      >
        <ScrollView>
          <Text>A long chunk of text</Text>
          <Button
            onPress={hideModal}
            mode="contained"
            dark={true}
            background={backgroundColor}
          >
            Cool!
          </Button>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {dataSource.map((index) => (
              <View key={index} style={{ margin: 5 }}>
                <Chip icon="information" onPress={() => console.log("Pressed")}>
                  Example Chip {index}
                </Chip>
              </View>
            ))}
          </View>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default SwitchLanguageModal;
