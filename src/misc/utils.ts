export const randomKey = () => (Math.random() + 1).toString(36).substring(7);
export const getApiUri = () => process.env.NEXT_PUBLIC_API_URI;
