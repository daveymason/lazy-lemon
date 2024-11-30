import { View, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState, useRef } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { menuItems } from '@/constants/menu';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';

const categories = ['all', 'classic', 'modern'];

export default function HomeScreen() {
  const { addToCart } = useCart();
  const params = useLocalSearchParams();
  const userInfo = params.userInfo ? JSON.parse(params.userInfo as string) : null;
  const [addMessage, setAddMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const inputRef = useRef<TextInput>(null);

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.en.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuantityChange = (itemId: string, change: number) => {
    console.log('Attempting to add item:', itemId);
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
      console.log('Found item:', item);
      addToCart(itemId);
      setAddMessage(`Added ${item.name.en} to cart!`);
      setTimeout(() => setAddMessage(''), 2000);
    }
  };

  const Header = () => (
    <ThemedView style={styles.headerSection}>
      <ThemedText style={styles.logo}>Little Lemon 🍋</ThemedText>
    </ThemedView>
  );

  const Hero = () => (
    <ThemedView style={styles.heroSection}>
      <ThemedText style={styles.welcome}>
        Welcome, {userInfo?.name || 'Guest'}!
      </ThemedText>
    </ThemedView>
  );

  const MenuBreakdown = () => (
    <ThemedView style={styles.menuBreakdownSection}>
      <ThemedText style={styles.sectionSubtitle}>
        Lazy Lemon offers a wide variety of authentic bubble tea drinks
      </ThemedText>
      <TextInput 
        ref={inputRef}
        placeholder="Search for a drink"
        style={styles.searchInput}
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
      />
    </ThemedView>
  );

  const MenuList = () => (
    <FlatList
      data={filteredMenuItems}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.menuItem}>
          <ThemedView style={styles.menuItemContent}>
            <View>
              <ThemedText style={styles.itemName}>{item.name.en}</ThemedText>
              <ThemedText style={styles.itemNameCn}>{item.name.zh}</ThemedText>
              <ThemedText style={styles.description}>{item.description.en}</ThemedText>
            </View>
            <View style={styles.priceContainer}>
              <ThemedText style={styles.price}>€{item.price.toFixed(2)}</ThemedText>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleQuantityChange(item.id, 1)}
              >
                <Ionicons name="add-circle" size={24} color="#32CD32" />
              </TouchableOpacity>
            </View>
          </ThemedView>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.menuList}
    />
  );

  const CategoryButtons = () => (
    <View style={styles.categoryContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              category === selectedCategory && styles.selectedCategory
            ]}
          >
            <ThemedText style={[
              styles.categoryText,
              category === selectedCategory && styles.selectedCategoryText
            ]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <Header />
      <Hero />
      <MenuBreakdown />
      <CategoryButtons />
      <MenuList />
      {addMessage ? (
        <ThemedText style={styles.addMessage}>{addMessage}</ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  // Header Section
  headerSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  // Hero Section
  heroSection: {
    marginVertical: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  // Menu Breakdown Section
  menuBreakdownSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  // Menu List Section
  menuList: {
    gap: 16,
  },
  menuItem: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItemContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemNameCn: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    padding: 4,
  },
  addMessage: {
    textAlign: 'center',
    padding: 8,
    fontSize: 16,
    color: '#32CD32',
    fontWeight: '500',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryContainer: {
    marginTop: 16,
    marginBottom: 24,
    height: 45,
  },
  categoryScrollContent: {
    height: '100%',
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#ffffff20',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#32CD32',
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: '500',
  }
});
