import http from "../http-common";

export const getAll = async () => {
  return await http.get("");
};

export const getOne = (id) => {
  return http.get(`/${id}`);
};

export const create = (payload) => {
  return http.post(payload);
};

export const update = (id) => {
  return http.update(`${id}`);
};

export const deleteOne = (id) => {
  return http.delete(`${id}`);
};

export const deleteAll = () => {
  return http.delete();
};
