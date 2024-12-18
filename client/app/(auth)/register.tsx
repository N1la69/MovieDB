import { useAuth } from "@/hooks/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();

  const handleregister = async () => {
    const success = await register(name, email, password);

    if (success) {
      router.replace("/");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4">
      <Text className="text-4xl font-bold mb-2">Welcome to MovieDB</Text>
      <Text className="text-2xl font-semibold mb-4 text-center">
        Please enter your details to register with us
      </Text>

      <View className="flex flex-row items-center w-full gap-2 border border-gray-500 py-1 px-4 rounded-md mb-4">
        <Ionicons name="person" size={24} color="black" />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          className=""
        />
      </View>

      <View className="flex flex-row items-center w-full gap-2 border border-gray-500 py-1 px-4 rounded-md mb-4">
        <Ionicons name="mail" size={24} color="black" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className=""
        />
      </View>

      <View className="flex flex-row items-center w-full gap-2 border border-gray-500 py-1 px-4 rounded-md mb-4">
        <Ionicons name="lock-closed" size={24} color="black" />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className=""
        />
      </View>

      <TouchableOpacity
        onPress={handleregister}
        className="bg-blue-500 px-4 py-2 rounded mb-4 mt-3"
      >
        <Text className="text-white font-bold text-xl">Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text className="font-semibold text-xl">
          Already have an account? <Text className="text-blue-500">Login</Text>{" "}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;
