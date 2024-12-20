import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protectRoute = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded.user;

    // Find the user by ID and make sure they exist
    const user = await User.findById(req.user?.id);
    if (!user) {
      res.status(403).json({ message: "User not found or unauthorized" });
      return;
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error: any) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired, please log in again" });
      return;
    }
    res.status(401).json({ message: "Token is not valid" });
    return;
  }
};
