/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Bu satır, projeyi sunucu gerektirmeyen HTML dosyalarına dönüştürür
  images: {
    unoptimized: true, // Statik modda görsel optimizasyonunun sunucu yükü oluşturmasını engeller
  },
};

export default nextConfig;