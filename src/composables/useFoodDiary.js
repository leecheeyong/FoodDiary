import { ref, computed } from 'vue'
import { db } from '../firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where
} from 'firebase/firestore'

export function useFoodDiary() {
  const entries = ref([])
  const loading = ref(false)
  const searchQuery = ref('')
  
  const filteredEntries = computed(() => {
    if (!searchQuery.value) return entries.value
    
    const query = searchQuery.value.toLowerCase()
    return entries.value.filter(entry => 
      entry.restaurant.toLowerCase().includes(query) ||
      entry.dishName.toLowerCase().includes(query) ||
      entry.notes.toLowerCase().includes(query)
    )
  })
  
  const addEntry = async (entryData) => {
    loading.value = true
    try {
      const docRef = await addDoc(collection(db, 'foodEntries'), {
        ...entryData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      const newEntry = { id: docRef.id, ...entryData }
      entries.value.unshift(newEntry)
      return { success: true, entry: newEntry }
    } catch (error) {
      console.error('Error adding entry:', error)
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }
  
  const fetchEntries = async () => {
    loading.value = true
    try {
      const q = query(collection(db, 'foodEntries'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      entries.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching entries:', error)
    } finally {
      loading.value = false
    }
  }
  
  const updateEntry = async (id, updates) => {
    try {
      const entryRef = doc(db, 'foodEntries', id)
      await updateDoc(entryRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      })
      
      const index = entries.value.findIndex(entry => entry.id === id)
      if (index !== -1) {
        entries.value[index] = { ...entries.value[index], ...updates }
      }
      
      return { success: true }
    } catch (error) {
      console.error('Error updating entry:', error)
      return { success: false, error: error.message }
    }
  }
  
  const deleteEntry = async (id) => {
    try {
      await deleteDoc(doc(db, 'foodEntries', id))
      entries.value = entries.value.filter(entry => entry.id !== id)
      return { success: true }
    } catch (error) {
      console.error('Error deleting entry:', error)
      return { success: false, error: error.message }
    }
  }
  
  return {
    entries,
    filteredEntries,
    loading,
    searchQuery,
    addEntry,
    fetchEntries,
    updateEntry,
    deleteEntry
  }
}