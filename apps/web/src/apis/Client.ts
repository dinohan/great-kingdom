import { AxiosRequestConfig, AxiosResponse } from 'axios'

import Fetcher from './Fetcher'

class Client {
  get<T = unknown, R extends AxiosResponse<T> = AxiosResponse<T>, D = unknown>(
    path: string,
    config?: AxiosRequestConfig
  ) {
    return new Fetcher<T, R, D>({ ...config, url: path, method: 'GET' })
  }

  post<T = unknown, D = unknown>(
    path: string,
    data?: D,
    config?: AxiosRequestConfig
  ) {
    return new Fetcher<T, AxiosResponse<T>, D>({
      ...config,
      url: path,
      method: 'POST',
      data,
    })
  }

  put<T = unknown, R extends AxiosResponse<T> = AxiosResponse<T>, D = unknown>(
    path: string,
    data: D,
    config?: AxiosRequestConfig
  ) {
    return new Fetcher<T, R, D>({ ...config, url: path, method: 'PUT', data })
  }
}

const client = new Client()

export default client
