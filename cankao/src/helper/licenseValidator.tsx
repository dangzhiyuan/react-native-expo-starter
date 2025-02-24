export function licenseValidator(license: any) {
  const re = /^\w{1,}$/;
  if (!license) return "不能为空！";
  if (!re.test(license)) return "输入的执照无效！";
  return "";
}
