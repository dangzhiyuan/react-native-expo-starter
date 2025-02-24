import { View, Image, TouchableOpacity, Text } from "react-native";

import styles from "./screenheader.style";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MenuProvider } from "react-native-popup-menu";
import { useState } from "react";

const logOutMenu = () => (
  <View>
    <Menu>
      <MenuTrigger text="Select action" customStyles={{}} />
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} text="Save" />
        <MenuOption onSelect={() => alert(`Delete`)}>
          <Text style={{ color: "red" }}>Delete</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => alert(`Not called`)}
          disabled={true}
          text="Disabled"
        />
      </MenuOptions>
    </Menu>
  </View>
);

const ScreenHeaderBtn = ({ iconUrl, dimension }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handlePress = () => {
    setShowMenu(!showMenu);
    console.log("pressed");
  };
  return (
    <MenuProvider>
      <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
        <Image
          source={iconUrl}
          resizeMode="cover"
          style={styles.btnImg(dimension)}
        />
        {showMenu && logOutMenu()}
      </TouchableOpacity>
    </MenuProvider>
  );
};

export default ScreenHeaderBtn;
