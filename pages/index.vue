<script setup lang="ts">
import type { RecipeResponce } from '~/types/types';
const { data, error } = await useFetch<RecipeResponce>('https://dummyjson.com/recipes?limit=12')


</script>

<template>
    <main>
    <section class="bg-[#f1f1f1] m-0">
      <div class="main_container container m-0 flex flex-col lg:flex-row items-center py-20 gap-10 justify-center">
        <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
          <h1 class="text-4xl lg:text-6xl font-extrabold mb-6 text-balance">
            Master the Kitchen with Ease: Unleash Your Inner Chef Today!
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-balance">
            Discover recipes helping you to find the easiest way to cook.
          </p>
          <button
            class="px-4 py-2 text-white self-start bg-orange-500 rounded-md text-lg cursor-pointer"
          >
            Browse Recipes
          </button>
        </div>
        <div class="flex-1 order-1 lg:order-2">
          <img src="@/assets/nuxt-course-hero.png" alt="">
        </div>
      </div>
    </section>
    <section class="py-20 container">
      <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
      <p class="text-lg lg:text-xl mb-8">Check out our most popular recipes!</p>
      <div v-if="!error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        <div v-for="recipe in data?.recipes" class="flex flex-col shadow rounded-md">
          <img
            :src="recipe.image"
            sizes="xs:100vw sm:50vw lg:400px"
            format="webp"
            densities="x1"
            alt=""
            class="rounded-t-md"
          />
          <div class="flex flex-col py-6 px-4 flex-1">
            <p class="text-xl lg:text-2xl font-semibold mb-2">{{ recipe.name }}</p>
            <div class="font-normal w-full bg-white/80 flex gap-8 text-lg lg:text-xl mb-4 mt-auto">
              <div class="flex items-center gap-1">
                <p>Time:</p>
                <span>{{ recipe.cookTimeMinutes }}</span>
              </div>
              <div class="flex items-center gap-1">
                <p>Cal:</p>
                <span>{{ recipe.caloriesPerServing }}</span>
              </div>
              <div class="flex items-center gap-1">
                <p>Rating:</p>
                <span>{{ recipe.rating }} ({{ recipe.reviewCount }})</span>
              </div>
            </div>
            <NuxtLink
              :to="`/recipes/${recipe.id}`"
              class="px-4 py-2 text-white self-start bg-orange-500 rounded-md text-base lg:text-lg cursor-pointer"
            >
              View
            </NuxtLink>
          </div>
        </div>
      </div>
      <p v-else class="text-xl">Opps, something went wrong. Please try again later</p>
    </section>
  </main>
</template>