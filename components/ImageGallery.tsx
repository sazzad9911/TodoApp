import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Album, Asset } from "expo-media-library";
import { ThemedText } from "./ThemedText";
const { width, height } = Dimensions.get("window");

export default function ImageGallery({
  onSelect,
}: {
  onSelect: (d: string) => void;
}) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [images, setImages] = useState<Asset[]>([]);
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
      if (status === "granted") {
        const albumList = await MediaLibrary.getAlbumsAsync();
        setAlbums(albumList);
        selectAlbum(albumList[0]);
      }
    })();
  }, []);
  const selectAlbum = async (album: Album) => {
    setSelectedAlbum(album);
    const albumAssets = await MediaLibrary.getAssetsAsync({
      album: album.id,
      first: 100, // Number of images to load
      mediaType: "photo",
    });
    setImages(albumAssets.assets);
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Requesting for camera roll permission</ThemedText>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>No access to camera roll</ThemedText>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      

      <Text style={styles.title}>Select an Album:</Text>
      <View style={{ height: 50 }}>
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => selectAlbum(item)}
              style={styles.albumButton}
            >
              <Text style={styles.albumText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {selectedAlbum && (
        <>
          <Text style={styles.title}>Images in {selectedAlbum.title}:</Text>
          <FlatList
            data={images}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{
                onSelect(item.uri)
              }}>
                <Image source={{ uri: item.uri }} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginVertical: 20,
    fontSize: 18,
  },
  albumButton: {
    marginRight: 10,
    padding: 10,
    backgroundColor: "lightgray",
    height: 50,
  },
  albumText: {
    fontSize: 16,
  },
  image: {
    width: width / 3 - 23,
    height: 100,
    margin: 5,
  },
});
