import { registerSystemAdmin } from '../../services/systemAdmin';

// handleSubmit функц дотор
const data = await registerSystemAdmin(username, email, password);

if (data.token) {
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('auth_role', 'system-admin');
  alert('Амжилттай бүртгэгдлээ!');
  window.location.href = '/system-admin/dashboard';
}
