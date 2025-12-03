<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Header dengan Search dan Add Button -->
    <div class="p-4 md:p-6 border-b">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0"
      >
        <div class="w-full md:w-auto">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800">Data Mata Pelajaran</h2>
          <p class="text-gray-600 mt-1 text-sm md:text-base">Kelola data mata pelajaran sekolah</p>
        </div>
        <div class="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div class="relative flex-grow">
            <input
              v-model="search"
              type="text"
              placeholder="Cari mata pelajaran..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full"
            />
            <svg
              class="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
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
          </div>
          <button
            @click="openModal('create')"
            class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors w-full sm:w-auto cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span class="hidden sm:inline">Tambah Pelajaran</span>
            <span class="sm:hidden">Tambah</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No
            </th>
            <th
              class="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Mata Pelajaran
            </th>
            <th
              class="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Guru Pengajar
            </th>
            <th
              class="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(lesson, index) in filteredLessons" :key="lesson.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
              {{ index + 1 }}
            </td>

            <!-- Kolom Mata Pelajaran -->
            <td class="px-4 py-3 md:px-6 md:py-4">
              <div class="flex items-center">
                <div class="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                  <div
                    class="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm md:text-base"
                  >
                    {{ lesson.lesson_name?.charAt(0) || "P" }}
                  </div>
                </div>
                <div class="ml-3 md:ml-4">
                  <div
                    class="text-sm font-medium text-gray-900 truncate max-w-[120px] md:max-w-[200px] lg:max-w-none"
                  >
                    {{ lesson.lesson_name }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Kolom Guru Pengajar -->
            <td class="px-4 py-3 md:px-6 md:py-4">
              <div v-if="lesson.teacher" class="flex items-center">
                <div class="h-6 w-6 md:h-8 md:w-8 flex-shrink-0">
                  <div
                    class="h-6 w-6 md:h-8 md:w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-semibold"
                  >
                    {{ lesson.teacher.teacher_name?.charAt(0) || "G" }}
                  </div>
                </div>
                <div class="ml-2 md:ml-3">
                  <div
                    class="text-sm font-medium text-gray-900 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none"
                  >
                    {{ lesson.teacher.teacher_name }}
                  </div>
                </div>
              </div>
              <span v-else class="text-sm text-gray-500 italic">Belum ada guru</span>
            </td>

            <!-- Kolom Aksi -->
            <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <button
                  @click="openModal('edit', lesson)"
                  class="text-blue-600 hover:text-blue-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 w-full sm:w-auto cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span class="text-xs sm:text-sm">Edit</span>
                </button>
                <button
                  @click="deleteLesson(lesson.documentId)"
                  class="text-red-600 hover:text-red-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 w-full sm:w-auto cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span class="text-xs sm:text-sm">Hapus</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="filteredLessons.length === 0" class="p-8 text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada data mata pelajaran</h3>
      <p class="mt-1 text-sm text-gray-500">Mulai dengan menambahkan mata pelajaran baru</p>
      <div class="mt-6">
        <button
          @click="openModal('create')"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Pelajaran
        </button>
      </div>
    </div>

    <!-- Modal Mata Pelajaran -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-4 md:p-6">
          <div class="flex justify-between items-center mb-4 md:mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              {{ modalMode === "create" ? "Tambah Mata Pelajaran" : "Edit Mata Pelajaran" }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-500 cursor-pointer">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveLesson">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nama Pelajaran</label>
                <input
                  v-model="form.lesson_name"
                  type="text"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Guru Pengajar</label>
                <select
                  v-model="form.teacher"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-sm md:text-base"
                >
                  <option :value="null">Pilih Guru...</option>
                  <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                    {{ teacher.teacher_name }}
                  </option>
                </select>
                <p class="mt-1 text-xs text-gray-500">
                  Pilih guru yang akan mengajar mata pelajaran ini
                </p>
              </div>
            </div>

            <div class="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 w-full sm:w-auto cursor-pointer"
              >
                {{ saving ? "Menyimpan..." : "Simpan" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const API_URL = "http://localhost:1337/api";
const lessons = ref([]);
const teachers = ref([]);
const loading = ref(false);
const search = ref("");
const showModal = ref(false);
const modalMode = ref("create");
const saving = ref(false);

const form = ref({
  lesson_name: "",
  teacher: null,
});

const filteredLessons = computed(() => {
  if (!search.value) return lessons.value;
  const searchLower = search.value.toLowerCase();
  return lessons.value.filter(
    (lesson) =>
      lesson.lesson_name?.toLowerCase().includes(searchLower) ||
      lesson.teacher?.teacher_name?.toLowerCase().includes(searchLower)
  );
});

const fetchData = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");

    const lessonsRes = await axios.get(`${API_URL}/lessons?populate=teacher`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const teachersRes = await axios.get(`${API_URL}/teachers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    lessons.value = lessonsRes.data.data;
    teachers.value = teachersRes.data.data;
  } catch {
    alert("Gagal memuat data");
  } finally {
    loading.value = false;
  }
};

const openModal = (mode, lesson = null) => {
  modalMode.value = mode;
  if (mode === "edit" && lesson) {
    form.value = {
      ...lesson,
      teacher: lesson.teacher?.id || null,
    };
  } else {
    form.value = {
      lesson_name: "",
      teacher: null,
    };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = {
    lesson_name: "",
    teacher: null,
  };
};

const saveLesson = async () => {
  try {
    saving.value = true;
    const token = localStorage.getItem("token");

    const lessonData = {
      data: {
        lesson_name: form.value.lesson_name,
        teacher: form.value.teacher,
      },
    };

    if (modalMode.value === "create") {
      await axios.post(`${API_URL}/lessons`, lessonData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.put(`${API_URL}/lessons/${form.value.documentId}`, lessonData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    await fetchData();
    closeModal();
    alert(
      modalMode.value === "create"
        ? "Pelajaran berhasil ditambahkan"
        : "Data pelajaran berhasil diperbarui"
    );
  } catch {
    alert("Gagal menyimpan data pelajaran");
  } finally {
    saving.value = false;
  }
};

const deleteLesson = async (id) => {
  if (!confirm("Apakah Anda yakin ingin menghapus pelajaran ini?")) return;

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/lessons/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await fetchData();
    alert("Pelajaran berhasil dihapus");
  } catch {
    alert("Gagal menghapus pelajaran");
  }
};

onMounted(() => {
  fetchData();
});
</script>
