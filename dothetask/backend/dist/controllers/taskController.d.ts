import type { Request, Response } from "express";
type Tasks = {
    id: string;
    created_at: string;
    column_id: string;
    name: string;
    description: string;
    status: string;
    order: number;
};
export declare function getTasks(req: Request, res: Response<Tasks[] | {
    message: string;
}>): Promise<Response<{
    message: string;
} | Tasks[], Record<string, any>> | undefined>;
export declare function addNewTask(req: Request, res: Response<{
    message: string;
}>): Promise<Response<{
    message: string;
}, Record<string, any>> | undefined>;
export declare function editTask(req: Request, res: Response<{
    message: string;
}>): Promise<Response<{
    message: string;
}, Record<string, any>> | undefined>;
export declare function deleteTask(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=taskController.d.ts.map