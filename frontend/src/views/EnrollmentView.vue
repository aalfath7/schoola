<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Header -->
    <div class="p-4 md:p-6 border-b">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0"
      >
        <div class="w-full md:w-auto">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800">Data Enrollment</h2>
          <p class="text-gray-600 mt-1 text-sm md:text-base">Kelola pelajaran yang diambil siswa</p>
        </div>
        <div class="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div class="relative flex-grow">
            <input
              v-model="search"
              type="text"
              placeholder="Cari siswa atau pelajaran..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-full"
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
            @click="openModal()"
            class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors w-full sm:w-auto cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span class="hidden sm:inline">Tambah Enrollment</span>
            <span class="sm:hidden">Tambah</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"
      ></div>
      <p class="mt-2 text-gray-600 text-sm md:text-base">Memuat data...</p>
    </div>

    <!-- Data Table -->
    <div v-else class="overflow-x-auto">
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
              Siswa
            </th>
            <th
              class="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              NISN
            </th>
            <th
              class="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Mata Pelajaran
            </th>
            <th
              class="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(enrollment, index) in filteredEnrollments"
            :key="enrollment.id"
            class="hover:bg-gray-50"
          >
            <!-- Kolom No -->
            <td
              class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ index + 1 }}
            </td>

            <!-- Kolom Siswa -->
            <td class="px-4 py-3 md:px-6 md:py-4">
              <div class="flex items-center">
                <div class="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                  <div
                    class="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm md:text-base"
                  >
                    {{ getInitial(enrollment.students[0]?.student_name) || "S" }}
                  </div>
                </div>
                <div class="ml-3 md:ml-4">
                  <div
                    class="text-sm font-medium text-gray-900 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none"
                  >
                    {{ enrollment.students[0]?.student_name || "Siswa tidak ditemukan" }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Kolom NISN -->
            <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
              {{ enrollment.students[0]?.nisn || "-" }}
            </td>

            <!-- Kolom Mata Pelajaran -->
            <td class="px-4 py-3 md:px-6 md:py-4">
              <div class="flex items-center">
                <div class="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                  <div
                    class="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm md:text-base"
                  >
                    {{ getInitial(enrollment.lessons[0]?.lesson_name) || "P" }}
                  </div>
                </div>
                <div class="ml-3 md:ml-4">
                  <div
                    class="text-sm font-medium text-gray-900 truncate max-w-[100px] md:max-w-[150px] lg:max-w-none"
                  >
                    {{ enrollment.lessons[0]?.lesson_name || "Pelajaran tidak ditemukan" }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Kolom Aksi -->
            <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="deleteEnrollment(enrollment.documentId)"
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
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredEnrollments.length === 0" class="text-center py-12 px-4">
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <h3 class="mt-2 text-sm md:text-base font-medium text-gray-900">
          Tidak ada data enrollment
        </h3>
        <p class="mt-1 text-sm text-gray-500">Belum ada siswa yang mengambil pelajaran.</p>
        <div class="mt-6">
          <button
            @click="openModal()"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 w-full sm:w-auto"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span class="hidden sm:inline">Tambah Enrollment Baru</span>
            <span class="sm:hidden">Tambah Enrollment</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Enrollment -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-4 md:p-6">
          <div class="flex justify-between items-center mb-4 md:mb-6">
            <h3 class="text-lg font-medium text-gray-900">Tambah Enrollment</h3>
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

          <form @submit.prevent="saveEnrollment">
            <div class="space-y-4">
              <!-- Pilih Siswa -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Pilih Siswa</label>
                <select
                  v-model="form.student"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
                >
                  <option value="" disabled selected>-- Pilih Siswa --</option>
                  <option v-for="student in students" :key="student.id" :value="student.id">
                    {{ student.student_name }} (NISN: {{ student.nisn }})
                  </option>
                </select>
              </div>

              <!-- Pilih Pelajaran -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Pilih Mata Pelajaran</label
                >
                <select
                  v-model="form.lesson"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
                >
                  <option value="" disabled selected>-- Pilih Pelajaran --</option>
                  <option v-for="lesson in lessons" :key="lesson.id" :value="lesson.id">
                    {{ lesson.lesson_name }}
                  </option>
                </select>
              </div>

              <!-- Info Tambahan -->
              <div class="bg-orange-50 border border-orange-100 rounded-lg p-3">
                <div class="flex items-start">
                  <svg
                    class="h-5 w-5 text-orange-500 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p class="text-xs text-orange-800">
                      Enrollment akan menghubungkan siswa dengan mata pelajaran yang dipilih.
                      Pastikan data sudah benar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto cursor-pointer"
              >
                <span v-if="saving" class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Menyimpan...
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span class="hidden sm:inline">Simpan Enrollment</span>
                  <span class="sm:hidden">Simpan</span>
                </span>
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
const enrollments = ref([]);
const students = ref([]);
const lessons = ref([]);
const loading = ref(false);
const search = ref("");
const showModal = ref(false);
const saving = ref(false);

const form = ref({
  student: "",
  lesson: "",
});

const getInitial = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase();
};

const filteredEnrollments = computed(() => {
  if (!search.value) return enrollments.value;

  const searchLower = search.value.toLowerCase();

  return enrollments.value.filter((enrollment) => {
    const studentName = enrollment.students[0]?.student_name || "";
    const lessonName = enrollment.lessons[0]?.lesson_name || "";
    const nisn = enrollment.students[0]?.nisn || "";

    return (
      studentName.toLowerCase().includes(searchLower) ||
      lessonName.toLowerCase().includes(searchLower) ||
      nisn.toLowerCase().includes(searchLower)
    );
  });
});

const fetchData = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");

    const enrollmentsRes = await axios.get(`${API_URL}/student-lessons?populate=*`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    enrollments.value = enrollmentsRes.data.data || [];

    const studentsRes = await axios.get(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    students.value = studentsRes.data.data || [];

    const lessonsRes = await axios.get(`${API_URL}/lessons`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    lessons.value = lessonsRes.data.data || [];
  } catch (error) {
    if (error.response) {
      try {
        const token = localStorage.getItem("token");

        const enrollmentsRes = await axios.get(`${API_URL}/student-lessons`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        enrollments.value = enrollmentsRes.data.data || [];

        const studentsRes = await axios.get(`${API_URL}/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        students.value = studentsRes.data.data || [];

        const lessonsRes = await axios.get(`${API_URL}/lessons`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        lessons.value = lessonsRes.data.data || [];
      } catch {
        alert("Gagal memuat data enrollment.");
      }
    } else {
      alert("Gagal memuat data enrollment. Periksa koneksi jaringan.");
    }
  } finally {
    loading.value = false;
  }
};

const openModal = () => {
  form.value = {
    student: "",
    lesson: "",
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = {
    student: "",
    lesson: "",
  };
};

const saveEnrollment = async () => {
  if (!form.value.student || !form.value.lesson) {
    alert("Pilih siswa dan mata pelajaran terlebih dahulu!");
    return;
  }

  const isExist = enrollments.value.some((e) => {
    return e.students[0]?.id === form.value.student && e.lessons[0]?.id === form.value.lesson;
  });

  if (isExist) {
    alert("Siswa tersebut sudah mengambil mata pelajaran ini!");
    return;
  }

  try {
    saving.value = true;
    const token = localStorage.getItem("token");

    const newEnrollment = {
      data: {
        students: [form.value.student],
        lessons: [form.value.lesson],
      },
    };

    await axios.post(`${API_URL}/student-lessons`, newEnrollment, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await fetchData();
    closeModal();
  } catch (error) {
    console.log("error : ", error);
    alert("Gagal menyimpan enrollment.");
  } finally {
    saving.value = false;
  }
};

const deleteEnrollment = async (id) => {
  if (!confirm("Apakah Anda yakin ingin menghapus enrollment ini?")) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${API_URL}/student-lessons/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await fetchData();
    alert("Enrollment berhasil dihapus");
  } catch {
    alert("Gagal menghapus enrollment");
  }
};

onMounted(() => {
  fetchData();
});
</script>
