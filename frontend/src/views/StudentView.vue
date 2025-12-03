<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Header dengan Search dan Add Button -->
    <div class="p-4 md:p-6 border-b">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0"
      >
        <div class="w-full md:w-auto">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800">Data Siswa</h2>
          <p class="text-gray-600 mt-1 text-sm md:text-base">Kelola data siswa sekolah</p>
        </div>
        <div class="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div class="relative flex-grow">
            <input
              v-model="search"
              type="text"
              placeholder="Cari siswa..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
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
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors w-full sm:w-auto cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span class="hidden sm:inline">Tambah Siswa</span>
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
              Nama Siswa
            </th>
            <th
              class="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              NISN
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
            v-for="(student, index) in filteredStudents"
            :key="student.id"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-3 md:px-6 md:py-4">
              <div class="flex items-center">
                <div class="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                  <div
                    class="h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm md:text-base"
                  >
                    {{ student.student_name?.charAt(0) || "S" }}
                  </div>
                </div>
                <div class="ml-3 md:ml-4">
                  <div
                    class="text-sm font-medium text-gray-900 truncate max-w-[150px] md:max-w-none"
                  >
                    {{ student.student_name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
              {{ student.nisn || "-" }}
            </td>
            <td class="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <button
                  @click="openModal('edit', student)"
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
                  @click="deleteStudent(student.documentId)"
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
    <div v-if="filteredStudents.length === 0" class="p-8 text-center">
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
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada data siswa</h3>
      <p class="mt-1 text-sm text-gray-500">Mulai dengan menambahkan siswa baru</p>
      <div class="mt-6">
        <button
          @click="openModal('create')"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Siswa
        </button>
      </div>
    </div>

    <!-- Modal Siswa -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-4 md:p-6">
          <div class="flex justify-between items-center mb-4 md:mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              {{ modalMode === "create" ? "Tambah Siswa Baru" : "Edit Data Siswa" }}
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

          <form @submit.prevent="saveStudent">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nama Siswa</label>
                <input
                  v-model="form.student_name"
                  type="text"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">NISN</label>
                <input
                  v-model="form.nisn"
                  type="text"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                />
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
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto cursor-pointer"
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
const students = ref([]);
const loading = ref(false);
const search = ref("");
const showModal = ref(false);
const modalMode = ref("create");
const saving = ref(false);

const form = ref({
  student_name: "",
  nisn: "",
});

const filteredStudents = computed(() => {
  if (!search.value) return students.value;
  const searchLower = search.value.toLowerCase();
  return students.value.filter(
    (student) =>
      student.student_name?.toLowerCase().includes(searchLower) ||
      student.nisn?.toLowerCase().includes(searchLower)
  );
});

const fetchStudents = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    students.value = response.data.data;
  } catch {
    alert("Gagal memuat data siswa");
  } finally {
    loading.value = false;
  }
};

const openModal = (mode, student = null) => {
  modalMode.value = mode;
  if (mode === "edit" && student) {
    form.value = { ...student };
  } else {
    form.value = {
      student_name: "",
      nisn: "",
    };
  }
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  form.value = {
    student_name: "",
    nisn: "",
  };
};

const saveStudent = async () => {
  try {
    saving.value = true;
    const token = localStorage.getItem("token");

    const studentData = {
      data: {
        student_name: form.value.student_name,
        nisn: form.value.nisn,
      },
    };

    if (modalMode.value === "create") {
      await axios.post(`${API_URL}/students`, studentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.put(`${API_URL}/students/${form.value.documentId}`, studentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    await fetchStudents();
    closeModal();
    alert(
      modalMode.value === "create" ? "Siswa berhasil ditambahkan" : "Data siswa berhasil diperbarui"
    );
  } catch {
    alert("Gagal menyimpan data siswa");
  } finally {
    saving.value = false;
  }
};

const deleteStudent = async (id) => {
  if (!confirm("Apakah Anda yakin ingin menghapus siswa ini?")) return;

  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await fetchStudents();
    alert("Siswa berhasil dihapus");
  } catch {
    alert("Gagal menghapus siswa");
  }
};

onMounted(() => {
  fetchStudents();
});
</script>
