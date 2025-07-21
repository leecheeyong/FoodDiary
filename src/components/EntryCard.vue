<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  entry: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'edit'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const getRatingStars = (rating) => {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
    <div class="aspect-w-16 aspect-h-9 bg-gray-100">
      <img 
        v-if="entry.imageUrl" 
        :src="entry.imageUrl" 
        :alt="entry.dishName"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      >
      <div v-else class="w-full h-48 bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
        <span class="text-6xl">🍽️</span>
      </div>
    </div>
    
    <div class="p-6">
      <div class="flex justify-between items-start mb-3">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-900 mb-1">{{ entry.dishName }}</h3>
          <p class="text-sage-600 font-medium">{{ entry.restaurant }}</p>
        </div>
        <div class="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            @click="$emit('edit', entry)"
            class="p-2 text-gray-500 hover:text-sage-700 hover:bg-sage-50 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            @click="$emit('delete', entry.id)"
            class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div class="space-y-2 mb-4">
        <div v-if="entry.cuisine" class="inline-block bg-sage-100 text-sage-800 text-xs px-2 py-1 rounded-full">
          {{ entry.cuisine }}
        </div>
        
        <div v-if="entry.location" class="flex items-center text-sm text-gray-600">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ entry.location }}
        </div>
        
        <div class="flex items-center justify-between">
          <div class="text-sm">
            <span class="text-lg">{{ getRatingStars(entry.rating) }}</span>
          </div>
          <div v-if="entry.price" class="text-sm font-medium text-terracotta-700">
            {{ entry.price }}
          </div>
        </div>
      </div>
      <div v-if="entry.notes" class="mb-4">
        <p class="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {{ entry.notes }}
        </p>
      </div>
      <div class="text-xs text-gray-500 border-t border-gray-100 pt-3">
        {{ formatDate(entry.createdAt) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>