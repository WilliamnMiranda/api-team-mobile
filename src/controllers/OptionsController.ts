import { Response, Request } from "express";
import { RequestProjectWithAuthentication } from "../interfaces/ProjectInterface";
import Types from "../models/TypesModel";

export const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const type = await new Types({
    name,
  });

  try {
    await type.save();
    res.status(200).json("created successfully");
  } catch (e) {
    res.status(500).json({
      error: "System error",
    });
  }
};

export const getOptions = async (req: Request, res: Response) => {
  const options = await Types.find({});
  res.status(200).json(options);
};
