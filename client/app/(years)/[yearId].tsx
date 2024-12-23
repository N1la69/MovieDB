import Header from "@/components/Header";
import api from "@/lib/axios";
import { styles } from "@/styles/Style";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const YearPage = () => {
  const searchParams = useSearchParams();
  const yearId = searchParams.get("yearId");

  const [movies, setMovies] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cast, setCast] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [genre, setGenre] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("");
  const [posterUrl, setPosterUrl] = useState("");
  const [rating, setRating] = useState<number>(0.0);

  useEffect(() => {
    const fetchMoviesByYear = async () => {
      try {
        if (yearId) {
          const response = await api.get(`/movies/${yearId}`);
          setMovies(response.data.movies);
        }
      } catch (error: any) {
        console.log(
          "Error fetching movies by year [yearId]:",
          error.response?.data || error
        );
      }
    };

    fetchMoviesByYear();
  }, [yearId]);

  const handleAddMovie = async () => {
    try {
      const newMovie = {
        title,
        description,
        cast,
        duration,
        releaseDate,
        genre,
        language,
        posterUrl,
        rating,
        yearId: yearId,
      };

      const response = await api.post("/movies/add", newMovie);

      if (response.data) {
        setIsAdding(false); // Close the modal after adding the movie
      } else {
        console.error("Error adding movie [yearId]:", response.data);
      }
    } catch (error: any) {
      console.error(
        "Error adding movie [yearId]:",
        error.response?.data || error
      );
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
          {movies.length === 0 ? (
            <Text className="text-gray-500 mb-4 text-center pt-10">
              You currently have no movies/series, add a movie/series.
            </Text>
          ) : (
            <View>
              <Text>Year Page: {yearId}</Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => setIsAdding(true)}
            style={styles.NormalButtonStyle}
          >
            <Ionicons name="add" size={25} color="white" />
            <Text className="text-white ml-2 text-lg text-semibold">
              Add a Movie/Series
            </Text>
          </TouchableOpacity>

          {/* MODAL FOR ADDING MOVIES/SERIES */}
          <Modal
            visible={isAdding}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsAdding(false)}
          >
            <BlurView
              intensity={100}
              tint="dark"
              className="flex-1 justify-center items-center"
            >
              <View className="bg-blue-100 p-6 rounded-lg w-4/5 shadow-md">
                <Text className="text-2xl font-bold mb-4">
                  Add a Movie/Series
                </Text>

                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Title"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Description"
                  multiline
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={cast.join(", ")}
                  onChangeText={(text) =>
                    setCast(text.split(", ").map((item) => item.trim()))
                  }
                  placeholder="Cast (comma separated)"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={String(duration)}
                  onChangeText={(text) => setDuration(Number(text))}
                  placeholder="Duration (in minutes)"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={releaseDate}
                  onChangeText={setReleaseDate}
                  placeholder="Release Date (YYYY-MM-DD)"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={genre.join(", ")}
                  onChangeText={(text) =>
                    setGenre(text.split(", ").map((item) => item.trim()))
                  }
                  placeholder="Genre (comma separated)"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={language}
                  onChangeText={setLanguage}
                  placeholder="Language"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={posterUrl}
                  onChangeText={setPosterUrl}
                  placeholder="Poster URL"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={String(rating)}
                  onChangeText={(text) => setRating(Number(text))}
                  placeholder="Your Rating (0-10)"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <View className="gap-2">
                  <TouchableOpacity
                    onPress={handleAddMovie}
                    style={styles.NormalButtonStyle}
                  >
                    <Ionicons name="save" size={24} color="white" />
                    <Text className="text-white ml-2 text-lg font-semibold">
                      Save Movie
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setIsAdding(false);
                      setTitle("");
                      setDescription("");
                      setCast([]);
                      setDuration(0);
                      setReleaseDate("");
                      setGenre([]);
                      setLanguage("");
                      setPosterUrl("");
                      setRating(0);
                    }}
                    style={styles.CancelButtonStyle}
                  >
                    <Ionicons name="close" size={24} color="white" />
                    <Text className="text-white ml-2 text-lg font-semibold">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YearPage;
