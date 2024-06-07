import Pagination from '@cherry-soft/react-native-basic-pagination';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import getMovies from '../api/getMovies.api';
import Card from '../components/Card';
import Loader from '../components/Loader';
import SelectInput from '../components/SelectInput';
import { FILTER_OPTIONS } from '../constants';
import { palette } from '../theme';


const MoviesLayout = (props) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.MOVIES.POPULAR);
  const [data, setData] = useState({});

  const getMoviesApiCall = useCallback(async () => {
    setLoading(true);
    setData({});

    try {
      const response = await getMovies(filterBy, page);
      setData(response?.data ?? {});
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [filterBy, page])

  useEffect(() => {
    getMoviesApiCall();
  }, [filterBy, page])

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
            !loading && data.results?.map(item => {
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
          {
            !loading && <Pagination
              totalItems={data?.total_pages ?? 0}
              pageSize={20}
              currentPage={page}
              btnStyle={moviesLayoutProps.paginationBtn.style}
              onPageChange={(page) => setPage(page)}
            />
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
  paginationBtn: {
    style: StyleSheet.create({
      borderRadius: 10,
      backgroundColor: palette.gray,
    }),
  },
}
