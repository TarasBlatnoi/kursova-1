export default function emailValidator(emailString) {
  const regExpValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regExpValidation.test(String(emailString).toLowerCase())
}
