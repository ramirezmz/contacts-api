import { Request, Response } from 'express';
import User from '../database/schemas/User'

class UserController {
  async healthCheck(request: Request, response: Response) {
    return response.json({
      message: "Health check ok"
    })
  }
  async create(request: Request, response: Response) {
    const {name, username, password} = request.body
    try {
      const userExist = await User.findOne({username})

      if(userExist) {
        return response.status(400).json({
          error: "User already exists"
        })
      }

      const user = await User.create({
        name,
        username,
        password
      })
      return response.json(user)
    } catch(error) {
      return response.status(500).json({
        error: "Registration failed",
        message: error
      })
    }
  }
  async findAll(request: Request, response: Response) {
    try {
      const users = await User.find()
    return response.json(users)
    } catch(error) {
      return response.status(500).json({
        error: "Internal server error",
        message: error
      })
    }
  }
}

export default new UserController()