const validateUserInput = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.age || data.age < 18 || data.age > 100) {
    errors.push('Age must be between 18 and 100');
  }

  return errors;
};

const validateUserUpdate = (data) => {
  const errors = [];

  if (data.name && data.name.trim().length === 0) {
    errors.push('Name cannot be empty');
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (data.age && (data.age < 18 || data.age > 100)) {
    errors.push('Age must be between 18 and 100');
  }

  return errors;
};

module.exports = { validateUserInput, validateUserUpdate };
