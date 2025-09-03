export interface IPassword extends IForgotPassword {
    newPassword: string
}

export interface IForgotPassword {
    email: string,
}

export interface IResetPassword {
    resetCode: number,
}