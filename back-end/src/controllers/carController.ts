import type {
 Request,
 Response,
 NextFunction,
} from "express";


import * as service from "../services/carService";


import type { CreateCarDto } from "../dto/car/createCarDto.ts";
import type { UpdateCarDto } from "../dto/car/updateCarDto.ts";


type carIdParams = {
 id: string;
};


type CreatecarRequest = Request<
 Record<string, never>,
 unknown,
 CreateCarDto
>;


type UpdatecarRequest = Request<
 carIdParams,
 unknown,
 UpdateCarDto
>;


export async function retrieveAll(
 req: Request,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const cars = await service.findAll();


   res.json(cars);
 }
 catch (error) {
   next(error);
 }
}


export async function retrieveOne(
 req: Request<carIdParams>,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const id = Number(req.params.id);


   const car = await service.findById(id);


   res.json(car);
 }
 catch (error) {
   next(error);
 }
}


export async function create(
 req: CreatecarRequest,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const car = await service.create(req.body);


   res.status(201).json(car);
 }
 catch (error) {
   next(error);
 }
}


export async function update(
 req: UpdatecarRequest,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const id = Number(req.params.id);


   const car = await service.update(
     id,
     req.body
   );


   res.json(car);
 }
 catch (error) {
   next(error);
 }
}


export async function remove(
 req: Request<carIdParams>,
 res: Response,
 next: NextFunction
): Promise<void> {
 try {
   const id = Number(req.params.id);


   await service.remove(id);


   res.status(204).end();
 }
 catch (error) {
   next(error);
 }
}
