<script setup>
import { ref, onMounted } from 'vue'
import AddEntryModal from './components/AddEntryModal.vue'
import EntryCard from './components/EntryCard.vue'
import SearchBar from './components/SearchBar.vue'
import EmptyState from './components/EmptyState.vue'
import EditEntryModal from './components/EditEntryModal.vue'
import { useFoodDiary } from './composables/useFoodDiary.js'

const { 
  entries, 
  filteredEntries, 
  loading, 
  searchQuery,
  addEntry, 
  fetchEntries, 
  deleteEntry,
  updateEntry
} = useFoodDiary()

const showAddModal = ref(false)
const showEditModal = ref(false)
const editingEntry = ref(null)

onMounted(() => {
  fetchEntries()
})

const handleAddEntry = async (entryData) => {
  const result = await addEntry(entryData)
  if (result.success) {
    showAddModal.value = false
  } else {
    alert('Failed to add entry. Please try again.')
  }
}

const handleDeleteEntry = async (id) => {
  if (confirm('Are you sure you want to delete this food memory?')) {
    const result = await deleteEntry(id)
    if (!result.success) {
      alert('Failed to delete entry. Please try again.')
    }
  }
}

const handleEditEntry = (entry) => {
  editingEntry.value = { ...entry }
  showEditModal.value = true
}

const handleUpdateEntry = async (updatedData) => {
  const result = await updateEntry(editingEntry.value.id, updatedData)
  if (result.success) {
    showEditModal.value = false
    editingEntry.value = null
  } else {
    alert('Failed to update entry. Please try again.')
  }
}

const handleCloseEditModal = () => {
  showEditModal.value = false
  editingEntry.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Food Diary</h1>
            <p class="text-gray-600 mt-1">Your personal culinary journey</p>
          </div>
          
          <button 
            @click="showAddModal = true"
            class="inline-flex items-center px-4 py-2 bg-sage-600 text-gray-900 font-medium rounded-xl hover:bg-sage-700 transition-colors shadow-sm"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Memory
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="entries.length > 0" class="mb-8">
        <SearchBar v-model="searchQuery" />
      </div>
      
      <div v-if="loading" class="flex justify-center items-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500"></div>
        <span class="ml-4 text-gray-600">Loading your food memories...</span>
      </div>
      
      <EmptyState 
        v-else-if="entries.length === 0" 
        @add-entry="showAddModal = true" 
      />
      
      <div v-else-if="filteredEntries.length === 0" class="text-center py-16">
        <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span class="text-3xl">🔍</span>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
        <p class="text-gray-600">Try adjusting your search terms</p>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EntryCard 
          v-for="entry in filteredEntries" 
          :key="entry.id"
          :entry="entry"
          @delete="handleDeleteEntry"
          @edit="handleEditEntry"
        />
      </div>
    </main>
    
    <button 
      @click="showAddModal = true"
      class="fixed bottom-6 right-6 w-14 h-14 bg-terracotta-600 text-gray-800 rounded-full shadow-lg hover:bg-terracotta-700 transition-all transform hover:scale-105 md:hidden flex items-center justify-center"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>

    <AddEntryModal 
      v-if="showAddModal"
      @close="showAddModal = false"
      @add-entry="handleAddEntry"
    />

    <EditEntryModal 
      v-if="showEditModal"
      :entry="editingEntry"
      @update-entry="handleUpdateEntry"
      @close="handleCloseEditModal"
    />
  </div>
</template>