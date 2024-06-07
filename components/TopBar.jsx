import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { palette } from '../theme';

const TopBar = () => {
  return (
    <Appbar.Header  {...topbarProps.header}>
      <Appbar.Content title="Film Facts" />
    </Appbar.Header>
  )
};

export default TopBar;


const topbarProps = {
  header: {
    dark: true,
    mode: 'center-aligned',
    style: StyleSheet.create({
      backgroundColor: palette.gray,
    }),
  }
}
