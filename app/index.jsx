import {SafeAreaView, Text,} from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import styles from './styles'
import {useState} from "react";

export default function Index() {
  const [selected, setSelected] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
      />
    </SafeAreaView>
  );
}
