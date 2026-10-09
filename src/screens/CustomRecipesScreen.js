import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useDispatch, useSelector } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function CustomRecipesScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const route = useRoute();
    const { recipe, index = 0 } = route.params || {}; // Pass the object and index as parameters
    console.log("recipe", recipe);
  
    const favoriteRecipe = useSelector(
      (state) => state.favorites.favoriterecipes
    );
    console.log("favoriteRecipe from custom", favoriteRecipe);
  
    const isFavourite = favoriteRecipe?.some(
      (fav) =>
        (fav.idFood || fav.title || fav.id) ===
        (recipe?.idFood || recipe?.title || recipe?.id)
    );
  
    if (!recipe) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>No Recipe Details Available</Text>
        </View>
      );
    }
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite(recipe)); // Toggle favorite status
    };
  
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        testID="scrollContent"
      >
        {/* Task 1 & 2: Recipe Image Container */}
        <View style={styles.imageContainer} testID="imageContainer">
          {recipe.image ? (
            <Image
              source={{ uri: recipe.image }}
              style={[
                styles.articleImage,
                { height: index % 3 === 0 ? hp(25) : hp(35) },
              ]}
              resizeMode="cover"
            />
          ) : null}
        </View>
  
        {/* Task 3: Top Navigation Buttons */}
        <View style={styles.topButtonsContainer} testID="topButtonsContainer">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>GoBack</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavourite ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>
  
        {/* Task 4 & 5: Content Container */}
        <View style={styles.contentContainer} testID="contentContainer">
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Content</Text>
            <Text style={styles.contentText}>{recipe.description}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    imageContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    articleImage: {
      width: wp(98),
      borderRadius: 35,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      marginTop: 4,
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(4),
    },
    recipeTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(2),
    },
    sectionContainer: {
      marginBottom: hp(2),
    },
    sectionTitle: {
      fontSize: hp(2.5),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(1),
    },
    topButtonsContainer: {
      width: "100%",
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: hp(4),
    },
    backButton: {
      padding: 8,
      borderRadius: 50,
      marginLeft: wp(5),
      backgroundColor: "white",
    },
    backButtonText: {
      fontSize: hp(1.8),
      fontWeight: "600",
      color: "#333",
    },
    favoriteButton: {
      padding: 8,
      borderRadius: 50,
      marginRight: wp(5),
      backgroundColor: "white",
    },
    favoriteButtonText: {
      fontSize: hp(2),
      color: "red",
    },
    contentText: {
      fontSize: hp(1.6),
      color: "#4B5563",
    },
    title: {
      fontSize: hp(2.5),
      textAlign: "center",
      marginTop: hp(10),
      color: "#6B7280",
    },
  });