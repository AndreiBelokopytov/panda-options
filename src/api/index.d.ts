import { AxiosError } from "axios";

export type DefaultError = {
  error: AxiosError;
  status?: number;
};
