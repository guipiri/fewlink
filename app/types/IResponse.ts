export interface IResponse<Data = null> {
  success: boolean
  message?: string
  data?: Data
}
