import * as crypto from 'crypto'

export class HashId {
  static gen(N = 20): string {
    return crypto.randomBytes(N).toString('base64').substring(0, N)
  }
}
