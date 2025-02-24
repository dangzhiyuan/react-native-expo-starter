export function passwordValidator(password: any) {
  if (!password) return "密码为空！";
  if (password.length < 5) return "密码长度至少5位!";
  return "";
}
