import { generateMockTransactions } from '../utils/mockData'

const data = generateMockTransactions(30_000)
self.postMessage(data)
