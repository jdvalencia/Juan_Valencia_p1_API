export interface EmployeeSchema {
    ers_user_id: number,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    role: string
}

export interface ReimbSchema {
    reimb_id: number,
    amount: number,
    submitted: Date,
    resolved: Date,
    description: string,
    author: string,
    resolver: string,
    status: string,
    type: string
}