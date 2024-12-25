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
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const YearPage = () => {
  const searchParams = useSearchParams();
  const yearId = searchParams.get("yearId");
  const [year, setYear] = useState<string | any>(null);

  const [movies, setMovies] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [movieData, setMovieData] = useState<any>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [cast, setCast] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [genre, setGenre] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("");
  const [posterUrl, setPosterUrl] = useState("");
  const [rating, setRating] = useState<number>(0.0);

  useEffect(() => {
    const fetchYear = async () => {
      if (!yearId) return;

      try {
        const response = await api.get(`/years/year/${yearId}`);
        setYear(response.data.year);
      } catch (error: any) {
        console.error("Error fetching year:", error.response?.data || error);
      }
    };

    fetchYear();
  }, [yearId]);

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

  useEffect(() => {
    fetchMoviesByYear();
  }, [yearId]);

  // MOVIE FUNCTIONS
  const handleAddMovie = async () => {
    try {
      const newMovie = {
        title: title,
        description: description,
        cast: cast,
        duration: duration,
        releaseDate: releaseDate,
        genres: genre,
        language: language,
        posterUrl: posterUrl,
        rating: rating,
        yearId: yearId,
      };
      console.log(newMovie);
      const response = await api.post("/movies/add", newMovie);

      if (response.data) {
        fetchMoviesByYear();
        setIsAdding(false);
        setMovieData(null);
        setTitle("");
        setDescription("");
        setCast([]);
        setDuration(0);
        setReleaseDate("");
        setGenre([]);
        setLanguage("");
        setPosterUrl("");
        setRating(0);
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

  const searchOMDB = async () => {
    if (!title) return;

    try {
      const response = await api.get(`/movies/search-omdb?t=${title}}`);
      if (response.data) {
        setMovieData(response.data.movie);
        console.log(movieData);
      } else {
        setMovieData(null);
      }
    } catch (error: any) {
      console.log("Error searching movie:", error.response?.data || error);
      setFormError(error.response?.data || error);
      setMovieData(null);
    }
  };

  useEffect(() => {
    if (title) searchOMDB();
  }, [title]);

  useEffect(() => {
    if (movieData) {
      setDescription(movieData.description || "");
      setCast(movieData.cast || []);
      setDuration(movieData.duration || 0);
      setReleaseDate(movieData.releaseDate || "");
      setGenre(movieData.genre || []);
      setLanguage(movieData.language || "");
      setPosterUrl(movieData.posterUrl || "");
      setRating(movieData.rating || 0);
    }
  }, [movieData]);

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
              <Text className="text-center font-bold text-3xl py-4">
                Year: {year}
              </Text>

              <FlatList
                data={movies}
                keyExtractor={(item) => item._id}
                nestedScrollEnabled={true}
                renderItem={({ item, index }) => {
                  return (
                    <View className="p-4 bg-gray-100 rounded-lg mb-2">
                      <View className="relative">
                        <Text className="text-lg font-bold">
                          {index + 1}. {item.title} -- [{item.rating}/10]
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            console.log(item._id);
                          }}
                          className="absolute right-2 top-0"
                        >
                          <Ionicons
                            name="information-circle-outline"
                            size={25}
                            color="blue"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
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

                {formError && (
                  <Text className="text-red-500 my-2">{formError}</Text>
                )}

                <TextInput
                  value={movieData ? movieData.description : description}
                  onChangeText={setDescription}
                  placeholder="Description"
                  multiline
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={
                    movieData && movieData.cast && Array.isArray(movieData.cast)
                      ? movieData.cast.join(", ")
                      : cast.join(", ")
                  }
                  onChangeText={(text) =>
                    setCast(text.split(", ").map((item) => item.trim()))
                  }
                  placeholder="Cast (comma separated)"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                  multiline
                />

                <TextInput
                  value={
                    movieData ? String(movieData.duration) : String(duration)
                  }
                  onChangeText={(text) => setDuration(Number(text))}
                  placeholder="Duration (in minutes)"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={movieData ? movieData.releaseDate : releaseDate}
                  onChangeText={setReleaseDate}
                  placeholder="Release Date (YYYY-MM-DD)"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={
                    movieData &&
                    movieData.genre &&
                    Array.isArray(movieData.genre)
                      ? movieData.genre.join(", ")
                      : genre.join(", ")
                  }
                  onChangeText={(text) =>
                    setGenre(text.split(", ").map((item) => item.trim()))
                  }
                  placeholder="Genre (comma separated)"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={movieData ? movieData.language : language}
                  onChangeText={setLanguage}
                  placeholder="Language"
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={movieData ? movieData.posterUrl : posterUrl}
                  onChangeText={setPosterUrl}
                  placeholder="Poster URL"
                  multiline
                  className="border border-gray-300 rounded-md p-2 mb-4"
                />

                <TextInput
                  value={movieData ? movieData.rating : String(rating)}
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
                      setMovieData(null);
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
