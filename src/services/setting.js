import { request } from '../utils'

export async function query(params) {
  return request({
    url: '/v1/settings',
    method: 'get',
    data: params,
  })
}
