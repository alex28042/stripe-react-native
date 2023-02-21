import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

const API_URL = "http://localhost:3000";

const StripeApp = () => {
  const [email, setEmail] = useState("");
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayment = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("email");
      return;
    }

    const billingDetails = {
      email: email,
    };

    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      if (error) console.log("error");
      else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });

        if (error) {
          alert("payment confirmation error");
        } else if (paymentIntent) {
          alert("Payment sucessfull");
        }
      }
    } catch (error) {}
  };

  return (
    <View>
      <TextInput
        className="bg-slate-500 rounded-sm h-32 w-10 p-2 w-3/4"
        autoCapitalize="none"
        placeholder="email"
        keyboardType="email-address"
        onChange={(text) => setEmail(text)}
        style={s}
      />
      <CardField
        postalCodeEnabled
        placeholders={{ number: "4242 4242 4242 4242" }}
        cardStyle={{ backgroundColor: "#efefefef" }}
        style={{ height: 50, marginVertical: 30 }}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <TouchableOpacity
        disabled={loading}
        onPress={() => handlePayment()}
      ></TouchableOpacity>
    </View>
  );
};

export default StripeApp;
