import { AuthParams } from "@/domain/usecases/auth";
import faker from 'faker'
export const mockAuth = (): AuthParams => ({
  email: faker.internet.email(),
  password:faker.internet.password(),
})