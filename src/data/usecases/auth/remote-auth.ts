import { AuthParams } from '@/domain/usecases/auth'
import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models/account-model'


export class RemoteAuthentication{
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthParams,AccountModel>
  ) {}
  
  async auth(params:AuthParams): Promise<void> {
    const httpResponse =  await this.httpPostClient.post({
      url: this.url,
      body:params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:break
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      case HttpStatusCode.badRequest: throw new UnexpectedError()
      default: throw new UnexpectedError()
    }
  }
}