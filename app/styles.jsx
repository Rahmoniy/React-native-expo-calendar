import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from "@/constants/Colors";

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey,
  },
});
