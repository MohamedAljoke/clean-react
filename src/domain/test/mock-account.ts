import { AuthParams } from "@/domain/usecases";
import { AccountModel } from "../models";
import faker from 'faker'

export const mockAuth = (): AuthParams => ({
  email: faker.internet.email(),
  password:faker.internet.password(),
})
export const mockAccountModel = (): AccountModel => ({
  accessToken:faker.random.uuid()
})