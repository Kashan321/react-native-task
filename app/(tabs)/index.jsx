import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const PaginatedFlatList = () => {
  const [data, setData] = useState([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 

  
  const fetchData = useCallback(async () => {
    if (!hasMore) return; 
    setLoading(true); 
    try {
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const result = await response.json();

      setData(prevData => [...prevData, ...result]);
      setHasMore(result.length > 0); 
      setPage(prevPage => prevPage + 1); 
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

 
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Header</Text>
    </View>
  );

  
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!loading) {
      fetchData();
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
      ListHeaderComponent={renderHeader} 
      ListHeaderComponentStyle={{ position: 'sticky', top: 0 }}
      ListFooterComponent={renderFooter} 
      onEndReached={handleLoadMore} 
      onEndReachedThreshold={0.5} 
    />
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#2222',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaginatedFlatList;
