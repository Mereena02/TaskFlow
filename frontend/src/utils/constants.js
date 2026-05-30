export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'];
export const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

export const getErrorMessage = (error) => {
  const data = error?.response?.data;
  if (data?.validationErrors) return Object.values(data.validationErrors).join(', ');
  return data?.message || error?.message || 'Something went wrong';
};
