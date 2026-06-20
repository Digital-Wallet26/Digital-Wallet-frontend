/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a8a",    // أزرق ملكي
        secondary: "#fbbf24",  // ذهبي
        dark: "#0f172a",       // كحلي غامق
        light: "#f8fafc",      // رمادي فاتح
      },
    },
  },
  plugins: [],
}
