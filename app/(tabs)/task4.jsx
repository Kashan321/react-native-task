import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import 'react-native-gesture-handler'; 

const firstTabData = [
  { id: '1', title: 'First Item 1' },
  { id: '2', title: 'First Item 2' },
  { id: '3', title: 'First Item 3' },
];

const secondTabData = [
  { id: '1', title: 'Second Item 1' },
  { id: '2', title: 'Second Item 2' },
  { id: '3', title: 'Second Item 3' },
];

const FirstRoute = () => (
  <View style={styles.scene}>
    <FlatList
      data={firstTabData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  </View>
);

const SecondRoute = () => (
  <View style={styles.scene}>
    <FlatList
      data={secondTabData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  </View>
);

const MyScrollableTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.initialContent}>Top tab within a scrollable view</Text>

      <View style={styles.tabViewContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          style={styles.tabView}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  initialContent: {
    fontSize: 20,
    marginBottom: 20,
  },
  tabViewContainer: {
    flex: 1,
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  tabView: {
    flex: 1,
    backgroundColor: 'white',
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 4,
  },
  indicator: {
    backgroundColor: '#6200ee',
  },
  label: {
    color: '#6200ee',
    fontWeight: 'bold', 
  },
});

export default MyScrollableTabs;
