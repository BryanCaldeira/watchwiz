import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import getTVShows from '../api/getTVShows.api';
import Card from '../components/Card';
import SelectInput from '../components/SelectInput';
import { FILTER_OPTIONS } from '../constants';
import Loader from '../components/Loader';


const TVShowsLayout = (props) => {
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.TVSHOWS.POPULAR);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setData([]);
    (async () => {
      try {
        const response = await getTVShows(filterBy);
        setData(response?.data?.results ?? [])
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    })()
  }, [filterBy])

  return (
    <View>
      <View style={tvShowsLayoutProps.selectInputContainer.style}>
      <SelectInput
          data={Object.values(FILTER_OPTIONS.TVSHOWS)}
          value={filterBy}
          onSelect={setFilterBy}
          placeHolder="Select Category"
          />
      </View>
      <ScrollView style={tvShowsLayoutProps.scrollView.style}>
        <View style={{paddingBottom: 200}}>
          <Loader loading={loading}/>
          {
            !loading && data.map(item => {
              return (
                <Card
                  key={item.id}
                  title={item.name}
                  mediaType={item.media_type}
                  posterPath={item.poster_path}
                  popularity={item.popularity}
                  firstAirDate={item.first_air_date}
                  onButtonPress={() => props.navigation.navigate("Details", {id: item.id, media_type: "tv"})} />)
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default TVShowsLayout;

const tvShowsLayoutProps = {
  scrollView: {
    style: StyleSheet.create({
      padding: 10
    }),
  },
  selectInputContainer: {
    style: StyleSheet.create({
      margin: 10
    }),
  }
}
