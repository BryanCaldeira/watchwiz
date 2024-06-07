import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { palette } from '../theme';


const Loader = (props) => {
  const { size, loading } = props;

  if (!loading) {
    return;
  }

  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <ActivityIndicator
        size={size ?? 'large'}
        animating={true}
        color={palette.gray} />
    </View>
  )
}

export default Loader;
