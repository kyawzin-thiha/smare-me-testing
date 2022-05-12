import { Account, User } from "@prisma/client";
import { compareValue, hashValue } from "../bcrypt";
import { db } from './db'

export const login = async (
  email: string,
  password: string,
): Promise<
  [
    (
      | (Account & {
          user: User
        })
      | null
    ),
    null | Error,
  ]
> => {
  try {
    const data = await db.account.findUnique({
      where: {
        email,
      },
      include: {
        user: true,
      },
    })
    console.log('This is data')
    console.log(data);
    if(!data) {
      return [
        null,
        {
          code: 'P2001',
          meta: [{ target: 'username' }],
          message: 'Invalid username',
        },
      ]
    }
    const isValidPsw = compareValue(password, data.password)
    console.log(isValidPsw)
    if (!isValidPsw) {
      return [
        null,
        {
          code: 'P2001',
          meta: [{ target: 'password' }],
          message: 'Invalid Password',
        },
      ]
    }
    return [data, null]
  } catch (error) {
    return [
      null,
      {
        code: error.code,
        meta: error.meta,
        message: error.message,
      },
    ]
  }
}

export const register = async (email: string, password: string) => {
  try {
    const hashedPsw = hashValue(password)
    const data = await db.account.create({
      data: {
        email,
        password: hashedPsw,
      },
    })
    return data
  } catch (error) {
    return [
      null,
      {
        code: error.code,
        meta: error.meta,
        message: error.message,
      },
    ]
  }
}

export const updatePassword = async (id: string, password: string) => {
  try {
    const hashedPsw = hashValue(password)
    await db.account.update({
      where: {
        id,
      },
      data: {
        password: hashedPsw,
      },
    })
    return null
  } catch (error) {
    return {
      code: error.code,
      meta: error.meta,
      message: error.message,
    }
  }
}

export const deleteUser = async (id: string) => {
  try {
    await db.account.delete({
      where: {
        id,
      },
    })
    return null
  } catch (error) {
    return {
      code: error.code,
      meta: error.meta,
      message: error.message,
    }
  }
}

type Error = {
  code: string
  meta: [{ target: string }]
  message: string
}
