import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import { useAuthStore } from "../store/auth";
import DataMaster from "../views/DataMaster.vue";
import Students from "../views/StudentView.vue";
import Teachers from "../views/TeacherView.vue";
import Lessons from "../views/LessonView.vue";
import Enrollments from "../views/EnrollmentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "Home",
      meta: { requiresAuth: true },
      component: HomeView,
    },
    {
      path: "/data-master",
      name: "DataMaster",
      component: DataMaster,
      meta: { requiresAuth: true },
      children: [
        {
          path: "students",
          name: "Students",
          component: Students,
        },
        {
          path: "teachers",
          name: "Teachers",
          component: Teachers,
        },
        {
          path: "lessons",
          name: "Lessons",
          component: Lessons,
        },
        {
          path: "enrollments",
          name: "Enrollments",
          component: Enrollments,
        },
        {
          path: "",
          name: "redirect",
          redirect: { name: "Students" },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && auth.isAuthenticated) {
    next("/home");
  } else {
    next();
  }
});

export default router;
