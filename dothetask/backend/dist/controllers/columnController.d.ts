import type { Request, Response } from "express";
export declare function getColumns(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function deleteColumn(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function addNewColumn(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=columnController.d.ts.map