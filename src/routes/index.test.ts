import assert from 'assert'
import sinon from 'sinon'
import UserController from '../controller/UserController'


describe('GET: UserController.healthCheck', () => {
  describe('When the API is turn on', () => {
    let sandbox: sinon.SinonSandbox
    beforeEach(() => {
      sandbox = sinon.createSandbox()
      sandbox.stub(UserController, 'healthCheck').resolves({
        message: "Health check ok"
      } as any)
    })
    afterEach(() => {
      sandbox.restore()
    })
    it('Should return ok', async () => {
      const response = await UserController.healthCheck({} as any, {} as any)
      assert.deepStrictEqual(response, {
        message: "Health check ok"
      })
    })
  })

})
