import type { Request, Response } from "express";
type BoardProps = {
    id: string;
    created_at: string;
    name: string;
    slug: string;
};
export declare function getBoards(req: Request, res: Response<{
    message?: string;
} | BoardProps[]>): Promise<Response<{
    message?: string;
} | BoardProps[], Record<string, any>>>;
export declare function addNewBoard(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteBoard(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function editBoard(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=boardController.d.ts.map