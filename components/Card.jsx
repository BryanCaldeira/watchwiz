import { Button, Text } from 'react-native-paper';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';
import { PICTURE_BASE_URI } from '../api/constants';
import { useTheme } from '@react-navigation/native';
import { palette } from '../theme';


const Card = (props) => {
  const {
    title,
    mediaType,
    posterPath,
    popularity,
    releaseDate,
    firstAirDate,
    onButtonPress
  } = props;

  const { colors } = useTheme();

  return (
    <>
      <View style={cardProps.card.style}>
        <View style={cardProps.imageContainer.style}>
          <Image
            alt="Image"
            style={cardProps.poster.style}
            height="100%"
            source={{ uri: `${PICTURE_BASE_URI}/w200/${posterPath}` }} />
        </View>
        <View style={cardProps.contentContainer.style}>
          <Text variant="titleMedium">{ title }</Text>
          <Text variant="bodyMedium">Popularity: { popularity }</Text>
          {releaseDate ? <Text variant="bodyMedium">Release Date: { releaseDate }</Text>: null}
          {firstAirDate ? <Text variant="bodyMedium">First Air Date: { firstAirDate }</Text>: null}
          <Button
            textColor={colors.primary}
            mode="outlined"
            onPress={onButtonPress}>More Details</Button>
        </View>
      </View>
    </>
  )
}

export default Card;


const cardProps = {
  card: {
    style: StyleSheet.create({
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }),
  },
  imageContainer: {
    style: StyleSheet.create({
      flex: 0.3,
      height: 150,
    }),
  },
  poster: {
    style: StyleSheet.create({
      borderRadius: 5,
      borderWidth: 1,
      borderColor: palette.gray,
    }),
  },
  contentContainer: {
    style: StyleSheet.create({
      paddingLeft: 10,
      flex: 0.7,
      display: 'flex',
      justifyContent: 'space-between',
    }),
  },
}
