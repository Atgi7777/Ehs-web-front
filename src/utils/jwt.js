// utils/jwt.js

/**
 * JWT токеныг задлаж payload мэдээллийг буцаана
 * @param {string} token - JWT token (Bearer <token> хэлбэр биш, зөвхөн token)
 * @returns {object} decoded payload (жишээ нь: { id: 1, role: "System_admin", ... })
 */
export function parseJwt(token) {
    if (!token) return {};
    try {
      const base64Url = token.split('.')[1];
      const base64 = decodeURIComponent(
        atob(base64Url)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(base64);
    } catch (err) {
      console.error("❌ JWT задлахад алдаа гарлаа:", err);
      return {};
    }
  }
  