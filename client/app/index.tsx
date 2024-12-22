import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import { styles } from "@/styles/Style";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user } = useAuth();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // COLLECTION STATES
  const [collections, setCollections] = useState<any[]>([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(
    null
  );
  const [newCollectionNameForEdit, setNewCollectionNameForEdit] = useState("");

  // YEAR STATES
  const [years, setYears] = useState<{ [key: string]: any[] }>({});
  const [editingYearId, setEditingYearId] = useState<string | null>(null);
  const [newYearNameForEdit, setNewYearNameForEdit] = useState("");

  // COLLECTION FUNCTIONS
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        if (user?.id) {
          const response = await api.get(`/collections/${user?.id}`, {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          });
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
        if (user?.id) {
          const response = await api.post("/collections/addCollection", {
            name: newCollectionName,
            userId: user?.id,
          });

          setCollections((prevCollections): any => [
            ...prevCollections,
            response.data.collection,
          ]);

          setNewCollectionName("");
          setIsCreating(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to create collection:",
          error.response?.data || error
        );
      }
    }
  };

  const handleDeleteCollection = (collectionId: string) => {
    Alert.alert(
      "Delete Collection",
      "Are you sure you want to delete this collection? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await api.delete(
                `/collections/${collectionId}`,
                {
                  data: { userId: user?.id },
                }
              );

              console.log(response.data.message);
              setCollections((prevCollections) =>
                prevCollections.filter(
                  (collection) => collection._id !== collectionId
                )
              );
            } catch (error: any) {
              console.error(
                "Failed to delete collection (index):",
                error.response?.data || error
              );
            }
          },
        },
      ]
    );
  };

  const handleEditCollection = async () => {
    if (newCollectionNameForEdit.trim()) {
      try {
        const response = await api.put(`/collections/${editingCollectionId}`, {
          collectionId: editingCollectionId,
          newName: newCollectionNameForEdit,
          userId: user?.id,
        });

        setCollections((prevCollections) =>
          prevCollections.map((collection) =>
            collection._id === editingCollectionId
              ? { ...collection, name: newCollectionNameForEdit }
              : collection
          )
        );

        setEditingCollectionId(null);
        setNewCollectionNameForEdit("");
      } catch (error: any) {
        console.error(
          "Failed to edit collection (index):",
          error.response?.data || error
        );
      }
    }
  };

  // YEAR FUNCTIONS
  useEffect(() => {
    const fetchYears = async () => {
      if (!activeDropdown) return;

      try {
        const response = await api.get(`/years/${activeDropdown}`, {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        });

        setYears((prevYears) => ({
          ...prevYears,
          [activeDropdown]: response.data.years,
        }));
      } catch (error: any) {
        console.error(
          "Failed to fetch years (index):",
          error.response?.data || error
        );
      }
    };

    fetchYears();
  }, [activeDropdown]);

  const handleAddYear = async () => {
    if (!activeDropdown) return;

    try {
      const response = await api.post(
        `/years/addYear`,
        {
          collectionId: activeDropdown,
          year: new Date().getFullYear(),
        },
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setYears((prevYears) => ({
        ...prevYears,
        [activeDropdown]: [
          ...(prevYears[activeDropdown] || []),
          response.data.year,
        ],
      }));
    } catch (error: any) {
      console.error(
        "Failed to add year (index):",
        error.response?.data || error
      );
    }
  };

  const handleEditYear = async () => {
    if (!activeDropdown) return;
    if (newYearNameForEdit.trim()) {
      try {
        const response = await api.put(`/years/${editingYearId}`, {
          yearId: editingYearId,
          newYearName: newYearNameForEdit,
          collectionId: activeDropdown,
          userId: user?.id,
        });

        // Update the years in the state
        setYears((prevYears) => ({
          ...prevYears,
          [activeDropdown]: prevYears[activeDropdown]?.map((yearItem) =>
            yearItem._id === editingYearId
              ? { ...yearItem, year: newYearNameForEdit }
              : yearItem
          ),
        }));

        // Reset the editing state
        setEditingYearId(null);
        setNewYearNameForEdit("");
      } catch (error: any) {
        console.error("Failed to edit year:", error.response?.data || error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.ColorContainer}>
      <Header />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-3 py-2">
          {collections.length === 0 ? (
            <Text className="text-gray-500 mb-4 text-center pt-10">
              You currently have no collections, create a collection.
            </Text>
          ) : (
            <View>
              <Text className="text-center font-bold text-3xl py-4">
                Your Collections
              </Text>
              <FlatList
                data={collections}
                keyExtractor={(item: any) => item._id + "1"}
                renderItem={({ item }) => (
                  <View className="p-4 pt-6 mb-4 bg-gray-100 rounded-lg">
                    <View className="relative">
                      <Text className="text-gray-800 text-2xl font-bold mb-2">
                        {item.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          setActiveDropdown(
                            activeDropdown === item._id ? null : item._id
                          )
                        }
                        className="absolute right-3 top-1"
                      >
                        <Ionicons
                          name="settings-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Calender Years */}
                    <View className="px-3">
                      {!years[item._id] || years[item._id].length === 0 ? (
                        <Text className="text-gray-500 mb-4 text-center pt-2">
                          You currently have no calendar years associated with
                          this collection, add a year.
                        </Text>
                      ) : (
                        <FlatList
                          data={years[item._id]}
                          keyExtractor={(yearItem) => yearItem._id}
                          renderItem={({ item: yearItem }) => (
                            <TouchableOpacity
                              className="px-3 pt-3 pb-2 mb-2 bg-gray-400 rounded-2xl"
                              onPress={() =>
                                console.log("Year clicked:", yearItem._id)
                              } // Handle year click left
                            >
                              <View className="relative">
                                <Text className="text-white text-2xl font-bold mb-2">
                                  {yearItem.year}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    setEditingYearId(yearItem._id);
                                    setNewYearNameForEdit(yearItem.year);
                                  }}
                                  className="absolute right-3 top-1"
                                >
                                  <Ionicons
                                    name="create-outline"
                                    size={24}
                                    color="white"
                                  />
                                </TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                      )}
                    </View>

                    {activeDropdown === item._id && (
                      <View className="flex justify-between items-center gap-3">
                        <TouchableOpacity
                          onPress={handleAddYear}
                          style={styles.NormalButtonStyle}
                        >
                          <Ionicons name="add" size={24} color="white" />
                          <Text className="text-white ml-2 text-lg text-semibold">
                            Add Calendar Year
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            setEditingCollectionId(item._id);
                            setNewCollectionNameForEdit(item.name);
                          }}
                          style={styles.NeutralButtonStyle}
                        >
                          <Ionicons name="create" size={24} color="white" />
                          <Text className="text-white ml-2 text-lg text-semibold">
                            Edit Collection Name
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleDeleteCollection(item._id)}
                          style={styles.CancelButtonStyle}
                        >
                          <Ionicons name="trash" size={24} color="white" />
                          <Text className="text-white ml-2 text-lg text-semibold">
                            Delete Collection
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              />
            </View>
          )}

          {!isCreating ? (
            <TouchableOpacity
              onPress={() => setIsCreating(true)}
              style={styles.NormalButtonStyle}
            >
              <Ionicons name="add" size={25} color="white" />
              <Text className="text-white ml-2 text-lg text-semibold">
                Create New Collection
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="mt-4">
              <TextInput
                placeholder="Enter collection name"
                className="border p-2 rounded mb-2"
                value={newCollectionName}
                onChangeText={setNewCollectionName}
              />

              <View className="flex justify-between items-center gap-2">
                <TouchableOpacity
                  onPress={handleCreateCollection}
                  style={styles.NormalButtonStyle}
                >
                  <Ionicons name="save" size={24} color="white" />
                  <Text className="text-white ml-2 text-lg text-semibold">
                    Save Collection
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setIsCreating(false);
                    setNewCollectionName("");
                  }}
                  style={styles.CancelButtonStyle}
                >
                  <Ionicons name="close" size={24} color="white" />
                  <Text className="text-white ml-2 text-lg text-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {editingCollectionId && (
            <View className="mt-4 p-5">
              <TextInput
                placeholder="Edit collection name"
                className="border p-2 rounded mb-2"
                value={newCollectionNameForEdit}
                onChangeText={setNewCollectionNameForEdit}
              />

              <View className="flex justify-between items-center gap-2">
                <TouchableOpacity
                  onPress={handleEditCollection}
                  style={styles.NormalButtonStyle}
                >
                  <Ionicons name="save" size={24} color="white" />
                  <Text className="text-white ml-2 text-lg text-semibold">
                    Save Changes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setEditingCollectionId(null);
                    setNewCollectionNameForEdit("");
                  }}
                  style={styles.CancelButtonStyle}
                >
                  <Ionicons name="close" size={24} color="white" />
                  <Text className="text-white ml-2 text-lg text-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {editingYearId && (
            <View className="mt-4 p-5">
              <TextInput
                placeholder="Edit year name"
                className="border p-2 rounded mb-2"
                value={newYearNameForEdit}
                onChangeText={setNewYearNameForEdit}
              />

              <View className="flex justify-between items-center gap-2">
                <TouchableOpacity
                  onPress={handleEditYear}
                  style={styles.NormalButtonStyle}
                >
                  <Ionicons name="save" size={24} color="white" />
                  <Text className="text-white ml-2 text-lg text-semibold">
                    Save Changes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setEditingYearId(null);
                    setNewYearNameForEdit("");
                  }}
                  style={styles.CancelButtonStyle}
                >
                  <Ionicons name="close" size={24} color="white" />
                  <Text className="text-white ml-2 text-lg text-semibold">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
