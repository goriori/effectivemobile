import { initUserModel } from './user';

export const initializeModels = (): void => {
  initUserModel();
  console.log('📦 Models initialized successfully.');
};

export { User } from './user';
