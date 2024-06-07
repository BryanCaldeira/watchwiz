import { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { PICTURE_BASE_URI } from "../api/constants";
import getMovies from "../api/getMovies.api";
import getTVShows from "../api/getTVShows.api";
import { palette } from "../theme";
import getPersons from "../api/getPersons.api";
import Loader from "../components/Loader";



const DetailViewLayout = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const id = route.params?.id;
  const type = route.params?.media_type;
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    setData({});

    (async () => {
      try {
        let response;
        if (type === "movie") {
          response = await getMovies(id);
        } else if (type === "tv") {
          response = await getTVShows(id);
        } else if (type === "person") {
          response = await getPersons(id);
        }

        setData(response?.data ?? {})
        navigation.setOptions({ title: response?.data[type === "movie" ? "original_title" : "name"] })
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    })()
  }, [id])

  return (
    <View>
      <StatusBar backgroundColor={palette.white} barStyle="dark-content" />
      <ScrollView style={detailViewLayoutProps.scrollView.style}>
        {
          loading ? <Loader loading={loading}/> : (
            <View style={detailViewLayoutProps.container.style}>
              <Text style={detailViewLayoutProps.header.style} variant="displaySmall">{ data[type === "movie" ? "original_title" : "name"] }</Text>
              <View style={{ height: 300, width: "100%" }}>
                <Image
                  style={detailViewLayoutProps.poster.style}
                  resizeMode="cover" width={"100%"} height={300}
                  alt="Image"
                  source={{ uri: `${PICTURE_BASE_URI}/w400/${data?.poster_path ?? data?.profile_path}` }} />
              </View>
              <Text style={detailViewLayoutProps.overview.style}>{ data?.overview ?? data.biography }</Text>
              {type !== "person" ? <Text variant="labelSmall">Popularity: { data?.popularity } | { type === "movie" ? `Release Date: ${data?.release_date}`: `First Air Date: ${data?.first_air_date}` }</Text>: null}
            </View>
          )
        }
      </ScrollView>
    </View>
  )
}

export default DetailViewLayout;

const detailViewLayoutProps = {
  scrollView: {
    style: StyleSheet.create({
      display: 'flex',
      padding: 30,
    }),
  },
  container: {
    style: StyleSheet.create({
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 200,
    }),
  },
  header: {
    style: StyleSheet.create({
      textAlign: 'center'
    }),
  },
  poster: {
    style: StyleSheet.create({
      borderWidth: 2,
      borderRadius: 10,
      borderColor: palette.gray,
    }),
  },
  overview: {
    style: StyleSheet.create({
      marginVertical: 20,
    }),
  },
}
