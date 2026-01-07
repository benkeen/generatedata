import bcrypt from 'bcryptjs';

export const getPasswordHash = async (plainTextPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(plainTextPassword, salt);
};
