import {HttpPostClientSpy } from '../../test/mock-http-client'
import {RemoteAuthentication} from './remote-auth'

describe('RemoteAuth', () => {
  test('Should call HttpPostClient with correct URL', async () => {
   
    const url = "any"
    const httpPostClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url,httpPostClient)
    await sut.auth()
    expect(httpPostClient.url).toBe(url)
  
  })
})