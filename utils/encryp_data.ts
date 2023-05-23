import * as bcrypt from 'bcrypt';

const encryptData = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const compareData = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export { encryptData, compareData };
