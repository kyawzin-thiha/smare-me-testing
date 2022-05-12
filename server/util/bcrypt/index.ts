import * as bcrypt from 'bcryptjs'

export const hashValue = (value: string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(value, salt)
}

export const compareValue = (value: string, hashedValue: string) => {
    return bcrypt.compareSync(value, hashedValue)
}