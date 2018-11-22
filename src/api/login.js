import $http from "@/ajax/Axios";

/**
 * 登录
 * @param {string} username
 * @param {string} password
 */
export function loginByApi(username, password) {
  const url = "/login";
  const data = { username, password };

  return $http.post(url, data);
}
