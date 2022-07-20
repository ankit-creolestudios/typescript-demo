import { ListResponse } from "../common";
import { User } from "../models/user";
import axiosClient from "./axiosClient";

const userApi = {
  getAllUser(): Promise<ListResponse<User>> {
    const url = "/users";
    return axiosClient.get(url);
  },
  addUser(data: User): Promise<User> {
    const url = "/users";
    return axiosClient.post(url, data);
  },
  update(data: Partial<User>): Promise<User> {
    const url = `/users/${data.id}`;
    return axiosClient.put(url, data);
  },

  remove(id: string | number): Promise<any> {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
};
export default userApi;
