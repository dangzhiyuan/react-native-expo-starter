import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { useResponsive } from "../../utils/responsive";

interface ImageViewerProps {
  images: Array<{ uri: string }>;
  visible: boolean;
  onClose: () => void;
  initialIndex?: number;
  style?: any;
  imageContainerStyle?: any;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  visible,
  onClose,
  initialIndex = 0,
  style,
  imageContainerStyle,
}) => {
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: layout.padding / 2,
      zIndex: 1,
    },
    imageContainer: {
      width: "31%",
      aspectRatio: 1,
      borderRadius: 8,
      overflow: "hidden",
    },
    thumbnail: {
      width: "100%",
      height: "100%",
    },
  });

  return (
    <>
      <View style={[styles.container, style]}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={image.uri}
            onPress={() => {
              onClose();
              setTimeout(() => onClose(), 0);
            }}
            style={[styles.imageContainer, imageContainerStyle]}
          >
            <Image
              source={{ uri: image.uri }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
      <ImageView
        images={images}
        imageIndex={initialIndex}
        visible={visible}
        onRequestClose={onClose}
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
        presentationStyle="fullScreen"
      />
    </>
  );
};
