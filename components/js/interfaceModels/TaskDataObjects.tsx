// import User

export interface TaskDataObject{
    id: number;
    name: string;
    description: string;
    start_datetime: string;
    end_datetime: string;
    total_time: number;
    memo: string;
    user_id: number;
    // user: User;
}