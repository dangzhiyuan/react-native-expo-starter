export const validateUsername = (username: string): string => {
  if (!username) return '用户名不能为空';
  if (username.length < 3) return '用户名至少需要3个字符';
  if (username.length > 20) return '用户名不能超过20个字符';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return '用户名只能包含字母、数字和下划线';
  return '';
};

export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return '请输入邮箱';
  if (!emailRegex.test(email)) return '请输入有效的邮箱地址';
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return '请输入密码';
  if (password.length < 6) return '密码长度至少为6位';
  return '';
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) return '请确认密码';
  if (password !== confirmPassword) return '两次输入的密码不一致';
  return '';
}; 