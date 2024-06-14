import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import ImageGallery from "@/components/ImageGallery";
import { useIsFocused } from "@react-navigation/native";
import { addImage, allImages, deleteImage } from "@/utils/storage";
import { ThemedText } from "@/components/ThemedText";
const { width, height } = Dimensions.get("window");
interface ImagesTypes {
  uri: string;
  id: string;
  taskId: string;
}
export default function Images() {
  const { id } = useLocalSearchParams();
  const [modalShow, setModalShow] = useState(false);
  const [images, setImages] = useState<ImagesTypes[]>([]);
  const isFocused = useIsFocused();
  const [reload, setReload] = useState(0);
  //console.log(selectImage)
  useEffect(() => {
    const getData = async () => {
      try {
        const localData = await allImages(id as string);
        setImages(localData);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [isFocused, reload]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {images.length > 0 && (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.uri }} style={styles.image} />
              <TouchableOpacity
                onPress={async () => {
                  await deleteImage(item.id);
                  setReload(Math.random());
                }}
                style={styles.deleteIcon}
              >
                <AntDesign name="delete" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {images.length === 0 && <ThemedText>No Image!</ThemedText>}
      <TouchableOpacity
        onPress={() => setModalShow(true)}
        style={styles.button}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
      <Modal visible={modalShow} onRequestClose={() => setModalShow(false)}>
        <ImageGallery
          onSelect={async (e) => {
            //setSelectImage(e);
            setModalShow(false);
            await addImage(id as string, e);
            setReload(Math.random());
          }}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0082D6",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  image: {
    width: width / 3 - 23,
    height: 100,
    margin: 5,
  },
  deleteIcon: {
    backgroundColor: "#0082D6",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
