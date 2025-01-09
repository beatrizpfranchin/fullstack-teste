import { Task } from "src/task/entities/task.entity";

export class User {
    id: number;
    email: string;
    password: string;
    name?: string;
    tasks: Task[];
}
