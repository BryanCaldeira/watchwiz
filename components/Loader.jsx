import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';


const Loader = (props) => {
  const { colors } = useTheme();
  const { size, loading } = props;

  if (!loading) {
    return;
  }

  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <ActivityIndicator
        size={size ?? 'large'}
        animating={true}
        color={colors.gray} />
    </View>
  )
}

export default Loader;
