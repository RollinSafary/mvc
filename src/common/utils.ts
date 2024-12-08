export const createErrorForDuplicateKey = (constructorName: string, key: string): Error =>
    new Error(`There's already registered ${constructorName} for key: ${key}`);

export const createErrorForNotInitialized = (constructorName: string): Error => new Error(`This ${constructorName} is not initialized yet`);
