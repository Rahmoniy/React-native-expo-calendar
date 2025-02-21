import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import styles from './styles'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { main } from '../store/slices'
import { Picker } from '@react-native-picker/picker'

export default function Index () {
	const [showPicker, setShowPicker] = useState(false)
	const [eventData, setEventData] = useState({
		eventName: '',
		eventStarts: { date: '', time: '08:00' },
		eventEnds: { date: '', time: '09:00' },
		repeat: '',
	})

	const dispatch = useDispatch()
	const { events = [] } = useSelector(state => state.main) || {}
	const { setEvents } = main.actions
	const existingEvent = useMemo(() =>
			events.find(v => v.eventStarts.date === eventData.eventStarts.date),
		[events, eventData.eventStarts.date],
	)

	const handleDayPress = (day) => {
		const selectedDate = day.dateString
		const myExistingEvent = events.find(v => v.eventStarts.date === selectedDate)

		setEventData({
			eventName: myExistingEvent ? myExistingEvent.eventName : '',
			eventStarts: myExistingEvent ? myExistingEvent.eventStarts : {
				date: selectedDate,
				time: '08:00',
			},
			eventEnds: myExistingEvent ? myExistingEvent.eventEnds : {
				date: selectedDate,
				time: '09:00',
			},
		})
	}

	const handleOnDelete = () => {
		const updatedData = events.filter(v => v.eventStarts.date !== eventData.eventStarts.date)
		dispatch(setEvents(updatedData))

		setEventData({
			eventName: '',
			eventStarts: { date: '', time: '08:00' },
			eventEnds: { date: '', time: '09:00' },
		})
	}
	const handleOnSave = () => {
		try {
			let newEvents = [...events]

			if (existingEvent) {
				newEvents = newEvents.map(v =>
					v.eventStarts.date === eventData.eventStarts.date
						? { ...v, ...eventData }
						: v,
				)
			} else {
				newEvents.push(eventData)
			}

			if (eventData.repeat) {
				let repeatDates = []
				let currentDate = new Date(eventData.eventStarts.date)

				for (let i = 1; i <= 5; i++) { // 5 marta takrorlash
					if (eventData.repeat === 'weekly') {
						currentDate.setDate(currentDate.getDate() + 7)
					} else if (eventData.repeat === 'bi-weekly') {
						currentDate.setDate(currentDate.getDate() + 14)
					} else if (eventData.repeat === 'monthly') {
						currentDate.setMonth(currentDate.getMonth() + 1)
					}

					repeatDates.push({
						...eventData,
						eventStarts: {
							...eventData.eventStarts,
							date: currentDate.toISOString().split('T')[0],
						},
						eventEnds: {
							...eventData.eventEnds,
							date: currentDate.toISOString().split('T')[0],
						},
					})
				}

				newEvents.push(...repeatDates)
			}

			dispatch(setEvents(newEvents))
			setEventData({
				eventName: '',
				eventStarts: { date: '', time: '08:00' },
				eventEnds: { date: '', time: '09:00' },
				repeat: '',
			})

		} catch (err) {
			alert(err)
		}
	}

	return (
		<SafeAreaView style={styles.mainContainer}>
			<View style={styles.container}>
				<Calendar
					style={styles.calendarCard}
					theme={styles.calendarTheme}
					markingType={'custom'}
					hideExtraDays={true}
					onDayPress={handleDayPress}
					markedDates={{
						...events.reduce((acc, event) => {
							const date = event.eventStarts.date
							acc[date] = { customStyles: styles.savedDay }
							return acc
						}, {}),
						[eventData.eventStarts.date]: { customStyles: styles.markedDay },
					}}

				/>
				{
					eventData.eventStarts.date && (
						<>
							<Text style={{ ...styles.inputTitle, paddingTop: 30 }}>Event Name</Text>
							<TextInput
								style={styles.inputCard}
								placeholder={'Event name'}
								value={eventData.eventName}
								onChangeText={(text) => setEventData(prev => ({
									...prev,
									eventName: text,
								}))}
							/>

							<View style={{ ...styles.row, marginTop: 30 }}>
								<Text style={styles.inputTitle}>Starts</Text>
								<View style={styles.row}>
									<View style={{ ...styles.inputCard, marginRight: 10 }}>
										<Text>
											{eventData.eventStarts.date}
										</Text>
									</View>
									<TextInput
										style={{ ...styles.inputCard, width: 120 }}
										placeholder="HH:MM"
										value={eventData.eventStarts.time}
										onChangeText={(text) =>
											setEventData(prev => ({
												...prev,
												eventStarts: { ...prev.eventStarts, time: text },
											}))
										}
									/>

								</View>
							</View>

							<View style={{ ...styles.row, marginTop: 10 }}>
								<Text style={styles.inputTitle}>Ends</Text>
								<View style={styles.row}>
									<View style={{ ...styles.inputCard, marginRight: 10 }}>
										<Text>
											{eventData.eventEnds.date}
										</Text>
									</View>
									<TextInput
										style={{ ...styles.inputCard, width: 120 }}
										placeholder="HH:MM"
										value={eventData.eventEnds.time}
										onChangeText={(text) =>
											setEventData(prev => ({
												...prev,
												eventEnds: { ...prev.eventEnds, time: text },
											}))
										}
									/>
								</View>
							</View>

							{
								existingEvent && (
									<TouchableOpacity style={styles.deleteButton} onPress={handleOnDelete}>
										<Text style={styles.inputTitle}>Delete</Text>
									</TouchableOpacity>
								)
							}

							{showPicker && (
								<Picker
									selectedValue={eventData.repeat}
									onValueChange={(itemValue) => {
										setEventData(prev => ({ ...prev, repeat: itemValue }))
										setShowPicker(false)
									}}
								>
									<Picker.Item label="No Repeat" value=""/>
									<Picker.Item label="Weekly" value="weekly"/>
									<Picker.Item label="Bi-Weekly" value="bi-weekly"/>
									<Picker.Item label="Monthly" value="monthly"/>
								</Picker>
							)}
							<Text style={styles.inputTitle}>Repeat</Text>
							<TouchableOpacity
								style={styles.inputCard}
								onPress={() => setShowPicker(prevState => !prevState)} // Modalni ochish
							>
								<Text>{eventData.repeat ? eventData.repeat : 'Select Repeat'}</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.button} onPress={handleOnSave}>
								<Text style={styles.buttonTitle}>SAVE</Text>
							</TouchableOpacity>
						</>
					)
				}
			</View>
		</SafeAreaView>
	)
}
