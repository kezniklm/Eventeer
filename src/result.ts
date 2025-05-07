export type Result<T = void> = { success: true; message: string; data?: T } | { success: false; message: string };
