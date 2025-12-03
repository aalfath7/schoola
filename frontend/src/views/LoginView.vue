<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div
      class="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-sm border border-white/20"
    >
      <div class="flex flex-col items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Schoola Apps</h1>
        <p class="text-gray-500 text-sm mt-1">Login ke Aplikasi</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              v-model="identifier"
              type="text"
              placeholder="Email or Username"
              class="w-full pl-10 pr-4 py-3 border border-gray-300/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full pl-10 pr-4 py-3 border border-gray-300/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition placeholder-gray-400"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl transition-all font-semibold shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
        >
          Login
        </button>
      </form>

      <p
        v-if="error"
        class="mt-4 p-3 text-sm text-center text-red-600 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import { onMounted } from "vue";

const identifier = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const auth = useAuthStore();

const handleLogin = async () => {
  if (!identifier.value || !password.value) {
    error.value = "Email dan password harus diisi";
    return;
  }
  try {
    await auth.login(identifier.value, password.value);
    router.push("/home");
  } catch (err) {
    error.value = "Email atau password salah";
    console.error("Login error:", err);
  }
};

onMounted(() => {
  document.title = "Login";
});
</script>
