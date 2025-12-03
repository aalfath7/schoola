<template>
  <div class="max-w-7xl mx-auto p-4 md:p-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8"
    >
      <div class="w-full sm:w-auto">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Data Master</h1>
        <p class="text-gray-600 mt-1 text-sm md:text-base">Kelola semua data sistem</p>
      </div>
      <div class="w-full sm:w-auto">
        <router-link
          to="/"
          class="flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Dashboard
        </router-link>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="mb-6 md:mb-8">
      <div class="border-b border-gray-200 overflow-x-auto">
        <nav class="flex min-w-max sm:min-w-0">
          <div class="flex space-x-4 md:space-x-8">
            <router-link
              v-for="tab in tabs"
              :key="tab.name"
              :to="tab.route"
              class="py-3 md:py-4 px-1 font-medium text-sm text-center whitespace-nowrap flex-shrink-0"
              :class="[
                $route.path.startsWith(tab.route)
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              <div class="flex items-center gap-2">
                <component :is="tab.icon" class="h-4 w-4 md:h-5 md:w-5" />
                <span class="text-xs md:text-sm">{{ tab.name }}</span>
              </div>
            </router-link>
          </div>
        </nav>
      </div>
    </div>

    <!-- Router View untuk konten CRUD -->
    <div class="overflow-x-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  {
    name: "Siswa",
    route: "/data-master/students",
    icon: "UserGroup",
  },
  {
    name: "Guru",
    route: "/data-master/teachers",
    icon: "AcademicCap",
  },
  {
    name: "Mata Pelajaran",
    route: "/data-master/lessons",
    icon: "BookOpen",
  },
  {
    name: "Enrollment",
    route: "/data-master/enrollments",
    icon: "ClipboardCheck",
  },
];
</script>
