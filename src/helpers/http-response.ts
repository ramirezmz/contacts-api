export default class HttpResponse {
  static badRequest(error: Error) {
    return {
      statusCode: 400,
      body: error
    }
  }
  static created(data: any) {
    return {
      statusCode: 201,
      body: {
        message: "User created successfully",
        data
      }
    }
  }
  static serverError() {
    return {
      statusCode: 500,
      body: {
        error: "Internal server error"
      }
    }
  }
}