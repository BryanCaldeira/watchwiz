import Pagination from '@cherry-soft/react-native-basic-pagination';
import { useTheme } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Searchbar, Text } from 'react-native-paper';
import getSearch from '../api/getSearch.api';
import Card from '../components/Card';
import Loader from '../components/Loader';
import SelectInput from '../components/SelectInput';
import { FILTER_OPTIONS } from '../constants';
import { palette } from '../theme';


const SearchLayout = (props) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.SEARCH.MULTI);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState({});
  const { colors } = useTheme();

  const searchApiCall = useCallback(async () => {
    setLoading(true);
    setData({});

    try {
      const response = await getSearch(filterBy, searchQuery, page);
      setData(response?.data ?? {});
      setPage(response?.data?.page);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [filterBy, searchQuery, page])

  useEffect(() => {searchApiCall()}, [filterBy, page])

  return (
    <View>
      <View style={searchLayoutProps.searchBarContainer.style}>
        <Text style={{margin: 5}} variant="labelSmall">
          Search Movie/TV Show/People <Text style={{ color: 'red' }}>*</Text></Text>
        <Searchbar
          style={searchLayoutProps.searchBar.style}
          placeholder="eg James Bond, CSI"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={searchApiCall}
        />
      </View>
      <Text style={{marginLeft: 15}} variant="labelSmall">
          Choose search type <Text style={{ color: 'red' }}>*</Text></Text>
      <View style={searchLayoutProps.selectInputContainer.style}>
        <View style={{ flex: 0.6 }}>
          <SelectInput
            style={searchLayoutProps.selectInput.style}
            data={Object.values(FILTER_OPTIONS.SEARCH)}
            value={filterBy}
            onSelect={setFilterBy}
            placeHolder="Select Category"
            />
        </View>
        <Button
          buttonColor={colors.secondary}
          style={{ flex: 0.4 }}
          mode="contained" onPress={searchApiCall}>Search</Button>
      </View>

      <ScrollView style={searchLayoutProps.scrollView.style}>
        <View style={{paddingBottom: 300}}>
          <Loader loading={loading}/>
          {
            data.results?.length ?
            (
              <>
                {
                  !loading && data?.results?.map(item => {
                  return (
                    <Card
                      key={item.id}
                      title={item.title ?? item.name}
                      posterPath={item.poster_path ?? item.profile_path}
                      popularity={item.popularity}
                      releaseDate={item.release_date}
                      firstAirDate={item.first_air_date}
                      onButtonPress={() => props.navigation.navigate("Details", {id: item.id, media_type: item.media_type ?? "movie"})} />)
                  })
                }
                {
                  !loading && (
                    <Pagination
                      totalItems={data?.total_pages ?? 0}
                      pageSize={20}
                      currentPage={page}
                      btnStyle={searchLayoutProps.paginationBtn.style}
                      onPageChange={(page) => setPage(page)}
                    />
                  )
                }
              </>
            ) :
            !loading && <Text
              variant="headlineSmall"
              style={searchLayoutProps.initiateSearchText.style}>Please Initiate Search</Text>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default SearchLayout;

const searchLayoutProps = {
  searchBarContainer: {
    style: StyleSheet.create({
      padding: 10,
      marginVertical: 20,
    }),
  },
  searchBar: {
    style: StyleSheet.create({
      borderWidth: 1,
      backgroundColor: 'transparent'
    }),
  },
  selectInput: {
    style: StyleSheet.create({
      marginVertical: 0,
    }),
  },
  selectInputContainer: {
    style: StyleSheet.create({
      padding: 10,
      gap: 10,
      display: 'flex',
      flexDirection: 'row',
    }),
  },
  scrollView: {
    style: StyleSheet.create({
      padding: 10,
    }),
  },
  initiateSearchText: {
    style: StyleSheet.create({
      textAlign: 'center',
      marginTop: 100,
    }),
  },
  paginationBtn: {
    style: StyleSheet.create({
      borderRadius: 10,
      backgroundColor: palette.gray,
    }),
  },
}
