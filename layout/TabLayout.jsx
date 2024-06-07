import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MoviesLayout from './MoviesLayout';
import SearchLayout from './SearchLayout';
import { StatusBar, StyleSheet, View } from 'react-native';
import { palette } from '../theme';
import TVShowsLayout from './TVShowsLayout';
import { Button } from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const TabLayout = () => (
  <View {...tabProps.viewContainer}>
    <StatusBar backgroundColor={palette.gray} barStyle="light-content" />
    <Tab.Navigator {...tabProps.navigator}>
      <Tab.Screen name="Movies" component={MoviesLayout} />
      <Tab.Screen name="Search Results" component={SearchLayout} />
      <Tab.Screen name="TV Shows" component={TVShowsLayout} />
    </Tab.Navigator>
  </View>
);

export default TabLayout;

const tabProps = {
  viewContainer: {
    style: StyleSheet.create({
      flex: 1,
    }),
  },
  navigator: {
    screenOptions: {
      containerStyle:{backgroundColor: 'red'},
      tabBarLabelStyle: {
        color: palette.gray,
        textTransform: 'none',
        fontSize: 12
      },
      tabBarIndicatorStyle: {
        backgroundColor: palette.gray
      },
    },
  },
}
