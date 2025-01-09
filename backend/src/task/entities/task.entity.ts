export enum TaskStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETE
}

export class Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    dateCreated: Date;
    dateCompleted?: Date;
}
