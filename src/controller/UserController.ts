import { Request, Response } from 'express';
import User from '../database/schemas/User'
import HttpResponse from '../helpers/http-response';
import MissingParamError from '../utils/errors/missing-param-error';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { JWT_SECRET } = process.env
class UserController {
  async healthCheck(request: Request, response: Response) {
    return response.json({
      message: "Health check ok"
    })
  }
  async create(request: Request, response: Response) {
    const { name, username, password } = request.body
    if (!name || !username || !password) {
      return response.json(HttpResponse.badRequest(new MissingParamError('Name, username or password is missing')))
    }
    try {
      const userExist = await User.findOne({ username })

      if (userExist) {
        return response.json(HttpResponse.badRequest(new MissingParamError('User already exists')))
      }

      const user = await User.create({
        name,
        username,
        password
      })

      return response.json(HttpResponse.created(user))

    } catch (error) {
      return response.json(HttpResponse.serverError())
    }
  }
  async findAll(request: Request, response: Response) {
    try {
      const users = await User.find()
      return response.json(users)
    } catch (error) {
      return response.status(500).json({
        error: "Internal server error",
        message: error
      })
    }
  }
  async findById(request: Request, response: Response) {
    const { id } = request.params
    if (!id) {
      return response.status(400).json({
        error: "Id is required"
      })
    }
    try {
      const findUserById = await User.find({ _id: id })
      if (!findUserById) {
        return response.status(400).json({
          error: "User not found"
        })
      }
      return response.json(findUserById)

    } catch (error) {
      return response.status(500).json({
        error: "Internal server error",
        message: error
      })
    }
  }
  async findByIdWithToken(request: Request, response: Response) {
    const token = request.headers.authorization
    if (!token) {
      return response.status(401).json({
        error: "Token is required"
      })
    }
    try {
      const payload: any = jwt.verify(token, JWT_SECRET as string)
      const findUserById = await User.find({ _id: payload.id })
      if (!findUserById) {
        return response.status(400).json({
          error: "User not found"
        })
      }
      return response.json(findUserById)

    } catch (error) {
      return response.status(500).json({
        error: "Internal server error",
        message: error
      })
    }
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params
    if (!id) {
      return response.status(400).json({
        error: "Id is required"
      })
    }

    try {
      const findUserById = await User.findByIdAndDelete(id)
      if (!findUserById) {
        return response.status(400).json({
          error: "User not found"
        })
      }
      return response.json({
        message: "User deleted successfully"
      })

    } catch (error) {
      return response.status(500).json({
        error: "Internal server error",
        message: error
      })
    }
  }
  async update(request: Request, response: Response) {
    const { id } = request.params
    const { name, username } = request.body
    if (!id) {
      return response.status(400).json({
        error: "Id is required"
      })
    }
    try {
      const findUser = await User.findByIdAndUpdate(id, {
        name,
        username
      }, { new: true })
      if (!findUser) {
        return response.status(400).json({
          error: "User not found"
        })
      }
      return response.json({
        message: "User updated successfully",
        user: findUser
      })
    } catch (error) {
      return response.status(500).json({
        error: "Internal server error",
        message: error
      })
    }
  }
  async login(request: Request, response: Response) {
    const { username, password } = request.body
    if (!username || !password) {
      return response.status(400).json({
        error: "Username and password is required"
      })
    }

    try {
      const userExist = await User.findOne({ username }).select('+password')
      if (!userExist) {
        return response.json(HttpResponse.badRequest(new MissingParamError('User not found')))
      }
      const checkPassword = bcrypt.compareSync(password, userExist.password)
      if (!checkPassword) {
        return response.json(HttpResponse.badRequest(new MissingParamError('Password is incorrect')))
      }

      const token = jwt.sign({ id: userExist._id }, JWT_SECRET as string)

      return response.json(HttpResponse.ok({
        userExist,
        token
      }))

    } catch (error) {
      return response.json(HttpResponse.serverError())
    }
  }
}

export default new UserController()