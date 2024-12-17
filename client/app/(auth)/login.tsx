import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = async () => {
    const success = await login(email, password);

    if (success) {
      router.replace("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center p-4 mx-4 bg-slate-100">
      <Text className="text-4xl font-bold mb-2">Welcome Back!</Text>
      <Text className="text-2xl font-semibold mb-4">
        Please enter your Login credentials
      </Text>

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
        onPress={handleLogin}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
      >
        <Text className="text-white font-bold text-xl">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text className="font-semibold text-xl">
          Don't have an account? <Text className="text-blue-500">Register</Text>{" "}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
