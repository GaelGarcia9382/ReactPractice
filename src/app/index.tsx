import Card from "@/components/ui/cards";
import { CardItem } from "@/types/CardItem";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ApiProduct {
  id: number;
  title: string;
  description: string;
  image: string;
}

const adaptProductsToCardItems = (p: ApiProduct): CardItem => ({
  id: String(p.id),
  title: p.title,
  image: p.image,
  description: p.description,
});

const API_URL = "https://fakestoreapi.com/products?limit=10";

export default function HomeScreen() {
  const router = useRouter();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCards = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch data: " + response.statusText);
      }
      const data: ApiProduct[] = await response.json();
      setCards(data.map(adaptProductsToCardItems));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCards();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.message}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Pressable onPress={fetchCards} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={cards}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={
        <Text style={styles.message}>No items available.</Text>
      }
      renderItem={({ item }) => (
        <Card
          title={item.title}
          image={item.image}
          description={item.description}
          onPress={() =>
            router.push({
              pathname: "/details" as any,
              params: { item: JSON.stringify(item) },
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    margin: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    margin: 16,
    color: "red",
  },
  retryButton: {
    backgroundColor: "#0000ff",
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
});
