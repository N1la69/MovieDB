import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import { styles } from "@/styles/Style";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user } = useAuth();
  const [collections, setCollections] = useState<any[]>([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        if (user?.id) {
          //console.log(user?.id);
          const response = await api.get(`/movies/collections/${user?.id}`, {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          });
          console.log(response.data);
          setCollections(response.data.collections);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch collections (index):",
          error.response?.data || error
        );
      }
    };

    if (user?.id) {
      fetchCollections();
    }
  }, [user?.id]);

  const handleCreateCollection = async () => {
    if (newCollectionName.trim()) {
      try {
        const response = await api.post(
          "/api/movies/collections/addCollection",
          {
            name: newCollectionName,
            userId: user?.id,
          }
        );

        setCollections((prevCollections): any => [
          ...prevCollections,
          response.data.collection,
        ]);

        setNewCollectionName("");
        setIsCreating(false);
      } catch (error) {
        console.error("Failed to create collection (index):", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.ColorContainer}>
      <Header />

      <View className="flex-1 items-center justify-center">
        {collections.length === 0 ? (
          <Text className="text-gray-500 mb-4">
            You currently have no collections, create a collection.
          </Text>
        ) : (
          <FlatList
            data={collections}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 mb-2 bg-gray-100 rounded-lg"
                onPress={() => console.log("Navigate to collection", item.name)}
              >
                <Text className="text-gray-800 text-lg font-semibold">
                  {item.name}
                </Text>
                <Button
                  title="Add New Calendar Year"
                  onPress={() => console.log("Add year to", item.name)}
                />
              </TouchableOpacity>
            )}
          />
        )}

        {!isCreating ? (
          <Button
            title="Create Collection"
            onPress={() => setIsCreating(true)}
          />
        ) : (
          <View className="mt-4">
            <TextInput
              placeholder="Enter collection name"
              className="border p-2 rounded mb-2"
              value={newCollectionName}
              onChangeText={setNewCollectionName}
            />
            <Button title="Save Collection" onPress={handleCreateCollection} />
            <Button
              title="Cancel"
              onPress={() => {
                setIsCreating(false);
                setNewCollectionName("");
              }}
              color="red"
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
