export const generateRandomPhoneNumber = (): string => {
    const areaCode = Math.floor(Math.random() * 900) + 100; // 3 digits
    const prefix = Math.floor(Math.random() * 900) + 100; // 3 digits
    const lineNumber = Math.floor(Math.random() * 9000) + 1000; // 4 digits
    return `(${areaCode}) ${prefix}-${lineNumber}`;
};