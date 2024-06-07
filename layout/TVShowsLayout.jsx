import Pagination from '@cherry-soft/react-native-basic-pagination';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import getTVShows from '../api/getTVShows.api';
import Card from '../components/Card';
import Loader from '../components/Loader';
import SelectInput from '../components/SelectInput';
import { FILTER_OPTIONS } from '../constants';
import { palette } from '../theme';


const TVShowsLayout = (props) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.TVSHOWS.POPULAR);
  const [data, setData] = useState({});

  const getTVShowsApiCall = useCallback(async () => {
    setLoading(true);
    setData({});

    try {
      const response = await getTVShows(filterBy, page);
      setData(response?.data ?? {});
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [filterBy, page])

  useEffect(() => {
    getTVShowsApiCall()
  }, [filterBy, page])

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
            <>
              {
                !loading && data?.results?.map(item => {
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
              {
                !loading && <Pagination
                  totalItems={data?.total_pages ?? 0}
                  pageSize={20}
                  currentPage={page}
                  btnStyle={tvShowsLayoutProps.paginationBtn.style}
                  onPageChange={(page) => setPage(page)}
                />
              }
            </>
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
  },
  paginationBtn: {
    style: StyleSheet.create({
      borderRadius: 10,
      backgroundColor: palette.gray,
    }),
  },
}
