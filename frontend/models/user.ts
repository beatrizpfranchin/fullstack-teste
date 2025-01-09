import { Task } from "./task";

export interface User {
    id: number;
    email: string;
    password: string;
    name?: string;
    tasks: Task[];
}