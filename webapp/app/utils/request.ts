/*
 * <<
 * Davinci
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'

axios.defaults.validateStatus = function (status) {
  return status < 400
}

function parseJSON (response) {
  return response.data
}

function refreshToken (response) {
  const token = response.data.header && response.data.header.token
  if (token) {
    setToken(token)
    localStorage.setItem('TOKEN', token)
    localStorage.setItem('TOKEN_EXPIRE', `${new Date().getTime() + 3600000}`)
  }
  return response
}

export function request (config: AxiosRequestConfig): AxiosPromise
export function request (url: string, options?: AxiosRequestConfig): AxiosPromise
export default function request (url: any, options?: AxiosRequestConfig): AxiosPromise {
  return axios(url, options)
    .then(refreshToken)
    .then(parseJSON)
}

export function setToken (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function removeToken () {
  delete axios.defaults.headers.common['Authorization']
}

export function getToken () {
  return  axios.defaults.headers.common['Authorization']
}
