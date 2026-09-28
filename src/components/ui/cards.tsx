import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// Definimos el tipo de las props (usamos ":" no "=")
interface CardProps {
  title: string;
  image: string;
  description: string;
  onPress?: () => void; // <-- añadimos la prop onPress como opcional
}

// Definimos el componente como función flecha
const Card = ({ title, image, description, onPress }: CardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Pressable>
  );
};

// Estilos: corregimos la sintaxis y añadimos resizeMode
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover", // <-- esto evita que se vea borrosa o distorsionada
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666666",
  },
  cardPressed: {
    opacity: 0.8,
  },
});

export default Card;
