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
      return response.json({
        message: "User created successfully",
        user
      })
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
  async delete(request: Request, response: Response) {
    const { id } = request.params
    if(!id) {
      return response.status(400).json({
        error: "Id is required"
      })
    }

    try {
      const findUserById =  await User.findByIdAndDelete(id)
      if(!findUserById) {
        return response.status(400).json({
          error: "User not found"
        })
      }
      return response.json({
        message: "User deleted successfully"
      })
        
    } catch(error) {
      return response.status(500).json({
        error: "Internal server error",
        message: error
      })
    }
  }
  async update(request: Request, response: Response) {
    const { id } = request.params
    const { name, username } = request.body
    if(!id) {
      return response.status(400).json({
        error: "Id is required"
      })
    }
    try {
      const findUser = await User.findByIdAndUpdate(id, {
        name,
        username
      }, {new: true})
      if(!findUser) {
        return response.status(400).json({
          error: "User not found"
        })
      }
      return response.json({
        message: "User updated successfully",
        user: findUser
      })
    } catch(error) {
      return response.status(500).json({
        error: "Internal server error",
        message: error
      })
    }
  }
}

export default new UserController()