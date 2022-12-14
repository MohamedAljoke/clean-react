import { AxiosHttpClient } from "./axios-http-client"
import faker from 'faker'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
describe("AxiosHttpClient", () => {
  test("Should call axios with correct URL and post", async () => {
    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({ url: url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url) 
  })
})