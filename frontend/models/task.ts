export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETE = 'COMPLETE'
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