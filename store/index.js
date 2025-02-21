import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['main'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
	reducer: persistedReducer,
	// No need to explicitly add thunk, it's part of the default middleware
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false, // Disable serializable checks for Redux Persist compatibility
	}),
})

export const persistor = persistStore(store)
