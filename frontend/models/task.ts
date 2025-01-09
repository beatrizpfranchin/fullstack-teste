export enum TaskStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETE
}

export interface Task {
    id:             number;
    title:          string;
    description?:   string;
    status:         TaskStatus; 
    dateCreated:    Date;
    dateCompleted?: Date;
    authorId:       number;
}