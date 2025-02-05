import serviceFactory from './factory.js'

export default function ItemService() {
  return serviceFactory('api/Item')
}