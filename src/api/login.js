import $axios from "@/ajax/axios";

/**
 * 登录
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export function loginByApi(username, password) {
  const url = "/login";
  const data = { username, password };

  return $axios.post(url, data);
}

/**
 * 获取菜单
 * @param {string} token 令牌
 */
export function getMenuByApi(token) {
  const url = "/getMenu";
  const params = { token };

  return $axios.get(url, { params });
}
