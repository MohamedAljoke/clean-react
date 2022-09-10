import {HttpPostClientSpy } from '@/data/test/mock-http-client'
import { RemoteAuthentication } from './remote-auth'
import faker from 'faker'
import { mockAuth } from '@/domain/test/mock-auth'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AuthParams } from '@/domain/usecases/auth'
import { AccountModel } from '@/domain/models/account-model'


type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy:HttpPostClientSpy<AuthParams,AccountModel>
} 

const makeSut = (url:string=faker.internet.url()): SutTypes=> {

  const httpPostClientSpy = new HttpPostClientSpy<AuthParams,AccountModel>()
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
  test('Should throw InvalidCredentialsError if httpPostClient returns 401', async () => {
 
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuth())
   await  expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('Should throw UnexpectedError if httpPostClient returns error other then 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuth())
   await  expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if error 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuth())
   await  expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if error 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuth())
   await  expect(promise).rejects.toThrow(new UnexpectedError())
  })
})