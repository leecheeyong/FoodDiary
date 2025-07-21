<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["add-entry"]);
</script>

<template>
  <div class="text-center py-16">
    <div
      class="mx-auto w-32 h-32 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full flex items-center justify-center mb-6"
    >
      <span class="text-5xl">📝</span>
    </div>

    <h3 class="text-2xl font-bold text-gray-900 mb-3">
      Start Your Food Journey
    </h3>
    <p class="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
      Begin sharing your culinary adventures. Add your first restaurant
      experience and create lasting food memories.
    </p>

    <button
      @click="$emit('add-entry')"
      class="inline-flex items-center px-6 py-3 font-medium rounded-xl hover:bg-sage-700 transition-colors shadow-sm"
    >
      ✨ Add Your First Memory
    </button>
  </div>
</template>
