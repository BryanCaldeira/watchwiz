import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import getMovies from '../api/getMovies.api';
import Card from '../components/Card';
import SelectInput from '../components/SelectInput';
import { FILTER_OPTIONS } from '../constants';
import Loader from '../components/Loader';


const MoviesLayout = (props) => {
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.MOVIES.POPULAR);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setData([]);
    (async () => {
      try {
        const response = await getMovies(filterBy);
        setData(response?.data?.results ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    })()
  }, [filterBy])

  return (
    <View>
      <View style={moviesLayoutProps.selectInputContainer.style}>
        <SelectInput
          data={Object.values(FILTER_OPTIONS.MOVIES)}
          value={filterBy}
          onSelect={setFilterBy}
          placeHolder="Select Category"
          />
      </View>
      <ScrollView style={moviesLayoutProps.scrollView.style}>
        <Loader loading={loading} />
        <View style={{paddingBottom: 200}}>
          {
            !loading && data.map(item => {
              return (
                <Card
                  key={item.id}
                  title={item.original_title}
                  mediaType={item.media_type}
                  posterPath={item.poster_path}
                  popularity={item.popularity}
                  releaseDate={item.release_date}
                  onButtonPress={() => props.navigation.navigate("Details", {id: item.id, media_type: "movie"})} />)
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default MoviesLayout;

const moviesLayoutProps = {
  scrollView: {
    style: StyleSheet.create({
      padding: 10,
    }),
  },
  selectInputContainer: {
    style: StyleSheet.create({
      margin: 10,
    }),
  },
}
