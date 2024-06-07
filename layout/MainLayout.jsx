
import { View } from 'react-native';
import { palette } from '../theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailViewLayout from './DetailViewLayout';
import TabLayout from './TabLayout';

const Stack = createNativeStackNavigator();

const MainLayout = (props) => {

  return (
    <View style={{flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabLayout}
          options={{...stackProps.optionsHome}}/>
        <Stack.Screen
          name="Details"
          component={DetailViewLayout}
          options={{...stackProps.optionsDetailView}}/>
      </Stack.Navigator>
    </View>
  );
}

export default MainLayout;

const stackProps = {
  optionsHome: {
    title: "Watch Wiz",
    headerStyle: {
      backgroundColor: palette.gray,
    },
    headerTintColor: palette.white,
  },
  optionsDetailView: {
    headerBackTitle: "Home",
    headerStyle: {
      backgroundColor: palette.white,
    },
    headerTintColor: palette.gray,
    headerBackTitleStyle: {
      backgroundColor: palette.blue
    },
    headerTintColor: {}
  }
}
