import { configureStore } from '@reduxjs/toolkit';
import product from '../api/product';

export const store = configureStore({
	reducer: {
		// Tạo thêm slice từ api
		[product.reducerPath]: product.reducer,
	},

	// Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(product.middleware),
});
