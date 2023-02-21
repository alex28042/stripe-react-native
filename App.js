import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import StripeApp from "./src/StripeApp";

export default function App() {
  const [publishableKey, setPublishableKey] = useState("pk_test_51LiOtxKEbbYpdkJ18XhgKkboyB14CkI4T5kXZUzyBEp44T6pJRFz66N1vIujoGBkFNppOXSQ8oGUIRwl4ZXq4LFN00R0flZlpg");

  return (
    <StripeProvider publishableKey={publishableKey}>
      <StripeApp />
    </StripeProvider>
  );
}
