import { AuthParams } from "@/domain/usecases/auth";
import faker from 'faker'
import { AccountModel } from "../models/account-model";

export const mockAuth = (): AuthParams => ({
  email: faker.internet.email(),
  password:faker.internet.password(),
})
export const mockAccountModel = (): AccountModel => ({
  accessToken:faker.random.uuid()
})