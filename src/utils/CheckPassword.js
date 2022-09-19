import bcrypt from 'bcrypt'

export function checkPassword(password, password_hash) {
    return bcrypt.compare(password, password_hash)
}