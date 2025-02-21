import { StyleSheet, Dimensions, TextStyle } from 'react-native'
import {Colors} from "@/constants/Colors";
import { DayState } from 'react-native-calendars/src/types'

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  container: {
    padding: 20,
    flex: 1,
  },
  calendarCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  calendarTheme: {
    todayTextColor: Colors.darkGray,
    indicatorColor: Colors.black,
    textSectionTitleColor: Colors.black,
    dayTextColor: Colors.darkGray,

    textDayFontWeight: '700',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: 'bold',

    textMonthFontSize: 18,
    todayButtonFontSize: 18,
    textDayHeaderFontSize: 14,

    arrowColor: Colors.black,

    todayBackgroundColor: Colors.lightGray,
  },
  savedDay: {
    container:  {
      backgroundColor: Colors.yellowLight,
    },
    text: {
      color: Colors.yellow,
      fontWeight: 'bold'
    }
  },
  markedDay: {
    container:  {
      backgroundColor: Colors.yellow,
    },
    text: {
      color: Colors.white,
      fontWeight: 'bold'
    }
  },



  inputTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  inputCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  deleteButton: {
    alignSelf: 'center',
    padding: 10,
  },

  button: {
    backgroundColor: Colors.yellow,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
  },
  buttonTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
});
