<template>
  <div class="max-w-6xl mx-auto p-6 space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Dashboard Schoola</h1>
      </div>

      <div class="flex space-x-2">
        <router-link
          to="/data-master"
          class="flex items-center gap-2 text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer transition-colors"
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Data Master
        </router-link>
        <button
          @click="logout"
          class="flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-md border-b-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 font-medium">Jumlah Siswa</p>
            <h3 class="text-2xl font-bold text-gray-800">{{ students.length }}</h3>
          </div>
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 font-medium">Jumlah Guru</p>
            <h3 class="text-2xl font-bold text-gray-800">{{ teachers.length }}</h3>
          </div>
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md border-b-4 border-purple-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 font-medium">Jumlah Pelajaran</p>
            <h3 class="text-2xl font-bold text-gray-800">{{ lessons.length }}</h3>
          </div>
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-md">
        <h2 class="text-xl font-semibold text-gray-800 text-center">Jumlah guru dan siswa</h2>
        <div class="h-64 flex items-center justify-center py-6">
          <Pie v-if="pieChartData" :data="pieChartData" :options="pieChartOptions" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md">
        <h2 class="text-xl font-semibold text-gray-800 text-center">
          Pelajaran yang diambil siswa
        </h2>
        <div class="h-64 flex justify-center items-center py-6">
          <Bar v-if="barChartData" :data="barChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="font-bold text-lg text-gray-800 mb-4">Daftar Siswa</h3>
        <ul>
          <li
            v-for="(item, i) in students"
            :key="'s-' + i"
            class="flex items-center gap-2 hover:bg-gray-50 rounded-lg"
          >
            <span class="capitalize text-gray-700">{{ i + 1 }}. {{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="font-bold text-lg text-gray-800 mb-4">Daftar Guru</h3>
        <ul>
          <li
            v-for="(item, i) in teachers"
            :key="'g-' + i"
            class="flex items-center gap-2 hover:bg-gray-50 rounded-lg"
          >
            <span class="capitalize text-gray-700">{{ i + 1 }}. {{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="font-bold text-lg text-gray-800 mb-4">Daftar Pelajaran</h3>
        <ul>
          <li
            v-for="(item, i) in lessons"
            :key="'l-' + i"
            class="flex items-center gap-2 hover:bg-gray-50 rounded-lg"
          >
            <span class="capitalize text-gray-700">{{ i + 1 }}. {{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const pieChartData = ref(null);
const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

const barChartData = ref(null);
const barChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: "Jumlah Pelajaran yang Diikuti" },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        precision: 0,
      },
    },
  },
};

const students = ref([]);
const teachers = ref([]);
const lessons = ref([]);

const fetchData = async () => {
  const token = localStorage.getItem("token");

  try {
    const studentLessonRes = await axios.get(
      "http://localhost:1337/api/student-lessons?populate=students",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const studentLessonData = studentLessonRes.data.data;
    const studentMap = {};
    studentLessonData.forEach((item) => {
      const studentName = item.students[0].student_name || "Unknown";
      studentMap[studentName] = (studentMap[studentName] || 0) + 1;
    });

    barChartData.value = {
      labels: Object.keys(studentMap),
      datasets: [
        {
          label: "Pelajaran Diikuti",
          data: Object.values(studentMap),
          backgroundColor: "#6366F1",
        },
      ],
    };

    const studentRes = await axios.get("http://localhost:1337/api/students", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const teacherRes = await axios.get("http://localhost:1337/api/teachers", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const studentCount = studentRes.data.meta.pagination.total;
    const teacherCount = teacherRes.data.meta.pagination.total;

    pieChartData.value = {
      labels: ["Siswa", "Guru"],
      datasets: [
        {
          data: [studentCount, teacherCount],
          backgroundColor: ["#34D399", "#60A5FA"],
        },
      ],
    };

    students.value = studentRes.data.data.map((s) => s.student_name);
    teachers.value = teacherRes.data.data.map((t) => t.teacher_name);

    const lessonRes = await axios.get("http://localhost:1337/api/lessons", {
      headers: { Authorization: `Bearer ${token}` },
    });
    lessons.value = lessonRes.data.data.map((l) => l.lesson_name);
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
  }
};

const auth = useAuthStore();
const router = useRouter();

function logout() {
  router.push("/login");
  auth.logout();
}

onMounted(() => {
  fetchData();
  document.title = "Dashboard";
});
</script>
