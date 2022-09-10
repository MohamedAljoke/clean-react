import {HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-auth'
import faker from 'faker'
import { mockAuth } from '../../../domain/test/mock-auth'


type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy:HttpPostClientSpy
} 

const makeSut = (url:string=faker.internet.url()): SutTypes=> {

  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuth', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const {sut,httpPostClientSpy} = makeSut(url)
    await sut.auth(mockAuth())
    expect(httpPostClientSpy.url).toBe(url)
  })
  test('Should call HttpPostClient with correct body', async () => {
    const authParams = mockAuth()
    const {sut,httpPostClientSpy} = makeSut()
    await sut.auth(authParams)
    expect(httpPostClientSpy.body).toEqual(authParams)
  })
})