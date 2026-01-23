// Legacy API dosyası - Backward compatibility için
// Tüm import'lar artık util/api/index.ts'den geliyor

export * from './api/index';

// Not: Bu dosya artık deprecated. Yeni import'lar şu şekilde yapılmalı:
// import { getSiteInfo, getBanners, ... } from '@/util/api';
