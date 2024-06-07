import { Button, Searchbar, Text } from 'react-native-paper';
import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import SelectInput from '../components/SelectInput';
import Card from '../components/Card';
import { FILTER_OPTIONS } from '../constants';
import getSearch from '../api/getSearch.api';
import Loader from '../components/Loader';
import { useTheme } from '@react-navigation/native';


const SearchLayout = (props) => {
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.SEARCH.MULTI);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const { colors } = useTheme();

  const search = async () => {
    setLoading(true);
    setData([]);
    try {
      const response = await getSearch(filterBy, searchQuery);
      setData(response?.data?.results ?? [])
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }

  return (
    <View>
      <View style={searchLayoutProps.searchBarContainer.style}>
        <Text style={{margin: 5}} variant="labelSmall">
          Search Movie/TV Show/People <Text style={{ color: 'red' }}>*</Text></Text>
        <Searchbar
          style={searchLayoutProps.searchBar.style}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
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
          mode="contained" onPress={search}>Search</Button>
      </View>

      <ScrollView style={searchLayoutProps.scrollView.style}>
        <View style={{paddingBottom: 200}}>
          <Loader loading={loading}/>
          {
            data.length ?
            (
              !loading && data.map(item => {
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
}
