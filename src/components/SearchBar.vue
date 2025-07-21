<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative">
    <svg
      class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="Search restaurants, dishes, or notes..."
      class="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-600"
    />
  </div>
</template>
