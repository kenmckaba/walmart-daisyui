import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { WallmartApp } from './components/WallmartApp'
import './App.css'

function App() {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<WallmartApp />
		</QueryClientProvider>
	)
}

export default App
