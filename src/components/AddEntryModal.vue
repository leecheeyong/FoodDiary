<script setup>
import { ref, defineEmits } from 'vue'
import { useImgur } from '../composables/useImgur'

const emit = defineEmits(['close', 'add-entry'])

const { uploadImage } = useImgur()

const form = ref({
  restaurant: '',
  dishName: '',
  cuisine: '',
  location: '',
  rating: 5,
  price: '',
  notes: '',
  image: null,
  imageUrl: ''
})

const uploading = ref(false)
const imageInput = ref(null)

const handleImageSelect = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  uploading.value = true
  const result = await uploadImage(file)
  
  if (result.success) {
    form.value.imageUrl = result.url
    form.value.image = file
  } else {
    alert('Failed to upload image. Please try again.')
  }
  
  uploading.value = false
}

const submitEntry = () => {
  if (!form.value.restaurant || !form.value.dishName) {
    alert('Please fill in restaurant and dish name')
    return
  }
  
  const entryData = {
    restaurant: form.value.restaurant,
    dishName: form.value.dishName,
    cuisine: form.value.cuisine,
    location: form.value.location,
    rating: form.value.rating,
    price: form.value.price,
    notes: form.value.notes,
    imageUrl: form.value.imageUrl,
    createdAt: new Date().toISOString()
  }
  
  emit('add-entry', entryData)
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">New Food Memory</h2>
          <button 
            @click="$emit('close')"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-800"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <form @submit.prevent="submitEntry" class="p-6 space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Photo</label>
          <div 
            class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-sage-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
            @click="imageInput?.click()"
          >
            <div v-if="uploading" class="flex items-center justify-center">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500"></div>
              <span class="ml-2 text-gray-600">Uploading...</span>
            </div>
            <div v-else-if="form.imageUrl" class="space-y-4">
              <img :src="form.imageUrl" alt="Uploaded food" class="mx-auto max-h-48 rounded-lg">
              <p class="text-sm text-gray-600">Click to change photo</p>
            </div>
            <div v-else class="space-y-4">
              <svg class="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="text-lg font-medium text-gray-900">Add a photo</p>
                <p class="text-sm text-gray-600">Capture your delicious moment</p>
              </div>
            </div>
          </div>
          <input 
            ref="imageInput"
            type="file" 
            accept="image/*" 
            @change="handleImageSelect"
            class="hidden"
          >
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Restaurant *</label>
            <input 
              v-model="form.restaurant"
              type="text" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              placeholder="Where did you dine?"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Dish Name *</label>
            <input 
              v-model="form.dishName"
              type="text" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              placeholder="What did you order?"
            >
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
            <input 
              v-model="form.cuisine"
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              placeholder="Italian, Japanese, etc."
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                v-model="form.location"
                type="text" 
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                placeholder="City, neighborhood"
              >
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div class="flex items-center space-x-2">
              <span v-for="n in 5" :key="n" 
                @click="form.rating = n"
                class="cursor-pointer text-2xl transition-colors"
                :class="n <= form.rating ? 'text-yellow-500' : 'text-gray-400'"
              >
                ⭐
              </span>
              <span class="ml-2 text-sm text-gray-700">({{ form.rating }}/5)</span>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input 
              v-model="form.price"
              type="text" 
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
              placeholder="$25, $$, etc."
            >
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea 
            v-model="form.notes"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all resize-none"
            placeholder="How was the taste? Atmosphere? Would you recommend it? Share your thoughts..."
          ></textarea>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button 
            type="button"
            @click="$emit('close')"
            class="px-6 py-3 border border-gray-300 text-gray-900 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-6 py-3 bg-sage-600 text-gray-900 rounded-xl hover:bg-sage-700 transition-colors font-medium shadow-sm"
          >
            Save Memory
          </button>
        </div>
      </form>
    </div>
  </div>
</template>