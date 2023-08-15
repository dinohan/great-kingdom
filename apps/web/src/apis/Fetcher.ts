import { AxiosRequestConfig, AxiosResponse } from 'axios'

import axios from './axios'

class Fetcher<T, R extends AxiosResponse<T>, D> {
  constructor(private config: AxiosRequestConfig<D>) {}

  withToken(): this {
    const token = '' // TODO: inject AuthService

    if (token) {
      this.config.headers = {
        ...this.config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    return this
  }

  request() {
    return axios.request<T, R, D>(this.config)
  }

  async run() {
    const res = await this.request()
    return res.data
  }
}

export default Fetcher
