import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
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
    <SafeAreaView className="flex-1 items-center justify-center p-4 bg-slate-100">
      <Text className="text-4xl font-bold mb-2">Welcome to MovieDB</Text>
      <Text className="text-2xl font-semibold mb-4 text-center">
        Please enter your details to register with us
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        className="border border-gray-500 w-full py-2 px-4 mb-4 rounded-md"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-500 w-full py-2 px-4 mb-4 rounded-md"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="border border-gray-500 w-full py-2 px-4 mb-4 rounded-md"
      />

      <TouchableOpacity
        onPress={handleregister}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
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
